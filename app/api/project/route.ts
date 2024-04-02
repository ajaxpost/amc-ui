import { NextRequest } from 'next/server';
const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageNum = searchParams.get('pageNum');
  const pageSize = searchParams.get('pageSize');
  const name = searchParams.get('name');

  const result = await fetch(`${baseUrl}/getProject`, {});
  const data = await result.json();

  if (data.code === 200)
    return Response.json({
      data: data.data,
      total: data.total,
    });
}
export async function POST(request: NextRequest) {
  // 获取请求数据 请求体中的参数
  const json = await request.json();

  const result = await fetch(`${baseUrl}/saveProject`, {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await result.json();

  return Response.json(data);
}
