import {
    Processor,
    WorkerHost,
} from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from '../email/email.service';
import { EMAIL_QUEUE } from './email.constants';

@Processor(
    EMAIL_QUEUE,
)
export class EmailProcessor
    extends WorkerHost
{
    constructor(
        private readonly emailService:
            EmailService,
    ) {
        super();
    }

    async process(
        job: Job,
    ) {
        await this.emailService.send(
            job.data.to,
            job.data.subject,
            job.data.html,
        );
    }
}