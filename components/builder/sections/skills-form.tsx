'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { Plus, Trash2, Star } from 'lucide-react'

const skillCategories = [
  { id: 'technical', name: 'فنی' },
  { id: 'design', name: 'طراحی' },
  { id: 'database', name: 'دیتابیس' },
  { id: 'language', name: 'زبان' },
  { id: 'tool', name: 'ابزارها' },
  { id: 'soft', name: 'مهارت‌های نرم' },
  { id: 'business', name: 'کسب و کار' },
]

export default function SkillsForm() {
  const { getActiveResume, updateResumeLocally } = useResumeStore()
  const resume = getActiveResume()

  if (!resume) return null

  const skills = resume.content.skills || []

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'technical',
    level: 3,
  })

  const addSkill = () => {
    if (!newSkill.name.trim()) return

    const newItem = {
      id: `skill-${Date.now()}`,
      name: newSkill.name.trim(),
      category: newSkill.category,
      level: newSkill.level,
    }

    updateResumeLocally(resume.id, {
      content: {
        ...resume.content,
        skills: [...skills, newItem],
      },
      updatedAt: new Date(),
    })

    setNewSkill({ name: '', category: 'technical', level: 3 })
  }

  const updateSkill = (id: string, field: string, value: any) => {
    const updated = skills.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    )

    updateResumeLocally(resume.id, {
      content: { ...resume.content, skills: updated },
      updatedAt: new Date(),
    })
  }

  const deleteSkill = (id: string) => {
    const updated = skills.filter(item => item.id !== id)
    updateResumeLocally(resume.id, {
      content: { ...resume.content, skills: updated },
      updatedAt: new Date(),
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {skills.map(skill => (
          <div
            key={skill.id}
            className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => deleteSkill(skill.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
              <span className="font-medium">{skill.name}</span>
              <span className="text-sm text-gray-500">({skill.category})</span>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={20}
                  className={`cursor-pointer ${
                    star <= skill.level
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onClick={() => updateSkill(skill.id, 'level', star)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

  
      <div className="border-2 border-dashed rounded-lg p-4">
        <h3 className="font-medium mb-4">افزودن مهارت جدید</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>نام مهارت</Label>
            <Input
              value={newSkill.name}
              onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="React, Photoshop, مدیریت پروژه و ..."
            />
          </div>

          <div>
            <Label>دسته‌بندی</Label>
            <select
              value={newSkill.category}
              onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              {skillCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <Label>سطح مهارت</Label>
          <div className="flex justify-center gap-3 mt-2">
            {[1, 2, 3, 4, 5].map(lvl => (
              <button
                key={lvl}
                type="button"
                onClick={() => setNewSkill({ ...newSkill, level: lvl })}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                  newSkill.level === lvl ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={addSkill}
          disabled={!newSkill.name.trim()}
          fullWidth
        >
          افزودن مهارت
        </Button>
      </div>
    </div>
  )
}