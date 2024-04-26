export interface ProjectProp {
  createTime: string;
  projectDesc: string;
  projectId: string;
  projectName: string;
}

interface dayCount {
  dayCount: number;
  day: string;
}
export interface uvCountForMonth {
  uvData: dayCount[];
  newUvData: dayCount[];
}

interface PvCount {
  count: number;
  hour: string;
}
export interface getPvCountByHour {
  seven: PvCount[];
  today: PvCount[];
}

export interface comprehensiveProps {
  count: number;
  showName: string;
}
