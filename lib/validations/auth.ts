import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'ایمیل الزامی است')
    .email('ایمیل معتبر وارد کنید'),
  password: z
    .string()
    .min(1, 'رمز عبور الزامی است')
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  rememberMe: z.boolean().optional()
})

export type LoginFormData = z.infer<typeof loginSchema>


export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, 'نام و نام خانوادگی الزامی است')
    .min(3, 'نام باید حداقل ۳ کاراکتر باشد'),
  email: z
    .string()
    .min(1, 'ایمیل الزامی است')
    .email('ایمیل معتبر وارد کنید'),
  password: z
    .string()
    .min(1, 'رمز عبور الزامی است')
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
    .regex(/[A-Z]/, 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد')
    .regex(/[0-9]/, 'رمز عبور باید حداقل یک عدد داشته باشد'),
  confirmPassword: z
    .string()
    .min(1, 'تکرار رمز عبور الزامی است'),
  agreeToTerms: z
    .boolean()
    .refine(val => val === true, {
      message: 'باید با قوانین موافقت کنید'
    })
}).refine(data => data.password === data.confirmPassword, {
  message: 'رمز عبور و تکرار آن باید یکسان باشد',
  path: ['confirmPassword']
})

export type RegisterFormData = z.infer<typeof registerSchema>