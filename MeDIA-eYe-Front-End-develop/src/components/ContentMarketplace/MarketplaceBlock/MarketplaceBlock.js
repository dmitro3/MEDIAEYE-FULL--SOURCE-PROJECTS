import React, { useState, useEffect, useRef } from 'react';
import { useMoralis } from 'react-moralis';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  queryFileType,
  roundString
} from '../../../blockchain/functions/Utils';
import { queryCollection } from '../../../blockchain/functions/Collection';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { Model3dSmall } from '../../3d/Model3d';
import { Grid, Heart, Eye, ImagePlug } from '../../Icons';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { queryLikesNFT } from '../../../blockchain/functions/Likes/QueryLikesNFT';
import { queryTopOffer } from '../../../blockchain/functions/Marketplace';
import { TokenName } from '../../../blockchain/functions/Addresses';
import { CheckUrlExist } from '../../../blockchain/functions/Utils';

const MarketplaceBlock = (props) => {
  const { Moralis, isInitialized } = useMoralis();
  const { count, name, url, isFile, totalTokens, nft } = props;
  useEffect(() => { }, [nft]);
  const dispatch = useDispatch();
  const [likesCount, setLikesCount] = useState(0);
  const [mimetype, setMimetype] = useState(null);
  const [collection, setCollections] = useState(null);
  const [nftCardImageActions, setsetNftCardImageActions] = useState(false);
  const [topOffer, setTopOffer] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const [dimensionHeight, setDimensionHeight] = useState(0);
  const cardRef = useRef(null);
  useEffect(() => {
    // card ratio 5:7
    setDimensionHeight(
      cardRef.current.clientWidth + (cardRef.current.clientWidth / 5) * 2
    );
  });
  const getFileType = async () => {
    let fileUrl = url;
    if (url.startsWith('Q'))
      fileUrl = 'https://meye.mypinata.cloud/ipfs/'.concat(url);
    const fileType = await Moralis.Cloud.run('queryFileType', {
      url: fileUrl
    });
    setMimetype(fileType);
  };
  const getLikes = async () => {
    const { count } = await queryLikesNFT(
      Moralis,
      nft?.attributes?.collectionAddress,
      nft?.attributes?.tokenId,
      nft?.attributes?.chainId
    );
    setLikesCount(count);
  };
  const getCollection = async () => {
    const result = await queryCollection(
      Moralis,
      nft?.attributes?.collectionAddress
    );
    setCollections(result);
  };
  const getTopOffer = async () => {
    const params = {
      collectionAddress: nft.attributes?.collectionAddress,
      tokenId: nft.attributes?.tokenId,
      chainId: nft.attributes?.chainId
    };
    const result = await queryTopOffer(Moralis, params);
    if (result) setTopOffer(result);
  };

  useEffect(() => {
    if (isInitialized && nft) {
      getLikes();
      getTopOffer();
      getCollection();
      setAllLoaded(true);
    }
  }, [isInitialized, nft]);

  useEffect(() => {
    if (url && allLoaded) {
      getFileType();
    }
  }, [allLoaded]);

  const hiddenCollectionMsg = () => {
    dispatch(
      toggleGeneralPopup({
        status: 'info',
        message:
          'This action will list this NFT from Hidden Collection. After listing such NFT, your hidden collection becomes publicly available!',
        textButton: 'OK',
        size: 'sm'
      })
    );
  };

  const getCardImageActions = () => {
    return (
      <div
        className="mediaeye-marketplace-card-inner-imgbox-over-actions"
        onClick={(event) => event.preventDefault()}
      >
        <div
          className="mediaeye-marketplace-card-inner-imgbox-over-actions-btn"
          onClick={() => hiddenCollectionMsg()}
        >
          <Eye />
        </div>
      </div>
    );
  };

  const getLink = () => {
    if (nft?.attributes?.chainId && nft?.attributes?.collectionAddress) {
      return `/product/${ChainName(nft?.attributes?.chainId)?.toLowerCase()}/${nft?.attributes?.collectionAddress
        }/${nft?.attributes?.tokenId}`;
    }
    return null;
  };
  const [cardBanner, setCardBanner] = useState(null);
  useEffect(async () => {
    let fileUrl = url;
    if (url.startsWith('Q'))
      fileUrl = 'https://meye.mypinata.cloud/ipfs/'.concat(url);
    if (fileUrl && (await CheckUrlExist(fileUrl))) {
      setCardBanner(fileUrl);
    }
    if (isFile) {
      setCardBanner(url);
      setMimetype(isFile);
    }
  }, [url]);
  return (
    <div className="mediaeye-marketplace-card">
      <Link
        className="mediaeye-marketplace-card-inner"
        to={getLink()}
        ref={cardRef}
      >
        <div
          className={`mediaeye-marketplace-card-inner-imgbox ${collection?.attributes?.hidden && nftCardImageActions
            ? 'mediaeye-marketplace-card-inner-imgbox-over'
            : ''
            }`}
          onMouseLeave={() => setsetNftCardImageActions(false)}
          onMouseEnter={() => setsetNftCardImageActions(true)}
        >
          <div className="mediaeye-marketplace-card-inner-imgbox-slide">
            {mimetype && cardBanner ? (
              mimetype === 'video/mp4' ? (
                <video
                  preload="metadata"
                  src={cardBanner}
                  playsInline
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              ) : mimetype === 'model/gltf+json' ||
                mimetype === 'model/gltf-binary' ||
                mimetype === 'text/plain' ||
                mimetype === 'application/json' ||
                mimetype === 'text/plain; charset=utf-8' ||
                mimetype === 'text/html' ||
                mimetype === 'obj' ||
                mimetype === 'gltf' ||
                mimetype === 'glb' ? (
                <Model3dSmall model={cardBanner} type={mimetype} />
              ) : (
                <img src={cardBanner} alt="NFTImg" />
              )
            ) : (
              <ImagePlug />
            )}
          </div>
        </div>

        {collection?.attributes?.hidden && nftCardImageActions
          ? getCardImageActions()
          : null}

        <div className="mediaeye-marketplace-card-inner-content">
          <div className="mediaeye-marketplace-card-inner-content-inner">
            <div className="mediaeye-marketplace-card-inner-content-top">
              <div className="mediaeye-nft-card-inner-content-top-left">
                <div className="mediaeye-marketplace-card-inner-content-collection">
                  {collection?.attributes?.name
                    ? collection?.attributes?.name
                    : 'Elon Musk Astronaut'}
                </div>
                <div className="mediaeye-marketplace-card-inner-content-title">
                  {name}
                </div>
              </div>
            </div>
            {nft ? (
              <div className="mediaeye-marketplace-card-inner-content-detail">
                <div className="mediaeye-marketplace-card-inner-content-detail-left">
                  <div className="mediaeye-marketplace-card-inner-content-detail-left-count">
                    {nft?.contract_type === 'ERC1155' ? (
                      <>
                        <Grid /> {count ? `${count} / ${totalTokens}` : ''}
                      </>
                    ) : (
                      <>
                        <Grid /> 1 / 1
                      </>
                    )}
                  </div>
                  <div className="mediaeye-nft-card-inner-content-detail-left-bottom">
                    <span>
                      <Heart type="white" />
                      {likesCount}
                    </span>
                  </div>
                </div>
                <div className="mediaeye-marketplace-card-inner-content-detail-right">
                  {topOffer ? (
                    <div className="mediaeye-nft-card-inner-content-detail-right-row">
                      Offer for{' '}
                      <img
                        src={
                          '/img/token/34/' +
                          TokenName(
                            topOffer.paymentMethod.toLowerCase(),
                            nft.attributes.chainId.toUpperCase()
                          ) +
                          '.png'
                        }
                        alt={TokenName(
                          topOffer.paymentMethod.toLowerCase(),
                          nft.attributes.chainId.toUpperCase()
                        )}
                      />
                      <span>
                        {roundString(Moralis.Units.FromWei(topOffer.price), 4)}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* <div className="explore_block_info explore_block_info_marketplace">
          <div className="marketplace_block_footer">
            <span className="count">
              <span></span>
            ----  {price} {priceType}
            </span>
          </div>
        </div> */}
      </Link>
    </div>
  );
};

export default MarketplaceBlock;
