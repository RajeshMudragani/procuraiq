import { Injectable } from '@nestjs/common';
import { EvaluationItemRepository } from './evaluation-item.repository';

@Injectable()
export class EvaluationItemService {

    constructor(
        private readonly repository: EvaluationItemRepository,
    ) {}

    createMany(
        evaluationId: string,
        items: any[],
    ) {

        return this.repository.createMany(
            items.map(
                item => ({
                    evaluationId,

                    ...item,

                    totalScore:
                        item.priceScore +
                        item.deliveryScore +
                        item.qualityScore,
                }),
            ),
        );
    }

    findByEvaluation(
        evaluationId: string,
    ) {
        return this.repository.findByEvaluation(
            evaluationId,
        );
    }
}
``