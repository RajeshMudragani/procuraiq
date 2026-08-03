import { CreateSystemNotificationDto } from '../dto/create-system-notification.dto';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { NotificationType } from '../enums/notification-type.enum';

export class UserInvitedTemplate {
    static build(
        payload: any,
    ): CreateSystemNotificationDto {
        return {
            tenantId: payload.tenantId,
            userId: payload.userId,
            type: NotificationType.USER_INVITED,
            channel: NotificationChannel.BOTH,
            title: 'Welcome to ProcuraIQ',
            message: 'Your account has been created.',
            metadata: payload,
        };
    }
}