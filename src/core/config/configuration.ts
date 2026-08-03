export default () => ({
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.PORT ?? '3000', 10),
    environment: process.env.NODE_ENV,
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  redis: {
    url: process.env.REDIS_URL,
  },

  rabbitmq: {
    url: process.env.RABBITMQ_URL,
  },

  auth: {
    jwtAccessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL,
    jwtRefreshTokenTtl: process.env.JWT_REFRESH_TOKEN_TTL,
  },
});