'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useResumeStore } from '@/store/resumeStore';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Alert from '@/components/ui/alert';
import ResumeCard from '@/components/dashboard/resume-card';
import Modal from '@/components/ui/modal';
import { 
  Plus, FileText, Upload, Search, Grid, List, Trash2 
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { 
    resumes, 
    isLoading, 
    error,
    fetchResumes,
    deleteResume,
    toggleResumeVisibility,
  } = useResumeStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const filteredResumes = resumes.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async () => {  
      router.push(`/builder`);

  };

  const handleDeleteConfirm = async () => {
    if (selectedResumeId) {
      await deleteResume(selectedResumeId);
      setShowDeleteModal(false);
      setSelectedResumeId(null);
    }
  };

  const stats = {
    totalResumes: resumes.length,
    publicResumes: resumes.filter(r => r.isPublic).length,
    totalViews: resumes.reduce((sum, r) => sum + r.viewCount, 0),
    lastUpdated: resumes.length > 0
      ? new Date(Math.max(...resumes.map(r => new Date(r.updatedAt).getTime())))
      : null,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">داشبورد</h1>
              <p className="text-gray-600 mt-1">خوش آمدید، {user?.name}!</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button leftIcon={<Plus className="h-5 w-5" />} onClick={handleCreate}>
                رزومه جدید
              </Button>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-gray-600">تعداد رزومه‌ها</p>
          <p className="text-2xl font-bold">{stats.totalResumes}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">رزومه‌های عمومی</p>
          <p className="text-2xl font-bold">{stats.publicResumes}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">کل بازدیدها</p>
          <p className="text-2xl font-bold">{stats.totalViews}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">آخرین بروزرسانی</p>
          <p className="text-xl">
            {stats.lastUpdated ? stats.lastUpdated.toLocaleDateString('fa-IR') : '-'}
          </p>
        </Card>
      </div>


      <div className="max-w-7xl mx-auto px-4 pb-12">
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو در رزومه‌ها..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant={viewMode === 'grid' ? 'primary' : 'outline'} onClick={() => setViewMode('grid')}>
                شبکه‌ای
              </Button>
              <Button variant={viewMode === 'list' ? 'primary' : 'outline'} onClick={() => setViewMode('list')}>
                لیستی
              </Button>
            </div>
          </div>
        </Card>

        {isLoading ? (
          <div className="text-center py-12">در حال بارگذاری...</div>
        ) : error ? (
          <Alert variant="error" message={error} />
        ) : filteredResumes.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">هنوز رزومه‌ای ندارید</h3>
            <Button leftIcon={<Plus />} onClick={handleCreate}>
              ساخت رزومه جدید
            </Button>
          </Card>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredResumes.map(resume => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onEdit={() => router.push(`/builder/${resume.id}`)}
                onDuplicate={() => {/* بعداً اضافه می‌کنیم */}}
                onDelete={() => {
                  setSelectedResumeId(resume.id);
                  setShowDeleteModal(true);
                }}
                onToggleVisibility={() => toggleResumeVisibility(resume.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedResumeId(null);
        }}
        title="حذف رزومه"
      >
        <p className="mb-6">آیا مطمئن هستید که می‌خواهید این رزومه را حذف کنید؟ این عملیات قابل بازگشت نیست.</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
            انصراف
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            بله، حذف شود
          </Button>
        </div>
      </Modal>
    </div>
  );
}