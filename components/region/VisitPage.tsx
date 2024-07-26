'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { DataTable } from '../ui/data-table';
import { columns } from './config';
import { DataType } from './data';

export default function VisitPage() {
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');

  const { data } = useSWR<DataType[]>(
    ['/api/getVisitPage', pid],
    async ([url, pid]) => {
      const startDate = dayjs().subtract(14, 'day').valueOf();
      const endDate = dayjs().valueOf();
      const result = await fetch(
        `${url}?pid=${pid}&startDate=${startDate}&endDate=${endDate}`,
        {}
      );
      const data = await result.json();
      return data;
    }
  );

  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>访问页面 TOP 视图 </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data || []} />
        </CardContent>
      </Card>
    </div>
  );
}
