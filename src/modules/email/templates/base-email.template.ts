import { EmailTemplate } from './email-template.interface';

export class BaseEmailTemplate {
    static build(
        subject: string,
        title: string,
        content: string,
    ): EmailTemplate {
        return {
            subject,

            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background: #f5f7fa;
                            padding: 20px;
                        }

                        .container {
                            max-width: 600px;
                            margin: auto;
                            background: #ffffff;
                            padding: 24px;
                            border-radius: 8px;
                        }

                        .header {
                            font-size: 24px;
                            font-weight: bold;
                            color: #1f2937;
                            margin-bottom: 20px;
                        }

                        .content {
                            color: #4b5563;
                            line-height: 1.6;
                        }

                        .footer {
                            margin-top: 24px;
                            color: #9ca3af;
                            font-size: 12px;
                        }
                    </style>
                </head>

                <body>
                    <div class="container">
                        <div class="header">
                            ProcuraIQ
                        </div>

                        <h2>${title}</h2>

                        <div class="content">
                            ${content}
                        </div>

                        <div class="footer">
                            ProcuraIQ Notification Service
                        </div>
                    </div>
                </body>
                </html>
            `,
        };
    }
}