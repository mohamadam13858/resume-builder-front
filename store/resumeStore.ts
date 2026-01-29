
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PersonalInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

export interface ResumeData {
  personal: PersonalInfo;
  experiences: Experience[];
}

interface ResumeStore {
  data: ResumeData;
  updatePersonal: (personal: Partial<PersonalInfo>) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reset: () => void;
}

const initialData: ResumeData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    summary: '',
  },
  experiences: [],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialData,

      updatePersonal: (personal) =>
        set((state) => ({
          data: { ...state.data, personal: { ...state.data.personal, ...personal } },
        })),

      addExperience: (exp) =>
        set((state) => ({
          data: {
            ...state.data,
            experiences: [
              ...state.data.experiences,
              { ...exp, id: crypto.randomUUID() },
            ],
          },
        })),

      updateExperience: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            experiences: state.data.experiences.map((e) =>
              e.id === id ? { ...e, ...updates } : e
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experiences: state.data.experiences.filter((e) => e.id !== id),
          },
        })),

      reset: () => set({ data: initialData }),
    }),
    { name: 'resume-data-v1' }
  )
);