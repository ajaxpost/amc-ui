import { SheetContent } from '@/components/ui/sheet';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { createUrl } from '@/lib/utils';
import useSWR from 'swr';

/**
 *   1. 客户端组件中不能导入服务器组件,只能是客户端组件中使用客户端组件
 *   2. 但是你可以通过客户端组件的Props来传递一个服务端组件,这样是可以使用的
 *        在父组件的时候,他们会并行处理
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

  return (
    <SheetContent className="w-10/12 sm:max-w-full overflow-auto">
      <SheetHeader>
        <SheetTitle>{errorId}</SheetTitle>
        <SheetDescription>desc,desc,desc,123</SheetDescription>
      </SheetHeader>
      {JSON.stringify(data || '')}
    </SheetContent>
  );
}
