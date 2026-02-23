'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import Alert from '@/components/ui/alert'
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'

type LoginFormProps = {
  onSuccess: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    clearError()
    try {
      await login(data.email, data.password)
      document.cookie = 'auth_session=true; path=/; max-age=86400; SameSite=Lax'
      onSuccess()
    } catch (err) {
       console.log(err)
    }
  }

  return (
    <>
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={clearError}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

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
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="password" required>
              رمز عبور
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              فراموشی رمز عبور؟
            </Link>
          </div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            error={errors.password?.message}
            leftIcon={<Lock className="h-5 w-5 text-gray-500" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            }
            className="mt-1.5 px-10"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isLoading}
          leftIcon={<LogIn className="h-5 w-5" />}
          className="mt-2"
        >
          {isLoading ? 'در حال ورود...' : 'ورود به حساب'}
        </Button>
      </form>
    </>
  )
}