import Overflow from '@/components/performance/overflow';
import Waterfall from '@/components/performance/Waterfall';
import WebVitals from '@/components/performance/WebVitals';
import dayjs from 'dayjs';
import { DataType } from './data';

const baseUrl = process.env.NEXT_REQUEST_URL;
export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const startDate = dayjs().subtract(14, 'day').valueOf();
  const endDate = dayjs().valueOf();

  const url = `${baseUrl}/per/getPerformance?pid=${searchParams.pid}&startDate=${startDate}&endDate=${endDate}`;
  const result = await (await fetch(url, {})).json();
  const data = result.data as DataType[];
  return (
    <main className="p-6">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        性能预览
      </h2>
      <Overflow data={data} />
      <div className="my-5">
        <div className="text-xs py-4 px-5 text-[#002da0] border border-solid border-[#d5e7ff] rounded-none bg-[#d5e7ff]">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" mr-4"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>
              页面完全加载时间为TCP，DNS，SSL，TTFB，DOM解析和资源加载的时间之和
            </span>
          </div>
        </div>
      </div>
      <Waterfall />
      <WebVitals />
    </main>
  );
}
