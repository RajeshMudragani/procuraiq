import { EmailTemplateResult } from './email-template.interface';

export class PurchaseOrderApprovedTemplate {
    static build(
        poNumber: string,
    ): EmailTemplateResult {
        return {
            subject: `Purchase Order ${poNumber} Approved`,

            html: `
                <div style="font-family: Arial; max-width: 600px; margin:auto;">
                    <h1>
                        Purchase Order Approved
                    </h1>

                    <p>
                        Purchase Order
                        <strong>${poNumber}</strong>
                        has been approved.
                    </p>

                    <p>
                        The procurement process can now continue.
                    </p>
                </div>
            `,
        };
    }
}