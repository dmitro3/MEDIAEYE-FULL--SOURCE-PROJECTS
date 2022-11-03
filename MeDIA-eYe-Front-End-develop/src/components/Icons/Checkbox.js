import React from 'react';

export function Checkbox(props) {
  return (
    props?.type === true ? (

      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.52734" y="2.73438" width="20" height="20" rx="4" fill="#2A284A" />
        <rect x="1.52734" y="1.73438" width="22" height="22" rx="5" stroke="white" stroke-opacity="0.2" strokeWidth="2" />
        <path d="M16.4984 11.2657C16.8889 10.8752 16.8889 10.242 16.4984 9.85149C16.1078 9.46096 15.4747 9.46096 15.0841 9.85149L16.4984 11.2657ZM11.4402 14.9097L10.7331 15.6168C11.1236 16.0073 11.7568 16.0073 12.1473 15.6168L11.4402 14.9097ZM9.97176 12.027C9.58123 11.6365 8.94807 11.6365 8.55754 12.027C8.16702 12.4175 8.16702 13.0507 8.55754 13.4412L9.97176 12.027ZM15.0841 9.85149L10.7331 14.2026L12.1473 15.6168L16.4984 11.2657L15.0841 9.85149ZM12.1473 14.2026L9.97176 12.027L8.55754 13.4412L10.7331 15.6168L12.1473 14.2026Z" fill="white" />
      </svg>

    ) : (
      < svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <rect x="2.52734" y="2.73438" width="20" height="20" rx="4" fill="#2A284A" />
        <rect x="1.52734" y="1.73438" width="22" height="22" rx="5" stroke="white" stroke-opacity="0.2" strokeWidth="2" />
      </svg >
    )
  );
}
export default Checkbox;
