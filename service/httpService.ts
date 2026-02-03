import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TokenService } from './tokenService';
import { authService } from './authService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

axios.interceptors.request.use(
  async (config) => {
    const token = TokenService.getAccessToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    

    if (TokenService.shouldRefreshToken() && !config.url?.includes('/auth/refresh')) {
      const refreshToken = TokenService.getRefreshToken();
      
      if (refreshToken && TokenService.isTokenValid(refreshToken)) {
        try {
          const { access_token } = await authService.refreshToken(refreshToken);
          TokenService.setTokens(
            access_token,
            refreshToken,
            TokenService.getUser()
          );
          config.headers.Authorization = `Bearer ${access_token}`;
        } catch (error) {
          TokenService.clearTokens();
          window.location.href = '/login';
          console.log(error)
        }
      }
    }
    
    return config;
  },
  (error) => console.log(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = TokenService.getRefreshToken();
      
      if (refreshToken) {
        try {
          const { access_token } = await authService.refreshToken(refreshToken);
          TokenService.setTokens(
            access_token,
            refreshToken,
            TokenService.getUser()
          );
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          TokenService.clearTokens();
          window.location.href = '/login';
        }
      } else {
        TokenService.clearTokens();
        window.location.href = '/login';
      }
    }
    
  }
);

const httpService = async <T = unknown>(
  url: string,
  method: HttpMethod,
  data?: any
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    url: `${API_URL}${url}`,
    method,
    data,
    headers: {
      'Content-Type': data instanceof FormData 
        ? 'multipart/form-data' 
        : 'application/json'
    }
  };
  
  return axios(config);
};

export default httpService;