import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ValidationException extends AppException {
    constructor(details?: Record<string, unknown>[] | unknown) {
        super(
            'VALIDATION_ERROR',
            HttpStatus.BAD_REQUEST,
            'Validation failed',
            details,
        );
    }
}