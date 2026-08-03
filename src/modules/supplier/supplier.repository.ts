import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class SupplierRepository {

    constructor(
        private readonly prisma:
            PrismaService,
    ) {}

    create(
        data: Prisma.SupplierUncheckedCreateInput,
    ) {
        return this.prisma.supplier.create({
            data,
        });
    }

    findAll() {
        return this.prisma.supplier.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.supplier.findUnique({
            where: {
                id,
            },
        });
    }

    update(
        id: string,
        data: Prisma.SupplierUpdateInput,
    ) {
        return this.prisma.supplier.update({
            where: {
                id,
            },

            data,
        });
    }

    delete(
        id: string,
    ) {
        return this.prisma.supplier.delete({
            where: {
                id,
            },
        });
    }
}