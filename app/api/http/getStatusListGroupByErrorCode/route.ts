import { NextRequest } from 'next/server';
const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get('pid');
  const date = searchParams.get('date');

  const result = await fetch(
    `${baseUrl}/http/getStatusListGroupByErrorCode?pid=${pid}&date=${date}`,
    {}
  );
  const data = await result.json();

  if (data.code === 200) return Response.json(data.data);
}
