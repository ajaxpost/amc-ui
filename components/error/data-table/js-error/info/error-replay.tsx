import { useRef } from 'react';
import { createUrl, unzip } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import { RecordScreenType } from '@/components/error/data';

const ErrorReplay = () => {
  const main = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const screenId = searchParams.get('screenId');
  useSWR<RecordScreenType>(
    ['/api/error/getErrorByScreenId', screenId],
    async ([url, screenId]) => {
      return await (
        await fetch(
          createUrl(url, {
            screenId,
          })
        )
      ).json();
    },
    {
      onSuccess: (data) => {
        if (!data) return;

        const events = unzip(data.events);
        main.current!.innerHTML = '';
        const player = new rrwebPlayer({
          target: main.current!,
          props: {
            events,
            width: 950,
            height: 300,
          },
        });
      },
    }
  );

  return <div ref={main} className="w-full h-[370px]"></div>;
};

export default ErrorReplay;
