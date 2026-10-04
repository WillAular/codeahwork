import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model.js';
import { UserRole } from '../models/user-role.enum.js';
import { UserPasswordHasherService } from './user-password-hasher.service.js';
import { LoginCredentialsDto } from '../dto/login-credentials.dto.js';
import { UserResponseDto } from '../dto/user-response.dto.js';

export interface AuthenticationResult {
  accessToken: string;
  user: UserResponseDto;
}

@Injectable()
export class UserAuthenticatorService implements OnModuleInit {
  private readonly logger = new Logger(UserAuthenticatorService.name);

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly passwordHasher: UserPasswordHasherService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedInitialAdminUser();
  }

  async authenticate(
    credentials: LoginCredentialsDto,
  ): Promise<AuthenticationResult> {
    const email = credentials.email.toLowerCase().trim();
    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user || !user.isActive) {
      this.logger.warn(`Intento de login fallido: usuario no encontrado o inactivo (${email})`);
      throw new UnauthorizedException('Credenciales inválidas o usuario inactivo');
    }

    const isValidPassword = await this.passwordHasher.comparePassword(
      credentials.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: UserResponseDto.fromEntity(user),
    };
  }

  private async seedInitialAdminUser(): Promise<void> {
    const adminEmail = this.configService
      .get<string>('INITIAL_ADMIN_EMAIL', 'admin@codeah.com')
      .toLowerCase();
    const adminPassword = this.configService.get<string>(
      'INITIAL_ADMIN_PASSWORD',
      'password123',
    );

    const existingAdmin = await this.userModel.findOne({
      where: { email: adminEmail },
    });

    const hashedPassword = await this.passwordHasher.hashPassword(adminPassword);

    if (!existingAdmin) {
      await this.userModel.create({
        name: 'Yutcelinis Henríquez',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMINISTRADOR,
        isActive: true,
      } as any);

      this.logger.log(
        `SuperAdmin inicial creado automáticamente con email: ${adminEmail} y clave: ${adminPassword}`,
      );
    } else {
      // Ensure password matches INITIAL_ADMIN_PASSWORD
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      this.logger.log(`SuperAdmin (${adminEmail}) contraseña actualizada a: ${adminPassword}`);
    }
  }
}
