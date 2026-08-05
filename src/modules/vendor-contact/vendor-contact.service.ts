import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { AuditAction } from '@prisma/client';

import { AuditService } from '../../core/audit/audit.service';

import { VendorRepository } from '../vendor/vendor.repository';
import { VendorContactRepository } from './vendor-contact.repository';

import { CreateVendorContactDto } from './dto/create-vendor-contact.dto';
import { UpdateVendorContactDto } from './dto/update-vendor-contact.dto';

@Injectable()
export class VendorContactService {
    constructor(
        private readonly vendorRepository: VendorRepository,
        private readonly repository: VendorContactRepository,
        private readonly auditService: AuditService,
    ) {}

    async create(
        vendorId: string,
        dto: CreateVendorContactDto,
    ) {
        const vendor =
            await this.vendorRepository.findById(
                vendorId,
            );

        if (!vendor) {
            throw new NotFoundException(
                'Vendor not found',
            );
        }

        if (dto.isPrimary) {
            await this.repository.clearPrimaryContacts(
                vendorId,
            );
        }

        const contact =
            await this.repository.create({
                vendorId,
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                designation: dto.designation,
                isPrimary:
                    dto.isPrimary ?? false,
            });

        await this.auditService.log({
            action: AuditAction.CREATE,
            entityType: 'VendorContact',
            entityId: contact.id,
            newData: contact as any,
        });

        return contact;
    }

    findByVendor(
        vendorId: string,
    ) {
        return this.repository.findByVendor(
            vendorId,
        );
    }

    async update(
        id: string,
        dto: UpdateVendorContactDto,
    ) {
        const oldContact =
            await this.repository.findById(id);

        if (!oldContact) {
            throw new NotFoundException(
                'Vendor contact not found',
            );
        }

        if (
            dto.isPrimary &&
            oldContact.vendorId
        ) {
            await this.repository.clearPrimaryContacts(
                oldContact.vendorId,
            );
        }

        const contact =
            await this.repository.update(
                id,
                dto,
            );

        await this.auditService.log({
            action: AuditAction.UPDATE,
            entityType: 'VendorContact',
            entityId: id,
            oldData: oldContact as any,
            newData: contact as any,
        });

        return contact;
    }

    async delete(
        id: string,
    ) {
        const contact =
            await this.repository.findById(id);

        if (!contact) {
            throw new NotFoundException(
                'Vendor contact not found',
            );
        }

        await this.repository.delete(
            id,
        );

        await this.auditService.log({
            action: AuditAction.DELETE,
            entityType: 'VendorContact',
            entityId: id,
            oldData: contact as any,
        });

        return {
            success: true,
        };
    }
}