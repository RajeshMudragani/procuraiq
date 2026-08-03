import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/database/prisma.module';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';
import { EmailQueueService } from './jobs/email.queue.service';
import { EmailProcessor } from './jobs/email.processor';
import { EmailService } from './email/email.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        PrismaModule,
        BullModule.registerQueue({
            name: 'email',
        }),
    ],

    controllers: [
        NotificationController,
    ],

    providers: [
        NotificationRepository,
        NotificationService,

        EmailService,
        EmailQueueService,
        EmailProcessor,
    ],

    exports: [
        NotificationService,
    ],
})
export class NotificationModule {}