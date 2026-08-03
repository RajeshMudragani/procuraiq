import {
    Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class RfqSupplierRepository {

    constructor(
        private readonly prisma:
            PrismaService,
    ) {}

    create(
        data: Prisma.RfqSupplierUncheckedCreateInput,
    ) {
        return this.prisma.rfqSupplier.create({
            data,
        });
    }

    findAll() {
        return this.prisma.rfqSupplier.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.rfqSupplier.findUnique({
            where: {
                id,
            },
        });
    }

    findByRfq(
        rfqId: string,
    ) {
        return this.prisma.rfqSupplier.findMany({
            where: {
                rfqId,
            },
        });
    }

    update(
        id: string,
        data: Prisma.RfqSupplierUpdateInput,
    ) {
        return this.prisma.rfqSupplier.update({
            where: {
                id,
            },

            data,
        });
    }

    delete(
        id: string,
    ) {
        return this.prisma.rfqSupplier.delete({
            where: {
                id,
            },
        });
    }
}
