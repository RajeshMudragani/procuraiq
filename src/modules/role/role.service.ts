import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
    constructor(
        private readonly roleRepository: RoleRepository,
    ) {}

    async createRole(
        dto: CreateRoleDto,
    ) {
        const existingRole =
        await this.roleRepository.findByName(
            dto.name,
        );

        if (existingRole) {
            throw new ConflictException(
                'Role already exists',
            );
        }

        return this.roleRepository.create({

            name: dto.name,

            description: dto.description,
        });
    }

    async getRoles(
        page = 1,
        limit = 10,
    ) {
        return this.roleRepository.findMany(
            page,
            limit,
        );
    }

    async getRole(
        id: string,
    ) {
        const role =
        await this.roleRepository.findById(
            id,
        );

        if (!role) {
            throw new NotFoundException(
                'Role not found',
            );
        }

        return role;
    }

    async updateRole(
        id: string,
        dto: UpdateRoleDto,
    ) {
        await this.getRole(id);

        return this.roleRepository.update(
            id,
            {
                name: dto.name,
                description:
                dto.description,
            },
        );
    }

    async deleteRole(
        id: string,
    ) {
        await this.getRole(id);

        return this.roleRepository.softDelete(
            id,
        );
    }
}