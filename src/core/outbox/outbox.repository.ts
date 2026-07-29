import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OutboxRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    create(
        data: Prisma.OutboxEventCreateInput,
    ) {
        return this.prisma.outboxEvent.create({
            data,
        });
    }

    findPending() {
        return this.prisma.outboxEvent.findMany({
            where: {
                processed: false,
            },

            orderBy: {
                createdAt: 'asc',
            },

            take: 100,
        });
    }

    update(
        id: string,
        data: Prisma.OutboxEventUpdateInput,
    ) {
        return this.prisma.outboxEvent.update({
            where: {
                id,
            },

            data,
        });
    }
}