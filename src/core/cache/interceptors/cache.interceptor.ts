import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Observable, from, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { CACHE_KEY } from '../decorators/cached.decorator';
import { CacheService } from '../cache.service';

@Injectable()
export class CacheInterceptor
    implements NestInterceptor
{
    constructor(
        private readonly reflector: Reflector,
        private readonly cacheService: CacheService,
    ) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        const cacheKey = this.reflector.get<string>(
            CACHE_KEY,
            context.getHandler(),
        );

        if (!cacheKey) {
            return next.handle();
        }

        return from(this.cacheService.get(cacheKey)).pipe(
            mergeMap((cached) => {
                if (cached) {
                return of(cached);
                }

                return next.handle().pipe(
                    tap((response) => {
                        void this.cacheService.set(
                            cacheKey,
                            response,
                        );
                    }),
                );
            }),
        );
    }
}