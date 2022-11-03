import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function DasboardMobileButton(props) {
  const theme = useSelector((state) => state.app.darkTheme);

  const showIcon = () => {
    if (props.active) {
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_2599_3398)">
            <path
              d="M4 40.6172C4 39.2365 5.11929 38.1172 6.5 38.1172H18.0409C18.6907 38.1172 19.2174 38.6439 19.2174 39.2937C19.2174 39.9434 19.7441 40.4701 20.3939 40.4701H27.6061C28.2559 40.4701 28.7826 39.9434 28.7826 39.2937C28.7826 38.6439 29.3093 38.1172 29.9591 38.1172H41.5C42.8807 38.1172 44 39.2365 44 40.6172V41.4995C44 42.8803 42.8807 43.9995 41.5 43.9995H6.5C5.11929 43.9995 4 42.8803 4 41.4995V40.6172Z"
              fill="#0075FF"
            />
            <rect
              x="5.5"
              y="5.5"
              width="37"
              height="28.7647"
              rx="1.5"
              stroke="#0075FF"
              strokeWidth="3"
            />
            <rect x="12" y="9" width="6" height="6" fill="#0075FF" />
            <rect x="12" y="17" width="6" height="6" fill="#0075FF" />
            <rect x="12" y="25" width="6" height="6" fill="#0075FF" />
            <rect x="21" y="9" width="6" height="6" fill="#0075FF" />
            <rect x="21" y="17" width="6" height="6" fill="#0075FF" />
            <rect x="21" y="25" width="6" height="6" fill="#0075FF" />
            <rect x="30" y="9" width="6" height="6" fill="#0075FF" />
            <rect x="30" y="17" width="6" height="6" fill="#0075FF" />
            <rect x="30" y="25" width="6" height="6" fill="#0075FF" />
          </g>
          <defs>
            <filter
              id="filter0_d_2599_3398"
              x="0"
              y="0"
              width="48"
              height="48"
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
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0.64 0 0 0 0 1 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2599_3398"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2599_3398"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      );
    }
    if (theme & !props.active) {
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_2599_3354)">
            <path
              d="M4 40.6172C4 39.2365 5.11929 38.1172 6.5 38.1172H18.0409C18.6907 38.1172 19.2174 38.6439 19.2174 39.2937V39.2937C19.2174 39.9434 19.7441 40.4701 20.3939 40.4701H27.6061C28.2559 40.4701 28.7826 39.9434 28.7826 39.2937V39.2937C28.7826 38.6439 29.3093 38.1172 29.9591 38.1172H41.5C42.8807 38.1172 44 39.2365 44 40.6172V41.4995C44 42.8803 42.8807 43.9995 41.5 43.9995H6.5C5.11929 43.9995 4 42.8803 4 41.4995V40.6172Z"
              fill="white"
            />
            <rect
              x="5.5"
              y="5.5"
              width="37"
              height="28.7647"
              rx="1.5"
              stroke="white"
              strokeWidth="3"
            />
            <rect x="12" y="9" width="6" height="6" fill="white" />
            <rect x="12" y="17" width="6" height="6" fill="white" />
            <rect x="12" y="25" width="6" height="6" fill="white" />
            <rect x="21" y="9" width="6" height="6" fill="white" />
            <rect x="21" y="17" width="6" height="6" fill="white" />
            <rect x="21" y="25" width="6" height="6" fill="white" />
            <rect x="30" y="9" width="6" height="6" fill="white" />
            <rect x="30" y="17" width="6" height="6" fill="white" />
            <rect x="30" y="25" width="6" height="6" fill="white" />
          </g>
          <defs>
            <filter
              id="filter0_d_2599_3354"
              x="0"
              y="0"
              width="48"
              height="48"
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
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0.64 0 0 0 0 1 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2599_3354"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2599_3354"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      );
    }
    if (!theme & !props.active) {
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_2599_3442)">
            <path
              d="M4 40.6172C4 39.2365 5.11929 38.1172 6.5 38.1172H18.0409C18.6907 38.1172 19.2174 38.6439 19.2174 39.2937C19.2174 39.9434 19.7441 40.4701 20.3939 40.4701H27.6061C28.2559 40.4701 28.7826 39.9434 28.7826 39.2937C28.7826 38.6439 29.3093 38.1172 29.9591 38.1172H41.5C42.8807 38.1172 44 39.2365 44 40.6172V41.4995C44 42.8803 42.8807 43.9995 41.5 43.9995H6.5C5.11929 43.9995 4 42.8803 4 41.4995V40.6172Z"
              fill="#923CFF"
            />
            <rect
              x="5.5"
              y="5.5"
              width="37"
              height="28.7647"
              rx="1.5"
              stroke="#923CFF"
              strokeWidth="3"
            />
            <rect x="12" y="9" width="6" height="6" fill="#923CFF" />
            <rect x="12" y="17" width="6" height="6" fill="#923CFF" />
            <rect x="12" y="25" width="6" height="6" fill="#923CFF" />
            <rect x="21" y="9" width="6" height="6" fill="#923CFF" />
            <rect x="21" y="17" width="6" height="6" fill="#923CFF" />
            <rect x="21" y="25" width="6" height="6" fill="#923CFF" />
            <rect x="30" y="9" width="6" height="6" fill="#923CFF" />
            <rect x="30" y="17" width="6" height="6" fill="#923CFF" />
            <rect x="30" y="25" width="6" height="6" fill="#923CFF" />
          </g>
          <defs>
            <filter
              id="filter0_d_2599_3442"
              x="0"
              y="0"
              width="48"
              height="48"
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
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0.64 0 0 0 0 1 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2599_3442"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2599_3442"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      );
    }
  };

  return <>{showIcon()}</>;
}
export default DasboardMobileButton;
