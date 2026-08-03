import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EMAIL_JOB, EMAIL_QUEUE } from './email.constants';
import { EmailJobData } from './email.interface';

@Injectable()
export class EmailQueueService {
    constructor(
        @InjectQueue(EMAIL_QUEUE)
        private readonly queue: Queue,
    ) {}

    async enqueue(
        data: EmailJobData,
    ) {

        await this.queue.add(
            EMAIL_JOB,
            data,
            {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },
                removeOnComplete: 100,
                removeOnFail: 100,
            },
        );
    }
}