import { Module } from '@nestjs/common';

import { PrismaModule } from '../../core/database/prisma.module';

import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';

@Module({
    imports: [
        PrismaModule,
    ],

    controllers: [
        NotificationController,
    ],

    providers: [
        NotificationRepository,
        NotificationService,
    ],

    exports: [
        NotificationService,
    ],
})
export class NotificationModule {}