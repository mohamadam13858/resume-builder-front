import { useState } from 'react'

export function useDashboardView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)

  return {
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    showDeleteModal,
    setShowDeleteModal,
    selectedResumeId,
    setSelectedResumeId,
  }
}