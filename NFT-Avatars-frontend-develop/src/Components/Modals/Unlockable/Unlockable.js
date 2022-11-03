import React, { useState } from 'react'
import "./Unlockable.scss"
import Cross from "../../icons/CrossIcon";
const Unlockable = (props) => {
  const[readyPopup,setreadyPopup]= useState(true)
  return (
    <>
      <div className={readyPopup?"unlockable-background":"unlockmain-disable"}>
        <div className="unlockable-main">
          <div className='unlockable-main-inner'>
            <button
              className="unlockable-close"
             onClick={()=>setreadyPopup(!readyPopup)}
            >
              {" "}
              <Cross />{" "}
            </button>
            <h4 className='unlockable-main-inner-title'>Unlockable Content</h4>
            <div className='unlockable-value'>
              <h3 className='unlockable-value-title'>Unlockable Content</h3>
              <p className='unlockable-value-content'>Include  unlockable content that can only <br /> be revealed by the owner of the item</p>
            </div>
            <button className='unlockable-closebtn'>Close</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Unlockable
