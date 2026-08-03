import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class RfqItemRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    createMany(
        data: Prisma.RfqItemCreateManyInput[],
    ) {
        return this.prisma.rfqItem.createMany({
            data,
        });
    }

    findByRfq(
        rfqId: string,
    ) {
        return this.prisma.rfqItem.findMany({
            where: {
                rfqId,
            },

            orderBy: {
                createdAt: 'asc',
            },
        });
    }

    update(
        id: string,
        data: Prisma.RfqItemUpdateInput,
    ) {
        return this.prisma.rfqItem.update({
            where: {
                id,
            },

            data,
        });
    }

    delete(
        id: string,
    ) {
        return this.prisma.rfqItem.delete({
            where: {
                id,
            },
        });
    }
}