import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailController } from './controllers/email.controller';
import { EmailFacade } from './email.facade';
import { EmailService } from './smtp/email.service';
import { EmailQueueService } from './queue/email.queue.service';
import { EmailProcessor } from './queue/email.processor';
import { EMAIL_QUEUE } from './queue/email.constants';

@Module({
    imports: [
        BullModule.registerQueue({
            name: EMAIL_QUEUE,
        }),
    ],

    controllers: [
        EmailController,
    ],

    providers: [
        EmailFacade,

        EmailService,

        EmailQueueService,
        EmailProcessor,
    ],

    exports: [
        EmailFacade,
        EmailService,
        EmailQueueService,
    ],
})
export class EmailModule {}