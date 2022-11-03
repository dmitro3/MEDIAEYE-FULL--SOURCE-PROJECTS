import React from 'react';
import { useSelector } from 'react-redux';

export function Copy(props) {
  return (
    <>
      {props.type === 'white' ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            d="M13 13H18C18.5523 13 19 12.5523 19 12V2C19 1.44772 18.5523 1 18 1L8 1C7.44772 1 7 1.44771 7 2L7 7"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 19L12 19C12.5523 19 13 18.5523 13 18L13 8C13 7.44772 12.5523 7 12 7L2 7C1.44771 7 1 7.44771 1 8L1 18C1 18.5523 1.44771 19 2 19Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            d="M13 13H18C18.5523 13 19 12.5523 19 12V2C19 1.44772 18.5523 1 18 1L8 1C7.44772 1 7 1.44771 7 2L7 7"
            stroke="#55E0FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 19L12 19C12.5523 19 13 18.5523 13 18L13 8C13 7.44772 12.5523 7 12 7L2 7C1.44771 7 1 7.44771 1 8L1 18C1 18.5523 1.44771 19 2 19Z"
            stroke="#55E0FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
}

export default Copy;
