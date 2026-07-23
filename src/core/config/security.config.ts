export const securityConfig = {
    cors: {
        origin: [
            'http://localhost:3001',
        ],

        credentials: true,
    },

    rateLimit: {
        ttl: 60_000,
        limit: 100,
    },
};