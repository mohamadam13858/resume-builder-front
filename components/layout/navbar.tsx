'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import {
  Home,
  FileText,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Palette,
  Moon,
  Sun
} from 'lucide-react'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import httpService from '@/service/httpService'
import { TokenService } from '@/service/tokenService'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const handleLogout = async () => {
    try {
      await httpService('/auth/logout', 'POST', {}, { withCredentials: true });
    } catch (err) {
      console.warn('Logout API failed, clearing local anyway', err);
    }

    TokenService.clearTokens();
    router.push('/login');
  };

  const navLinks = [
    { href: '/', label: 'خانه', icon: <Home className="h-5 w-5" /> },
    { href: '/dashboard', label: 'داشبورد', icon: <FileText className="h-5 w-5" /> },
    { href: '/builder', label: 'سازنده', icon: <FileText className="h-5 w-5" /> },
    { href: '/profile', label: 'پروفایل', icon: <User className="h-5 w-5" /> },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center ">
            <Link href="/" className="flex items-center gap-3 space-x-3 space-x-reverse">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                رزومه‌ساز
              </span>
            </Link>
          </div>


          <div className="hidden md:flex items-center space-x-4 space-x-reverse">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                <span className="ml-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}


            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-600 hover:text-primary transition-colors"
              title={darkMode ? 'حالت روشن' : 'حالت تاریک'}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>


            {isAuthenticated ? (
              <div className="flex items-center space-x-4 gap-4 space-x-reverse">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Avatar
                    src={user?.avatar}
                    initials={user?.name?.substring(0, 2)}
                    size="sm"
                  />
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="h-4 w-4" />}
                >
                  <span className='mr-1.5'>خروج</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 space-x-3 space-x-reverse">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    ورود
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    ثبت‌نام
                  </Button>
                </Link>
              </div>
            )}
          </div>


          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="ml-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}


            <div className="border-t border-gray-200 my-2" />


            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse px-3 py-2">
                  <Avatar
                    src={user?.avatar}
                    initials={user?.name?.substring(0, 2)}
                    size="sm"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  leftIcon={<LogOut className="h-4 w-4" />}
                >
                  خروج
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" fullWidth>
                    ورود
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button fullWidth>
                    ثبت‌نام
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar