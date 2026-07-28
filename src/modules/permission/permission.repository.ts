import { Injectable } from '@nestjs/common';

import {
  Permission,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class PermissionRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async create(
        data: Prisma.PermissionCreateInput,
    ): Promise<Permission> {
        return this.prisma.permission.create({
        data,
        });
    }

    async findById(
        id: string,
    ): Promise<Permission | null> {
        return this.prisma.permission.findUnique({
            where: {
                id,
            },
        });
    }

    async findByCode(
        code: string,
    ): Promise<Permission | null> {
        return this.prisma.permission.findUnique({
            where: {
                code,
            },
        });
    }

    async findMany(
        page: number,
        limit: number,
    ): Promise<Permission[]> {
        return this.prisma.permission.findMany({
            skip: (page - 1) * limit,
            take: limit,

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async update(
        id: string,
        data: Prisma.PermissionUpdateInput,
    ): Promise<Permission> {
        return this.prisma.permission.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(
        id: string,
    ): Promise<Permission> {
        return this.prisma.permission.delete({
            where: {
                id,
            },
        });
    }
}