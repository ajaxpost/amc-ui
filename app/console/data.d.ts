export interface TodayType {
  day: string;
  dayCount: number;
}

export interface TodayFlowDataByTenMinProps {
  todayPvData: TodayType[];
  todayUvData: TodayType[];
  todayNewUvData: TodayType[];
  todayIpData: TodayType[];
}
