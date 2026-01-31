import Link from 'next/link'
import { Home, FileText, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
              <div className="h-10 w-10 bg-primary/30 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">404</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            صفحه مورد نظر یافت نشد
          </h1>
          <p className="text-gray-600">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button fullWidth leftIcon={<Home className="h-5 w-5" />}>
              بازگشت به صفحه اصلی
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button variant="outline" fullWidth leftIcon={<FileText className="h-5 w-5" />}>
              رفتن به داشبورد
            </Button>
          </Link>

          <div className="pt-6 border-t">
            <p className="text-sm text-gray-500 mb-4">
              صفحات پرکاربرد
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/builder" className="block p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">سازنده رزومه</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
              
              <Link href="/profile" className="block p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">پروفایل</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}