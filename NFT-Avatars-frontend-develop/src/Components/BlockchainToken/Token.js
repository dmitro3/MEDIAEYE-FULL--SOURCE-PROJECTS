import React from "react";
import Exclamation from "../icons/Exclamation";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";

//media
import TokenType from "../../assets/images/TokenType.png";

const Token = ({type, setType}) => {
  const MetaTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#141233b0",
      color: "#fff",
      maxWidth: 500,
      fontSize: theme.typography.pxToRem(15),
      padding: "8px 21px",
      border: "none",
    },
  }));

  return (
    <React.Fragment>
      <div onChange={e=>setType(e.target.value)} className="fav-mint-button-row">
        {/* <button className={`${Active ? "bttn active" : "bttn"}`} onClick={() => {toggleactive()}}><img src={TokenType}/><span>ERC - 721</span><div className='icon'><Exclamation /></div></button>
                
                <button className={`${Active1 ? "bttn active" : "bttn"}`} onClick={() => {toggleactive1()}}><img src={TokenType}/><span>ERC - 1155</span><div className='icon'><Exclamation /></div></button> */}

        <div className="fav-mint-button-row-div">
          <input
            type="radio"
            className="fav-mint-button-row-div-input"
            name="token"
            id="token_1"
            value='ERC721'
            checked={type==='ERC721'}
            readOnly
          />
          <label className="fav-mint-button-row-div-label" htmlFor="token_1">
            <span className="bttn">
              <img src={TokenType} alt="no img" />
              <span>ERC - 721</span>
            </span>
          </label>
          <MetaTooltip
            title="ERC-721 is a global Token standard for developing Non-Fungible Tokens over the Ethereum blockchain. The ERC-721 contributes to the rarity and uniqueness to the assets designed and developed. The NFTs are developed with unique uint256 token ID attributes that are available globally."
            placement="top"
            TransitionComponent={Fade}
            followCursor
          >
            <div className="icon">
              <Exclamation />
            </div>
          </MetaTooltip>
        </div>

        <div className="fav-mint-button-row-div">
          <input
            type="radio"
            className="fav-mint-button-row-div-input"
            name="token"
            id="token_2"
            value='ERC1155'
            checked={type==='ERC1155'}
            readOnly
          />
          <label className="fav-mint-button-row-div-label" htmlFor="token_2">
            <span className="bttn">
              <img src={TokenType} alt="no img" />
              <span>ERC - 1155</span>
            </span>
          </label>
          <MetaTooltip
            title="ERC-721 is a global Token standard for developing Non-Fungible Tokens over the Ethereum blockchain. The ERC-721 contributes to the rarity and uniqueness to the assets designed and developed. The NFTs are developed with unique uint256 token ID attributes that are available globally."
            placement="top"
            TransitionComponent={Fade}
            followCursor
          >
            <div className="icon">
              <Exclamation />
            </div>
          </MetaTooltip>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Token;
