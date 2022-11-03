import React, { useState } from 'react';
import "./Checkout.scss";

import Etherium from "../../../assets/images/Wallet/ETH.png"
import ETH from "../../../assets/images/Wallet/eth-small.png";
import Heart from "../../../assets/images/Wallet/heart.png";
import DemoCard from "../../../assets/images/demo-market.png";
import Cross from "../../icons/CrossIcon";

const Checkout = () => {
    const[readyPopup,setreadyPopup]= useState(true)
    // const consumer = [
    //     {
    //         value: "2",
    //         label: "2 Day",
    //     },
    // ];

    return (
        <div className={readyPopup?"checkout-background":"disable"}>
            <div className='checkout-main'>
                <div className='checkout-main-inner'>
                    <button
                        className="checkout-close"
                        onClick={() => setreadyPopup(!readyPopup)}
                    >
                        {" "}
                        <Cross />{" "}
                    </button>
                    <h4 className='checkout-main-inner-heading'>Complete checkout</h4>
                    <div className='checkout-main-inner-image'>
                        <div className='marketplace-card'>
                            <div className='marketplace-card-inner'>
                                <img src={DemoCard} className='marketplace-card-proimg' alt="ava-market" />
                                <div className='marketplace-card-inner-detail'>
                                    <p className='name'>Bored Ape Yacht Club</p>
                                    <p className='valhas'>#8500</p>
                                    <div className='social-rate'>
                                        <h5 className='likes'><img src={Heart} className='' alt='heart' />1,2k</h5>
                                        <div className=''>
                                            <h5 className='title'>Price</h5>
                                            <h5 className='likes'><img src={ETH} className='' alt="eth" /> 54</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-token">
                        <div className="token-price">
                            <h5 className='token-price-title'> Price</h5>
                            <p className='token-price-value'> <img className="tokenimg" src={Etherium} alt="token-img" /> <p className="tokenprice"> 1.2 ETH</p> <span> $2 534,36</span> </p>
                        </div>

                        <div className="token-quantity">
                            <h5 className='token-quantity-title'> Quantity</h5>
                            <div className="token-quantity-value">
                                <input type="text" className='value-input' value="7" />
                                <span>MAX</span>
                            </div>
                        </div>
                        <div className="token-total">
                            <h5 className='token-total-title'> Total</h5>
                            <p className='token-total-value'> <img className="tokenimg" src={Etherium} alt="token-img" /> <span className='tokentotal'> 10 ETH </span> <span> $12 534,36</span> </p>
                        </div>
                    </div>
                    {/* <div className="checkout-token-total">
                <div className="token">
                    <h5 className='token-title'> Total</h5>
                    <p className='token-value'> <img  className="tokenimg" src={Etherium} alt="token-img" />10 ETH <span> $12 534,36</span> </p>
                    </div>
                </div> */}
                    <div className="checkout-term">
                        <input className='checkout-radio' id="first" type="radio" name="numbers" value="first" />
                        <label className="checkout-label" htmlFor="first"><p className='checkout-term-name'>By checking this box, I agree to
                            <a className='checkout-highlight'> Terms & Conditions</a></p></label>
                    </div>
                    <button className='checkout-btn'>Checkout</button>
                </div>
            </div>
        </div>

    )
}

export default Checkout;
