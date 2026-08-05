import { Injectable } from '@nestjs/common';

import {
    Prisma,
} from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class VendorContactRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    create(
        data: Prisma.VendorContactUncheckedCreateInput,
    ) {
        return this.prisma.vendorContact.create({
            data,
        });
    }

    findByVendor(
        vendorId: string,
    ) {
        return this.prisma.vendorContact.findMany({
            where: {
                vendorId,
            },

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.vendorContact.findUnique({
            where: {
                id,
            },
        });
    }

    update(
        id: string,
        data: Prisma.VendorContactUpdateInput,
    ) {
        return this.prisma.vendorContact.update({
            where: {
                id,
            },
            data,
        });
    }

    delete(
        id: string,
    ) {
        return this.prisma.vendorContact.delete({
            where: {
                id,
            },
        });
    }

    async clearPrimaryContacts(
        vendorId: string,
    ) {
        return this.prisma.vendorContact.updateMany({
            where: {
                vendorId,
                isPrimary: true,
            },

            data: {
                isPrimary: false,
            },
        });
    }
}