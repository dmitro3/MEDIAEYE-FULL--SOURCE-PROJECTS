import React, { useState } from 'react';
import "./PlaceBid.scss";
import Select from 'react-select'
import Cross from "../../icons/CrossIcon";
import BNBPng from "../../../assets/images/Wallet/BNB.png"
import BUSDPng from "../../../assets/images/Wallet/BUSD.png"
import monkey from "../../../assets/images/Rectangle 3452.png"

const PlaceBid = () => {
  const[readyPopup,setreadyPopup]= useState(true)
  const consumer = [
    {
      value: "BUSD",
      label: "BUSD",
      icon: <img className="dropdown-img" src={BUSDPng} alt="BUSD-png" />,
    },
  ];

  return (
    <div className={readyPopup?"placebid-background":"placebid-disable"}>
    <div className='placebid-main'>
      <div className='placebid-main-inner'>
      <button
              className="placebid-close"
              onClick={() => {setreadyPopup(!readyPopup)
              }}
            >
              {" "}
              <Cross />{" "}
            </button>
        <h4 className='placebid-main-inner-heading'>Place a Bid</h4>

        <div className='placebid-main-inner-image'>
          <img className='bid-img' src={monkey} alt=" bid-img" />
        </div>
        <div className="placebid-token-main">
          <h5 className='title'>Price</h5>
          <div className='placebid-token'>
            <div className='placebid-token-dropdown'>
              <Select
                options={consumer}
                classNamePrefix="placebid-btn2"
                getOptionLabel={(e) => (
                  <div className="placebid-dropdown">
                    {e.icon}
                    <span className='dropdown-text'>{e.label}</span>
                  </div>
                )}
                defaultValue={{
                  value: "BNB",
                  label: "BNB",
                  icon: <img className="dropdown-img" src={BNBPng} alt="" />,
                }}
                // menuIsOpen={true}
                isSearchable={false}
              />
            </div>
            <div className='placebid-token-value'>
              <div className='placebid-token-value-inner'>
                <input type="text" className='input-set' value="1" />
                <span className="num-set">$386.75</span>
              </div>
              <div className="placebid-value">
                <p className="placebid-value-token">Available: 32.10768 BNB</p></div>
            </div>
          </div>
        </div>
        <div className="placebid-term">
          <input className='placebid-radio' id="first" type="radio" name="numbers" value="first" />
          <label className="placebid-label" htmlFor="first"><p className='placebid-term-name'>By checking this box, I agree to
            <a href="#" className='placebid-highlight'> Terms & Conditions</a></p></label>
        </div>
        <button className='placebid-btn'>Place bid</button>
      </div>

    </div>
    </div>
  )
}

export default PlaceBid;
