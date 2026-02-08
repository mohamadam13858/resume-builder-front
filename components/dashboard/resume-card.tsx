import React from 'react'
import Link from 'next/link'
import { Resume } from '@/types'
import { 
  FileText, 
  Eye, 
  Download, 
  Edit, 
  Copy, 
  Trash2,
  MoreVertical,
  Calendar,
  User
} from 'lucide-react'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'

interface ResumeCardProps {
  resume: Resume
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onToggleVisibility: (id: string) => void
}

// در ResumeCard
const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleVisibility,
}) => {
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('fa-IR');

  const getTemplateColor = (template: string) => {
    const colors = {
      modern: 'bg-blue-100 text-blue-800',
      classic: 'bg-gray-100 text-gray-800',
      minimal: 'bg-green-100 text-green-800',
      creative: 'bg-purple-100 text-purple-800',
    };
    return colors[template as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getTemplateColor(resume.theme.template)}`}>
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{resume.title}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 ml-1" />
                  {formatDate(resume.updatedAt)}
                </span>
                {resume.content.personalInfo?.name && (
                  <span className="flex items-center">
                    <User className="h-3 w-3 ml-1" />
                    {resume.content.personalInfo.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                resume.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {resume.isPublic ? 'عمومی' : 'خصوصی'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 text-xs rounded-full ${getTemplateColor(resume.theme.template)}`}>
            قالب: {resume.theme.template}
          </span>

          {resume.viewCount > 0 && (
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
              {resume.viewCount} بازدید
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button variant="outline" size="sm" fullWidth leftIcon={<Edit />} onClick={() => onEdit(resume.id)}>
            ویرایش
          </Button>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            leftIcon={<Eye />}
            onClick={() => onToggleVisibility(resume.id)}
          >
            {resume.isPublic ? 'مخفی کردن' : 'عمومی کردن'}
          </Button>

          <Button variant="outline" size="sm" fullWidth leftIcon={<Copy />} onClick={() => onDuplicate(resume.id)}>
            کپی
          </Button>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            leftIcon={<Trash2 />}
            className="text-red-600 hover:text-red-700"
            onClick={() => onDelete(resume.id)}
          >
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard