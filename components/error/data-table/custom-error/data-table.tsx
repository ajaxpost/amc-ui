'use client';

import useSWR from 'swr';
import { ErrorListProps } from '../../data';
import dayjs from 'dayjs';
import { createUrl } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { columns } from './columns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function Component() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pid = searchParams.get('pid');
  const { data } = useSWR<ErrorListProps[]>(
    ['/api/error/getErrorList/console_error', pid],
    async ([_, pid]) => {
      const startDate = dayjs().subtract(1, 'hour').valueOf();
      const endDate = dayjs().valueOf();
      return await (
        await fetch(
          createUrl('/api/error/getErrorList', {
            pid,
            startDate,
            endDate,
            type: 'console_error',
          })
        )
      ).json();
    }
  );

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
    </div>
  );
}
