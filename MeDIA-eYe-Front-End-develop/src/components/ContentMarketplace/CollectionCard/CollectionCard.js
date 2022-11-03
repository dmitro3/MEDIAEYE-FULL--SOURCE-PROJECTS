import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Collapse } from 'react-collapse';
import { useMoralis } from 'react-moralis';
import { useHistory, Link } from 'react-router-dom';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import { formatEther } from 'ethers/lib/utils';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import {
  queryFloorPrice,
  queryTotalVolume
} from '../../../blockchain/functions/Collection';
import {
  queryLikesCollection,
  toggleLikeCollection
} from '../../../blockchain/functions/Likes';
import { queryCollectionNFTCount } from '../../../blockchain/functions/Sales';
import formatAdddress from '../../../utils/formatAdddress';
import { subString } from '../../../utils/functions';
import { closeExtendPopup } from '../../../store/app/appSlice';
import {
  CollectionBlockPlug,
  ImagePlug,
  Eye,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Telegram,
  Angle,
  Linkedin,
  Spotify,
  Flickr,
  Twitch,
  Grid,
  Discord
} from '../../Icons/';
import './CollectionCard.scss';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { Check } from '../../Icons';
import {
  GetDefaultImages,
  CheckUrlExist
} from '../../../blockchain/functions/Utils';

const CollectionCard = (props) => {
  const {
    collection,
    onClickAction,
    active,
    isFeatured,
    selectCard,
    selectedCard,
    from,
    Spotlight
  } = props;
  let history = useHistory();

  const { user, isInitialized, Moralis } = useMoralis();
  const [showMinters, setShowMinters] = useState(false);
  const [count, setCount] = useState(null);
  const [copyLink, setCopyLink] = useState(false);
  const [floorPrice, setFloorPrice] = useState();
  const [totalVolume, setTotalVolume] = useState();
  const [numLikes, setNumLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [collectionOwner, setCollectionOwner] = useState(
    formatAdddress(collection?.attributes?.owner)
  );
  const dispatch = useDispatch();
  const [showCollectionPopup, setShowCollectionPopup] = useState(false);
  const cardRef = useRef(null);

  const [collectionLogo, setCollectionLogo] = useState(null);
  const [collectionBanner, setCollectionBanner] = useState(null);

  useEffect(async () => {
    if (
      collection?.attributes?.logo &&
      (await CheckUrlExist(collection?.attributes?.logo))
    ) {
      setCollectionLogo(collection?.attributes?.logo);
    }
  }, [collection?.attributes?.logo]);
  useEffect(async () => {
    if (
      collection?.attributes?.featured &&
      (await CheckUrlExist(collection?.attributes?.featured))
    ) {
      setCollectionBanner(collection?.attributes?.featured);
    }
  }, [collection?.attributes?.featured]);

  const getPriceSymbol = () => {
    switch (collection?.attributes?.chainId) {
      case '0x1':
        return (
          <span>
            <img src="/img/token/34/ETH.png" alt="eth" /> ETH
          </span>
        );
      case process.env.REACT_APP_BSC_CHAIN_ID:
        return (
          <span>
            <img src="/img/token/34/BNB.png" alt="bnb" /> BNB
          </span>
        );
      case '0xfa':
        return (
          <span>
            <img src="/img/token/34/FTM.png" alt="ftm" /> FTM
          </span>
        );
      default:
        return null;
    }
  };
  const priceSymbol = getPriceSymbol();

  const userDisplay = async () => {
    // get user and check if they have username
    const params = { address: collection?.attributes?.owner };
    const user = await Moralis.Cloud.run('queryUser', params);
    if (user?.attributes?.defaultUsername === false)
      setCollectionOwner(user?.attributes?.username);
  };

  useEffect(() => {
    if (isInitialized) {
      userDisplay();
    }
  }, [isInitialized]);

  const creator = () => {
    return (
      <>
        {user?.attributes?.ethAddress === collection?.attributes?.owner ? (
          <Link
            to={`/account/${user?.attributes?.ethAddress}`}
            className="mediaeye-collection-card-inner-content-creator-link"
            onClick={() => dispatch(closeExtendPopup())}
          >
            You
          </Link>
        ) : (
          <Link
            to={`/account/${collection?.attributes?.owner}`}
            className="mediaeye-collection-card-inner-content-creator-link"
            onClick={() => dispatch(closeExtendPopup())}
          >
            {collectionOwner}
          </Link>
        )}
      </>
    );
  };

  const cardCheckbox = () => {
    return (
      <div
        className="mediaeye-collection-card-inner-content-checkbox"
        onClick={(event) => event.preventDefault()}
      >
        <label
          className="mediaeye-collection-card-inner-content-checkbox-label"
          onClick={(e) => {
            selectCard(
              selectedCard?.attributes?.collectionAddress ===
                collection?.attributes?.collectionAddress
                ? false
                : true,
              collection
            );
          }}
        >
          {collection?.attributes?.collectionAddress &&
            selectedCard?.attributes?.collectionAddress ===
            collection?.attributes?.collectionAddress ? (
            <Check size="small" />
          ) : null}
        </label>
      </div>
    );
  };

  const getHiddenImageActions = () => {
    return (
      <div className="mediaeye-collection-card-inner-imgbox-over active">
        <div className="mediaeye-collection-card-inner-imgbox-over-btn">
          <Eye />
        </div>
      </div>
    );
  };
  const collectionPopup = () => {
    return (
      <>
        <div className="mediaeye-collection-card-inner-popup">
          <div className="mediaeye-collection-card-inner-popup-content">
            <div className="mediaeye-collection-card-inner-popup-row">
              <div className="mediaeye-collection-card-inner-popup-row-left">
                Items
              </div>
              <div className="mediaeye-collection-card-inner-popup-row-right">
                7.0k
              </div>
            </div>
            <div className="mediaeye-collection-card-inner-popup-row">
              <div className="mediaeye-collection-card-inner-popup-row-left">
                Type
              </div>
              <div className="mediaeye-collection-card-inner-popup-row-right">
                ERC - 721
              </div>
            </div>
            <div className="mediaeye-collection-card-inner-popup-row">
              <div className="mediaeye-collection-card-inner-popup-row-left">
                Floor
              </div>
              <div className="mediaeye-collection-card-inner-popup-row-right">
                74.0
              </div>
            </div>

            <div className="mediaeye-collection-card-inner-popup-row">
              <div className="mediaeye-collection-card-inner-popup-row-left">
                Volume
              </div>
              <div className="mediaeye-collection-card-inner-popup-row-right">
                7.0k
              </div>
            </div>
            <div className="mediaeye-collection-card-inner-popup-row">
              <div className="mediaeye-collection-card-inner-popup-row-left">
                Owners
              </div>
              <div className="mediaeye-collection-card-inner-popup-row-right">
                350
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderSocialMedia = (collection) => {
    let socialMediaIcons = [];
    if (collection?.attributes?.links?.website) {
      socialMediaIcons.push(
        <a
          target="_blank"
          href={collection?.attributes?.links?.website}
          rel="noreferrer"
          className="mediaeye-collection-card-inner-content-social-btn"
          aria-label="Globe"
        >
          <Globe />
        </a>
      );
    }
    if (collection?.attributes?.links?.instagram)
      socialMediaIcons.push(
        <a
          target="_blank"
          href={
            'https://instagram.com/' + collection?.attributes?.links?.instagram
          }
          rel="noreferrer"
          className="mediaeye-collection-card-inner-content-social-btn"
          aria-label="Instagram"
        >
          <Instagram />
        </a>
      );
    if (collection?.attributes?.links?.telegram)
      socialMediaIcons.push(
        <a
          target="_blank"
          href={'https://t.me/' + collection?.attributes?.links?.telegram}
          rel="noreferrer"
          className="mediaeye-collection-card-inner-content-social-btn"
          aria-label="Telegram"
        >
          <Telegram />
        </a>
      );
    if (collection?.attributes?.links?.twitter)
      socialMediaIcons.push(
        <a
          target="_blank"
          href={'https://twitter.com/' + collection?.attributes?.links?.twitter}
          rel="noreferrer"
          className="mediaeye-collection-card-inner-content-social-btn"
          aria-label="Twitter"
        >
          <Twitter />
        </a>
      );
    if (collection?.attributes?.links?.discord)
      socialMediaIcons.push(
        <a
          target="_blank"
          href={
            'https://discord.com/user/' + collection?.attributes?.links?.discord
          }
          rel="noreferrer"
          className="mediaeye-collection-card-inner-content-social-btn"
          aria-label="Discord"
        >
          <Discord />
        </a>
      );

    if (socialMediaIcons !== [])
      return (
        <div
          className="mediaeye-collection-card-inner-content-social"
          onClick={(event) => event.stopPropagation()}
        >
          {socialMediaIcons}
        </div>
      );
    else return null;
  };

  return (
    <>
      <div className="mediaeye-collection-card">
        <Link
          ref={cardRef}
          className={`mediaeye-collection-card-inner ${onClickAction ? (active ? 'active' : 'no_active') : ''
            }`}
          target={
            from === 'extendPopup' || from === 'featurePopup' ? '_blank' : null
          }
          onClick={onClickAction ? (e) => onClickAction(e) : null}
          to={`/collections/${ChainName(
            collection?.attributes?.chainId
          )?.toLowerCase()}/${collection?.attributes?.collectionAddress}`}
          type={
            isFeatured === true || Spotlight
              ? 'featured'
              : collection?.attributes?.type === 'generative'
                ? 'generative'
                : 'simple'
          }
        >
          <div className="mediaeye-collection-card-inner-imgbox">
            <div className="mediaeye-collection-card-inner-imgbox-slide">
              {collectionBanner ? (
                <img
                  className="mediaeye-collection-card-inner-imgbox-slide-img"
                  src={collectionBanner}
                  alt={collection?.attributes?.name}
                />
              ) : (
                <ImagePlug />
              )}
            </div>
            {!showCollectionPopup && collection?.attributes?.hidden
              ? getHiddenImageActions()
              : null}
            {showCollectionPopup ? collectionPopup() : null}

            {!showCollectionPopup && selectCard ? cardCheckbox() : null}
            <div className="mediaeye-collection-card-inner-content-logo">
              <img
                src={
                  collectionLogo ? collectionLogo : GetDefaultImages('cardlogo')
                }
                className="mediaeye-collection-card-inner-content-logo-img"
                alt={`${collection?.attributes?.name} Logo`}
              />
            </div>
          </div>
          <div className="mediaeye-collection-card-inner-content">
            {collection?.attributes?.type === 'generative' ? (
              <div className="mediaeye-collection-card-inner-content-type">
                Generative
              </div>
            ) : null}
            <div className="mediaeye-collection-card-inner-content-inner">
              <div className="mediaeye-collection-card-inner-content-top">
                <div className="mediaeye-collection-card-inner-content-top-left">
                  <div className="mediaeye-collection-card-inner-content-title">
                    {collection?.attributes?.name ? (
                      <span
                        onMouseLeave={() => setShowCollectionPopup(false)}
                        onMouseEnter={() => setShowCollectionPopup(true)}
                      >
                        {collection?.attributes?.name}
                      </span>
                    ) : null}
                  </div>
                  <div className="mediaeye-collection-card-inner-content-creator">
                    {collection?.attributes?.owner ? (
                      <>
                        <div className="mediaeye-collection-card-inner-content-creator-heading">
                          Creator:
                        </div>
                        {creator()}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mediaeye-collection-card-inner-content-middle">
                {collection?.attributes?.type === 'generative' ? (
                  /* for generative collection */
                  <div className="mediaeye-collection-card-inner-content-date">
                    <div className="mediaeye-collection-card-inner-content-date-heading">
                      Drop Date:
                    </div>
                    <div className="mediaeye-collection-card-inner-content-date-value">
                      2022.08.29
                    </div>
                  </div>
                ) : null}

                <div className="mediaeye-collection-card-inner-content-des">
                  {collection?.attributes?.description
                    ? subString(collection?.attributes?.description, 100)
                    : ''}
                </div>
              </div>

              <div className="mediaeye-collection-card-inner-content-bottom">
                <div className="mediaeye-collection-card-inner-content-bottom-left">
                  {renderSocialMedia(collection)}
                </div>
                {
                  /* for generative collection */
                  collection?.attributes?.type === 'generative' ? (
                    <div className="mediaeye-collection-card-inner-content-bottom-right">
                      <span>
                        <Grid />
                        10/1000
                      </span>
                    </div>
                  ) : null
                }
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CollectionCard;
