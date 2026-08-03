import { CreateSystemNotificationDto } from '../dto/create-system-notification.dto';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationType } from '../enums/notification-type.enum';

export class TenantCreatedTemplate {
    static build(
        payload: any,
    ): CreateSystemNotificationDto {
        return {
            tenantId: payload.tenantId,
            userId: payload.createdBy ?? payload.userId,
            type: NotificationType.SYSTEM,
            channel: NotificationChannel.IN_APP,
            title: 'Tenant Created',
            message: `Tenant ${payload.tenantName ?? payload.tenantId} was created successfully.`,
            metadata: payload,
        };
    }
}