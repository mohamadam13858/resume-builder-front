'use client'

import { useEffect, useState, useCallback } from 'react'
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
  const resumeIdFromUrl = params.id as string
  const isNew = resumeIdFromUrl === 'new'

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
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'success' | 'error'
  >('idle')

  const activeResume = getActiveResume()

  useEffect(() => {
    if (isNew) {
      const localId = createLocalResume('رزومه بدون عنوان')
      setActiveResume(localId)
      router.replace(`/builder/${localId}`, { scroll: false })
      setLoading(false)
    } else {
      const resume = getResumeById(resumeIdFromUrl)
      if (!resume) {
        setError('رزومه مورد نظر یافت نشد')
        setLoading(false)
        return
      }
      setActiveResume(resumeIdFromUrl)
      setLoading(false)
    }
  }, [isNew, resumeIdFromUrl, createLocalResume, getResumeById, setActiveResume, router])

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!activeResume) return

      updateResumeLocally(activeResume.id, {
        title: e.target.value.trim(),
        updatedAt: new Date(),
      })
    },
    [activeResume, updateResumeLocally]
  )

  const handleFinalSave = useCallback(async () => {
    if (!activeResume) {
      setError('هیچ رزومه‌ای برای ذخیره وجود ندارد')
      return
    }

    if (saveStatus === 'saving') return

    setSaveStatus('saving')

    try {
      let newResumeId = activeResume.id

      if (activeResume.id.startsWith('local-')) {
        const serverId = await registerResume(activeResume.id)
        if (!serverId) {
          throw new Error('شناسه سرور برگردانده نشد')
        }
        updateResumeLocally(activeResume.id, { id: serverId })
        setActiveResume(serverId)
        router.replace(`/builder/${serverId}`, { scroll: false })
        newResumeId = serverId
      } else {
        console.log('[SAVE] ذخیره تغییرات رزومه موجود', { id: activeResume.id })
        await saveResume(activeResume.id)
      }
      setSaveStatus('success')
      router.push('/dashboard')
    } catch (err: any) {
      console.error('[SAVE] خطا در فرآیند ذخیره:', err)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 5000)
    }
  }, [activeResume, saveStatus, registerResume, saveResume, updateResumeLocally, setActiveResume, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  if (error || !activeResume) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <Alert variant="error" message={error || 'رزومه بارگذاری نشد'} />
          <button
            onClick={() => router.push('/')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            بازگشت به صفحه اصلی
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
        saveStatus={saveStatus}
        onDownload={() => alert('قابلیت دانلود به‌زودی اضافه می‌شود')}
        onShare={() => alert('قابلیت اشتراک‌گذاری به‌زودی اضافه می‌شود')}
        onSettings={() => alert('تنظیمات به‌زودی اضافه می‌شود')}
      >
        <div className="p-4 bg-white border-b sticky top-0 z-10 shadow-sm">
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
        <div
          className={`
            fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl 
            text-white flex items-center gap-3 transition-all duration-300 min-w-[300px]
          `}
          style={{
            background:
              saveStatus === 'saving' ? '#2563eb' :
                saveStatus === 'success' ? '#16a34a' :
                  '#dc2626',
          }}
        >
          {saveStatus === 'saving' && <Loader size="sm" color="white" />}
          <span className="font-medium">
            {saveStatus === 'saving'
              ? 'در حال ذخیره و ثبت رزومه...'
              : saveStatus === 'success'
                ? 'رزومه با موفقیت ذخیره شد — در حال انتقال به داشبورد'
                : 'خطا در ذخیره رزومه'}
          </span>
        </div>
      )}
    </>
  )
}