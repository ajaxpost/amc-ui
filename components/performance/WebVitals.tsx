'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import './web-vitals.css';

export default function WebVitals() {
  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>Core Web Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex pb-[50px] flex-wrap justify-between list-none">
            <li className="flex flex-col min-w-[280px] mx-[20px] mb-[80px]">
              <div className="text-[#0ace6b] text-[30px] font-bold text-center">
                1016.24ms
              </div>
              <div className="text-[#2a7aff] text-[20px] font-bold text-center mb-5">
                <span className=" underline">LCP</span>
              </div>
              <div className="flex relative">
                <div className="bg-[#0ace6b] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    2500ms
                  </div>
                  <div className="pointer current absolute right-1/2 text-[#2a7aff] -bottom-[70px] translate-x-1/2 z-10">
                    1016.24ms
                  </div>
                  GOOD
                </div>
                <div className="bg-[#ffa400] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    4000ms
                  </div>
                  NEEDS
                  <br />
                  IMPROVEMENT
                </div>
                <div className="bg-[#ff4f42] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  POOR
                </div>
              </div>
            </li>
            <li className="flex flex-col min-w-[280px] mx-[20px] mb-[80px]">
              <div className="text-[#0ace6b] text-[30px] font-bold text-center">
                26.36ms
              </div>
              <div className="text-[#2a7aff] text-[20px] font-bold text-center mb-5">
                <span className=" underline">FID</span>
              </div>
              <div className="flex relative">
                <div className="bg-[#0ace6b] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    100ms
                  </div>
                  <div className="pointer current absolute right-1/2 text-[#2a7aff] -bottom-[70px] translate-x-1/2 z-10">
                    26.36ms
                  </div>
                  GOOD
                </div>
                <div className="bg-[#ffa400] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    300ms
                  </div>
                  NEEDS
                  <br />
                  IMPROVEMENT
                </div>
                <div className="bg-[#ff4f42] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  POOR
                </div>
              </div>
            </li>
            <li className="flex flex-col min-w-[280px] mx-[20px] mb-[80px]">
              <div className="text-[#0ace6b] text-[30px] font-bold text-center">
                0.08
              </div>
              <div className="text-[#2a7aff] text-[20px] font-bold text-center mb-5">
                <span className=" underline">CLS</span>
              </div>
              <div className="flex relative">
                <div className="bg-[#0ace6b] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    0.1
                  </div>
                  <div className="pointer current absolute right-1/2 text-[#2a7aff] -bottom-[70px] translate-x-1/2 z-10">
                    0.08
                  </div>
                  GOOD
                </div>
                <div className="bg-[#ffa400] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    0.25
                  </div>
                  NEEDS
                  <br />
                  IMPROVEMENT
                </div>
                <div className="bg-[#ff4f42] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  POOR
                </div>
              </div>
            </li>
            <li className="flex flex-col min-w-[280px] mx-[20px] mb-[80px]">
              <div className="text-[#0ace6b] text-[30px] font-bold text-center">
                360.24ms
              </div>
              <div className="text-[#2a7aff] text-[20px] font-bold text-center mb-5">
                <span className=" underline">FCP</span>
              </div>
              <div className="flex relative">
                <div className="bg-[#0ace6b] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    1800ms
                  </div>
                  <div className="pointer current absolute right-1/2 text-[#2a7aff] -bottom-[70px] translate-x-1/2 z-10">
                    360.24ms
                  </div>
                  GOOD
                </div>
                <div className="bg-[#ffa400] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  <div className="pointer absolute right-0 -bottom-[50px] translate-x-1/2 z-10">
                    3000ms
                  </div>
                  NEEDS
                  <br />
                  IMPROVEMENT
                </div>
                <div className="bg-[#ff4f42] relative text-center flex-1 basis-[100px] flex-shrink-0 h-[50px] flex items-center justify-center text-xs">
                  POOR
                </div>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
