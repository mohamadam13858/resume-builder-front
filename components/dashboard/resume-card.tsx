import React from 'react';
import { 
  FileText, 
  Eye, 
  Download, 
  Edit, 
  Copy, 
  Trash2,
  Globe, 
  Lock,
  Calendar,
  User,
  File
} from 'lucide-react';
import Button from '@/components/ui/button';
import { Resume } from '@/types';

interface ResumeCardProps {
  resume: Resume;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleVisibility,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTemplateStyle = (template: string = 'modern') => {
    const styles = {
      modern: {
        accent: 'from-blue-500 to-indigo-600',
        bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
        text: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
      },
      classic: {
        accent: 'from-gray-600 to-gray-800',
        bg: 'bg-gradient-to-r from-gray-50 to-slate-100',
        text: 'text-gray-700',
        badge: 'bg-gray-100 text-gray-800 border-gray-200',
      },
      minimal: {
        accent: 'from-emerald-500 to-teal-600',
        bg: 'bg-gradient-to-r from-emerald-50 to-teal-50',
        text: 'text-teal-700',
        badge: 'bg-teal-100 text-teal-800 border-teal-200',
      },
      creative: {
        accent: 'from-purple-500 to-pink-600',
        bg: 'bg-gradient-to-r from-purple-50 to-pink-50',
        text: 'text-purple-700',
        badge: 'bg-purple-100 text-purple-800 border-purple-200',
      },
    };
    return styles[template as keyof typeof styles] || styles.modern;
  };

  const style = getTemplateStyle(resume.theme?.template);

  const VisibilityIcon = resume.isPublic ? Globe : Lock;
  const visibilityText = resume.isPublic ? 'عمومی' : 'خصوصی';
  const visibilityColor = resume.isPublic 
    ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
    : 'bg-amber-100 text-amber-800 border-amber-200';

  return (
    <div 
      className={`
        group relative bg-white rounded-xl border border-gray-200 
        overflow-hidden transition-all duration-300
        hover:shadow-xl hover:-translate-y-1 hover:border-gray-300
      `}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${style.accent}`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3.5">
            <div className={`
              h-12 w-12 rounded-xl flex items-center justify-center shadow-sm
              ${style.bg} ${style.text}
            `}>
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">
                {resume.title || 'رزومه بدون عنوان'}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 ml-1.5 opacity-80" />
                  {formatDate(resume.updatedAt)}
                </span>
                {resume.content?.personalInfo?.name && (
                  <span className="flex items-center">
                    <User className="h-3.5 w-3.5 ml-1.5 opacity-80" />
                    {resume.content.personalInfo.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border
            ${visibilityColor}
          `}>
            <VisibilityIcon className="h-3.5 w-3.5" />
            {visibilityText}
          </div>
        </div>


        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className={`
              px-3 py-1 text-xs font-medium rounded-full border
              ${style.badge}
            `}>
              {resume.theme?.template || 'modern'}
            </span>

            {resume.viewCount > 0 && (
              <span className="
                px-3 py-1 text-xs font-medium rounded-full 
                bg-amber-50 text-amber-800 border border-amber-200
              ">
                {resume.viewCount} بازدید
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 hover:bg-gray-50"
              leftIcon={<Edit className="h-4 w-4" />}
              onClick={() => onEdit(resume.id)}
            >
              ویرایش
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 hover:bg-gray-50"
              leftIcon={<VisibilityIcon className="h-4 w-4" />}
              onClick={() => onToggleVisibility(resume.id)}
            >
              {resume.isPublic ? 'مخفی' : 'عمومی'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 hover:bg-gray-50"
              leftIcon={<Copy className="h-4 w-4" />}
              onClick={() => onDuplicate(resume.id)}
            >
              کپی
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
              leftIcon={<Trash2 className="h-4 w-4" />}
              onClick={() => onDelete(resume.id)}
            >
              حذف
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;