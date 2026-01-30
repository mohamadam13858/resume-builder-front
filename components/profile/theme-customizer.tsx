'use client'

import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import Card from '@/components/ui/card'
import Label from '@/components/ui/label'
import Button from '@/components/ui/button'
import { 
  Moon, 
  Sun, 
  Monitor,
  Type,
  Palette,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react'

const ThemeCustomizer = () => {
  const {
    mode,
    fontSize,
    colorScheme,
    customColors,
    setMode,
    setFontSize,
    setColorScheme,
    setCustomColor,
    reset
  } = useThemeStore()

  const themes = [
    { value: 'light', label: 'روشن', icon: <Sun className="h-5 w-5" /> },
    { value: 'dark', label: 'تیره', icon: <Moon className="h-5 w-5" /> },
    { value: 'system', label: 'سیستم', icon: <Monitor className="h-5 w-5" /> }
  ]

  const fontSizes = [
    { value: 'small', label: 'کوچک' },
    { value: 'medium', label: 'متوسط' },
    { value: 'large', label: 'بزرگ' }
  ]

  const colorSchemes = [
    { value: 'blue', label: 'آبی', color: '#3b82f6' },
    { value: 'purple', label: 'بنفش', color: '#8b5cf6' },
    { value: 'green', label: 'سبز', color: '#10b981' },
    { value: 'orange', label: 'نارنجی', color: '#f59e0b' },
    { value: 'custom', label: 'سفارشی', color: 'linear-gradient(45deg, #667eea, #764ba2)' }
  ]

  return (
    <div className="space-y-6">
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">حالت رنگ</h3>
            <p className="text-sm text-gray-600">انتخاب تم روشن، تیره یا سیستم</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => setMode(theme.value as any)}
              className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all ${
                mode === theme.value
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-3 ${
                mode === theme.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {theme.icon}
              </div>
              <span className="font-medium">{theme.label}</span>
            </button>
          ))}
        </div>
      </Card>

      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">اندازه فونت</h3>
            <p className="text-sm text-gray-600">تنظیم اندازه متن در رابط کاربری</p>
          </div>
          <Type className="h-6 w-6 text-gray-400" />
        </div>

        <div className="space-y-4">
          {fontSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setFontSize(size.value as any)}
              className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors ${
                fontSize === size.value
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`rounded-full ml-3 ${
                  size.value === 'small' ? 'h-2 w-2' :
                  size.value === 'medium' ? 'h-3 w-3' :
                  'h-4 w-4'
                } bg-primary`} />
                <span className="font-medium">{size.label}</span>
              </div>
              {fontSize === size.value && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </Card>

    
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">رنگ‌بندی</h3>
            <p className="text-sm text-gray-600">انتخاب پالت رنگ اصلی</p>
          </div>
          <Palette className="h-6 w-6 text-gray-400" />
        </div>

        <div className="grid grid-cols-5 gap-3 mb-8">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.value}
              onClick={() => setColorScheme(scheme.value as any)}
              className="flex flex-col items-center"
            >
              <div
                className={`h-10 w-10 rounded-full mb-2 border-2 ${
                  colorScheme === scheme.value ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-gray-300'
                }`}
                style={{
                  background: scheme.value === 'custom' 
                    ? scheme.color 
                    : scheme.color
                }}
              />
              <span className="text-xs font-medium">{scheme.label}</span>
            </button>
          ))}
        </div>

        {/* Custom Colors */}
        {colorScheme === 'custom' && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-gray-900">رنگ‌های سفارشی</h4>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(customColors).map(([key, value]) => (
                <div key={key}>
                  <Label className="capitalize">
                    {key === 'primary' && 'رنگ اصلی'}
                    {key === 'secondary' && 'رنگ ثانویه'}
                    {key === 'accent' && 'رنگ تأکید'}
                    {key === 'background' && 'پس‌زمینه'}
                    {key === 'text' && 'متن'}
                  </Label>
                  <div className="flex items-center space-x-3 space-x-reverse mt-1">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setCustomColor(key as any, e.target.value)}
                      className="h-8 w-8 cursor-pointer rounded"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setCustomColor(key as any, e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>


      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">پیش‌نمایش</h3>
            <p className="text-sm text-gray-600">نمایش نمونه از تنظیمات</p>
          </div>
          {mode === 'dark' ? (
            <EyeOff className="h-6 w-6 text-gray-400" />
          ) : (
            <Eye className="h-6 w-6 text-gray-400" />
          )}
        </div>

        <div className={`p-6 rounded-lg ${
          mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold" style={{ fontSize: fontSize === 'small' ? '0.9rem' : fontSize === 'medium' ? '1rem' : '1.1rem' }}>
                  نمونه عنوان
                </h4>
                <p className="text-gray-500" style={{ fontSize: fontSize === 'small' ? '0.8rem' : fontSize === 'medium' ? '0.9rem' : '1rem' }}>
                  این یک نمونه متن است
                </p>
              </div>
              <div className="px-3 py-1 rounded-full text-sm" style={{ 
                backgroundColor: colorScheme === 'custom' ? customColors.primary : colorSchemes.find(c => c.value === colorScheme)?.color,
                color: 'white'
              }}>
                نمونه
              </div>
            </div>

            <div className="flex space-x-4 space-x-reverse">
              <button className="px-4 py-2 rounded-lg font-medium" style={{ 
                backgroundColor: colorScheme === 'custom' ? customColors.primary : colorSchemes.find(c => c.value === colorScheme)?.color,
                color: 'white'
              }}>
                دکمه اصلی
              </button>
              <button className="px-4 py-2 rounded-lg font-medium border" style={{ 
                borderColor: colorScheme === 'custom' ? customColors.primary : colorSchemes.find(c => c.value === colorScheme)?.color,
                color: colorScheme === 'custom' ? customColors.primary : colorSchemes.find(c => c.value === colorScheme)?.color
              }}>
                دکمه دوم
              </button>
            </div>

            <div className="h-1 rounded-full" style={{ 
              backgroundColor: colorScheme === 'custom' ? customColors.primary : colorSchemes.find(c => c.value === colorScheme)?.color
            }} />
          </div>
        </div>
      </Card>

      
      <div className="flex justify-end">
        <Button
          variant="outline"
          leftIcon={<RefreshCw className="h-4 w-4" />}
          onClick={reset}
        >
          بازنشانی به پیش‌فرض
        </Button>
      </div>
    </div>
  )
}

export default ThemeCustomizer