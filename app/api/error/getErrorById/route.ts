import { NextRequest } from 'next/server';

const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const errorId = searchParams.get('errorId');

  const url = `${baseUrl}/error/getErrorById/${errorId}`;
  const result = await fetch(url, {
    method: 'GET',
  });
  const data = await result.json();
  if (data.code === 200) {
    return Response.json(data.data);
  }
}
