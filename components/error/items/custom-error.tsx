'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { createUrl } from '@/lib/utils';
import { HttpResult } from '@/lib/data';
import { ErrorHourMayType } from '../data';
import { useTheme } from 'next-themes';
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import { chartTheme } from '@/lib/chart-theme';

let chart: echarts.ECharts | null = null;
export default function CustomError() {
  const main = useRef<HTMLDivElement | null>(null);
  const { theme, systemTheme } = useTheme();

  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');

  useSWR<HttpResult<ErrorHourMayType>>(
    ['/api/error/hour/custom_error', pid],
    async ([_, pid]) => {
      return await (
        await fetch(
          createUrl('/api/error/hour', {
            pid,
          }),
          { method: 'GET' }
        )
      ).json();
    },
    {
      dedupingInterval: 0,
      onSuccess: (data) => {
        if (data.code === 200) {
          const _theme = theme === 'system' ? systemTheme : theme;
          chart = echarts.init(
            main.current!,
            _theme === 'dark' ? 'dark' : 'essos'
          );

          const startDate = dayjs().startOf('day').valueOf();
          const endDate = dayjs().endOf('day').valueOf();

          const xData: string[] = [];
          for (let i = startDate; i <= endDate; i += 60 * 60 * 1000) {
            xData.push(dayjs(i).format('HH:mm'));
          }

          const consoleErrorData = getData('console_error', xData, data);

          const options = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999',
                },
              },
            },
            legend: {},
            grid: {
              top: '10%',
              left: '3%',
              right: '3%',
              bottom: '0%',
              containLabel: true,
            },
            xAxis: [
              {
                type: 'category',
                data: xData,
                axisPointer: {
                  type: 'shadow',
                },
                splitLine: {
                  show: true,
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                min: 0,
                axisLabel: {
                  formatter: '{value}',
                },
              },
              {
                type: 'value',
                min: 0,
                max: 100,
                interval: 25,
                axisLabel: {
                  formatter: '{value} %',
                },
              },
            ],
            series: [
              {
                name: '错误量',
                type: 'bar',
                data: consoleErrorData,
                stack: 'one',
              },
            ],
          };

          chart.setOption(options);
        }
      },
    }
  );

  useEffect(() => {
    if (!chart) return;
    const themeConfig = {};
    const _theme = theme === 'system' ? systemTheme : theme;
    if (_theme === 'dark') {
      Object.assign(themeConfig, chartTheme.dark);
    } else {
      Object.assign(themeConfig, chartTheme.essos);
    }
    chart.setOption(themeConfig);
  }, [theme, systemTheme]);

  useEffect(() => {
    const resize = new ResizeObserver(() => {
      chart && chart.resize();
    });
    resize.observe(main.current!);
    return () => {
      chart && chart.dispose();
      chart = null;
      resize.disconnect();
    };
  }, []);

  function getData(
    dataStr: string,
    xData: string[],
    data: HttpResult<ErrorHourMayType>
  ) {
    const result = [];
    for (let i = 0; i < xData.length; i++) {
      const find = data.data?.[dataStr].find((item) => item.hour === xData[i]);
      result.push(find?.count || 0);
    }
    return result;
  }

  return <div ref={main} className="w-full h-[300px]"></div>;
}
