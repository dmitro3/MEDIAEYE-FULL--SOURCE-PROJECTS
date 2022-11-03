import React, { useEffect, useState } from "react";
import "./MyNFT.scss";
import { baseUrl, nftService } from "../../services/api.service";

const MyNFT = () => {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    async function getNfts() {
      const res = await nftService.fetch();
      setNfts(res);
    }
    getNfts();
  }, []);
  return (
    <React.Fragment>
      <div className="mediaProfilepage-datacontent-profiledetail-body-avatarbox">
        {
          nfts.map((nft, i) => (
            <button key={i} className="NFT_box">
              <img src={`${baseUrl}/upload/${nft.collection.image}`} alt="No img" />
              <span>{ nft.collection.name }</span>
            </button>
          ))
        }
      </div>
    </React.Fragment>
  );
};

export default MyNFT;
