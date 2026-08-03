import { Injectable } from '@nestjs/common';

import { NotificationService } from '../../../modules/notification/notification.service';
import { NotificationChannel } from '../../../modules/notification/enums/notification-channel.enum';
import { NotificationType } from '../../../modules/notification/enums/notification-type.enum';
import { UserInvitedTemplate } from '../../../modules/notification/templates/user-invited.template';

@Injectable()
export class NotificationHandler {
    constructor(
        private readonly notificationService:
            NotificationService,
    ) {}

    async handle(
        routingKey: string,
        payload: any,
    ) {
        switch (routingKey) {

            case 'user.created':
                await this.handleUserCreated(
                    payload,
                );
                break;

            case 'user.updated':
                await this.handleUserUpdated(
                    payload,
                );
                break;

            case 'tenant.created':
                await this.handleTenantCreated(
                    payload,
                );
                break;

            default:
                break;
        }
    }

    private async handleUserCreated(
        payload: any,
    ) {
        const notification = UserInvitedTemplate.build(
            payload,
        );

        await this.notificationService.createSystemNotification(
            notification,
        );
    }

    private async handleUserUpdated(
        payload: any,
    ) {
        await this.notificationService.createSystemNotification({
            tenantId: payload.tenantId,
            userId: payload.userId,
            type: NotificationType.SYSTEM,
            channel: NotificationChannel.IN_APP,
            title: 'Profile Updated',
            message: 'Your profile has been updated.',
            metadata: payload,
        });
    }

    private async handleTenantCreated(
        payload: any,
    ) {
        await this.notificationService.createSystemNotification({
            tenantId: payload.tenantId,
            userId: payload.createdBy,
            type: NotificationType.SYSTEM,
            channel: NotificationChannel.IN_APP,
            title: 'Tenant Created',
            message: 'Tenant successfully created.',
            metadata: payload,
        });
    }
}
