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
  return (
    <div className="bg-[#f8f8f9] pt-2 flex">
      <div className="w-3/4">
        {/* left content */}
        <div className="p-6 bg-white flex">
          <div className="flex w-3/4">
            <div className="flex  w-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <div className="flex flex-col ml-2">
                <span>userId</span>
                <span>123</span>
              </div>
            </div>
            <div className="flex  w-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-panel-top"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
              </svg>
              <div className="flex flex-col ml-2">
                <span>chrome</span>
                <span>banben</span>
              </div>
            </div>
            <div className="flex   w-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-monitor"
              >
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
              <div className="flex flex-col   ml-2">
                <span>pc</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white ">
          <h4>TAGS</h4>
          <div className="flex">
            {tagListConfig.map((item) => {
              return (
                <div className="mt-4  border mr-3" key={item.value}>
                  <div className="flex ">
                    <div className="tagLeftLabel text-[#363B52] text-[10px]  p-1 w-auto">
                      {item.label}
                    </div>
                    <div className="tagRightLabel bg-[#f4f1f1] text-[#4D6DBE]  text-[10px]  p-1  w-auto ">
                      {item.render ? item.render(data) : data?.[item.value]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <h4>UserAgent</h4>
            <p className="mt-4 text-[12px]">
              Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36
              (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
            </p>
          </div>
          <div className="mt-4">
            <div className="flex">
              <h4>Js错误堆栈</h4>
              <a className="ml-4 text-[12px] leading-[2.1]">如何使用?</a>
            </div>
            <p className="mt-4 text-[12px]">
              Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36
              (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
            </p>
          </div>
          <div>
            {/* <Accordion type="single" collapsible>
             
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion> */}
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
        <InfoOverView />
      </div>
    </div>
  );
}
