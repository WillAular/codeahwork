import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../models/user-role.enum.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
