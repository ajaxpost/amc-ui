'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import dayjs from 'dayjs';
import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';

const formSchema = z.object({
  project_name: z.string().min(1, { message: '请填写项目名称' }),
  project_id: z.string().min(1, { message: '项目唯一标识' }),
  project_desc: z.string(),
});

interface IProps {
  onCancel: () => void;
}

export default function CreateProjectForm({ onCancel }: IProps) {
  // 一个类型 useSWR + mutation 的 hook
  // 但是他不会自动发送请求
  const { trigger, isMutating } = useSWRMutation(
    '/api/project',
    async (url, { arg }: { arg: Record<string, string> }) => {
      return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_name: '',
      project_desc: '',
      project_id: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const obj = {
      ...values,
      create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    const result = await trigger(obj);
    const data = await result.json();

    if (data.code === 200) {
      mutate('/api/project?pageNum=1&pageSize=10');
      onCancel();
    }
  }

  return (
    <Form {...form}>
      {isMutating ? 'loading' : null}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="project_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="Project ID" {...field} />
              </FormControl>
              <FormDescription>项目唯一标识,探针apiKey</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>项目名称</FormLabel>
              <FormControl>
                <Input placeholder="Project Name" {...field} />
              </FormControl>
              <FormDescription>项目名称是您的公开显示名称。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project_desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>项目描述</FormLabel>
              <FormControl>
                <Textarea placeholder="desc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
