import React from 'react';
import { Heart, User } from '../../Icons/';

const AirdropCardSmall = (props) => {
  const { airdrop } = props;

  return (
    <>
      <div className="Card-box">
        <div className="Card-box-img">
          <img src={airdrop?.img} alt={airdrop?.title} />
          <span>SPOTLIGHT</span>
        </div>
        <div className="Card-box-right">
          <div className="Card-box-right-head">
            <h5>{airdrop?.title}</h5>
            <div className="Card-box-right-head-status pre">Pre-IDO</div>
          </div>
          <p>
            {airdrop?.dateStart} - {airdrop?.dateEnd}
          </p>
          <div className="Card-box-right-icon">
            <p className="Card-box-right-icon-sm">
              <User type="small" />
              150/555
            </p>
            <p className="Card-box-right-icon-sm">
              <Heart type="white" />3 k
            </p>
          </div>
          <p>
            <span>Views: </span>12 499
          </p>
        </div>
      </div>
    </>
  );
};

export default AirdropCardSmall;
