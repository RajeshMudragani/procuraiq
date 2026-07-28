import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PermissionRepository } from './permission.repository';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        private readonly permissionRepository: PermissionRepository,
    ) {}

    async createPermission(
        dto: CreatePermissionDto,
    ) {
        const existingPermission =
        await this.permissionRepository.findByCode(
            dto.code,
        );

        if (existingPermission) {
            throw new ConflictException(
                'Permission already exists',
            );
        }

        return this.permissionRepository.create({
            code: dto.code,
            name: dto.name,
            description: dto.description,
        });
    }

    async getPermissions(
        page = 1,
        limit = 10,
    ) {
        return this.permissionRepository.findMany(
            page,
            limit,
        );
    }

    async getPermission(
        id: string,
    ) {
        const permission =
        await this.permissionRepository.findById(
            id,
        );

        if (!permission) {
            throw new NotFoundException(
                'Permission not found',
            );
        }

        return permission;
    }

    async updatePermission(
        id: string,
        dto: UpdatePermissionDto,
    ) {
        await this.getPermission(id);

        return this.permissionRepository.update(
            id,
            {
                code: dto.code,
                name: dto.name,
                description:
                dto.description,
            },
        );
    }

    async deletePermission(
        id: string,
    ) {
        await this.getPermission(id);

        return this.permissionRepository.delete(
            id,
        );
    }
}