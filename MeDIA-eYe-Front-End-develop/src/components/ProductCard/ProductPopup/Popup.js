import React, { useEffect } from 'react';
import './Popup.scss';
import { CloseIcon } from '../../Icons/';

const Popup = (props) => {

  useEffect(() => {
    if (props.showPopup) {
      document.getElementsByTagName('body')[0].classList.add('mediaeye-restricted');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('mediaeye-restricted');
    }
  }, [props.showPopup]);

  return (
    <React.Fragment>
      {props.showPopup ? (
        <div
          className={
            props.showPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
          onClick={props.togglePopup}
        >
          <div className="mediaeye-popup-wrapper mediaeye-popup-imageviewer">
            <div className="mediaeye-popup-content">
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={props.togglePopup}
                >
                  <CloseIcon />
                </div>

                <img
                  className="mediaeye-popup-imageviewer-img"
                  onClick={(event) => event.stopPropagation()}
                  src={props.img}
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Popup;
