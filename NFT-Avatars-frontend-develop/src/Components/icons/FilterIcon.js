import React from 'react';
// import { useSelector } from 'react-redux';

export function FilterIcon(props) {
  // const darkTheme = useSelector((state) => state.app.darkTheme);
  return (
    <>
      {props.type === 'property' ? (
        <svg
          width="23"
          height="15"
          viewBox="0 0 23 15"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <rect width="23" height="3" rx="1.5" fill="white" />
          <rect x="4" y="6" width="15" height="3" rx="1.5" fill="white" />
          <rect x="9" y="12" width="5" height="3" rx="1.5" fill="white" />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path
              d="M5.7136 7.08807C5.87101 7.25937 5.95743 7.48314 5.95743 7.71462V14.5357C5.95743 14.9462 6.45281 15.1546 6.74602 14.866L8.64883 12.6854C8.90346 12.3798 9.0439 12.2286 9.0439 11.9261V7.71617C9.0439 7.48468 9.13186 7.26091 9.28773 7.0896L14.7477 1.16514C15.1566 0.72069 14.8418 0 14.2369 0H0.764441C0.159494 0 -0.156868 0.719147 0.253631 1.16514L5.7136 7.08807Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="15" height="15" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
}
