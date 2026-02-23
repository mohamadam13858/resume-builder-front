'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useResumeStore } from '@/store/resumeStore'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import StatsCards from '@/components/dashboard/StatsCards'
import ResumesToolbar from '@/components/dashboard/ResumesToolbar'
import ResumesGrid from '@/components/dashboard/ResumesGrid'
import ResumesList from '@/components/dashboard/ResumesList'
import ResumesEmptyState from '@/components/dashboard/ResumesEmptyState'
import DeleteResumeModal from '@/components/dashboard/DeleteResumeModal'
import { useDashboardView } from '@/hook/useDashboardView'
import Alert from '@/components/ui/alert'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { resumes, isLoading, error, fetchResumes } = useResumeStore()

  const {
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    showDeleteModal,
    setShowDeleteModal,
    selectedResumeId,
    setSelectedResumeId,
  } = useDashboardView()

  useEffect(() => {
    fetchResumes()
  }, [fetchResumes])

  const filteredResumes = resumes.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteConfirm = async () => {
    if (selectedResumeId) {
      await useResumeStore.getState().deleteResume(selectedResumeId)
      setShowDeleteModal(false)
      setSelectedResumeId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <DashboardHeader userName={user?.name || 'کاربر'} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards resumes={resumes} />

        <ResumesToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          viewMode={viewMode}
          onViewChange={setViewMode}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-14 w-14 border-b-3 border-indigo-500 mb-5" />
            <p className="text-lg text-gray-600 ">در حال بارگذاری رزومه‌ها...</p>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto">
            <Alert variant="error" message={error} />
          </div>
        ) : filteredResumes.length === 0 ? (
          <ResumesEmptyState onCreateNew={() => window.location.href = '/builder'} />
        ) : viewMode === 'grid' ? (
          <ResumesGrid
            resumes={filteredResumes}
            onEdit={id => window.location.href = `/builder/${id}`}
            onDelete={id => {
              setSelectedResumeId(id)
              setShowDeleteModal(true)
            }}
            onToggleVisibility={useResumeStore.getState().toggleResumeVisibility}
          />
        ) : (
          <ResumesList
            resumes={filteredResumes}
            onEdit={id => window.location.href = `/builder/${id}`}
            onDelete={id => {
              setSelectedResumeId(id)
              setShowDeleteModal(true)
            }}
            onToggleVisibility={useResumeStore.getState().toggleResumeVisibility}
          />
        )}
      </main>

      <DeleteResumeModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedResumeId(null)
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}