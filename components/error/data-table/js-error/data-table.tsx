'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ErrorListProps } from '../../data';
import dayjs from 'dayjs';
import { createUrl } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { columns } from './columns';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Sheet } from '@/components/ui/sheet';
import SheetContent from './sheet-content';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function Componetn(porp: Props) {
  const { children } = porp;
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams(); //获取地址栏参数
  const pid = searchParams.get('pid');
  const errorId = searchParams.get('errorId');
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useSWR<ErrorListProps[]>(
    ['/api/error/getErrorList', pid],
    async ([url, pid]) => {
      const startDate = dayjs().subtract(1, 'month').valueOf();
      const endDate = dayjs().valueOf();
      return await (
        await fetch(
          createUrl(url, {
            pid,
            startDate,
            endDate,
            type: 'jsError',
          })
        )
      ).json();
    }
  );

  useEffect(() => {
    setOpen(!!errorId);
  }, [errorId]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-2">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    router.replace(
                      createUrl(pathname, {
                        pid,
                        errorId: row.original.errorId,
                      }),
                      {
                        scroll: false,
                      }
                    );
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Sheet
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            router.replace(
              createUrl(pathname, {
                pid,
              }),
              {
                scroll: false,
              }
            );
          }
        }}
      >
        {errorId && <SheetContent errorId={errorId}>{children}</SheetContent>}
      </Sheet>
    </div>
  );
}
