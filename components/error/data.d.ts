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
