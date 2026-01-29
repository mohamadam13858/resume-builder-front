
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/store/resumeStore';

const formSchema = z.object({
  name: z.string().min(2, { message: 'نام حداقل ۲ حرف باشد' }),
  title: z.string().optional(),
  email: z.string().email({ message: 'ایمیل نامعتبر' }).optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
  summary: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PersonalForm() {
  const { data, updatePersonal } = useResumeStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data.personal,
  });

  function onSubmit(values: FormValues) {
    updatePersonal(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام و نام خانوادگی *</FormLabel>
              <FormControl>
                <Input placeholder="محمد احمدی" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان شغلی</FormLabel>
              <FormControl>
                <Input placeholder="مهندس نرم‌افزار" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ایمیل</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تلفن</FormLabel>
                <FormControl>
                  <Input placeholder="0912 xxx xxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>مکان</FormLabel>
              <FormControl>
                <Input placeholder="تهران، ایران" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>لینکدین</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>خلاصه (Summary)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="چند خط در مورد خودتان و تخصص‌تان بنویسید..."
                  className="min-h-[120]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          ذخیره اطلاعات شخصی
        </Button>
      </form>
    </Form>
  );
}