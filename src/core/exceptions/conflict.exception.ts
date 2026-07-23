import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ConflictException extends AppException {
    constructor(
        message = 'Resource conflict',
        details?: unknown,
    ) {
        super(
            'RESOURCE_CONFLICT',
            HttpStatus.CONFLICT,
            message,
            details,
        );
    }
}