'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useResumeStore } from '@/store/resumeStore'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github,
  Globe,
  Upload
} from 'lucide-react'

const PersonalForm = () => {
  const { getActiveResume, updatePersonalInfo } = useResumeStore()
  const activeResume = getActiveResume()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      name: activeResume?.personal.name || '',
      title: activeResume?.personal.title || '',
      email: activeResume?.personal.email || '',
      phone: activeResume?.personal.phone || '',
      location: activeResume?.personal.location || '',
      linkedin: activeResume?.personal.linkedin || '',
      github: activeResume?.personal.github || '',
      website: activeResume?.personal.website || '',
      summary: activeResume?.personal.summary || ''
    }
  })

  const onSubmit = (data: any) => {
    updatePersonalInfo(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    
      <div className="flex items-center space-x-4 space-x-reverse mb-6">
        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {activeResume?.personal.avatar ? (
            <img 
              src={activeResume.personal.avatar} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-10 w-10 text-gray-400" />
          )}
        </div>
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={<Upload className="h-4 w-4" />}
          >
            تغییر عکس
          </Button>
          <p className="text-xs text-gray-500 mt-1">
            پیشنهاد: عکس مربعی با پس‌زمینه روشن
          </p>
        </div>
      </div>

    
      <div>
        <Label htmlFor="name" required>
          نام و نام خانوادگی
        </Label>
        <Input
          id="name"
          {...register('name', { required: true })}
          error={errors.name?.message}
          leftIcon={<User className="h-5 w-5" />}
          className="mt-1"
          placeholder="علی احمدی"
        />
      </div>

      
      <div>
        <Label htmlFor="title">
          عنوان شغلی
        </Label>
        <Input
          id="title"
          {...register('title')}
          error={errors.title?.message}
          className="mt-1"
          placeholder="توسعه‌دهنده فرانت‌اند"
        />
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <Label htmlFor="email" required>
            ایمیل
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: true })}
            error={errors.email?.message}
            leftIcon={<Mail className="h-5 w-5" />}
            className="mt-1"
            placeholder="example@email.com"
          />
        </div>

    
        <div>
          <Label htmlFor="phone">
            تلفن
          </Label>
          <Input
            id="phone"
            {...register('phone')}
            error={errors.phone?.message}
            leftIcon={<Phone className="h-5 w-5" />}
            className="mt-1"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          />
        </div>
      </div>


      <div>
        <Label htmlFor="location">
          مکان
        </Label>
        <Input
          id="location"
          {...register('location')}
          error={errors.location?.message}
          leftIcon={<MapPin className="h-5 w-5" />}
          className="mt-1"
          placeholder="تهران، ایران"
        />
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <Label htmlFor="linkedin">
            لینکدین
          </Label>
          <Input
            id="linkedin"
            type="url"
            {...register('linkedin')}
            error={errors.linkedin?.message}
            leftIcon={<Linkedin className="h-5 w-5" />}
            className="mt-1"
            placeholder="https://linkedin.com/in/username"
          />
        </div>


        <div>
          <Label htmlFor="github">
            گیت‌هاب
          </Label>
          <Input
            id="github"
            type="url"
            {...register('github')}
            error={errors.github?.message}
            leftIcon={<Github className="h-5 w-5" />}
            className="mt-1"
            placeholder="https://github.com/username"
          />
        </div>
      </div>

    
      <div>
        <Label htmlFor="website">
          وبسایت
        </Label>
        <Input
          id="website"
          type="url"
          {...register('website')}
          error={errors.website?.message}
          leftIcon={<Globe className="h-5 w-5" />}
          className="mt-1"
          placeholder="https://example.com"
        />
      </div>

    
      <div>
        <Label htmlFor="summary">
          خلاصه حرفه‌ای
        </Label>
        <Textarea
          id="summary"
          rows={4}
          {...register('summary')}
          error={errors.summary?.message}
          className="mt-1"
          placeholder="یک خلاصه مختصر و تاثیرگذار از تجربه و تخصص خود بنویسید..."
        />
        <p className="text-xs text-gray-500 mt-1">
          توصیه می‌شود ۲-۳ پاراگراف کوتاه باشد
        </p>
      </div>

    
      {isDirty && (
        <div className="pt-4 border-t">
          <Button type="submit" fullWidth>
            ذخیره اطلاعات
          </Button>
        </div>
      )}
    </form>
  )
}

export default PersonalForm