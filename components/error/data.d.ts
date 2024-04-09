export interface ErrorMapType {
  [key: string]: { day: string; count?: number; per?: number }[];
}

export interface ErrorHourMayType {
  [key: string]: { count: number; hour: string }[];
}

export interface ErrorListProps {
  apiKey: string;
  errorId: string;
  errorMsg: string;
  type: string;
  time: number;
}

export interface ErrorType {
  apiKey: string;
  breadCrumb: {
    data: string;
    status: string;
    time: number;
    type: string;
  }[];
  city: string;
  columnNumber: number;
  deviceInfo: {
    browser: string;
    browserVersion: string;
    os: string;
    ua: string;
  };
  errorId: string;
  errorMsg: string;
  errorStack: string;
  ip: string;
  lineNumber: number;
  pageUrl: string;
  province: string;
  recordScreenId: string;
  routeId: string;
  sdkVersion: string;
  sesId: string;
  time: number;
  type: string;
  userId: string;
  [name: string]: any;
}
