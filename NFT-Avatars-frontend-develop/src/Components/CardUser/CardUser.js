import React from 'react';
import ETH from "../../assets/images/Wallet/eth-small.png";
import Heart from "../../assets/images/Wallet/heart.png";
import DemoCard from "../../assets/images/demo-market.png";
import './CardUser.scss';

const CardUser = () => {
  return (
    <div className='Carduser'>
      <div className='marketplace-card'>
        <div className='marketplace-card-inner'>
          <img src={DemoCard} className='marketplace-card-proimg' alt="ava-market"/>
          <div className='marketplace-card-inner-detail'>
            <p className='name'>Bored Ape Yacht Club</p>
            <p className='valhas'>#8500</p>
            <div className='social-rate'>
              <h5 className='likes'><img src={Heart} className='' alt='heart'/>1,2k</h5>
              <div className=''>
                <h5 className='title'>Price</h5>
                <h5 className='likes'><img src={ETH} className='' alt="eth"/> 54</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardUser