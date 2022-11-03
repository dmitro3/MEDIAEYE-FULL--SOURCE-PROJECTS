import React from 'react';
import { useSelector } from 'react-redux';

export function DowloadImage() {
  const theme = useSelector((state) => state.app.darkTheme);
  return (
    <svg
      width="49"
      height="49"
      viewBox="0 0 49 49"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path
        d="M42.875 30.625V38.7917C42.875 39.8746 42.4448 40.9132 41.679 41.679C40.9132 42.4448 39.8746 42.875 38.7917 42.875H10.2083C9.12537 42.875 8.08675 42.4448 7.32098 41.679C6.55521 40.9132 6.125 39.8746 6.125 38.7917V30.625"
        stroke="#A7A7A7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.7077 16.3333L24.4993 6.125L14.291 16.3333"
        stroke="#A7A7A7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 6.125V30.625"
        stroke="#A7A7A7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default DowloadImage;
