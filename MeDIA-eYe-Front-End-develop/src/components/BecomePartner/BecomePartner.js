import React, { useState } from 'react';
import Popup from '../Modals/BecomePartnerPopup/Popup';
import BeardBusiness from '../../assets/img/about_us/BeardBusiness.png';

const BecomePartner = (props) => {
  const [popup, setPopup] = useState(false);
  const togglePopup = () => {
    setPopup(!popup);
  };
  return (
    <>
      <section className="mediaeye-layout-section m-t-30 withspacetop">
        <Popup popup={popup} togglePopup={togglePopup} />
        <div className="mediaeye-layout-container">
          <div className="MainAbout-page-gradrow m-b-30">
            <div className="MainAbout-page-gradrow-inner">
              <h2 className="bighead">Become a partner</h2>
              <h5 className="semi-text">We are always happy to collaborate!</h5>
              <h5 className="semi-text">
                Partner creators receive additional rewards, to find out more
                please inquire
              </h5>
              <button
                className="btn btn-info m-t-20"
                onClick={() => togglePopup()}
              >
                Apply now
              </button>
            </div>
            <div className="MainAbout-page-gradrow-innerright">
              <img
                src={BeardBusiness}
                className="becomepartnerimg"
                alt="BeardBusiness"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BecomePartner;
