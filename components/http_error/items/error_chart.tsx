'use client';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { chartTheme } from '@/lib/chart-theme';
import { HttpErrorType } from '../data';

let chart: echarts.ECharts | null = null;
export default function ErrorChart({
  chartClick,
}: {
  chartClick: (date: string) => void;
}) {
  const { theme, systemTheme } = useTheme();

  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  const main = useRef<HTMLDivElement | null>(null);

  useSWR<HttpErrorType>(
    ['/api/http/getHttpErrorCountByDay', pid],
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
      onSuccess: (result) => {
        if (!result) return;
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

        const errorCount = getData('data', xData, result);
        const perErrorCount = getData('perData', xData, result);
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
              name: '发生次数',
              min: 0,
              interval: 5,
              axisLabel: {
                formatter: '{value}',
              },
            },
            {
              type: 'value',
              name: '错误率',
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
              name: '发生次数',
              type: 'bar',
              data: errorCount,
              stack: 'one',
            },
            {
              name: '错误率',
              type: 'line',
              tooltip: {
                valueFormatter: function (value: number) {
                  return value + '%';
                },
              },
              data: perErrorCount,
              yAxisIndex: 1,
            },
          ],
        };
        chart.on('click', (params) => {
          const name = params.name;
          chartClick(name);
        });
        chart.setOption(options);
      },
    }
  );

  function getData(
    dataStr: keyof HttpErrorType,
    xData: string[],
    data: HttpErrorType
  ) {
    const result = [];
    for (let i = 0; i < xData.length; i++) {
      const _data = data[dataStr];
      const find = _data.find(
        (o) => dayjs(o.day).format('MM-DD') === dayjs(xData[i]).format('MM-DD')
      );
      result.push(find ? find.count : 0);
    }
    return result;
  }

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

  return <div ref={main} className="h-[300px] w-full"></div>;
}
