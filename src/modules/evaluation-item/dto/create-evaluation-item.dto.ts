import {
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateEvaluationItemDto {

    @ApiProperty({
        example: 'quotation-001',
        description: 'Quotation identifier being evaluated',
    })
    @IsString()
    quotationId!: string;

    @ApiProperty({
        example: 'supplier-001',
        description: 'Supplier identifier',
    })
    @IsString()
    supplierId!: string;

    @ApiProperty({
        example: 85,
        description: 'Price evaluation score',
    })
    @IsNumber()
    priceScore!: number;

    @ApiProperty({
        example: 90,
        description: 'Delivery evaluation score',
    })
    @IsNumber()
    deliveryScore!: number;

    @ApiProperty({
        example: 95,
        description: 'Quality evaluation score',
    })
    @IsNumber()
    qualityScore!: number;

    @ApiPropertyOptional({
        example: 'Best overall commercial and technical proposal',
        description: 'Evaluator remarks',
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}