import {
    Injectable,
    Logger,
} from '@nestjs/common';

@Injectable()
export class EmailProcessor {
    private readonly logger =
        new Logger(
            EmailProcessor.name,
        );

    async process(
        payload: unknown,
    ) {
        this.logger.log(
            'Email job received',
        );

        this.logger.debug(
            JSON.stringify(payload),
        );
    }
}