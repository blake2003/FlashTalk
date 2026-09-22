export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'local',
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? 'dev-access-secret-change-me',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret-change-me',
    accessTtl: process.env.JWT_ACCESS_TTL ?? '15m',
    refreshTtl: process.env.JWT_REFRESH_TTL ?? '30d',
  },
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS ?? '12', 10),
  email: {
    verificationTtlSeconds: parseInt(process.env.EMAIL_VERIFICATION_TTL ?? '600', 10),
    resendIntervalSeconds: parseInt(process.env.EMAIL_RESEND_INTERVAL ?? '60', 10),
  },
  s3: {
    endpoint: process.env.S3_ENDPOINT,
    bucket: process.env.S3_BUCKET,
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
  },
  chat: {
    sessionDurationSeconds: parseInt(
      process.env.CHAT_SESSION_DURATION_SECONDS ?? '600',
      10,
    ),
  },
  pairCooldown: {
    standardSeconds: parseInt(process.env.PAIR_COOLDOWN_STANDARD_SECONDS ?? '86400', 10),
    postChatSeconds: parseInt(process.env.PAIR_COOLDOWN_POST_CHAT_SECONDS ?? '604800', 10),
  },
  socket: {
    disconnectGraceSeconds: parseInt(
      process.env.SOCKET_DISCONNECT_GRACE_SECONDS ?? '120',
      10,
    ),
  },
});
