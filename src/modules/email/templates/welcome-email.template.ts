import { EmailTemplate } from './email-template.interface';
import { BaseEmailTemplate } from './base-email.template';

export class WelcomeEmailTemplate {
    static build(
        userName: string,
    ): EmailTemplate {
        return BaseEmailTemplate.build(
            'Welcome to ProcuraIQ',
            'Welcome',
            `
                <p>
                    Welcome <b>${userName}</b>.
                </p>

                <p>
                    Your account has been created successfully.
                </p>
            `,
        );
    }
}