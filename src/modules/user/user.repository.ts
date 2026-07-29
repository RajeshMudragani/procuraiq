import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../core/database/prisma.service';
import { BaseRepository } from '../../common/repositories/base.repository';
import { PaginationOptions, PaginationResult } from '../../common/types/pagination.types';

@Injectable()
export class UserRepository extends BaseRepository {
    constructor(
        protected readonly prisma: PrismaService,
    ) {
        super(prisma);
    }

    async create(
        data: Prisma.UserCreateInput,
    ): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async findById(
        id: string,
    ): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
    }

    async findByEmail(
        email: string,
    ): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                email,
                isDeleted: false,
            },
        });
    }

    async findByTenantAndEmail(
        tenantId: string,
        email: string,
    ): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                tenantId,
                email,
                isDeleted: false,
            },
        });
    }

    async findAll(
        options: PaginationOptions,
    ): Promise<PaginationResult<User>> {
        return this.paginate<User>(
            this.prisma.user,
            options,
            {
                isDeleted: false,
            },
            {
                createdAt: 'desc',
            },
        );
    }

    async update(
        id: string,
        data: Prisma.UserUpdateInput,
    ): Promise<User> {
        return this.prisma.user.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(
        id: string,
        deletedBy?: string,
    ): Promise<User> {
        return super.softDelete(
            this.prisma.user,
            id,
            deletedBy,
        );
    }
}