import { ErrorType } from "@/components/error/data";

export const tagListConfig = [
  {
    label: "版本号",
    value: "sdkVersion",
  },
  {
    label: "内置ID",
    value: "errorId",
  },
  {
    label: "IP地址",
    value: "ip",
  },
  {
    label: "设备",
    value: "os",
    render: (obj: ErrorType) => {
      return obj?.deviceInfo?.os;
    },
  },
  {
    label: "设备尺寸",
    value: "",
  },
  {
    label: "浏览器",
    value: "browser",
    render: (obj: ErrorType) => {
      return obj?.deviceInfo?.browser;
    },
  },
  {
    label: "页面地址",
    value: "pageUrl",
  },
];
