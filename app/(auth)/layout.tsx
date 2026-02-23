import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import '@/app/globals.css'

const vazirmatn = Vazirmatn({ 
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  title: 'احراز هویت | رزومه‌ساز',
  description: 'ورود یا ثبت‌نام در پلتفرم ساخت رزومه',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="fa" dir="rtl" className={vazirmatn.variable}>
      <div className="min-h-screen bg-liner-to-br from-gray-50 to-gray-100">
        <div className="min-h-screen flex flex-col">
        
          <header className="py-4 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                {/* <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-gray-900 hidden sm:block">
                    رزومه‌ساز
                  </span>
                </div> */}
                <div className="text-sm text-gray-600">
                  <a href="/" className="hover:text-primary transition-colors">
                    بازگشت به صفحه اصلی
                  </a>
                </div>
              </div>
            </div>
          </header>

        
          <main className="flex-1 flex items-center justify-center p-4">
            {children}
          </main>

          
          <footer className="py-4 px-6 border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-600 mb-2 md:mb-0">
                  © {new Date().getFullYear()} رزومه‌ساز. تمامی حقوق محفوظ است.
                </div>
                <div className="flex space-x-6 space-x-reverse">
                  <a 
                    href="/terms" 
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    شرایط استفاده
                  </a>
                  <a 
                    href="/privacy" 
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    حریم خصوصی
                  </a>
                  <a 
                    href="/contact" 
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    تماس با ما
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}