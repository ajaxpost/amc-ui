'use client';

import { useRef } from 'react';
import * as echarts from 'echarts';
import { Card, CardContent, CardHeader } from '../ui/card';
import useSWR from 'swr';
import { HttpResult } from '@/lib/data';
import { uvCountForMonth } from './data';
import { useSearchParams } from 'next/navigation';
import { createUrl } from '@/lib/utils';

export default function UVCount() {
  const main = useRef<null | HTMLDivElement>(null);
  const searchParams = useSearchParams();
  useSWR<HttpResult<uvCountForMonth>>(
    ['/api/uvCountForMonth', searchParams.get('pid')],
    async ([url, pid]) => {
      return await (
        await fetch(createUrl(url, { pid, timeSize: 30 }), { method: 'GET' })
      ).json();
    },
    {
      onSuccess: (data) => {
        if (data) {
          var myChart = echarts.init(main.current!);
          var option;

          option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            legend: {},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: [
              {
                type: 'category',
                data: data?.data?.uvData.map((item) => item.day),
              },
            ],
            yAxis: [
              {
                type: 'value',
              },
            ],
            series: [
              {
                name: '老用户',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series',
                },
                data: data?.data?.uvData.map((item) => item.dayCount),
              },
              {
                name: '新用户',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series',
                },
                data: data?.data?.newUvData.map((item) => item.dayCount),
              },
            ],
          };
          option && myChart.setOption(option);
        }
      },
    }
  );

  return (
    <div>
      <Card className="mt-4">
        <CardHeader>
          <h4>用户量统计</h4>
        </CardHeader>
        <CardContent ref={main} className="w-full h-[300px]"></CardContent>
      </Card>
    </div>
  );
}
