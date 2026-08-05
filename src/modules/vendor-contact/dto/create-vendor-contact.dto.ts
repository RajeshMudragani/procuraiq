import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateVendorContactDto {
    @ApiProperty({
        example: 'John Smith',
    })
    @IsString()
    name!: string;

    @ApiPropertyOptional({
        example: 'john@vendor.com',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
        example: '+91 9876543210',
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({
        example: 'Procurement Manager',
    })
    @IsOptional()
    @IsString()
    designation?: string;

    @ApiPropertyOptional({
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;
}