'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useResumeStore } from '@/store/resumeStore'
import BuilderLayout from '@/components/builder/builder-layout'
import SectionsPanel from '@/components/builder/sections-panel'
import Alert from '@/components/ui/alert'
import ResumePreview from '@/components/builder/resume-preview'
import SettingsModal from '@/components/builder/settings-modal'
import Loader from '@/components/ui/loader'

export default function BuilderPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { 
    getActiveResume, 
    setActiveResume, 
    exportResume,
    // updateResumeData,
    resumes 
  } = useResumeStore()
  
  const [isLoading, setIsLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  const resumeId = params.id as string
  const activeResume = getActiveResume()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    const resumeExists = resumes.some(r => r.id === resumeId)
    if (!resumeExists) {
      setError('رزومه مورد نظر یافت نشد')
      setIsLoading(false)
      return
    }


    setActiveResume(resumeId)
    setIsLoading(false)
  }, [resumeId, isAuthenticated, router, resumes, setActiveResume])

  const handleSave = async () => {
    if (!activeResume) return
    
    setSaveStatus('saving')
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      

    //   updateResumeData({
    //     ...activeResume,
    //     updatedAt: new Date()
    //   })
      
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      setError('خطا در ذخیره سازی')
    }
  }

  const handleDownload = () => {
    if (!activeResume) return
    
    const resumeData = exportResume(activeResume.id)
    const blob = new Blob([resumeData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeResume.title}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (!activeResume) return
    
    const shareUrl = `${window.location.origin}/view/${activeResume.id}`
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('لینک رزومه در کلیپ‌بورد کپی شد')
      })
      .catch(() => {
        alert('خطا در کپی لینک')
      })
  }

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert
            variant="error"
            message={error}
            className="mb-4"
          />
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            بازگشت به داشبورد
          </button>
        </div>
      </div>
    )
  }

  if (!activeResume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>در حال بارگذاری...</p>
      </div>
    )
  }

  return (
    <>
      <BuilderLayout
        leftPanel={<SectionsPanel />}
        preview={<ResumePreview />}
        onSave={handleSave}
        onDownload={handleDownload}
        onShare={handleShare}
        onSettings={() => setShowSettings(true)}
      />
      
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        resume={activeResume}
      />

    
      {saveStatus !== 'idle' && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-64 z-50">
          <div className={`p-4 rounded-lg shadow-lg ${
            saveStatus === 'saving' ? 'bg-blue-500' : 'bg-green-500'
          } text-white`}>
            <div className="flex items-center justify-between">
              <span>
                {saveStatus === 'saving' ? 'در حال ذخیره...' : 'ذخیره شد!'}
              </span>
              {saveStatus === 'saving' && (
                <Loader size="sm" color="text-white" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}