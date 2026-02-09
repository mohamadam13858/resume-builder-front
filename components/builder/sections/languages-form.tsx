'use client'

import { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { Plus, Trash2, Globe } from 'lucide-react'

const languageLevels = [
  'مبتدی',
  'متوسط',
  'پیشرفته',
  'مسلط',
  'بومی',
]

export default function LanguagesForm() {
  const { getActiveResume, updateResumeLocally } = useResumeStore()
  const resume = getActiveResume()

  if (!resume) return null

  const languages = resume.content.languages || []

  const [newLang, setNewLang] = useState({
    name: '',
    level: 'متوسط',
  })

  const addLanguage = () => {
    if (!newLang.name.trim()) return

    const newItem = `${newLang.name.trim()} (${newLang.level})`

    updateResumeLocally(resume.id, {
      content: {
        ...resume.content,
        languages: [...languages, newItem],
      },
      updatedAt: new Date(),
    })

    setNewLang({ name: '', level: 'متوسط' })
  }

  const deleteLanguage = (index: number) => {
    const updated = languages.filter((_, i) => i !== index)
    updateResumeLocally(resume.id, {
      content: { ...resume.content, languages: updated },
      updatedAt: new Date(),
    })
  }

  const updateLanguage = (index: number, value: string) => {
    const updated = [...languages]
    updated[index] = value
    updateResumeLocally(resume.id, {
      content: { ...resume.content, languages: updated },
      updatedAt: new Date(),
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border rounded-lg bg-white"
          >
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-blue-600" />
              <span>{lang}</span>
            </div>
            <button
              onClick={() => deleteLanguage(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

    
      <div className="border-2 border-dashed rounded-lg p-4">
        <h3 className="font-medium mb-4">افزودن زبان جدید</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>نام زبان</Label>
            <Input
              value={newLang.name}
              onChange={e => setNewLang({ ...newLang, name: e.target.value })}
              placeholder="انگلیسی، فرانسه، آلمانی..."
            />
          </div>

          <div>
            <Label>سطح</Label>
            <select
              value={newLang.level}
              onChange={e => setNewLang({ ...newLang, level: e.target.value })}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              {languageLevels.map(lvl => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button onClick={addLanguage} className="mt-4" fullWidth>
          افزودن زبان
        </Button>
      </div>
    </div>
  )
}