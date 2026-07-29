import { Throttle } from '@nestjs/throttler';

export const LoginRateLimit = () =>
    Throttle({
        default: {
            limit: 5,
            ttl: 60_000,
        },
    });

export const RefreshRateLimit = () =>
    Throttle({
        default: {
            limit: 20,
            ttl: 60_000,
        },
    });

export const WriteRateLimit = () =>
    Throttle({
        default: {
            limit: 50,
            ttl: 60_000,
        },
    });