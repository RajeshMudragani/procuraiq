import { EvaluationStatus } from '@prisma/client';

export class EvaluationResponseDto {
    id!: string;

    rfqId!: string;

    evaluationNumber!: string;

    status!: EvaluationStatus;

    evaluatedBy!: string;

    notes?: string | null;

    createdAt!: Date;

    updatedAt!: Date;

    items!: any[];
}