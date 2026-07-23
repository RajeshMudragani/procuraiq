import { HttpStatus } from '@nestjs/common';

export class AppException extends Error {
    constructor(
        public readonly code: string,
        public readonly statusCode: HttpStatus,
        public readonly message: string,
        public readonly details?: unknown,
    ) {
        super(message);
    }
}