export interface HttpResult<T> {
  code: number;
  message: string;
  data: T | null;
}
