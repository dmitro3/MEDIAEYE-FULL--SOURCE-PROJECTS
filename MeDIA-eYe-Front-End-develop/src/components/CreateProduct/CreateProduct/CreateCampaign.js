import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserguidPopUp from '../../CreateCampaign/UserguidPopUp/UserguidPopUp';
import { PayAsYouGo } from '../../Icons';
import right_img from '../../../assets/img/CreateCampaign/right_img.png';

export default function CreateCampaign() {
  const [userguidPopup, setUserguid] = useState(false);
  const history = useHistory();

  const toggleUserGuidPopup = () => {
    setUserguid(!userguidPopup);
  };
  return (
    <div className="landing-page-campaign">
      <UserguidPopUp
        userguidPopup={userguidPopup}
        toggleUserGuidPopup={toggleUserGuidPopup}
      />
      <div className="landing-page-campaign-inner">
        <div className="landing-page-campaign-inner-first">
          <div>
            <button
              onClick={() => toggleUserGuidPopup()}
              className="btn btn-sm btn-gaming"
            >
              Tutorial
            </button>
          </div>
          <div className="landing-page-campaign-inner-first-text">
            <span className="header">CREATE CAMPAIGN</span>
            <span className="subheading">Drive your growth with NFTs!</span>
            <ul>
              <li className="text-semitransperant">
                {'\u2022'} Create Gallery
              </li>
              <li className="text-semitransperant">
                {'\u2022'} Add: Charities, Spotlight, Airdrops
              </li>
              <li className="text-semitransperant">
                {'\u2022'} Integrate Media Services
              </li>
            </ul>
          </div>
          <div
            className="landing-page-campaign-inner-first-bottom"
            onClick={() => history.push('/create-campaign')}
          >
            <button className="btn btn-featured">CREATE</button>
          </div>
        </div>
        <div className="landing-page-campaign-inner-second">
          <img src={right_img} alt="Create-Campaign" />
        </div>
        <div className="landing-page-campaign-inner-third">
          <PayAsYouGo />
        </div>
      </div>
    </div>
  );
}
