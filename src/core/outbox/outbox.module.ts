import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { OutboxRepository } from './outbox.repository';
import { OutboxService } from './outbox.service';

@Module({
    imports: [PrismaModule],

    providers: [
        OutboxRepository,
        OutboxService,
    ],

    exports: [
        OutboxService,
    ],
})
export class OutboxModule {}