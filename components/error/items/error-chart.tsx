'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { HttpResult } from '@/lib/data';
import { ErrorMapType } from '../data';
import { chartTheme } from '@/lib/chart-theme';
import { useTheme } from 'next-themes';

let chart: echarts.ECharts | null = null;
export default function ErrorChart() {
  const { theme, systemTheme } = useTheme();

  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  const main = useRef<HTMLDivElement | null>(null);

  useSWR<HttpResult<ErrorMapType>>(
    ['/api/error', pid],
    async ([url, pid]) => {
      const startDate = dayjs().subtract(30, 'day').valueOf();
      const endDate = dayjs().valueOf();

      return await (
        await fetch(
          url + `?pid=${pid}&startDate=${startDate}&endDate=${endDate}`,
          {
            method: 'GET',
          }
        )
      ).json();
    },
    {
      // 默认情况下是 2000 毫秒
      // 他会在 2000 毫秒内不重复请求
      // 但是我们这里是图表，不需要缓存
      // 所以设置为 0
      dedupingInterval: 0,
      revalidateOnMount: true,
      onSuccess: (data) => {
        if (data.code === 200) {
          const _theme = theme === 'system' ? systemTheme : theme;
          chart = echarts.init(
            main.current!,
            _theme === 'dark' ? 'dark' : 'essos'
          );
          const startDate = dayjs().subtract(30, 'day').valueOf();
          const endDate = dayjs().valueOf();

          const xData: string[] = [];
          for (let i = startDate; i <= endDate; i += 24 * 60 * 60 * 1000) {
            xData.push(dayjs(i).format('YYYY-MM-DD'));
          }

          const jsErrorData = getData('jsError', xData, data);

          const consoleErrorData = getData('console_error', xData, data);

          const jsErrorPer = getData('jsErrorPer', xData, data);

          const consoleErrorPer = getData('console_errorPer', xData, data);

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
              top: '15%',
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
                name: '错误数',
                min: 0,
                interval: 5,
                axisLabel: {
                  formatter: '{value}',
                },
              },
              {
                type: 'value',
                name: '错误占比',
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
                name: 'JS错误',
                type: 'bar',
                data: jsErrorData,
                stack: 'one',
              },
              {
                name: '自定义错误',
                type: 'bar',
                data: consoleErrorData,
                stack: 'one',
              },
              {
                name: 'JS错误占比',
                type: 'line',
                tooltip: {
                  valueFormatter: function (value: number) {
                    return value + '%';
                  },
                },
                data: jsErrorPer,
                yAxisIndex: 1,
              },
              {
                name: '自定义错误占比',
                type: 'line',
                tooltip: {
                  valueFormatter: function (value: number) {
                    return value + '%';
                  },
                },
                data: consoleErrorPer,
                yAxisIndex: 1,
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
    data: HttpResult<ErrorMapType>
  ) {
    const result = [];
    for (let i = 0; i < xData.length; i++) {
      const find = data.data?.[dataStr].find((item) => item.day === xData[i]);
      result.push(find?.count || find?.per || 0);
    }
    return result;
  }

  return <div ref={main} className="h-[300px] w-full"></div>;
}
