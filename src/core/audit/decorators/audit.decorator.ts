import { SetMetadata } from '@nestjs/common';

export const AUDIT_KEY = 'audit';

export interface AuditMetadata {
    action: string;
    entityName: string;
}

export const Audit = (
    action: string,
    entityName: string,
) =>
    SetMetadata(
        AUDIT_KEY,
        {
            action,
            entityName,
        },
    );