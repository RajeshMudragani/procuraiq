import { Queue } from 'bullmq';

export class QueueFactory {
  static create(
    queueName: string,
  ): Queue {
        return new Queue(queueName, {
            connection: {
                host:
                process.env.REDIS_HOST ??
                'localhost',

                port: Number(
                process.env.REDIS_PORT ??
                    6379,
                ),
            },

            defaultJobOptions: {
                attempts: 5,

                removeOnComplete: 100,

                removeOnFail: 100,
            },
        });
    }
}