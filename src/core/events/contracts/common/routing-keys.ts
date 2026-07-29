export const RoutingKeys = {
    USER_CREATED: 'user.created',
    USER_UPDATED: 'user.updated',
    USER_DELETED: 'user.deleted',

    ROLE_ASSIGNED: 'role.assigned',
    ROLE_REMOVED: 'role.removed',

    PERMISSION_ASSIGNED: 'permission.assigned',
    PERMISSION_REMOVED: 'permission.removed',

    USER_LOGIN: 'user.login',
    USER_LOGOUT: 'user.logout',

    TENANT_CREATED: 'tenant.created',
    TENANT_UPDATED: 'tenant.updated',
} as const;