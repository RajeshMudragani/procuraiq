import { Module } from '@nestjs/common';
import { EvaluationItemModule } from '../evaluation-item/evaluation-item.module';
import { EvaluationController } from './evaluation.controller';
import { EvaluationRepository } from './evaluation.repository';
import { EvaluationService } from './evaluation.service';

@Module({
    imports: [
        EvaluationItemModule,
    ],

    controllers: [
        EvaluationController,
    ],

    providers: [
        EvaluationRepository,
        EvaluationService,
    ],

    exports: [
        EvaluationService,
    ],
})
export class EvaluationModule {}