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

import { CreateAwardItemDto } from '../../award-item/dto/create-award-item.dto';

export class CreateAwardDto {

    @ApiProperty({
        example: '9feaf695-1b63-43d7-88dc-07335fdc5698',
        description: 'RFQ identifier',
    })
    @IsString()
    rfqId!: string;

    @ApiProperty({
        example: 'evaluation-001',
        description: 'Evaluation identifier',
    })
    @IsString()
    evaluationId!: string;

    @ApiProperty({
        example: 'supplier-001',
        description: 'Selected supplier identifier',
    })
    @IsString()
    supplierId!: string;

    @ApiProperty({
        example: 'Rajesh Mudragani',
        description: 'Awarded by user',
    })
    @IsString()
    awardedBy!: string;

    @ApiPropertyOptional({
        example: 'Supplier selected based on highest evaluation score',
        description: 'Award remarks',
    })
    @IsOptional()
    @IsString()
    remarks?: string;

    @ApiProperty({
        type: [CreateAwardItemDto],
        description: 'Awarded line items',
    })
    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(() => CreateAwardItemDto)
    items!: CreateAwardItemDto[];
}