import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from '../exceptions/app.exception';
import { RequestContextService } from '../logging/request-context.service';
import { DateUtil } from '../../common/utils/date.util';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly requestContextService: RequestContextService,
    ) {}

    catch(
        exception: unknown,
        host: ArgumentsHost,
    ): void {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const requestContext = this.requestContextService.getContext();

        if (exception instanceof AppException) {
            response
                .status(exception.statusCode)
                .json(
                    this.buildErrorResponse(
                        request,
                        requestContext,
                        exception.code,
                        exception.message,
                        exception.details,
                    ),
                );

            return;
        }

        if (exception instanceof HttpException) {
            response
                .status(exception.getStatus())
                .json(
                    this.buildErrorResponse(
                        request,
                        requestContext,
                        'HTTP_EXCEPTION',
                        exception.message,
                    ),
                );

            return;
        }

        response
        .status(
            HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json(
            this.buildErrorResponse(
                request,
                requestContext,
                'INTERNAL_SERVER_ERROR',
                'An unexpected error occurred',
            ),
        );
    }

    private buildErrorResponse(
        request: Request,
        requestContext: | ReturnType<RequestContextService['getContext']> | undefined,
        code: string,
        message: string,
        details?: unknown,
    ) {
        return {
            success: false,
            code,
            message,
            details: details ?? null,
            requestId: requestContext?.requestId,
            correlationId: requestContext?.correlationId,
            path: request.url,
            timestamp: DateUtil.toIsoString(new Date()),
        };
    }
}
