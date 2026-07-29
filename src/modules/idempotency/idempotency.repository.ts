import { Injectable } from '@nestjs/common';

import {
  IdempotencyKey,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class IdempotencyRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async findByKey(
        key: string,
    ): Promise<IdempotencyKey | null> {
        return this.prisma.idempotencyKey.findUnique({
            where: {
                key,
            },
        });
    }

    async create(
        data: Prisma.IdempotencyKeyCreateInput,
    ) {
        return this.prisma.idempotencyKey.create({
            data,
        });
    }

    async update(
        id: string,
        data: Prisma.IdempotencyKeyUpdateInput,
    ) {
        return this.prisma.idempotencyKey.update({
            where: {
                id,
            },
            data,
        });
    }
}