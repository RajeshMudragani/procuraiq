import { NotificationType } from '../../notification/enums/notification-type.enum';

import { WelcomeEmailTemplate } from '../templates/welcome-email.template';
import { PasswordResetTemplate } from '../templates/password-reset.template';
import { PurchaseOrderApprovedTemplate } from '../templates/po-approved.template';
import { RfqCreatedTemplate } from '../templates/rfq-created.template';
import { ContractExpiringTemplate } from '../templates/contract-expiring.template';
import { ApprovalApprovedTemplate } from '../templates/approval-approved.template';
import { ApprovalRejectedTemplate } from '../templates/approval-rejected.template';

export class EmailTemplateFactory {
    static build(
        notificationType: string,
        payload: any,
    ) {
        switch (notificationType) {

            case NotificationType.USER_INVITED:
                return WelcomeEmailTemplate.build(
                    payload.userName,
                );

            case NotificationType.PASSWORD_RESET:
                return PasswordResetTemplate.build(
                    payload.resetLink,
                );

            case NotificationType.PURCHASE_ORDER_APPROVED:
                return PurchaseOrderApprovedTemplate.build(
                    payload.poNumber,
                );

            case NotificationType.RFQ_CREATED:
                return RfqCreatedTemplate.build(
                    payload.rfqNumber,
                );

            case NotificationType.CONTRACT_EXPIRING:
                return ContractExpiringTemplate.build(
                    payload.contractName,
                    payload.expiryDate,
                );

            case NotificationType.APPROVAL_APPROVED:
                return ApprovalApprovedTemplate.build(
                    payload.approvalId,
                );

            case NotificationType.APPROVAL_REJECTED:
                return ApprovalRejectedTemplate.build(
                    payload.approvalId,
                );

            default:
                return {
                    subject: 'ProcuraIQ Notification',
                    html: '<p>Notification received.</p>',
                };
        }
    }
}