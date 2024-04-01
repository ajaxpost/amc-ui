import { NextRequest } from 'next/server';

const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get('pid');

  const url = `${baseUrl}/error/getErrorCountListByHour?pid=${pid}`;
  const result = await fetch(url, {
    method: 'GET',
  });
  const data = await result.json();

  return Response.json(data);
}
