'use client'

import React, { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { 
  Plus, 
  Trash2, 
  Globe,
  ChevronUp,
  ChevronDown,
  MessageSquare,
  BookOpen,
  Headphones,
  Edit
} from 'lucide-react'

const languageLevels = [
  { id: 'beginner', name: 'مبتدی', description: 'آشنایی اولیه' },
  { id: 'intermediate', name: 'متوسط', description: 'توانایی مکالمه روزمره' },
  { id: 'advanced', name: 'پیشرفته', description: 'توانایی مکالمه روان' },
  { id: 'fluent', name: 'مسلط', description: 'مشابه زبان مادری' },
  { id: 'native', name: 'بومی', description: 'زبان مادری' }
]

const LanguagesForm = () => {
  const { getActiveResume, updateLanguages } = useResumeStore()
  const activeResume = getActiveResume()
  const languages = activeResume?.languages || []

  const [newLanguage, setNewLanguage] = useState({
    name: '',
    level: 'intermediate'
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editLanguage, setEditLanguage] = useState({ name: '', level: '' })

  const handleAddLanguage = () => {
    if (newLanguage.name.trim()) {
      const updatedLanguages = [...languages, `${newLanguage.name} (${getLevelName(newLanguage.level)})`]
      updateLanguages(updatedLanguages)
      setNewLanguage({ name: '', level: 'intermediate' })
    }
  }

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index)
    updateLanguages(updatedLanguages)
    if (editingIndex === index) {
      setEditingIndex(null)
    }
  }

  const handleStartEdit = (index: number) => {
    const lang = languages[index]
    const [name, levelWithParen] = lang.split(' (')
    const level = levelWithParen ? levelWithParen.replace(')', '') : 'intermediate'
    
    setEditingIndex(index)
    setEditLanguage({ name, level })
  }

  const handleSaveEdit = () => {
    if (editingIndex !== null && editLanguage.name.trim()) {
      const updatedLanguages = [...languages]
      updatedLanguages[editingIndex] = `${editLanguage.name} (${getLevelName(editLanguage.level)})`
      updateLanguages(updatedLanguages)
      setEditingIndex(null)
      setEditLanguage({ name: '', level: '' })
    }
  }

  const getLevelName = (levelId: string) => {
    const level = languageLevels.find(l => l.id === levelId)
    return level ? level.name : 'متوسط'
  }

  const getLevelDescription = (levelId: string) => {
    const level = languageLevels.find(l => l.id === levelId)
    return level ? level.description : ''
  }

  const popularLanguages = [
    'انگلیسی', 'فارسی', 'عربی', 'فرانسوی', 'آلمانی', 
    'اسپانیایی', 'چینی', 'ژاپنی', 'کره‌ای', 'ترکی'
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {languages.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">هنوز زبانی اضافه نکرده‌اید</p>
          </div>
        ) : (
          <div className="space-y-3">
            {languages.map((language, index) => (
              editingIndex === index ? (
                <div key={index} className="border border-primary rounded-lg p-4 bg-blue-50">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`edit-lang-name-${index}`}>
                        نام زبان
                      </Label>
                      <Input
                        id={`edit-lang-name-${index}`}
                        value={editLanguage.name}
                        onChange={(e) => setEditLanguage({...editLanguage, name: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`edit-lang-level-${index}`}>
                        سطح مهارت
                      </Label>
                      <select
                        id={`edit-lang-level-${index}`}
                        value={editLanguage.level}
                        onChange={(e) => setEditLanguage({...editLanguage, level: e.target.value})}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {languageLevels.map((level) => (
                          <option key={level.id} value={level.id}>
                            {level.name} - {level.description}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={handleSaveEdit}
                        className="flex-1"
                      >
                        ذخیره
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditingIndex(null)}
                        className="flex-1"
                      >
                        لغو
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {language.split(' (')[0]}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {language.split(' (')[1]?.replace(')', '')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleStartEdit(index)}
                      className="p-1 text-blue-600 hover:text-blue-700"
                      title="ویرایش"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveLanguage(index)}
                      className="p-1 text-red-600 hover:text-red-700"
                      title="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>

    
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">
          افزودن زبان جدید
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-lang-name" required>
                نام زبان
              </Label>
              <Input
                id="new-lang-name"
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({...newLanguage, name: e.target.value})}
                placeholder="نام زبان"
              />
            </div>

            <div>
              <Label htmlFor="new-lang-level">
                سطح مهارت
              </Label>
              <select
                id="new-lang-level"
                value={newLanguage.level}
                onChange={(e) => setNewLanguage({...newLanguage, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {languageLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name} - {level.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

        
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>{getLevelName(newLanguage.level)}:</strong> {getLevelDescription(newLanguage.level)}
            </p>
          </div>

        
          <div>
            <p className="text-sm text-gray-600 mb-2">
              زبان‌های پرکاربرد:
            </p>
            <div className="flex flex-wrap gap-2">
              {popularLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setNewLanguage({...newLanguage, name: lang})}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    newLanguage.name === lang
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddLanguage}
            leftIcon={<Plus className="h-4 w-4" />}
            disabled={!newLanguage.name.trim()}
            fullWidth
          >
            افزودن زبان
          </Button>
        </div>
      </div>

      
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">
            💡 نکاتی برای نمایش مهارت‌های زبانی:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1 pr-4">
            <li className="flex items-center">
              <MessageSquare className="h-3 w-3 ml-1" />
              <span>مکالمه: توانایی گفتگو روزمره</span>
            </li>
            <li className="flex items-center">
              <BookOpen className="h-3 w-3 ml-1" />
              <span>خواندن: درک متون تخصصی</span>
            </li>
            <li className="flex items-center">
              <Edit className="h-3 w-3 ml-1" />
              <span>نوشتن: نگارش ایمیل و گزارش</span>
            </li>
            <li className="flex items-center">
              <Headphones className="h-3 w-3 ml-1" />
              <span>شنیدن: درک مکالمات سریع</span>
            </li>
          </ul>
        </div>

    
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">
            🏆 گواهینامه‌های معتبر زبان:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-white p-2 rounded">
              <strong>IELTS</strong>
              <p className="text-xs text-gray-600">انگلیسی</p>
            </div>
            <div className="bg-white p-2 rounded">
              <strong>TOEFL</strong>
              <p className="text-xs text-gray-600">انگلیسی</p>
            </div>
            <div className="bg-white p-2 rounded">
              <strong>DELF/DALF</strong>
              <p className="text-xs text-gray-600">فرانسوی</p>
            </div>
            <div className="bg-white p-2 rounded">
              <strong>TestDaF</strong>
              <p className="text-xs text-gray-600">آلمانی</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguagesForm