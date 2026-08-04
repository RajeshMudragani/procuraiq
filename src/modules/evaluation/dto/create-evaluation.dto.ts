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

import { CreateEvaluationItemDto } from '../../evaluation-item/dto/create-evaluation-item.dto';

export class CreateEvaluationDto {

    @ApiProperty({
        example: '9feaf695-1b63-43d7-88dc-07335fdc5698',
        description: 'RFQ identifier',
    })
    @IsString()
    rfqId!: string;

    @ApiProperty({
        example: 'Rajesh Mudragani',
        description: 'User performing evaluation',
    })
    @IsString()
    evaluatedBy!: string;

    @ApiPropertyOptional({
        example: 'Commercial and technical evaluation completed',
        description: 'Evaluation notes',
    })
    @IsOptional()
    @IsString()
    notes?: string;

    @ApiProperty({
        type: [CreateEvaluationItemDto],
        description: 'Supplier evaluation results',
    })
    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(() => CreateEvaluationItemDto)
    items!: CreateEvaluationItemDto[];
}