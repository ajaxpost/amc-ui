import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import * as echarts from "echarts";
import useSWR from "swr";
import { createUrl } from "@/lib/utils";
import { HttpResult } from "@/lib/data";
import { comprehensiveProps } from "./data";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

const reqObj: Record<string, string> = {
  浏览器访问量: "/api/getBrowserNameCountOrderByCount",
  城市访问量: "/api/getCityCountOrderByCount",
  页面停留时长: "/api/getResidenceTimeCountOrderByCount",
  页面访问量: "/api/getSimpleUrlCountOrderByCount",
};

export default function ComprehensiveChart({
  title,
  topCount,
  topDays,
}: {
  title: string;
  topCount: string;
  topDays: string;
}) {
  const chartRef = useRef(null);
  const searchParams = useSearchParams();
  useSWR<HttpResult<comprehensiveProps[]>>(
    [reqObj[title], searchParams.get("pid"), topDays, topCount],
    async ([url, pid, topDays, topCount]) => {
      return await (
        await fetch(createUrl(url, { pid, topDays, topCount }), {
          method: "GET",
        })
      ).json();
    },
    {
      onSuccess: (data) => {
        var myChart = echarts.init(chartRef.current);
        var option;
        option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            top: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            position: "top",
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: "category",
            data:
              title === "浏览器访问量"
                ? data.data?.map((item) => JSON.parse(item.showName).browser)
                : data.data?.map((item) => item.showName),
          },
          series: [
            {
              //   name: "2011",
              type: "bar",
              data: data.data?.map((item) => item.count),
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
      },
    }
  );

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between p-4">
        <div>
          <h4>{title + `Top ${topCount}`}</h4>
          <span className="text-[12px] text-[#a3a5b0]">
            {dayjs().format("YYYY-MM-DD")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div ref={chartRef} className="w-full h-[300px]"></div>
      </CardContent>
    </Card>
  );
}
