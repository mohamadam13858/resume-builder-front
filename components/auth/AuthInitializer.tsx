'use client'

import { TokenService } from '@/service/tokenService'
import { useEffect } from 'react'

export default function AuthInitializer() {
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (TokenService.shouldRefreshToken(300)) {
        console.log('AuthInitializer → توکن نیاز به رفرش دارد (چک اولیه)')
        try {
          await TokenService.attemptProactiveRefresh?.()
          console.log('رفرش اولیه با موفقیت انجام شد')
        } catch (err) {
          console.warn('رفرش اولیه ناموفق بود → پاک کردن توکن‌ها', err)
          TokenService.clearTokens()
        }
      } else {
        console.log('توکن هنوز معتبر است (چک اولیه)')
      }
    }

    checkAndRefreshToken()
  }, []) 


  return null
}