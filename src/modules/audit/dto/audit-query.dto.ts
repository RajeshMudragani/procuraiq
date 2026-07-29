import {
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class AuditQueryDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    entity?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    userId?: string;
}