import {
    Body,
    Controller,
    Get,
    Patch,
    Query,
} from '@nestjs/common';

import {
    ApiTags,
} from '@nestjs/swagger';

import { NotificationPreferenceService } from './notification-preference.service';
import { UpdateNotificationPreferenceDto } from './dto/update-notification-preference.dto';

@ApiTags('Notification Preferences')
@Controller(
    'notification-preferences',
)
export class NotificationPreferenceController {
    constructor(
        private readonly service: NotificationPreferenceService,
    ) {}

    @Get()
    getPreferences(
        @Query('userId')
        userId: string,
    ) {
        return this.service.getPreferences(
            userId,
        );
    }

    @Patch()
    updatePreferences(
        @Query('userId')
        userId: string,

        @Body()
        dto: UpdateNotificationPreferenceDto,
    ) {
        return this.service.updatePreferences(
            userId,
            dto,
        );
    }
}