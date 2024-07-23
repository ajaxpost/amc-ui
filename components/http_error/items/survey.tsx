'use client';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { ErrorStatusType } from '../data';

const map = {
  404: 'linear-gradient(315deg,#7eabfc,#4d6ebe)',
  401: 'linear-gradient(315deg,#7eabfc,#4873f8)',
  503: 'linear-gradient(327deg,#71e1df,#23ccc9)',
  500: 'linear-gradient(156deg,#f2833f,rgba(255,230,78,.8))',
};

export default function Survey({ date }: { date: string }) {
  const searchParams = useSearchParams();
  const pid = searchParams.get('pid');

  const { data } = useSWR<ErrorStatusType[]>(
    ['/api/http/getStatusListGroupByErrorCode', pid, date],
    async ([url, pid, date]) => {
      return await (await fetch(url + `?pid=${pid}&date=${date}`)).json();
    }
  );

  return (
    <div className="w-full overflow-auto whitespace-nowrap ">
      {data?.length ? (
        data?.map((item) => {
          return (
            <span
              key={item.status}
              className=" flex justify-center items-center  w-[200px] h-[108px] bg-[#fafafa] rounded-sm mr-4 py-6 px-5 box-border"
            >
              <span
                style={{
                  background:
                    // @ts-ignore
                    map[item.status] ||
                    'linear-gradient(315deg,#7eabfc,#4d6ebe)',
                }}
                className="  w-[60px] h-[60px] leading-[60px] mr-4 text-center text-base font-semibold text-white rounded-full"
              >
                {item.status}
              </span>
              <span className="  text-3xl font-bold text-[#333] leading-[32px] h-[60px]">
                {item.count}
                <span className="text-[#999] block font-normal text-sm">
                  发生次数
                </span>
              </span>
            </span>
          );
        })
      ) : (
        <p>暂无数据</p>
      )}
    </div>
  );
}
