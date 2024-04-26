"use client";

import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ComprehensiveChart from "./Comprehensive-chart";
import { useState } from "react";
import { set } from "react-hook-form";

export default function Comprehensive() {
  const [topCount, setTopCount] = useState("10");
  const [topDays, setTopDays] = useState("1");
  return (
    <div>
      <div className={"flex mt-4"}>
        <h4 className="flex items-center">综合数据</h4>
        <RadioGroup
          defaultValue="1"
          className={"flex ml-4"}
          onValueChange={(value) => {
            setTopDays(value);
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" />
            <Label htmlFor="1">1天</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="7" />
            <Label htmlFor="7">7天</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="30" />
            <Label htmlFor="30">30天</Label>
          </div>
        </RadioGroup>
        <div className={"ml-4"}>
          <Select
            onValueChange={(value) => {
              setTopCount(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10" defaultChecked>
                10
              </SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <ComprehensiveChart
          title="浏览器访问量"
          topCount={topCount}
          topDays={topDays}
        ></ComprehensiveChart>
        <ComprehensiveChart
          title="城市访问量"
          topCount={topCount}
          topDays={topDays}
        ></ComprehensiveChart>
        <ComprehensiveChart
          title="页面停留时长"
          topCount={topCount}
          topDays={topDays}
        ></ComprehensiveChart>
        <ComprehensiveChart
          title="页面访问量"
          topCount={topCount}
          topDays={topDays}
        ></ComprehensiveChart>
      </div>
    </div>
  );
}
