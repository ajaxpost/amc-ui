'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { DataTable } from '../ui/data-table';
import { columns } from './config';

const baseUrl = process.env.NEXT_REQUEST_URL;
export default function API_TOP() {
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  const { data } = useSWR(['/api/http/getHttpTop', pid], async ([url, pid]) => {
    const result = await fetch(`${url}?pid=${pid}`, {});
    const data = await result.json();
    return data;
  });

  console.log(data, 'data');

  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>API 请求 TOP 视图 </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data || []} />
        </CardContent>
      </Card>
    </div>
  );
}
