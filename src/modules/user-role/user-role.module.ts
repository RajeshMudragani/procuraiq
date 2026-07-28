import { Module } from '@nestjs/common';

import { PrismaModule } from '../../core/database/prisma.module';

import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';
import { UserRoleRepository } from './user-role.repository';

@Module({
    imports: [PrismaModule],

    controllers: [
        UserRoleController,
    ],

    providers: [
        UserRoleService,
        UserRoleRepository,
    ],

    exports: [
        UserRoleService,
        UserRoleRepository,
    ],
})
export class UserRoleModule {}