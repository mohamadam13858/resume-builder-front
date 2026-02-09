'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import {
  ArrowRight,
  Plus,
  LayoutTemplate,
  Sparkles,
  FileText,
  Clock,
  Users,
  Download,
} from 'lucide-react'

const templates = [
  {
    id: 'modern',
    name: 'مدرن',
    description: 'طراحی مدرن، حرفه‌ای و مینیمال',
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    popular: true,
  },
  {
    id: 'classic',
    name: 'کلاسیک',
    description: 'ظاهر رسمی و سنتی',
    color: 'bg-gradient-to-br from-gray-700 to-gray-900',
    popular: false,
  },
  {
    id: 'minimal',
    name: 'مینیمال',
    description: 'ساده، تمیز و بسیار خوانا',
    color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    popular: true,
  },
  {
    id: 'creative',
    name: 'خلاق',
    description: 'رنگارنگ و متفاوت',
    color: 'bg-gradient-to-br from-purple-500 to-pink-600',
    popular: false,
  },
]

const quickActions = [
  {
    title: 'ایجاد رزومه جدید',
    description: 'از صفر شروع کنید',
    icon: <Plus className="h-6 w-6" />,
    color: 'bg-blue-100 text-blue-700',
    href: '/builder/new',
  },
  {
    title: 'انتخاب از قالب‌های آماده',
    description: 'قالب‌های حرفه‌ای را ببینید',
    icon: <LayoutTemplate className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-700',
    href: '/templates',
  },
  {
    title: 'ادامه رزومه‌های قبلی',
    description: 'رزومه‌های در حال ساخت خود را ببینید',
    icon: <Sparkles className="h-6 w-6" />,
    color: 'bg-amber-100 text-amber-700',
    href: '/dashboard',
  },
]

export default function BuilderHomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              رزومه حرفه‌ای خود را بسازید
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              با استفاده از قالب‌های جذاب و ابزارهای ساده، رزومه‌ای بسازید که کارفرمایان را تحت تأثیر قرار دهد.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-right">
            شروع سریع
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((item) => (
              <button
                key={item.title}
                onClick={() => router.push(item.href)}
                className="
                  group bg-white border border-gray-200 rounded-2xl p-6
                  hover:border-blue-500 hover:shadow-lg transition-all duration-200
                  text-right
                "
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  شروع کنید
                  <ArrowRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </section>


        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-right">
            انتخاب قالب
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`
                  border rounded-2xl overflow-hidden bg-white
                  hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group
                  ${template.popular ? 'ring-2 ring-blue-400 ring-opacity-40' : ''}
                `}
              >
                <div className={`h-48 ${template.color} relative flex items-center justify-center`}>
                  {template.popular && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      پرطرفدار
                    </div>
                  )}
                  <span className="text-white text-5xl font-bold opacity-40 group-hover:opacity-70 transition-opacity">
                    {template.name}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">{template.name}</h3>
                    {template.popular && <Sparkles className="h-5 w-5 text-yellow-500" />}
                  </div>
                  <p className="text-gray-600 text-sm mb-5">{template.description}</p>

                  <Button
                    fullWidth
                    variant={template.popular ? 'primary' : 'outline'}
                    onClick={() => router.push(`/builder/new?template=${template.id}`)}
                  >
                    استفاده از این قالب
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

    
        <section>
          <Card className="p-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  نکات ساخت رزومه حرفه‌ای
                </h3>
                <p className="text-gray-700">
                  با رعایت این موارد شانس موفقیت خود را بالا ببرید
                </p>
              </div>
              <Button variant="outline">
                <a href="/tips">مشاهده همه نکات ←</a>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '۱', title: 'مختصر و مفید', desc: '۱ تا ۲ صفحه کافی است' },
                { num: '۲', title: 'کلمات کلیدی', desc: 'از کلمات مرتبط با شغل استفاده کنید' },
                { num: '۳', title: 'قالب مناسب', desc: 'قالب را با حوزه کاری هماهنگ کنید' },
              ].map((item) => (
                <div key={item.num} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl mb-4">
                    {item.num}
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}