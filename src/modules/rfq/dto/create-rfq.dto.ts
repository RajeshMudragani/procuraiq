import {
    IsArray,
    IsDateString,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import { CreateRfqItemDto } from '../../rfq-item/dto/create-rfq-item.dto';

export class CreateRfqDto {

    @ApiProperty({
        example: 'e356b2f4-c726-4835-9e2a-db359fb6ec26',
        description: 'Tenant identifier',
    })
    @IsString()
    tenantId!: string;

    @ApiProperty({
        example: 'Dell Laptop Procurement - Approval Test',
        description: 'RFQ title',
    })
    @IsString()
    title!: string;

    @ApiPropertyOptional({
        example: 'RFQ approval workflow testing',
        description: 'RFQ description',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        example: 'INR',
        description: 'RFQ currency',
    })
    @IsString()
    currency!: string;

    @ApiProperty({
        example: '2026-08-15T23:59:59.000Z',
        description: 'Quotation submission deadline',
    })
    @IsDateString()
    submissionDeadline!: Date;

    @ApiProperty({
        example: 'Rajesh Mudragani',
        description: 'RFQ creator',
    })
    @IsString()
    createdBy!: string;

    @ApiProperty({
        type: [CreateRfqItemDto],
    })
    @IsArray()
    @ValidateNested({
        each: true,
    })
    @Type(() => CreateRfqItemDto)
    items!: CreateRfqItemDto[];
}