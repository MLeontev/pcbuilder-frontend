import { AxiosResponse } from 'axios';
import api from '../http';
import { ComponentDetailsResponse } from '../types/pcComponents/ComponentDetailsResponse';
import { ComponentResponse } from '../types/pcComponents/ComponentResponse';
import { GetComponentsRequest } from '../types/pcComponents/GetComponentsRequest';
import { GetComponentsResponse } from '../types/pcComponents/GetComponentsResponse';

export default class componentService {
  static async getComponentById(
    id: number,
    category: string
  ): Promise<AxiosResponse<ComponentDetailsResponse>> {
    return api.get<ComponentDetailsResponse>(`/${category}/${id}`);
  }

  static async getComponents(
    category: string,
    request: GetComponentsRequest
  ): Promise<AxiosResponse<GetComponentsResponse<ComponentResponse>>> {
    return api.get<GetComponentsResponse<ComponentResponse>>(`/${category}`, {
      params: request,
    });
  }
}
