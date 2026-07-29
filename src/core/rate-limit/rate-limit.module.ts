import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimitConfig } from './constants/rate-limit.constants';

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                ttl: RateLimitConfig.GLOBAL.ttl,

                limit:
                RateLimitConfig.GLOBAL.limit,
            },
        ]),
    ],

    exports: [ThrottlerModule],
})
export class RateLimitModule {}