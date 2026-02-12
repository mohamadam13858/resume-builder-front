'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useResumeStore } from '@/store/resumeStore'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { 
  FileText, Plus, Search, Grid, List, Eye, EyeOff, Download, Edit, Copy, Trash2, Calendar, TrendingUp, MoreVertical, CheckCircle 
} from 'lucide-react'

const ResumeList = () => {
  const { resumes, deleteResume, toggleResumeVisibility, duplicateResume } = useResumeStore()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filtered = resumes.filter(r => {
    const searchMatch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (r.personal?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    const statusMatch = filter === 'all' || (filter === 'active' ? r.isActive : !r.isActive)
    return searchMatch && statusMatch
  })

  const stats = {
    total: resumes.length,
    active: resumes.filter(r => r.isActive).length,
    public: resumes.filter(r => r.isPublic).length,
    views: resumes.reduce((sum, r) => sum + (r.viewCount || 0), 0)
  }

  const formatDate = (d: Date) => new Date(d).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { title: 'کل رزومه‌ها', value: stats.total, icon: FileText, color: 'blue' },
          { title: 'فعال', value: stats.active, icon: CheckCircle, color: 'green' },
          { title: 'عمومی', value: stats.public, icon: Eye, color: 'purple' },
          { title: 'بازدید', value: stats.views, icon: TrendingUp, color: 'amber' }
        ].map((item, i) => (
          <Card key={i} className={`p-5 border-t-4 border-t-${item.color}-500 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-${item.color}-100 rounded-xl`}>
                <item.icon className={`h-6 w-6 text-${item.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>


      <Card className="p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="جستجو در عنوان یا نام..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-base"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="inline-flex border border-gray-300 rounded-xl overflow-hidden">
              {['all', 'active', 'inactive'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                    filter === status ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {status === 'all' ? 'همه' : status === 'active' ? 'فعال' : 'غیرفعال'}
                </button>
              ))}
            </div>

            <div className="inline-flex border border-gray-300 rounded-xl overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`p-3 ${viewMode === 'grid' ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                <Grid className="h-5 w-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-3 ${viewMode === 'list' ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                <List className="h-5 w-5" />
              </button>
            </div>

            <Link href="/builder">
              <Button leftIcon={<Plus />} className="py-3 px-5">رزومه جدید</Button>
            </Link>
          </div>
        </div>
      </Card>

    
      {filtered.length === 0 ? (
        <Card className="p-12 text-center border-2 border-dashed border-gray-300 bg-white/60">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-3">{searchTerm ? 'هیچ نتیجه‌ای یافت نشد' : 'رزومه‌ای وجود ندارد'}</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchTerm ? 'جستجوی خود را تغییر دهید' : 'همین حالا اولین رزومه حرفه‌ای خود را بسازید'}
          </p>
          {!searchTerm && (
            <Link href="/builder">
              <Button size="lg" leftIcon={<Plus />}>ساخت رزومه جدید</Button>
            </Link>
          )}
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(resume => (
            <Card 
              key={resume.id} 
              className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200/70"
            >
              <div className="p-5 border-b bg-gradient-to-r from-gray-50 to-white">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="p-3 bg-indigo-100 rounded-xl">
                      <FileText className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg truncate max-w-[220px]">{resume.title}</h3>
                      <p className="text-sm text-gray-600">{resume.personal?.name || '—'}</p>
                    </div>
                  </div>
                  {resume.isPublic ? <Eye className="h-5 w-5 text-green-500" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>آخرین ویرایش: {formatDate(resume.updatedAt)}</span>
                  </div>
                  {resume.viewCount > 0 && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>{resume.viewCount.toLocaleString('fa-IR')} بازدید</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${resume.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                    {resume.isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                    {resume.theme?.template || 'پیش‌فرض'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <Link href={`/builder/${resume.id}`}>
                    <Button variant="outline" size="sm" fullWidth leftIcon={<Edit className="h-4 w-4" />}>
                      ویرایش
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    fullWidth 
                    onClick={() => toggleResumeVisibility(resume.id)}
                    leftIcon={resume.isPublic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  >
                    {resume.isPublic ? 'مخفی' : 'نمایش'}
                  </Button>
                  <Button variant="outline" size="sm" fullWidth leftIcon={<Copy className="h-4 w-4" />} onClick={() => duplicateResume(resume.id)}>
                    کپی
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    fullWidth 
                    className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                    onClick={() => window.confirm('حذف شود؟') && deleteResume(resume.id)}
                    leftIcon={<Trash2 className="h-4 w-4" />}
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(resume => (
            <Card key={resume.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-5 flex-1">
                  <div className="p-4 bg-indigo-100 rounded-xl">
                    <FileText className="h-7 w-7 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-lg truncate">{resume.title}</h3>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 text-xs rounded-full ${resume.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                          {resume.isActive ? 'فعال' : 'غیرفعال'}
                        </span>
                        {resume.isPublic ? (
                          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">عمومی</span>
                        ) : (
                          <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">خصوصی</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                      <span>{resume.personal?.name || 'بدون نام'}</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" /> {formatDate(resume.updatedAt)}
                      </span>
                      {resume.viewCount > 0 && (
                        <span className="flex items-center gap-1.5">
                          <TrendingUp className="h-4 w-4" /> {resume.viewCount.toLocaleString('fa-IR')} بازدید
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link href={`/builder/${resume.id}`}>
                    <Button variant="outline" size="sm" leftIcon={<Edit className="h-4 w-4" />}>ویرایش</Button>
                  </Link>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResumeList