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
  Share2,
} from 'lucide-react'
import Button from '@/components/ui/button'

interface BuilderLayoutProps {
  children?: React.ReactNode
  leftPanel: React.ReactNode
  preview: React.ReactNode
  onSave: () => void
  saveStatus?: 'idle' | 'saving' | 'success' | 'error'
  onDownload: () => void
  onShare: () => void
  onSettings: () => void
}

const BuilderLayout: React.FC<BuilderLayoutProps> = ({
  children,
  leftPanel,
  preview,
  onSave,
  saveStatus = 'idle',
  onDownload,
  onShare,
  onSettings,
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
            </div>

  
            <div className="md:hidden">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActivePanel('form')}
                  className={`px-5 py-2 text-sm font-medium ${
                    activePanel === 'form'
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  ویرایش
                </button>
                <button
                  onClick={() => setActivePanel('preview')}
                  className={`px-5 py-2 text-sm font-medium ${
                    activePanel === 'preview'
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  پیش‌نمایش
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Save className="h-4 w-4" />}
                onClick={onSave}
                disabled={saveStatus === 'saving'}
                loading={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'در حال ذخیره...' : 'ذخیره'}
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
                className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
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
          <div
            className={`
              hidden md:block w-1/3 lg:w-2/5 xl:w-1/3
              border-l border-gray-200 bg-white overflow-y-auto
            `}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  ویرایش اطلاعات
                </h2>
                <button
                  onClick={onSettings}
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
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
                <div className="flex justify-center">{preview}</div>
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
              {children && (
                <div className="mb-6">{children}</div>
              )}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  پیش‌نمایش زنده
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onDownload}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                    title="دانلود"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
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