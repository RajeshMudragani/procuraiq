import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { TenantRepository } from '../tenant/tenant.repository';
import { EventsModule } from '../../core/events/events.module';
import { OutboxModule } from '../../core/outbox/outbox.module';
import { JobsModule } from '../../core/jobs/jobs.module';

@Module({
    imports: [
        OutboxModule,
        JobsModule,
        EventsModule,
    ],

    controllers: [
        UserController,
    ],

    providers: [
        UserService,
        UserRepository,
        TenantRepository,
    ],

    exports: [
        UserService,
    ],
})

export class UserModule {}