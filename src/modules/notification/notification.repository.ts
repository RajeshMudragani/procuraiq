import { Injectable } from '@nestjs/common';

import {
    Prisma,
} from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class NotificationRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    create(
        data: Prisma.NotificationUncheckedCreateInput,
    ) {
        return this.prisma.notification.create({
            data,
        });
    }

    findByUser(
        userId: string,
    ) {
        return this.prisma.notification.findMany({
            where: {
                userId,
            },

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findUnread(
        userId: string,
    ) {
        return this.prisma.notification.findMany({
            where: {
                userId,
                isRead: false,
            },

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    markAsRead(
        id: string,
    ) {
        return this.prisma.notification.update({
            where: {
                id,
            },

            data: {
                isRead: true,
                readAt: new Date(),
            },
        });
    }

    markAllAsRead(
        userId: string,
    ) {
        return this.prisma.notification.updateMany({
            where: {
                userId,
                isRead: false,
            },

            data: {
                isRead: true,
                readAt: new Date(),
            },
        });
    }
}