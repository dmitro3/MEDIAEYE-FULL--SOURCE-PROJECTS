import React from "react";

//media
import ETH from "../../assets/images/Wallet/ETH.png";
import FTM from "../../assets/images/Wallet/FTM.png";
import BSC from "../../assets/images/Wallet/BSC.png";

const Blockchain = ({chain, setChain}) => {
  return (
    <React.Fragment>
      <div onChange={e=>setChain(e.target.value)} className="fav-mint-button-row">
        {/* <button className={`${Active ? "bttn active" : "bttn"}`} onClick={() => {toggleactive()}}><img src={ETH}/>ETH</button>
                <button className={`${Active ? "bttn active" : "bttn"}`} onClick={() => {toggleactive()}}><img src={BSC}/>BSC</button>
                <button className={`${Active ? "bttn active" : "bttn"}`} onClick={() => {toggleactive()}}><img src={FTM}/>FTM</button> */}
        <div className="fav-mint-button-row-div">
          <input
            type="radio"
            className="fav-mint-button-row-div-input"
            name="blockchain"
            id="bloackchain_1"
            value='4'
            checked={chain==='4'}
            readOnly
          />
          <label className="fav-mint-button-row-div-label" htmlFor="bloackchain_1">
            <span className="bttn">
              <img src={ETH} alt="no img" />
              ETH
            </span>
          </label>
        </div>
        <div className="fav-mint-button-row-div">
          <input
            type="radio"
            className="fav-mint-button-row-div-input"
            name="blockchain"
            id="bloackchain_2"
            value='97'
            checked={chain==='97'}
            readOnly
          />
          <label
            className="fav-mint-button-row-div-label"
            htmlFor="bloackchain_2"
          >
            <span className="bttn">
              <img src={BSC} alt="no img" />
              BSC
            </span>
          </label>
        </div>
        <div className="fav-mint-button-row-div">
          <input
            type="radio"
            className="fav-mint-button-row-div-input"
            name="blockchain"
            id="bloackchain_3"
            value='4002'
            checked={chain==='4002'}
            readOnly
          />
          <label
            className="fav-mint-button-row-div-label"
            htmlFor="bloackchain_3"
          >
            <span className="bttn">
              <img src={FTM} alt="no img" />
              FTM
            </span>
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Blockchain;
