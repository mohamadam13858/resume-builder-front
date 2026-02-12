'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Card from '@/components/ui/card'
import ProfileForm from '@/components/profile/profile-form'
import ThemeCustomizer from '@/components/profile/theme-customizer'
import ResumeList from '@/components/profile/resume-list'

import {
  User,
  FileText,
  Palette,
  Settings,
  Download,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  ChevronLeft,
} from 'lucide-react'
import SettingsPanel from '@/components/profile/settings-panel.'

const tabs = [
  { id: 'profile', label: 'پروفایل', icon: User },
  { id: 'resumes', label: 'رزومه‌ها', icon: FileText },
  { id: 'appearance', label: 'ظاهر', icon: Palette },
  { id: 'settings', label: 'تنظیمات', icon: Settings },
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')

  const handleLogout = () => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
      logout()
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl shadow-lg border-2 border-white/30">
                  {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{user?.name || 'کاربر'}</h1>
                <p className="text-indigo-100 mt-1 opacity-90">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white font-medium transition-all duration-200 border border-white/20 hover:border-white/40"
            >
              <LogOut className="h-4 w-4" />
              خروج
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-8 space-y-6">

    
              <Card className="p-6 shadow-sm border border-gray-200/70 bg-white/80 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-5 text-gray-800">آمار سریع</h3>
                <div className="space-y-4 text-sm">
                  {[
                    { label: 'تعداد رزومه‌ها', value: '12' },
                    { label: 'دانلود‌ها', value: '24' },
                    { label: 'عضویت از', value: '۱۴۰۲/۱۰/۱۵' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

      
              <Card className="p-3 shadow-sm border border-gray-200/70 bg-white/80 backdrop-blur-sm">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                          ${isActive 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                          }
                        `}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />
                        {tab.label}
                        {isActive && <ChevronLeft className="h-4 w-4 mr-auto" />}
                      </button>
                    )
                  })}
                </nav>
              </Card>

              <Card className="p-4 shadow-sm border border-gray-200/70 bg-white/80 backdrop-blur-sm hidden lg:block">
                <h4 className="text-sm font-medium text-gray-800 mb-4">اقدامات سریع</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { icon: Download, label: 'خروجی داده' },
                    { icon: Shield, label: 'حریم خصوصی' },
                    { icon: Bell, label: 'اعلان‌ها' },
                    { icon: CreditCard, label: 'اشتراک' },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      <action.icon className="h-5 w-5 text-gray-500" />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-6">
            <Card className="p-6 md:p-8 shadow-md border border-gray-200/60 bg-white">
              {activeTab === 'profile' && <ProfileForm />}
              {activeTab === 'resumes' && <ResumeList />}
              {activeTab === 'appearance' && <ThemeCustomizer />}
              {activeTab === 'settings' && <SettingsPanel />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}