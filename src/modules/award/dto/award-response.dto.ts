import { AwardStatus } from '@prisma/client';

export class AwardResponseDto {
    id!: string;
    rfqId!: string;
    evaluationId!: string;
    supplierId!: string;
    awardNumber!: string;
    status!: AwardStatus;
    awardedBy!: string;
    awardedAt?: Date | null;
    remarks?: string | null;
    createdAt!: Date;
    updatedAt!: Date;
    items!: any[];
}