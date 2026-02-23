'use client'

import ResumeCard from '@/components/dashboard/resume-card'
import type { Resume } from '@/types/index'

type ResumesListProps = {
  resumes: Resume[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleVisibility: (id: string) => void
}

export default function ResumesList({
  resumes,
  onEdit,
  onDelete,
  onToggleVisibility,
}: ResumesListProps) {
  return (
    <div className="flex flex-col gap-4">
      {resumes.map(resume => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          variant="list"           
          onEdit={() => onEdit(resume.id)}
          onDelete={() => onDelete(resume.id)}
          onToggleVisibility={() => onToggleVisibility(resume.id)}
        />
      ))}
    </div>
  )
}