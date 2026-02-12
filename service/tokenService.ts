import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: number;
  email: string;
  fullName: string;
  iat: number;
  exp: number;
}

export class TokenService {
  private static ACCESS_TOKEN_KEY = 'access_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';
  private static USER_KEY = 'user';
  private static refreshTimer: NodeJS.Timeout | null = null;

  static setTokens(accessToken: string, refreshToken: string, user: any): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    this.scheduleProactiveRefresh();
  }

  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static getUser(): any | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static isTokenValid(token: string | null): boolean {
    if (!token) return false;
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  }

  static shouldRefreshToken(thresholdSeconds: number = 300): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;
      const timeLeft = decoded.exp - currentTime;
      return timeLeft < thresholdSeconds;
    } catch {
      return true;
    }
  }

  static clearTokens(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('auth-storage');
    document.cookie = 'auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  static getTokenInfo(): { userId?: number; email?: string } | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return {
        userId: decoded.sub,
        email: decoded.email,
      };
    } catch {
      return null;
    }
  }


  private static async performRefresh(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken || !this.isTokenValid(refreshToken)) {
      console.warn('Refresh token نامعتبر یا منقضی شده است');
      this.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login?session_expired=true';
      }
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error(`Refresh failed: ${response.status}`);
      }

      const data = await response.json();
      const { access_token, refresh_token } = data;

      this.setTokens(
        access_token,
        refresh_token || refreshToken,
        this.getUser()
      );

      console.log('توکن با موفقیت به‌روزرسانی شد (proactive)');
    } catch (err) {
      console.error('خطا در رفرش proactive:', err);
      this.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login?session_expired=true';
      }
    }
  }

  private static scheduleProactiveRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    const token = this.getAccessToken();
    if (!token) return;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;
      let timeUntilExpiry = decoded.exp - currentTime;
      const refreshBeforeSeconds = 300;
      let delayMs = (timeUntilExpiry - refreshBeforeSeconds) * 1000;

      if (delayMs < 60000) delayMs = 60000;
      if (delayMs <= 0) {
        this.performRefresh();
        return;
      }

      console.log(`رفرش خودکار برنامه‌ریزی شد برای ${Math.round(delayMs / 1000 / 60)} دقیقه دیگر`);

      this.refreshTimer = setTimeout(() => {
        this.performRefresh();
      }, delayMs);
    } catch (err) {
      console.warn('توکن نامعتبر → پاکسازی', err);
      this.clearTokens();
    }
  }
}