import { EmailTemplate } from './email-template.interface';
import { BaseEmailTemplate } from './base-email.template';

export class PurchaseOrderApprovedTemplate {
    static build(
        poNumber: string,
    ): EmailTemplate {
        return BaseEmailTemplate.build(
            'Purchase Order Approved',
            'Purchase Order Approved',
            `
                <p>
                    Purchase Order
                    <b>${poNumber}</b>
                    has been approved.
                </p>
            `,
        );
    }
}