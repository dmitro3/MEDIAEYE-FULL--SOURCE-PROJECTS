import React from 'react';

export function CloseIcon(props) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
      onClick={props.onClick}
    >
      <rect
        x="0.800293"
        y="17.5435"
        width="24.8103"
        height="2.401"
        transform="rotate(-45 0.800293 17.5435)"
        fill="#818181"
      />
      <rect
        x="1.69775"
        width="24.8103"
        height="2.401"
        transform="rotate(45 1.69775 0)"
        fill="#818181"
      />
    </svg>
  );
}
export default CloseIcon;
