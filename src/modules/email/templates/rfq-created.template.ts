import { EmailTemplate } from './email-template.interface';
import { BaseEmailTemplate } from './base-email.template';

export class RfqCreatedTemplate {
    static build(
        rfqNumber: string,
    ): EmailTemplate {
        return BaseEmailTemplate.build(
            'RFQ Created',
            'RFQ Created',
            `
                <p>
                    RFQ <b>${rfqNumber}</b>
                    has been created.
                </p>
            `,
        );
    }
}