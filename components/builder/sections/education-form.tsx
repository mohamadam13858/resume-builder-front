'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { Plus, Trash2, Calendar } from 'lucide-react'

export default function EducationForm() {
  const { getActiveResume, updateResumeLocally } = useResumeStore()
  const resume = getActiveResume()

  if (!resume) return null

  const education = resume.content.education || []

  const [newEdu, setNewEdu] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
  })

  const addEducation = () => {
    if (!newEdu.school.trim() || !newEdu.degree.trim() || !newEdu.field.trim()) return

    const newItem = { id: `edu-${Date.now()}`, ...newEdu }

    updateResumeLocally(resume.id, {
      content: {
        ...resume.content,
        education: [...education, newItem],
      },
      updatedAt: new Date(),
    })

    setNewEdu({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    })
  }

  const updateEdu = (id: string, field: string, value: any) => {
    const updated = education.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    )

    updateResumeLocally(resume.id, {
      content: { ...resume.content, education: updated },
      updatedAt: new Date(),
    })
  }

  const deleteEdu = (id: string) => {
    const updated = education.filter(item => item.id !== id)
    updateResumeLocally(resume.id, {
      content: { ...resume.content, education: updated },
      updatedAt: new Date(),
    })
  }

  return (
    <div className="space-y-8">
      {education.map(edu => (
        <div key={edu.id} className="border rounded-lg p-5 bg-white">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="font-bold">{edu.degree} در {edu.field}</h3>
              <p className="text-gray-600">{edu.school}</p>
            </div>
            <button onClick={() => deleteEdu(edu.id)} className="text-red-600">
              <Trash2 size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="دانشگاه / موسسه"
              value={edu.school}
              onChange={e => updateEdu(edu.id, 'school', e.target.value)}
            />
            <Input
              label="مدرک"
              value={edu.degree}
              onChange={e => updateEdu(edu.id, 'degree', e.target.value)}
            />
            <Input
              label="رشته"
              value={edu.field}
              onChange={e => updateEdu(edu.id, 'field', e.target.value)}
            />
            <Input
              label="معدل (اختیاری)"
              value={edu.gpa || ''}
              onChange={e => updateEdu(edu.id, 'gpa', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="تاریخ شروع"
              type="month"
              value={edu.startDate}
              onChange={e => updateEdu(edu.id, 'startDate', e.target.value)}
            />
            <Input
              label="تاریخ پایان"
              type="month"
              value={edu.endDate}
              onChange={e => updateEdu(edu.id, 'endDate', e.target.value)}
            />
          </div>

          <Textarea
            label="توضیحات (دروس مهم، افتخارات و ...)"
            rows={3}
            value={edu.description || ''}
            onChange={e => updateEdu(edu.id, 'description', e.target.value)}
          />
        </div>
      ))}

      <div className="border-2 border-dashed rounded-lg p-5">
        <h3 className="font-medium text-lg mb-4">افزودن تحصیلات جدید</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="دانشگاه / موسسه"
            value={newEdu.school}
            onChange={e => setNewEdu({ ...newEdu, school: e.target.value })}
          />
          <Input
            label="مدرک"
            value={newEdu.degree}
            onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })}
          />
          <Input
            label="رشته"
            value={newEdu.field}
            onChange={e => setNewEdu({ ...newEdu, field: e.target.value })}
          />
          <Input
            label="معدل (اختیاری)"
            value={newEdu.gpa}
            onChange={e => setNewEdu({ ...newEdu, gpa: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="تاریخ شروع"
            type="month"
            value={newEdu.startDate}
            onChange={e => setNewEdu({ ...newEdu, startDate: e.target.value })}
          />
          <Input
            label="تاریخ پایان"
            type="month"
            value={newEdu.endDate}
            onChange={e => setNewEdu({ ...newEdu, endDate: e.target.value })}
          />
        </div>

        <Textarea
          label="توضیحات"
          rows={3}
          value={newEdu.description}
          onChange={e => setNewEdu({ ...newEdu, description: e.target.value })}
          className="mb-4"
        />

        <Button
          onClick={addEducation}
          disabled={!newEdu.school.trim() || !newEdu.degree.trim() || !newEdu.field.trim()}
          fullWidth
        >
          افزودن تحصیلات
        </Button>
      </div>
    </div>
  )
}