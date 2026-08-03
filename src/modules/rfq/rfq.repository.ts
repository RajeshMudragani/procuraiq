import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class RfqRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    create(
        data: Prisma.RfqUncheckedCreateInput,
    ) {
        return this.prisma.rfq.create({
            data,
        });
    }

    findAll() {
        return this.prisma.rfq.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.rfq.findUnique({
            where: {
                id,
            },
        });
    }

    update(
        id: string,
        data: Prisma.RfqUpdateInput,
    ) {
        return this.prisma.rfq.update({
            where: {
                id,
            },

            data,
        });
    }
}