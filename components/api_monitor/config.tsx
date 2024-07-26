import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'URL',
    header: 'API 地址',
    cell: ({ row }) => {
      return row.original.httpInfo.url;
    },
  },
  {
    accessorKey: 'timeStamp',
    header: '请求耗时(平均值)',
    cell: ({ row }) => {
      return row.original.timeStamp + 'ms';
    },
  },
  {
    accessorKey: 'successRate',
    header: 'HTTP 成功率',
    cell: ({ row }) => {
      return row.original.successRate + '%';
    },
  },
];
