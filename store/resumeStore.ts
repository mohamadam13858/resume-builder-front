import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import httpService from '@/service/httpService'; // سرویس http که قبلاً داشتی
import type { Resume, ResumeTheme } from '@/types';

interface ResumeState {
  resumes: Resume[];
  activeResumeId: string | null;
  isLoading: boolean;
  error: string | null;

  // واکشی داده‌ها
  fetchResumes: () => Promise<void>;

  // عملیات اصلی
  createResume: (title?: string) => Promise<string>;
  deleteResume: (id: string) => Promise<void>;
  toggleResumeVisibility: (id: string) => Promise<void>;
  incrementViewCount: (id: string) => Promise<void>;

  // عملیات محلی (برای builder)
  setActiveResume: (id: string) => void;
  getActiveResume: () => Resume | null;
  getResumeById: (id: string) => Resume | undefined;
  updateResumeLocally: (id: string, updates: Partial<Resume>) => void;

  // تم (فعلاً محلی)
  updateTheme: (id: string, theme: Partial<ResumeTheme>) => void;
}

const mapBackendToFrontend = (backend: any): Resume => ({
  id: backend.id.toString(),
  userId: backend.userId?.toString() || 'local-user',
  title: backend.title,
  content: {
    personalInfo: backend.content?.personalInfo || {},
    experience: backend.content?.experience || [],
    education: backend.content?.education || [],
    skills: backend.content?.skills || [],
    projects: backend.content?.projects || [],
    languages: backend.content?.languages || [],
    certifications: backend.content?.certifications || [],
    summary: backend.content?.summary || '',
  },
  status: backend.status,
  isPublic: backend.isPublic,
  viewCount: backend.viewCount || 0,
  createdAt: new Date(backend.createdAt),
  updatedAt: new Date(backend.updatedAt),
  lastViewedAt: backend.lastViewedAt ? new Date(backend.lastViewedAt) : new Date(),

  // theme در بک‌اند نیست → پیش‌فرض
  theme: {
    template: 'modern',
    colors: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      accent: '#10b981',
      background: '#ffffff',
      text: '#1f2937',
      header: '#111827',
      border: '#e5e7eb',
    },
    typography: {
      fontFamily: 'Vazir, system-ui',
      headingSize: 1.8,
      bodySize: 1,
      lineHeight: 1.6,
    },
    spacing: {
      section: 2,
      item: 1.5,
      padding: 1,
    },
    components: {
      showPhoto: false,
      showQR: true,
      showIcons: true,
      showBorder: true,
      showShadow: true,
    },
  },
});

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [],
      activeResumeId: null,
      isLoading: false,
      error: null,

      fetchResumes: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await httpService('/resumes', 'GET');
          const { data } = res; // { data: [...], total, page, totalPages }

          const mapped = data.map(mapBackendToFrontend);

          set({ resumes: mapped, isLoading: false });
        } catch (err: any) {
          set({
            error: err.message || 'خطا در بارگذاری رزومه‌ها',
            isLoading: false,
          });
        }
      },

      createResume: async (title = 'رزومه جدید') => {
        set({ isLoading: true, error: null });
        try {
          const payload = {
            title,
            content: {
              personalInfo: {},
              experience: [],
              education: [],
              skills: [],
              projects: [],
              languages: [],
              certifications: [],
            },
            status: 'draft',
            isPublic: false,
          };

          const res = await httpService('/resumes', 'POST', payload);
          const newBackend = res.data;

          const newResume = mapBackendToFrontend(newBackend);

          set(state => ({
            resumes: [newResume, ...state.resumes],
            activeResumeId: newResume.id,
            isLoading: false,
          }));

          return newResume.id;
        } catch (err: any) {
          set({ error: err.message || 'خطا در ساخت رزومه', isLoading: false });
          throw err;
        }
      },

      deleteResume: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await httpService(`/resumes/${id}`, 'DELETE');

          set(state => {
            const updated = state.resumes.filter(r => r.id !== id);
            const newActive = updated.length > 0 ? updated[0].id : null;

            return {
              resumes: updated,
              activeResumeId: newActive,
              isLoading: false,
            };
          });
        } catch (err: any) {
          set({ error: err.message || 'خطا در حذف', isLoading: false });
        }
      },

      toggleResumeVisibility: async (id: string) => {
        const resume = get().getResumeById(id);
        if (!resume) return;

        const newIsPublic = !resume.isPublic;

        set({ isLoading: true });
        try {
          await httpService(`/resumes/${id}`, 'PATCH', { isPublic: newIsPublic });

          set(state => ({
            resumes: state.resumes.map(r =>
              r.id === id ? { ...r, isPublic: newIsPublic, updatedAt: new Date() } : r
            ),
            isLoading: false,
          }));
        } catch (err: any) {
          set({ error: 'خطا در تغییر وضعیت', isLoading: false });
        }
      },

      incrementViewCount: async (id: string) => {
        // فعلاً فقط محلی افزایش می‌دهیم (اگر بک‌اند متد جدا نداشت)
        set(state => ({
          resumes: state.resumes.map(r =>
            r.id === id ? { ...r, viewCount: (r.viewCount || 0) + 1 } : r
          ),
        }));
        // اگر بعداً endpoint برای view داشت، اینجا صدا بزن
      },

      // عملیات محلی برای builder
      setActiveResume: id => set({ activeResumeId: id }),

      getActiveResume: () => {
        const { resumes, activeResumeId } = get();
        return resumes.find(r => r.id === activeResumeId) || null;
      },

      getResumeById: id => get().resumes.find(r => r.id === id),

      updateResumeLocally: (id, updates) => {
        set(state => ({
          resumes: state.resumes.map(r => (r.id === id ? { ...r, ...updates } : r)),
        }));
      },

      updatePersonalInfo: data => {
        const active = get().getActiveResume();
        if (!active) return;

        set(state => ({
          resumes: state.resumes.map(r =>
            r.id === active.id
              ? {
                  ...r,
                  content: {
                    ...r.content,
                    personalInfo: { ...r.content.personalInfo, ...data },
                  },
                  updatedAt: new Date(),
                }
              : r
          ),
        }));
      },

      updateTheme: (id, theme) => {
        set(state => ({
          resumes: state.resumes.map(r =>
            r.id === id ? { ...r, theme: { ...r.theme, ...theme }, updatedAt: new Date() } : r
          ),
        }));
      },
    }),
    {
      name: 'resume-storage',
      partialize: state => ({
        activeResumeId: state.activeResumeId,
        // resumes را در persist ذخیره نکنیم چون از سرور میاد
      }),
    }
  )
);