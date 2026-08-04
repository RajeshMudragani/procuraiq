import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateAwardItemDto {

    @ApiProperty({
        example: 'rfq-item-001',
        description: 'RFQ item identifier',
    })
    @IsString()
    rfqItemId!: string;

    @ApiProperty({
        example: 'quotation-item-001',
        description: 'Winning quotation item identifier',
    })
    @IsString()
    quotationItemId!: string;

    @ApiProperty({
        example: 100,
        description: 'Awarded quantity',
    })
    @IsNumber()
    awardedQuantity!: number;

    @ApiProperty({
        example: 58000,
        description: 'Awarded unit price',
    })
    @IsNumber()
    unitPrice!: number;

    @ApiPropertyOptional({
        example: 'Best commercial offer selected',
        description: 'Award item remarks',
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}