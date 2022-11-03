import React from 'react';

export function SelectMark(props) {
    return (
        props?.type === true ? (
            <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15.5234" r="15" fill="#2F3553" />
                <circle cx="15" cy="15.5234" r="14.5" stroke="white" stroke-opacity="0.4" />
                <path d="M20.5496 13.004C20.9401 12.6135 20.9401 11.9803 20.5496 11.5898C20.1591 11.1992 19.5259 11.1992 19.1354 11.5898L20.5496 13.004ZM13.385 18.7544L12.6779 19.4615C13.0684 19.852 13.7016 19.852 14.0921 19.4615L13.385 18.7544ZM10.8634 14.8185C10.4728 14.428 9.83967 14.428 9.44914 14.8185C9.05862 15.209 9.05862 15.8422 9.44914 16.2327L10.8634 14.8185ZM19.1354 11.5898L12.6779 18.0473L14.0921 19.4615L20.5496 13.004L19.1354 11.5898ZM14.0921 18.0473L10.8634 14.8185L9.44914 16.2327L12.6779 19.4615L14.0921 18.0473Z" fill="#5CC51C" />
            </svg>

        ) : (
            <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15.5234" r="15" fill="#2F3553" />
                <circle cx="15" cy="15.5234" r="14.5" stroke="white" stroke-opacity="0.4" />
                <path d="M9.70508 21.7794C9.70508 19.8302 12.0753 18.25 14.9992 18.25C17.9231 18.25 20.2933 19.8302 20.2933 21.7794" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.0001 15.6018C16.9494 15.6018 18.5295 14.0216 18.5295 12.0724C18.5295 10.1231 16.9494 8.54297 15.0001 8.54297C13.0509 8.54297 11.4707 10.1231 11.4707 12.0724C11.4707 14.0216 13.0509 15.6018 15.0001 15.6018Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            </svg>


        )
    );
}
export default SelectMark;
