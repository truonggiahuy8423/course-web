import {ErrorResponse} from './ErrorResponse'

export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    error: ErrorResponse;
  }