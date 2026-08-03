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

        RfqModule,
        RfqSupplierModule,
        RfqItemModule,
        SupplierModule,

        EvaluationModule,
        EvaluationItemModule,

        AwardModule,
        AwardItemModule,

        PurchaseOrderModule,
        PurchaseOrderItemModule,

        QuotationModule,
        QuotationItemModule,

        DashboardModule,

        ApprovalModule,
    ],
})

export class ModulesModule {}

