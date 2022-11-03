import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Circle, CircleActive } from '../Icons';

const AgreeBlock = (props) => {
  return (
    <>
      <div className="mediaeyeagree">
        <span
          className="mediaeyeagree-circle"
          onClick={() => props.toggleAgree()}
        >
          {props.agree ? <CircleActive /> : <Circle />}
        </span>
        {props.contentText ? (
          <div className="mediaeyeagree-text">{props.contentText}</div>
        ) : (
          <div className="mediaeyeagree-text">
            By checking this box, I agree to{' '}
            <Link
              className="mediaeyeagree-link"
              target="_blank"
              to="/terms-conditions"
            >
              Terms & Conditions
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AgreeBlock;
