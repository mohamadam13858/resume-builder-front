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
  Building, 
  Briefcase, 
  Calendar,
  MapPin,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

const ExperienceForm = () => {
  const { getActiveResume, addExperience, updateExperience, deleteExperience, moveExperience } = useResumeStore()
  const activeResume = getActiveResume()
  const experiences = activeResume?.experiences || []

  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    isCurrent: false,
    location: ''
  })

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      addExperience()
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        isCurrent: false,
        location: ''
      })
    }
  }

  const handleUpdateExperience = (id: string, field: string, value: any) => {
    updateExperience(id, { [field]: value })
  }

  const handleMoveExperience = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      moveExperience(index, index - 1)
    } else if (direction === 'down' && index < experiences.length - 1) {
      moveExperience(index, index + 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div 
            key={exp.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">
                  تجربه {index + 1}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
    
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleMoveExperience(index, 'up')}
                    className="p-1 hover:bg-gray-100 disabled:opacity-50"
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleMoveExperience(index, 'down')}
                    className="p-1 hover:bg-gray-100 disabled:opacity-50"
                    disabled={index === experiences.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                
            
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

    
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
                <div>
                  <Label htmlFor={`company-${exp.id}`} required>
                    شرکت
                  </Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                    leftIcon={<Building className="h-5 w-5" />}
                    className="mt-1"
                    placeholder="نام شرکت"
                  />
                </div>

            
                <div>
                  <Label htmlFor={`position-${exp.id}`} required>
                    عنوان شغلی
                  </Label>
                  <Input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) => handleUpdateExperience(exp.id, 'position', e.target.value)}
                    leftIcon={<Briefcase className="h-5 w-5" />}
                    className="mt-1"
                    placeholder="عنوان شغلی"
                  />
                </div>
              </div>

            
              <div>
                <Label htmlFor={`location-${exp.id}`}>
                  مکان
                </Label>
                <Input
                  id={`location-${exp.id}`}
                  value={exp.location || ''}
                  onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                  leftIcon={<MapPin className="h-5 w-5" />}
                  className="mt-1"
                  placeholder="شهر، کشور"
                />
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
                <div>
                  <Label htmlFor={`startDate-${exp.id}`} required>
                    تاریخ شروع
                  </Label>
                  <Input
                    id={`startDate-${exp.id}`}
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                    leftIcon={<Calendar className="h-5 w-5" />}
                    className="mt-1"
                  />
                </div>

        
                <div>
                  <Label htmlFor={`endDate-${exp.id}`}>
                    تاریخ پایان
                  </Label>
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      id={`endDate-${exp.id}`}
                      type="month"
                      value={exp.isCurrent ? '' : exp.endDate}
                      onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                      className="mt-1"
                      disabled={exp.isCurrent}
                      placeholder={exp.isCurrent ? 'تاکنون' : ''}
                    />
                    <div className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.isCurrent}
                        onChange={(e) => handleUpdateExperience(exp.id, 'isCurrent', e.target.checked)}
                        className="h-4 w-4 text-primary rounded"
                      />
                      <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700 mr-2">
                        تاکنون
                      </label>
                    </div>
                  </div>
                </div>
              </div>

            
              <div>
                <Label htmlFor={`description-${exp.id}`}>
                  توضیحات و دستاوردها
                </Label>
                <Textarea
                  id={`description-${exp.id}`}
                  rows={3}
                  value={exp.description}
                  onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                  className="mt-1"
                  placeholder="توضیحات مربوط به مسئولیت‌ها، دستاوردها و مهارت‌های کسب‌شده..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">
          افزودن تجربه کاری جدید
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-company" required>
                شرکت
              </Label>
              <Input
                id="new-company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                placeholder="نام شرکت"
              />
            </div>

            <div>
              <Label htmlFor="new-position" required>
                عنوان شغلی
              </Label>
              <Input
                id="new-position"
                value={newExperience.position}
                onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                placeholder="عنوان شغلی"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-startDate">
                تاریخ شروع
              </Label>
              <Input
                id="new-startDate"
                type="month"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="new-endDate">
                تاریخ پایان
              </Label>
              <Input
                id="new-endDate"
                type="month"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                disabled={newExperience.isCurrent}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="new-current"
                  checked={newExperience.isCurrent}
                  onChange={(e) => setNewExperience({...newExperience, isCurrent: e.target.checked})}
                  className="h-4 w-4 text-primary rounded"
                />
                <label htmlFor="new-current" className="text-sm text-gray-700 mr-2">
                  هم‌اکنون مشغول به کار هستم
                </label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="new-description">
              توضیحات
            </Label>
            <Textarea
              id="new-description"
              rows={3}
              value={newExperience.description}
              onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
              placeholder="توضیحات مربوط به این تجربه کاری..."
            />
          </div>

          <Button
            type="button"
            onClick={handleAddExperience}
            leftIcon={<Plus className="h-4 w-4" />}
            disabled={!newExperience.company || !newExperience.position}
            fullWidth
          >
            افزودن تجربه کاری
          </Button>
        </div>
      </div>


      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 تجربیات کاری خود را به ترتیب زمانی معکوس مرتب کنید (جدیدترین اول)
        </p>
      </div>
    </div>
  )
}

export default ExperienceForm