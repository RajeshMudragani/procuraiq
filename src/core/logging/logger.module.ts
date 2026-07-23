import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoModule } from 'nestjs-pino';
import { LoggerService } from './logger.service';
import { RequestContextService } from './request-context.service';

@Global()
@Module({
    imports: [
        PinoModule.forRoot({
            pinoHttp: {
                transport:
                process.env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined,
            },
        }),
    ],

    providers: [
        LoggerService,
        RequestContextService,
    ],

    exports: [
        LoggerService,
        RequestContextService,
    ],
})

export class AppLoggerModule {}
