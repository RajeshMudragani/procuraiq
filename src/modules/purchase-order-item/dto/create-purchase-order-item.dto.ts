import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreatePurchaseOrderItemDto {

    @ApiProperty({
        example: 'award-item-001',
        description: 'Award item identifier',
    })
    @IsString()
    awardItemId!: string;

    @ApiProperty({
        example: 'Dell Latitude 5440',
        description: 'Item name',
    })
    @IsString()
    itemName!: string;

    @ApiProperty({
        example: 100,
        description: 'Ordered quantity',
    })
    @IsNumber()
    quantity!: number;

    @ApiProperty({
        example: 58000,
        description: 'Unit price',
    })
    @IsNumber()
    unitPrice!: number;

    @ApiPropertyOptional({
        example: 'Delivery within 15 working days',
        description: 'Item remarks',
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}