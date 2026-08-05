import { Injectable } from '@nestjs/common';
import { EmailQueueService } from './queue/email.queue.service';

@Injectable()
export class EmailFacade {
    constructor(
        private readonly queue: EmailQueueService,
    ) {}

    async send(
        to: string,
        subject: string,
        html: string,
    ) {
        return this.queue.enqueue({
            to,
            subject,
            html,
        });
    }
}