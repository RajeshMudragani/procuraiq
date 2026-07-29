export interface BaseJob<T = unknown> {
    name: string;
    data: T;
}