import { FC } from 'react';
import { ErrorType } from '@/components/error/data';
import './beha-trace.css';
import dayjs from 'dayjs';

interface IProps {
  breadCrumb?: ErrorType['breadCrumb'];
}

const renderIcon = (type: string) => {
  switch (type) {
    case 'click':
      return (
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
          <path d="m9 9 5 12 1.8-5.2L21 14Z" />
          <path d="M7.2 2.2 8 5.1" />
          <path d="m5.1 8-2.9-.8" />
          <path d="M14 4.1 12 6" />
          <path d="m6 12-1.9 2" />
        </svg>
      );
    case 'jsError':
    case 'console_error':
    case 'promiseError':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e71313"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      );
    case 'router':
      return (
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
      );
    case 'http':
      return (
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
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
          <path d="M12 12V8" />
        </svg>
      );

    default:
      return null;
  }
};

const renderTitle = (item: ErrorType['breadCrumb'][0]) => {
  switch (item.type) {
    case 'click':
      return '页面点击';
    case 'jsError':
      return 'JS错误';
    case 'console_error':
      return '自定义错误';
    case 'promiseError':
      return 'Promise错误';
    case 'router':
      return '页面浏览';
    case 'http':
      return 'HTTP请求';
    default:
      return null;
  }
};

const renderDesc = (item: ErrorType['breadCrumb'][0]) => {
  switch (item.type) {
    case 'click':
      return item.data;
    case 'jsError':
    case 'console_error':
    case 'promiseError': {
      const data = JSON.parse(item.data || '{}');
      return data.errorMsg;
    }
    case 'router':
      return item.data;
    case 'http': {
      const data = JSON.parse(item.data || '{}');
      return data.url;
    }
    default:
      return null;
  }
};

const BehaTrace: FC<IProps> = ({ breadCrumb }) => {
  console.log(breadCrumb, 'breadCrumb');

  return (
    <div className=" overflow-auto h-[500px]">
      <ul className="timeline">
        {breadCrumb?.map((item, key) => {
          return (
            <li key={key} className="timeline-item">
              <div className="timeline-item-tail"></div>
              <div className="timeline-item-head timeline-item-head-custom timeline-item-head-blue">
                <span className="action text-[40px]">
                  {renderIcon(item.type)}
                </span>
              </div>
              <div className="timeline-item-content">
                <div className="footprint-des">
                  <span className=" block text-[#6c6e7a] text-[14px]">
                    <label className="text-[14px] text-[#363b52] font-medium">
                      {renderTitle(item)}
                    </label>
                    <label className=" float-right mt-[6px]">
                      {dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}
                    </label>
                  </span>
                  <span className="block mt-1 text-[#6c6e7a] text-[14px]">
                    {renderDesc(item)}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BehaTrace;
