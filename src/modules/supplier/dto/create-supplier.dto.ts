import {
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateSupplierDto {

    @IsString()
    tenantId!: string;

    @IsString()
    name!: string;

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
}