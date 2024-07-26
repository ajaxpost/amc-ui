import { NextRequest } from 'next/server';
const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get('pid');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const result = await fetch(
    `${baseUrl}/getVisitPage?pid=${pid}&startDate=${startDate}&endDate=${endDate}`,
    {}
  );
  const data = await result.json();

  if (data.code === 200) return Response.json(data.data);
}
