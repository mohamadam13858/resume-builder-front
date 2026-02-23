'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import Alert from '@/components/ui/alert'
import { User, Mail, Lock, Eye, EyeOff, UserPlus, CheckCircle } from 'lucide-react'

type RegisterFormProps = {
  onSuccess: () => void
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register: registerUser, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordScore, setPasswordScore] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  })

  const password = watch('password') ?? ''

  const calculatePasswordStrength = (pwd: string): number => {
    if (!pwd) return 0
    let score = 0
    if (pwd.length >= 8) score += 1 
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1
    if (pwd.length >= 12) score += 1 
    return Math.min(score, 5)
  }

  const getStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-red-500'
    if (score === 2) return 'bg-orange-500'
    if (score === 3) return 'bg-yellow-500'
    if (score === 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return 'ضعیف'
    if (score <= 1) return 'خیلی ضعیف'
    if (score === 2) return 'متوسط'
    if (score === 3) return 'خوب'
    if (score === 4) return 'قوی'
    return 'عالی'
  }

  const onSubmit = async (data: RegisterFormData) => {
    clearError()
    try {
      await registerUser(data.email, data.password, data.fullName)
      onSuccess()
    } catch {}
  }

  return (
    <>
      {error && <Alert variant="error" message={error} onClose={clearError} className="mb-6" />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="fullName" required>
            نام و نام خانوادگی
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="علی احمدی"
            error={errors.fullName?.message}
            leftIcon={<User className="h-5 w-5 text-gray-500" />}
            className="mt-1.5 pl-10"
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email" required>
            ایمیل
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            error={errors.email?.message}
            leftIcon={<Mail className="h-5 w-5 text-gray-500" />}
            className="mt-1.5 pl-10"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>


        <div>
          <Label htmlFor="password" required>
            رمز عبور
          </Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="حداقل ۸ کاراکتر"
            error={errors.password?.message}
            leftIcon={<Lock className="h-5 w-5 text-gray-500" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
            className="mt-1.5 px-10"
            {...register('password', {
              onChange: (e) => setPasswordScore(calculatePasswordStrength(e.target.value)),
            })}
          />

          {password && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-600 dark:text-gray-400">قدرت رمز عبور:</span>
                <span
                  className={`font-medium ${
                    passwordScore <= 1
                      ? 'text-red-600'
                      : passwordScore === 2
                        ? 'text-orange-600'
                        : passwordScore === 3
                          ? 'text-yellow-600'
                          : passwordScore === 4
                            ? 'text-blue-600'
                            : 'text-green-600'
                  }`}
                >
                  {getStrengthText(passwordScore)}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStrengthColor(passwordScore)} transition-all duration-300`}
                  style={{ width: `${(passwordScore / 5) * 100}%` }}
                />
              </div>

              <div className="mt-3 space-y-1.5 text-xs">
                {[
                  { check: password.length >= 8, text: 'حداقل ۸ کاراکتر' },
                  { check: /[A-Z]/.test(password), text: 'حداقل یک حرف بزرگ' },
                  { check: /[0-9]/.test(password), text: 'حداقل یک عدد' },
                  { check: /[^A-Za-z0-9]/.test(password), text: 'حداقل یک کاراکتر ویژه' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {item.check ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border border-gray-400" />
                    )}
                    <span className={item.check ? 'text-green-700 dark:text-green-300' : 'text-gray-500'}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>


        <div>
          <Label htmlFor="confirmPassword" required>
            تکرار رمز عبور
          </Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            leftIcon={<Lock className="h-5 w-5 text-gray-500" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            }
            className="mt-1.5 px-10"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isLoading}
          leftIcon={<UserPlus className="h-5 w-5" />}
          className="mt-2"
        >
          {isLoading ? 'در حال ثبت‌نام...' : 'ایجاد حساب کاربری'}
        </Button>
      </form>
    </>
  )
}