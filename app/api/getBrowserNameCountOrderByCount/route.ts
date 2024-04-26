import { NextRequest } from "next/server";
const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get("pid");
  const topCount = searchParams.get("topCount");
  const topDays = searchParams.get("topDays");

  const result = await fetch(
    `${baseUrl}/getBrowserNameCountOrderByCount?pid=${pid}&topCount=${topCount}&topDays=${topDays}`,
    {}
  );
  const data = await result.json();

  if (data.code === 200)
    return Response.json({
      data: data.data,
      total: data.total,
    });
}
