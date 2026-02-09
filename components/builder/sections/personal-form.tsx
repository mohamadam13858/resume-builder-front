'use client'

import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react'

export default function PersonalForm() {
  const { getActiveResume, updateResumeLocally } = useResumeStore()
  const resume = getActiveResume()

  if (!resume) return null

  const personal = resume.content.personalInfo || {}

  const handleChange = (field: string, value: string) => {
    updateResumeLocally(resume.id, {
      content: {
        ...resume.content,
        personalInfo: {
          ...personal,
          [field]: value,
        },
      },
      updatedAt: new Date(),
    })
  }

  return (
    <div className="space-y-5">
      <div>
        <Label>نام و نام خانوادگی</Label>
        <Input
          value={personal.name || ''}
          onChange={e => handleChange('name', e.target.value)}
          leftIcon={<User className="h-5 w-5" />}
          placeholder="نام کامل"
        />
      </div>

      <div>
        <Label>عنوان شغلی</Label>
        <Input
          value={personal.title || ''}
          onChange={e => handleChange('title', e.target.value)}
          placeholder="مثال: توسعه‌دهنده ارشد"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>ایمیل</Label>
          <Input
            type="email"
            value={personal.email || ''}
            onChange={e => handleChange('email', e.target.value)}
            leftIcon={<Mail className="h-5 w-5" />}
            placeholder="example@email.com"
          />
        </div>

        <div>
          <Label>تلفن</Label>
          <Input
            value={personal.phone || ''}
            onChange={e => handleChange('phone', e.target.value)}
            leftIcon={<Phone className="h-5 w-5" />}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          />
        </div>
      </div>

      <div>
        <Label>مکان</Label>
        <Input
          value={personal.location || ''}
          onChange={e => handleChange('location', e.target.value)}
          leftIcon={<MapPin className="h-5 w-5" />}
          placeholder="شهر، کشور"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>لینکدین</Label>
          <Input
            value={personal.linkedin || ''}
            onChange={e => handleChange('linkedin', e.target.value)}
            leftIcon={<Linkedin className="h-5 w-5" />}
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div>
          <Label>گیت‌هاب</Label>
          <Input
            value={personal.github || ''}
            onChange={e => handleChange('github', e.target.value)}
            leftIcon={<Github className="h-5 w-5" />}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div>
        <Label>وبسایت</Label>
        <Input
          value={personal.website || ''}
          onChange={e => handleChange('website', e.target.value)}
          leftIcon={<Globe className="h-5 w-5" />}
          placeholder="https://example.com"
        />
      </div>

      <div>
        <Label>خلاصه حرفه‌ای</Label>
        <Textarea
          rows={4}
          value={resume.content.summary || ''}
          onChange={e =>
            updateResumeLocally(resume.id, {
              content: { ...resume.content, summary: e.target.value },
              updatedAt: new Date(),
            })
          }
          placeholder="خلاصه‌ای کوتاه و جذاب از خودتون..."
        />
      </div>
    </div>
  )
}