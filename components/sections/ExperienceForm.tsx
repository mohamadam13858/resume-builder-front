
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
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
import { Trash2, Plus } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';

const experienceSchema = z.object({
  company: z.string().min(1, 'نام شرکت الزامی است'),
  position: z.string().min(1, 'عنوان شغلی الزامی است'),
  startDate: z.string().min(1, 'تاریخ شروع الزامی است'),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const formSchema = z.object({
  experiences: z.array(experienceSchema).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } = useResumeStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experiences: data.experiences,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'experiences',
  });

  const onSubmit = (values: FormValues) => {
    console.log('ذخیره شد:', values);
  };

  const handleChange = (index: number, field: keyof z.infer<typeof experienceSchema>, value: string) => {
    const exp = data.experiences[index];
    if (exp) {
      updateExperience(exp.id, { [field]: value });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-5 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">تجربه {index + 1}</h3>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => {
                  remove(index);
                  removeExperience(data.experiences[index]?.id || '');
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>شرکت / سازمان</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={data.experiences[index]?.company || ''}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>عنوان شغلی</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={data.experiences[index]?.position || ''}
                    onChange={(e) => handleChange(index, 'position', e.target.value)}
                  />
                </FormControl>
              </FormItem>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>تاریخ شروع</FormLabel>
                <FormControl>
                  <Input
                    type="month"
                    defaultValue={data.experiences[index]?.startDate || ''}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>تاریخ پایان</FormLabel>
                <FormControl>
                  <Input
                    type="month"
                    defaultValue={data.experiences[index]?.endDate || ''}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  />
                </FormControl>
              </FormItem>
            </div>

            <FormItem>
              <FormLabel>توضیحات / دستاوردها</FormLabel>
              <FormControl>
                <Textarea
                  defaultValue={data.experiences[index]?.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows={4}
                />
              </FormControl>
            </FormItem>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() =>
            append({
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              description: '',
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" /> اضافه کردن تجربه جدید
        </Button>

      </form>
    </Form>
  );
}