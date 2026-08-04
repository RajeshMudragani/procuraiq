import {
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateQuotationDto {

    @ApiPropertyOptional({
        example: 'Updated commercial terms',
        description: 'Quotation remarks',
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}