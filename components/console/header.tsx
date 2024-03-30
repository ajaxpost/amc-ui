'use client';
import { cn } from '@/lib/utils';
import { GitHub } from '../github';
import { ModeToggle } from '../mode-toggle';
import SearchSelect from './search-select';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');

  return (
    <header className="border-b">
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
            错误
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
