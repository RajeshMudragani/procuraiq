import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

import { SendEmailDto } from '../dto/send-email.dto';
import { EmailFacade } from '../email.facade';

@ApiTags('Emails')
@Controller('emails')
export class EmailController {
    constructor(
        private readonly emailFacade: EmailFacade,
    ) {}

    @Post('send')
    @ApiOperation({
        summary: 'Send email',
    })
    async send(
        @Body()
        dto: SendEmailDto,
    ) {
        await this.emailFacade.send(
            dto.to,
            dto.subject,
            dto.html,
        );

        return {
            success: true,
        };
    }
}