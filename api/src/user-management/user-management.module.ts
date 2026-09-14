import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './models/user.model.js';
import { UserManagementService } from './user-management.service.js';
import { UserAuthenticatorService } from './authentication/user-authenticator.service.js';
import { UserPasswordHasherService } from './authentication/user-password-hasher.service.js';
import { JwtAccessStrategy } from './authentication/jwt-access.strategy.js';
import { RolesAuthGuard } from './authentication/roles-auth.guard.js';
import { UserManagementController } from './user-management.controller.js';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'fallback_secret'),
        signOptions: {
          expiresIn: configService.get<any>('JWT_EXPIRES_IN', '1d'),
        },
      }),
    }),
  ],
  controllers: [UserManagementController],
  providers: [
    UserManagementService,
    UserAuthenticatorService,
    UserPasswordHasherService,
    JwtAccessStrategy,
    RolesAuthGuard,
  ],
  exports: [
    UserManagementService,
    UserAuthenticatorService,
    RolesAuthGuard,
    SequelizeModule,
  ],
})
export class UserManagementModule {}
