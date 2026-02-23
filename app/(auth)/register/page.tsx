'use client'

import { useRouter } from 'next/navigation'

import Card from '@/components/ui/card'
import AuthHeader from '@/components/auth/AuthHeader'
import RegisterForm from '@/components/auth/register/RegisterForm'
import { CheckCircle } from 'lucide-react'
import AuthFooter from '@/components/auth/AuthFooter'

export default function RegisterPage() {
  const router = useRouter()

  const handleRegisterSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-liner-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader title=' ساخت حساب کاربری '  /> 

        <Card className="p-6 sm:p-8 shadow-xl ">
          <RegisterForm onSuccess={handleRegisterSuccess} />

          <div className="mt-8 pt-6 border-t border-gray-200  text-center">
            <p className="text-sm text-gray-600 ">
              قبلا حساب کاربری دارید؟{' '}
              <a
                href="/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                وارد شوید
              </a>
            </p>
          </div>
        </Card>

        <div className="bg-blue-50  border border-blue-200  rounded-xl p-5 text-sm">
          <h3 className="font-semibold text-blue-900  mb-3">
            مزایای ثبت‌نام در رزومه‌ساز:
          </h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
              ساخت رزومه‌های نامحدود
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
              ذخیره و مدیریت رزومه‌ها
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
              دانلود به فرمت‌های مختلف
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
              پشتیبانی از قالب‌های متنوع
            </li>
          </ul>
        </div>

        <AuthFooter />
      </div>
    </div>
  )
}