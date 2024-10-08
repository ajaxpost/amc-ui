import { NextRequest } from 'next/server';

const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get('pid');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const url = `${baseUrl}/error/overflow?pid=${pid}&startDate=${startDate}&endDate=${endDate}`;
  const result = await fetch(url, {
    method: 'GET',
  });
  const data = await result.json();

  return Response.json(data);
}
