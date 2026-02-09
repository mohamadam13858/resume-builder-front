'use client'

import React from 'react'
import { useResumeStore } from '@/store/resumeStore'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Calendar,
  Building,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Star,
  Globe as GlobeIcon,
} from 'lucide-react'

const ResumePreview = () => {
  const { getActiveResume } = useResumeStore()
  const resume = getActiveResume()

  if (!resume) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Briefcase className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-medium">رزومه‌ای انتخاب نشده است</p>
        <p className="text-sm mt-2">اطلاعات رزومه در حال بارگذاری است یا هنوز رزومه‌ای ساخته نشده</p>
      </div>
    )
  }

  const content = resume.content || {}
  const {
    personalInfo: personal = {},
    summary = '',
    experience: experiences = [],
    education = [],
    skills = [],
    projects = [],
    languages = [],
  } = content

  const theme = resume.theme || {
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
      fontFamily: 'Vazir, system-ui, sans-serif',
      bodySize: 1,
      lineHeight: 1.6,
    },
  }

  const typography = theme.typography || {
    fontFamily: 'Vazir, system-ui, sans-serif',
    bodySize: 1,
    lineHeight: 1.6,
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '—'
    return date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'short' })
  }

  const renderSkillStars = (level: number = 3) => (
    <div className="flex space-x-1 space-x-reverse">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )

  
  const groupedSkills = (skills || []).reduce((groups: Record<string, any[]>, skill: any) => {
    const category = skill?.category || 'سایر'
    if (!groups[category]) groups[category] = []
    groups[category].push(skill)
    return groups
  }, {})

  return (
    <div
      className="a4-container bg-white shadow-2xl rounded-xl overflow-hidden p-8 md:p-12 font-vazir mx-auto w-full max-w-[210mm] min-h-[297mm]"
      style={{
        backgroundColor: theme.colors.background || '#ffffff',
        color: theme.colors.text || '#1f2937',
        fontFamily: typography.fontFamily,
        fontSize: `${typography.bodySize || 1}rem`,
        lineHeight: typography.lineHeight || 1.6,
      }}
    >
    
      <div className="mb-10 pb-6 border-b" style={{ borderColor: theme.colors.border }}>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: theme.colors.header || '#111827' }}
            >
              {personal.name || 'نام و نام خانوادگی'}
            </h1>

            <p className="text-xl text-gray-600 mb-4">
              {personal.title || 'عنوان شغلی / تخصص'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span>{personal.email}</span>
                </div>
              )}

              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span>{personal.phone}</span>
                </div>
              )}

              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span>{personal.location}</span>
                </div>
              )}

              {personal.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <a href={personal.linkedin} className="hover:underline" target="_blank" rel="noopener">
                    LinkedIn
                  </a>
                </div>
              )}

              {personal.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <a href={personal.github} className="hover:underline" target="_blank" rel="noopener">
                    GitHub
                  </a>
                </div>
              )}
            </div>
          </div>

    
          {personal.avatar && (
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 flex-shrink-0 mx-auto md:mx-0"
                 style={{ borderColor: theme.colors.primary }}>
              <img
                src={personal.avatar}
                alt={personal.name || 'عکس پروفایل'}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

      
        {summary && (
          <div className="mt-8 pt-6 border-t" style={{ borderColor: theme.colors.border }}>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
              {summary}
            </p>
          </div>
        )}
      </div>

  
      {experiences.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 pb-2 border-b" style={{ color: theme.colors.header, borderColor: theme.colors.primary }}>
            تجربه کاری
          </h2>
          <div className="space-y-7">
            {experiences.map((exp: any, index: number) => (
              <div key={exp.id || index} className="relative pl-6 border-l-2" style={{ borderColor: theme.colors.primary }}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                      {exp.position || 'سمت شغلی'}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-700 mt-1">
                      <Building className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium">{exp.company || 'نام شرکت'}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(exp.startDate)} – {exp.isCurrent ? 'تاکنون' : formatDate(exp.endDate)}
                  </div>
                </div>

                {exp.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                )}

                {exp.description && (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line mt-2">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

  
      {education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 pb-2 border-b" style={{ color: theme.colors.header, borderColor: theme.colors.primary }}>
            تحصیلات
          </h2>
          <div className="space-y-6">
            {education.map((edu: any, index: number) => (
              <div key={edu.id || index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                      {edu.degree} {edu.field ? `در ${edu.field}` : ''}
                    </h3>
                    <div className="text-gray-700 mt-1">
                      {edu.school || 'نام دانشگاه'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </div>
                </div>

                {edu.gpa && (
                  <div className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm bg-green-100 text-green-800">
                    <Award className="h-4 w-4 ml-2" />
                    معدل: {edu.gpa}
                  </div>
                )}

                {edu.description && (
                  <p className="text-gray-700 mt-3 whitespace-pre-line">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

    
      {skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 pb-2 border-b" style={{ color: theme.colors.header, borderColor: theme.colors.primary }}>
            مهارت‌ها
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]: [string, any[]]) => (
              <div key={category}>
                <h3 className="font-bold text-lg mb-3" style={{ color: theme.colors.secondary }}>
                  {category === 'technical' ? 'فنی' :
                   category === 'design' ? 'طراحی' :
                   category === 'database' ? 'دیتابیس' :
                   category === 'language' ? 'زبان' :
                   category === 'tool' ? 'ابزارها' :
                   category === 'soft' ? 'مهارت‌های نرم' :
                   category === 'business' ? 'کسب و کار' : category}
                </h3>
                <div className="space-y-2">
                  {categorySkills.map((skill: any, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-gray-500" />
                        <span>{skill.name}</span>
                      </div>
                      {renderSkillStars(skill.level)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    
      {projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 pb-2 border-b" style={{ color: theme.colors.header, borderColor: theme.colors.primary }}>
            پروژه‌ها
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj: any, i: number) => (
              <div
                key={proj.id || i}
                className="border rounded-lg p-5 hover:shadow-md transition-shadow"
                style={{ borderColor: theme.colors.border }}
              >
                <h3 className="font-bold text-lg mb-2" style={{ color: theme.colors.primary }}>
                  {proj.name || 'نام پروژه'}
                </h3>

                <p className="text-gray-700 mb-3">
                  {proj.description || 'توضیح پروژه'}
                </p>

                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {proj.technologies.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{ backgroundColor: `${theme.colors.accent}15`, color: theme.colors.accent }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline"
                      style={{ color: theme.colors.primary }}
                    >
                      <GlobeIcon className="h-4 w-4" />
                      مشاهده پروژه
                    </a>
                  )}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline"
                      style={{ color: theme.colors.primary }}
                    >
                      <Github className="h-4 w-4" />
                      کد منبع
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    
      {languages.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 pb-2 border-b" style={{ color: theme.colors.header, borderColor: theme.colors.primary }}>
            زبان‌ها
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {languages.map((lang: string, i: number) => {
              const [name, level] = lang.split(' (')
              return (
                <div
                  key={i}
                  className="text-center p-4 rounded-lg border"
                  style={{ borderColor: theme.colors.border, backgroundColor: `${theme.colors.secondary}05` }}
                >
                  <GlobeIcon className="h-6 w-6 mx-auto mb-2" style={{ color: theme.colors.secondary }} />
                  <h4 className="font-bold">{name.trim()}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {level ? level.replace(')', '') : 'متوسط'}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      )}

    
      <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500" style={{ borderColor: theme.colors.border }}>
        <p>تهیه شده با رزومه‌ساز حرفه‌ای</p>
        <p className="mt-1">آخرین بروزرسانی: {new Date().toLocaleDateString('fa-IR')}</p>
      </div>
    </div>
  )
}

export default ResumePreview