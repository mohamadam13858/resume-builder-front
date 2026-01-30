'use client'

import React, { useState } from 'react'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code,
  Award,
  Globe,
  FileText,
  Plus,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff
} from 'lucide-react'
import PersonalForm from './sections/personal-form'
import ExperienceForm from './sections/experience-form'
import EducationForm from './sections/education-form'
import SkillsForm from './sections/skills-form'
import ProjectsForm from './sections/projects-form'
import LanguagesForm from './sections/languages-form'

interface Section {
  id: string
  title: string
  icon: React.ReactNode
  component: React.ReactNode
  enabled: boolean
  order: number
}

const SectionsPanel = () => {
  const [expandedSection, setExpandedSection] = useState<string>('personal')
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'personal',
      title: 'اطلاعات شخصی',
      icon: <User className="h-5 w-5" />,
      component: <PersonalForm />,
      enabled: true,
      order: 1
    },
    {
      id: 'summary',
      title: 'خلاصه',
      icon: <FileText className="h-5 w-5" />,
      component: <div>خلاصه Form</div>,
      enabled: true,
      order: 2
    },
    {
      id: 'experience',
      title: 'تجربه کاری',
      icon: <Briefcase className="h-5 w-5" />,
      component: <ExperienceForm />,
      enabled: true,
      order: 3
    },
    {
      id: 'education',
      title: 'تحصیلات',
      icon: <GraduationCap className="h-5 w-5" />,
      component: <EducationForm />,
      enabled: true,
      order: 4
    },
    {
      id: 'skills',
      title: 'مهارت‌ها',
      icon: <Code className="h-5 w-5" />,
      component: <SkillsForm />,
      enabled: true,
      order: 5
    },
    {
      id: 'projects',
      title: 'پروژه‌ها',
      icon: <Award className="h-5 w-5" />,
      component: <ProjectsForm />,
      enabled: false,
      order: 6
    },
    {
      id: 'languages',
      title: 'زبان‌ها',
      icon: <Globe className="h-5 w-5" />,
      component: <LanguagesForm />,
      enabled: false,
      order: 7
    }
  ])

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? '' : id)
  }

  const toggleSectionEnabled = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSections(sections.map(section => 
      section.id === id ? { ...section, enabled: !section.enabled } : section
    ))
  }

  const addNewSection = () => {
    const newSection: Section = {
      id: `custom-${Date.now()}`,
      title: 'بخش جدید',
      icon: <Plus className="h-5 w-5" />,
      component: <div>بخش سفارشی</div>,
      enabled: true,
      order: sections.length + 1
    }
    setSections([...sections, newSection])
  }

  return (
    <div className="space-y-4">
      {/* Enabled Sections */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">
          بخش‌های فعال
        </h3>
        
        {sections
          .filter(section => section.enabled)
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div 
              key={section.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Section Header */}
              <div
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="text-gray-500">
                    {section.icon}
                  </div>
                  <span className="font-medium text-gray-900">
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div
                    onClick={(e) => toggleSectionEnabled(section.id, e)}
                    className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                    title="غیرفعال کردن"
                  >
                    {section.enabled ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Section Content */}
              {expandedSection === section.id && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  {section.component}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Disabled Sections */}
      {sections.filter(section => !section.enabled).length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            بخش‌های غیرفعال
          </h3>
          
          <div className="space-y-2">
            {sections
              .filter(section => !section.enabled)
              .map((section) => (
                <div 
                  key={section.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="text-gray-400">
                      {section.icon}
                    </div>
                    <span className="text-gray-500">
                      {section.title}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      const updatedSections = sections.map(s => 
                        s.id === section.id ? { ...s, enabled: true } : s
                      )
                      setSections(updatedSections)
                    }}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    title="فعال کردن"
                  >
                    <Eye className="h-4 w-4" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Add Custom Section */}
      <div
        onClick={addNewSection}
        className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors cursor-pointer"
      >
        <Plus className="h-5 w-5 ml-2" />
        <span>افزودن بخش جدید</span>
      </div>

      {/* Section Order Info */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 می‌توانید بخش‌ها را با کشیدن و رها کردن مرتب کنید
        </p>
      </div>
    </div>
  )
}

export default SectionsPanel