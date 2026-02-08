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
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera,
  Save,
  Upload,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
        avatar: avatarPreview
      }

      await updateProfile(updateData)

      setSuccessMessage('پروفایل با موفقیت به‌روزرسانی شد!')
      
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error: any) {
      setErrorMessage(error.message || 'خطا در به‌روزرسانی پروفایل')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('رمز عبور جدید و تأیید آن مطابقت ندارند')
      }

      if (passwordData.newPassword.length < 6) {
        throw new Error('رمز عبور باید حداقل ۶ کاراکتر باشد')
      }

      await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword
      )

      setSuccessMessage('رمز عبور با موفقیت تغییر کرد!')
      setPasswordModalOpen(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })

      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error: any) {
      setErrorMessage(error.message || 'خطا در تغییر رمز عبور')
    } finally {
      setPasswordLoading(false)
    }
  }

  const resetPasswordForm = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setPasswordModalOpen(false)
  }

  const languages = [
    { value: 'fa', label: 'فارسی' },
    { value: 'en', label: 'English' }
  ]

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { score: 0, label: 'خالی' }
    if (password.length < 6) return { score: 1, label: 'ضعیف' }
    
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    
    const labels = ['ضعیف', 'متوسط', 'قوی', 'خیلی قوی']
    return { score, label: labels[Math.min(score, 3)] }
  }

  const passwordStrength = getPasswordStrength(passwordData.newPassword)

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {successMessage && (
          <Alert variant="success" message={successMessage} />
        )}
        
        {errorMessage && (
          <Alert variant="error" message={errorMessage} />
        )}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <Avatar
              src={avatarPreview}
              alt={formData.name}
              size="xl"
              initials={formData.name.substring(0, 2)}
              className="border-4 border-white shadow-lg"
            />
            
            <label 
              htmlFor="avatar-upload"
              className="absolute bottom-0 left-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
              title="تغییر عکس"
            >
              <Camera className="h-5 w-5 text-white" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <Label htmlFor="name" required>
                نام و نام خانوادگی
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                leftIcon={<User className="h-5 w-5" />}
                className="mt-1"
                placeholder="نام خود را وارد کنید"
                required
              />
            </div>

            <p className="text-sm text-gray-500">
              عکس پروفایل خود را تغییر دهید. فرمت‌های مجاز: JPG, PNG, GIF
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">
            اطلاعات پایه
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email" required>
                ایمیل
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                leftIcon={<Mail className="h-5 w-5" />}
                className="mt-1"
                placeholder="example@email.com"
                required
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">ایمیل قابل تغییر نیست</p>
            </div>

            <div>
              <Label htmlFor="phone">
                تلفن
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                leftIcon={<Phone className="h-5 w-5" />}
                className="mt-1"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              />
            </div>

            <div>
              <Label htmlFor="location">
                مکان
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                leftIcon={<MapPin className="h-5 w-5" />}
                className="mt-1"
                placeholder="تهران، ایران"
              />
            </div>

            <div>
              <Label htmlFor="language">
                زبان پیش‌فرض
              </Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="bio">
              بیوگرافی
            </Label>
            <Textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="درباره خودتان بنویسید..."
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                یک معرفی کوتاه از خودتان
              </p>
              <span className="text-xs text-gray-400">
                {formData.bio.length}/۲۰۰
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">
            شبکه‌های اجتماعی
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="website">
                وبسایت
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                leftIcon={<Globe className="h-5 w-5" />}
                className="mt-1"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label htmlFor="linkedin">
                لینکدین
              </Label>
              <Input
                id="linkedin"
                name="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={handleInputChange}
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
                name="github"
                type="url"
                value={formData.github}
                onChange={handleInputChange}
                leftIcon={<Github className="h-5 w-5" />}
                className="mt-1"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <Label htmlFor="twitter">
                توییتر
              </Label>
              <Input
                id="twitter"
                name="twitter"
                type="url"
                value={formData.twitter}
                onChange={handleInputChange}
                leftIcon={<Twitter className="h-5 w-5" />}
                className="mt-1"
                placeholder="https://twitter.com/username"
              />
            </div>

            <div>
              <Label htmlFor="instagram">
                اینستاگرام
              </Label>
              <Input
                id="instagram"
                name="instagram"
                type="url"
                value={formData.instagram}
                onChange={handleInputChange}
                leftIcon={<Instagram className="h-5 w-5" />}
                className="mt-1"
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">
            تنظیمات حساب
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">تغییر رمز عبور</h4>
                <p className="text-sm text-gray-600">برای امنیت بیشتر رمز عبور خود را تغییر دهید</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPasswordModalOpen(true)}
              >
                تغییر رمز عبور
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">اشتراک‌های ایمیلی</h4>
                <p className="text-sm text-gray-600">اخبار و به‌روزرسانی‌ها</p>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-3">فعال</span>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer">
                  <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">حساب دو مرحله‌ای</h4>
                <p className="text-sm text-gray-600">افزایش امنیت حساب</p>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-3">غیرفعال</span>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 cursor-pointer">
                  <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-red-200 rounded-lg p-6 bg-red-50">
          <h3 className="text-lg font-semibold text-red-900 mb-4">
            ناحیه خطر
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-900">خروج از همه دستگاه‌ها</h4>
                <p className="text-sm text-red-700">از همه دستگاه‌های دیگر خارج شوید</p>
              </div>
              <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                خروج از همه
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-900">حذف حساب کاربری</h4>
                <p className="text-sm text-red-700">این عمل قابل بازگشت نیست</p>
              </div>
              <Button variant="danger" size="sm">
                حذف حساب
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
          >
            لغو
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            leftIcon={<Save className="h-5 w-5" />}
            className="flex-1"
          >
            {isLoading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </Button>
        </div>
      </form>

      {/* Change Password Modal */}
      <Modal
        isOpen={passwordModalOpen}
        onClose={resetPasswordForm}
        title="تغییر رمز عبور"
        size="md"
      >
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" required>
              رمز عبور فعلی
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                leftIcon={<Lock className="h-5 w-5" />}
                className="mt-1 pr-10"
                placeholder="رمز عبور فعلی را وارد کنید"
                required
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="newPassword" required>
              رمز عبور جدید
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                leftIcon={<Lock className="h-5 w-5" />}
                className="mt-1 pr-10"
                placeholder="رمز عبور جدید را وارد کنید"
                required
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {passwordData.newPassword && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">قدرت رمز عبور:</span>
                  <span className={`text-xs font-medium ${
                    passwordStrength.score === 0 ? 'text-red-600' :
                    passwordStrength.score === 1 ? 'text-yellow-600' :
                    passwordStrength.score === 2 ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      passwordStrength.score === 0 ? 'bg-red-500 w-1/4' :
                      passwordStrength.score === 1 ? 'bg-yellow-500 w-1/2' :
                      passwordStrength.score === 2 ? 'bg-blue-500 w-3/4' :
                      'bg-green-500 w-full'
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  رمز عبور قوی باید حداقل ۸ کاراکتر و شامل حروف بزرگ، اعداد و نمادها باشد
                </p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" required>
              تأیید رمز عبور جدید
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                leftIcon={<Lock className="h-5 w-5" />}
                className="mt-1 pr-10"
                placeholder="رمز عبور جدید را مجدداً وارد کنید"
                required
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {/* Password Match Indicator */}
            {passwordData.confirmPassword && (
              <div className="mt-2 flex items-center space-x-2 space-x-reverse">
                {passwordData.newPassword === passwordData.confirmPassword ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600">رمزهای عبور مطابقت دارند</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-red-600">رمزهای عبور مطابقت ندارند</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={resetPasswordForm}
              disabled={passwordLoading}
            >
              لغو
            </Button>
            <Button
              type="submit"
              loading={passwordLoading}
              className="flex-1"
              disabled={
                !passwordData.currentPassword ||
                !passwordData.newPassword ||
                !passwordData.confirmPassword ||
                passwordData.newPassword !== passwordData.confirmPassword
              }
            >
              {passwordLoading ? 'در حال تغییر...' : 'تغییر رمز عبور'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ProfileForm