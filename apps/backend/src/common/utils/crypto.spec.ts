import {
  generateOtpCode,
  hashOtpCode,
  parseTtlToSeconds,
  sha256,
} from './crypto';

describe('crypto utils', () => {
  it('parses TTL strings to seconds', () => {
    expect(parseTtlToSeconds('15m')).toBe(900);
    expect(parseTtlToSeconds('30d')).toBe(30 * 86400);
    expect(parseTtlToSeconds('3600')).toBe(3600);
    expect(parseTtlToSeconds('2h')).toBe(7200);
  });

  it('generates 6-digit OTP codes', () => {
    for (let i = 0; i < 20; i += 1) {
      expect(generateOtpCode()).toMatch(/^\d{6}$/);
    }
  });

  it('hashes OTP deterministically', () => {
    expect(hashOtpCode('123456')).toBe(hashOtpCode('123456'));
    expect(hashOtpCode('123456')).not.toBe(hashOtpCode('654321'));
  });

  it('sha256 is stable', () => {
    expect(sha256('token')).toHaveLength(64);
    expect(sha256('token')).toBe(sha256('token'));
  });
});
