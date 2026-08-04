import {
    IsArray,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import { CreateQuotationItemDto } from '../../quotation-item/dto/create-quotation-item.dto';

export class CreateQuotationDto {

    @ApiProperty({
        example: '9feaf695-1b63-43d7-88dc-07335fdc5698',
        description: 'RFQ identifier',
    })
    @IsString()
    rfqId!: string;

    @ApiProperty({
        example: 'supplier-001',
        description: 'Supplier identifier',
    })
    @IsString()
    supplierId!: string;

    @ApiPropertyOptional({
        example: 'Pricing valid for 60 days',
        description: 'Supplier remarks',
    })
    @IsOptional()
    @IsString()
    remarks?: string;

    @ApiProperty({
        type: [CreateQuotationItemDto],
        description: 'Quotation line items',
    })
    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(() => CreateQuotationItemDto)
    items!: CreateQuotationItemDto[];
}