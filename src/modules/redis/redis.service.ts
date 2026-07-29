import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService
  implements
    OnModuleInit,
    OnModuleDestroy
{
    private client!: RedisClientType;

    async onModuleInit() {
        this.client = createClient({
        url: process.env.REDIS_URL ?? 'redis://localhost:6379',
        });

        await this.client.connect();
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    getClient(): RedisClientType {
        return this.client;
    }

    async get<T>(
        key: string,
    ): Promise<T | null> {
        const value = await this.client.get(key);

        if (!value) {
            return null;
        }

        return JSON.parse(value);
    }

    async set(
        key: string,
        value: unknown,
        ttlSeconds?: number,
    ) {
        const payload =
        JSON.stringify(value);

        if (ttlSeconds) {
            await this.client.set(
                key,
                payload,
                {
                    EX: ttlSeconds,
                },
            );

            return;
        }

        await this.client.set(
            key,
            payload,
        );
    }

    async delete(
        key: string,
    ) {
        await this.client.del(key);
    }

    async exists(
        key: string,
    ) {
        return this.client.exists(key);
    }
}