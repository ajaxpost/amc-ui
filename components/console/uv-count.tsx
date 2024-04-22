"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Card, CardContent, CardHeader } from "../ui/card";
import useSWR from "swr";
import { HttpResult } from "@/lib/data";
import { uvCountForMonth } from "./data";
import { useSearchParams } from "next/navigation";
import { pid } from "process";
import { createUrl } from "@/lib/utils";

const data = {
  uvData: [
    {
      day: "04-11",
      count: 480201,
    },
    {
      day: "04-10",
      count: 263870,
    },
    {
      day: "04-09",
      count: 163107,
    },
    {
      day: "04-08",
      count: 112373,
    },
    {
      day: "04-07",
      count: 357200,
    },
    {
      day: "04-06",
      count: 182980,
    },
    {
      day: "04-05",
      count: 262914,
    },
    {
      day: "04-04",
      count: 158839,
    },
    {
      day: "04-03",
      count: 370983,
    },
    {
      day: "04-02",
      count: 431187,
    },
    {
      day: "04-01",
      count: 241011,
    },
    {
      day: "03-31",
      count: 332443,
    },
    {
      day: "03-30",
      count: 370590,
    },
    {
      day: "03-29",
      count: 332571,
    },
    {
      day: "03-28",
      count: 365351,
    },
    {
      day: "03-27",
      count: 313332,
    },
    {
      day: "03-26",
      count: 344764,
    },
    {
      day: "03-25",
      count: 171157,
    },
    {
      day: "03-24",
      count: 275456,
    },
    {
      day: "03-23",
      count: 245374,
    },
    {
      day: "03-22",
      count: 373047,
    },
    {
      day: "03-21",
      count: 156387,
    },
    {
      day: "03-20",
      count: 111926,
    },
    {
      day: "03-19",
      count: 113450,
    },
    {
      day: "03-18",
      count: 164004,
    },
    {
      day: "03-17",
      count: 242577,
    },
    {
      day: "03-16",
      count: 263472,
    },
    {
      day: "03-15",
      count: 158499,
    },
    {
      day: "03-14",
      count: 370227,
    },
    {
      day: "03-13",
      count: 195977,
    },
  ],
  newUvData: [
    {
      day: "04-11",
      count: 157922,
    },
    {
      day: "04-10",
      count: 146003,
    },
    {
      day: "04-09",
      count: 110371,
    },
    {
      day: "04-08",
      count: 168837,
    },
    {
      day: "04-07",
      count: 110748,
    },
    {
      day: "04-06",
      count: 163520,
    },
    {
      day: "04-05",
      count: 123164,
    },
    {
      day: "04-04",
      count: 195473,
    },
    {
      day: "04-03",
      count: 194910,
    },
    {
      day: "04-02",
      count: 198077,
    },
    {
      day: "04-01",
      count: 172965,
    },
    {
      day: "03-31",
      count: 119726,
    },
    {
      day: "03-30",
      count: 128456,
    },
    {
      day: "03-29",
      count: 102262,
    },
    {
      day: "03-28",
      count: 125740,
    },
    {
      day: "03-27",
      count: 107483,
    },
    {
      day: "03-26",
      count: 195197,
    },
    {
      day: "03-25",
      count: 107682,
    },
    {
      day: "03-24",
      count: 193155,
    },
    {
      day: "03-23",
      count: 148440,
    },
    {
      day: "03-22",
      count: 160674,
    },
    {
      day: "03-21",
      count: 118583,
    },
    {
      day: "03-20",
      count: 185918,
    },
    {
      day: "03-19",
      count: 158840,
    },
    {
      day: "03-18",
      count: 148444,
    },
    {
      day: "03-17",
      count: 105366,
    },
    {
      day: "03-16",
      count: 110361,
    },
    {
      day: "03-15",
      count: 199563,
    },
    {
      day: "03-14",
      count: 113735,
    },
    {
      day: "03-13",
      count: 128745,
    },
  ],
};

export default function UVCount() {
  const main = useRef<null | HTMLDivElement>(null);
  const searchParams = useSearchParams();
  useSWR<HttpResult<uvCountForMonth>>(
    ["/api/uvCountForMonth", searchParams.get("pid")],
    async ([url, pid]) => {
      return await (
        await fetch(createUrl(url, { pid, timeSize: 30 }), { method: "GET" })
      ).json();
    },
    {
      onSuccess: (data) => {
        if (data) {
          var myChart = echarts.init(main.current!);
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
              containLabel: true,
            },
            xAxis: [
              {
                type: "category",
                data: data?.data?.uvData.map((item) => item.day),
              },
            ],
            yAxis: [
              {
                type: "value",
              },
            ],
            series: [
              {
                name: "老用户",
                type: "bar",
                stack: "Ad",
                emphasis: {
                  focus: "series",
                },
                data: data?.data?.uvData.map((item) => item.dayCount),
              },
              {
                name: "新用户",
                type: "bar",
                stack: "Ad",
                emphasis: {
                  focus: "series",
                },
                data: data?.data?.newUvData.map((item) => item.dayCount),
              },
            ],
          };
          option && myChart.setOption(option);
        }
      },
    }
  );

  return (
    <div>
      <Card className="mt-4">
        <CardHeader>
          <h4>用户量统计</h4>
        </CardHeader>
        <CardContent ref={main} className="w-full h-[300px]"></CardContent>
      </Card>
    </div>
  );
}
