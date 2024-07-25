export interface DataType {
  id: number;
  apiKey: string;
  dns: number;
  tcp: number;
  ssl: number;
  time: number;
  response: number;
  transfer: number;
  domParse: number;
  resource: number;
  loadPage: number;
  city: string;
  ip: string;
  pageUrl: string;
  province: string;
  routeId: string;
  sdkVersion: string;
  sesId: string;
  userId: string;
  deviceInfo: {
    browser: string;
    browserVersion: string;
    os: string;
    ua: string;
  };
}
