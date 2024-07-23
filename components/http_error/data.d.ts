interface DataType {
  day: string;
  count: number;
}

export interface HttpErrorType {
  data: DataType[];
  perData: DataType[];
}

export interface ErrorStatusType {
  count: string;
  status: string;
}
