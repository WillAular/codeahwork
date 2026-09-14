import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { UserPasswordHasherService } from './authentication/user-password-hasher.service.js';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly passwordHasher: UserPasswordHasherService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userModel.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const hashedPassword = await this.passwordHasher.hashPassword(
      dto.password,
    );

    const newUser = await this.userModel.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
      isActive: true,
    } as any);

    return UserResponseDto.fromEntity(newUser);
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userModel.findAll({
      order: [['createdAt', 'DESC']],
    });
    return users.map((user) => UserResponseDto.fromEntity(user));
  }

  async findUserById(id: number): Promise<UserResponseDto> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return UserResponseDto.fromEntity(user);
  }

  async updateUser(
    id: number,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (dto.name !== undefined) user.name = dto.name;
    if (dto.role !== undefined) user.role = dto.role;
    if (dto.isActive !== undefined) user.isActive = dto.isActive;

    await user.save();
    return UserResponseDto.fromEntity(user);
  }
}
