'use client'

import React, { useState } from 'react'
import { Resume, ResumeTheme } from '@/types'
import { useResumeStore } from '@/store/resumeStore'
import Modal from '@/components/ui/modal'
import Button from '@/components/ui/button'
import Label from '@/components/ui/label'
import { 
  Palette,
  Type,
  Layout,
  Eye,
  EyeOff,
  Image as ImageIcon,
  QrCode,
  Save,
  RefreshCw
} from 'lucide-react'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  resume: Resume
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  resume
}) => {
  const { updateTheme } = useResumeStore()
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout' | 'components'>('colors')
  const [themeSettings, setThemeSettings] = useState<ResumeTheme>(resume.theme)

  const templates = [
    { id: 'modern', name: 'مدرن', description: 'طراحی مدرن و مینیمال' },
    { id: 'classic', name: 'کلاسیک', description: 'طراحی کلاسیک و رسمی' },
    { id: 'minimal', name: 'مینیمال', description: 'طراحی ساده و تمیز' },
    { id: 'creative', name: 'خلاق', description: 'طراحی خلاقانه و رنگارنگ' }
  ]

  const fonts = [
    { id: 'Vazir, system-ui', name: 'وزیر', preview: 'نص نمونه برای فونت وزیر' },
    { id: 'IranSans, system-ui', name: 'ایران سنس', preview: 'نص نمونه برای فونت ایران سنس' },
    { id: 'Arial, sans-serif', name: 'Arial', preview: 'Sample text for Arial font' },
    { id: 'Times New Roman, serif', name: 'Times New Roman', preview: 'Sample text for Times font' }
  ]

  const colorPresets = [
    {
      name: 'آبی کلاسیک',
      colors: {
        primary: '#3b82f6',
        secondary: '#1d4ed8',
        accent: '#10b981',
        background: '#ffffff',
        text: '#1f2937',
        header: '#111827',
        border: '#e5e7eb'
      }
    },
    {
      name: 'بنفش مدرن',
      colors: {
        primary: '#8b5cf6',
        secondary: '#7c3aed',
        accent: '#ec4899',
        background: '#fafafa',
        text: '#1f2937',
        header: '#1e1b4b',
        border: '#e5e7eb'
      }
    },
    {
      name: 'سبز حرفه‌ای',
      colors: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#3b82f6',
        background: '#ffffff',
        text: '#1f2937',
        header: '#064e3b',
        border: '#d1fae5'
      }
    },
    {
      name: 'تیره',
      colors: {
        primary: '#8b5cf6',
        secondary: '#7c3aed',
        accent: '#10b981',
        background: '#111827',
        text: '#f9fafb',
        header: '#ffffff',
        border: '#374151'
      }
    }
  ]

  const handleColorChange = (key: keyof ResumeTheme['colors'], value: string) => {
    setThemeSettings({
      ...themeSettings,
      colors: {
        ...themeSettings.colors,
        [key]: value
      }
    })
  }

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setThemeSettings({
      ...themeSettings,
      colors: preset.colors
    })
  }

  const handleTemplateChange = (templateId: string) => {
    setThemeSettings({
      ...themeSettings,
      template: templateId as ResumeTheme['template']
    })
  }

  const handleSave = () => {
    updateTheme(themeSettings)
    onClose()
  }

  const handleReset = () => {
    setThemeSettings(resume.theme)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تنظیمات ظاهری رزومه"
      size="lg"
    >
      <div className="space-y-6">
    
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8 space-x-reverse">
            {[
              { id: 'colors', label: 'رنگ‌ها', icon: <Palette className="h-4 w-4 ml-2" /> },
              { id: 'typography', label: 'تایپوگرافی', icon: <Type className="h-4 w-4 ml-2" /> },
              { id: 'layout', label: 'طرح‌بندی', icon: <Layout className="h-4 w-4 ml-2" /> },
              { id: 'components', label: 'اجزا', icon: <Eye className="h-4 w-4 ml-2" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center py-2 px-1 border-b-2 text-sm font-medium
                  ${activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        
        {activeTab === 'colors' && (
          <div className="space-y-6">
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">پیش‌تنظیم‌ها</h4>
              <div className="grid grid-cols-2 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <div className="flex space-x-1 space-x-reverse">
                        <div 
                          className="h-6 w-6 rounded-full border"
                          style={{ backgroundColor: preset.colors.primary }}
                        />
                        <div 
                          className="h-6 w-6 rounded-full border"
                          style={{ backgroundColor: preset.colors.secondary }}
                        />
                        <div 
                          className="h-6 w-6 rounded-full border"
                          style={{ backgroundColor: preset.colors.accent }}
                        />
                      </div>
                      <span className="font-medium">{preset.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      رنگ اصلی: {preset.colors.primary}
                    </p>
                  </button>
                ))}
              </div>
            </div>

        
            <div>
              <h4 className="font-medium text-gray-900 mb-3">رنگ‌بندی سفارشی</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(themeSettings.colors).map(([key, value]) => (
                  <div key={key}>
                    <Label htmlFor={`color-${key}`}>
                      {key === 'primary' && 'رنگ اصلی'}
                      {key === 'secondary' && 'رنگ ثانویه'}
                      {key === 'accent' && 'رنگ تأکید'}
                      {key === 'background' && 'پس‌زمینه'}
                      {key === 'text' && 'متن'}
                      {key === 'header' && 'عنوان'}
                      {key === 'border' && 'حاشیه'}
                    </Label>
                    <div className="flex items-center space-x-3 space-x-reverse mt-1">
                      <input
                        type="color"
                        id={`color-${key}`}
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof ResumeTheme['colors'], e.target.value)}
                        className="h-10 w-10 cursor-pointer rounded-lg"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleColorChange(key as keyof ResumeTheme['colors'], e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

    
        {activeTab === 'typography' && (
          <div className="space-y-6">
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">فونت</h4>
              <div className="grid grid-cols-2 gap-3">
                {fonts.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => {
                      setThemeSettings({
                        ...themeSettings,
                        typography: {
                          ...themeSettings.typography,
                          fontFamily: font.id
                        }
                      })
                    }}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      themeSettings.typography.fontFamily === font.id
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium mb-2">{font.name}</div>
                    <div 
                      className="text-sm text-gray-600"
                      style={{ fontFamily: font.id }}
                    >
                      {font.preview}
                    </div>
                  </button>
                ))}
              </div>
            </div>

        
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="heading-size">
                  اندازه عناوین: {themeSettings.typography.headingSize}rem
                </Label>
                <input
                  id="heading-size"
                  type="range"
                  min="1.5"
                  max="3"
                  step="0.1"
                  value={themeSettings.typography.headingSize}
                  onChange={(e) => {
                    setThemeSettings({
                      ...themeSettings,
                      typography: {
                        ...themeSettings.typography,
                        headingSize: parseFloat(e.target.value)
                      }
                    })
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <Label htmlFor="body-size">
                  اندازه متن: {themeSettings.typography.bodySize}rem
                </Label>
                <input
                  id="body-size"
                  type="range"
                  min="0.8"
                  max="1.5"
                  step="0.1"
                  value={themeSettings.typography.bodySize}
                  onChange={(e) => {
                    setThemeSettings({
                      ...themeSettings,
                      typography: {
                        ...themeSettings.typography,
                        bodySize: parseFloat(e.target.value)
                      }
                    })
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            
            <div>
              <Label htmlFor="line-height">
                فاصله خطوط: {themeSettings.typography.lineHeight}
              </Label>
              <input
                id="line-height"
                type="range"
                min="1.2"
                max="2"
                step="0.1"
                value={themeSettings.typography.lineHeight}
                onChange={(e) => {
                  setThemeSettings({
                    ...themeSettings,
                    typography: {
                      ...themeSettings.typography,
                      lineHeight: parseFloat(e.target.value)
                    }
                  })
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">قالب</h4>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      themeSettings.template === template.id
                        ? 'border-primary ring-2 ring-primary ring-opacity-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`h-12 rounded-lg mb-3 ${
                      template.id === 'modern' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                      template.id === 'classic' ? 'bg-gradient-to-r from-gray-700 to-gray-900' :
                      template.id === 'minimal' ? 'bg-gradient-to-r from-gray-100 to-gray-300' :
                      'bg-gradient-to-r from-green-400 to-blue-500'
                    }`} />
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {template.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">فاصله‌ها</h4>
              
              <div>
                <Label htmlFor="section-spacing">
                  فاصله بخش‌ها: {themeSettings.spacing.section}rem
                </Label>
                <input
                  id="section-spacing"
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={themeSettings.spacing.section}
                  onChange={(e) => {
                    setThemeSettings({
                      ...themeSettings,
                      spacing: {
                        ...themeSettings.spacing,
                        section: parseFloat(e.target.value)
                      }
                    })
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <Label htmlFor="item-spacing">
                  فاصله آیتم‌ها: {themeSettings.spacing.item}rem
                </Label>
                <input
                  id="item-spacing"
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={themeSettings.spacing.item}
                  onChange={(e) => {
                    setThemeSettings({
                      ...themeSettings,
                      spacing: {
                        ...themeSettings.spacing,
                        item: parseFloat(e.target.value)
                      }
                    })
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

    
        {activeTab === 'components' && (
          <div className="space-y-6">
            <h4 className="font-medium text-gray-900">نمایش اجزا</h4>
            
            <div className="space-y-4">
              {Object.entries(themeSettings.components).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center ml-3">
                      {key === 'showPhoto' && <ImageIcon className="h-4 w-4" />}
                      {key === 'showQR' && <QrCode className="h-4 w-4" />}
                      {key === 'showIcons' && <Eye className="h-4 w-4" />}
                      {key === 'showBorder' && <Layout className="h-4 w-4" />}
                      {key === 'showShadow' && <EyeOff className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-medium">
                        {key === 'showPhoto' && 'نمایش عکس پروفایل'}
                        {key === 'showQR' && 'نمایش کد QR'}
                        {key === 'showIcons' && 'نمایش آیکون‌ها'}
                        {key === 'showBorder' && 'نمایش حاشیه'}
                        {key === 'showShadow' && 'نمایش سایه'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {key === 'showPhoto' && 'نمایش عکس در بالای رزومه'}
                        {key === 'showQR' && 'نمایش کد QR برای لینک رزومه'}
                        {key === 'showIcons' && 'نمایش آیکون در کنار متن'}
                        {key === 'showBorder' && 'نمایش خطوط جداکننده'}
                        {key === 'showShadow' && 'نمایش سایه برای کارت‌ها'}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setThemeSettings({
                        ...themeSettings,
                        components: {
                          ...themeSettings.components,
                          [key]: !value
                        }
                      })
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        
        <div className="flex gap-3 pt-6 border-t">
          <Button
            variant="outline"
            leftIcon={<RefreshCw className="h-4 w-4" />}
            onClick={handleReset}
            className="flex-1"
          >
            بازنشانی
          </Button>
          <Button
            leftIcon={<Save className="h-4 w-4" />}
            onClick={handleSave}
            className="flex-1"
          >
            اعمال تغییرات
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default SettingsModal