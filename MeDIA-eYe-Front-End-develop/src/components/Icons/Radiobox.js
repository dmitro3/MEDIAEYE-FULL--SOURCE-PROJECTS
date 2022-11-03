import React from 'react';

export function Radiobox(props) {
    return (
        props?.type === true ? (
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.203125" width="20" height="20" rx="10" fill="#5648BB" />
                <rect x="4.11523" y="4.31641" width="11.7705" height="11.7705" rx="5.88525" fill="white" />
            </svg>
        ) : (

            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1.20312" width="18" height="18" rx="9" stroke="white" stroke-opacity="0.2" strokeWidth="2" />
            </svg>

        )
    );
}
export default Radiobox;
