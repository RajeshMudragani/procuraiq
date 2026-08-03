import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CreateSystemNotificationDto } from './dto/create-system-notification.dto';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
    constructor(
        private readonly repository:
            NotificationRepository,
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

    createSystemNotification(
        dto: CreateSystemNotificationDto,
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