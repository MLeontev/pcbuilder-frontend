import { AxiosResponse } from 'axios';
import api from '../http';
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
}
