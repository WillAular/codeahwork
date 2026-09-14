import { UserRole } from '../models/user-role.enum.js';
import { User } from '../models/user.model.js';

export class UserResponseDto {
  id!: number;
  name!: string;
  email!: string;
  role!: UserRole;
  isActive!: boolean;

  static fromEntity(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
