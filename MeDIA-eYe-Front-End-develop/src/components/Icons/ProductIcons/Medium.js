import React from 'react';
import { useSelector } from 'react-redux';

export function Medium() {
  const theme = useSelector((state) => state.app.darkTheme);
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_33450_165414)">
        <path d="M13.5941 12.171C13.5941 15.9417 10.5636 18.9984 6.82548 18.9984C3.08737 18.9984 0.0566406 15.941 0.0566406 12.171C0.0566406 8.40094 3.08714 5.34326 6.82548 5.34326C10.5638 5.34326 13.5941 8.40024 13.5941 12.171Z" fill="white" />
        <path d="M21.0188 12.171C21.0188 15.7203 19.5036 18.5987 17.6344 18.5987C15.7653 18.5987 14.25 15.7203 14.25 12.171C14.25 8.62166 15.765 5.74323 17.6342 5.74323C19.5034 5.74323 21.0186 8.62074 21.0186 12.171" fill="white" />
        <path d="M24.0562 12.171C24.0562 15.3503 23.5233 17.9292 22.8659 17.9292C22.2084 17.9292 21.6758 15.351 21.6758 12.171C21.6758 8.99096 22.2086 6.41272 22.8659 6.41272C23.5231 6.41272 24.0562 8.99073 24.0562 12.171Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_33450_165414">
          <rect width="24" height="24" fill="white" transform="translate(0.0566406 0.343262)" />
        </clipPath>
      </defs>
    </svg>
  );
}
export default Medium;
