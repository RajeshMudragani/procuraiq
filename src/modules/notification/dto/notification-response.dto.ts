import { ApiProperty } from '@nestjs/swagger';

import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationType } from '../enums/notification-type.enum';

export class NotificationResponseDto {
    @ApiProperty({
        example: '8c4f43bd-71f2-4af3-95f2-a45b9bcdf001',
    })
    id!: string;

    @ApiProperty({
        example: 'tenant-001',
    })
    tenantId!: string;

    @ApiProperty({
        example: 'user-001',
    })
    userId!: string;

    @ApiProperty({
        enum: NotificationType,
        example: NotificationType.USER_INVITED,
    })
    type!: NotificationType;

    @ApiProperty({
        enum: NotificationChannel,
        example: NotificationChannel.BOTH,
    })
    channel!: NotificationChannel;

    @ApiProperty({
        example: 'Welcome to ProcuraIQ',
    })
    title!: string;

    @ApiProperty({
        example: 'You have been invited to ProcuraIQ.',
    })
    message!: string;

    @ApiProperty({
        example: {
            invitedBy: 'admin@procuraiq.com',
            role: 'PROCUREMENT_MANAGER',
        },
        required: false,
    })
    metadata?: Record<string, unknown>;

    @ApiProperty({
        example: false,
    })
    isRead!: boolean;

    @ApiProperty({
        example: null,
        nullable: true,
    })
    readAt!: Date | null;

    @ApiProperty({
        example: '2026-08-03T10:00:00.000Z',
    })
    createdAt!: Date;

    @ApiProperty({
        example: '2026-08-03T10:00:00.000Z',
    })
    updatedAt!: Date;
}