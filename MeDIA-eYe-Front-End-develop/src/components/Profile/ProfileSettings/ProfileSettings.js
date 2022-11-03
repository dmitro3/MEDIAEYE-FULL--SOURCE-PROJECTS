import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import { injectedConnector } from '../../../connectors';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WidgetContainer from '../OnRamperPopup/Popup';
import { useMoralis } from 'react-moralis';
import { TokenAddress } from '../../../blockchain/functions/Addresses/';
import './Payment.scss';
import OnRamp from '../../../assets/img/OnRamp.png';
import Ramp from '../../../assets/img/Ramp.png';
import BitPay from '../../../assets/img/BitPay.png';
import Paypal from '../../../assets/img/Paypal.png';

const ProfileSettings = (props) => {
  const { chainId, account, activate, deactivate } = useWeb3React();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { Moralis, user } = useMoralis();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  const onConnectMetaMask = () => {
    activate(injectedConnector);
  };

  const onConnectRamp = () => {
    new RampInstantSDK({
      hostAppName: 'MeDIA EYE',
      hostApiKey: process.env.REACT_APP_RAMP_PRIVATE_KEY,
      hostLogoUrl:
        'https://mediaeyenft.sgp1.digitaloceanspaces.com/Logo_MEDIA_EYE_dark.png'
    }).show();
  };

  return (
    <div className="profile-page-content-main">
      <div className="profile-page-content-main-inner">
        <div className="profile-page-content-main-header">
          <h2 className="text-left">Payment Methods</h2>
          <div className="profile-page-content-main-header-info">
            Fund your wallet with a Credit/Debit Card
          </div>
        </div>
        <div className="profile-page-content-main-body">
          <div className="profile-page-payment">
            <div className="profile-page-payment-content">
              <div className="profile-page-payment-content-col">
                <button
                  className="profile-page-payment-content-col-btn"
                  onClick={handleOpen}
                >
                  <img
                    className="profile-page-payment-content-col-btn-icon"
                    src={OnRamp}
                    alt="OnRamper"
                  ></img>
                  OnRamper
                </button>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <WidgetContainer></WidgetContainer>
                </Box>
              </Modal>
              <div className="profile-page-payment-content-col">
                <button
                  className="profile-page-payment-content-col-btn"
                  onClick={onConnectRamp}
                >
                  <img
                    className="profile-page-payment-content-col-btn-icon"
                    src={Ramp}
                    alt="Ramp"
                  />
                  Ramp
                </button>
              </div>

              <div className="profile-page-payment-content-col">
                <button
                  className="profile-page-payment-content-col-btn hovcom"
                  disabled
                >
                  <img
                    className="profile-page-payment-content-col-btn-icon"
                    src={BitPay}
                    alt="BitPay"
                  />
                  BitPay
                </button>
                <div className="profile-page-payment-content-col-commingBtn">
                  Coming Soon
                </div>
              </div>
              <div className="profile-page-payment-content-col">
                <button
                  className="profile-page-payment-content-col-btn hovcom"
                  disabled
                >
                  <img
                    className="profile-page-payment-content-col-btn-icon"
                    src={Paypal}
                    alt="Paypal"
                  ></img>
                  Paypal
                </button>
                <div className="profile-page-payment-content-col-commingBtn">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
