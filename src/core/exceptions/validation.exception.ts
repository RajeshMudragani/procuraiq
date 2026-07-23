import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ValidationException extends AppException {
    constructor(details?: unknown) {
        super(
            'VALIDATION_ERROR',
            HttpStatus.BAD_REQUEST,
            'Validation failed',
            details,
        );
    }
}