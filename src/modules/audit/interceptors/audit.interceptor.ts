import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuditService } from '../audit.service';
import {AUDIT_KEY, AuditMetadata } from '../decorators/audit.decorator';
import { DateUtil } from '../../../shared/utils/date.util';

@Injectable()
export class AuditInterceptor
  implements NestInterceptor
{
    constructor(
        private readonly reflector: Reflector,
        private readonly auditService: AuditService,
    ) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        const metadata =
        this.reflector.get<AuditMetadata>(
            AUDIT_KEY,
            context.getHandler(),
        );

        if (!metadata) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user;

        return next.handle().pipe(
            tap((result) => {
                void this.auditService.createLog(
                    `${metadata.action}_SUCCESS`,
                    metadata.entityName,
                    result?.id,
                    user?.userId,
                    user?.tenantId,
                    null,
                    result,
                );
            }),

            catchError((error) => {
                void this.auditService.createLog(
                    `${metadata.action}_FAILED`,
                    metadata.entityName,
                    undefined,
                    user?.userId,
                    user?.tenantId,
                    null,
                    {
                        message: error?.message,
                        statusCode: error?.status,
                        timestamp: DateUtil.toIsoString(new Date()),
                    },
                );

                return throwError(
                    () => error,
                );
            }),
        );
    }
}