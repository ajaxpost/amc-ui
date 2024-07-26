import { ColumnDef } from '@tanstack/react-table';
import { DataType } from './data';

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: 'key',
    header: '编号',
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: 'name',
    header: '页面URL',
  },
  {
    accessorKey: 'count',
    header: '页面访问量',
  },
];
