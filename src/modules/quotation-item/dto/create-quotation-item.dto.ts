import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateQuotationItemDto {

    @ApiProperty({
        example: 'rfq-item-001',
        description: 'RFQ item identifier',
    })
    @IsString()
    rfqItemId!: string;

    @ApiProperty({
        example: 58000,
        description: 'Quoted price per unit',
    })
    @IsNumber()
    unitPrice!: number;

    @ApiProperty({
        example: 100,
        description: 'Quoted quantity',
    })
    @IsNumber()
    quantity!: number;

    @ApiPropertyOptional({
        example: 15,
        description: 'Lead time in days',
    })
    @IsOptional()
    @IsNumber()
    leadTimeDays?: number;

    @ApiPropertyOptional({
        example: 'Delivery within 15 working days',
        description: 'Supplier remarks for this item',
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}
