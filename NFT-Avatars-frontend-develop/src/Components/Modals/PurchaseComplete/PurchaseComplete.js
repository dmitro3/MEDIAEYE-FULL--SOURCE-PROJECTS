import React, { useState } from 'react';
import "./PurchaseComplete.scss";
import monkey from "../../../assets/images/Rectangle 3452.png"
import Cross from "../../icons/CrossIcon";
const PurchaseComplete = () => {
  const[readyPopup,setreadyPopup]= useState(true)
    return (
      <div className={readyPopup?"purchasecomplete-background":"disable"}>
        <div className='purchasecomplete-main'>
            <div className='purchasecomplete-main-inner'>
            <button
              className="purchasecomplete-close"
              onClick={() => {setreadyPopup(!readyPopup)
              }}
            >
              {" "}
              <Cross />{" "}
            </button>
                <h4 className='purchasecomplete-main-inner-heading'>Your purchase is complete!</h4>
                <div className='purchasecomplete-main-inner-image'>
                    <img className='bid-img' src={monkey} alt=" bid-img" />
                </div>
                <div className='purchasecomplete-main-details'>
                <p className='purchasecomplete-value'>
                  You are  now the  proud  owner of <span>BORED APE #8307</span>
                  <br/>
                  from the  Bored Ape Yacht Club collection. <br/>
                  Creator:<span>StainedApe</span>
                </p>
               </div>
            </div>
            

        </div>
        </div>
    )
}

export default PurchaseComplete;

