import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class NotFoundException extends AppException {
    constructor(
        message = 'Resource not found',
        details?: unknown,
    ) {
        super(
            'RESOURCE_NOT_FOUND',
            HttpStatus.NOT_FOUND,
            message,
            details,
        );
    }
}