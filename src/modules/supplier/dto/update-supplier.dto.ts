import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';

import { SupplierStatus }
from '../enums/supplier-status.enum';

export class UpdateSupplierDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    contactPerson?: string;

    @IsOptional()
    @IsString()
    taxNumber?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsEnum(
        SupplierStatus,
    )
    status?: SupplierStatus;
}