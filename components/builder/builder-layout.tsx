'use client'

import React, { useState } from 'react'
import { 
  Menu, 
  X, 
  Settings, 
  Palette,
  Download,
  Eye,
  Save,
  Share2
} from 'lucide-react'
import Button from '@/components/ui/button'

interface BuilderLayoutProps {
  leftPanel: React.ReactNode
  preview: React.ReactNode
  onSave: () => void
  onDownload: () => void
  onShare: () => void
  onSettings: () => void
}

const BuilderLayout: React.FC<BuilderLayoutProps> = ({
  leftPanel,
  preview,
  onSave,
  onDownload,
  onShare,
  onSettings
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<'form' | 'preview'>('form')

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-lg font-bold text-gray-900 hidden sm:block">
                  سازنده رزومه
                </h1>
              </div>
            </div>

        
            <div className="md:hidden">
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setActivePanel('form')}
                  className={`px-4 py-2 text-sm ${activePanel === 'form' ? 'bg-gray-100' : ''}`}
                >
                  فرم
                </button>
                <button
                  onClick={() => setActivePanel('preview')}
                  className={`px-4 py-2 text-sm ${activePanel === 'preview' ? 'bg-gray-100' : ''}`}
                >
                  پیش‌نمایش
                </button>
              </div>
            </div>

        
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Save className="h-4 w-4" />}
                onClick={onSave}
              >
                <span className="hidden sm:inline">ذخیره</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="h-4 w-4" />}
                onClick={onDownload}
              >
                <span className="hidden sm:inline">دانلود</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Share2 className="h-4 w-4" />}
                onClick={onShare}
              >
                <span className="hidden sm:inline">اشتراک</span>
              </Button>
              
              <button
                onClick={onSettings}
                className="p-2 text-gray-600 hover:text-gray-900"
                title="تنظیمات"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto">
        <div className="flex h-[calc(100vh-4rem)]">
        
          <div className={`
            hidden md:block w-1/3 lg:w-2/5 xl:w-1/3
            border-l border-gray-200 bg-white overflow-y-auto
          `}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  ویرایش اطلاعات
                </h2>
                <button
                  onClick={onSettings}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="تنظیمات ظاهری"
                >
                  <Palette className="h-5 w-5" />
                </button>
              </div>
              {leftPanel}
            </div>
          </div>

          
          <div className="md:hidden w-full">
            {activePanel === 'form' && (
              <div className="h-full overflow-y-auto bg-white p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    ویرایش اطلاعات
                  </h2>
                  <button
                    onClick={onSettings}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Palette className="h-5 w-5" />
                  </button>
                </div>
                {leftPanel}
              </div>
            )}
            
            {activePanel === 'preview' && (
              <div className="h-full overflow-y-auto bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    پیش‌نمایش
                  </h2>
                  <button
                    onClick={onDownload}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                {preview}
              </div>
            )}
          </div>

        
          <div className="hidden md:flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  پیش‌نمایش زنده
                </h2>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={onDownload}
                    className="p-2 text-gray-600 hover:text-gray-900"
                    title="دانلود"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2 text-gray-600 hover:text-gray-900"
                    title="چاپ"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                {preview}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuilderLayout