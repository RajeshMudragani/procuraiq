import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CreateSystemNotificationDto } from './dto/create-system-notification.dto';
import { NotificationRepository } from './notification.repository';
import { EmailQueueService } from './jobs/email.queue.service';
import { NotificationChannel } from './enums/notification-channel.enum';

@Injectable()
export class NotificationService {
    constructor(
        private readonly repository: NotificationRepository,
        private readonly emailQueueService: EmailQueueService,
    ) {}

    createNotification(
        dto: CreateNotificationDto,
    ) {
        return this.repository.create({
            tenantId: dto.tenantId,
            userId: dto.userId,
            type: dto.type,
            channel: dto.channel,
            title: dto.title,
            message: dto.message,
            metadata: dto.metadata as Prisma.InputJsonValue,
        });
    }

    async createSystemNotification(
        dto: CreateSystemNotificationDto,
    ) {
        const notification = await this.repository.create({
            tenantId: dto.tenantId,
            userId: dto.userId,
            type: dto.type,
            channel: dto.channel,
            title: dto.title,
            message: dto.message,
            metadata: dto.metadata as Prisma.InputJsonValue,
        });

        const email = (dto.metadata as any)?.email;
        if (
            email &&
            (
                dto.channel === NotificationChannel.EMAIL ||
                dto.channel === NotificationChannel.BOTH
            )
        ) {
            await this.emailQueueService.enqueue({
                to: email,
                subject: notification.title,
                html: notification.message,
            });
        }
        return notification;
    }

    getNotifications(
        userId: string,
    ) {
        return this.repository.findByUser(
            userId,
        );
    }

    getUnread(
        userId: string,
    ) {
        return this.repository.findUnread(
            userId,
        );
    }

    markAsRead(
        id: string,
    ) {
        return this.repository.markAsRead(
            id,
        );
    }

    markAllAsRead(
        userId: string,
    ) {
        return this.repository.markAllAsRead(
            userId,
        );
    }
}