import { BaseApiType } from '../types/baseApiType'

export const successResponse = <T>(
    data: T,
    message = 'Operation successful',
    metadata?: any,
): BaseApiType => ({
    status: 'success',
    message,
    data,
    metadata,
})

export const errorResponse = (
    message = 'Operation failed',
    metadata?: any,
): BaseApiType => ({
    status: 'error',
    message,
    metadata,
})

