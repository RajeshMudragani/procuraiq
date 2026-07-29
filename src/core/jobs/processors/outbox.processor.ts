import {
  Job,
  Worker,
} from 'bullmq';

import { Logger } from '@nestjs/common';

const logger = new Logger(
  'OutboxProcessor',
);

export const outboxWorker =
  new Worker(
    'outbox',

    async (job: Job) => {
      logger.log(
        `Processing job ${job.id}`,
      );

      const {
        outboxEventId,
      } = job.data;

      logger.log(
        `Outbox event: ${outboxEventId}`,
      );

      /**
       * Tomorrow:
       *
       * 1. Read OutboxEvent
       * 2. Publish RabbitMQ Event
       * 3. Mark processed=true
       * 4. Set processedAt
       */
    },

    {
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
   },
);