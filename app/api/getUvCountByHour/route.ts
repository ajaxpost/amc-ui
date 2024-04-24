import { NextRequest } from "next/server";
const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get("pid");
  const scope = searchParams.get("scope");

  const result = await fetch(
    `${baseUrl}/getUvCountByHour?pid=${pid}&scope=${scope}`,
    {}
  );
  const data = await result.json();

  if (data.code === 200)
    return Response.json({
      data: data.data,
      total: data.total,
    });
}
