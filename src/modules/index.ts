import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RbacModule } from './rbac/rbac.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { RateLimitModule } from './rate-limit/rate-limit.module';

@Module({
    imports: [
        HealthModule,
        RateLimitModule,
        AuthModule,
        TenantModule,
        UserModule,
        RoleModule,
        PermissionModule,
        UserRoleModule,
        RolePermissionModule,
        RbacModule,
    ],
})

export class ModulesModule {}

