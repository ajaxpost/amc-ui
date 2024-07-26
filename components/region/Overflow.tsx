'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useRef } from 'react';
import * as echarts from 'echarts';

type DataType = {
  day: string;
  dayCount: number;
}[];

export default function Overflow() {
  const main = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  useSWR<DataType>(
    ['/api/getPv', pid],
    async ([url, pid]) => {
      const startDate = dayjs().subtract(14, 'day').valueOf();
      const endDate = dayjs().valueOf();
      const result = await fetch(
        `${url}?pid=${pid}&startDate=${startDate}&endDate=${endDate}`,
        {}
      );
      const data = await result.json();
      return data;
    },
    {
      onSuccess: (result) => {
        if (!result || !main.current) return;
        const chart = echarts.init(main.current);
        const option = {
          xAxis: {
            type: 'category',
            data: result.map((item) => item.day),
          },
          legend: {},
          tooltip: {
            trigger: 'axis',
          },
          yAxis: {
            type: 'value',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: 'PV',
              data: result.map((item) => item.dayCount),
              type: 'line',
            },
          ],
        };
        chart.setOption(option);
      },
    }
  );

  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>时间视图&nbsp;PV</CardTitle>
          <CardDescription>近14天内</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]" ref={main}></div>
        </CardContent>
      </Card>
    </div>
  );
}
