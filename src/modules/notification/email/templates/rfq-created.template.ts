import { EmailTemplateResult } from './email-template.interface';

export class RfqCreatedTemplate {
    static build(
        rfqNumber: string,
    ): EmailTemplateResult {
        return {
            subject: `RFQ ${rfqNumber} Created`,

            html: `
                <div style="font-family: Arial; max-width: 600px; margin:auto;">
                    <h1>
                        New RFQ Created
                    </h1>

                    <p>
                        RFQ
                        <strong>${rfqNumber}</strong>
                        has been created.
                    </p>

                    <p>
                        Suppliers can now be invited to participate.
                    </p>
                </div>
            `,
        };
    }
}