import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestContextService } from '../logging/request-context.service';
import { DateUtil } from '../../shared/utils/date.util';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    constructor(
        private readonly requestContext: RequestContextService,
    ) {}

    intercept( context: ExecutionContext, next: CallHandler ): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const requestContext = this.requestContext.getContext();

                return {
                    success: true,
                    data,
                    timestamp: DateUtil.toIsoString(new Date()),
                    requestId: requestContext?.requestId,
                    correlationId: requestContext?.correlationId,
                }
            }),
        );
    }
}
