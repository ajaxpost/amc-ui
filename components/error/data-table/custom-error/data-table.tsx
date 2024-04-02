'use client';

import useSWR from 'swr';
import { ErrorListProps } from '../../data';
import dayjs from 'dayjs';
import { createUrl } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

export default function Componetn() {
  const searchParams = useSearchParams();
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

  return (
    <div className="mt-2">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
