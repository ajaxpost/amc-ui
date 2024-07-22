import { NextRequest } from 'next/server';
const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const screenId = searchParams.get('screenId');

  const result = await fetch(
    `${baseUrl}/error/getErrorByScreenId/${screenId}`,
    {}
  );
  const data = await result.json();

  if (data.code === 200) return Response.json(data.data);
}
