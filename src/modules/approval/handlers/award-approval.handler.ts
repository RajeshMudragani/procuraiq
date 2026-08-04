import { Injectable } from '@nestjs/common';
import { ApprovalEntityType } from '@prisma/client';
import { AwardService } from '../../award/award.service';
import { ApprovalEntityHandler } from './approval-entity-handler.interface';

@Injectable()
export class AwardApprovalHandler
implements ApprovalEntityHandler {

    readonly entityType = ApprovalEntityType.AWARD;

    constructor(
        private readonly awardService: AwardService,
    ) {}

    async markApproved(
        entityId: string,
    ): Promise<void> {

        await this.awardService.markApproved(
            entityId,
        );
    }
}