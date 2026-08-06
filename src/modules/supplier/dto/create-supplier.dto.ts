import {
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateSupplierDto {

    @ApiProperty({
        example: 'bc7f4ec4-d4be-4469-9cf6-c0eea9a61eac',
        description: 'Tenant identifier',
    })
    @IsString()
    tenantId!: string;

    @ApiProperty({
        example: 'Dell Technologies India Pvt Ltd',
        description: 'Supplier name',
    })
    @IsString()
    name!: string;

    @ApiPropertyOptional({
        example: 'sales@dell.com',
        description: 'Supplier email address',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
        example: '+91-80-12345678',
        description: 'Supplier contact number',
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({
        example: 'Rahul Sharma',
        description: 'Primary contact person',
    })
    @IsOptional()
    @IsString()
    contactPerson?: string;

    @ApiPropertyOptional({
        example: 'GSTIN29ABCDE1234F1Z5',
        description: 'Tax registration number',
    })
    @IsOptional()
    @IsString()
    taxNumber?: string;

    @ApiPropertyOptional({
        example: 'Embassy Golf Links, Bangalore',
        description: 'Supplier address',
    })
    @IsOptional()
    @IsString()
    address?: string;
}