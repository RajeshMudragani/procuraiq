export class UserEntity {
    id!: string;
    tenantId!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    isActive!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
}