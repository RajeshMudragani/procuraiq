import { Module } from '@nestjs/common';

import { PrismaModule } from '../../core/database/prisma.module';

import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionRepository } from './role-permission.repository';

@Module({
    imports: [PrismaModule],

    controllers: [
        RolePermissionController,
    ],

    providers: [
        RolePermissionService,
        RolePermissionRepository,
    ],

    exports: [
        RolePermissionService,
        RolePermissionRepository,
    ],
})
export class RolePermissionModule {}