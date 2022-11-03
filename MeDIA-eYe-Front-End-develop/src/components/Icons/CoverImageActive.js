import React from 'react';
import { useSelector } from 'react-redux';
export function CoverImageActive() {
  const theme = useSelector((state) => state.app.darkTheme);
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="10.5" stroke="white" strokeOpacity="0.5" />
      <circle cx="11" cy="11" r="6" fill="white" />
    </svg>
  );
}
export default CoverImageActive;
