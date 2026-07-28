import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class UserRoleRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async assignRole(
        userId: string,
        roleId: string,
    ) {
        return this.prisma.userRole.create({
            data: {
                userId,
                roleId,
            },
        });
    }

    async findUserRole(
        userId: string,
        roleId: string,
    ) {
        return this.prisma.userRole.findUnique({
            where: {
                    userId_roleId: {
                    userId,
                    roleId,
                },
            },
        });
    }

    async getUserRoles(
        userId: string,
    ) {
        return this.prisma.userRole.findMany({
            where: {
                userId,
            },
            include: {
                role: true,
            },
        });
    }

    async removeRole(
        userId: string,
        roleId: string,
    ) {
        return this.prisma.userRole.delete({
            where: {
                    userId_roleId: {
                    userId,
                    roleId,
                },
            },
        });
    }
}