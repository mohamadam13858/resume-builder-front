'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import Alert from '@/components/ui/alert'
import Card from '@/components/ui/card'
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  CheckSquare,
  Square,
  UserPlus,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { register: registerUser, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordScore, setPasswordScore] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    }
  })

  const password = watch('password', '')
  

  const calculatePasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 6) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return score
  }

  const onSubmit = async (data: RegisterFormData) => {
    clearError()
    try {
      await registerUser(data.email, data.password, data.name)
      router.push('/dashboard')
    } catch (error) {
      // Error is handled in the store
    }
  }

  const getPasswordStrengthColor = (score: number) => {
    if (score === 0) return 'bg-gray-200'
    if (score === 1) return 'bg-red-500'
    if (score === 2) return 'bg-yellow-500'
    if (score === 3) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = (score: number) => {
    if (score === 0) return 'ضعیف'
    if (score === 1) return 'خیلی ضعیف'
    if (score === 2) return 'متوسط'
    if (score === 3) return 'قوی'
    return 'خیلی قوی'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 bg-primary rounded-xl mb-4">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ایجاد حساب کاربری</h1>
          <p className="text-gray-600 mt-2">همین حالا رایگان ثبت‌نام کنید</p>
        </div>

    
        {error && (
          <Alert
            variant="error"
            message={error}
            onClose={clearError}
            className="mb-6"
          />
        )}

        
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    
            <div>
              <Label htmlFor="name" required>
                نام و نام خانوادگی
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="علی احمدی"
                  error={errors.name?.message}
                  leftIcon={<User className="h-5 w-5" />}
                  className="pl-10"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            
            <div>
              <Label htmlFor="email" required>
                ایمیل
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  error={errors.email?.message}
                  leftIcon={<Mail className="h-5 w-5" />}
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

    
            <div>
              <Label htmlFor="password" required>
                رمز عبور
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  leftIcon={<Lock className="h-5 w-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  }
                  className="px-10"
                  {...register('password', {
                    onChange: (e) => {
                      setPasswordScore(calculatePasswordStrength(e.target.value))
                    }
                  })}
                />
              </div>
              
        
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">
                      قدرت رمز عبور:
                    </span>
                    <span className={`text-xs font-medium ${
                      passwordScore <= 1 ? 'text-red-600' :
                      passwordScore === 2 ? 'text-yellow-600' :
                      passwordScore === 3 ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {getPasswordStrengthText(passwordScore)}
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor(passwordScore)} transition-all duration-300`}
                      style={{ width: `${(passwordScore / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
            
              <div className="mt-3 space-y-1">
                <div className="flex items-center">
                  {password.length >= 6 ? (
                    <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-300 ml-1" />
                  )}
                  <span className={`text-xs ${password.length >= 6 ? 'text-green-600' : 'text-gray-500'}`}>
                    حداقل ۶ کاراکتر
                  </span>
                </div>
                <div className="flex items-center">
                  {/[A-Z]/.test(password) ? (
                    <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-300 ml-1" />
                  )}
                  <span className={`text-xs ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    حداقل یک حرف بزرگ
                  </span>
                </div>
                <div className="flex items-center">
                  {/[0-9]/.test(password) ? (
                    <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-300 ml-1" />
                  )}
                  <span className={`text-xs ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                    حداقل یک عدد
                  </span>
                </div>
              </div>
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

    
            <div>
              <Label htmlFor="confirmPassword" required>
                تکرار رمز عبور
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  error={errors.confirmPassword?.message}
                  leftIcon={<Lock className="h-5 w-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  }
                  className="px-10"
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

        
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                type="checkbox"
                className="hidden"
                {...register('agreeToTerms')}
              />
              <label
                htmlFor="agreeToTerms"
                className="flex items-start cursor-pointer"
              >
                <div className="h-5 w-5 border border-gray-300 rounded flex items-center justify-center ml-2 mt-0.5">
                  {watch('agreeToTerms') ? (
                    <CheckSquare className="h-4 w-4 text-primary" />
                  ) : (
                    <Square className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <span className="text-sm text-gray-700">
                    با{' '}
                    <Link 
                      href="/terms" 
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      شرایط استفاده
                    </Link>{' '}
                    و{' '}
                    <Link 
                      href="/privacy" 
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      حریم خصوصی
                    </Link>{' '}
                    موافقت می‌کنم
                  </span>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.agreeToTerms.message}
                    </p>
                  )}
                </div>
              </label>
            </div>

        
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isLoading}
              leftIcon={<UserPlus className="h-5 w-5" />}
            >
              {isLoading ? 'در حال ثبت‌نام...' : 'ایجاد حساب کاربری'}
            </Button>

            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  یا از طریق
                </span>
              </div>
            </div>

            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">گوگل</span>
              </button>
              
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="h-5 w-5 ml-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">فیس‌بوک</span>
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                قبلا حساب کاربری دارید؟{' '}
                <Link 
                  href="/login" 
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  وارد شوید
                </Link>
              </p>
            </div>
          </form>
        </Card>

        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            مزایای ثبت‌نام در رزومه‌ساز:
          </h3>
          <ul className="space-y-1 text-sm text-blue-700">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 ml-1 text-green-500" />
              ساخت رزومه‌های نامحدود
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 ml-1 text-green-500" />
              ذخیره و مدیریت رزومه‌ها
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 ml-1 text-green-500" />
              دانلود به فرمت‌های مختلف
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 ml-1 text-green-500" />
              پشتیبانی از قالب‌های متنوع
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}