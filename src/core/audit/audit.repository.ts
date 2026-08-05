import { Injectable } from '@nestjs/common';
import {
    AuditLog,
    Prisma,
} from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

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

    async findAll(): Promise<AuditLog[]> {
        return this.prisma.auditLog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findByEntity(
        entityType: string,
        entityId: string,
    ): Promise<AuditLog[]> {
        return this.prisma.auditLog.findMany({
            where: {
                entityType,
                entityId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}