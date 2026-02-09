'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { Plus, Trash2, Building, Briefcase, Calendar, MapPin } from 'lucide-react'

export default function ExperienceForm() {
  const { getActiveResume, updateResumeLocally } = useResumeStore()
  const resume = getActiveResume()

  if (!resume) return null

  const experiences = resume.content.experience || []

  const [newExp, setNewExp] = useState({
    id: '',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    location: '',
    description: '',
  })

  const addExperience = () => {
    if (!newExp.company || !newExp.position) return

    const newItem = {
      id: `exp-${Date.now()}`,
      company: newExp.company,
      position: newExp.position,
      startDate: newExp.startDate,
      endDate: newExp.isCurrent ? '' : newExp.endDate,
      isCurrent: newExp.isCurrent,
      location: newExp.location,
      description: newExp.description,
    }

    updateResumeLocally(resume.id, {
      content: {
        ...resume.content,
        experience: [...experiences, newItem],
      },
      updatedAt: new Date(),
    })

    setNewExp({
      id: '',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      location: '',
      description: '',
    })
  }

  const updateExp = (id: string, field: string, value: any) => {
    const updated = experiences.map((item:any) =>
      item.id === id ? { ...item, [field]: value } : item
    )

    updateResumeLocally(resume.id, {
      content: { ...resume.content, experience: updated },
      updatedAt: new Date(),
    })
  }

  const removeExp = (id: string) => {
    const updated = experiences.filter((item:any) => item.id !== id)
    updateResumeLocally(resume.id, {
      content: { ...resume.content, experience: updated },
      updatedAt: new Date(),
    })
  }

  return (
    <div className="space-y-6">

      {experiences.map((exp:any) => (
        <div key={exp.id} className="border rounded-lg p-4 bg-white">
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">{exp.position} در {exp.company}</h3>
            <button onClick={() => removeExp(exp.id)} className="text-red-600">
              <Trash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>شرکت</Label>
              <Input
                value={exp.company}
                onChange={e => updateExp(exp.id, 'company', e.target.value)}
              />
            </div>
            <div>
              <Label>سمت</Label>
              <Input
                value={exp.position}
                onChange={e => updateExp(exp.id, 'position', e.target.value)}
              />
            </div>
            <div>
              <Label>تاریخ شروع</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={e => updateExp(exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div>
              <Label>تاریخ پایان</Label>
              <Input
                type="month"
                value={exp.endDate}
                disabled={exp.isCurrent}
                onChange={e => updateExp(exp.id, 'endDate', e.target.value)}
              />
              <label className="flex items-center mt-2 text-sm">
                <input
                  type="checkbox"
                  checked={exp.isCurrent}
                  onChange={e => updateExp(exp.id, 'isCurrent', e.target.checked)}
                  className="ml-2"
                />
                <span className="mr-2">هم‌اکنون مشغولم</span>
              </label>
            </div>
            <div>
              <Label>مکان</Label>
              <Input
                value={exp.location || ''}
                onChange={e => updateExp(exp.id, 'location', e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <Label>توضیحات</Label>
            <Textarea
              rows={3}
              value={exp.description}
              onChange={e => updateExp(exp.id, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}

    
      <div className="border-2 border-dashed rounded-lg p-4">
        <h3 className="font-medium mb-4">افزودن تجربه جدید</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="نام شرکت"
            value={newExp.company}
            onChange={e => setNewExp({ ...newExp, company: e.target.value })}
          />
          <Input
            placeholder="سمت"
            value={newExp.position}
            onChange={e => setNewExp({ ...newExp, position: e.target.value })}
          />
          <Input
            type="month"
            placeholder="تاریخ شروع"
            value={newExp.startDate}
            onChange={e => setNewExp({ ...newExp, startDate: e.target.value })}
          />
          <div>
            <Input
              type="month"
              placeholder="تاریخ پایان"
              value={newExp.endDate}
              disabled={newExp.isCurrent}
              onChange={e => setNewExp({ ...newExp, endDate: e.target.value })}
            />
            <label className="flex items-center mt-2 text-sm">
              <input
                type="checkbox"
                checked={newExp.isCurrent}
                onChange={e => setNewExp({ ...newExp, isCurrent: e.target.checked })}
                className="ml-2"
              />
              <span className="mr-2">هم‌اکنون مشغولم</span>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <Input
            placeholder="مکان (اختیاری)"
            value={newExp.location}
            onChange={e => setNewExp({ ...newExp, location: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <Label>توضیحات و دستاوردها</Label>
          <Textarea
            rows={3}
            value={newExp.description}
            onChange={e => setNewExp({ ...newExp, description: e.target.value })}
          />
        </div>

        <Button
          onClick={addExperience}
          className="mt-4"
          disabled={!newExp.company || !newExp.position}
          fullWidth
        >
          افزودن تجربه
        </Button>
      </div>
    </div>
  )
}