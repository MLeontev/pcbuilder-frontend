import { AxiosResponse } from 'axios';
import api from '../http';
import { ComponentDetailsResponse } from '../types/ComponentDetailsResponse';

export default class componentService {
  static async getComponentById(
    id: number,
    category: string
  ): Promise<AxiosResponse<ComponentDetailsResponse>> {
    return api.get<ComponentDetailsResponse>(`/${category}/${id}`);
  }
}
