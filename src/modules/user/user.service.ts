import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TenantRepository } from '../tenant/tenant.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,

        private readonly tenantRepository: TenantRepository,
    ) {}

    async createUser(
        dto: CreateUserDto,
    ) {
        const tenant = await this.tenantRepository.findById(
            dto.tenantId,
        );

        if (!tenant) {
            throw new NotFoundException(
                'Tenant not found',
            );
        }

        const email = dto.email.trim().toLowerCase();

        const existingUser = await this.userRepository.findByTenantAndEmail(
            dto.tenantId,
            email,
        );

        if (existingUser) {
            throw new ConflictException(
                'User already exists',
            );
        }

        const passwordHash = await bcrypt.hash(
            dto.passwordHash,
            12,
        );

        return this.userRepository.create({
            tenant: {
                connect: {
                    id: dto.tenantId,
                },
            },
            email,
            firstName: dto.firstName.trim(),
            lastName: dto.lastName.trim(),
            passwordHash,
        });
    }

    async getUser(
        id: string,
    ) {
        const user = await this.userRepository.findById(
            id,
        );

        if (!user) {
            throw new NotFoundException(
                'User not found',
            );
        }

        return user;
    }

    async getUsers(
        page = 1,
        limit = 10,
    ) {
        return this.userRepository.findAll({
            page,
            limit,
        });
    }

    async updateUser(
        id: string,
        dto: UpdateUserDto,
    ) {
        await this.getUser(id);

        if (dto.email) {
            dto.email = dto.email.trim().toLowerCase();
        }

        return this.userRepository.update(
            id,
            dto,
        );
    }

    async deleteUser(
        id: string,
    ) {
        await this.getUser(id);

        return this.userRepository.delete(
            id,
        );
    }
}