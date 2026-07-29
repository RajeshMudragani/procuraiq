import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class RolePermissionRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async assignPermission(
        roleId: string,
        permissionId: string,
    ) {
        return this.prisma.rolePermission.create({
            data: {
                roleId,
                permissionId,
            },
        });
    }

    async findRolePermission(
        roleId: string,
        permissionId: string,
    ) {
        return this.prisma.rolePermission.findUnique({
            where: {
                roleId_permissionId: {
                    roleId,
                    permissionId,
                },
            },
        });
    }

    async getRolePermissions(
        roleId: string,
    ) {
        return this.prisma.rolePermission.findMany({
            where: {
                roleId,
            },

            include: {
                permission: true,
            },
        });
    }

    async removePermission(
        roleId: string,
        permissionId: string,
    ) {
        return this.prisma.rolePermission.delete({
            where: {
                roleId_permissionId: {
                    roleId,
                    permissionId,
                },
            },
        });
    }
}