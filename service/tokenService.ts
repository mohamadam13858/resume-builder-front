import { jwtDecode } from 'jwt-decode'; 
export class TokenService {
  private static ACCESS_KEY = 'access_token';
  private static USER_KEY = 'user';

  static setTokens(accessToken: string, user: any): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.ACCESS_KEY, accessToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  static getUser(): any | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static isTokenValid(token: string | null): boolean {
    if (!token) return false;
    try {
      const decoded = jwtDecode<{ exp: number }>(token)
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      console.warn('Invalid token:', error);
      return false;
    }
  }
}