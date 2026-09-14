import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { UserRole } from '../models/user-role.enum.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
