'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import Image from 'next/image';
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandSeparator,
  CommandEmpty,
} from 'cmdk';
import useSWR from 'swr';
import { ProjectProp } from './data';
import { HttpResult } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateProjectForm from './create-project';
import { useState } from 'react';

export default function SearchSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const project_id = searchParams.get('pid');
  const [open, setOpen] = useState(false);
  const { data } = useSWR<HttpResult<ProjectProp[]>>(
    '/api/project?pageNum=1&pageSize=10',
    async (url: string) => {
      return await (await fetch(url, { method: 'GET' })).json();
    }
  );

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] h-9">
            <span className="relative flex shrink-0 overflow-hidden rounded-full mr-2 h-5 w-5">
              <Image
                src={'/personal.png'}
                alt="notfound"
                width={120}
                height={120}
                className=" aspect-square grayscale w-full h-full"
              />
            </span>
            {project_id
              ? data?.data?.find((o) => o.projectId === project_id)?.projectName
              : 'Select Project'}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-auto h-4 w-4 shrink-0 opacity-50"
            >
              <path
                d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[200px]">
          <Command className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <div className="flex items-center border-b px-3">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4 shrink-0 opacity-50"
                >
                  <path
                    d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <CommandInput
                  placeholder="Search Project"
                  className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <CommandEmpty className="py-6 text-center text-sm">
                No projects found
              </CommandEmpty>

              <CommandGroup
                className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                heading="Recent Projects"
              >
                {data?.data?.map((item) => {
                  return (
                    <CommandItem
                      value={item.projectId}
                      key={item.projectId}
                      className={cn(
                        'relative flex cursor-pointer  select-none items-center rounded-sm px-2 py-1.5 outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 text-sm',
                        {
                          'bg-accent text-accent-foreground':
                            item.projectId === project_id,
                        }
                      )}
                      onSelect={() => {
                        router.replace(`${pathname}?pid=${item.projectId}`);
                      }}
                    >
                      <span className="relative flex shrink-0 overflow-hidden rounded-full mr-2 h-5 w-5">
                        <Image
                          src={'/personal.png'}
                          alt="notfound"
                          width={120}
                          height={120}
                          className=" aspect-square grayscale w-full h-full"
                        />
                      </span>
                      {item.projectName}
                      {item.projectId === project_id && (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-auto h-4 w-4 opacity-100"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>

              <CommandSeparator className="-mx-1 h-px bg-border"></CommandSeparator>
            </CommandList>
            <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <CommandGroup className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                <Dialog
                  open={open}
                  onOpenChange={(open) => {
                    setOpen(open);
                  }}
                >
                  <DialogTrigger className="w-full">
                    <CommandItem className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 text-sm">
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
                        className="lucide lucide-circle-plus mr-2 h-5 w-5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                      </svg>
                      Create Team
                    </CommandItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新项目信息</DialogTitle>
                      <DialogDescription asChild>
                        <CreateProjectForm onCancel={() => setOpen(false)} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
