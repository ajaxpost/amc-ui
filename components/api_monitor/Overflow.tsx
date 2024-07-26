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

export default function Overflow() {
  const main = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');

  const { data } = useSWR(
    ['/api/http/getHttpOverflow', pid],
    async ([url, pid]) => {
      const startDate = dayjs().subtract(14, 'day').valueOf();
      const endDate = dayjs().valueOf();
      const res = await fetch(
        url + `?pid=${pid}&startDate=${startDate}&endDate=${endDate}`,
        { method: 'GET' }
      );
      return res.json();
    },
    {
      onSuccess: (result) => {
        if (!result || !main.current) return;
        const chart = echarts.init(main.current);
        const option = {
          tooltip: {
            trigger: 'axis',
          },
          legend: {},
          grid: {
            left: '3%',
            right: '3%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: result.map((item: any) => item.day),
          },
          yAxis: [
            {
              type: 'value',
              name: '耗时(ms)',
              axisLabel: {
                formatter: '{value} ms',
              },
            },
            {
              type: 'value',
              name: '成功率(%)',
              min: 0,
              max: 100,
              axisLabel: {
                formatter: '{value} %',
              },
            },
          ],
          series: [
            {
              name: '耗时(ms)',
              data: result.map((item: any) => item.timeStamp),
              type: 'bar',
            },
            {
              name: '样本数',
              data: result.map((item: any) => item.count),
              type: 'line',
            },
            {
              name: 'HTTP 成功率(%)',
              data: result.map((item: any) => item.successRate),
              type: 'line',
              yAxisIndex: 1,
            },
          ],
        };
        chart.setOption(option);
      },
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>API 性能</CardTitle>
        <CardDescription>时间范围：14天</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]" ref={main}></div>
      </CardContent>
    </Card>
  );
}
