import React, { useRef, useState } from 'react';
import './ProfileSupport.scss';
import { useDispatch } from 'react-redux';
import Iframe from 'react-iframe';
const ProfileSupport = (props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const form = useRef();

  return (
    <div className="profile-page-content-main">
      <div className="profile-page-content-main-innerpart profile_support_page">
        <Iframe
          url="https://support.mediaeyenft.com/help/3848054442"
          width="100%"
          height="450px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
        <div className="profile_support_page-requiredWarning">
          <div class="profile-page-subscriptions-col-inner-body-list">
            Fields marked with an asterisk (*) are required
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSupport;
