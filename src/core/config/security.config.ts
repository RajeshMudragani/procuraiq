export const getSecurityConfig = () => ({
    cors: {
        origin: process.env.CORS_ORIGINS,

        credentials: true,
    },

    rateLimit: {
        ttl: 60_000,
        limit: 100,
    },
});
