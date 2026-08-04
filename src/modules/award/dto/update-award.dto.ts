import {
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateAwardDto {

    @ApiPropertyOptional({
        example: 'Award updated after negotiation',
        description: 'Award remarks',
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}