import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    SupplierStatus,
} from '@prisma/client';

export class SupplierResponseDto {

    @ApiProperty()
    id!: string;

    @ApiProperty()
    tenantId!: string;

    @ApiProperty({
        example: 'SUP-2026-0001',
    })
    supplierCode!: string;

    @ApiProperty({
        example: 'Dell Technologies India Pvt Ltd',
    })
    name!: string;

    @ApiPropertyOptional({
        example: 'sales@dell.com',
    })
    email?: string | null;

    @ApiPropertyOptional({
        example: '+91-80-12345678',
    })
    phone?: string | null;

    @ApiPropertyOptional({
        example: 'Rahul Sharma',
    })
    contactPerson?: string | null;

    @ApiPropertyOptional({
        example: 'GSTIN29ABCDE1234F1Z5',
    })
    taxNumber?: string | null;

    @ApiPropertyOptional({
        example: 'Embassy Golf Links, Bangalore',
    })
    address?: string | null;

    @ApiProperty({
        enum: SupplierStatus,
    })
    status!: SupplierStatus;

    @ApiProperty()
    createdAt!: Date;

    @ApiProperty()
    updatedAt!: Date;
}