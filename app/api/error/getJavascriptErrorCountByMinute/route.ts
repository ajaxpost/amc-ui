import { createUrl } from "@/lib/utils";
import { NextRequest } from "next/server";
const baseUrl = process.env.NEXT_REQUEST_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get("pid");
  const errorMsg = searchParams.get("errorMsg");
  const timeHour = searchParams.get("timeHour");
  const result = await fetch(
    createUrl(`${baseUrl}/error/getJavascriptErrorCountByMinute`, {
      pid,
      errorMsg,
      timeHour,
    }),
    {
      method: "GET",
    }
  );
  const data = await result.json();
  if (data.code === 200) {
    return Response.json(data.data);
  }
}
