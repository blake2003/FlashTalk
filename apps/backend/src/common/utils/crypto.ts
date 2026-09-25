import { createHash, randomBytes, randomInt } from 'crypto';
import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  rounds: number,
): Promise<string> {
  return bcrypt.hash(password, rounds);
}

export async function comparePassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

/** Opaque token for refresh tokens (store only the hash). */
export function generateOpaqueToken(): string {
  return randomBytes(48).toString('base64url');
}

export function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

/** 6-digit OTP; store only hash. */
export function generateOtpCode(): string {
  return randomInt(0, 1_000_000).toString().padStart(6, '0');
}

export function hashOtpCode(code: string): string {
  return sha256(code.trim());
}

/**
 * Parse TTL strings like "15m", "30d", "3600" into seconds.
 */
export function parseTtlToSeconds(ttl: string): number {
  const trimmed = ttl.trim();
  const match = /^(\d+)([smhd])?$/i.exec(trimmed);
  if (!match) {
    throw new Error(`Invalid TTL format: ${ttl}`);
  }
  const amount = parseInt(match[1], 10);
  const unit = (match[2] ?? 's').toLowerCase();
  switch (unit) {
    case 's':
      return amount;
    case 'm':
      return amount * 60;
    case 'h':
      return amount * 3600;
    case 'd':
      return amount * 86400;
    default:
      return amount;
  }
}
