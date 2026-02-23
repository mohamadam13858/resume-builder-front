'use client'

import ResumeCard from '@/components/dashboard/resume-card'
import type { Resume } from '@/types/index' 

type ResumesGridProps = {
  resumes: Resume[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleVisibility: (id: string) => void
}

export default function ResumesGrid({
  resumes,
  onEdit,
  onDelete,
  onToggleVisibility,
}: ResumesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
      {resumes.map(resume => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          variant="grid"         
          onEdit={() => onEdit(resume.id)}
          onDelete={() => onDelete(resume.id)}
          onToggleVisibility={() => onToggleVisibility(resume.id)}
        />
      ))}
    </div>
  )
}