'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useResumeStore } from '@/store/resumeStore'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Alert from '@/components/ui/alert'
import ResumeCard from '@/components/dashboard/resume-card'
import Modal from '@/components/ui/modal'
import { 
  Plus, 
  FileText, 
  Download, 
  Upload,
  Filter,
  Search,
  Grid,
  List,
  BarChart3,
  TrendingUp,
  Clock,
  Users,
  Sparkles,
  Trash2
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { 
    resumes, 
    createResume, 
    duplicateResume, 
    deleteResume, 
    toggleResumeVisibility,
    getResumeCount 
  } = useResumeStore()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedResume, setSelectedResume] = useState<string | null>(null)
  const [importModalOpen, setImportModalOpen] = useState(false)


  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  
  const filteredResumes = resumes.filter(resume =>
    resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.personal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.personal.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateResume = () => {
    const newResumeId = createResume('رزومه جدید')
    router.push(`/builder/${newResumeId}`)
  }

  const handleEditResume = (id: string) => {
    router.push(`/builder/${id}`)
  }

  const handleDuplicateResume = (id: string) => {
    duplicateResume(id)
  }

  const handleDeleteResume = (id: string) => {
    setSelectedResume(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedResume) {
      deleteResume(selectedResume)
      setShowDeleteModal(false)
      setSelectedResume(null)
    }
  }

  const handleToggleVisibility = (id: string) => {
    toggleResumeVisibility(id)
  }

  
  const stats = {
    totalResumes: getResumeCount(),
    publicResumes: resumes.filter(r => r.isPublic).length,
    totalViews: resumes.reduce((sum, r) => sum + (r.viewCount || 0), 0),
    lastUpdated: resumes.length > 0 
      ? new Date(Math.max(...resumes.map(r => new Date(r.updatedAt).getTime())))
      : null
  }

  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                داشبورد
              </h1>
              <p className="text-gray-600 mt-1">
                خوش آمدید، {user?.name}!
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button
                leftIcon={<Plus className="h-5 w-5" />}
                onClick={handleCreateResume}
              >
                رزومه جدید
              </Button>
              
              <Button
                variant="outline"
                leftIcon={<Upload className="h-5 w-5" />}
                onClick={() => setImportModalOpen(true)}
              >
                وارد کردن
              </Button>
            </div>
          </div>
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center ml-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">تعداد رزومه‌ها</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalResumes}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center ml-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">رزومه‌های عمومی</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.publicResumes}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center ml-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">کل بازدیدها</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalViews}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center ml-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">آخرین بروزرسانی</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.lastUpdated 
                    ? new Date(stats.lastUpdated).toLocaleDateString('fa-IR')
                    : '-'
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">

        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="جستجو در رزومه‌ها..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Card>

        {filteredResumes.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                هنوز رزومه‌ای ندارید
              </h3>
              <p className="text-gray-600 mb-6">
                اولین رزومه خود را بسازید و شانس استخدام خود را افزایش دهید
              </p>
              <Button
                leftIcon={<Plus className="h-5 w-5" />}
                onClick={handleCreateResume}
              >
                ساخت اولین رزومه
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResumes.map((resume) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onEdit={handleEditResume}
                    onDuplicate={handleDuplicateResume}
                    onDelete={handleDeleteResume}
                    onToggleVisibility={handleToggleVisibility}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResumes.map((resume) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onEdit={handleEditResume}
                    onDuplicate={handleDuplicateResume}
                    onDelete={handleDeleteResume}
                    onToggleVisibility={handleToggleVisibility}
                  />
                ))}
              </div>
            )}
          </>
        )}

    
        {resumes.length > 0 && (
          <Card className="mt-8 p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                نکات برای رزومه بهتر
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  اطلاعات تماس واضح
                </h4>
                <p className="text-sm text-blue-700">
                  مطمئن شوید اطلاعات تماس شما به‌روز و قابل خواندن است
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">
                  خلاصه‌ای تاثیرگذار
                </h4>
                <p className="text-sm text-green-700">
                  در ۲-۳ خط نقاط قوت و اهداف خود را بیان کنید
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">
                  قالب مناسب
                </h4>
                <p className="text-sm text-purple-700">
                  قالب رزومه را متناسب با صنعت خود انتخاب کنید
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

    
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedResume(null)
        }}
        title="حذف رزومه"
        size="md"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            آیا مطمئن هستید؟
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            این عمل قابل بازگشت نیست. رزومه به طور کامل حذف خواهد شد.
          </p>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedResume(null)
              }}
            >
              لغو
            </Button>
            <Button
              variant="danger"
              fullWidth
              onClick={confirmDelete}
            >
              بله، حذف کن
            </Button>
          </div>
        </div>
      </Modal>

      
      <Modal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        title="وارد کردن رزومه"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              از فایل JSON وارد کنید
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              فایل JSON رزومه خود را انتخاب کنید
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                فایل JSON خود را اینجا بکشید یا کلیک کنید
              </p>
              <p className="text-xs text-gray-500">
                حداکثر حجم: 5MB
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {/* Handle file upload */}}
              >
                انتخاب فایل
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              یا از نمونه‌ها استفاده کنید
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  توسعه‌دهنده فرانت‌اند
                </span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  مدیر مارکتینگ
                </span>
              </button>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setImportModalOpen(false)}
            >
              لغو
            </Button>
            <Button
              fullWidth
              onClick={() => {
                setImportModalOpen(false)
              }}
            >
              وارد کردن
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}