import { NotificationType } from '../../enums/notification-type.enum';

import { WelcomeEmailTemplate } from '../templates/welcome-email.template';
import { PasswordResetTemplate } from '../templates/password-reset.template';
import { PurchaseOrderApprovedTemplate } from '../templates/po-approved.template';
import { RfqCreatedTemplate } from '../templates/rfq-created.template';
import { ContractExpiringTemplate } from '../templates/contract-expiring.template';

export class EmailTemplateFactory {
    static build(
        notificationType: string,
        payload: any,
    ) {
        switch (notificationType) {

            case NotificationType.USER_INVITED:
                return WelcomeEmailTemplate.build(
                    payload.userName ?? 'User',
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

            default:
                return {
                    subject: 'ProcuraIQ Notification',
                    html: '<p>Notification received.</p>',
                };
        }
    }
}