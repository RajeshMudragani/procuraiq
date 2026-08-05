import { EmailTemplate } from './email-template.interface';
import { BaseEmailTemplate } from './base-email.template';

export class ApprovalRejectedTemplate {
    static build(
        approvalId: string,
    ): EmailTemplate {
        return BaseEmailTemplate.build(
            'Approval Rejected',
            'Approval Rejected',
            `
                <p>
                    Approval <b>${approvalId}</b>
                    has been rejected.
                </p>
            `,
        );
    }
}