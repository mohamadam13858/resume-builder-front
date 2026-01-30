'use client'

import React, { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { 
  Plus, 
  Trash2, 
  Code, 
  Star,
  ChevronUp,
  ChevronDown,
  Palette,
  Database,
  Globe,
  BarChart3,
  Users,
  ToolCase
} from 'lucide-react'

const skillCategories = [
  { id: 'technical', name: 'فنی', icon: <Code className="h-4 w-4" /> },
  { id: 'design', name: 'طراحی', icon: <Palette className="h-4 w-4" /> },
  { id: 'database', name: 'دیتابیس', icon: <Database className="h-4 w-4" /> },
  { id: 'language', name: 'زبان', icon: <Globe className="h-4 w-4" /> },
  { id: 'tool', name: 'ابزارها', icon: <ToolCase className="h-4 w-4" /> },
  { id: 'soft', name: 'مهارت‌های نرم', icon: <Users className="h-4 w-4" /> },
  { id: 'business', name: 'کسب و کار', icon: <BarChart3 className="h-4 w-4" /> }
]

const SkillsForm = () => {
  const { getActiveResume, addSkill, updateSkill, deleteSkill } = useResumeStore()
  const activeResume = getActiveResume()
  const skills = activeResume?.skills || []

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'technical',
    level: 3
  })

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill()
      setNewSkill({
        name: '',
        category: 'technical',
        level: 3
      })
    }
  }

  const renderStars = (level: number) => {
    return (
      <div className="flex space-x-1 space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => {
              // Update skill level
            }}
            className="text-gray-300 hover:text-yellow-400"
          >
            <Star 
              className={`h-5 w-5 ${star <= level ? 'fill-yellow-400 text-yellow-400' : ''}`}
            />
          </button>
        ))}
      </div>
    )
  }

  const getCategorySkills = (categoryId: string) => {
    return skills.filter(skill => skill.category === categoryId)
  }

  return (
    <div className="space-y-6">
      
      <div className="space-y-4">
        {skillCategories.map((category) => {
          const categorySkills = getCategorySkills(category.id)
          
          if (categorySkills.length === 0) return null
          
          return (
            <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
              
              <div className="flex items-center justify-between p-3 bg-gray-50">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="text-gray-600">
                    {category.icon}
                  </div>
                  <span className="font-medium text-gray-900">
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({categorySkills.length})
                  </span>
                </div>
              </div>

              
              <div className="p-3 space-y-3">
                {categorySkills.map((skill) => (
                  <div 
                    key={skill.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <span className="font-medium text-gray-900">
                        {skill.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 space-x-reverse">
                      {renderStars(skill.level)}
                      <span className="text-sm text-gray-500 w-8 text-center">
                        {skill.level}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>


      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">
          افزودن مهارت جدید
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="skill-name" required>
                نام مهارت
              </Label>
              <Input
                id="skill-name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                placeholder="مثلا: React, Photoshop, مدیریت پروژه"
              />
            </div>

            <div>
              <Label htmlFor="skill-category" required>
                دسته‌بندی
              </Label>
              <select
                id="skill-category"
                value={newSkill.category}
                onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {skillCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

    
          <div>
            <Label>
              سطح مهارت
            </Label>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">مبتدی</span>
                <span className="text-sm text-gray-600">متخصص</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setNewSkill({...newSkill, level})}
                    className={`p-2 rounded-lg ${
                      newSkill.level === level 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  {newSkill.level === 1 && 'آشنایی اولیه'}
                  {newSkill.level === 2 && 'مبتدی'}
                  {newSkill.level === 3 && 'متوسط'}
                  {newSkill.level === 4 && 'پیشرفته'}
                  {newSkill.level === 5 && 'متخصص'}
                </span>
              </div>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddSkill}
            leftIcon={<Plus className="h-4 w-4" />}
            disabled={!newSkill.name.trim()}
            fullWidth
          >
            افزودن مهارت
          </Button>
        </div>
      </div>


      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 مهارت‌های کلیدی خود را اولویت‌بندی کنید و فقط مهارت‌های مرتبط را ذکر کنید
        </p>
      </div>

      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">
          پیشنهادهای سریع
        </h4>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'Git', 'Figma', 'Project Management'].map((skill) => (
            <button
              key={skill}
              onClick={() => {
                setNewSkill({
                  name: skill,
                  category: skill.includes('CSS') || skill.includes('Figma') ? 'design' : 'technical',
                  level: 4
                })
              }}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsForm