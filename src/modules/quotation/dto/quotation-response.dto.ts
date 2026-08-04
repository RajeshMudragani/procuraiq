import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    QuotationStatus,
} from '@prisma/client';

export class QuotationItemResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty()
    quotationId!: string;

    @ApiProperty()
    rfqItemId!: string;

    @ApiProperty({
        example: 58000,
    })
    unitPrice!: number;

    @ApiProperty({
        example: 100,
    })
    quantity!: number;

    @ApiPropertyOptional({
        example: 15,
    })
    leadTimeDays?: number | null;

    @ApiPropertyOptional({
        example: 'Delivery within 15 days',
    })
    remarks?: string | null;

    @ApiProperty()
    createdAt!: Date;
}

export class QuotationResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty()
    rfqId!: string;

    @ApiProperty()
    supplierId!: string;

    @ApiProperty({
        example: 'QTN-2026-0001',
    })
    quotationNumber!: string;

    @ApiProperty({
        enum: QuotationStatus,
    })
    status!: QuotationStatus;

    @ApiProperty({
        example: 6250000,
    })
    totalAmount!: number;

    @ApiPropertyOptional({
        example: 'Pricing valid for 60 days',
    })
    remarks?: string | null;

    @ApiPropertyOptional()
    submittedAt?: Date | null;

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty()
    updatedAt!: Date;

    @ApiProperty({
        type: [QuotationItemResponseDto],
    })
    items!: QuotationItemResponseDto[];
}