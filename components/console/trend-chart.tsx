import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import * as echarts from "echarts";

export default function TrendChard({ title }: { title: string }) {
  const chartRef = useRef(null);
  useEffect(() => {
    var myChart = echarts.init(chartRef.current);
    var option;

    option = {
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      grid: {
        top: "3%",
        left: "3%",
        right: "3%",
        bottom: "0%",
        containLabel: true,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {},
        },
      ],
    };

    option && myChart.setOption(option);
    const reSize = new ResizeObserver(() => {
      myChart.resize();
    });
    reSize.observe(chartRef.current!);
    return () => {
      reSize.unobserve(chartRef.current!);
    };
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between p-4">
        <div>
          <h4>{title}</h4>
          <span className="text-[12px] text-[#a3a5b0]">2024-04-22</span>
        </div>
        <div>
          <div className="text-[16px] text-[#f85149] font-bold">0.36%</div>
          <div className="text-[12px] text-[#a3a5b0]">较一周前</div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div ref={chartRef} className="w-full h-[300px]"></div>
      </CardContent>
    </Card>
  );
}
