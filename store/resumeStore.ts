import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import httpService from '@/service/httpService'
import type { Resume } from '@/types'

interface ResumeState {
  resumes: Resume[]
  activeResumeId: string | null
  isLoading: boolean
  error: string | null

  fetchResumes: () => Promise<void>
  createLocalResume: (title?: string) => string
  registerResume: (localId: string) => Promise<string>
  saveResume: (id: string) => Promise<void>
  deleteResume: (id: string) => Promise<void>
  setActiveResume: (id: string | null) => void
  getActiveResume: () => Resume | null
  getResumeById: (id: string) => Resume | undefined
  updateResumeLocally: (id: string, updates: Partial<Resume>) => void
}

const defaultContent = {
  personalInfo: {},
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
}

const defaultTheme = {
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
}

const mapBackendToFrontend = (backend: any): Resume => {
  if (!backend || typeof backend !== 'object') {
    console.warn('داده بک‌اند نامعتبر است، رزومه پیش‌فرض ساخته شد', { backend })
    return {
      id: `fallback-${Date.now()}`,
      title: 'رزومه بدون عنوان',
      content: { ...defaultContent },
      status: 'draft',
      isPublic: false,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      theme: { ...defaultTheme },
    }
  }

  return {
    id: String(backend.id || `fallback-${Date.now()}`),
    title: backend.title || 'رزومه بدون عنوان',
    content: backend.content || { ...defaultContent },
    status: backend.status || 'draft',
    isPublic: !!backend.isPublic,
    viewCount: Number(backend.viewCount || 0),
    createdAt: new Date(backend.createdAt || Date.now()),
    updatedAt: new Date(backend.updatedAt || Date.now()),
    theme: {
      template: backend.templateId || 'modern',
      colors: {
        primary: backend.colors?.primary || '#3b82f6',
        secondary: backend.colors?.secondary || '#1d4ed8',
        accent: backend.colors?.accent || '#10b981',
        background: backend.colors?.background || '#ffffff',
        text: backend.colors?.text || '#1f2937',
        header: backend.colors?.header || '#111827',
        border: backend.colors?.border || '#e5e7eb',
      },
    },
  }
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [],
      activeResumeId: null,
      isLoading: false,
      error: null,

      fetchResumes: async () => {
        set({ isLoading: true, error: null })
        try {
          const res = await httpService('/resumes', 'GET')
          if (!res?.data || !Array.isArray(res.data)) {
            throw new Error('فرمت داده رزومه‌ها نامعتبر است')
          }
          set({
            resumes: res.data.map(mapBackendToFrontend),
            isLoading: false,
          })
        } catch (err: any) {
          console.error('خطا در fetchResumes:', err)
          set({
            error: err.message || 'خطا در بارگذاری رزومه‌ها',
            isLoading: false,
          })
        }
      },

      createLocalResume: (title = 'رزومه جدید') => {
        const localId = `local-${uuidv4()}`
        const newResume: Resume = {
          id: localId,
          title,
          content: { ...defaultContent },
          status: 'draft',
          isPublic: false,
          viewCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          theme: { ...defaultTheme },
        }

        set(state => ({
          resumes: [newResume, ...state.resumes],
          activeResumeId: localId,
        }))

        return localId
      },

      registerResume: async (localId: string) => {
        const resume = get().getResumeById(localId);
        if (!resume) {
          throw new Error('رزومه محلی یافت نشد');
        }

        set({ isLoading: true, error: null });

        try {
          const payload = {
            title: resume.title,
            content: resume.content,
            status: resume.status,
            isPublic: resume.isPublic,
            templateId: resume.theme?.template || 'modern', 
          };

          const response = await httpService('/resumes', 'POST', payload);

          let serverData = response;

          if (response && typeof response === 'object' && 'data' in response && response.data) {
            serverData = response.data;
          }

          if (!serverData || !serverData.id) {
            throw new Error(
              'پاسخ سرور معتبر نیست - فیلد id وجود ندارد\n' +
              'پاسخ دریافتی: ' +
              JSON.stringify(response, null, 2)
            );
          }

          const serverResume = mapBackendToFrontend(serverData);

          set((state) => ({
            resumes: [
              ...state.resumes.filter((r) => r.id !== localId),
              {
                ...serverResume,
                updatedAt: new Date(),
              },
            ],
            activeResumeId: serverResume.id,
            isLoading: false,
          }));


          return serverResume.id;
        } catch (err: any) {
          console.error('[REGISTER] خطا در ثبت رزومه:', err);
          const errorMessage =
            err.message ||
            'خطا در ارتباط با سرور هنگام ثبت رزومه. لطفاً دوباره تلاش کنید.';

          set({
            error: errorMessage,
            isLoading: false,
          });

          throw new Error(errorMessage);
        }
      },
      saveResume: async (id: string) => {
        const resume = get().getResumeById(id)
        if (!resume) throw new Error('رزومه یافت نشد')

        set({ isLoading: true, error: null })

        try {
          await httpService(`/resumes/${id}`, 'PATCH', {
            title: resume.title,
            content: resume.content,
            updatedAt: new Date().toISOString(), 
          })

          set(state => ({
            resumes: state.resumes.map(r =>
              r.id === id ? { ...r, updatedAt: new Date() } : r
            ),
            isLoading: false,
          }))
        } catch (err: any) {
          console.error('خطا در saveResume:', err)
          set({ error: 'خطا در ذخیره تغییرات', isLoading: false })
          throw err
        }
      },

      deleteResume: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
          await httpService(`/resumes/${id}`, 'DELETE')

          set(state => ({
            resumes: state.resumes.filter(r => r.id !== id),
            activeResumeId: state.activeResumeId === id ? null : state.activeResumeId,
            isLoading: false,
          }))
        } catch (err: any) {
          console.error('خطا در deleteResume:', err)
          set({ error: 'خطا در حذف رزومه', isLoading: false })
        }
      },

      setActiveResume: id => set({ activeResumeId: id }),

      getActiveResume: () => {
        const { resumes, activeResumeId } = get()
        return resumes.find(r => r.id === activeResumeId) || null
      },

      getResumeById: id => get().resumes.find(r => r.id === id),

      updateResumeLocally: (id, updates) =>
        set(state => ({
          resumes: state.resumes.map(r =>
            r.id === id ? { ...r, ...updates, updatedAt: new Date() } : r
          ),
        })),
    }),
    {
      name: 'resume-storage',
      partialize: state => ({
        activeResumeId: state.activeResumeId,
      }),
    }
  )
)