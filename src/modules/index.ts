import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserRoleModule } from './user-role/user-role.module';


@Module({
    imports: [
        HealthModule,
        TenantModule,
        UserModule,
        AuthModule,
        RoleModule,
        PermissionModule,
        UserRoleModule,
    ],
})

export class ModulesModule {}

