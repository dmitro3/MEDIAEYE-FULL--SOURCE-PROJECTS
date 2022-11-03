import React from 'react';
import { Link } from 'react-router-dom';

import './PartnersBlock.scss';

const PartnersBlock = (props) => {
  const { partner } = props;
  return (
    <>
      {partner.map((item, i) => (
        <div className="mediaeye-partners-card about-partner-card" key={i}>
          <a
            target="_blank"
            href={item?.link}
            className="mediaeye-partners-card-inner"
          >
            <img
              src={item?.img}
              alt={item?.alt}
              className="mediaeye-partners-card-inner-img"
            />
          </a>
        </div>
      ))}
    </>
  );
};

export default PartnersBlock;
