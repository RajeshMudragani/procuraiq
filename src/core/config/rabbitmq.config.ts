export default () => ({
    rabbitmq: {
        url: process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5672',
        exchange: process.env.RABBITMQ_EXCHANGE ?? 'procuraiq.events',
    },
});