import { Module } from '@nestjs/common';
import { TenantRepository } from '../tenant/tenant.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
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