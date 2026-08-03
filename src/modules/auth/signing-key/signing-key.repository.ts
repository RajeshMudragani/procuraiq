import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class SigningKeyRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    create(
        data: Prisma.SigningKeyCreateInput,
    ) {
        return this.prisma.signingKey.create({
            data,
        });
    }

    findById(
        id: string,
    ) {
        return this.prisma.signingKey.findUnique({
            where: {
                id,
            },
        });
    }

    findByKid(
        kid: string,
    ) {
        return this.prisma.signingKey.findUnique({
            where: {
                kid,
            },
        });
    }

    findActive() {
        return this.prisma.signingKey.findFirst({
            where: {
                isActive: true,
            },
        });
    }

    async deactivateAll() {
        return this.prisma.signingKey.updateMany({
            where: {
                isActive: true,
            },
            data: {
                isActive: false,
            },
        });
    }

    update(
        id: string,
        data: Prisma.SigningKeyUpdateInput,
    ) {
        return this.prisma.signingKey.update({
            where: {
                id,
            },
            data,
        });
    }

    findAll() {
        return this.prisma.signingKey.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    delete(
        id: string,
    ) {
        return this.prisma.signingKey.delete({
            where: {
                id,
            },
        });
    }
}