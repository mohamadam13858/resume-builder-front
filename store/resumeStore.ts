import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Resume, PersonalInfo, Experience, Education, Skill, Project, ResumeTheme } from '@/types';

interface ResumeState {
  
  resumes: Resume[];
  activeResumeId: string | null;
  isLoading: boolean;
  
  
  getActiveResume: () => Resume | null;
  getResumeCount: () => number;
  getResumeById: (id: string) => Resume | undefined;
  
  
  createResume: (title?: string) => string;
  duplicateResume: (id: string) => string;
  deleteResume: (id: string) => void;
  setActiveResume: (id: string) => void;
  renameResume: (id: string, title: string) => void;
  toggleResumeVisibility: (id: string) => void;
  

  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  
  
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  moveExperience: (fromIndex: number, toIndex: number) => void;
  
  
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  

  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  
  updateLanguages: (languages: string[]) => void;
  updateCertifications: (certs: string[]) => void;
  
  
  updateTheme: (theme: Partial<ResumeTheme>) => void;
  changeTemplate: (template: ResumeTheme['template']) => void;
  changeColors: (colors: Partial<ResumeTheme['colors']>) => void;
  changeFont: (fontFamily: string) => void;
  
  
  exportResume: (id: string) => string;
  importResume: (resumeData: Resume) => void;
  exportAllResumes: () => string;
  importAllResumes: (resumes: Resume[]) => void;
  
  
  resetResume: (id: string) => void;
  clearAllResumes: () => void;
  incrementViewCount: (id: string) => void;
}

const createEmptyResume = (title: string = 'رزومه جدید'): Resume => {
  const id = `resume-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id,
    userId: 'local-user',
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    
  
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
    education: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
    
    
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
    
    
    isPublic: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastViewed: new Date(),
    viewCount: 0,
  };
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [createEmptyResume('اولین رزومه من')],
      activeResumeId: null,
      isLoading: false,
      

      getActiveResume: () => {
        const state = get();
        if (!state.activeResumeId) return state.resumes[0] || null;
        return state.resumes.find(r => r.id === state.activeResumeId) || null;
      },
      
      getResumeCount: () => get().resumes.length,
      
      getResumeById: (id) => get().resumes.find(r => r.id === id),
      

      
      createResume: (title = 'رزومه جدید') => {
        const newResume = createEmptyResume(title);
        set((state) => ({
          resumes: [newResume, ...state.resumes],
          activeResumeId: newResume.id,
        }));
        return newResume.id;
      },
      
      duplicateResume: (id) => {
        const original = get().resumes.find(r => r.id === id);
        if (!original) return '';
        
        const duplicated: Resume = {
          ...original,
          id: `resume-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: `${original.title} (کپی)`,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastViewed: new Date(),
          viewCount: 0,
        };
        
        set((state) => ({
          resumes: [duplicated, ...state.resumes],
          activeResumeId: duplicated.id,
        }));
        
        return duplicated.id;
      },
      
      deleteResume: (id) => {
        set((state) => {
          const updatedResumes = state.resumes.filter(r => r.id !== id);
          const newActiveId = updatedResumes.length > 0 
            ? updatedResumes[0].id 
            : null;
          if (updatedResumes.length === 0) {
            const newResume = createEmptyResume('رزومه جدید');
            updatedResumes.push(newResume);
            return {
              resumes: updatedResumes,
              activeResumeId: newResume.id,
            };
          }
          
          return {
            resumes: updatedResumes,
            activeResumeId: newActiveId,
          };
        });
      },
      
      setActiveResume: (id) => {
        set((state) => {
          // آپدیت lastViewed برای رزومه فعال
          const updatedResumes = state.resumes.map(resume => 
            resume.id === id 
              ? { ...resume, lastViewed: new Date() }
              : resume
          );
          
          return {
            resumes: updatedResumes,
            activeResumeId: id,
          };
        });
      },
      
      renameResume: (id, title) => {
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === id
              ? { 
                  ...resume, 
                  title,
                  slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                  updatedAt: new Date()
                }
              : resume
          ),
        }));
      },
      
      toggleResumeVisibility: (id) => {
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === id
              ? { ...resume, isPublic: !resume.isPublic, updatedAt: new Date() }
              : resume
          ),
        }));
      },
      

      
      updatePersonalInfo: (data) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  personal: { ...resume.personal, ...data },
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
  
      addExperience: () => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        const newExperience: Experience = {
          id: `exp-${Date.now()}`,
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
          isCurrent: false,
        };
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  experiences: [...resume.experiences, newExperience],
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      updateExperience: (expId, data) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  experiences: resume.experiences.map(exp =>
                    exp.id === expId ? { ...exp, ...data } : exp
                  ),
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      deleteExperience: (expId) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  experiences: resume.experiences.filter(exp => exp.id !== expId),
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      moveExperience: (fromIndex, toIndex) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        const experiences = [...activeResume.experiences];
        const [movedItem] = experiences.splice(fromIndex, 1);
        experiences.splice(toIndex, 0, movedItem);
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? { ...resume, experiences, updatedAt: new Date() }
              : resume
          ),
        }));
      },
      
    
      addEducation: () => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        const newEducation: Education = {
          id: `edu-${Date.now()}`,
          school: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          description: '',
        };
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  education: [...resume.education, newEducation],
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      updateEducation: (eduId, data) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  education: resume.education.map(edu =>
                    edu.id === eduId ? { ...edu, ...data } : edu
                  ),
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      deleteEducation: (eduId) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  education: resume.education.filter(edu => edu.id !== eduId),
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      

      addSkill: () => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        const newSkill: Skill = {
          id: `skill-${Date.now()}`,
          name: '',
          level: 3,
          category: 'technical',
        };
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  skills: [...resume.skills, newSkill],
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      updateSkill: (skillId, data) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  skills: resume.skills.map(skill =>
                    skill.id === skillId ? { ...skill, ...data } : skill
                  ),
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      deleteSkill: (skillId) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  skills: resume.skills.filter(skill => skill.id !== skillId),
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
  
      addProject: () => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        const newProject: Project = {
          id: `project-${Date.now()}`,
          name: '',
          description: '',
          technologies: [],
        };
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  projects: [...resume.projects, newProject],
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      updateProject: (projectId, data) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  projects: resume.projects.map(project =>
                    project.id === projectId ? { ...project, ...data } : project
                  ),
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      deleteProject: (projectId) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  projects: resume.projects.filter(project => project.id !== projectId),
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      

      updateLanguages: (languages) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? { ...resume, languages, updatedAt: new Date() }
              : resume
          ),
        }));
      },
      
      updateCertifications: (certifications) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? { ...resume, certifications, updatedAt: new Date() }
              : resume
          ),
        }));
      },
      
  
      
      updateTheme: (theme) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  theme: { ...resume.theme, ...theme },
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      changeTemplate: (template) => {
        get().updateTheme({ template });
      },
      
      changeColors: (colors) => {
        const activeResume = get().getActiveResume();
        if (!activeResume) return;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === activeResume.id
              ? {
                  ...resume,
                  theme: {
                    ...resume.theme,
                    colors: { ...resume.theme.colors, ...colors },
                  },
                  updatedAt: new Date(),
                }
              : resume
          ),
        }));
      },
      
      changeFont: (fontFamily) => {
        get().updateTheme({
          typography: { fontFamily },
        });
      },
      
      
      exportResume: (id) => {
        const resume = get().resumes.find(r => r.id === id);
        return JSON.stringify(resume, null, 2);
      },
      
      importResume: (resumeData) => {
        const importedResume: Resume = {
          ...resumeData,
          id: `resume-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastViewed: new Date(),
        };
        
        set((state) => ({
          resumes: [importedResume, ...state.resumes],
          activeResumeId: importedResume.id,
        }));
      },
      
      exportAllResumes: () => {
        return JSON.stringify(get().resumes, null, 2);
      },
      
      importAllResumes: (resumes) => {
        const processedResumes = resumes.map(resume => ({
          ...resume,
          id: `resume-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(resume.createdAt),
          updatedAt: new Date(),
          lastViewed: new Date(),
        }));
        
        set((state) => ({
          resumes: [...processedResumes, ...state.resumes],
        }));
      },
      

      
      resetResume: (id) => {
        const originalResume = get().resumes.find(r => r.id === id);
        if (!originalResume) return;
        
        const resetResume = createEmptyResume(originalResume.title);
        resetResume.id = id;
        resetResume.userId = originalResume.userId;
        resetResume.createdAt = originalResume.createdAt;
        
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === id ? resetResume : resume
          ),
        }));
      },
      
      clearAllResumes: () => {
        const newResume = createEmptyResume('رزومه جدید');
        set({
          resumes: [newResume],
          activeResumeId: newResume.id,
        });
      },
      
      incrementViewCount: (id) => {
        set((state) => ({
          resumes: state.resumes.map(resume =>
            resume.id === id
              ? { ...resume, viewCount: (resume.viewCount || 0) + 1 }
              : resume
          ),
        }));
      },
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({
        resumes: state.resumes,
        activeResumeId: state.activeResumeId,
      }),
    }
  )
);