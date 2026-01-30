import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeTheme } from '@/types';

type ThemeMode = 'light' | 'dark' | 'system';
type Language = 'fa' | 'en';
type FontSize = 'small' | 'medium' | 'large';

interface ThemeState {
  
  mode: ThemeMode;
  language: Language;
  fontSize: FontSize;
  

  colorPresets: {
    blue: ResumeTheme['colors'];
    purple: ResumeTheme['colors'];
    green: ResumeTheme['colors'];
    orange: ResumeTheme['colors'];
    dark: ResumeTheme['colors'];
  };
  
  
  activePreset: keyof ThemeState['colorPresets'];
  customColors: ResumeTheme['colors'];
  
  
  setMode: (mode: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  setFontSize: (fontSize: FontSize) => void;
  setColorPreset: (preset: keyof ThemeState['colorPresets']) => void;
  updateCustomColor: (key: keyof ResumeTheme['colors'], value: string) => void;
  resetColors: () => void;
  
  getCurrentColors: () => ResumeTheme['colors'];
}

const defaultColorPresets = {
  blue: {
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    accent: '#10b981',
    background: '#ffffff',
    text: '#1f2937',
    header: '#111827',
    border: '#e5e7eb',
  },
  purple: {
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    accent: '#ec4899',
    background: '#fafafa',
    text: '#1f2937',
    header: '#1e1b4b',
    border: '#e5e7eb',
  },
  green: {
    primary: '#10b981',
    secondary: '#059669',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1f2937',
    header: '#064e3b',
    border: '#d1fae5',
  },
  orange: {
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#ef4444',
    background: '#fff7ed',
    text: '#1f2937',
    header: '#7c2d12',
    border: '#fed7aa',
  },
  dark: {
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    accent: '#10b981',
    background: '#111827',
    text: '#f9fafb',
    header: '#ffffff',
    border: '#374151',
  },
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      language: 'fa',
      fontSize: 'medium',
      colorPresets: defaultColorPresets,
      activePreset: 'blue',
      customColors: defaultColorPresets.blue,
      
      setMode: (mode) => set({ mode }),
      
      setLanguage: (language) => set({ language }),
      
      setFontSize: (fontSize) => set({ fontSize }),
      
      setColorPreset: (preset) => {
        set({ 
          activePreset: preset,
          customColors: get().colorPresets[preset],
        });
      },
      
      updateCustomColor: (key, value) => {
        set((state) => ({
          customColors: {
            ...state.customColors,
            [key]: value,
          },
          activePreset: 'blue', 
        }));
      },
      
      resetColors: () => {
        set({
          activePreset: 'blue',
          customColors: defaultColorPresets.blue,
        });
      },
      
      getCurrentColors: () => {
        const state = get();
        return state.customColors;
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);