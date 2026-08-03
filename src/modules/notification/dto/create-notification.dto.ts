import {
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationType } from '../enums/notification-type.enum';

export class CreateNotificationDto {
    @ApiProperty({
        example: 'e356b2f4-c726-4835-9e2a-db359fb6ec26',
        description: 'Tenant ID',
    })
    @IsString()
    tenantId!: string;

    @ApiProperty({
        example: 'e1e5f88e-568e-4103-8902-e04c1064d09d',
        description: 'User ID',
    })
    @IsString()
    userId!: string;

    @ApiProperty({
        enum: NotificationType,
        example: NotificationType.PURCHASE_ORDER_APPROVED,
    })
    @IsEnum(NotificationType)
    type!: NotificationType;

    @ApiProperty({
        enum: NotificationChannel,
        example: NotificationChannel.BOTH,
    })
    @IsEnum(NotificationChannel)
    channel!: NotificationChannel;

    @ApiProperty({
        example: 'Purchase Order Approved',
    })
    @IsString()
    title!: string;

    @ApiProperty({
        example: 'Purchase Order PO-2026-001 has been approved.',
    })
    @IsString()
    message!: string;

    @ApiProperty({
        required: false,
        example: {
            poId: 'PO-2026-001',
            approvedBy: 'manager@procuraiq.com',
            value: 125000,
        },
    })
    @IsOptional()
    metadata?: Record<string, unknown>;
}