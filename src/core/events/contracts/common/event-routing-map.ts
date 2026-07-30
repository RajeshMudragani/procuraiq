import { EventTypes } from './event-types';
import { RoutingKeys } from './routing-keys';

export const EventRoutingMap = {
    [EventTypes.USER_CREATED]: RoutingKeys.USER_CREATED,

    [EventTypes.USER_UPDATED]: RoutingKeys.USER_UPDATED,

    [EventTypes.USER_DELETED]: RoutingKeys.USER_DELETED,

    [EventTypes.USER_LOGIN]: RoutingKeys.USER_LOGIN,

    [EventTypes.USER_LOGOUT]: RoutingKeys.USER_LOGOUT,

    [EventTypes.TENANT_CREATED]: RoutingKeys.TENANT_CREATED,

    [EventTypes.TENANT_UPDATED]: RoutingKeys.TENANT_UPDATED,

    [EventTypes.ROLE_ASSIGNED]: RoutingKeys.ROLE_ASSIGNED,

    [EventTypes.ROLE_REMOVED]: RoutingKeys.ROLE_REMOVED,

    [EventTypes.PERMISSION_ASSIGNED]: RoutingKeys.PERMISSION_ASSIGNED,

    [EventTypes.PERMISSION_REMOVED]: RoutingKeys.PERMISSION_REMOVED,
};