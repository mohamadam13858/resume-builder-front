'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/card'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { 
  Bell, 
  Shield, 
  Download,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Globe,
  Lock,
  Trash2,
  Save,
  AlertTriangle
} from 'lucide-react'

const SettingsPanel = () => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    resumeViews: true,
    newFeatures: false,
    marketing: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    resumeVisibility: 'private',
    showEmail: false,
    showPhone: false
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30
  })

  const handleExportData = () => {
    alert('درخواست خروجی داده‌ها ثبت شد. به ایمیل شما ارسال خواهد شد.')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('آیا مطمئن هستید؟ این عمل قابل بازگشت نیست!')) {
      alert('حساب کاربری شما حذف خواهد شد.')
    }
  }

  // Helper function for toggle switches
  const ToggleSwitch = ({ 
    checked, 
    onChange 
  }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void 
  }) => {
    return (
      <div
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
          checked ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Bell className="h-6 w-6 text-gray-400 ml-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">اعلان‌ها</h3>
            <p className="text-sm text-gray-600">تنظیمات اعلان‌های ایمیلی و درون‌برنامه‌ای</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">
                  {key === 'emailUpdates' && 'به‌روزرسانی‌های ایمیلی'}
                  {key === 'resumeViews' && 'مشاهده رزومه'}
                  {key === 'newFeatures' && 'ویژگی‌های جدید'}
                  {key === 'marketing' && 'ایمیل‌های تبلیغاتی'}
                </div>
                <div className="text-sm text-gray-600">
                  {key === 'emailUpdates' && 'اخبار و به‌روزرسانی‌های مهم'}
                  {key === 'resumeViews' && 'هنگامی که رزومه شما مشاهده می‌شود'}
                  {key === 'newFeatures' && 'اطلاع از ویژگی‌های جدید پلتفرم'}
                  {key === 'marketing' && 'پیشنهادات و تخفیف‌ها'}
                </div>
              </div>
              
              <ToggleSwitch
                checked={value}
                onChange={(newValue) => 
                  setNotifications(prev => ({ ...prev, [key]: newValue }))
                }
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Shield className="h-6 w-6 text-gray-400 ml-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">حریم خصوصی</h3>
            <p className="text-sm text-gray-600">کنترل اطلاعات قابل مشاهده برای دیگران</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Visibility */}
          <div>
            <Label>نمایش پروفایل</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { value: 'public', label: 'عمومی', desc: 'همه می‌توانند ببینند' },
                { value: 'connections', label: 'ارتباطات', desc: 'فقط کاربران مرتبط' },
                { value: 'private', label: 'خصوصی', desc: 'فقط خود شما' }
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => setPrivacy(prev => ({ ...prev, profileVisibility: option.value }))}
                  className={`p-3 border rounded-lg text-center transition-colors cursor-pointer ${
                    privacy.profileVisibility === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info Visibility */}
          <div>
            <Label>اطلاعات تماس</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 ml-2" />
                  <span>نمایش ایمیل</span>
                </div>
                <ToggleSwitch
                  checked={privacy.showEmail}
                  onChange={(newValue) => 
                    setPrivacy(prev => ({ ...prev, showEmail: newValue }))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <Smartphone className="h-5 w-5 text-gray-400 ml-2" />
                  <span>نمایش تلفن</span>
                </div>
                <ToggleSwitch
                  checked={privacy.showPhone}
                  onChange={(newValue) => 
                    setPrivacy(prev => ({ ...prev, showPhone: newValue }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Lock className="h-6 w-6 text-gray-400 ml-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">امنیت</h3>
            <p className="text-sm text-gray-600">تنظیمات امنیتی حساب کاربری</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Two-Factor Auth */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">احراز هویت دو مرحله‌ای</div>
              <div className="text-sm text-gray-600">افزایش امنیت حساب کاربری</div>
            </div>
            <ToggleSwitch
              checked={security.twoFactorAuth}
              onChange={(newValue) => 
                setSecurity(prev => ({ ...prev, twoFactorAuth: newValue }))
              }
            />
          </div>

          {/* Login Alerts */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">هشدار ورود</div>
              <div className="text-sm text-gray-600">اعلان ورود از دستگاه جدید</div>
            </div>
            <ToggleSwitch
              checked={security.loginAlerts}
              onChange={(newValue) => 
                setSecurity(prev => ({ ...prev, loginAlerts: newValue }))
              }
            />
          </div>

          {/* Session Timeout */}
          <div>
            <Label>مدت زمان نشست (دقیقه)</Label>
            <div className="flex items-center space-x-4 space-x-reverse mt-2">
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={security.sessionTimeout}
                onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="font-medium w-12">{security.sessionTimeout}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              بعد از این مدت زمان عدم فعالیت، به طور خودکار از حساب خارج می‌شوید
            </p>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Download className="h-6 w-6 text-gray-400 ml-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">مدیریت داده‌ها</h3>
            <p className="text-sm text-gray-600">خروجی و مدیریت داده‌های حساب</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">خروجی داده‌ها</div>
              <div className="text-sm text-gray-600">دریافت تمام اطلاعات حساب به صورت JSON</div>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              درخواست خروجی
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">حذف موقت حساب</div>
              <div className="text-sm text-gray-600">غیرفعال کردن موقت حساب کاربری</div>
            </div>
            <Button variant="outline" className="text-yellow-600 border-yellow-300">
              غیرفعال کردن
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200 bg-red-50">
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-6 w-6 text-red-400 ml-3" />
          <div>
            <h3 className="text-lg font-semibold text-red-900">ناحیه خطر</h3>
            <p className="text-sm text-red-700">این اقدامات قابل بازگشت نیستند</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white">
            <div>
              <div className="font-medium text-red-900">حذف تمام رزومه‌ها</div>
              <div className="text-sm text-red-700">همه رزومه‌های شما حذف خواهند شد</div>
            </div>
            <Button variant="danger" size="sm">
              حذف رزومه‌ها
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white">
            <div>
              <div className="font-medium text-red-900">حذف دائم حساب کاربری</div>
              <div className="text-sm text-red-700">تمام اطلاعات شما برای همیشه حذف می‌شود</div>
            </div>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="h-4 w-4" />}
              onClick={handleDeleteAccount}
            >
              حذف حساب
            </Button>
          </div>
        </div>

        <div className="mt-6 p-3 bg-red-100 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            ⚠️ توجه: پس از حذف حساب، تمام اطلاعات شما شامل رزومه‌ها، تنظیمات و تاریخچه 
            به طور کامل حذف شده و قابل بازیابی نخواهند بود.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPanel