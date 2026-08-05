import {
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateVendorContactDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    designation?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;
}