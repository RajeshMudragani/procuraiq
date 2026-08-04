import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import {
    ApprovalEntityType,
} from '@prisma/client';

import {
    ApprovalEntityHandler,
} from './handlers/approval-entity-handler.interface';

import {
    AwardApprovalHandler,
} from './handlers/award-approval.handler';

import {
    PurchaseOrderApprovalHandler,
} from './handlers/purchase-order-approval.handler';

@Injectable()
export class ApprovalRegistryService {

    private readonly handlers = new Map<
        ApprovalEntityType,
        ApprovalEntityHandler
    >();

    constructor(
        private readonly awardHandler: AwardApprovalHandler,
        private readonly purchaseOrderHandler: PurchaseOrderApprovalHandler,
    ) {

        this.register(
            this.awardHandler,
        );

        this.register(
            this.purchaseOrderHandler,
        );
    }

    private register(
        handler: ApprovalEntityHandler,
    ) {

        this.handlers.set(
            handler.entityType,
            handler,
        );
    }

    getHandler(
        entityType: ApprovalEntityType,
    ): ApprovalEntityHandler {

        const handler = this.handlers.get(
            entityType,
        );

        if (!handler) {
            throw new NotFoundException(
                `No approval handler registered for ${entityType}`,
            );
        }

        return handler;
    }
}