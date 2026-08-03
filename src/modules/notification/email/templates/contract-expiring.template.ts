import { EmailTemplateResult } from './email-template.interface';

export class ContractExpiringTemplate {
    static build(
        contractName: string,
        expiryDate: string,
    ): EmailTemplateResult {
        return {
            subject: `Contract Expiring Soon`,

            html: `
                <div style="font-family: Arial; max-width: 600px; margin:auto;">
                    <h1>
                        Contract Expiry Alert
                    </h1>

                    <p>
                        Contract
                        <strong>${contractName}</strong>
                        is expiring on
                        <strong>${expiryDate}</strong>.
                    </p>

                    <p>
                        Please review and renew if required.
                    </p>
                </div>
            `,
        };
    }
}