import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Observable, from } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IdempotencyService } from '../idempotency.service';
import { IDEMPOTENT_KEY } from '../decorators/idempotent.decorator';

@Injectable()
export class IdempotencyInterceptor
  implements NestInterceptor
{
    constructor(
        private readonly reflector: Reflector,
        private readonly idempotencyService: IdempotencyService,
    ) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        const enabled =
        this.reflector.get<boolean>(
            IDEMPOTENT_KEY,
            context.getHandler(),
        );

        if (!enabled) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();

        const key =
        request.headers[
            'idempotency-key'
        ];

        if (!key) {
            throw new BadRequestException(
                'Idempotency-Key header required',
            );
        }

        const requestHash =
        this.idempotencyService.generateHash(
            request.body,
        );

        return from(
            this.idempotencyService.findByKey(
                key,
            ),
        ).pipe(
            mergeMap(
                async (existing) => {
                if (
                    existing &&
                    existing.status ===
                    'COMPLETED'
                ) {
                    return existing.response;
                }

                if (!existing) {
                    await this.idempotencyService.createRecord(
                        key,
                        requestHash,
                        request.method,
                        request.route?.path ?? request.originalUrl,
                    );
                }

                return next.handle();
                },
            ),
        ) as unknown as Observable<any>;
    }
}