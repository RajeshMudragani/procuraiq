import { RfqStatus } from '@prisma/client';

export class RfqItemResponseDto {
    id!: string;
    rfqId!: string;
    itemName!: string;
    description?: string | null;
    quantity!: number;
    uom!: string;
    targetPrice?: number | null;
    createdAt!: Date;
}

export class RfqResponseDto {
    id!: string;
    tenantId!: string;
    rfqNumber!: string;
    title!: string;
    description?: string | null;
    status!: RfqStatus;
    currency!: string;
    submissionDeadline!: Date;
    createdBy!: string;
    createdAt!: Date;
    updatedAt!: Date;
    items!: RfqItemResponseDto[];
}
