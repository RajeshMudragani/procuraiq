export const RateLimitConfig = {
    GLOBAL: {
        ttl: 60_000,
        limit: 100,
    },

    AUTH_LOGIN: {
        ttl: 60_000,
        limit: 5,
    },

    AUTH_REFRESH: {
        ttl: 60_000,
        limit: 20,
    },

    DEFAULT_WRITE: {
        ttl: 60_000,
        limit: 50,
    },
} as const;