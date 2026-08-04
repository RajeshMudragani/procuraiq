import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { RequestContextService } from './request-context.service';

@Injectable()
export class LoggerService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly contextService: RequestContextService,
    ) {}

    info(
        message: string,
        metadata?: Record<string, unknown>,
    ): void {
        const context =
        this.contextService.getContext();

        this.logger.info({
            message,
            requestId: context?.requestId,
            correlationId: context?.correlationId,
            tenantId: context?.tenantId,
            userId: context?.userId,
            ...metadata,
        });
    }

    error( message: string, metadata?: Record<string, unknown> ): void {
        const context = this.contextService.getContext();

        this.logger.error({
            message,
            requestId: context?.requestId,
            correlationId: context?.correlationId,
            tenantId: context?.tenantId,
            userId: context?.userId,
            ...metadata,
        });
    }
}