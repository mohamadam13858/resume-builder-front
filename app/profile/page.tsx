'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Tabs from '@/components/ui/tabs'
import Card from '@/components/ui/card'
import ProfileForm from '@/components/profile/profile-form'

import { 
  User, 
  FileText, 
  Palette, 
  Settings,
  Download,
  Shield,
  Bell,
  CreditCard,
  LogOut
} from 'lucide-react'
import ThemeCustomizer from '@/components/profile/theme-customizer'
import SettingsPanel from '@/components/profile/settings-panel.'
import ResumeList from '@/components/profile/resume-list'

const ProfilePage = () => {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')

  
  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  const tabs = [
    { id: 'profile', label: 'پروفایل', icon: <User className="h-5 w-5" /> },
    { id: 'resumes', label: 'رزومه‌ها', icon: <FileText className="h-5 w-5" /> },
    { id: 'appearance', label: 'ظاهر', icon: <Palette className="h-5 w-5" /> },
    { id: 'settings', label: 'تنظیمات', icon: <Settings className="h-5 w-5" /> }
  ]

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                تنظیمات حساب کاربری
              </h1>
              <p className="text-gray-600 mt-1">
                مدیریت پروفایل و تنظیمات شخصی
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3 space-x-reverse">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 ml-2" />
                خروج
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1">
            <Card className="p-4">
            
              <div className="flex items-center space-x-3 space-x-reverse mb-6 pb-6 border-b">
                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {user?.name?.substring(0, 2) || 'U'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

            
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="ml-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>

              
              <div className="mt-8 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  آمار سریع
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">تعداد رزومه‌ها</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">دانلود‌ها</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">عضویت از</span>
                    <span className="font-medium">1402/10/15</span>
                  </div>
                </div>
              </div>
            </Card>

        
            <Card className="mt-4 p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                اقدامات سریع
              </h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="flex items-center">
                    <Download className="h-4 w-4 ml-2" />
                    خروجی داده‌ها
                  </span>
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="flex items-center">
                    <Shield className="h-4 w-4 ml-2" />
                    حریم خصوصی
                  </span>
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="flex items-center">
                    <Bell className="h-4 w-4 ml-2" />
                    نوتیفیکیشن
                  </span>
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="flex items-center">
                    <CreditCard className="h-4 w-4 ml-2" />
                    اشتراک
                  </span>
                </button>
              </div>
            </Card>
          </div>

          
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card className="p-6">
                <ProfileForm />
              </Card>
            )}

            {activeTab === 'resumes' && (
              <div className="space-y-6">
                <ResumeList />
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <ThemeCustomizer />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <SettingsPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage