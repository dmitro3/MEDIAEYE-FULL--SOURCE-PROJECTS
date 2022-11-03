import React, { useEffect, useState } from 'react';
import { TokenName } from '../../../blockchain/functions/Addresses';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import { ethers } from 'ethers';
import { convertPrice } from '../../../blockchain/functions/Utils';
import { useMoralis } from 'react-moralis';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import '../Product/ClaimPopup/PopupClaim.scss';
import { Grid } from '../../Icons';

export const ClaimBidsCard = (props) => {
  const { nft, currentListing, bid } = props;
  const { isInitialized, Moralis } = useMoralis();
  const [usdPrice, setUsdPrice] = useState('0');

  const productItem = {
    id: [nft?.id],
    img: [nft?.img],
    fullImage: [nft?.fullImage],
    fileType: [nft?.fileType],
    title: [nft?.title]
  };

  const priceType = TokenName(
    bid?.attributes?.paymentMethod?.toLowerCase(),
    nft?.chainId
  );

  const getUsdPrice = async () => {
    const params = {
      chainId: nft?.chainId,
      price: bid?.attributes?.price,
      token: priceType,
      native: false
    };
    const result = await convertPrice(Moralis, params);
    setUsdPrice(String(result));
  };

  useEffect(() => {
    if (isInitialized && bid?.attributes?.price && priceType) getUsdPrice();
  }, [isInitialized]);

  return (
    <>
      <div className="mediaeye-popup-content-inner-header">
        <div className="mediaeye-popup-content-inner-header-title text-center">
          Claim Bid
        </div>
      </div>
      <div className="claim-bid-card-content">
        <ExploreBlock product={productItem} key={1} />
      </div>
      <div className="claim-bid-card-row">
        <div className="claim-bid-card-row-section1">
          <Grid />
          x1
        </div>
        <div className="claim-bid-card-row-section2">
          <img src={'/img/token/34/' + priceType + '.png'} alt={priceType} />
          <span>
            {roundString(
              ethers.utils.formatEther(bid?.attributes?.price ?? 0),
              4
            )}
          </span>
        </div>
        <span className="claim-bid-card-row-section3">
          (${roundString(ethers.utils.formatEther(usdPrice), 2)})
        </span>
      </div>
    </>
  );
};

export default ClaimBidsCard;
