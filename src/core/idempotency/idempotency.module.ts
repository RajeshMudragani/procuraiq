import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/database/prisma.module';
import { IdempotencyRepository } from './idempotency.repository';
import { IdempotencyService } from './idempotency.service';

@Module({
    imports: [PrismaModule],

    providers: [
        IdempotencyRepository,
        IdempotencyService,
    ],

    exports: [
        IdempotencyService,
    ],
})
export class IdempotencyModule {}
