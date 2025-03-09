import { AxiosResponse } from 'axios';
import api from '../http';
import { BuildComponentIds } from '../types/builds/BuildComponentIds';
import { BuildDetailsDto } from '../types/builds/BuildDetailsDto';
import { BuildDto } from '../types/builds/BuildDto';
import { CompatibilityResponse } from '../types/builds/CompatibilityResponse';
import { GetBuildsRequest } from '../types/builds/GetBuildsRequest';
import { SaveUpdateBuildRequest } from '../types/builds/SaveUpdateBuildRequest';
import { PagedResponse } from '../types/shared/PagedResponse';

export default class buildService {
  static async checkCompatibility(
    components: BuildComponentIds
  ): Promise<AxiosResponse<CompatibilityResponse>> {
    return api.post<CompatibilityResponse>('/build/check', { components });
  }

  static async getBuilds(
    request: GetBuildsRequest
  ): Promise<AxiosResponse<PagedResponse<BuildDto>>> {
    return api.get<PagedResponse<BuildDto>>('/build', {
      params: request,
    });
  }

  static async getBuildById(
    id: number
  ): Promise<AxiosResponse<BuildDetailsDto>> {
    return api.get<BuildDetailsDto>(`/build/${id}`);
  }

  static async deleteBuild(id: number): Promise<void> {
    return api.delete(`/build/${id}`);
  }

  static async saveBuild(
    request: SaveUpdateBuildRequest
  ): Promise<AxiosResponse<number>> {
    return api.post('/build', request);
  }

  static async updateBuild(
    id: number,
    request: SaveUpdateBuildRequest
  ): Promise<AxiosResponse<number>> {
    return api.put(`/build/${id}`, request);
  }
}
