import { CreateSystemNotificationDto } from '../dto/create-system-notification.dto';

export interface NotificationTemplate {
    build(
        payload: unknown,
    ): CreateSystemNotificationDto;
}