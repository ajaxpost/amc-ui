'use client';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { GitHub } from '../github';
import { ModeToggle } from '../mode-toggle';
import SearchSelect from './search-select';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');

  useEffect(() => {
    if (pathname === '/') return;
    if (!pid) {
      toast.error('请先选择项目', {
        description: '在左上角选择您要监控的项目,或者添加您的项目。',
      });
    }
  }, [pathname, pid]);

  return (
    <header className="border-b">
      <Toaster richColors closeButton />
      <div className="flex h-16 items-center px-4">
        <SearchSelect />
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href={'/console' + (pid ? `?pid=${pid}` : '')}
            className={cn(
              'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
              {
                'text-primary': pathname === '/console',
              }
            )}
          >
            概览
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            用户
          </Link>
          <Link
            href={'/error' + (pid ? `?pid=${pid}` : '')}
            className={cn(
              'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
              {
                'text-primary': pathname === '/error',
              }
            )}
          >
            JS错误
          </Link>
          <Link
            href={'/http_error' + (pid ? `?pid=${pid}` : '')}
            className={cn(
              'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
              {
                'text-primary': pathname === '/http_error',
              }
            )}
          >
            接口错误
          </Link>
          <Link
            href={'/api_monitor' + (pid ? `?pid=${pid}` : '')}
            className={cn(
              'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
              {
                'text-primary': pathname === '/api_monitor',
              }
            )}
          >
            API 监控
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <GitHub />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
