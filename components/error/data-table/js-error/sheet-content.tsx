import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
 *   1. 客户端组件中不能导入服务器组件,只能是客户端组件中使用客户端组件
 *   2. 但是你可以通过客户端组件的Props来传递一个服务端组件,这样是可以使用的
 *        在父组件的时候,他们会并行处理
 */
export default function Component({
  errorId,
  children,
}: {
  errorId: string;
  children: React.ReactNode;
}) {
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
    <SheetContent className="w-10/12 sm:max-w-full overflow-auto p-0">
      <SheetHeader className="p-6">
        <SheetTitle>{errorId}</SheetTitle>
        <SheetDescription>
          <span className="text-sm font-normal flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
        <SheetDescription className="mt-2">
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
          <Button variant="outline" size={"sm"} className="mr-2 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1414"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-copy"
            >
              <path d="M2 16V4a2 2 0 0 1 2-2h11" />
              <path d="M5 14H4a2 2 0 1 0 0 4h1" />
              <path d="M22 18H11a2 2 0 1 0 0 4h11V6H11a2 2 0 0 0-2 2v12" />
            </svg>
          </Button>
        </SheetDescription>
      </SheetHeader>
      {children}
    </SheetContent>
  );
}
