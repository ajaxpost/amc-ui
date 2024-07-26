import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function API_TOP() {
  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>API 请求 TOP 视图 </CardTitle>
        </CardHeader>
        <CardContent>
          123
          <br />
          TODO: 调用接口 http/getHttpTop
        </CardContent>
      </Card>
    </div>
  );
}
