import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/database/prisma.module';
import { NotificationController } from './notification.controller';
import { NotificationPreferenceController } from '../notificatio-preference/notification-preference.controller';
import { NotificationRepository } from './notification.repository';
import { NotificationPreferenceRepository } from '../notificatio-preference/notification-preference.repository';
import { NotificationService } from './notification.service';
import { NotificationPreferenceService } from '../notificatio-preference/notification-preference.service';
import { EmailModule } from '../email/email.module';

@Module({
    imports: [
        PrismaModule,
        EmailModule,
    ],

    controllers: [
        NotificationController,
        NotificationPreferenceController,
    ],

    providers: [
        NotificationRepository,
        NotificationPreferenceRepository,

        NotificationService,
        NotificationPreferenceService,
    ],

    exports: [
        NotificationService,
        NotificationPreferenceService,
    ],
})
export class NotificationModule {}