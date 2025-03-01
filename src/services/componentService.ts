import { AxiosResponse } from 'axios';
import qs from 'qs';
import api from '../http';
import { BuildComponentIds } from '../types/builds/BuildComponentIds';
import { ComponentDetailsDto } from '../types/pcComponents/ComponentDetailsDto';
import { ComponentDto } from '../types/pcComponents/ComponentDto';
import { GetComponentsRequest } from '../types/pcComponents/GetComponentsRequest';
import { GetComponentsResponse } from '../types/pcComponents/GetComponentsResponse';

export default class componentService {
  static async getComponentById(
    id: number,
    category: string
  ): Promise<AxiosResponse<ComponentDetailsDto>> {
    return api.get<ComponentDetailsDto>(`/${category}/${id}`);
  }

  static async getComponents(
    category: string,
    request: GetComponentsRequest
  ): Promise<AxiosResponse<GetComponentsResponse<ComponentDto>>> {
    return api.get<GetComponentsResponse<ComponentDto>>(`/${category}`, {
      params: request,
    });
  }

  static async getCompatibleComponents(
    category: string,
    request: GetComponentsRequest,
    buildComponentIds: BuildComponentIds
  ): Promise<AxiosResponse<GetComponentsResponse<ComponentDto>>> {
    return api.get<GetComponentsResponse<ComponentDto>>(
      `/${category}/compatible`,
      {
        params: { ...request, ...buildComponentIds },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: 'repeat' }),
      }
    );
  }
}
