import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(
    PrismaService.name,
  );

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });

    }


  async onModuleInit(): Promise<void> {
    await this.$connect();

    this.logger.log(
      'PostgreSQL connection established',
    );
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log(
      'PostgreSQL connection closed',
    );
  }

  async enableShutdownHooks(
    app: INestApplication,
  ): Promise<void> {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}