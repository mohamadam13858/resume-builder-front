
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  website?: string;
  summary: string;
  avatar?: string;
}


export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
  location?: string;
}


export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa?: string;
}


export interface Skill {
  id: string;
  name: string;
  level: number; 
  category: string;
  icon?: string;
}


export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}


export interface ResumeTheme {
  template: 'modern' | 'classic' | 'minimal' | 'creative';

  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    header: string;
    border: string;
  };
  
  typography: {
    fontFamily: string;
    headingSize: number;
    bodySize: number;
    lineHeight: number;
  };
  
  spacing: {
    section: number;
    item: number;
    padding: number;
  };
  
  components: {
    showPhoto: boolean;
    showQR: boolean;
    showIcons: boolean;
    showBorder: boolean;
    showShadow: boolean;
  };
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  slug: string;
  
  personal: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages: string[];
  certifications: string[];
  
  theme: ResumeTheme;
  
  isPublic: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastViewed: Date;
  viewCount: number;
  
  metaDescription?: string;
  keywords?: string[];
}