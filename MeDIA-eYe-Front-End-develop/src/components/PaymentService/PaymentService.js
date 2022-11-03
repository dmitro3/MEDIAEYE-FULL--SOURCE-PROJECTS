import React, { useState } from 'react';
import './PaymentService.scss';
import OnRamp from '../../assets/img/OnRamp.png';
import Ramp from '../../assets/img/Ramp.png';
import BitPay from '../../assets/img/BitPay.png';
const PaymentService = () => {
  return (
    <div className="payment-service-page">
      <div className="payment-service-page-header">
        <span>Payment Services</span>
      </div>
      <div className="payment-service-page-subheading">
        <span>Crypto with card</span>
      </div>
      <div className="payment-service-page-content">
        <div className="payment-service-page-content-col">
          <button className="payment-service-page-content-col-btn">
            <img
              className="payment-service-page-content-col-btn-icon"
              src={OnRamp}
              alt="OnRamper"
            ></img>
            OnRamper
          </button>
        </div>
        <div className="payment-service-page-content-col">
          <button className="payment-service-page-content-col-btn">
            <img
              className="payment-service-page-content-col-btn-icon"
              src={Ramp}
              alt="Ramp"
            />
            Ramp
          </button>
        </div>
        <div className="payment-service-page-content-col">
          <button className="payment-service-page-content-col-btn" disabled>
            <img
              className="payment-service-page-content-col-btn-icon"
              src={BitPay}
              alt="BitPay"
            />
            BitPay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentService;
