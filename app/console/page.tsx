import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TodayFlowDataByTenMinProps, TodayType } from './data';
import dayjs from 'dayjs';
import UVCount from '@/components/console/uv-count';
import Trend from '@/components/console/trend';
import Comprehensive from '@/components/console/comprehensive';

const baseUrl = process.env.NEXT_REQUEST_URL;

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const url = `${baseUrl}/getTodayFlowDataByTenMin?pid=${searchParams.pid}`;
  const result = await (await fetch(url, {})).json();
  const data = result.data as TodayFlowDataByTenMinProps;
  // 今日访问量
  const todayHandler = (value: TodayType[]) => {
    return (
      <div className="text-[#363b52] font-bold text-4xl">
        {
          value.find((item) => {
            return item.day === dayjs().format('YYYY-MM-DD');
          })!.dayCount
        }
      </div>
    );
  };
  //增长率
  const countHandler = (todayValue: TodayType[]) => {
    const today = todayValue.find((item) => {
      return item.day === dayjs().format('YYYY-MM-DD');
    })!.dayCount;
    const yesterday =
      todayValue.find((item) => {
        return item.day !== dayjs().format('YYYY-MM-DD');
      })!.dayCount || 1;

    const growthRate = Number(
      (((today - yesterday) / yesterday) * 100).toFixed(2)
    );
    return growthRate > 0 ? (
      <span className="text-[#00af56]">上升 {Math.abs(growthRate)}%</span>
    ) : (
      <span className="text-[#f85149]">下降 {Math.abs(growthRate)}%</span>
    );
  };
  return (
    <main className="p-6">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        核心数据
      </h2>
      <div className="grid grid-cols-4 mt-3 gap-3">
        <Card>
          <CardHeader>
            <CardTitle>浏览量（PV）</CardTitle>
            <CardDescription>
              <span className="mr-2 text-[#999999]">较昨日</span>
              {countHandler(data.todayPvData)}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {todayHandler(data.todayPvData)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>访客数（UV）</CardTitle>
            <CardDescription>
              <span className="mr-2 text-[#999999]">较昨日</span>
              {countHandler(data.todayUvData)}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {todayHandler(data.todayUvData)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>新访客</CardTitle>
            <CardDescription>
              <span className="mr-2 text-[#999999]">较昨日</span>
              {countHandler(data.todayNewUvData)}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {todayHandler(data.todayNewUvData)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>IP 数</CardTitle>
            <CardDescription>
              <span className="mr-2 text-[#999999]">较昨日</span>
              {countHandler(data.todayIpData)}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {todayHandler(data.todayIpData)}
          </CardContent>
        </Card>
      </div>
      <UVCount></UVCount>
      <Trend></Trend>
      <Comprehensive></Comprehensive>
    </main>
  );
}
