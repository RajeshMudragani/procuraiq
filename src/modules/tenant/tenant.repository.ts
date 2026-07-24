import { Injectable } from '@nestjs/common';
import { Prisma, Tenant } from '@prisma/client';
import { PrismaService } from '../../core/database/prisma.service';
import { BaseRepository } from '../../common/base/base.repository';
import { PaginationOptions, PaginationResult } from '../../common/base/pagination.types';

@Injectable()
export class TenantRepository extends BaseRepository {
    constructor(
        protected readonly prisma: PrismaService,
    ) {
        super(prisma);
    }

    async create(
        data: Prisma.TenantCreateInput,
    ): Promise<Tenant> {
        return this.prisma.tenant.create({ data });
    }

    async findById( id: string ): Promise<Tenant | null> {
        return this.prisma.tenant.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
    }

    async findByCode( code: string ): Promise<Tenant | null> {
        return this.prisma.tenant.findFirst({
            where: {
                code,
                isDeleted: false,
            },
        });
    }

    async findAll( options: PaginationOptions ): Promise<PaginationResult<Tenant>> {
        return this.paginate<Tenant>(
            this.prisma.tenant,
            options,
            {
                isDeleted: false,
            },
        );
    }

    async update( id: string, data: Prisma.TenantUpdateInput ): Promise<Tenant> {
        return this.prisma.tenant.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(
        id: string,
        deletedBy?: string,
    ): Promise<Tenant> {
        return super.softDelete(
            this.prisma.tenant,
            id,
            deletedBy,
        );
    }

    async existsByCode( code: string ): Promise<boolean> {
        return this.exists(
            this.prisma.tenant,
            {
                code,
                isDeleted: false,
            },
        );
    }
}