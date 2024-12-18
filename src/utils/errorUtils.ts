import { AxiosError } from 'axios';
import { ApiError } from '../types/ApiError';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка. Попробуйте позже.';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError | undefined;
    console.error(apiError);
    return apiError?.message || DEFAULT_ERROR_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
}
