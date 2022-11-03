import React from 'react';
import { Token } from '../Icons/';
import './CardSmall.scss';

const AirdropCardSmall = (props) => {
  const { airdrop } = props;

  return (
    <>
      <div className="Card-box">
        <div className="Card-box-top">
          <h5>{airdrop?.title}</h5>
          <div className="Card-box-top-right">
            <Token /> Token Airdrop
          </div>
        </div>
        <div className="Card-box-body">
          <div className="Card-box-body-img">
            <img src={airdrop?.img} alt={airdrop?.title} />
            <span>SPOTLIGHT</span>
          </div>
          <div className="Card-box-body-right">
            <div className="Card-box-body-right-row">
              <span>Tokens</span>
              <span>{airdrop?.Tokens}</span>
            </div>
            <div className="Card-box-body-right-row">
              <span>Participants</span>
              <span>{airdrop?.Participants}</span>
            </div>
            <div className="Card-box-body-right-row">
              <span>Views</span>
              <span>{airdrop?.Views}</span>
            </div>
            <div className="Card-box-body-right-row">
              <span>Completed Tasks</span>
              <span>{airdrop?.CompletedTasks}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AirdropCardSmall;
