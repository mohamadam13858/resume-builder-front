import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/navbar'


const vazirmatn = Vazirmatn({ 
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  title: 'رزومه‌ساز حرفه‌ای | ساخت رزومه آنلاین',
  description: 'ساخت رزومه حرفه‌ای با قالب‌های متنوع و تنظیمات پیشرفته',
  keywords: ['رزومه', 'کار', 'شغل', 'cv', 'رزومه ساز', 'ساخت رزومه'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        
    
        <footer className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="h-6 w-6 bg-primary rounded-lg flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    رزومه‌ساز
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  ساخت رزومه حرفه‌ای در چند دقیقه
                </p>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>© {new Date().getFullYear()} رزومه‌ساز. تمامی حقوق محفوظ است.</p>
                <p className="mt-1">ساخته شده با ❤️ برای جویندگان کار ایرانی</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}