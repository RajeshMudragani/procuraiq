import { Module, forwardRef } from '@nestjs/common';
import { EvaluationItemModule } from '../evaluation-item/evaluation-item.module';
import { EvaluationController } from './evaluation.controller';
import { EvaluationRepository } from './evaluation.repository';
import { EvaluationService } from './evaluation.service';
import { QuotationModule } from '../quotation/quotation.module';

@Module({
    imports: [
        EvaluationItemModule,
        forwardRef(() => QuotationModule),
    ],

    controllers: [
        EvaluationController,
    ],

    providers: [
        EvaluationRepository,
        EvaluationService,
    ],

    exports: [
        EvaluationRepository,
        EvaluationService,
    ],
})
export class EvaluationModule {}