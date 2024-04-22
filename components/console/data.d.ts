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
