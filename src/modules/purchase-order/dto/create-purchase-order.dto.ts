import {
    IsArray,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    CreatePurchaseOrderItemDto
} from '../../purchase-order-item/dto/create-purchase-order-item.dto';

export class CreatePurchaseOrderDto {

    @ApiProperty({
        example: 'award-001',
        description: 'Award identifier',
    })
    @IsString()
    awardId!: string;

    @ApiProperty({
        example: 'supplier-001',
        description: 'Supplier identifier',
    })
    @IsString()
    supplierId!: string;

    @ApiProperty({
        example: 'INR',
        description: 'Purchase order currency',
    })
    @IsString()
    currency!: string;

    @ApiProperty({
        example: 'Rajesh Mudragani',
        description: 'User issuing purchase order',
    })
    @IsString()
    issuedBy!: string;

    @ApiProperty({
        type: [CreatePurchaseOrderItemDto],
        description: 'Purchase order items',
    })
    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(() => CreatePurchaseOrderItemDto)
    items!: CreatePurchaseOrderItemDto[];
}
