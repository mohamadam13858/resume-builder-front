'use client'

import { useRouter } from 'next/navigation'
import AuthHeader from '@/components/auth/AuthHeader'
import Card from '@/components/ui/card'
import LoginForm from '@/components/auth/login/LoginForm'
import DividerWithText from '@/components/auth/login/divider-with-text.tsx'
import SocialLoginButtons from '@/components/auth/login/SocialLoginButtons'
import AuthFooter from '@/components/auth/AuthFooter'
export default function LoginPage() {
  const router = useRouter()

  const handleLoginSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader title='ورود حساب کاربری ' />

        <Card className="p-6 sm:p-8 shadow-xl">
          <LoginForm onSuccess={handleLoginSuccess} />

          {/* <DividerWithText text="یا ادامه دهید با" /> */}

          <SocialLoginButtons />

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              حساب کاربری ندارید؟{' '}
              <a
                href="/register"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                ثبت‌نام کنید
              </a>
            </p>
          </div>
        </Card>

        <AuthFooter />
      </div>
    </div>
  )
}