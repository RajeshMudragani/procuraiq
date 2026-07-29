import { Injectable } from '@nestjs/common';

import { AuditRepository } from './audit.repository';

@Injectable()
export class AuditService {
    constructor(
        private readonly auditRepository: AuditRepository,
    ) {}

    async createLog(
        action: string,
        entityName: string,
        entityId?: string,
        userId?: string,
        tenantId?: string,
        oldData?: unknown,
        newData?: unknown,
    ) {
        return this.auditRepository.create({
            action,
            entityName,
            entityId,
            userId,
            tenantId,
            oldData: oldData as object,
            newData: newData as object,
        });
    }

    async getAuditLogs() {
        return this.auditRepository.findAll();
    }
}