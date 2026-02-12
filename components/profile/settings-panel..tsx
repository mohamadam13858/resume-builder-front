'use client'

import React, { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { 
  Bell, Shield, Download, Eye, EyeOff, Mail, Smartphone, Globe, Lock, Trash2, AlertTriangle, Save 
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
    showEmail: false,
    showPhone: false
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: 30
  })

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
        checked ? 'bg-indigo-600' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </div>
  )

  return (
    <div className="space-y-8">
      <Card className="p-7 shadow-sm border border-gray-200/70">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <Bell className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">اعلان‌ها</h3>
            <p className="text-gray-600">مدیریت نحوه دریافت اطلاع‌رسانی‌ها</p>
          </div>
        </div>
        <div className="space-y-5">
          {Object.entries(notifications).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <div className="font-medium">
                  {key === 'emailUpdates' ? 'به‌روزرسانی‌ها' :
                   key === 'resumeViews' ? 'مشاهده رزومه' :
                   key === 'newFeatures' ? 'ویژگی‌های جدید' : 'تبلیغات'}
                </div>
                <div className="text-sm text-gray-600 mt-0.5">
                  {key === 'emailUpdates' && 'مهم‌ترین اخبار و تغییرات'}
                  {key === 'resumeViews' && 'هر زمان کسی رزومه شما را دید'}
                  {key === 'newFeatures' && 'اطلاع از امکانات تازه'}
                  {key === 'marketing' && 'پیشنهادات ویژه و تخفیف'}
                </div>
              </div>
              <Toggle 
                checked={val} 
                onChange={() => setNotifications(p => ({ ...p, [key]: !val }))} 
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-7 shadow-sm border border-gray-200/70">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-green-100 rounded-xl">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">حریم خصوصی</h3>
            <p className="text-gray-600">کنترل میزان نمایش اطلاعات</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block font-medium mb-3">سطح نمایش پروفایل</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { v: 'public', t: 'عمومی', d: 'همه می‌بینند' },
                { v: 'connections', t: 'ارتباطات', d: 'فقط افراد مرتبط' },
                { v: 'private', t: 'خصوصی', d: 'فقط خودتان' }
              ].map(opt => (
                <button
                  key={opt.v}
                  onClick={() => setPrivacy(p => ({ ...p, profileVisibility: opt.v }))}
                  className={`p-5 border rounded-xl text-center transition-all ${
                    privacy.profileVisibility === opt.v 
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">{opt.t}</div>
                  <div className="text-sm text-gray-500 mt-1">{opt.d}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-center justify-between p-5 border rounded-xl">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>نمایش ایمیل</span>
              </div>
              <Toggle 
                checked={privacy.showEmail} 
                onChange={() => setPrivacy(p => ({ ...p, showEmail: !p.showEmail }))} 
              />
            </div>
            <div className="flex items-center justify-between p-5 border rounded-xl">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-gray-500" />
                <span>نمایش شماره تلفن</span>
              </div>
              <Toggle 
                checked={privacy.showPhone} 
                onChange={() => setPrivacy(p => ({ ...p, showPhone: !p.showPhone }))} 
              />
            </div>
          </div>
        </div>
      </Card>

    
      <Card className="p-7 shadow-sm border border-gray-200/70">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-amber-100 rounded-xl">
            <Lock className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">امنیت</h3>
            <p className="text-gray-600">تنظیمات حفاظتی حساب</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-5 border rounded-xl">
            <div>
              <div className="font-medium">احراز هویت دو مرحله‌ای</div>
              <div className="text-sm text-gray-600 mt-1">امنیت بسیار بالاتر</div>
            </div>
            <Toggle 
              checked={security.twoFactor} 
              onChange={() => setSecurity(p => ({ ...p, twoFactor: !p.twoFactor }))} 
            />
          </div>

          <div className="flex items-center justify-between p-5 border rounded-xl">
            <div>
              <div className="font-medium">هشدار ورود از دستگاه جدید</div>
              <div className="text-sm text-gray-600 mt-1">ارسال اعلان در صورت ورود مشکوک</div>
            </div>
            <Toggle 
              checked={security.loginAlerts} 
              onChange={() => setSecurity(p => ({ ...p, loginAlerts: !p.loginAlerts }))} 
            />
          </div>

          <div>
            <label className="block font-medium mb-3">خروج خودکار پس از عدم فعالیت (دقیقه)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={security.sessionTimeout}
                onChange={e => setSecurity(p => ({ ...p, sessionTimeout: Number(e.target.value) }))}
                className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="font-bold w-12 text-center">{security.sessionTimeout}</span>
            </div>
          </div>
        </div>
      </Card>

    
      <Card className="p-7 border-red-200 bg-red-50/50 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-100 rounded-xl">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900">ناحیه خطر</h3>
            <p className="text-red-700">اقدامات غیرقابل بازگشت</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between p-5 bg-white border border-red-200 rounded-xl">
            <div>
              <div className="font-medium text-red-900">حذف حساب کاربری</div>
              <div className="text-sm text-red-700 mt-1">تمام اطلاعات برای همیشه پاک می‌شود</div>
            </div>
            <Button variant="danger" size="sm" onClick={() => confirm('مطمئن هستید؟') && alert('حذف انجام شد')}>
              حذف حساب
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPanel