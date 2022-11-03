import React, { useEffect, useRef, useState } from 'react';
const ItemLoader = () => {
    return (
        <>
            <div className="mediaeye-animation-itemLoader">
                <div className="mediaeye-animation-itemLoader-inner">
                    <div className="mediaeye-animation-itemLoader-inner-layer mediaeye-animation-itemLoader-inner-layer-first"></div>
                    <div className="mediaeye-animation-itemLoader-inner-layer mediaeye-animation-itemLoader-inner-layer-second"></div>
                </div>
            </div>
        </>
    );
};

export default ItemLoader;
