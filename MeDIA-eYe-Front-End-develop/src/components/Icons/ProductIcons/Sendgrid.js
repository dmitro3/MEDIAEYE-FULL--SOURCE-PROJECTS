import React from 'react';
import { useSelector } from 'react-redux';

export function Sendgrid() {
  const theme = useSelector((state) => state.app.darkTheme);
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path
        d="M19.9996 0V13.3331H13.3331V19.9993H0.000157104L0.000156247 13.333L0 6.66637H6.66653V0H19.9996Z"
        fill="white"
      />
      <path d="M0 19.9995H6.66653V13.333H0V19.9995Z" fill="#E7E7E7" />
      <path
        d="M13.332 13.3327H19.9986V6.66602H13.332V13.3327Z"
        fill="#F5F5F5"
      />
      <path d="M6.66797 6.66653H13.3345V0H6.66797V6.66653Z" fill="#F5F5F5" />
      <path
        d="M6.66797 13.3325H13.3345V6.66602H6.66797V13.3325Z"
        fill="#E7E7E7"
      />
      <path d="M13.332 6.66653H19.9986V0H13.332V6.66653Z" fill="#E7E7E7" />
    </svg>
  );
}
export default Sendgrid;
