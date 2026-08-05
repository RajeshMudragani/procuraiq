import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

import {
    VendorType,
} from '@prisma/client';

export class CreateVendorDto {
    @ApiProperty({
        example: 'VEND-0001',
    })
    @IsString()
    @MaxLength(50)
    vendorCode!: string;

    @ApiProperty({
        example: 'ABC Technologies Pvt Ltd',
    })
    @IsString()
    @MaxLength(255)
    name!: string;

    @ApiPropertyOptional({
        example: 'contact@abctech.com',
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
        example: 'https://abctech.com',
    })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiPropertyOptional({
        example: 'GSTIN123456789',
    })
    @IsOptional()
    @IsString()
    taxNumber?: string;

    @ApiPropertyOptional({
        example: '123 MG Road',
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({
        example: 'Bangalore',
    })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({
        example: 'Karnataka',
    })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiPropertyOptional({
        example: 'India',
    })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiPropertyOptional({
        example: '560001',
    })
    @IsOptional()
    @IsString()
    postalCode?: string;

    @ApiPropertyOptional({
        enum: VendorType,
        example: VendorType.SERVICE_PROVIDER,
    })
    @IsOptional()
    @IsEnum(VendorType)
    type?: VendorType;

    @ApiPropertyOptional({
        example: 'Preferred supplier for IT services',
    })
    @IsOptional()
    @IsString()
    notes?: string;
}