import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  clearError: () => void;
  getUserInitials: () => string;
  isLoggedIn: () => boolean;
}

const mockUser: User = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'کاربر تست',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
  bio: 'این یک کاربر تستی است',
  createdAt: new Date(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1500));
          if (email && password) {
            set({
              user: { ...mockUser, email, name: email.split('@')[0] },
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error('ایمیل و رمز عبور الزامی است');
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'خطا در ورود',
            isLoading: false,
          });
        }
      },
      
      register: async (email, password, name) => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const newUser: User = {
            id: `user-${Date.now()}`,
            email,
            name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            createdAt: new Date(),
          };
          
          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'خطا در ثبت‌نام',
            isLoading: false,
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },
      
      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
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
      
      isLoggedIn: () => get().isAuthenticated,
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);