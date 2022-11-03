import React from 'react';

export function Success() {
  return (
    <svg
      width="67"
      height="67"
      viewBox="0 0 67 67"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path
        d="M33.5 65C50.897 65 65 50.897 65 33.5C65 16.103 50.897 2 33.5 2C16.103 2 2 16.103 2 33.5C2 50.897 16.103 65 33.5 65Z"
        stroke="#55E0FF"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44 26L30 40L23 33"
        stroke="#55E0FF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Error() {
  return (
    <svg
      width="67"
      height="67"
      viewBox="0 0 67 67"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path
        d="M33.5 65C50.897 65 65 50.897 65 33.5C65 16.103 50.897 2 33.5 2C16.103 2 2 16.103 2 33.5C2 50.897 16.103 65 33.5 65Z"
        stroke="#FF1932"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.3223 45.5757H33.6723V45.9257H33.3223V45.5757Z"
        stroke="#FF1932"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.5 21.0757V35.0757"
        stroke="#FF1932"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Loading(props) {
  return (
    <>
      {props.type === 'new' ? (
        <>
          <svg
            className="ap"
            viewBox="0 0 128 256"
            width="128px"
            height="256px"
            xmlns="https://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ap-grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(279deg 91% 46%)" />
                <stop offset="100%" stopColor="hsl(279deg 91% 46%)" />
              </linearGradient>
              <linearGradient id="ap-grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(166deg 100% 35% / 26%)" />
                <stop offset="50%" stopColor="hsl(176deg 84% 64% / 76%)" />
                <stop offset="100%" stopColor="hsl(186deg 100% 35%)" />
              </linearGradient>
            </defs>
            <circle
              class="mediaeye-animation-loading-circle"
              r="56"
              cx="64"
              cy="192"
              fill="none"
              stroke="#ddd"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <circle
              class="mediaeye-animation-loading-worm1"
              r="56"
              cx="64"
              cy="192"
              fill="none"
              stroke="url(#ap-grad1)"
              strokeWidth="16"
              strokeLinecap="round"
              stroke-dasharray="87.96 263.89"
            />
            <path
              class="mediaeye-animation-loading-worm2"
              d="M120,192A56,56,0,0,1,8,192C8,161.07,16,8,64,8S120,161.07,120,192Z"
              fill="none"
              stroke="url(#ap-grad2)"
              strokeWidth="16"
              strokeLinecap="round"
              stroke-dasharray="87.96 494"
            />
          </svg>
        </>
      ) : (
        <>
          <svg
            width="63"
            height="71"
            viewBox="0 0 63 71"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
          >
            <path
              d="M41.334 21.8H61.0007V2.1333"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M59.8568 54.671C56.1917 60.3149 50.8136 64.6351 44.5122 66.9974C38.2109 69.3596 31.3182 69.6395 24.8461 67.7959C18.374 65.9522 12.6634 62.0822 8.55272 56.7541C4.44205 51.4259 2.14784 44.9202 2.0069 38.1921C1.86597 31.464 3.88574 24.8679 7.76969 19.3722C11.6536 13.8766 17.1971 9.77085 23.5864 7.65782C29.9756 5.54478 36.874 5.53575 43.2687 7.63206C49.6635 9.72836 55.2177 13.8196 59.116 19.305"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}
    </>
  );
}

export function Connect() {
  return (
    <svg
      width="67"
      height="49"
      viewBox="0 0 67 49"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path
        d="M61.5 2H5.5C3.567 2 2 3.43909 2 5.21429V43.7857C2 45.5609 3.56701 47 5.5 47H61.5C63.433 47 65 45.5609 65 43.7857V5.21429C65 3.43908 63.433 2 61.5 2Z"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 21.2856H65"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 14.8574H65"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Info() {
  return (
    <svg
      width="67"
      height="67"
      viewBox="0 0 67 67"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path
        d="M33.5 2C16.103 2 2 16.103 2 33.5C2 50.897 16.103 65 33.5 65C50.897 65 65 50.897 65 33.5C65 16.103 50.897 2 33.5 2Z"
        stroke="#55E0FF"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.6777 21.4243L33.3277 21.4243L33.3277 21.0743L33.6777 21.0743L33.6777 21.4243Z"
        stroke="#55E0FF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.5 45.9243L33.5 31.9243"
        stroke="#55E0FF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
