'use client'

import React, { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Alert from '@/components/ui/alert'
import Modal from '@/components/ui/modal'
import {
  User, Mail, Phone, MapPin, Camera, Save, Globe, Linkedin, Github, Twitter, Instagram, Lock, Eye, EyeOff, CheckCircle, XCircle
} from 'lucide-react'

const ProfileForm = () => {
  const { user, updateProfile, changePassword } = useAuthStore()
  const { language, setLanguage } = useThemeStore()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    website: user?.website || '',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
    twitter: user?.twitter || '',
    instagram: user?.instagram || ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setAvatarPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
        avatar: avatarPreview
      })
      setSuccessMessage('پروفایل با موفقیت به‌روزرسانی شد')
      setTimeout(() => setSuccessMessage(''), 4000)
    } catch (err: any) {
      setErrorMessage(err.message || 'خطا در ذخیره تغییرات')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)

    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) throw new Error('رمزهای جدید مطابقت ندارند')
      if (passwordData.newPassword.length < 8) throw new Error('رمز عبور باید حداقل ۸ کاراکتر باشد')

      await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword
      )

      setSuccessMessage('رمز عبور با موفقیت تغییر یافت')
      setPasswordModalOpen(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSuccessMessage(''), 4000)
    } catch (err: any) {
      setErrorMessage(err.message || 'خطا در تغییر رمز عبور')
    } finally {
      setPasswordLoading(false)
    }
  }

  const getPasswordStrength = (pw: string) => {
    if (!pw) return { score: 0, label: 'خالی', color: 'gray' }
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++

    const labels = ['ضعیف', 'متوسط', 'قوی', 'عالی']
    const colors = ['red', 'yellow', 'blue', 'green']
    return { score, label: labels[score] || 'ضعیف', color: colors[score] || 'red' }
  }

  const strength = getPasswordStrength(passwordData.newPassword)

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-10">
        {successMessage && <Alert variant="success" message={successMessage} className="animate-fade-in" />}
        {errorMessage && <Alert variant="error" message={errorMessage} className="animate-fade-in" />}


        <div className="relative group w-32 h-32 md:w-40 md:h-40">   
          <Avatar
            src={avatarPreview || user?.avatar}
            alt={formData.name || "کاربر"}
            size="xl"   
            className={`
      w-full h-full 
      rounded-full 
      ring-4 ring-white ring-offset-2 ring-offset-gray-50
      shadow-2xl 
      object-cover object-center
      transition-all duration-300 group-hover:scale-105
    `}
            initials={formData.name?.slice(0, 2)?.toUpperCase() || 'U'}
          />

    
          <label
            htmlFor="avatar-upload"
            className="
      absolute bottom-1 right-1 
      bg-indigo-600 hover:bg-indigo-700 
      text-white p-2.5 rounded-full 
      cursor-pointer shadow-lg 
      transition-all duration-200 hover:scale-110 hover:shadow-indigo-500/50
      z-10
    "
            title="تغییر عکس پروفایل"
          >
            <Camera className="h-5 w-5" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>

  
          {avatarPreview && avatarPreview !== user?.avatar && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow font-medium">
              جدید
            </span>
          )}
        </div>

      
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/70 p-6 md:p-8 space-y-8">
          <h3 className="text-xl font-bold text-gray-800 pb-3 border-b">اطلاعات پایه</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                value={formData.email}
                leftIcon={<Mail />}
                disabled
                className="mt-2 bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="phone">شماره تماس</Label>
              <Input id="phone" value={formData.phone} leftIcon={<Phone />} className="mt-2" placeholder="۰۹۱۲..." />
            </div>
            <div>
              <Label htmlFor="location">مکان</Label>
              <Input id="location" value={formData.location} leftIcon={<MapPin />} className="mt-2" placeholder="شهر، کشور" />
            </div>
            <div>
              <Label>زبان</Label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-300 transition"
              >
                <option value="fa">فارسی</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="bio">بیوگرافی</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={5}
              className="mt-2 resize-y"
              placeholder="درباره خودتان، تخصص‌ها و اهداف شغلی..."
              maxLength={300}
            />
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <span>حداکثر ۳۰۰ کاراکتر</span>
              <span>{formData.bio.length} / ۳۰۰</span>
            </div>
          </div>
        </div>

    
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/70 p-6 md:p-8 space-y-8">
          <h3 className="text-xl font-bold text-gray-800 pb-3 border-b">شبکه‌های اجتماعی</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['website', 'linkedin', 'github', 'twitter', 'instagram'].map(field => (
              <div key={field}>
                <Label htmlFor={field} className="capitalize">{field === 'website' ? 'وب‌سایت' : field}</Label>
                <Input
                  id={field}
                  name={field}
                  value={formData[field as keyof typeof formData] as string}
                  onChange={handleInputChange}
                  leftIcon={field === 'website' ? <Globe /> : field === 'linkedin' ? <Linkedin /> : field === 'github' ? <Github /> : field === 'twitter' ? <Twitter /> : <Instagram />}
                  className="mt-2"
                  placeholder={`https://${field}.com/...`}
                />
              </div>
            ))}
          </div>
        </div>

  
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/70 p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-bold text-gray-800 pb-3 border-b">تنظیمات حساب</h3>
          <button
            type="button"
            onClick={() => setPasswordModalOpen(true)}
            className="w-full flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            <div>
              <div className="font-semibold">تغییر رمز عبور</div>
              <div className="text-sm text-gray-600 mt-1">برای افزایش امنیت حساب</div>
            </div>
            <Button variant="outline" size="sm">تغییر رمز</Button>
          </button>
        </div>

        <div className="flex gap-4 pt-6">
          <Button variant="outline" className="flex-1 py-6 text-lg">لغو</Button>
          <Button type="submit" loading={isLoading} className="flex-1 py-6 text-lg shadow-lg" leftIcon={<Save />}>
            ذخیره تغییرات
          </Button>
        </div>
      </form>

  
      <Modal isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} title="تغییر رمز عبور" size="md">
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          {['currentPassword', 'newPassword', 'confirmPassword'].map((field, i) => (
            <div key={field}>
              <Label htmlFor={field} required>
                {field === 'currentPassword' ? 'رمز فعلی' : field === 'newPassword' ? 'رمز جدید' : 'تأیید رمز جدید'}
              </Label>
              <div className="relative mt-2">
                <Input
                  id={field}
                  name={field}
                  type={showPasswords[field as keyof typeof showPasswords] ? 'text' : 'password'}
                  value={passwordData[field as keyof typeof passwordData]}
                  onChange={handlePasswordChange}
                  leftIcon={<Lock />}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPasswords(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))}
                >
                  {showPasswords[field as keyof typeof showPasswords] ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {field === 'newPassword' && passwordData.newPassword && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>قدرت رمز:</span>
                    <span className={`font-medium text-${strength.color}-600`}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${strength.score === 0 ? 'bg-red-500 w-1/4' :
                        strength.score === 1 ? 'bg-yellow-500 w-2/4' :
                          strength.score === 2 ? 'bg-blue-500 w-3/4' :
                            'bg-green-500 w-full'
                        }`}
                    />
                  </div>
                </div>
              )}

              {field === 'confirmPassword' && passwordData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2 text-xs">
                  {passwordData.newPassword === passwordData.confirmPassword ? (
                    <><CheckCircle className="h-4 w-4 text-green-600" /> مطابقت دارند</>
                  ) : (
                    <><XCircle className="h-4 w-4 text-red-600" /> مطابقت ندارند</>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setPasswordModalOpen(false)}>
              انصراف
            </Button>
            <Button type="submit" loading={passwordLoading} className="flex-1" disabled={passwordLoading || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}>
              تغییر رمز عبور
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ProfileForm