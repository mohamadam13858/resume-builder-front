'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useResumeStore } from '@/store/resumeStore'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { ArrowRight, Clock, Download, FileText, LayoutTemplate, Sparkles, Users } from 'lucide-react'


const templates = [
  {
    id: 'modern',
    name: 'مدرن',
    description: 'طراحی مدرن و مینیمال',
    color: 'bg-blue-500',
    popular: true
  },
  {
    id: 'classic',
    name: 'کلاسیک',
    description: 'طراحی کلاسیک و رسمی',
    color: 'bg-gray-600',
    popular: false
  },
  {
    id: 'minimal',
    name: 'مینیمال',
    description: 'طراحی ساده و تمیز',
    color: 'bg-green-500',
    popular: true
  },
  {
    id: 'creative',
    name: 'خلاق',
    description: 'طراحی خلاقانه و رنگارنگ',
    color: 'bg-purple-500',
    popular: false
  }
]

const quickStarts = [
  {
    title: 'از صفر شروع کن',
    description: 'یک رزومه خالی ایجاد کن',
    icon: <FileText className="h-6 w-6" />,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'از نمونه استفاده کن',
    description: 'از میان نمونه‌های آماده انتخاب کن',
    icon: <LayoutTemplate className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'رزومه موجود را ویرایش کن',
    description: 'یکی از رزومه‌های قبلی را ویرایش کن',
    icon: <Sparkles className="h-6 w-6" />,
    color: 'bg-green-100 text-green-600'
  }
]

export default function BuilderHomePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { resumes, createResume } = useResumeStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleCreateResume = (template?: string) => {
    const newResumeId = createResume(template ? `رزومه ${template}` : 'رزومه جدید')
    router.push(`/builder/${newResumeId}`)
  }

  const handleContinueResume = (resumeId: string) => {
    router.push(`/builder/${resumeId}`)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              رزومه خود را بسازید
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              با استفاده از قالب‌های حرفه‌ای و ابزارهای قدرتمند ما، رزومه‌ای چشمگیر 
              بسازید که نظر کارفرمایان را جلب کند.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            شروع سریع
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStarts.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index === 0) handleCreateResume()
                  else if (index === 1) router.push('/templates')
                  else router.push('/dashboard')
                }}
                className="text-left p-6 border border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all"
              >
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <div className="flex items-center text-primary">
                  <span>شروع کنید</span>
                  <ArrowRight className="h-4 w-4 mr-2" />
                </div>
              </button>
            ))}
          </div>
        </div>

        
        {resumes.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                رزومه‌های اخیر
              </h2>
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                مشاهده همه
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.slice(0, 3).map((resume) => (
                <Card key={resume.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        resume.theme.template === 'modern' ? 'bg-blue-100 text-blue-600' :
                        resume.theme.template === 'classic' ? 'bg-gray-100 text-gray-600' :
                        resume.theme.template === 'minimal' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {resume.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {resume.personal.name || 'بدون نام'}
                        </p>
                      </div>
                    </div>
                    
                    {resume.isPublic ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        عمومی
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        خصوصی
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 ml-2" />
                      <span>
                        آخرین ویرایش: {new Date(resume.updatedAt).toLocaleDateString('fa-IR')}
                      </span>
                    </div>
                    
                    {resume.viewCount > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 ml-2" />
                        <span>{resume.viewCount} بازدید</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleContinueResume(resume.id)}
                    >
                      ادامه ویرایش
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        // Handle duplicate
                      }}
                    >
                      <Download className="h-4 w-4 ml-2" />
                      خروجی
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            انتخاب قالب
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-xl overflow-hidden hover:shadow-lg transition-all ${
                  template.popular ? 'ring-2 ring-primary ring-opacity-50' : ''
                }`}
              >
                
                <div className={`h-40 ${template.color} relative`}>
                  {template.popular && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                      پرطرفدار
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex space-x-1 space-x-reverse">
                      <div className="h-2 w-2 rounded-full bg-white/60"></div>
                      <div className="h-2 w-2 rounded-full bg-white/60"></div>
                      <div className="h-2 w-2 rounded-full bg-white/60"></div>
                    </div>
                  </div>
                </div>

            
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    {template.popular && (
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>

                  <Button
                    fullWidth
                    variant={template.popular ? 'primary' : 'outline'}
                    onClick={() => handleCreateResume(template.name)}
                  >
                    انتخاب قالب
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="mt-12">
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  نکات برای رزومه بهتر
                </h3>
                <p className="text-gray-600">
                  از این نکات برای ساخت رزومه‌ای تاثیرگذار استفاده کنید
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button
                  variant="outline"
                  onClick={() => router.push('/tips')}
                >
                  مشاهده همه نکات
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="p-4 bg-white rounded-lg">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold">۱</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">مختصر و مفید</h4>
                <p className="text-sm text-gray-600">
                  رزومه خود را در ۱-۲ صفحه خلاصه کنید
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-green-600 font-bold">۲</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">کلمات کلیدی</h4>
                <p className="text-sm text-gray-600">
                  از کلمات کلیدی مرتبط با شغل استفاده کنید
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg">
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-purple-600 font-bold">۳</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">قالب مناسب</h4>
                <p className="text-sm text-gray-600">
                  قالب را متناسب با صنعت انتخاب کنید
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}