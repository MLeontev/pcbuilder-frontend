import axios, { AxiosResponse } from 'axios';
import api, { API_URL } from '../http';
import { AuthResponse } from '../types/AuthResponse';

export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>(`/auth/login`, {
      username,
      password,
    });
  }

  static async register(
    username: string,
    password: string,
    confirmPassword: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>(`/auth/register`, {
      username,
      password,
      confirmPassword,
    });
  }

  static async logout(): Promise<void> {
    return api.post(`/auth/logout`);
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
      withCredentials: true,
    });
  }
}
