import { QuotationStatus } from '@prisma/client';

export class QuotationItemResponseDto {
    id!: string;
    quotationId!: string;
    rfqItemId!: string;
    unitPrice!: number;
    quantity!: number;
    leadTimeDays?: number | null;
    remarks?: string | null;
    createdAt!: Date;
}

export class QuotationResponseDto {
    id!: string;
    rfqId!: string;
    supplierId!: string;
    quotationNumber!: string;
    status!: QuotationStatus;
    totalAmount!: number;
    remarks?: string | null;
    submittedAt?: Date | null;
    createdAt!: Date;
    updatedAt!: Date;
    items!: QuotationItemResponseDto[];
}