import React from 'react';

export function Facebook(props) {
  return (
    <>
      {props.type === 'circle' ? (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_33450_165390)">
            <path d="M24.0566 12.3433C24.0566 5.71584 18.6841 0.343262 12.0566 0.343262C5.42922 0.343262 0.0566406 5.71584 0.0566406 12.3433C0.0566406 18.3327 4.44484 23.2972 10.1816 24.1975V15.812H7.13477V12.3433H10.1816V9.69951C10.1816 6.69201 11.9732 5.03076 14.7142 5.03076C16.0267 5.03076 17.4004 5.26514 17.4004 5.26514V8.21826H15.8873C14.3966 8.21826 13.9316 9.14334 13.9316 10.0933V12.3433H17.2598L16.7277 15.812H13.9316V24.1975C19.6684 23.2972 24.0566 18.3327 24.0566 12.3433Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_33450_165390">
              <rect width="24" height="24" fill="white" transform="translate(0.0566406 0.343262)" />
            </clipPath>
          </defs>
        </svg>

      ) : (
        <svg
          width="13"
          height="23"
          viewBox="0 0 13 23"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            d="M12.4583 1H9.33333C7.952 1 6.62724 1.54873 5.65049 2.52549C4.67373 3.50224 4.125 4.827 4.125 6.20833V9.33333H1V13.5H4.125V21.8333H8.29167V13.5H11.4167L12.4583 9.33333H8.29167V6.20833C8.29167 5.93207 8.40141 5.66711 8.59677 5.47176C8.79212 5.27641 9.05707 5.16667 9.33333 5.16667H12.4583V1Z"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
}
export default Facebook;
