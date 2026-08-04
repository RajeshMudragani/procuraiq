import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';

import {
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    SupplierStatus
} from '../enums/supplier-status.enum';

export class UpdateSupplierDto {

    @ApiPropertyOptional({
        example: 'Dell Technologies India Pvt Ltd',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        example: 'sales@dell.com',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
        example: '+91-80-12345678',
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({
        example: 'Rahul Sharma',
    })
    @IsOptional()
    @IsString()
    contactPerson?: string;

    @ApiPropertyOptional({
        example: 'GSTIN29ABCDE1234F1Z5',
    })
    @IsOptional()
    @IsString()
    taxNumber?: string;

    @ApiPropertyOptional({
        example: 'Embassy Golf Links, Bangalore',
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({
        enum: SupplierStatus,
    })
    @IsOptional()
    @IsEnum(SupplierStatus)
    status?: SupplierStatus;
}