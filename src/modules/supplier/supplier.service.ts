import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { SupplierStatus } from '@prisma/client';
import { EventsService } from '../../core/events/events.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierRepository } from './supplier.repository';

@Injectable()
export class SupplierService {

    constructor(
        private readonly repository: SupplierRepository
    ) {}

    async create(
        dto: CreateSupplierDto,
    ) {

        const supplier =
            await this.repository.create({
                tenantId: dto.tenantId,
                supplierCode: this.generateSupplierCode(),
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                contactPerson: dto.contactPerson,
                taxNumber: dto.taxNumber,
                address: dto.address,
                status: SupplierStatus.ACTIVE,
            });

        return supplier;
    }

    findAll() {
        return this.repository.findAll();
    }

    async findById(
        id: string,
    ) {

        const supplier = await this.repository.findById(
            id,
        );

        if (!supplier) {
            throw new NotFoundException(
                'Supplier not found',
            );
        }

        return supplier;
    }

    update(
        id: string,
        dto: UpdateSupplierDto,
    ) {
        return this.repository.update(
            id,
            dto,
        );
    }

    delete(
        id: string,
    ) {
        return this.repository.delete(
            id,
        );
    }

    private generateSupplierCode() {

        return `SUP-${
            new Date().getFullYear()
        }-${
            Date.now()
        }`;
    }
}