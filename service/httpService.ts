import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { TokenService } from './tokenService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

api.interceptors.request.use(config => {
  const token = TokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          withCredentials: true,
        });

        const { access_token } = response.data;

        TokenService.setTokens(access_token, TokenService.getUser());

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest); 
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        TokenService.clearTokens();

        if (typeof window !== 'undefined') {
          window.location.href = '/login?reason=session_expired';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const httpService = async <T = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api({
    url,
    method,
    data,
    ...config,
  });
  return response.data;
};

export default httpService;