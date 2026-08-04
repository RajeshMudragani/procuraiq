import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    PurchaseOrderStatus,
} from '@prisma/client';

export class PurchaseOrderItemResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty()
    purchaseOrderId!: string;

    @ApiProperty()
    awardItemId!: string;

    @ApiProperty({
        example: 'Dell Latitude 5440',
    })
    itemName!: string;

    @ApiProperty({
        example: 100,
    })
    quantity!: number;

    @ApiProperty({
        example: 58000,
    })
    unitPrice!: number;

    @ApiProperty({
        example: 5800000,
    })
    lineTotal!: number;

    @ApiPropertyOptional({
        example: 'Delivery within 15 working days',
    })
    remarks?: string | null;
}

export class PurchaseOrderResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty({
        example: 'award-001',
    })
    awardId!: string;

    @ApiProperty({
        example: 'supplier-001',
    })
    supplierId!: string;

    @ApiProperty({
        example: 'PO-2026-0001',
    })
    poNumber!: string;

    @ApiProperty({
        enum: PurchaseOrderStatus,
    })
    status!: PurchaseOrderStatus;

    @ApiProperty({
        example: 'INR',
    })
    currency!: string;

    @ApiProperty({
        example: 6200000,
    })
    totalAmount!: number;

    @ApiProperty({
        example: 'Rajesh Mudragani',
    })
    issuedBy!: string;

    @ApiPropertyOptional()
    issuedAt?: Date | null;

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty()
    updatedAt!: Date;

    @ApiProperty({
        type: [PurchaseOrderItemResponseDto],
    })
    items!: PurchaseOrderItemResponseDto[];
}