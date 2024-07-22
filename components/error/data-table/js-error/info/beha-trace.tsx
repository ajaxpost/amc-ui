import { FC } from 'react';
import './beha-trace.css';
import { ErrorType } from '@/components/error/data';

interface IProps {
  breadCrumb?: ErrorType['breadCrumb'];
}

const BehaTrace: FC<IProps> = ({ breadCrumb }) => {
  return (
    <div className=" overflow-auto">
      <ul className="timeline">
        待完成,,,待完成
        {/* {breadCrumb?.map((item, key) => {
          return (
            <li key={key} className="timeline-item">
              <div className="timeline-item-tail"></div>
              <div className="timeline-item-head timeline-item-head-custom timeline-item-head-blue">
                <span className="action text-[40px]">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    focusable="false"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path fill="#FFF" d="M0 0h40v40H0z"></path>
                      <path
                        d="M27.965 16.936v-4.607a.324.324 0 00-.324-.324h-15.31a.324.324 0 00-.324.324v4.607h15.958zm0 2H12.007v8.725a.324.324 0 00.324.324h15.31a.324.324 0 00.324-.324v-8.725zm2 8.725a2.324 2.324 0 01-2.324 2.324h-15.31a2.324 2.324 0 01-2.324-2.324V12.329a2.324 2.324 0 012.324-2.324h15.31a2.324 2.324 0 012.324 2.324v15.332zM14.25 13a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm3.5 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm3.5 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
                        fill="#31C9CC"
                        fill-rule="nonzero"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
              <div className="timeline-item-content">
                <div className="footprint-des">
                  <span className=" block text-[#6c6e7a] text-[14px]">
                    <label className="text-[14px] text-[#363b52] font-medium">
                      页面浏览
                    </label>
                    <label className=" float-right mt-[6px]">02:23:47</label>
                  </span>
                  <span className="block mt-1 text-[#6c6e7a] text-[14px]">
                    http://localhost:9999/test.html
                  </span>
                </div>
              </div>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
};

export default BehaTrace;
