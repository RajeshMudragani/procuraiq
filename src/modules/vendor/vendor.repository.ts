import { Injectable } from '@nestjs/common';
import { Prisma, VendorStatus, VendorType } from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class VendorRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    create(
        data: Prisma.VendorUncheckedCreateInput,
    ) {
        return this.prisma.vendor.create({
            data,
        });
    }

    findAll(
        status?: VendorStatus,
        type?: VendorType,
        name?: string,
    ) {
        return this.prisma.vendor.findMany({
            where: {
                ...(status && { status }),
                ...(type && { type }),
                ...(name && {
                    name: {
                        contains: name,
                        mode: 'insensitive',
                    },
                }),
            },

            include: {
                contacts: true,
            },

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.vendor.findUnique({
            where: {
                id,
            },

            include: {
                contacts: true,
            },
        });
    }

    update(
        id: string,
        data: Prisma.VendorUpdateInput,
    ) {
        return this.prisma.vendor.update({
            where: {
                id,
            },

            data,
        });
    }

    delete(
        id: string,
    ) {
        return this.prisma.vendor.delete({
            where: {
                id,
            },
        });
    }
}