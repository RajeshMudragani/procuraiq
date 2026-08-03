import { SupplierStatus } from '@prisma/client';

export class SupplierResponseDto {
    id!: string;
    tenantId!: string;
    supplierCode!: string;
    name!: string;
    email?: string | null;
    phone?: string | null;
    contactPerson?: string | null;
    taxNumber?: string | null;
    address?: string | null;
    status!: SupplierStatus;
    createdAt!: Date;
    updatedAt!: Date;
}