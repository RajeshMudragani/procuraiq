import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailQueueService {
    async enqueue(
        job: unknown,
    ) {
        console.log(
            'Email job queued',
        );

        return job;
    }
}