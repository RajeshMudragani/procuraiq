import { Prisma } from '@prisma/client';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationType } from '../enums/notification-type.enum';

export class CreateSystemNotificationDto {
    tenantId!: string;
    userId!: string;
    type!: NotificationType;
    channel!: NotificationChannel;
    title!: string;
    message!: string;
    metadata?: Prisma.InputJsonValue;
}