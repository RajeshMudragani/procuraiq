import {
    ApprovalEntityType,
} from '@prisma/client';

export interface ApprovalEntityHandler {

    readonly entityType:
        ApprovalEntityType;

    markApproved(
        entityId: string,
    ): Promise<void>;

    markRejected?(
        entityId: string,
    ): Promise<void>;
}