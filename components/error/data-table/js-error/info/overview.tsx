import { ErrorType } from "@/components/error/data";
import ChartView from "./chart-view";

const baseUrl = process.env.NEXT_REQUEST_URL;
export default async function Component({
  errorData,
}: {
  errorData: ErrorType;
}) {
  const url = `${baseUrl}/error/getErrorCountByNum?errorId=${errorData?.errorId}&pid=${errorData?.apiKey}&errorMsg=${errorData?.errorMsg}`;
  const result = await (await fetch(url)).json();
  return (
    <div>
      <h4>数据概况</h4>
      <div className="flex mt-4">
        <div className="bg-[#f7f7f7] w-2/5 mr-4 p-4">
          <div className="text-[24px] font-medium">{result.data?.c1}</div>
          <div className="text-[14px] text-[#999]">发生总次数</div>
        </div>
        <div className="bg-[#f7f7f7]  w-2/5 p-4">
          <div className="text-[24px] font-medium">{result.data?.c2}</div>
          <div className="text-[14px] text-[#999]">影响用户数</div>
        </div>
      </div>
      <div className="mt-4">
        <h4>报错趋势</h4>
        <ChartView errorData={errorData}></ChartView>
      </div>
    </div>
  );
}
