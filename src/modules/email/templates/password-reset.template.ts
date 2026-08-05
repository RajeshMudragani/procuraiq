import { EmailTemplate } from './email-template.interface';

export class PasswordResetTemplate {
    static build(
        resetLink: string,
    ): EmailTemplate {
        return {
            subject: 'Reset Your Password',

            html: `
                <div style="font-family: Arial; max-width: 600px; margin:auto;">
                    <h1>Password Reset</h1>

                    <p>
                        We received a password reset request.
                    </p>

                    <p>
                        ${resetLink}
                            Reset Password
                        </a>
                    </p>

                    <p>
                        If you did not request this change,
                        please ignore this email.
                    </p>
                </div>
            `,
        };
    }
}