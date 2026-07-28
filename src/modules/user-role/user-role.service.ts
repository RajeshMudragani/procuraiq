import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';

import { UserRoleRepository } from './user-role.repository';

import { AssignRoleDto } from './dto/assign-role.dto';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async assignRole(
    dto: AssignRoleDto,
  ) {
    const user =
      await this.prisma.user.findUnique({
            where: {
                id: dto.userId,
            },
        });

    if (!user) {
        throw new NotFoundException(
            'User not found',
        );
    }

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

    const existing =
        await this.userRoleRepository.findUserRole(
            dto.userId,
            dto.roleId,
        );

    if (existing) {
        throw new ConflictException(
            'Role already assigned',
        );
    }

    return this.userRoleRepository.assignRole(
      dto.userId,
      dto.roleId,
    );
  }

  async getUserRoles(
    userId: string,
  ) {
    return this.userRoleRepository.getUserRoles(
        userId,
    );
  }

  async removeRole(
    dto: AssignRoleDto,
  ) {
    const existing =
        await this.userRoleRepository.findUserRole(
            dto.userId,
            dto.roleId,
        );

    if (!existing) {
        throw new NotFoundException(
            'User role not found',
        );
    }

        return this.userRoleRepository.removeRole(
            dto.userId,
            dto.roleId,
        );
    }
}