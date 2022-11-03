import React, { useEffect, useState } from 'react';
import './businessTrade.scss';
import { GetDefaultImages } from '../../../../blockchain/functions/Utils';

export default function BusinessTrade() {
  return (
    <div className="mediaeye-businessTrade">
      <div className="mediaeye-businessTrade-col">
        <div className="mediaeye-businessTrade-col-label">CryptoPunk #212</div>
        <div className="mediaeye-businessTrade-col-label2"> 3.12 ETH</div>
        <div className="mediaeye-businessTrade-col-label3">1 min ago</div>
      </div>

      <div className="mediaeye-businessTrade-col">
        <div className="mediaeye-businessTrade-col-label">Seller #1</div>
        <div className="mediaeye-businessTrade-col-label2">
          <div className="mediaeye-businessTrade-col-label2-img">
            <img src={GetDefaultImages('user')} alt="Seller Davien" />
          </div>
          <div className="mediaeye-businessTrade-col-label2-name">Davien</div>
        </div>
        <div className="mediaeye-businessTrade-col-label3">$ 3500</div>
      </div>

      <div className="mediaeye-businessTrade-col">
        <div className="mediaeye-businessTrade-col-label">Buyer #1</div>
        <div className="mediaeye-businessTrade-col-label2">
          <div className="mediaeye-businessTrade-col-label2-img">
            <img src={GetDefaultImages('user')} alt="Buyer SunilSharma" />
          </div>
          <div className="mediaeye-businessTrade-col-label2-name">
            SunilSharma
          </div>
        </div>
        <div className="mediaeye-businessTrade-col-label3">$ 9500</div>
      </div>
    </div>
  );
}
