import React from 'react';
import { Heart, User } from '../Icons';

const CharityCardSmall = (props) => {
  const { charity } = props;

  return (
    <>
      <div className="Card-box">
        <div className="Card-box-top">
          <h5>{charity?.title}</h5>
          <div className="Card-box-top-right">
            <img src={charity?.giveblock} alt="giving block icon" />
          </div>
        </div>
        <div className="Card-box-body">
          <div className="Card-box-body-img">
            <img src={charity?.img} alt={charity?.title} />
          </div>
          <div className="Card-box-body-right">
            <div className="Card-box-body-right-row">
              <span className="text-semitransperant">{charity?.desc}</span>
            </div>
            <div className="Card-box-body-right-row">
              <span>Watchlisting</span>
              <span>{charity?.Watchlisting}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharityCardSmall;
