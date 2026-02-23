'use client'

import {
  FileText,
  Edit,
  Copy,
  Trash2,
  Globe,
  Lock,
  Calendar,
  User,
} from 'lucide-react';
import Button from '@/components/ui/button';
import type { Resume } from '@/types/index';   

interface ResumeCardProps {
  resume: Resume;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  variant?: 'grid' | 'list';
}

export default function ResumeCard({
  resume,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleVisibility,
  variant = 'grid',
}: ResumeCardProps) {
  // فرمت تاریخ فارسی
  const formatDate = (date?: string | Date) => {
    if (!date) return 'نامشخص';
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
  const isPublic = resume.isPublic ?? false;
  const VisibilityIcon = isPublic ? Globe : Lock;
  const visibilityLabel = isPublic ? 'عمومی' : 'خصوصی';
  const visibilityColor = isPublic
    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
    : 'bg-amber-100 text-amber-800 border-amber-200';

  // رندر
  return (
    <div
      className={`
        group relative bg-white rounded-xl border border-gray-200
        overflow-hidden transition-all duration-300
        hover:shadow-xl hover:shadow-gray-200/70 hover:-translate-y-0.5 hover:border-gray-300
        ${variant === 'list' ? 'flex items-center gap-5 p-5' : ''}
      `}
    >
  
      <div className={`h-1.5 w-full bg-gradient-to-r ${style.accent}`} />

      <div className={`${variant === 'list' ? 'flex-1' : 'p-5'}`}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className={`
                h-11 w-11 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm
                ${style.bg} ${style.text}
              `}
            >
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight truncate">
                {resume.title || 'رزومه بدون عنوان'}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 mt-1 text-xs sm:text-sm text-gray-600">
                <span className="flex items-center whitespace-nowrap">
                  <Calendar className="h-3.5 w-3.5 ml-1.5 opacity-80 flex-shrink-0" />
                  {formatDate(resume.updatedAt)}
                </span>

                {resume.content?.personalInfo?.name && (
                  <span className="flex items-center whitespace-nowrap">
                    <User className="h-3.5 w-3.5 ml-1.5 opacity-80 flex-shrink-0" />
                    {resume.content.personalInfo.name}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div
            className={`
              flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
              ${visibilityColor} flex-shrink-0
            `}
          >
            <VisibilityIcon className="h-3.5 w-3.5" />
            {visibilityLabel}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span
              className={`
                px-2.5 py-1 text-xs font-medium rounded-full border
                ${style.badge}
              `}
            >
              {resume.theme?.template || 'modern'}
            </span>

            {Number(resume.viewCount) > 0 && (
              <span
                className="
                  px-2.5 py-1 text-xs font-medium rounded-full
                  bg-amber-50 text-amber-800 border border-amber-200
                "
              >
                {resume.viewCount.toLocaleString('fa-IR')} بازدید
              </span>
            )}
          </div>

        
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Edit className="h-4 w-4" />}
              onClick={() => onEdit(resume.id)}
            >
              ویرایش
            </Button>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<VisibilityIcon className="h-4 w-4" />}
              onClick={() => onToggleVisibility(resume.id)}
            >
              {isPublic ? 'مخفی کردن' : 'عمومی کردن'}
            </Button>

            <Button
              variant="outline"
              size="sm"
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
}