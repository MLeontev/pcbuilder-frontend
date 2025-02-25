import { AxiosResponse } from 'axios';
import api from '../http';
import { BuildComponentIds } from '../types/builds/BuildComponentIds';
import { CompatibilityResponse } from '../types/builds/CompatibilityResponse';

export default class buildService {
  static async checkCompatibility(
    components: BuildComponentIds
  ): Promise<AxiosResponse<CompatibilityResponse>> {
    return api.post<CompatibilityResponse>('/build/check', { components });
  }
}
