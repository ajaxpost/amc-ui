import ChartView from "./chart-view";

export default async function Component() {
  return (
    <div>
      <h4>数据概况</h4>
      <div className="flex mt-4">
        <div className="bg-[#f7f7f7] w-2/5 mr-4 p-4">
          <div className="text-[24px] font-medium">1326</div>
          <div className="text-[14px] text-[#999]">发生总次数</div>
        </div>
        <div className="bg-[#f7f7f7]  w-2/5 p-4">
          <div className="text-[24px] font-medium">1080</div>
          <div className="text-[14px] text-[#999]">影响用户数</div>
        </div>
      </div>
      <div className="mt-4">
        <h4>报错趋势</h4>
        <ChartView></ChartView>
      </div>
    </div>
  );
}
