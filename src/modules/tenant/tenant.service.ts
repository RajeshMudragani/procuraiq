import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TenantRepository } from './tenant.repository';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
    constructor(
        private readonly tenantRepository: TenantRepository,
    ) {}

    async createTenant( dto: CreateTenantDto ) {

        const code = dto.code.trim().toUpperCase();
        const exists = await this.tenantRepository.existsByCode( code );
        if (exists) {
            throw new ConflictException(
                `Tenant with code '${code}' already exists`,
            );
        }

        return this.tenantRepository.create({
            name: dto.name.trim(),
            code,
        });
    }

    async getTenant( id: string ) {

        const tenant = await this.tenantRepository.findById(id);
        if (!tenant) {
            throw new NotFoundException(
                `Tenant '${id}' not found`,
            );
        }
        return tenant;
    }

    async getTenants( page = 1, limit = 10 ) {
        return this.tenantRepository.findAll({
            page,
            limit,
        });
    }

    async updateTenant( id: string, dto: UpdateTenantDto ) {

        if (dto.code) {
            dto.code = dto.code.trim().toUpperCase();
        }
        await this.getTenant(id);
        return this.tenantRepository.update(
            id,
            dto,
        );
    }

    async deleteTenant( id: string ) {

        await this.getTenant(id);
        return this.tenantRepository.delete(
            id,
        );
    }
}