import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { TokenService } from '@/service/tokenService';
import { authService } from '@/service/authService';

const transformUserFromApi = (apiUser: any): User => ({
  id: apiUser.id.toString(),
  email: apiUser.email,
  name: apiUser.fullName,
  phone: apiUser.phone || '',
  avatar: apiUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiUser.email}`,
  bio: apiUser.bio || '',
  createdAt: apiUser.createdAt ? new Date(apiUser.createdAt) : new Date(),
});

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
  clearError: () => void;
  getUserInitials: () => string;
  isLoggedIn: () => boolean;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      initAuth: async () => {
        const token = TokenService.getAccessToken();
        const user = TokenService.getUser();
        
        if (token && TokenService.isTokenValid(token) && user) {
          set({
            user: transformUserFromApi(user),
            isAuthenticated: true,
          });
          try {
            const profile = await authService.getProfile(token);
            set({
              user: transformUserFromApi(profile),
            });
          } catch (error) {
            console.log('Failed to fetch profile:', error);
          }
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.login({ email, password });
          
          TokenService.setTokens(
            response.access_token,
            response.refresh_token,
            response.user
          );
          
          set({
            user: transformUserFromApi(response.user),
            isAuthenticated: true,
            isLoading: false,
          });

          console.log(response)
        } catch (error: any) {
          set({ 
            error: error.message || 'خطا در ورود',
            isLoading: false,
          });
          throw error;
        }
      },
      
      register: async (email: string, password: string, fullName: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.register({
            email,
            password,
            fullName,
          });
          
          TokenService.setTokens(
            response.access_token,
            response.refresh_token,
            response.user
          );
          
          set({
            user: transformUserFromApi(response.user),
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'خطا در ثبت‌نام',
            isLoading: false,
          });
          throw error;
        }
      },
      
      logout: async () => {
        try {
          const token = TokenService.getAccessToken();
          if (token) {
            await authService.logout(token);
          }
        } finally {
          TokenService.clearTokens();
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },
      
      updateProfile: async (data: Partial<User>) => {
        try {
          const token = TokenService.getAccessToken();
          if (!token) throw new Error('توکن معتبری وجود ندارد');
          const apiData = {
            fullName: data.name,
            phone: data.phone,
            bio: data.bio,
            avatar: data.avatar,
          };
          
          const updatedProfile = await authService.updateProfile(apiData, token);
          
          set((state) => ({
            user: state.user 
              ? { ...state.user, ...transformUserFromApi(updatedProfile) }
              : null,
          }));
          const currentUser = TokenService.getUser();
          TokenService.setTokens(
            TokenService.getAccessToken()!,
            TokenService.getRefreshToken()!,
            { ...currentUser, ...updatedProfile }
          );
        } catch (error: any) {
          set({ 
            error: error.message || 'خطا در بروزرسانی پروفایل',
          });
          throw error;
        }
      },

      changePassword: async (currentPassword: string, newPassword: string, confirmPassword: string) => {
        try {
          const token = TokenService.getAccessToken();
          if (!token) throw new Error('توکن معتبری وجود ندارد');
          
          if (newPassword !== confirmPassword) {
            throw new Error('رمز عبور جدید و تأیید آن مطابقت ندارند');
          }

          if (newPassword.length < 6) {
            throw new Error('رمز عبور باید حداقل ۶ کاراکتر باشد');
          }

          await authService.changePassword({
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
          });
          
        } catch (error: any) {
          set({ 
            error: error.message || 'خطا در تغییر رمز عبور',
          });
          throw error;
        }
      },
      
      clearError: () => set({ error: null }),
      
      getUserInitials: () => {
        const user = get().user;
        if (!user?.name) return 'U';
        return user.name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);
      },
      
      isLoggedIn: () => {
        return get().isAuthenticated && TokenService.isTokenValid(TokenService.getAccessToken());
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.initAuth();
          }
        };
      },
    }
  )
);