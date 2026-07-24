import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './core/database/prisma.service';
import { GlobalExceptionFilter } from './core/filters/global-exception.filter';
import { RequestContextService } from './core/logging/request-context.service';
import helmet from 'helmet';
const compression = require('compression');
const cookieParser = require('cookie-parser');
import { securityConfig } from './core/config/security.config';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    frameAncestors: ["'none'"],
                },
            },

            referrerPolicy: {
                policy: 'strict-origin-when-cross-origin',
            },

            frameguard: {
                action: 'deny',
            },

            noSniff: true,

            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true,
            },
        }),
    );

    app.use(compression());
    app.use(cookieParser());

    app.enableShutdownHooks();

    app.setGlobalPrefix('api');

    app.enableVersioning({
        type: VersioningType.URI,
    });

    const prisma = app.get(PrismaService);
    await prisma.enableShutdownHooks(app);

    const requestContextService = app.get(RequestContextService);

    app.enableCors({
        origin:
            securityConfig.cors.origin,

        credentials:
            securityConfig.cors.credentials,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.useGlobalFilters(
        new GlobalExceptionFilter(
            requestContextService,
        ),
    );

    app.useGlobalInterceptors(
        new ResponseInterceptor(
            requestContextService,
        ),
    );

    const configService = app.get(ConfigService);

    const port = configService.get<number>('app.port') ?? 3000;

    const swaggerConfig =
        new DocumentBuilder()
            .setTitle('ProcuraIQ API')
            .setDescription(
                'Procurement Cost Intelligence Platform API',
            )
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(app, swaggerConfig);

        SwaggerModule.setup(
            'api/docs',
            app,
            document,
        );

    await app.listen(port);

}


bootstrap();