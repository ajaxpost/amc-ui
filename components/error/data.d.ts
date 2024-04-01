export interface ErrorMapType {
  [key: string]: { day: string; count?: number; per?: number }[];
}

export interface ErrorHourMayType {
  [key: string]: { count: number; hour: string }[];
}
