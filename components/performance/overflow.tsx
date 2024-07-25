'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { DataType } from '@/app/console/performance/data';

export default function Overflow({ data }: { data: DataType[] }) {
  const main = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!data || !main.current) return;
    const chart = echarts.init(main.current);

    const option = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        selected: {
          DNS: true,
          TCP: true,
          SSL: true,
          'DOM Parse': true,
          Response: true,
          Transfer: true,
          Resource: false,
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((item) =>
          dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
        ),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'DNS',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {},
          data: data.map((item) => item.dns),
        },
        {
          name: 'TCP',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {},
          data: data.map((item) => item.tcp),
        },
        {
          name: 'SSL',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {},
          data: data.map((item) => item.ssl),
        },
        {
          name: 'DOM Parse',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {},
          data: data.map((item) => item.domParse),
        },
        {
          name: 'Response',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {},
          data: data.map((item) => item.response),
        },
        {
          name: 'Transfer',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {},
          data: data.map((item) => item.transfer),
        },
        {
          name: 'Resource',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {},
          data: data.map((item) => item.resource),
        },
      ],
    };
    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>性能视图</CardTitle>
          <CardDescription>近14天内</CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={main} className="w-full h-[300px]"></div>
        </CardContent>
      </Card>
    </div>
  );
}
