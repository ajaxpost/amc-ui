'use client';
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import * as echarts from 'echarts';
import useSWR from 'swr';
import { createUrl } from '@/lib/utils';
import { HttpResult } from '@/lib/data';
import { getPvCountByHour } from './data';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import clsx from 'clsx';

const reqObj: Record<string, string> = {
  页面访问量趋势: '/api/getPvCountByHour',
  用户活跃量趋势: '/api/getUvCountByHour',
  新用户活跃量趋势: '/api/getNewCustomerCountByHour',
};

export default function TrendChard({ title }: { title: string }) {
  const chartRef = useRef(null);
  const searchParams = useSearchParams();
  const [trendProportion, setTrendProportion] = useState(0);
  useSWR<HttpResult<getPvCountByHour>>(
    [reqObj[title], searchParams.get('pid')],
    async ([url, pid]) => {
      return await (
        await fetch(createUrl(url, { pid, scope: 7 }), {
          method: 'GET',
        })
      ).json();
    },
    {
      onSuccess: (data) => {
        let sevenTotal =
          data.data?.seven.reduce((prev, cur) => {
            return prev + cur.count;
          }, 0) || 0;
        let dataTotal =
          data.data?.today.reduce((prev, cur) => {
            return prev + cur.count;
          }, 0) || 0;
        setTrendProportion(
          ((dataTotal - sevenTotal) / (sevenTotal || 1)) * 100
        );
        var myChart = echarts.init(chartRef.current);
        var option;

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.data?.today.map((item) => item.hour),
          },
          grid: {
            top: '3%',
            left: '3%',
            right: '3%',
            bottom: '0%',
            containLabel: true,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: data.data?.seven.map((item) => item.count),
              type: 'line',
              name: '上周',
              smooth: true,
              areaStyle: {},
            },
            {
              data: data.data?.today.map((item) => item.count),
              type: 'line',
              name: '本周',
              smooth: true,
              areaStyle: {},
            },
          ],
        };

        option && myChart.setOption(option);
        const reSize = new ResizeObserver(() => {
          myChart.resize();
        });
        reSize.observe(chartRef.current!);
        return () => {
          reSize.unobserve(chartRef.current!);
        };
      },
    }
  );

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between p-4">
        <div>
          <h4>{title}</h4>
          <span className="text-[12px] text-[#a3a5b0]">
            {dayjs().format('YYYY-MM-DD')}
          </span>
        </div>
        <div>
          <div
            className={clsx('text-[16px]  font-bold', {
              'text-[#f44336]': trendProportion > 0,
              'text-[#4caf50]': trendProportion < 0,
            })}
          >
            {trendProportion}%
          </div>
          <div className="text-[12px] text-[#a3a5b0]">较一周前</div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div ref={chartRef} className="w-full h-[300px]"></div>
      </CardContent>
    </Card>
  );
}
