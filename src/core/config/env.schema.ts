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

  JWT_SECRET: z.string(),

  JWT_REFRESH_SECRET: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;