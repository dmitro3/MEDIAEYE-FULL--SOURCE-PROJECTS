import React from 'react';
import './popup.scss';
import CloseIcon from '../../Icons/CloseIcon';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeNetwork,
  toggleSubscribePopup
} from '../../../store/app/appSlice';

const Popup = (props) => {
  const dispatch = useDispatch();
  const nextNetwork = useSelector((state) => state.app.showSubscribePopup);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  const handleNetwork = (value) => {
    dispatch(changeNetwork(value));
    dispatch(toggleSubscribePopup(null));
  };

  return (
    <React.Fragment>
      <div
        className={nextNetwork !== null ? 'popup active' : 'popup'}
        onClick={() => dispatch(toggleSubscribePopup(null))}
      >
        <div className="popup-wrapper popup-wrapper_general notification_popup">
          <div
            className="container"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="main_add_popup general_popup">
              <div
                className="close"
                onClick={() => dispatch(toggleSubscribePopup(null))}
              >
                <CloseIcon />
              </div>
              <div className="main_subscribe_popup">
                <h2>You have subscribed on another chain</h2>
                <button onClick={() => handleNetwork(nextNetwork)}>
                  Switch to <span>{nextNetwork}</span>
                </button>
                <div className="main_subscribe_wallet">
                  <div className="main_subscribe_wallet_wrapper">
                    <div
                      className={[
                        'main_subscribe_wallet_item',
                        activeNetwork === 'ETH' ? 'active' : ''
                      ].join(' ')}
                    >
                      <span>ETH</span>
                    </div>
                    <div
                      className={[
                        'main_subscribe_wallet_item',
                        activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
                          ? 'active'
                          : ''
                      ].join(' ')}
                    >
                      <span>BSC</span>
                    </div>
                    <div
                      className={[
                        'main_subscribe_wallet_item',
                        activeNetwork === 'FTM' ? 'active' : ''
                      ].join(' ')}
                    >
                      <span>FTM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Popup;
