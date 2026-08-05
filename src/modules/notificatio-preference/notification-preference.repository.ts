import { Injectable } from '@nestjs/common';

import {
    NotificationPreference,
    Prisma,
} from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class NotificationPreferenceRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    findByUser(
        userId: string,
    ): Promise<NotificationPreference | null> {
        return this.prisma.notificationPreference.findUnique({
            where: {
                userId,
            },
        });
    }

    upsert(
        userId: string,
        data: Prisma.NotificationPreferenceUncheckedCreateInput,
    ) {
        return this.prisma.notificationPreference.upsert({
            where: {
                userId,
            },

            create: data,

            update: {
                emailEnabled:
                    data.emailEnabled,

                inAppEnabled:
                    data.inAppEnabled,
            },
        });
    }
}