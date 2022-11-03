import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import public_spotlight from '../../assets/img/spotlight/public_spotlight.png';

const SpotlightHeader = () => {
  return (
    <>
      <div className="public-spotlight-header">
        <img src={public_spotlight} alt="public_spotlight" />
      </div>
    </>
  );
};

export default SpotlightHeader;
