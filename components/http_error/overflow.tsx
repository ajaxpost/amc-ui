'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ErrorChart from './items/error_chart';
import dayjs from 'dayjs';
import Survey from './items/survey';

export default function Overflow() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  const chartClick = (date: string) => {
    setDate(date);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>错误概览</CardTitle>
          <CardDescription>时间范围：默认是30天</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ErrorChart chartClick={chartClick} />
        </CardContent>
      </Card>
      <div className="mt-3">
        <Card>
          <CardHeader>
            <CardTitle>今日概况（{date}）</CardTitle>
          </CardHeader>
          <CardContent>
            <Survey date={date} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
