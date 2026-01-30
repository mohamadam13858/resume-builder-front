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
  Globe as GlobeIcon
} from 'lucide-react'

const ResumePreview = () => {
  const { getActiveResume } = useResumeStore()
  const resume = getActiveResume()

  if (!resume) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-lg">رزومه‌ای انتخاب نشده است</p>
        <p className="text-sm mt-2">لطفا یک رزومه را از داشبورد انتخاب کنید</p>
      </div>
    )
  }

  const { personal, experiences, education, skills, projects, languages, theme } = resume

  
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'short'
    })
  }


  const renderSkillStars = (level: number) => {
    return (
      <div className="flex space-x-1 space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`h-3 w-3 ${star <= level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  const groupedSkills = skills.reduce((groups, skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = []
    }
    groups[skill.category].push(skill)
    return groups
  }, {} as Record<string, typeof skills>)

  return (
    <div 
      className="a4-container bg-white shadow-xl rounded-lg overflow-hidden p-10 font-vazir"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
        fontSize: `${theme.typography.bodySize}rem`,
        lineHeight: theme.typography.lineHeight
      }}
    >
    
      <div className="mb-10">
        <div className="flex justify-between items-start">
        
          <div className="flex-1">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: theme.colors.header }}
            >
              {personal.name || 'نام شما'}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {personal.title || 'عنوان شغلی شما'}
            </p>
            
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {personal.email && (
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 ml-2 text-gray-500" />
                  <span>{personal.email}</span>
                </div>
              )}
              
              {personal.phone && (
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 ml-2 text-gray-500" />
                  <span>{personal.phone}</span>
                </div>
              )}
              
              {personal.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 ml-2 text-gray-500" />
                  <span>{personal.location}</span>
                </div>
              )}
              
              {personal.linkedin && (
                <div className="flex items-center text-sm">
                  <Linkedin className="h-4 w-4 ml-2 text-gray-500" />
                  <a href={personal.linkedin} className="hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
              
              {personal.github && (
                <div className="flex items-center text-sm">
                  <Github className="h-4 w-4 ml-2 text-gray-500" />
                  <a href={personal.github} className="hover:underline">
                    GitHub
                  </a>
                </div>
              )}
              
              {personal.website && (
                <div className="flex items-center text-sm">
                  <Globe className="h-4 w-4 ml-2 text-gray-500" />
                  <a href={personal.website} className="hover:underline">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>

        
          {personal.avatar && theme.components.showPhoto && (
            <div className="h-24 w-24 rounded-full overflow-hidden border-4" 
                 style={{ borderColor: theme.colors.primary }}>
              <img 
                src={personal.avatar} 
                alt={personal.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

    
        {personal.summary && (
          <div className="mt-6 pt-6 border-t" style={{ borderColor: theme.colors.border }}>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {personal.summary}
            </p>
          </div>
        )}
      </div>

      
      {experiences.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-2xl font-bold mb-4 pb-2 border-b"
            style={{ 
              color: theme.colors.header,
              borderColor: theme.colors.primary 
            }}
          >
            تجربه کاری
          </h2>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                      {exp.position}
                    </h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Building className="h-4 w-4 ml-2" />
                      <span className="font-medium">{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="mx-2">•</span>
                          <MapPin className="h-4 w-4 ml-2" />
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 ml-2" />
                    <span>
                      {formatDate(exp.startDate)} - {exp.isCurrent ? 'تاکنون' : formatDate(exp.endDate)}
                    </span>
                  </div>
                </div>
                
                {exp.description && (
                  <p className="text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    
      {education.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-2xl font-bold mb-4 pb-2 border-b"
            style={{ 
              color: theme.colors.header,
              borderColor: theme.colors.primary 
            }}
          >
            تحصیلات
          </h2>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                      {edu.degree} در {edu.field}
                    </h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <GraduationCap className="h-4 w-4 ml-2" />
                      <span className="font-medium">{edu.school}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 ml-2" />
                    <span>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
                
                {edu.gpa && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm mb-2"
                       style={{ backgroundColor: `${theme.colors.accent}20`, color: theme.colors.accent }}>
                    <Award className="h-4 w-4 ml-2" />
                    معدل: {edu.gpa}
                  </div>
                )}
                
                {edu.description && (
                  <p className="text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-2xl font-bold mb-4 pb-2 border-b"
            style={{ 
              color: theme.colors.header,
              borderColor: theme.colors.primary 
            }}
          >
            مهارت‌ها
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="font-bold text-lg mb-3" style={{ color: theme.colors.secondary }}>
                  {category === 'technical' && 'فنی'}
                  {category === 'design' && 'طراحی'}
                  {category === 'database' && 'دیتابیس'}
                  {category === 'language' && 'زبان'}
                  {category === 'tool' && 'ابزارها'}
                  {category === 'soft' && 'مهارت‌های نرم'}
                  {category === 'business' && 'کسب و کار'}
                </h3>
                
                <div className="space-y-3">
                  {categorySkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 ml-2 text-gray-500" />
                        <span>{skill.name}</span>
                      </div>
                      {renderSkillStars(skill.level)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {projects.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-2xl font-bold mb-4 pb-2 border-b"
            style={{ 
              color: theme.colors.header,
              borderColor: theme.colors.primary 
            }}
          >
            پروژه‌ها
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                style={{ borderColor: theme.colors.border }}
              >
                <h3 className="font-bold text-lg mb-2" style={{ color: theme.colors.primary }}>
                  {project.name}
                </h3>
                
                <p className="text-gray-700 text-sm mb-3">
                  {project.description}
                </p>
                
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 text-xs rounded"
                        style={{ 
                          backgroundColor: `${theme.colors.accent}20`,
                          color: theme.colors.accent
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4">
                  {project.link && (
                    <a 
                      href={project.link}
                      className="text-sm flex items-center hover:underline"
                      style={{ color: theme.colors.primary }}
                    >
                      <GlobeIcon className="h-4 w-4 ml-2" />
                      مشاهده پروژه
                    </a>
                  )}
                  
                  {project.github && (
                    <a 
                      href={project.github}
                      className="text-sm flex items-center hover:underline"
                      style={{ color: theme.colors.primary }}
                    >
                      <Github className="h-4 w-4 ml-2" />
                      کد منبع
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
      {languages.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-2xl font-bold mb-4 pb-2 border-b"
            style={{ 
              color: theme.colors.header,
              borderColor: theme.colors.primary 
            }}
          >
            زبان‌ها
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((language, index) => {
              const [langName, level] = language.split(' (')
              return (
                <div 
                  key={index}
                  className="text-center p-3 rounded-lg"
                  style={{ 
                    backgroundColor: `${theme.colors.secondary}10`,
                    border: `1px solid ${theme.colors.secondary}30`
                  }}
                >
                  <GlobeIcon className="h-6 w-6 mx-auto mb-2" style={{ color: theme.colors.secondary }} />
                  <h3 className="font-bold">{langName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{level?.replace(')', '')}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

    
      {!personal.name && experiences.length === 0 && education.length === 0 && 
       skills.length === 0 && projects.length === 0 && languages.length === 0 && (
        <div className="text-center py-20">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            رزومه خالی است
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            اطلاعات خود را در بخش‌های مختلف وارد کنید تا اینجا نمایش داده شود.
          </p>
        </div>
      )}

      <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500"
           style={{ borderColor: theme.colors.border }}>
        <p>ساخته شده با ❤️ توسط رزومه‌ساز</p>
        <p className="mt-1">آخرین بروزرسانی: {new Date().toLocaleDateString('fa-IR')}</p>
      </div>
    </div>
  )
}

export default ResumePreview