'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import './web-vitals.css';
import dayjs from 'dayjs';

type DataType = {
  name: string;
  value: number;
}[];

export default function WebVitals() {
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');
  const { data } = useSWR<DataType>(
    ['/api/per/getWebVitals', pid],
    async ([url, pid]) => {
      const startDate = dayjs().subtract(14, 'day').valueOf();
      const endDate = dayjs().valueOf();
      const result = await fetch(
        `${url}?pid=${pid}&startDate=${startDate}&endDate=${endDate}`,
        {}
      );
      const data = await result.json();
      return data;
    }
  );

  function getVitalsValue(name: string) {
    if (!data) return 0;
    return data.find((o) => o.name === name)?.value;
  }

  function getLevalNum(v: number) {
    if (v === 0) return [0.1, 0.8];
    if (v < 100)
      return [Math.floor((v + 100) / 10) * 10, Math.floor((v + 300) / 10) * 10];
    const v1 = v * 2;

    return [Math.floor(v1 / 100) * 100, Math.floor((v1 + v) / 100) * 100];
  }
  const LCP = getVitalsValue('LCP');
  const LCPLeval = getLevalNum(LCP!);
  const FID = getVitalsValue('FID');
  const FIDLeval = getLevalNum(FID!);
  const CLS = getVitalsValue('CLS');
  const CLSLeval = getLevalNum(CLS!);
  const FCP = getVitalsValue('FCP');
  const FCPLeval = getLevalNum(FCP!);

  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>Core Web Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex pb-[50px] flex-wrap justify-between list-none">
            <li className="flex flex-col min-w-[280px] mx-[20px] mb-[80px]">
              <div className="text-[#0ace6b] text-[30px] font-bold text-center">
                {LCP}ms
              </div>
              <div className="text-[#2a7aff] text-[20px] font-bold text-center mb-5">
                <span className=" underline">LCP</span>
              </div>
              <div className="flex relative">
                <div className="bg-[#0ace6b] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    {LCPLeval[0]}ms
                  </div>
                  <div className="pointer current absolute right-1/2 text-[#2a7aff] -bottom-[70px] translate-x-1/2 z-10">
                    {LCP}ms
                  </div>
                  GOOD
                </div>
                <div className="bg-[#ffa400] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    {LCPLeval[1]}ms
                  </div>
                  NEEDS
                  <br />
                  IMPROVEMENT
                </div>
                <div className="bg-[#ff4f42] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  POOR
                </div>
              </div>
            </li>
            <li className="flex flex-col min-w-[280px] mx-[20px] mb-[80px]">
              <div className="text-[#0ace6b] text-[30px] font-bold text-center">
                {FID}ms
              </div>
              <div className="text-[#2a7aff] text-[20px] font-bold text-center mb-5">
                <span className=" underline">FID</span>
              </div>
              <div className="flex relative">
                <div className="bg-[#0ace6b] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    {FIDLeval[0]}ms
                  </div>
                  <div className="pointer current absolute right-1/2 text-[#2a7aff] -bottom-[70px] translate-x-1/2 z-10">
                    {FID}ms
                  </div>
                  GOOD
                </div>
                <div className="bg-[#ffa400] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    {FIDLeval[1]}ms
                  </div>
                  NEEDS
                  <br />
                  IMPROVEMENT
                </div>
                <div className="bg-[#ff4f42] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  POOR
                </div>
              </div>
            </li>
            <li className="flex flex-col min-w-[280px] mx-[20px] mb-[80px]">
              <div className="text-[#0ace6b] text-[30px] font-bold text-center">
                {CLS}
              </div>
              <div className="text-[#2a7aff] text-[20px] font-bold text-center mb-5">
                <span className=" underline">CLS</span>
              </div>
              <div className="flex relative">
                <div className="bg-[#0ace6b] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    {CLSLeval[0]}
                  </div>
                  <div className="pointer current absolute right-1/2 text-[#2a7aff] -bottom-[70px] translate-x-1/2 z-10">
                    {CLS}
                  </div>
                  GOOD
                </div>
                <div className="bg-[#ffa400] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    {CLSLeval[1]}
                  </div>
                  NEEDS
                  <br />
                  IMPROVEMENT
                </div>
                <div className="bg-[#ff4f42] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  POOR
                </div>
              </div>
            </li>
            <li className="flex flex-col min-w-[280px] mx-[20px] mb-[80px]">
              <div className="text-[#0ace6b] text-[30px] font-bold text-center">
                {FCP}ms
              </div>
              <div className="text-[#2a7aff] text-[20px] font-bold text-center mb-5">
                <span className=" underline">FCP</span>
              </div>
              <div className="flex relative">
                <div className="bg-[#0ace6b] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    {FCPLeval[0]}ms
                  </div>
                  <div className="pointer current absolute right-1/2 text-[#2a7aff] -bottom-[70px] translate-x-1/2 z-10">
                    {FCP}ms
                  </div>
                  GOOD
                </div>
                <div className="bg-[#ffa400] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    {FCPLeval[1]}ms
                  </div>
                  NEEDS
                  <br />
                  IMPROVEMENT
                </div>
                <div className="bg-[#ff4f42] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  POOR
                </div>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
