import { Injectable, Logger } from '@nestjs/common';
import { AuditService } from '../../audit/audit.service';

@Injectable()
export class AuditHandler {
    private readonly logger =
        new Logger(
            AuditHandler.name,
        );

    constructor(
        private readonly auditService: AuditService,
    ) {}

    async handle(
        payload: any,
    ): Promise<void> {

        this.logger.log(
            `Handling audit event: ${payload?.eventType}`,
        );

        await this.auditService.createLog(
            payload?.eventType,
            'User',
            payload?.userId,
            payload?.triggeredBy,
            payload?.tenantId,
            null,
            payload,
        );
    }
}