import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuditService } from './audit.service';

@ApiTags('Audit')
@Controller({
    path: 'audit',
    version: '1',
})
export class AuditController {
    constructor(
        private readonly auditService: AuditService,
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Get audit logs',
    })
    findAll() {
        return this.auditService.getAuditLogs();
    }
}