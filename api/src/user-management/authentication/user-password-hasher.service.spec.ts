import { describe, it, expect, beforeEach } from 'vitest';
import { UserPasswordHasherService } from './user-password-hasher.service.js';

describe('UserPasswordHasherService', () => {
  let hasherService: UserPasswordHasherService;

  beforeEach(() => {
    hasherService = new UserPasswordHasherService();
  });

  it('should hash password and verify match correctly', async () => {
    const rawPassword = 'SecretPassword123!';
    const hashedPassword = await hasherService.hashPassword(rawPassword);

    expect(hashedPassword).not.toBe(rawPassword);
    expect(hashedPassword.length).toBeGreaterThan(10);

    const isMatch = await hasherService.comparePassword(
      rawPassword,
      hashedPassword,
    );
    expect(isMatch).toBe(true);

    const isInvalidMatch = await hasherService.comparePassword(
      'WrongPassword',
      hashedPassword,
    );
    expect(isInvalidMatch).toBe(false);
  });
});
