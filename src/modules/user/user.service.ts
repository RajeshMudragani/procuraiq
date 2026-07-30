import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TenantRepository } from '../tenant/tenant.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { EventsService } from '../../core/events/events.service';
import { RoutingKeys } from '../../core/events/contracts/common/routing-keys';
import { UserCreatedEvent } from '../../core/events/contracts/user/user-created.event';
import { EventTypes } from '../../core/events/contracts/common/event-types';
import { OutboxService } from '../../core/outbox/outbox.service';
import { JobsService } from '../../core/jobs/jobs.service';


@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tenantRepository: TenantRepository,

        private readonly outboxService: OutboxService,
        private readonly jobsService: JobsService,
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

        const user = await this.userRepository.create({
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

        const event = new UserCreatedEvent();

        event.eventId = randomUUID();
        event.eventType = EventTypes.USER_CREATED;
        event.occurredAt = new Date();

        event.tenantId = user.tenantId;
        event.userId = user.id;
        event.email = user.email;

        event.firstName = user.firstName;
        event.lastName = user.lastName;
        event.isActive = user.isActive;

        const outboxEvent =
            await this.outboxService.createMessage(
                EventTypes.USER_CREATED,
                'User',
                user.id,
                event,
            );

        await this.jobsService.enqueueOutboxEvent(
            outboxEvent.id,
        );

        return user;
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