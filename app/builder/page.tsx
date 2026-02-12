'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'
import {
  ArrowRight,
  Plus,
  LayoutTemplate,
  Sparkles,
} from 'lucide-react'

const templates = [
  { id: 'modern', name: 'مدرن', description: 'طراحی امروزی و حرفه‌ای', popular: true },
  { id: 'classic', name: 'کلاسیک', description: 'ظاهر رسمی و سنتی', popular: false },
  { id: 'minimal', name: 'مینیمال', description: 'ساده و بسیار خوانا', popular: true },
  { id: 'creative', name: 'خلاق', description: 'رنگارنگ و متفاوت', popular: false },
]

const quickActions = [
  { title: 'رزومه جدید', desc: 'از ابتدا شروع کنید', icon: Plus, href: '/builder/new' },
  { title: 'قالب‌های آماده', desc: 'انتخاب از طرح‌های حرفه‌ای', icon: LayoutTemplate, href: '/templates' },
  { title: 'رزومه‌های قبلی', desc: 'ادامه کار روی پروژه‌های نیمه‌کاره', icon: Sparkles, href: '/dashboard' },
]

export default function BuilderHomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50/70">
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 md:py-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            رزومه‌ات را حرفه‌ای بساز
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            قالب‌های زیبا، ویرایش آسان، خروجی PDF تمیز — آماده برای ارسال به کارفرما
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center md:text-right">
            سریع شروع کنید
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.title}
                  onClick={() => router.push(action.href)}
                  className="
                    group bg-white border border-gray-200 rounded-xl p-6 text-right
                    hover:border-gray-300 hover:shadow-sm transition-all duration-200
                  "
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-200 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{action.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-800">
                    برو به بخش
                    <ArrowRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              )
            })}
          </div>
        </section>
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center md:text-right">
            قالب‌های آماده
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((t) => (
              <div
                key={t.id}
                className="
                  group bg-white border border-gray-200 rounded-xl overflow-hidden
                  hover:border-gray-300 hover:shadow-md transition-all duration-200
                "
              >
                <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  {t.popular && (
                    <div className="absolute top-3 right-3 bg-amber-500/90 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                      محبوب
                    </div>
                  )}
                  <span className="text-4xl sm:text-5xl font-bold text-gray-400/60 group-hover:text-gray-500/80 transition-colors">
                    {t.name}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-5">{t.description}</p>

                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="text-sm"
                    onClick={() => router.push(`/builder/new?template=${t.id}`)}
                  >
                    استفاده از این قالب
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  چند نکته مهم برای رزومه بهتر
                </h3>
                <p className="mt-2 text-gray-600">
                  این موارد شانس دیده شدن رزومه‌ات را بالا می‌برند
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800">
                همه نکات →
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: '۱', t: 'کوتاه نگه دار', d: '۱–۲ صفحه حداکثر' },
                { n: '۲', t: 'کلمات کلیدی', d: 'از متن آگهی شغلی کمک بگیر' },
                { n: '۳', t: 'طراحی متناسب', d: 'قالب را با شغل هماهنگ کن' },
              ].map((item) => (
                <div key={item.n} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                      {item.n}
                    </div>
                    <h4 className="font-medium text-gray-900">{item.t}</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}