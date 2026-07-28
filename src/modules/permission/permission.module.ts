import { Module } from '@nestjs/common';

import { PrismaModule } from '../../core/database/prisma.module';

import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';

@Module({
    imports: [PrismaModule],

    controllers: [
        PermissionController,
    ],

    providers: [
        PermissionService,
        PermissionRepository,
    ],

    exports: [
        PermissionService,
        PermissionRepository,
    ],
})
export class PermissionModule {}
