import { CompatibilityErrorResponse } from './CompatibilityErrorResponse';

export interface CompatibilityResponse {
  status: number;
  errors: CompatibilityErrorResponse[];
}
