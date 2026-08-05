import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import {
    AuditAction,
    VendorStatus,
    VendorType,
} from '@prisma/client';

import { VendorRepository } from './vendor.repository';

import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { AuditService } from '../../core/audit/audit.service';

@Injectable()
export class VendorService {
    constructor(
        private readonly repository: VendorRepository,
        private readonly auditService: AuditService,
    ) {}

    async create(
        dto: CreateVendorDto,
    ) {
        const vendor = await this.repository.create({
            tenantId: 'SYSTEM',
            ...dto,
            status: VendorStatus.DRAFT,
        });

        await this.auditService.log({
            action: AuditAction.CREATE,
            entityType: 'Vendor',
            entityId: vendor.id,
            newData: vendor as any,
        });

        return vendor;
    }

    findAll(
        status?: VendorStatus,
        type?: VendorType,
        name?: string,
    ) {
        return this.repository.findAll(
            status,
            type,
            name,
        );
    }

    async findById(
        id: string,
    ) {
        const vendor =
            await this.repository.findById(
                id,
            );

        if (!vendor) {
            throw new NotFoundException(
                'Vendor not found',
            );
        }

        return vendor;
    }

    async update(
        id: string,
        dto: UpdateVendorDto,
    ) {
        const oldVendor =
            await this.findById(id);

        const vendor =
            await this.repository.update(
                id,
                dto,
            );

        await this.auditService.log({
            action: AuditAction.UPDATE,
            entityType: 'Vendor',
            entityId: id,
            oldData: oldVendor as any,
            newData: vendor as any,
        });

        return vendor;
    }

    async delete(
        id: string,
    ) {
        const vendor =
            await this.findById(id);

        await this.repository.delete(
            id,
        );

        await this.auditService.log({
            action: AuditAction.DELETE,
            entityType: 'Vendor',
            entityId: id,
            oldData: vendor as any,
        });

        return {
            success: true,
        };
    }
}