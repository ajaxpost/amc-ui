import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { GitHub } from '@/components/github';
import { TypeWriter } from '@/components/typewriter';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Home() {
  return (
    <>
      <div className="text-secondary-foreground bg-background fixed top-0 left-0 right-0 h-10 flex">
        <div className="flex-1 text-start p-2">
          <Link className="overflow-hidden " href="/">
            <h1 className="font-bold text-xl bg-muted w-[85px]">
              &nbsp;amc&nbsp;
              <span className="text-background bg-foreground">
                &nbsp;UI&nbsp;
              </span>
            </h1>
          </Link>
        </div>
        <div className="flex-1 text-end p-2">
          <div className=" inline-flex items-center">
            <GitHub />
            <ModeToggle />
          </div>
        </div>
      </div>
      <main className="min-h-screen">
        <div className="h-screen w-screen flex flex-col text-center justify-center">
          <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
            <span className="font-extrabold">amc 监控</span>，自研前端监控
          </h2>
          <p className="leading-7 mt-6 text-lg">
            <TypeWriter
              originalText={
                '前端监控平台，提供前端监控、性能监控、错误监控、用户行为监控等功能。'
              }
            />
          </p>
          <section className="mt-20 flex justify-center space-x-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-zap h-4 w-4"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                  &nbsp;开始使用
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>项目还在研发设计中...</AlertDialogTitle>
                  <AlertDialogDescription asChild>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      我们的项目正在进行紧张而有序的研发和设计工作中，我们正在全力以赴以带给您最优质的用户体验。请持续关注我们的更新，我们非常期待在不久的将来与您见面。
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>确定</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
        </div>
      </main>
    </>
  );
}
