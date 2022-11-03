import React, { useEffect, useState } from "react";
import Blockchain from "../BlockchainToken/Blockchain";
import Token from "../BlockchainToken/Token";
import Unlock from "../icons/Unlock";
import Exclamation from "../icons/Exclamation";
import Switch from "react-switch";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";

import Demo  from "../../assets/images/mickey_pig.png";
import Search from "../../assets/images/search.png";
import Close from "../../assets/images/close_icon.png";

//media
import AddMint from "./AddMint";
import { useSearchParams } from "react-router-dom";
import {
  baseUrl,
  collectionService,
  nftService,
} from "../../services/api.service";
import { networks, switchNet } from "../../utils/network.util";
import { Contract } from "ethers";
import { address } from "../../utils/wallet.utils";
import Factory from "../../contracts/FactoryV1.sol/FactoryV1.json";
import { useWeb3React } from "@web3-react/core";

const SideMint = () => {
  const [toggleUnlocable, setToggleUnlocable] = useState(false);
  const [collection, setCollection] = useState();

  const [searchParams] = useSearchParams();
  const { library } = useWeb3React();

  useEffect(() => {
    async function fetchCollection() {
      const id = searchParams.get("collection");
      if (!id) return;
      const res = await collectionService.fetchOne(id);
      setCollection(res);
    }
    fetchCollection();
  }, []);

  function ToggleButton() {
    const [on, setOnState] = React.useState(false);
    const toggle = () => setOnState(o => !o);
    return (
      <button className={on ? 'on' : 'off'} on={on} onClick={toggle}>
        <span className="pin" />
      </button>
    );
  }

  const mintNFT = async () => {
    // swtich chain
    if (window.ethereum !== undefined) {
      await window.ethereum.request(
        switchNet(networks[collection.chain].chainId)
      );
    }
    if (!library) {
      window.alert("You have to connect your wallet.");
      return;
    }
    const contract = new Contract(
      address[collection.chain]["1155"],
      Factory.abi,
      library.getSigner()
    );
    await contract.deployAvatar(
      collection.id,
      collection.baseUri,
      collection.royalties
    );
    contract.once("DeployedAvatar", async (avatarAddress) => {
      await nftService.create({
        address: avatarAddress,
        collectionId: collection.id,
      });
    });
  };

  const switchUnlocable = () => {
    if (toggleUnlocable) {
      setToggleUnlocable(false);
    } else {
      setToggleUnlocable(true);
    }
  };

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
      cursor: "pointer",
    },
  }));

  return (
    collection && (
      <React.Fragment>
        <div className="mediaProfilepage-datacontent-profiledetail fav">
          <div className="fav-mint">
            <div className="fav-mint-head">
              <h1>NFT Image</h1>
              <img src={`${baseUrl}/upload/${collection.image}`} alt="no img" />
            </div>
            <div className="fav-mint-button">
              <h1 className="pd-50">Blochchain Network And Token Type</h1>
              <Blockchain chain={collection.chain} />
              <Token type={collection.type} />
            </div>
            <form className="fav-mint-group">
              <div className="fav-mint-group-inner">
                <div className="fav-mint-group-inner-input">
                  <label>Name*</label>
                  <input
                    value={collection.name}
                    type="text"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="fav-mint-group-inner-input">
                  <label>Embed your URL link</label>
                  <input
                    value={collection.baseUri}
                    type="text"
                    placeholder="Enter Website"
                  />
                </div>
              </div>
              <div className="fav-mint-group-inner-input">
                <label>Description</label>
                <textarea
                  value={collection.desc}
                  rows="5"
                  placeholder="Enter Description"
                ></textarea>
              </div>
            </form>
            <AddMint />
            <div className="fav-mint-unlockBox">
              <div className="fav-mint-unlockBox-head">
                <Switch
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onChange={() => {
                    switchUnlocable();
                  }}
                  checked={toggleUnlocable}
                  height={20}
                  width={40}
                />
                <div className="fav-mint-unlockBox-head-inner">
                  <Unlock />
                  <h3>Unlockable Content</h3>
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
              {toggleUnlocable ? (
                <div className="fav-mint-group-inner-input">
                  <textarea placeholder="Enter Content" rows="5" />
                </div>
              ) : null}
            </div>
            <div className="mediaMinters">
                <div className="mediaMinters-inner">
                  <div className="mediaMinters-inner-head">
                  <ToggleButton />
                      <h4 className="title">Add Controllers</h4>
                  </div>
                  <div className="mediaMinters-inner-filter">
                    <div className="addMint">
                      <div className="self">
                          <img src={Demo} className="user-img" alt="us-img"/>
                          <p className="user-name">You</p>
                      </div>
                      <button className="btn-mint">Add Controller</button>
                    </div>
                    <div className="search">
                      <input type="text" className="search-input" placeholder="@user_name or wallet address"/>
                      <button className="btn-search"><img src={Search} className="search-img" alt="search"/></button>
                    </div>
                  </div>
                  <div className="mediaMinters-inner-data">
                    <div className="mintUser">
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                      <div className="card">
                        <button className="card-close"><img src={Close} className="closeImg" alt="close"/></button>
                        <img src={Demo} className="card-userImg" alt=""/>
                        <h4 className="card-userName">@user123</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className="center pd-50">
              <button onClick={mintNFT} className="btn btn-info">
                Mint
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default SideMint;
