import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {

    private readonly transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

    async send(
        to: string,
        subject: string,
        html: string,
    ) {

        await this.transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            html,
        });
    }
}