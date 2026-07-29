import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import configuration from './core/config/configuration';
import { envSchema } from './core/config/env.schema';
import { PrismaModule } from './core/database/prisma.module';
import { AppLoggerModule } from './core/logging/logger.module';
import { RequestContextMiddleware } from './core/middleware/request-context.middleware';
import { ModulesModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      validate: (config) => {
        return envSchema.parse(config);
      },
      load: [configuration],
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 100,
      },
    ]),

    PrismaModule,
    AppLoggerModule,
    ModulesModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})

export class AppModule
  implements NestModule
{
  configure(
    consumer: MiddlewareConsumer,
  ) {
    consumer
    .apply(
      RequestContextMiddleware,
    )
    .forRoutes({
      path: '*path',
      method: RequestMethod.ALL,
    });
  }
}