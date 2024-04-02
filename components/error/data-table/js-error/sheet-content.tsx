import { SheetContent } from '@/components/ui/sheet';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { createUrl } from '@/lib/utils';
import useSWR from 'swr';

/**
 * 客户端中不能嵌套服务端组件,客户端下的所有组件都是会被转为客户端组件
 * 服务端组件中可以嵌套客户端组件
 */
export default function Component({ errorId }: { errorId: string }) {
  const { data } = useSWR(
    ['/api/error/getErrorById', errorId],
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
  console.log(data);

  return (
    <SheetContent className="w-10/12 sm:max-w-full overflow-auto">
      <SheetHeader>
        <SheetTitle>{errorId}</SheetTitle>
        <SheetDescription>desc,desc,desc</SheetDescription>
      </SheetHeader>
      {JSON.stringify(data || '')}
    </SheetContent>
  );
}
