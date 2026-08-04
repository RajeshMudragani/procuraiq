import { Module } from '@nestjs/common';
import { ApprovalController } from './approval.controller';
import { ApprovalRepository } from './approval.repository';
import { ApprovalService } from './approval.service';

@Module({
    controllers: [
        ApprovalController,
    ],

    providers: [
        ApprovalRepository,
        ApprovalService,
    ],

    exports: [
        ApprovalRepository,
        ApprovalService,
    ],
})
export class ApprovalModule {}