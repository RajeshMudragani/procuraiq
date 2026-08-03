import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
    ) {}

    @Post()
    create(
        @Body()
        dto: CreateNotificationDto,
    ) {
        return this.notificationService.createNotification(
            dto,
        );
    }

    @Get()
    getAll(
        @Query('userId')
        userId: string,
    ) {
        return this.notificationService.getNotifications(
            userId,
        );
    }

    @Get('unread')
    getUnread(
        @Query('userId')
        userId: string,
    ) {
        return this.notificationService.getUnread(
            userId,
        );
    }

    @Patch(':id/read')
    markAsRead(
        @Param('id')
        id: string,
    ) {
        return this.notificationService.markAsRead(
            id,
        );
    }

    @Patch('read-all')
    markAllAsRead(
        @Query('userId')
        userId: string,
    ) {
        return this.notificationService.markAllAsRead(
            userId,
        );
    }
}