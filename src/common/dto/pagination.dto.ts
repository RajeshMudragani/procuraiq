import {
    IsInt,
    IsOptional,
    Max,
    Min,
} from 'class-validator';

import { Transform } from 'class-transformer';

import {
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class PaginationDto {

    @ApiPropertyOptional({
        example: 1,
        default: 1,
    })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    page: number = 1;

    @ApiPropertyOptional({
        example: 10,
        default: 10,
    })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 10;
}