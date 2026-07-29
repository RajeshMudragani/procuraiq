import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/database/prisma.module';

import { RolesGuard } from './guards/roles.guard';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
    imports: [PrismaModule],

    providers: [
        RolesGuard,
        PermissionsGuard,
    ],

    exports: [
        RolesGuard,
        PermissionsGuard,
    ],
})
export class RbacModule {}