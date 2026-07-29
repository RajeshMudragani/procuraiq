import { Injectable } from '@nestjs/common';

import {
  AuditLog,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AuditRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async create(
        data: Prisma.AuditLogCreateInput,
    ): Promise<AuditLog> {
        return this.prisma.auditLog.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.auditLog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}