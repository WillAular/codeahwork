import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserManagementService } from './user-management.service.js';
import { UserAuthenticatorService } from './authentication/user-authenticator.service.js';
import { LoginCredentialsDto } from './dto/login-credentials.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { RolesAuthGuard } from './authentication/roles-auth.guard.js';
import { Roles } from './authentication/roles.decorator.js';
import { UserRole } from './models/user-role.enum.js';
import { CurrentUser } from './authentication/current-user.decorator.js';
import { User } from './models/user.model.js';

@Controller()
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly authenticatorService: UserAuthenticatorService,
  ) {}

  @Post('auth/login')
  async login(@Body() credentials: LoginCredentialsDto) {
    return this.authenticatorService.authenticate(credentials);
  }

  @Post('users')
  @UseGuards(RolesAuthGuard)
  @Roles(UserRole.ADMINISTRADOR)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userManagementService.createUser(createUserDto);
  }

  @Get('users')
  @UseGuards(RolesAuthGuard)
  @Roles(UserRole.ADMINISTRADOR)
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userManagementService.findAllUsers();
  }

  @Get('users/me')
  @UseGuards(RolesAuthGuard)
  async getProfile(@CurrentUser() user: User): Promise<UserResponseDto> {
    return UserResponseDto.fromEntity(user);
  }

  @Get('users/:id')
  @UseGuards(RolesAuthGuard)
  @Roles(UserRole.ADMINISTRADOR)
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.userManagementService.findUserById(id);
  }

  @Patch('users/:id')
  @UseGuards(RolesAuthGuard)
  @Roles(UserRole.ADMINISTRADOR)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userManagementService.updateUser(id, updateUserDto);
  }
}
