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

const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleVisibility
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fa-IR')
  }

  const getTemplateColor = (template: string) => {
    switch (template) {
      case 'modern': return 'bg-blue-100 text-blue-800'
      case 'classic': return 'bg-gray-100 text-gray-800'
      case 'minimal': return 'bg-green-100 text-green-800'
      case 'creative': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getTemplateColor(resume.theme.template)}`}>
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {resume.title}
              </h3>
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 mt-1">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 ml-1" />
                  {formatDate(resume.updatedAt)}
                </span>
                {resume.personal.name && (
                  <span className="flex items-center">
                    <User className="h-3 w-3 ml-1" />
                    {resume.personal.name}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className={`px-2 py-1 text-xs rounded-full ${
              resume.isPublic 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {resume.isPublic ? 'عمومی' : 'خصوصی'}
            </span>
            
            
            <div className="relative">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="p-4">
    
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 text-xs rounded-full ${getTemplateColor(resume.theme.template)}`}>
            قالب: {resume.theme.template === 'modern' ? 'مدرن' : 
                   resume.theme.template === 'classic' ? 'کلاسیک' : 
                   resume.theme.template === 'minimal' ? 'مینیمال' : 'خلاق'}
          </span>
          
          {resume.isActive && (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
              فعال
            </span>
          )}
          
          {resume.viewCount > 0 && (
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
              {resume.viewCount} بازدید
            </span>
          )}
        </div>

    
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            leftIcon={<Edit className="h-4 w-4" />}
            onClick={() => onEdit(resume.id)}
          >
            ویرایش
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            leftIcon={<Eye className="h-4 w-4" />}
            onClick={() => onToggleVisibility(resume.id)}
          >
            {resume.isPublic ? 'مخفی' : 'نمایش'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            leftIcon={<Copy className="h-4 w-4" />}
            onClick={() => onDuplicate(resume.id)}
          >
            کپی
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            leftIcon={<Trash2 className="h-4 w-4" />}
            className="text-red-600 hover:text-red-700"
            onClick={() => onDelete(resume.id)}
          >
            حذف
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResumeCard