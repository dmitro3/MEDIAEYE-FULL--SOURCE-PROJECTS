import React from 'react';
import { useSelector } from 'react-redux';

export function Tumblr() {
  const theme = useSelector((state) => state.app.darkTheme);
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_33450_165441)">
        <path d="M14.6566 24.3433C11.0566 24.3433 8.35664 22.4933 8.35664 18.0433V10.9433H5.05664V7.09326C8.65664 6.14326 10.1566 3.04326 10.3566 0.343262H14.1066V6.44326H18.4566V10.9433H14.1066V17.1433C14.1066 18.9933 15.0566 19.6433 16.5566 19.6433H18.6566V24.3433H14.6566Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_33450_165441">
          <rect width="13.6" height="24" fill="white" transform="translate(5.05664 0.343262)" />
        </clipPath>
      </defs>
    </svg>

  );
}
export default Tumblr;
