import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SheetContent } from '@/components/ui/sheet';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { createUrl } from '@/lib/utils';
import dayjs from 'dayjs';
import useSWR from 'swr';
import ErrorReplay from './info/error-replay';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import BehaTrace from './info/beha-trace';
import { ErrorType } from '../../data';

/**
 *   1. 客户端组件中不能导入服务器组件,只能是客户端组件中使用客户端组件
 *   2. 但是你可以通过客户端组件的Props来传递一个服务端组件,这样是可以使用的
 *        在父组件的时候,他们会并行处理
 */
export default function Component({
  errorId,
  children,
}: {
  errorId: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSWR<ErrorType>(
    ['/api/error/getErrorById', errorId],
    async ([url, errorId]) => {
      return await (
        await fetch(
          createUrl(url, {
            errorId,
          })
        )
      ).json();
    }
  );

  const onOpenChange = (open: boolean) => {
    if (open) {
      router.replace(
        createUrl(
          pathname,
          {
            screenId: data?.recordScreenId,
          },
          searchParams
        ),
        {
          scroll: false,
        }
      );
    } else {
      router.replace(
        createUrl(
          pathname,
          {
            screenId: '',
          },
          searchParams
        ),
        {
          scroll: false,
        }
      );
    }
  };

  return (
    <SheetContent className="w-10/12 sm:max-w-full overflow-auto p-0">
      <SheetHeader className="p-6">
        <SheetTitle>{data?.errorMsg}</SheetTitle>
        <SheetDescription>
          <span className="text-sm font-normal flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock mr-2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {dayjs(data?.time).format('YYYY-MM-DD')}
          </span>
        </SheetDescription>
        <SheetDescription className="mt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size={'sm'} className="mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-line-chart mr-2"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                行为轨迹
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">
              <DialogHeader>
                <DialogTitle>行为轨迹</DialogTitle>
              </DialogHeader>
              <BehaTrace breadCrumb={data?.breadCrumb} />
            </DialogContent>
          </Dialog>
          <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
              <Button variant="outline" size={'sm'} className="mr-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 3v18" />
                  <path d="M3 7.5h4" />
                  <path d="M3 12h18" />
                  <path d="M3 16.5h4" />
                  <path d="M17 3v18" />
                  <path d="M17 7.5h4" />
                  <path d="M17 16.5h4" />
                </svg>
                错误回放
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] ">
              <DialogHeader>
                <DialogTitle>错误回放</DialogTitle>
              </DialogHeader>
              <ErrorReplay />
            </DialogContent>
          </Dialog>
        </SheetDescription>
      </SheetHeader>
      {children}
    </SheetContent>
  );
}
