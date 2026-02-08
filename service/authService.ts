import axios from 'axios';
import httpService from './httpService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    email: string;
    fullName: string;
    phone?: string;
  };
}

export interface UserProfile {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  createdAt?: Date;
}

class AuthService {
  async login(credentials: LoginCredentials) {
    try {
      const response = await httpService(`/auth/login`, 'POST', credentials);
      return response as any;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'خطا در ورود'
      );
    }
  }


  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await httpService(`/auth/register`, 'POST', data);
      return response as any;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'خطا در ثبت‌نام'
      );
    }
  }


  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const response = await httpService(`/auth/refresh`, 'POST', {
        refresh_token: refreshToken
      });
      return response;
    } catch (error) {
      throw new Error('خطا در تازه‌سازی توکن');
    }
  }


  async getProfile(token: string): Promise<any> {
    try {
      const response = await httpService('/auth/profile', 'GET');
      return response;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
        'خطا در دریافت اطلاعات کاربر'
      );
    }
  }


  async updateProfile(data: Partial<UserProfile>, token: string): Promise<any> {
    try {
      const response = await httpService('/auth/profile', 'PUT', data);
      return response as any;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
        'خطا در بروزرسانی پروفایل'
      );
    }
  }


  async changePassword(data: any): Promise<any> {
    try {
      const response = await httpService('/auth/change-password', 'PATCH', data)
      return response as any
    } catch (error : any) {
      throw new Error(
        error.response?.data?.message ||
        'خطا در تغییر رمز'
      );
    }
  }


  async logout(token: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log('Logout API error (ignored):', error);
    }
  }
}

export const authService = new AuthService();