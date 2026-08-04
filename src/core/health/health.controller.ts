import { Controller, Get, Version } from '@nestjs/common';
import { LoggerService } from '../../core/logging/logger.service';
import { NotFoundException } from '../../core/exceptions/not-found.exception';

@Controller('health')
export class HealthController {
    constructor(
        private readonly logger: LoggerService,
    ) {}

    @Get()
    @Version('1')
    healthCheck() {
        this.logger.info(
            'Health endpoint called',
        );

        return {
            status: 'UP',
        };
    }

    @Get('error')
        testError() {
        throw new NotFoundException(
            'Vendor not found',
        );
    }
}