import { Module } from '@nestjs/common';

import { PrismaModule } from '../database/prisma.module';

import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { AuditRepository } from './audit.repository';
import { AuditInterceptor } from './interceptors/audit.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [PrismaModule],

    controllers: [
        AuditController,
    ],

    providers: [
        AuditService,
        AuditRepository,

        {
            provide: APP_INTERCEPTOR,
            useClass: AuditInterceptor,
        },
    ],

    exports: [
        AuditService,
    ],
})
export class AuditModule {}