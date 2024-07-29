'use client';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ErrorListProps } from '../../data';
import { Badge } from '@/components/ui/badge';

function getTimeLabel(time: number) {
  const minute = dayjs().diff(time, 'minute');
  if (minute < 60) {
    return `${minute}分钟之前`;
  }
  const hour = dayjs().diff(time, 'hour');
  if (hour < 24) {
    return `${hour}小时之前`;
  }
  const day = dayjs().diff(time, 'day');
  if (day < 30) {
    return `${day}天之前`;
  }
  return '30天之前';
}

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
            <Badge variant="default">{getTimeLabel(time)}</Badge>
            <span className="ml-2">
              {dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
        </>
      );
    },
  },
];
