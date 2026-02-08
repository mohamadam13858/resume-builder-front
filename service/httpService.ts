import axios, { AxiosRequestConfig } from 'axios';
import { TokenService } from './tokenService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(null);
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            originalRequest.headers.Authorization = `Bearer ${TokenService.getAccessToken()}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = TokenService.getRefreshToken();

        if (!refreshToken || !TokenService.isTokenValid(refreshToken)) {
          throw new Error('Refresh token نامعتبر یا وجود ندارد');
        }
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        const { access_token, refresh_token } = response.data;

        TokenService.setTokens(
          access_token,
          refresh_token || refreshToken, 
          TokenService.getUser()
        );


        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);

        processQueue(refreshError);

        // شکست کامل → لاگ‌اوت
        TokenService.clearTokens();

        if (typeof window !== 'undefined') {
          window.location.href = '/login?session_expired=true';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);


const httpService = async <T = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
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