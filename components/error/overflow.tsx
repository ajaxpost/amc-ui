import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ErrorChart from './items/error-chart';

export default function Overflow() {
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
            <CardDescription>JS错误</CardDescription>
          </CardHeader>
          <CardContent className="p-0">1</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>自定义错误</CardDescription>
          </CardHeader>
          <CardContent className="p-0">2</CardContent>
        </Card>
      </div>
    </>
  );
}
