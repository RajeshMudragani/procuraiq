import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum([
    'development',
    'test',
    'staging',
    'production',
  ]),

  PORT: z.coerce.number(),

  DATABASE_URL: z.string(),

  REDIS_URL: z.string(),

  RABBITMQ_URL: z.string(),

  JWT_ACCESS_TOKEN_TTL: z.string().default('15m'),

  JWT_REFRESH_TOKEN_TTL: z.string().default('7d'),

});

export type EnvSchema = z.infer<typeof envSchema>;