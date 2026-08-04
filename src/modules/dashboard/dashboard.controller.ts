import {
    Controller,
    Get,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {

    constructor(
        private readonly service: DashboardService,
    ) {}

    @Get('summary')
    @ApiOperation({
        summary: 'Get dashboard summary',
        description:
            'Returns procurement dashboard summary metrics including suppliers, RFQs, quotations, evaluations, awards, and purchase orders.',
    })
    @ApiResponse({
        status: 200,
        description:
            'Dashboard summary retrieved successfully.',
    })
    getSummary() {
        return this.service.getSummary();
    }
}