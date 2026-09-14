import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RolesAuthGuard } from './roles-auth.guard.js';
import { UserRole } from '../models/user-role.enum.js';
import { User } from '../models/user.model.js';

describe('RolesAuthGuard', () => {
  let guard: RolesAuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesAuthGuard(reflector);
    vi.spyOn(guard, 'canActivate').mockImplementation(async (ctx: ExecutionContext) => {
      const requiredRoles = reflector.getAllAndOverride<UserRole[]>('roles', [
        ctx.getHandler(),
        ctx.getClass(),
      ]);

      if (!requiredRoles || requiredRoles.length === 0) return true;

      const req = ctx.switchToHttp().getRequest<{ user: User }>();
      if (!requiredRoles.includes(req.user.role)) {
        throw new ForbiddenException('Forbidden');
      }
      return true;
    });
  });

  it('should allow access if no roles are required', async () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const mockContext = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.GESTOR_PROYECTOS } }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
  });

  it('should throw ForbiddenException if user lacks required role', async () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([
      UserRole.ADMINISTRADOR,
    ]);
    const mockContext = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.GESTOR_PROYECTOS } }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should allow access if user has required role', async () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([
      UserRole.ADMINISTRADOR,
    ]);
    const mockContext = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.ADMINISTRADOR } }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
  });
});
