"use client";
import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";

export default function Component() {
  const main = useRef<null | HTMLDivElement>(null);
  const child = useRef<null | HTMLDivElement>(null);
  const [hourData, setHourData] = useState("0");
  useEffect(() => {
    const myChart = echarts.init(main.current!);
    const option = {
      xAxis: {
        type: "category",
        //生成0-24数组
        data: Array.from({ length: 24 }, (_, i) => i),
      },
      yAxis: {
        type: "value",
        interval: 50,
      },
      series: [
        {
          //随机生成24个单元数据
          data: Array.from({ length: 24 }, () =>
            Math.floor(Math.random() * 100)
          ),
          type: "bar",
          barWidth: "40%",
        },
      ],
    };
    option && myChart.setOption(option);
    // 添加 'click' 事件监听器
    myChart.on("click", function (params) {
      console.log(params, "params");
      setHourData(params.name);
    });
  }, []);
  useEffect(() => {
    const chart = echarts.init(child.current!);
    const option = {
      xAxis: {
        type: "category",
        //生成0-24数组
        data: Array.from(
          { length: 60 },
          (_, i) => hourData + ":" + String(i).padStart(2, "0")
        ),
      },
      yAxis: {
        type: "value",
        interval: 50,
      },
      series: [
        {
          //随机生成24个单元数据
          data: Array.from({ length: 60 }, () =>
            Math.floor(Math.random() * 100)
          ),
          type: "bar",
          barWidth: "40%",
        },
      ],
    };
    option && chart.setOption(option);
    return () => {
      chart.dispose();
    };
  }, [hourData]);
  return (
    <div>
      <div ref={main} className="w-full h-[80px]"></div>
      <div ref={child} className="w-full h-[80px]"></div>
    </div>
  );
}
