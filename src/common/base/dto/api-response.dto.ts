export class ApiResponseDto<T> {
    success!: boolean;
    data!: T;
    timestamp!: string;
    requestId!: string;
    correlationId!: string;
}