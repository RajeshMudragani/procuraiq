import { RoutingKeys } from '../../../core/events/contracts/common/routing-keys';
import { TenantCreatedTemplate } from './tenant-created.template';
import { UserInvitedTemplate } from './user-invited.template';
import { UserUpdatedTemplate } from './user-updated.template';

export class NotificationTemplateFactory {
    static build(
        routingKey: string,
        payload: any,
    ) {
        switch (routingKey) {

            case RoutingKeys.USER_CREATED:
                return UserInvitedTemplate.build(
                    payload,
                );

            case RoutingKeys.USER_UPDATED:
                return UserUpdatedTemplate.build(
                    payload,
                );

            case RoutingKeys.TENANT_CREATED:
                return TenantCreatedTemplate.build(
                    payload,
                );

            default:
                return null;
        }
    }
}