import React from 'react';
import { useSelector } from 'react-redux';

export function Share() {
  const darkTheme = useSelector((state) => state.app.darkTheme);
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path
        d="M18.7988 21.008C20.4557 21.008 21.7988 19.6726 21.7988 18.0253C21.7988 16.3779 20.4557 15.0425 18.7988 15.0425C17.142 15.0425 15.7988 16.3779 15.7988 18.0253C15.7988 19.6726 17.142 21.008 18.7988 21.008Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.79883 13.5513L15.7988 16.5341"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.79883 15.0425C8.45568 15.0425 9.79883 13.707 9.79883 12.0597C9.79883 10.4123 8.45568 9.0769 6.79883 9.0769C5.14197 9.0769 3.79883 10.4123 3.79883 12.0597C3.79883 13.707 5.14197 15.0425 6.79883 15.0425Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7988 7.58569L9.79883 10.5685"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.7988 9.0769C20.4557 9.0769 21.7988 7.74146 21.7988 6.09411C21.7988 4.44677 20.4557 3.11133 18.7988 3.11133C17.142 3.11133 15.7988 4.44677 15.7988 6.09411C15.7988 7.74146 17.142 9.0769 18.7988 9.0769Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default Share;
