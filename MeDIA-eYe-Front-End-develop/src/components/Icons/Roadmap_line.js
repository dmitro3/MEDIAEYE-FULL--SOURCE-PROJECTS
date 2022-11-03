import React from 'react';
import { useSelector } from 'react-redux';

export function Roadmap_line() {
  return (
    <svg
      width="1486"
      height="24"
      viewBox="0 0 1486 24"
      style={{ position: 'absolute', right: '0' }}
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_308_2425)">
        <line
          x1="5"
          y1="7.5"
          x2="100%"
          y2="7.5"
          stroke="#2FE6FB"
          strokeWidth="3"
        />
        <circle
          cx="12"
          cy="8"
          r="8"
          transform="rotate(-90 12 8)"
          fill="#2FE6FB"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_308_2425"
          x="0"
          y="0"
          width="100%"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_308_2425"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_308_2425"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
