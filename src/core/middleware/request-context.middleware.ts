import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { RequestContextService } from '../logging/request-context.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {

    constructor(
        private readonly requestContext:
        RequestContextService,
    ) {}

    use( req: Request, res: Response, next: NextFunction ): void {

        const requestId = req.headers['x-request-id']?.toString() ?? randomUUID();
        const correlationId = req.headers['x-correlation-id']?.toString() ?? randomUUID();

        this.requestContext.run({ requestId, correlationId }, () => {
            next();
        });
    }
}