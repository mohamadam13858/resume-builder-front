'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useResumeStore } from '@/store/resumeStore'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { 
  FileText, 
  Plus, 
  Search,
  Filter,
  Grid,
  List,
  Eye,
  EyeOff,
  Download,
  Edit,
  Copy,
  Trash2,
  Calendar,
  TrendingUp,
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react'

const ResumeList = () => {
  const { resumes, deleteResume, toggleResumeVisibility, duplicateResume } = useResumeStore()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resume.personal.name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' ? true :
                         filterStatus === 'active' ? resume.isActive :
                         !resume.isActive
    
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: resumes.length,
    active: resumes.filter(r => r.isActive).length,
    public: resumes.filter(r => r.isPublic).length,
    views: resumes.reduce((sum, r) => sum + (r.viewCount || 0), 0)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fa-IR')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center ml-3">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">کل رزومه‌ها</div>
              <div className="text-xl font-bold text-gray-900">{stats.total}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center ml-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">فعال</div>
              <div className="text-xl font-bold text-gray-900">{stats.active}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center ml-3">
              <Eye className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">عمومی</div>
              <div className="text-xl font-bold text-gray-900">{stats.public}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center ml-3">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">بازدید</div>
              <div className="text-xl font-bold text-gray-900">{stats.views}</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="جستجو در رزومه‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">

            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-2 text-sm ${filterStatus === 'all' ? 'bg-gray-100' : ''}`}
              >
                همه
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-3 py-2 text-sm ${filterStatus === 'active' ? 'bg-gray-100' : ''}`}
              >
                فعال
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-3 py-2 text-sm ${filterStatus === 'inactive' ? 'bg-gray-100' : ''}`}
              >
                غیرفعال
              </button>
            </div>


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

            <Link href="/builder">
              <Button leftIcon={<Plus className="h-5 w-5" />}>
                رزومه جدید
              </Button>
            </Link>
          </div>
        </div>
      </Card>


      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <Card key={resume.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      resume.theme.template === 'modern' ? 'bg-blue-100 text-blue-600' :
                      resume.theme.template === 'classic' ? 'bg-gray-100 text-gray-600' :
                      resume.theme.template === 'minimal' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate max-w-[150px]">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {resume.personal.name || 'بدون نام'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {resume.isPublic ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 ml-2" />
                    <span>آخرین ویرایش: {formatDate(resume.updatedAt)}</span>
                  </div>
                  
                  {resume.viewCount > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 ml-2" />
                      <span>{resume.viewCount} بازدید</span>
                    </div>
                  )}
                </div>

        
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    resume.isActive 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {resume.isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                  
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {resume.theme.template === 'modern' ? 'مدرن' :
                     resume.theme.template === 'classic' ? 'کلاسیک' :
                     resume.theme.template === 'minimal' ? 'مینیمال' : 'خلاق'}
                  </span>
                </div>

            
                <div className="grid grid-cols-2 gap-2">
                  <Link href={`/builder/${resume.id}`}>
                    <Button variant="outline" size="sm" fullWidth>
                      <Edit className="h-4 w-4 ml-2" />
                      ویرایش
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => toggleResumeVisibility(resume.id)}
                  >
                    {resume.isPublic ? (
                      <>
                        <EyeOff className="h-4 w-4 ml-2" />
                        مخفی
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 ml-2" />
                        نمایش
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => duplicateResume(resume.id)}
                  >
                    <Copy className="h-4 w-4 ml-2" />
                    کپی
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="text-red-600 hover:text-red-700 border-red-300"
                    onClick={() => {
                      if (window.confirm('آیا از حذف این رزومه مطمئن هستید؟')) {
                        deleteResume(resume.id)
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      resume.theme.template === 'modern' ? 'bg-blue-100 text-blue-600' :
                      resume.theme.template === 'classic' ? 'bg-gray-100 text-gray-600' :
                      resume.theme.template === 'minimal' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <FileText className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <h3 className="font-semibold text-gray-900">
                          {resume.title}
                        </h3>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            resume.isActive 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {resume.isActive ? 'فعال' : 'غیرفعال'}
                          </span>
                          
                          {resume.isPublic ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              عمومی
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                              خصوصی
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span>{resume.personal.name || 'بدون نام'}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 ml-2" />
                          <span>{formatDate(resume.updatedAt)}</span>
                        </div>
                        {resume.viewCount > 0 && (
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 ml-2" />
                            <span>{resume.viewCount} بازدید</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Link href={`/builder/${resume.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-2" />
                        ویرایش
                      </Button>
                    </Link>
                    
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

    
      {filteredResumes.length === 0 && (
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? 'نتیجه‌ای یافت نشد' : 'هنوز رزومه‌ای ندارید'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'هیچ رزومه‌ای با جستجوی شما مطابقت ندارد'
                : 'اولین رزومه خود را بسازید و شانس استخدام خود را افزایش دهید'
              }
            </p>
            {!searchTerm && (
              <Link href="/builder">
                <Button leftIcon={<Plus className="h-5 w-5" />}>
                  ساخت اولین رزومه
                </Button>
              </Link>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

export default ResumeList