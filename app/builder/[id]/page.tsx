'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useResumeStore } from '@/store/resumeStore'
import BuilderLayout from '@/components/builder/builder-layout'
import SectionsPanel from '@/components/builder/sections-panel'
import ResumePreview from '@/components/builder/resume-preview'
import Loader from '@/components/ui/loader'
import Alert from '@/components/ui/alert'
import Input from '@/components/ui/input'

export default function BuilderPage() {
  const params = useParams()
  const router = useRouter()
  const resumeId = params.id as string
  const isNew = resumeId === 'new'

  const {
    createLocalResume,
    registerResume,
    saveResume,
    getResumeById,
    setActiveResume,
    getActiveResume,
    updateResumeLocally,
  } = useResumeStore()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const activeResume = getActiveResume()

  useEffect(() => {
    if (isNew) {
      const localId = createLocalResume('رزومه بدون عنوان')
      setActiveResume(localId)
      setLoading(false)
    } else {
      const resume = getResumeById(resumeId)
      if (!resume) {
        setError('رزومه یافت نشد')
        setLoading(false)
        return
      }
      setActiveResume(resumeId)
      setLoading(false)
    }
  }, [isNew, resumeId, createLocalResume, getResumeById, setActiveResume])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeResume) {
      updateResumeLocally(activeResume.id, {
        title: e.target.value,
        updatedAt: new Date(),
      })
    }
  }

  const handleFinalSave = async () => {
    if (!activeResume) return

    setSaveStatus('saving')

    try {
      let finalId = activeResume.id

      if (activeResume.id.startsWith('local-')) {
        finalId = await registerResume(activeResume.id)
      } else {
        await saveResume(activeResume.id)
      }

      setSaveStatus('success')
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 4000)
    }
  }

  if (loading) return <div className="min-h-screen flex-center"><Loader size="lg" /></div>

  if (error) {
    return (
      <div className="min-h-screen flex-center p-6">
        <div className="max-w-md text-center">
          <Alert variant="error" message={error} />
          <button
            onClick={() => router.push('/')}
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            بازگشت به خانه
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <BuilderLayout
        leftPanel={<SectionsPanel />}
        preview={<ResumePreview />}
        onSave={handleFinalSave}
        onDownload={() => alert('دانلود بعداً اضافه می‌شود')}
        onShare={() => alert('اشتراک بعداً اضافه می‌شود')}
        onSettings={() => alert('تنظیمات بعداً اضافه می‌شود')}
      >
        <div className="p-4 bg-white border-b sticky top-0 z-10">
          <Input
            label="عنوان رزومه"
            value={activeResume?.title || ''}
            onChange={handleTitleChange}
            placeholder="مثال: رزومه توسعه‌دهنده فرانت‌اند - ۱۴۰۴"
            className="max-w-xl"
          />
        </div>
      </BuilderLayout>

      {saveStatus !== 'idle' && (
        <div className="fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl shadow-xl text-white flex items-center gap-3"
          style={{
            background: saveStatus === 'saving' ? '#2563eb' :
                        saveStatus === 'success' ? '#16a34a' :
                        '#dc2626'
          }}
        >
          {saveStatus === 'saving' && <Loader size="sm" color="white" />}
          <span>
            {saveStatus === 'saving' ? 'در حال ثبت...' :
             saveStatus === 'success' ? 'ذخیره شد — انتقال به داشبورد' :
             'خطا در ثبت'}
          </span>
        </div>
      )}
    </>
  )
}