import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ErrorChart from './items/error-chart';
import JsError from './rsc/js-error';
import CustomError from './rsc/custom-error';
import dayjs from 'dayjs';

export default function Overflow({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>错误概览</CardTitle>
          <CardDescription>时间范围：默认是30天</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ErrorChart />
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 mt-3 gap-3">
        <Card>
          <CardHeader>
            <CardTitle className=" text-base">
              <div className="w-full flex justify-between items-center">
                JS错误（onerror）
                <span className="text-sm font-normal flex justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d52020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-timer-reset mr-1"
                  >
                    <path d="M10 2h4" />
                    <path d="M12 14v-4" />
                    <path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
                    <path d="M9 17H4v5" />
                  </svg>
                  {dayjs().format('YYYY-MM-DD')}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <JsError searchParams={searchParams} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              <div className="w-full flex justify-between items-center">
                自定义错误（console.error）
                <span className="text-sm font-normal flex justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d52020"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-timer-reset mr-1"
                  >
                    <path d="M10 2h4" />
                    <path d="M12 14v-4" />
                    <path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
                    <path d="M9 17H4v5" />
                  </svg>
                  {dayjs().format('YYYY-MM-DD')}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CustomError />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
