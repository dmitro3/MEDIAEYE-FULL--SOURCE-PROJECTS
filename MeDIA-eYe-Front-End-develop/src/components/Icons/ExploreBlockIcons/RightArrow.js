import React from 'react';
import { useSelector } from 'react-redux';

export function RightArrow() {
  return (
    <svg
      width="13"
      height="24"
      viewBox="0 0 13 24"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path
        d="M11 12L11.7399 11.3273L12.3515 12L11.7399 12.6727L11 12ZM1.73994 0.327328L11.7399 11.3273L10.2601 12.6727L0.260058 1.67267L1.73994 0.327328ZM11.7399 12.6727L1.73994 23.6727L0.26006 22.3273L10.2601 11.3273L11.7399 12.6727Z"
        fill="white"
      />
    </svg>
  );
}

export default RightArrow;
