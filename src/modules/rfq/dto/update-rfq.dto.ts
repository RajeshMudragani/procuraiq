import {
    IsDateString,
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateRfqDto {

    @ApiPropertyOptional({
        example: 'Dell Laptop Procurement - Updated',
        description: 'RFQ title',
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({
        example: 'Updated RFQ description',
        description: 'RFQ description',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        example: 'INR',
        description: 'RFQ currency',
    })
    @IsOptional()
    @IsString()
    currency?: string;

    @ApiPropertyOptional({
        example: '2026-08-20T23:59:59.000Z',
        description: 'Updated submission deadline',
    })
    @IsOptional()
    @IsDateString()
    submissionDeadline?: Date;
}