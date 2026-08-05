import { EmailTemplate } from './email-template.interface';
import { BaseEmailTemplate } from './base-email.template';

export class ApprovalApprovedTemplate {
    static build(
        approvalId: string,
    ): EmailTemplate {
        return BaseEmailTemplate.build(
            'Approval Approved',
            'Approval Approved',
            `
                <p>
                    Approval <b>${approvalId}</b>
                    has been approved.
                </p>
            `,
        );
    }
}