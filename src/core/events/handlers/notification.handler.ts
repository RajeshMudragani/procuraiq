import { Injectable } from '@nestjs/common';
import { NotificationService } from '../../../modules/notification/notification.service';
import { NotificationTemplateFactory } from '../../../modules/notification/templates/notification-template.factory';

@Injectable()
export class NotificationHandler {
    constructor(
        private readonly notificationService: NotificationService,
    ) {}

    async handle(
        routingKey: string,
        payload: any,
    ): Promise<void> {

        const notification = NotificationTemplateFactory.build(
            routingKey,
            payload,
        );

        if (!notification) {
            return;
        }

        await this.notificationService
        .createSystemNotification(
            notification,
        );
    }
}