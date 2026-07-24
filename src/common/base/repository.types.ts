export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

export interface SoftDeletable {
    isDeleted: boolean;
    deletedAt: Date | null;
    deletedBy: string | null;
}
