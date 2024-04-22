import { NextRequest } from "next/server";
const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get("pid");
  const timeSize = searchParams.get("timeSize");

  const result = await fetch(
    `${baseUrl}/uvCountForMonth?pid=${pid}&timeSize=${timeSize}`,
    {}
  );
  const data = await result.json();

  if (data.code === 200)
    return Response.json({
      data: data.data,
      total: data.total,
    });
}
