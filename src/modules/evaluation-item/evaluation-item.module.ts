import { Module } from '@nestjs/common';
import { EvaluationItemRepository } from './evaluation-item.repository';
import { EvaluationItemService } from './evaluation-item.service';

@Module({
    providers: [
        EvaluationItemRepository,
        EvaluationItemService,
    ],

    exports: [
        EvaluationItemService,
    ],
})
export class EvaluationItemModule {}