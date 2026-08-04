import { Module } from '@nestjs/common';

import { HealthModule } from '../core/health/health.module';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RbacModule } from '../core/rbac/rbac.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { RateLimitModule } from '../core/rate-limit/rate-limit.module';
import { RfqItemModule } from './rfq-item/rfq-item.module';
import { RfqModule } from './rfq/rfq.module';
import { SupplierModule } from './supplier/supplier.module';
import { EvaluationItemModule } from './evaluation-item/evaluation-item.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { AwardModule } from './award/award.module';
import { AwardItemModule } from './award-item/award-item.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { PurchaseOrderItemModule } from './purchase-order-item/purchase-order-item.module';
import { RfqSupplierModule } from './rfq-supplier/rfq-supplier.module';
import { QuotationModule } from './quotation/quotation.module';
import { QuotationItemModule } from './quotation-item/quotation-item.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ApprovalModule } from './approval/approval.module';

@Module({
    imports: [
        // Core Modules
        HealthModule,
        RateLimitModule,
        RbacModule,

        // Security Modules
        AuthModule,
        PermissionModule,
        RoleModule,
        RolePermissionModule,
        TenantModule,
        UserModule,
        UserRoleModule,

        // Business Modules
        ApprovalModule,

        AwardItemModule,
        AwardModule,

        DashboardModule,

        EvaluationItemModule,
        EvaluationModule,

        PurchaseOrderItemModule,
        PurchaseOrderModule,

        QuotationItemModule,
        QuotationModule,

        RfqItemModule,
        RfqModule,
        RfqSupplierModule,

        SupplierModule,
    ],
})

export class ModulesModule {}

