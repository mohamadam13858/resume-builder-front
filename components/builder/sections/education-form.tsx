'use client'

import React, { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { 
  Plus, 
  Trash2, 
  GraduationCap, 
  Calendar,
  Award,
  MapPin,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

const EducationForm = () => {
  const { getActiveResume, addEducation, updateEducation, deleteEducation } = useResumeStore()
  const activeResume = getActiveResume()
  const education = activeResume?.education || []

  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
    gpa: ''
  })

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.degree) {
      addEducation()
      setNewEducation({
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
        gpa: ''
      })
    }
  }

  return (
    <div className="space-y-6">
    
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div 
            key={edu.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="h-8 w-8 bg-green-100 rounded flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium text-gray-900">
                  تحصیلات {index + 1}
                </span>
              </div>
              
              <button
                onClick={() => deleteEducation(edu.id)}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
                <div>
                  <Label htmlFor={`school-${edu.id}`} required>
                    دانشگاه/مدرسه
                  </Label>
                  <Input
                    id={`school-${edu.id}`}
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                    className="mt-1"
                    placeholder="نام دانشگاه یا مدرسه"
                  />
                </div>

                
                <div>
                  <Label htmlFor={`degree-${edu.id}`} required>
                    مقطع تحصیلی
                  </Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    className="mt-1"
                    placeholder="کارشناسی، کارشناسی ارشد، دکتری"
                  />
                </div>
              </div>

        
              <div>
                <Label htmlFor={`field-${edu.id}`} required>
                  رشته تحصیلی
                </Label>
                <Input
                  id={`field-${edu.id}`}
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                  className="mt-1"
                  placeholder="رشته تحصیلی"
                />
              </div>

            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <Label htmlFor={`edu-startDate-${edu.id}`}>
                    تاریخ شروع
                  </Label>
                  <Input
                    id={`edu-startDate-${edu.id}`}
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    leftIcon={<Calendar className="h-5 w-5" />}
                    className="mt-1"
                  />
                </div>

                
                <div>
                  <Label htmlFor={`edu-endDate-${edu.id}`}>
                    تاریخ پایان
                  </Label>
                  <Input
                    id={`edu-endDate-${edu.id}`}
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`gpa-${edu.id}`}>
                    معدل (اختیاری)
                  </Label>
                  <Input
                    id={`gpa-${edu.id}`}
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    leftIcon={<Award className="h-5 w-5" />}
                    className="mt-1"
                    placeholder="مثلا: ۱۸.۵"
                  />
                </div>
              </div>

            
              <div>
                <Label htmlFor={`edu-description-${edu.id}`}>
                  توضیحات
                </Label>
                <Textarea
                  id={`edu-description-${edu.id}`}
                  rows={3}
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                  className="mt-1"
                  placeholder="دروس مهم، افتخارات، فعالیت‌های فوق‌برنامه..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">
          افزودن تحصیلات جدید
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-school" required>
                دانشگاه/مدرسه
              </Label>
              <Input
                id="new-school"
                value={newEducation.school}
                onChange={(e) => setNewEducation({...newEducation, school: e.target.value})}
                placeholder="نام دانشگاه یا مدرسه"
              />
            </div>

            <div>
              <Label htmlFor="new-degree" required>
                مقطع تحصیلی
              </Label>
              <Input
                id="new-degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                placeholder="کارشناسی، کارشناسی ارشد، دکتری"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="new-field" required>
              رشته تحصیلی
            </Label>
            <Input
              id="new-field"
              value={newEducation.field}
              onChange={(e) => setNewEducation({...newEducation, field: e.target.value})}
              placeholder="رشته تحصیلی"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-edu-startDate">
                تاریخ شروع
              </Label>
              <Input
                id="new-edu-startDate"
                type="month"
                value={newEducation.startDate}
                onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="new-edu-endDate">
                تاریخ پایان
              </Label>
              <Input
                id="new-edu-endDate"
                type="month"
                value={newEducation.endDate}
                onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="new-edu-description">
              توضیحات (اختیاری)
            </Label>
            <Textarea
              id="new-edu-description"
              rows={3}
              value={newEducation.description}
              onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
              placeholder="دروس مهم، افتخارات، فعالیت‌های فوق‌برنامه..."
            />
          </div>

          <Button
            type="button"
            onClick={handleAddEducation}
            leftIcon={<Plus className="h-4 w-4" />}
            disabled={!newEducation.school || !newEducation.degree || !newEducation.field}
            fullWidth
          >
            افزودن تحصیلات
          </Button>
        </div>
      </div>

      
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 تحصیلات خود را به ترتیب زمانی معکوس مرتب کنید (جدیدترین اول)
        </p>
      </div>
    </div>
  )
}

export default EducationForm