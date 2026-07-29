import { Injectable } from '@nestjs/common';

import { RedisService } from '../redis/redis.service';

@Injectable()
export class CacheService {
    constructor(
        private readonly redisService: RedisService,
    ) {}

    async get<T>(
        key: string,
    ) {
        return this.redisService.get<T>(
            key,
        );
    }

    async set(
        key: string,
        value: unknown,
        ttlSeconds = 300,
    ) {
        return this.redisService.set(
            key,
            value,
            ttlSeconds,
        );
    }

    async delete(
        key: string,
    ) {
        return this.redisService.delete(
            key,
        );
    }
}
