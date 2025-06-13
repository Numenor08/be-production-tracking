export interface BaseApiType {
    status: 'success' | 'error';
    message?: string;
    data?: any;
    metadata?: any;
}