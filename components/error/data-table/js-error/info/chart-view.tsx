"use client";
import { ErrorCountListByHour, ErrorType } from "@/components/error/data";
import { createUrl } from "@/lib/utils";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const baseUrl = process.env.NEXT_REQUEST_URL;
export default function Component({ errorData }: { errorData: ErrorType }) {
  const main = useRef<null | HTMLDivElement>(null);
  const child = useRef<null | HTMLDivElement>(null);
  const [hourData, setHourData] = useState("0");
  useSWR<ErrorCountListByHour[]>(
    [
      "/api/error/getJavascriptErrorCountListByHour",
      errorData?.apiKey,
      errorData?.errorMsg,
    ],
    async ([url, pid, errorMsg]) => {
      return await (
        await fetch(
          createUrl(url, {
            pid,
            errorMsg,
          })
        )
      ).json();
    },
    {
      onSuccess: (data) => {
        const hourData = data
          .filter(
            (item) =>
              item.hour.match(/\d{2}-\d{2}/)?.[0] === dayjs().format("MM-DD")
          )
          .map((item) => {
            return {
              hour: item.hour.match(/\d{2}$/)?.[0],
              count: item.count,
            };
          });
        for (let i = 0; i < 24; i++) {
          if (
            !hourData.find((item) => {
              return String(i).padStart(2, "0") === item.hour;
            })
          ) {
            hourData.push({ hour: String(i), count: 0 });
          }
        }
        hourData.sort((a, b) => Number(a.hour) - Number(b.hour));
        console.log(data, hourData, dayjs().format("MM-DD"), "data");
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
              data: hourData.map((item) => item.count),
              type: "bar",
              barWidth: "40%",
            },
          ],
        };
        option && myChart.setOption(option);
        // 添加 'click' 事件监听器
        myChart.on("click", function (params) {
          setHourData(params.name);
        });
      },
    }
  );
  const { trigger, isMutating } = useSWRMutation(
    "/api/error/getJavascriptErrorCountByMinute",
    async (url, { arg }: { arg: Record<string, string> }) => {
      return await fetch(createUrl(url, arg), {
        method: "GET",
        // body: JSON.stringify(arg),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  );
  useEffect(() => {
    const now = dayjs().format("YYYY-MM-DD");
    trigger({
      pid: errorData?.apiKey,
      errorMsg: errorData?.errorMsg,
      timeHour: String(dayjs(now + " " + hourData + ":00:00").valueOf()),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "data");
      });
  }, [hourData]);
  // useSWR(
  //   [
  //     "/api/error/getJavascriptErrorCountByMinute",
  //     errorData?.apiKey,
  //     errorData?.errorMsg,
  //     hourData,
  //   ],
  //   async ([url, pid, errorMsg, hourData]) => {
  //     return await (
  //       await fetch(
  //         createUrl(url, {
  //           pid,
  //           errorMsg,
  //           hourData,
  //         })
  //       )
  //     ).json();
  //   },
  //   {
  //     onSuccess: () => {
  //       const chart = echarts.init(child.current!);
  //       const option = {
  //         xAxis: {
  //           type: "category",
  //           //生成0-24数组
  //           data: Array.from(
  //             { length: 60 },
  //             (_, i) => hourData + ":" + String(i).padStart(2, "0")
  //           ),
  //         },
  //         yAxis: {
  //           type: "value",
  //           interval: 50,
  //         },
  //         series: [
  //           {
  //             //随机生成24个单元数据
  //             data: Array.from({ length: 60 }, () =>
  //               Math.floor(Math.random() * 100)
  //             ),
  //             type: "bar",
  //             barWidth: "40%",
  //           },
  //         ],
  //       };
  //       option && chart.setOption(option);
  //       return () => {
  //         chart.dispose();
  //       };
  //     },
  //   }
  // );
  return (
    <div>
      <div ref={main} className="w-full h-[80px]"></div>
      <div ref={child} className="w-full h-[80px]"></div>
    </div>
  );
}
