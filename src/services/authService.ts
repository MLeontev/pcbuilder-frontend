import axios, { AxiosResponse } from 'axios';
import api, { API_URL } from '../http';
import { AuthResponse } from '../types/AuthResponse';

export default class AuthService {
  private static AUTH_URL = `${API_URL}/auth`;

  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>(`${AuthService.AUTH_URL}/login`, {
      username,
      password,
    });
  }

  static async register(
    username: string,
    password: string,
    confirmPassword: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>(`${AuthService.AUTH_URL}/register`, {
      username,
      password,
      confirmPassword,
    });
  }

  static async logout(): Promise<void> {
    return api.post(`${AuthService.AUTH_URL}/logout`);
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return axios.get<AuthResponse>(`${AuthService.AUTH_URL}/refresh`, {
      withCredentials: true,
    });
  }
}
