import { Injectable } from '@nestjs/common';

import {
  Prisma,
  Role,
} from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class RoleRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async create(
        data: Prisma.RoleCreateInput,
    ): Promise<Role> {
        return this.prisma.role.create({
            data,
        });
    }

    async findById(
        id: string,
    ): Promise<Role | null> {
        return this.prisma.role.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
    }

    async findByName(
        name: string,
    ): Promise<Role | null> {
        return this.prisma.role.findFirst({
            where: {
                name,
                isDeleted: false,
            },
        });
    }

    async findMany(
        page: number,
        limit: number,
    ): Promise<Role[]> {
        return this.prisma.role.findMany({
            where: {
                isDeleted: false,
            },

            skip: (page - 1) * limit,

            take: limit,

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async update(
        id: string,
        data: Prisma.RoleUpdateInput,
    ): Promise<Role> {
        return this.prisma.role.update({
            where: {
                id,
            },

            data,
        });
    }

    async softDelete(
        id: string,
    ): Promise<Role> {
        return this.prisma.role.update({
            where: {
                id,
            },

            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        });
    }
}