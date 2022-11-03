import React from 'react';
import { useSelector } from 'react-redux';

export function FilterIcon(props) {
  const darkTheme = useSelector((state) => state.app.darkTheme);
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
      ) : props.type === 'list' ? (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.459 15.7344L21.459 15.7344" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3.45898 15.7344H5.45898" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7.95898 18.2344C9.3397 18.2344 10.459 17.1151 10.459 15.7344C10.459 14.3537 9.3397 13.2344 7.95898 13.2344C6.57827 13.2344 5.45898 14.3537 5.45898 15.7344C5.45898 17.1151 6.57827 18.2344 7.95898 18.2344Z" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20.459 9.73438H21.459" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3.45898 9.73438H10.459" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16.959 12.2344C18.3397 12.2344 19.459 11.1151 19.459 9.73438C19.459 8.35366 18.3397 7.23438 16.959 7.23438C15.5783 7.23438 14.459 8.35366 14.459 9.73438C14.459 11.1151 15.5783 12.2344 16.959 12.2344Z" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
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
