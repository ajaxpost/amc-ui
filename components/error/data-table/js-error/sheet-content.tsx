import { Button, buttonVariants } from "@/components/ui/button";
import { SheetContent, SheetFooter } from "@/components/ui/sheet";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { createUrl } from "@/lib/utils";
import dayjs from "dayjs";
import useSWR from "swr";

/**
 * 客户端中不能嵌套服务端组件,客户端下的所有组件都是会被转为客户端组件
 * 服务端组件中可以嵌套客户端组件
 */
export default function Component({ errorId }: { errorId: string }) {
  const { data } = useSWR(
    ["/api/error/getErrorById", errorId],
    async ([url, errorId]) => {
      return await (
        await fetch(
          createUrl(url, {
            errorId,
          })
        )
      ).json();
    }
  );

  return (
    <SheetContent className="w-10/12 sm:max-w-full overflow-auto">
      <SheetHeader>
        <SheetTitle>{errorId}</SheetTitle>
        <SheetDescription>
          <span className="text-sm font-normal flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock mr-2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {dayjs().format("YYYY-MM-DD")}
          </span>
        </SheetDescription>
      </SheetHeader>
      <SheetDescription>
        <Button variant="outline" size={"sm"} className="mr-2 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-check mr-2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          解决
        </Button>
        <Button variant="outline" size={"sm"} className="mr-2 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-ban mr-2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.9 4.9 14.2 14.2" />
          </svg>
          忽略
        </Button>
        <Button variant="outline" size={"sm"} className="mr-2 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-line-chart mr-2"
          >
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
          行为轨迹
        </Button>
      </SheetDescription>
      <SheetTitle>123123</SheetTitle>
      {/* {JSON.stringify(data || "")} */}
    </SheetContent>
  );
}
