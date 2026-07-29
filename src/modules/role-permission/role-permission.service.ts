import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';
import { RolePermissionRepository } from './role-permission.repository';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly rolePermissionRepository: RolePermissionRepository,
    ) {}

    async assignPermission(
        dto: AssignPermissionDto,
    ) {
        const role =
        await this.prisma.role.findUnique({
            where: {
                id: dto.roleId,
            },
        });

        if (!role) {
            throw new NotFoundException(
                'Role not found',
            );
        }

        const permission =
        await this.prisma.permission.findUnique({
            where: {
                id: dto.permissionId,
            },
        });

        if (!permission) {
            throw new NotFoundException(
                'Permission not found',
            );
        }

        const existing =
        await this.rolePermissionRepository.findRolePermission(
            dto.roleId,
            dto.permissionId,
        );

        if (existing) {
            throw new ConflictException(
                'Permission already assigned',
            );
        }

        return this.rolePermissionRepository.assignPermission(
            dto.roleId,
            dto.permissionId,
        );
    }

    async getRolePermissions(
        roleId: string,
    ) {
        return this.rolePermissionRepository.getRolePermissions(
        roleId,
        );
    }

    async removePermission(
        dto: AssignPermissionDto,
    ) {
        const existing =
        await this.rolePermissionRepository.findRolePermission(
            dto.roleId,
            dto.permissionId,
        );

        if (!existing) {
            throw new NotFoundException(
                'Role permission not found',
            );
        }

        return this.rolePermissionRepository.removePermission(
            dto.roleId,
            dto.permissionId,
        );
    }
}