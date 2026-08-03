import { EmailTemplateResult } from './email-template.interface';

export class WelcomeEmailTemplate {
    static build(
        userName: string,
    ): EmailTemplateResult {
        return {
            subject:
                'Welcome to ProcuraIQ',

            html: `
                <!DOCTYPE html>
                <html>
                <body
                    style="
                        font-family: Arial, sans-serif;
                        background: #f5f7fa;
                        padding: 20px;
                    "
                >
                    <div
                        style="
                            max-width: 600px;
                            margin: auto;
                            background: white;
                            padding: 30px;
                            border-radius: 8px;
                        "
                    >
                        <h1
                            style="
                                color: #2563eb;
                            "
                        >
                            Welcome to ProcuraIQ
                        </h1>

                        <p>
                            Hi ${userName},
                        </p>

                        <p>
                            Your account has been
                            successfully created.
                        </p>

                        <p>
                            You can now access
                            the ProcuraIQ platform.
                        </p>

                        <hr />

                        <small>
                            ProcuraIQ Platform
                        </small>
                    </div>
                </body>
                </html>
            `,
        };
    }
}