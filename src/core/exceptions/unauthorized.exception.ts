import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class UnauthorizedException extends AppException {
    constructor(
        message = 'Unauthorized',
    ) {
        super(
            'UNAUTHORIZED',
            HttpStatus.UNAUTHORIZED,
            message,
        );
    }
}