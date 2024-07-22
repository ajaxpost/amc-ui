'use client';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ErrorListProps } from '../../data';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<ErrorListProps>[] = [
  {
    accessorKey: 'errorMsg',
    header: '最新错误（1个月内）',
    cell: ({ row }) => {
      const data = row.original as ErrorListProps;
      const time = data.time;

      return (
        <>
          <h1>{row.getValue('errorMsg')}</h1>
          <div className="mt-2">
            <Badge variant="default">
              {dayjs().diff(time, 'minute')}分钟之前
            </Badge>
            <span className="ml-2">
              {dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
        </>
      );
    },
  },
];
