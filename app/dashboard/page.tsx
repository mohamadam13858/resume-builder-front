'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useResumeStore } from '@/store/resumeStore';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Alert from '@/components/ui/alert';
import ResumeCard from '@/components/dashboard/resume-card';
import Modal from '@/components/ui/modal';
import { 
  Plus, FileText, Search, LayoutGrid, List 
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

  const handleCreate = () => {  
    router.push('/builder');
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
    totalViews: resumes.reduce((sum, r) => sum + (r.viewCount || 0), 0),
    lastUpdated: resumes.length > 0
      ? new Date(Math.max(...resumes.map(r => new Date(r.updatedAt).getTime())))
      : null,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/80">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                داشبورد
              </h1>
              <p className="text-gray-600 mt-1.5">
                خوش آمدید، <span className="font-medium text-indigo-600">{user?.name || 'کاربر'}</span>
              </p>
            </div>
            <Button 
              variant="primary"
              size="lg"
              leftIcon={<Plus className="h-5 w-5" />}
              onClick={handleCreate}
              className="shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/60 transition-all"
            >
              رزومه جدید بساز
            </Button>
          </div>
        </div>
      </div>

  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          <Card className="p-6 bg-white">
            <p className="text-sm text-gray-600">تعداد رزومه‌ها</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalResumes}</p>
          </Card>

          <Card className="p-6 bg-white">
            <p className="text-sm text-gray-600">رزومه‌های عمومی</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.publicResumes}</p>
          </Card>

          <Card className="p-6 bg-white">
            <p className="text-sm text-gray-600">کل بازدیدها</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalViews.toLocaleString('fa-IR')}</p>
          </Card>

          <Card className="p-6 bg-white">
            <p className="text-sm text-gray-600">آخرین بروزرسانی</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.lastUpdated 
                ? stats.lastUpdated.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }) 
                : '—'}
            </p>
          </Card>
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card className="p-5 mb-8 border border-gray-200/60 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="جستجو در عنوان رزومه‌ها..."
                className="w-full pr-12 pl-5 py-3.5 bg-white border border-gray-300 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200/50 outline-none transition-all text-base"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2.5 shrink-0">
              <Button 
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="min-w-[48px]"
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="min-w-[48px]"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-lg">در حال بارگذاری رزومه‌ها...</p>
          </div>
        ) : error ? (
          <Alert variant="error" message={error} className="max-w-2xl mx-auto" />
        ) : filteredResumes.length === 0 ? (
          <Card className="p-16 text-center border-2 border-dashed border-gray-300/70 bg-white/60 backdrop-blur-sm">
            <div className="mx-auto w-20 h-20 bg-indigo-100/70 rounded-full flex items-center justify-center mb-6">
              <FileText className="h-10 w-10 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">هنوز رزومه‌ای ساخته نشده!</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              بیایید همین حالا اولین رزومه حرفه‌ای خود را بسازیم
            </p>
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={<Plus className="h-5 w-5" />}
              onClick={handleCreate}
              className="shadow-lg shadow-indigo-200/50"
            >
              ساخت رزومه جدید
            </Button>
          </Card>
        ) : (
          <div 
            className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'flex flex-col gap-4'}
              transition-all duration-300
            `}
          >
            {filteredResumes.map(resume => (
              <div 
                key={resume.id} 
                className={viewMode === 'list' ? 'w-full' : ''}
              >
                <ResumeCard
                  resume={resume}
                  onEdit={() => router.push(`/builder/${resume.id}`)}
                  onDuplicate={() => { /* بعداً اضافه می‌کنیم */ }}
                  onDelete={() => {
                    setSelectedResumeId(resume.id);
                    setShowDeleteModal(true);
                  }}
                  onToggleVisibility={() => toggleResumeVisibility(resume.id)}
                  variant={viewMode}
                />
              </div>
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
        size="sm"
      >
        <div className="py-4">
          <p className="text-gray-700 leading-relaxed">
            آیا از حذف این رزومه مطمئن هستید؟  
            <span className="font-medium text-red-600 block mt-1">این عملیات قابل بازگشت نیست.</span>
          </p>
        </div>
        <div className="flex gap-3 mt-8">
          <Button 
            variant="outline" 
            onClick={() => setShowDeleteModal(false)}
            className="flex-1"
          >
            انصراف
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            className="flex-1"
          >
            بله، حذف شود
          </Button>
        </div>
      </Modal>
    </div>
  );
}