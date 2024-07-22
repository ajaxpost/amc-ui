import { tagListConfig } from './config';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import InfoOverView from './overview';
import { ErrorType } from '@/components/error/data';

const baseUrl = process.env.NEXT_REQUEST_URL;
export default async function Component({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const errorId = searchParams.errorId;
  const url = `${baseUrl}/error/getErrorById/${errorId}`;
  const result = await (await fetch(url)).json();
  const data = result.data as ErrorType;

  console.log(data, 'datadata');

  return (
    <div className="bg-[#f8f8f9] pt-2 flex">
      <div className="w-3/4">
        {/* left content */}
        <div className="p-6 bg-white grid grid-cols-2">
          <div className="flex items-center">
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
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <div className=" ml-3">
              <span>userId</span>
              <br />
              <span>{data?.userId}</span>
            </div>
          </div>
          <div className="flex items-center">
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
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="21.17" x2="12" y1="8" y2="8" />
              <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
              <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
            </svg>
            <div className=" ml-3">
              <span>{data?.deviceInfo?.browser}</span>
              <br />
              <span>{data?.deviceInfo?.browserVersion}</span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white ">
          <h4>TAGS</h4>
          <div className="grid grid-cols-7">
            {tagListConfig.map((item) => {
              return (
                <div className="mt-4  border mr-3" key={item.value}>
                  <div className="flex ">
                    <div className="tagLeftLabel text-[#363B52] text-[10px]  p-1 box-border ">
                      {item.label}
                    </div>
                    <div className="tagRightLabel bg-[#f4f1f1] text-[#4D6DBE]  text-[10px]  p-1 flex-auto w-0">
                      <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
                        {item.render ? item.render(data) : data?.[item.value]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <h4>UserAgent</h4>
            <p className="mt-4 text-[12px]">{data?.deviceInfo?.ua}</p>
          </div>

          <div className="mt-4">
            <div className="flex">
              <h4>Js错误堆栈</h4>
              <a
                href="#"
                className="ml-4 text-[12px] leading-[2.1] hover:underline cursor-pointer"
              >
                如何使用?
              </a>
            </div>
            <p className="mt-4 text-[12px]">{data?.deviceInfo?.ua}</p>
          </div>
          <div className="mt-2 text-[14px]">
            {data?.errorStack.split('\n').map((item, index) => {
              return <div key={index}>{item}</div>;
            })}
          </div>
        </div>
      </div>
      {/* right content */}
      <style>{`
        .rightView {
          box-shadow: inset 0.05rem 0 0 0 #ebebeb;
        }
        `}</style>
      <div className="p-6 bg-white w-1/4 rightView">
        <InfoOverView errorData={data} />
      </div>
    </div>
  );
}
