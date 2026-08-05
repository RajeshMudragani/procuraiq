import { VendorStatus, VendorType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class VendorFilterDto {
    @IsOptional()
    @IsEnum(VendorStatus)
    status?: VendorStatus;

    @IsOptional()
    @IsEnum(VendorType)
    type?: VendorType;

    @IsOptional()
    @IsString()
    name?: string;
}
