'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import {
  FileText,
  Palette,
  Download,
  Users,
  Shield,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { TokenService } from '@/service/tokenService'

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'قالب‌های متنوع',
    description: 'ده‌ها قالب حرفه‌ای برای هر صنعت و موقعیت شغلی'
  },
  {
    icon: <Palette className="h-8 w-8 text-secondary" />,
    title: 'شخصی‌سازی کامل',
    description: 'تغییر رنگ، فونت و طرح به سلیقه شما'
  },
  {
    icon: <Download className="h-8 w-8 text-accent" />,
    title: 'خروجی چندگانه',
    description: 'دانلود به فرمت‌های PDF، Word و HTML'
  },
  {
    icon: <Users className="h-8 w-8 text-success" />,
    title: 'مدیریت چند رزومه',
    description: 'ساخت و ذخیره چندین رزومه برای موقعیت‌های مختلف'
  },
  {
    icon: <Shield className="h-8 w-8 text-warning" />,
    title: 'امنیت داده‌ها',
    description: 'اطلاعات شما به صورت امن ذخیره می‌شود'
  },
  {
    icon: <Sparkles className="h-8 w-8 text-danger" />,
    title: 'پیشنهادات هوشمند',
    description: 'پیشنهاد محتوا بر اساس موقعیت شغلی'
  }
]

const testimonials = [
  {
    name: 'مریم محمدی',
    role: 'توسعه‌دهنده فرانت‌اند',
    content: 'با این ابزار تونستم در ۱۵ دقیقه رزومه‌ام رو بسازم و استخدام شم!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maryam'
  },
  {
    name: 'علی رضایی',
    role: 'مدیر مارکتینگ',
    content: 'بهترین ابزار ساخت رزومه که دیدم. قالب‌ها خیلی حرفه‌ای هستن.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ali'
  },
  {
    name: 'سارا کریمی',
    role: 'طراح UI/UX',
    content: 'امکان شخصی‌سازی عالیه. دقیقاً همون چیزی که می‌خواستم رو ساختم.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara'
  }
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const token = TokenService.getAccessToken();

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              رزومه‌ای که <span className="text-primary">شغل</span> می‌آورد
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              با ابزار ساخت رزومه حرفه‌ای ما، در چند دقیقه رزومه‌ای چشمگیر بسازید
              و شانس استخدام خود را افزایش دهید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {token ? (
                <>
                  <Link href="/dashboard">
                    <Button size="lg" leftIcon={<FileText className="h-5 w-5" />}>
                      رفتن به داشبورد
                    </Button>
                  </Link>
                  <Link href="/builder">
                    <Button variant="outline" size="lg">
                      ساخت رزومه جدید
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg">
                      شروع رایگان
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg">
                      ورود به حساب
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              چرا رزومه‌ساز ما؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              همه‌چیز که برای ساخت رزومه حرفه‌ای نیاز دارید در یک پلتفرم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              در ۳ قدم ساده رزومه بسازید
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '۱', title: 'ثبت‌نام کنید', desc: 'حساب کاربری رایگان بسازید' },
              { step: '۲', title: 'اطلاعات را وارد کنید', desc: 'فرم‌های ساده را پر کنید' },
              { step: '۳', title: 'دانلود کنید', desc: 'رزومه را به فرمت مورد نظر دانلود کنید' }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.desc}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 left-0 transform -translate-x-1/2 w-16 border-t-2 border-dashed border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              نظر کاربران ما
            </h2>
          </div>

          <div className="relative">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="h-12 w-12 rounded-full ml-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-lg">
                "{testimonials[currentTestimonial].content}"
              </p>
            </div>

            <div className="flex justify-center mt-6 space-x-4 space-x-reverse">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowRight className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            همین امروز رزومه حرفه‌ای خود را بسازید
          </h2>
          <p className="text-xl text-white/90 mb-8">
            رایگان شروع کنید. هیچ کارت اعتباری نیاز نیست.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {token ? (
              <Link href="/builder">
                <Button variant='outline' size="lg" className="border-white text-white hover:bg-white/10">
                  ساخت رزومه جدید
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button variant='outline' size="lg" className="border-white text-white hover:bg-white/10">
                  شروع رایگان
                </Button>
              </Link>
            )}
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                مشاهده نمونه‌ها
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}