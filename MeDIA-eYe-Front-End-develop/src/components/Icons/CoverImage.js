import React from 'react';
import { useSelector } from 'react-redux';

export function CoverImage() {
  const theme = useSelector((state) => state.app.darkTheme);
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <circle
        cx="11"
        cy="11.7109"
        r="10.5"
        stroke="white"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
export default CoverImage;
