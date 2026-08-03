import { CreateSystemNotificationDto } from '../dto/create-system-notification.dto';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationType } from '../enums/notification-type.enum';

export class UserUpdatedTemplate {
    static build(
        payload: any,
    ): CreateSystemNotificationDto {
        return {
            tenantId: payload.tenantId,
            userId: payload.userId,
            type: NotificationType.SYSTEM,
            channel: NotificationChannel.IN_APP,
            title: 'Profile Updated',
            message: 'Your profile information has been updated.',
            metadata: payload,
        };
    }
}