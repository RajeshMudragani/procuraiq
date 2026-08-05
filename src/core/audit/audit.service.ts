import { Injectable } from '@nestjs/common';
import {
    AuditAction,
    Prisma,
} from '@prisma/client';

import { AuditRepository } from './audit.repository';

export interface CreateAuditLogDto {
    action: AuditAction;
    entityType: string;
    entityId?: string;
    userId?: string;
    tenantId?: string;
    oldData?: Prisma.InputJsonValue;
    newData?: Prisma.InputJsonValue;
    metadata?: Prisma.InputJsonValue;
}

@Injectable()
export class AuditService {
    constructor(
        private readonly auditRepository: AuditRepository,
    ) {}

    async log(
        dto: CreateAuditLogDto,
    ) {
        return this.auditRepository.create({
            action: dto.action,
            entityType: dto.entityType,
            entityId: dto.entityId,
            userId: dto.userId,
            tenantId: dto.tenantId,
            oldData: dto.oldData,
            newData: dto.newData,
            metadata: dto.metadata,
        });
    }

    async findAll() {
        return this.auditRepository.findAll();
    }

    async getAuditLogs() {
        return this.findAll();
    }

    async findByEntity(
        entityType: string,
        entityId: string,
    ) {
        return this.auditRepository.findByEntity(
            entityType,
            entityId,
        );
    }
}