import React, { useRef, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useDispatch, useSelector } from 'react-redux';
import './PutOnBlock.scss';
import { Check, Grid, Heart, Eye, ImagePlug } from '../../Icons';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { queryCollection } from '../../../blockchain/functions/Collection';
import { queryLikesNFT } from '../../../blockchain/functions/Likes/QueryLikesNFT';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { queryFileType } from '../../../blockchain/functions/Utils';
import { CheckUrlExist } from '../../../blockchain/functions/Utils';
import { Model3dSmall } from '../../3d/Model3d';
const PutOnBlock = (props) => {
  const dispatch = useDispatch();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { Moralis, isInitialized } = useMoralis();
  const { product, addImage, selectedCard, key } = props;
  const sliderRef = useRef();
  const metadata = JSON.parse(product.metadata);
  const [cardselect, setCardSelect] = useState(false);
  const [nftCardImageActions, setsetNftCardImageActions] = useState(false);
  const [collection, setCollections] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [dimensionHeight, setDimensionHeight] = useState(0);
  const cardRef = useRef(null);
  const [mimetypes, setMimetypes] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const [cardBanner, setCardBanner] = useState(null);

  const getFileType = async () => {
    if (
      metadata?.animation_url &&
      (await CheckUrlExist(metadata?.animation_url))
    ) {
      setCardBanner(metadata?.animation_url);
      setMimetypes('video/mp4');
    } else if (metadata?.image) {
      let fileUrl = metadata?.image;
      if (metadata?.image?.startsWith('Q'))
        fileUrl = 'https://meye.mypinata.cloud/ipfs/'.concat(metadata?.image);
      const doesExist = await CheckUrlExist(fileUrl);
      if (doesExist) {
        const fileType = await Moralis.Cloud.run('queryFileType', {
          url: fileUrl
        });
        setCardBanner(fileUrl);
        setMimetypes(fileType);
      }
    }
  };

  useEffect(() => {
    if (metadata && allLoaded) getFileType();
  }, [allLoaded]);

  useEffect(() => {
    // card ratio 5:7
    setDimensionHeight(
      cardRef.current.clientWidth + (cardRef.current.clientWidth / 5) * 2
    );
  });
  const getCollection = async () => {
    const result = await queryCollection(Moralis, product?.token_address);
    setCollections(result);
  };
  const getLikes = async () => {
    const { count } = await queryLikesNFT(
      Moralis,
      product.token_address,
      product.token_id,
      ChainHexString(activeNetwork)
    );
    setLikesCount(count);
  };
  useEffect(() => {
    let isChecked = selectedCard.some((element) => {
      if (
        element?.token_address === product?.token_address &&
        element?.token_id === product?.token_id
      ) {
        return true;
      }
      return false;
    });
    setCardSelect(isChecked);
  }, [selectedCard, product]);

  useEffect(() => {
    if (isInitialized && !allLoaded && product?.token_address) {
      getCollection();
      if (product?.token_id && activeNetwork) {
        getLikes();
      }
      setAllLoaded(true);
    }
  }, [activeNetwork, isInitialized, product]);

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

  return (
    <>
      <div className="mediaeye-marketplace-card">
        <div className="mediaeye-marketplace-card-inner" ref={cardRef}>
          <div className={`mediaeye-marketplace-card-inner-imgbox ${collection?.attributes?.hidden && nftCardImageActions ? 'mediaeye-marketplace-card-inner-imgbox-over' : ''}`} onMouseLeave={() => setsetNftCardImageActions(false)} onMouseEnter={() => setsetNftCardImageActions(true)}>
            <div className="mediaeye-marketplace-card-inner-imgbox-slide">
              {metadata?.animation_url &&
                cardBanner &&
                mimetypes === 'video/mp4' ? (
                <video
                  preload="metadata"
                  src={cardBanner}
                  playsInline
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              ) : metadata?.image && cardBanner && mimetypes ? (
                mimetypes === 'video/mp4' ? (
                  <video
                    preload="metadata"
                    src={cardBanner}
                    playsInline
                    controlsList="nodownload"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : mimetypes === 'model/gltf+json' ||
                  mimetypes === 'application/json' ||
                  mimetypes === 'model/gltf-binary' ||
                  mimetypes === 'text/plain' ||
                  mimetypes === 'text/plain; charset=utf-8' ||
                  mimetypes === 'text/html' ? (
                  <Model3dSmall model={cardBanner} type={mimetypes} />
                ) : (
                  <img src={cardBanner} alt="card_banner" />
                )
              ) : (
                <ImagePlug />
              )}
            </div>
          </div>

          <div className="mediaeye-marketplace-card-inner-content-checkbox">
            <label className="mediaeye-marketplace-card-inner-content-checkbox-label">
              {cardselect ? <Check size="small" /> : null}

              <input
                className="mediaeye-marketplace-card-inner-content-checkbox-label-checkbox"
                id={`${product.token_address}/${product.token_id}`}
                type="checkbox"
                onChange={(e) => {
                  addImage(
                    e,
                    product.token_address,
                    product.token_id,
                    product.amount
                  );
                }}
              />
            </label>
          </div>
          {collection?.attributes?.hidden && nftCardImageActions
            ? getCardImageActions()
            : null}
          <div className="mediaeye-marketplace-card-inner-content">
            <div className="mediaeye-marketplace-card-inner-content-inner">
              <div className="mediaeye-marketplace-card-inner-content-top">
                <div className="mediaeye-marketplace-card-inner-content-top-left">
                  <div className="mediaeye-marketplace-card-inner-content-collection">
                    {collection?.attributes?.name}
                  </div>
                  <div className="mediaeye-marketplace-card-inner-content-title">
                    {metadata?.name}
                  </div>
                </div>
                <div className="mediaeye-marketplace-card-inner-content-top-right"></div>
              </div>

              <div className="mediaeye-marketplace-card-inner-content-bottom">
                <div className="mediaeye-marketplace-card-inner-content-bottom-left">
                  {product?.contract_type === 'ERC1155' ? (
                    <span>
                      <Grid />
                      {product?.amount}
                    </span>
                  ) : (
                    <span>
                      <Grid /> 1/1
                    </span>
                  )}
                </div>
                <div className="mediaeye-marketplace-card-inner-content-bottom-right">
                  <span>Royalties: 10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PutOnBlock;
