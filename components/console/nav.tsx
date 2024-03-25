'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ResizablePanel } from '../ui/resizable';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const overflowNavItems = [
  {
    key: '/console',
    label: '概览',
    num: undefined,
    icon: (
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
        className="lucide lucide-box group-[[data-collapsed=false]]:mr-2 h-4 w-4"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    key: '/console/health',
    label: '健康状况',
    num: undefined,
    icon: (
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
        className="lucide lucide-heart-pulse group-[[data-collapsed=false]]:mr-2 h-4 w-4"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
      </svg>
    ),
  },
  {
    key: '/console/performance',
    label: '性能预览',
    icon: (
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
        className="lucide lucide-activity group-[[data-collapsed=false]]:mr-2 h-4 w-4"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    num: undefined,
  },
  {
    key: '/console/region',
    label: '地域统计',
    icon: (
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
        className="lucide lucide-earth group-[[data-collapsed=false]]:mr-2 h-4 w-4"
      >
        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
        <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
        <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    num: undefined,
  },
];

function OverflowNav() {
  const pathname = usePathname();

  return (
    <nav
      className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2
    "
    >
      {overflowNavItems.map((item) => {
        return (
          <Button
            key={item.key}
            variant="ghost"
            asChild
            className={cn({
              ' bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white':
                item.key === pathname,
            })}
          >
            <Link
              href={item.key}
              className={
                'group-[[data-collapsed=true]]:w-9 group-[[data-collapsed=true]]:h-9 group-[[data-collapsed=true]]:px-0 group-[[data-collapsed=true]]:py-0'
              }
            >
              {item.icon}
              <span
                className="
          group-[[data-collapsed=true]]:hidden
         inline-block
          "
              >
                {item.label}
              </span>
              <span
                className="ml-auto group-[[data-collapsed=true]]:hidden
         inline-block"
              >
                {item.num}
              </span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}

export function OverflowNavPanle() {
  const [collapsed, setCollapsed] = useState(false);

  const onResize = (size: number) => {
    if (size <= 4) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  return (
    <ResizablePanel
      defaultSize={20}
      maxSize={20}
      collapsible={true}
      collapsedSize={4}
      minSize={15}
      onResize={onResize}
    >
      <div
        data-collapsed={collapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <OverflowNav />
      </div>
    </ResizablePanel>
  );
}
