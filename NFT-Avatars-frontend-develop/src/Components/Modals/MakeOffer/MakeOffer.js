import React, { useState } from 'react';
import "./Makeoffer.scss";
import Select from 'react-select'
import BNBPng from "../../../assets/images/Wallet/BNB.png"
import monkey from "../../../assets/images/Rectangle 3452.png"
import Cross from "../../icons/CrossIcon";
const MakeOffer = () => {
  const[readyPopup,setreadyPopup]= useState(true)
  const consumer = [
    {
      value: "2",
      label: "2 Day",
    },
  ];

  return (
    <div className={readyPopup?"makeoffer-background":"disable"}>
    <div className='makeoffer-main'>
      <div className='makeoffer-main-inner'>
      <button
              className="makeoffer-close"
              onClick={() => setreadyPopup(!readyPopup)}
            >
              {" "}
              <Cross />{" "}
            </button>
        <h4 className='makeoffer-main-inner-heading'>Place a Bid</h4>

        <div className='makeoffer-main-inner-image'>
          <img className='bid-img' src={monkey} alt=" bid-img" />
        </div>
        <div className="makeoffer-token-main">
          <h5 className='title'>Total</h5>
          <div className='makeoffer-token'>
            <div className='makeoffer-token-dropdown'>
              <Select
                options={consumer}
                classNamePrefix="makeoffer-btn2"
                // menuIsOpen={true}
                getOptionLabel={(e) => (
                  <div className="makeoffer-dropdown">
                    {e.icon}
                    <span className='dropdown-text'>{e.label}</span>
                  </div>
                )}
                defaultValue={{
                  value: "WBNB",
                  label: "WBNB",
                  icon: <img className="dropdown-img" src={BNBPng} alt="" />,
                }}
                // menuIsOpen={true}
                isSearchable={false}
              />
            </div>
            <div className='makeoffer-token-value'>
              <div className='makeoffer-token-value-inner'>
                <input type="text" className='input-set' value="1" />
                <span className="num-set">$386.75</span>
              </div>
              <div className="makeoffer-value">
                <p className="makeoffer-value-token">Available: 32.10768 BNB</p></div>
            </div>
          </div>
        </div>
        <div className="makeoffer-token-offer">
          <h5 className='title'>Offer Expiration</h5>
          <div className='makeoffer-token'>
            <div className='makeoffer-token-dropdown'>
              <Select
                options={consumer}
                classNamePrefix="makeoffer-btn2"
                getOptionLabel={(e) => (
                  <div className="makeoffer-dropdown">
                    {e.icon}
                    <span className='dropdown-text'>{e.label}</span>
                  </div>
                )}
                defaultValue={{
                  value: "1 Day",
                  label: "1 Day",
                }}
                // menuIsOpen={true}
                isSearchable={false}
              />
            </div>
            <div className='makeoffer-token-value'>
              <div className='makeoffer-token-value-inner'>
                <input type="text" readOnly className='input-set' value="March 14,2022,10:38 AM" />
              </div>
            </div>
          </div>
        </div>
        <div className="makeoffer-term">
          <input className='makeoffer-radio' id="first" type="radio" name="numbers" value="first" />
          <label className="makeoffer-label" htmlFor="first"><p className='makeoffer-term-name'>By checking this box, I agree to
            <a className='makeoffer-highlight'> Terms & Conditions</a></p></label>
        </div>
        <button className='makeoffer-btn'>Make Offer</button>
      </div>

    </div>
    </div>
  )
}

export default MakeOffer;
