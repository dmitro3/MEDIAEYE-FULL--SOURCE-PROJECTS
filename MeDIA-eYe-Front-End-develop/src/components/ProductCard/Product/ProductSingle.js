import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import PopupClaim from '../Product/ClaimPopup/PopupClaim';
import PopupImage from '../ProductPopup/Popup';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { queryCollection } from '../../../blockchain/functions/Collection';
import {
  queryLikesNFT,
  toggleLikeNFT
} from '../../../blockchain/functions/Likes';
import { useMoralis } from 'react-moralis';
import { queryListing } from '../../../blockchain/functions/Marketplace/QueryListing';
import { TokenName } from '../../../blockchain/functions/Addresses';
import { useDispatch } from 'react-redux';
import formatAdddress from '../../../utils/formatAdddress';
import {
  AuctionTimer,
  BiddingCard,
  DetailsCard,
  ListingsCard,
  TradeHistory,
  ProductOffers,
  ProductSimilar,
  OwnersCard
} from '../ProductReusables';
import { queryListingsByNFT } from '../../../blockchain/functions/Marketplace';
import { ethers } from 'ethers';
import { queryBidsByListing } from '../../../blockchain/functions/Marketplace/QueryBidsByListing';
import {
  getMinterAddress,
  getOwnerAddresses,
  queryFileType
} from '../../../blockchain/functions/Utils';
import {
  TwitterShareButton,
  FacebookShareButton,
  TelegramShareButton
} from 'react-share';
import { Model3d, Model3dNew } from '../../3d/Model3d';
import {
  toggleBurnPopup,
  toggleFeaturePopup
} from '../../../store/app/appSlice';
import { zeroAddress } from 'ethereumjs-util';
import { convertPrice, roundString } from '../../../blockchain/functions/Utils';
import { PopupCheckout, PopupOffer, PopupBid } from '../Popup/';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';

import {
  Grid,
  Lock,
  Heart,
  HeartLike,
  InfoCircle,
  Share,
  Report,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Copy,
  Code,
  Telegram,
  Angle,
  Linkedin,
  Spotify,
  Flickr,
  Twitch,
  AddStar,
  Discord,
  BackArrow,
  ImagePlug,
  Description,
  Creator,
  User,
  Charity,
  Suitcase
} from '../../Icons/';
import './Product.scss';
import MinterCard from '../ProductReusables/MinterCard';
import { cancelListing } from '../../../blockchain/functions/Marketplace/CancelListing';
import { getUnlockableContent } from '../../../blockchain/functions/NFT/QueryUnlockableContent';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../../store/app/appSlice';
import { ChainScanerLink } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { CheckUrlExist } from '../../../blockchain/functions/Utils';
import PopupOwners from '../Popup/PopupOwners';
import { cancelAuction } from '../../../blockchain/functions/Marketplace/CancelAuction';
import UnlockablePopup from '../../Modals/UnlockablePopup/UnlockablePopup';
import ItemLoader from '../../Common/ItemLoader';
import PageLoader from '../../Common/PageLoader';

const ProductSingle = (props) => {
  const { Moralis, user, isInitialized } = useMoralis();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupClaim, setShowPopupClaim] = useState(false);
  const [showPopupImage, setShowPopupImage] = useState(false);
  const [showPopupOwners, setShowPopupOwners] = useState(false);
  const [popupClaimIndex, setPopupClaimIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [showPopupBid, setShowPopupBid] = useState(false);
  const [mimetype, setMimetype] = useState(null);
  const history = useHistory();
  // listing, collections, nft objects
  const { nft } = props;
  const [collection, setCollections] = useState(null);
  const [currentListing, setCurrentListing] = useState(null);
  const [currentListingNFT, setCurrentListingNFT] = useState(null);
  const [listings, setListings] = useState(null);
  const [listingNFTs, setListingNFTs] = useState(null);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [bids, setBids] = useState([]);
  const [topBid, setTopBid] = useState(0);
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [descriptionLimit, setDescriptionLimit] = useState(true);
  // user objects
  const [owners, setOwners] = useState(null);
  const [ownedAmounts, setOwnedAmounts] = useState([]);
  const [selfOwner, setSelfOwner] = useState(null);
  const [minter, setMinter] = useState(null);
  const [showOffer, setShowOffer] = useState(false);
  const [showUnlockable, setShowUnlockable] = useState(false);
  const [similarType, setSimilarType] = useState('nft');
  const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] =
    useState(false);
  const [offerToggle, setOfferToggle] = useState(true);
  const [bidsToggle, setBidsToggle] = useState(true);
  const [listingToggle, setListingToggle] = useState(true);
  const [activityToggle, setActivityToggle] = useState(true);
  const [descriptionToggle, setDescriptionToggle] = useState(true);
  const [toggleAboutCreator, setToggleAboutCreator] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const socialMediaCloseOutSide = () => {
    setShowMediaeyeActionsSocial(false);
  };
  useEffect(() => {
    if (showMediaeyeActionsSocial) {
      document.addEventListener('click', socialMediaCloseOutSide);
      return () =>
        document.removeEventListener('click', socialMediaCloseOutSide);
    }
  }, [showMediaeyeActionsSocial]);

  const getCurrentListing = async (id) => {
    const [result, singleNFT] = await queryListing(Moralis, id);
    setCurrentListing(result);
    setCurrentListingNFT(singleNFT);

    if (result.attributes.type === 'auction') {
      try {
        const allBids = await queryBidsByListing(
          Moralis,
          result.attributes.listingId,
          nft?.chainId
        );
        setBids(allBids);

        const highest = allBids.length
          ? allBids[0].get('price')
          : currentListing?.attributes?.listingPayments[0][1];
        setTopBid(Moralis.Units.FromWei(highest));
      } catch (e) {
        console.log(e);
      }
    }

    // get paymentMethod from listingpayments and chainlink payment
    let pMethods = await result?.attributes?.listingPayments.map(
      (paymentMethod) => {
        return paymentMethod[0];
      }
    );
    // add payment method from chainlink if available
    if (result?.attributes?.chainlinkPayment[0]) {
      pMethods.push(result?.attributes.chainlinkPayment[1]);
    }

    setPaymentRequest({
      chainId: singleNFT?.attributes?.nft?.attributes?.chainId,
      maxAmount: singleNFT?.attributes?.amount,
      charityAddress: result?.attributes?.charityAddress,
      charityPercent: result?.attributes?.charityPercent,
      royaltyPercent: result?.attributes?.royaltyPercent,
      listingId: result?.attributes?.listingId,
      paymentMethods: pMethods,
      prices: result?.attributes?.listingPayments.map((paymentMethod) => {
        return paymentMethod[1];
      })
    });
  };

  const getOwners = async () => {
    try {
      let { ownerAddresses, tokenAmounts } = await getOwnerAddresses(
        Moralis,
        nft?.collectionAddress,
        nft?.tokenId,
        nft?.chainId
      );

      // setSelfOwner(ownerAddresses?.includes(user?.attributes?.ethAddress));
      let filterOwnersAddress = [];
      let filterOwnersAmounts = [];
      for (let i = 0; i < ownerAddresses?.length; i++) {
        const params = { address: ownerAddresses[i] };
        const ownerObject = await Moralis.Cloud.run('queryUser', params);
        if (ownerObject) {
          filterOwnersAddress.push(ownerObject);
          filterOwnersAmounts.push(tokenAmounts[i]);
        }
      }
      setOwners(filterOwnersAddress);
      setOwnedAmounts(filterOwnersAmounts);
    } catch (e) {
      console.log(e);
    }
  };
  const isOwnerSet = () => {
    setSelfOwner(nft?.minter === user?.attributes?.ethAddress);
  };
  const getMinter = async () => {
    try {
      const minter = await getMinterAddress(
        Moralis,
        nft?.collectionAddress,
        nft?.tokenId,
        nft?.chainId
      );

      setMinter(minter);
    } catch (e) {
      console.log(e);
    }
  };

  async function setCurrentListingView(newListing, i) {
    // TODO: scroll to top and set location.state listingRequest object
    getCurrentListing(newListing.id);
  }

  const getListings = async () => {
    // populate list of listings component
    const [result, nfts] = await queryListingsByNFT(
      Moralis,
      nft?.collectionAddress,
      nft?.tokenId
    );
    if (result.length > 0) {
      setListings(result);
      setListingNFTs(nfts);
      // get most recent listing
      await getCurrentListing(result[0].id);
    }
  };

  const getCollection = async () => {
    const result = await queryCollection(Moralis, nft?.collectionAddress);
    setCollections(result);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const togglePopupClaim = () => {
    setShowPopupClaim(!showPopupClaim);
  };

  const togglePopupImage = () => {
    setShowPopupImage(!showPopupImage);
  };

  const togglePopupBid = () => {
    setShowPopupBid(!showPopupBid);
  };

  const togglePopupOwners = () => {
    setShowPopupOwners(!showPopupOwners);
  };

  const getHighestBid = async () => {
    if (currentListing?.attributes) {
      const allBids = await queryBidsByListing(
        Moralis,
        currentListing.attributes.listingId,
        nft?.chainId,
        1
      );

      const highest = allBids.length
        ? allBids[0].get('price')
        : currentListing?.attributes?.listingPayments[0][1];
      setTopBid(Moralis.Units.FromWei(highest));
    }
  };

  const showPrices = () => {
    const payments = currentListing?.attributes?.listingPayments;
    if (currentListing?.attributes?.type === 'auction') getHighestBid();
    // payments should be an array of size 1 with a single payment method
    const listingPaymentUI = payments?.map((payment, i) => {
      // using chainlink estimation, handle new approximated price based on the primary tokens price
      const newPrice = convertPrice(Moralis, {
        chainId: nft?.chainId,
        price: topBid,
        native: payment[0] === zeroAddress() ? true : false,
        token: TokenName(payment[0], nft?.chainId)
      });
      return (
        <>
          {i > 0 ? (
            <div className="product-page-inner-content-pricebox-price-col">
              <span className="product-page-inner-content-pricebox-price-col-or">
                {' '}
                or{' '}
              </span>
            </div>
          ) : null}
          <div className="product-page-inner-content-pricebox-price-col">
            <img
              src={`/img/token/34/${TokenName(
                payment[0]?.toLowerCase(),
                nft?.chainId
              )}.png`}
              className="product-page-inner-content-pricebox-price-col-network"
              alt="token"
            />
            <span className="product-page-inner-content-pricebox-price-col-amount">
              {currentListing?.attributes?.type === 'auction'
                ? i == 0
                  ? topBid
                  : topBid
                : roundString(ethers.utils.formatEther(payment[1]), 4)}
            </span>
          </div>
        </>
      );
    });

    const chainlink = currentListing?.attributes?.chainlinkPayment;
    let chainlinkPaymentUI = '';
    if (chainlink[0]) {
      chainlinkPaymentUI = (
        <>
          <div className="product-page-inner-content-pricebox-price-col">
            <span className="product-page-inner-content-pricebox-price-col-converted">
              (
              {convertedPrice
                ? roundString(Moralis.Units.FromWei(convertedPrice), 5)
                : 0}{' '}
              {TokenName(chainlink[1]?.toLowerCase(), nft?.chainId)})
            </span>
          </div>
        </>
      );
    }
    return (
      <>
        {listingPaymentUI}
        {chainlinkPaymentUI}
      </>
    );
  };

  const handleShowUnlockableContent = async () => {
    // only returns result if user owns nft
    const params = {
      unlockableContentId: nft.unlockableContentId,
      nftId: nft.id
    };
    const content = await getUnlockableContent(Moralis, params);
    // TODO: do something with content
  };

  const handleBuyNow = async () => {
    if (!user) {
      history.push('/connect-wallet');
    }
    // refresh listing before retoggling popup
    getCurrentListing(currentListing.id);
    togglePopup();
  };

  const getLikes = async () => {
    const { count, likeStatus } = await queryLikesNFT(
      Moralis,
      nft.collectionAddress,
      nft.tokenId,
      nft.chainId
    );
    setNumLikes(count);
    setIsLiked(likeStatus);
  };

  const handleToggleLike = async () => {
    const result = await toggleLikeNFT(
      Moralis,
      nft?.collectionAddress,
      nft?.tokenId,
      nft?.chainId
    );
    if (result) setNumLikes(numLikes + 1);
    else if (isLiked !== result) setNumLikes(numLikes - 1);
    setIsLiked(result);
  };

  useEffect(async () => {
    if (!allLoaded && isInitialized && nft) {
      await getOwners();
      await getMinter();
      await getCollection();
      await getLikes();
      await getListings();
      await isOwnerSet();
      setAllLoaded(true);
    }
  }, [isInitialized, nft]);

  useEffect(() => {
    const getFileType = async () => {
      const fileType = await Moralis.Cloud.run('queryFileType', {
        url: nft?.animation_url ? nft?.animation_url : nft?.img
      });

      setMimetype(fileType);
    };

    if (allLoaded && nft?.img) {
      if (nft.animation_url) setMimetype(nft.fileType);
      else getFileType();
    }
  }, [allLoaded]);

  useEffect(() => {
    const getConvertedPrice = async () => {
      // if chainlink is true, convert a price to display
      if (currentListing?.attributes?.chainlinkPayment[0]) {
        let payments = currentListing?.attributes?.listingPayments;
        let chainlink = currentListing?.attributes?.chainlinkPayment;
        // using chainlink estimation, handle new approximated price based on the primary tokens price
        const newPrice = await convertPrice(Moralis, {
          chainId: nft?.chainId,
          price: payments[0][1],
          native: chainlink[1] === zeroAddress() ? true : false,
          token: TokenName(chainlink[1], nft?.chainId)
        });
        setConvertedPrice(newPrice);
      }
    };
    getConvertedPrice();
  }, [currentListing]);

  const handleCancelListing = async () => {
    if (isInitialized && listings) {
      // find the listing belonging to user
      let ownedListing;
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].attributes.seller === user.attributes.ethAddress)
          ownedListing = listings[i];
      }
      if (!ownedListing) return;

      dispatch(
        toggleGeneralPopup({
          status: 'loading',
          message: 'Processing...',
          size: 'xs',
          autoClose: 'false'
        })
      );

      // CANCEL FOR LISTING TYPE
      if (ownedListing.attributes.type === 'listing') {
        const result = await cancelListing(
          Moralis,
          ownedListing.attributes.listingId
        );
        dispatch(closeGeneralPopup());
        if (result?.status) {
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Your Listing was Successfully Cancelled',
              message: 'For more details view:',
              size: 'sm',
              copyText: result?.transactionHash,
              copyTextLink:
                ChainScanerLink(paymentRequest?.chainId) +
                '/tx/' +
                result?.transactionHash,
              textButton: 'OK',
              autoClose: 'false'
            })
          );
          history.goBack();
        } else {
          if (result?.code === -32603 && result?.data?.code === -32000) {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Metamask Insufficient Balance for Purchase',
                size: 'sm',
                textButton: 'OK'
              })
            );
          } else {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: result?.data?.message
                  ? result.data.message
                  : result.message
                    ? result.message
                    : 'Something went wrong. Try again',
                size: 'sm',
                textButton: 'OK'
              })
            );
          }
        }
      }
      // CANCEL FOR AUCTION TYPE
      else if (
        ownedListing.attributes.type === 'auction' &&
        bids.length === 0
      ) {
        // cancel auction
        const result = await cancelAuction(
          Moralis,
          ownedListing.attributes.listingId
        );
        dispatch(closeGeneralPopup());
        // handle error or success
        if (result?.status) {
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Your Auction was Successfully Cancelled',
              message: 'For more details view:',
              size: 'sm',
              copyText: result?.transactionHash,
              copyTextLink:
                ChainScanerLink(paymentRequest?.chainId) +
                '/tx/' +
                result?.transactionHash,
              textButton: 'OK',
              autoClose: 'false'
            })
          );
          history.goBack();
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: result?.data?.message
                ? result.data.message
                : result.message
                  ? result.message
                  : 'Something went wrong. Try again',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      } else {
        dispatch(closeGeneralPopup());
      }
    }
  };

  const url = window.location.href;
  const toggleMakeOffer = () => {
    setShowOffer(!showOffer);
  };

  const toggleUnlockablePopup = () => {
    setShowUnlockable(!showUnlockable);
  };
  const creatoraboutText = () => {
    return (
      <>
        <div className="product-page-inner-content-row">
          <div
            className={`product-page-inner-tabscard ${toggleAboutCreator ? 'active' : ''
              }`}
          >
            <div
              className="product-page-inner-tabscard-heading"
              onClick={() => {
                setToggleAboutCreator(!toggleAboutCreator);
              }}
            >
              <span className="product-page-inner-tabscard-heading-icons">
                <Creator />
              </span>
              About Collection
              <span className="product-page-inner-tabscard-heading-action">
                <Angle side="down" />
              </span>
            </div>

            {toggleAboutCreator ? (
              <div className="product-page-inner-tabscard-body product-page-inner-tabscard-body-withContent">
                <div className="product-page-inner-content-creatorabout">
                  <div className="product-page-inner-content-creatorabout-headimage">
                    <Link
                      className="mediaeye-collection-card-inner"
                      target="_blank"
                      to={`/collections/${ChainName(
                        collection?.attributes?.chainId
                      )?.toLowerCase()}/${collection?.attributes?.collectionAddress
                        }`}
                    >
                      <img src={collection?.attributes?.logo} alt="NFTImg" />
                    </Link>
                  </div>
                  <div className="product-page-inner-content-creatorabout-text">
                    {collection?.attributes?.description}
                  </div>
                  <div className="product-page-inner-content-creatorabout-social">
                    {collection?.attributes?.links?.website ? (
                      <a
                        className="product-page-inner-content-creatorabout-social-btn"
                        href={collection.attributes?.links?.website}
                      >
                        <Globe />
                      </a>
                    ) : null}
                    {collection?.attributes?.links?.twitter ? (
                      <a
                        className="product-page-inner-content-creatorabout-social-btn"
                        href={
                          'https://twitter.com/' +
                          collection.attributes?.links?.twitter
                        }
                      >
                        <Twitter />
                      </a>
                    ) : null}
                    {collection?.attributes?.links?.instagram ? (
                      <a
                        className="product-page-inner-content-creatorabout-social-btn"
                        href={
                          'https://instagram.com/' +
                          collection.attributes?.links?.instagram
                        }
                      >
                        <Instagram />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  };
  const displayChain = () => {
    if (nft?.chainId === '0x38' || nft?.chainId === '0x61') {
      return (
        <>
          <img
            src="/img/token/34/BNB.png"
            className="product-page-inner-content-info-blockchain-icon"
            alt="bnb"
          />
          Binance
        </>
      );
    } else if (nft?.chainId === '0x1') {
      return (
        <>
          <img
            src="/img/token/34/ETH.png"
            className="product-page-inner-content-info-blockchain-icon"
            alt="eth"
          />
          Blockhain: Ethereum
        </>
      );
    } else if (nft?.chainId === '0xfa') {
      return (
        <>
          <img
            src="/img/token/34/FTM.png"
            className="product-page-inner-content-info-blockchain-icon"
            alt="ftm"
          />
          Blockchain: Fantom
        </>
      );
    }
  };

  const limitTextContent = (text, limit, enable) => {
    if (text?.length > limit) {
      if (enable && text?.length > limit) {
        return (
          <>
            {text.substring(0, limit)}...{' '}
            <span
              onClick={() => setDescriptionLimit(false)}
              className="mediaeyeShowmore"
            >
              Show More
            </span>
          </>
        );
      } else {
        return (
          <>
            {text}...{' '}
            <span
              onClick={() => setDescriptionLimit(true)}
              className="mediaeyeShowmore"
            >
              Show Less
            </span>
          </>
        );
      }
    } else {
      return text;
    }
  };

  const [productImage, setProductImage] = useState(null);
  useEffect(async () => {
    if (nft?.img && (await CheckUrlExist(nft?.img))) {
      setProductImage(nft?.img);
    }
  }, [nft?.img]);

  const dorpDownActionsList = () => {
    return (
      <div className="mediaeye-actions-body">
        <div
          className="mediaeye-actions-body-row cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
        >
          <div className="mediaeye-actions-body-row-icon">
            {' '}
            <Copy type="white" />{' '}
          </div>
          Copy Link
        </div>

        <TwitterShareButton className="mediaeye-actions-body-row" url={url}>
          <div className="mediaeye-actions-body-row-icon">
            <Twitter />
          </div>
          Share on Twitter
        </TwitterShareButton>
        <FacebookShareButton className="mediaeye-actions-body-row" url={url}>
          <div className="mediaeye-actions-body-row-icon">
            <Facebook type="circle" />
          </div>
          Share on Facebook
        </FacebookShareButton>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={
            window.location.origin +
            '/product/' +
            ChainName(collection?.attributes?.chainId) +
            '/' +
            nft?.collectionAddress +
            '/' +
            nft?.tokenId
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            nft?.title + ' - ' + collection?.attributes?.name + ' | MEDIA EYE'
          }
        />
        <meta
          property="og:description"
          content={
            nft?.title +
            ' - ' +
            limitTextContent(nft?.description, 300, descriptionLimit)
          }
        />
        <meta property="og:image" content={nft?.img} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content={
            'mediaeyenft.com/product/' +
            ChainName(collection?.attributes?.chainId) +
            '/' +
            nft?.collectionAddress +
            '/' +
            nft?.tokenId
          }
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin +
            '/product/' +
            ChainName(collection?.attributes?.chainId) +
            '/' +
            nft?.collectionAddress +
            '/' +
            nft?.tokenId
          }
        />
        <meta
          name="twitter:title"
          content={
            nft?.title + ' - ' + collection?.attributes?.name + ' | MEDIA EYE'
          }
        />
        <meta
          name="twitter:description"
          content={
            nft?.title +
            ' - ' +
            limitTextContent(nft?.description, 300, descriptionLimit)
          }
        />
        <meta name="twitter:image" content={nft?.img} />
        <title>
          {nft?.title + ' - ' + collection?.attributes?.name + ' | MEDIA EYE'}
        </title>
        <meta
          name="description"
          content={
            nft?.title +
            ' - ' +
            limitTextContent(nft?.description, 300, descriptionLimit)
          }
        />
      </Helmet>
      <div className="product-page-inner">
        {showOffer ? (
          <PopupOffer
            showPopup={showOffer}
            nft={nft}
            currListing={currentListing}
            togglePopup={toggleMakeOffer}
            mimetype={mimetype}
          />
        ) : null}
        {showUnlockable ? (
          <UnlockablePopup
            showPopup={showUnlockable}
            togglePopup={toggleUnlockablePopup}
            selfOwner={selfOwner}
          />
        ) : null}
        {showPopup ? (
          <PopupCheckout
            currListing={currentListing}
            paymentRequest={paymentRequest}
            showPopup={showPopup}
            togglePopup={togglePopup}
            nft={nft}
            mimetype={mimetype}
          />
        ) : null}
        {showPopupClaim ? (
          <PopupClaim
            nft={nft}
            bids={bids}
            showPopup={showPopupClaim}
            togglePopup={togglePopupClaim}
            bidIndex={popupClaimIndex}
          />
        ) : null}
        {showPopupBid ? (
          <PopupBid
            currListing={currentListing}
            paymentRequest={paymentRequest}
            showPopup={showPopupBid}
            togglePopupBid={togglePopupBid}
            nft={nft}
            topBid={topBid}
            mimetype={mimetype}
          />
        ) : null}

        {showPopupOwners ? (
          <PopupOwners
            owners={owners}
            ownedAmounts={ownedAmounts}
            showPopup={showPopupOwners}
            togglePopupOwners={togglePopupOwners}
          />
        ) : null}

        <PopupImage
          showPopup={showPopupImage}
          togglePopup={togglePopupImage}
          img={nft?.fullImage !== undefined ? nft?.fullImage : ''}
        />
        {
          allLoaded ? (
            <>
              <section className="mediaeye-layout-section withspace">
                <div className="mediaeye-layout-container">
                  <div className="product-page-inner-content">
                    <div className="product-page-inner-content-col">
                      <div className="product-page-inner-content-imgbox">
                        {productImage && mimetype ? (
                          mimetype === 'video/mp4' ? (
                            <div className="product-page-inner-content-imgbox-slide">
                              <video
                                preload="metadata"
                                src={productImage}
                                alt={nft?.title}
                                loop
                                controls
                                playsInline
                                controlsList="nodownload"
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          ) : mimetype === 'model/gltf+json' ||
                            mimetype === 'application/json' ||
                            mimetype === 'model/gltf-binary' ||
                            mimetype === 'text/plain' ||
                            mimetype === 'text/plain; charset=utf-8' ||
                            mimetype === 'text/html' ? (
                            <div className="product-page-inner-content-imgbox-slide">
                              <Model3d model={productImage} type={mimetype} />
                            </div>
                          ) : (
                            <div
                              className="product-page-inner-content-imgbox-slide cursor-pointer"
                              onClick={togglePopupImage}
                            >
                              <img
                                src={productImage}
                                onClick={togglePopupImage}
                                alt={nft?.title}
                              />
                            </div>
                          )
                        ) : (
                          <div className="product-page-inner-content-imgbox-slide">
                            <ImagePlug />
                          </div>
                        )}
                      </div>
                      <div className="product-page-inner-content-informationbox">
                        <div className="product-page-inner-content-informationbox-row">
                          <div className="product-page-inner-content-informationbox-row-left">
                            <div className="product-page-inner-content-info-liked">
                              <div
                                className={`mediaeyelike-btn ${isLiked ? 'mediaeyelike-btn-liked' : ''
                                  }`}
                                onClick={() => handleToggleLike()}
                              >
                                {isLiked ? <HeartLike type="like" /> : <HeartLike />}
                              </div>
                              {numLikes ? numLikes : 0}
                            </div>

                            <div
                              className="product-page-inner-content-info-unlockable"
                              onClick={toggleUnlockablePopup}
                            >
                              {selfOwner ? <Lock /> : <Suitcase />}
                              <div className="mediaeyeinfo">
                                Unlockable Content{' '}
                                {/* <span
                              className="mediaeyeinfo-sign"
                              data-class="mediaeyetooltip"
                              data-tip="Include unlockable content that can only be revealed by the owner of the item."
                            >
                              <InfoCircle type="outline" />
                            </span> */}
                              </div>
                            </div>
                          </div>

                          <div className="product-page-inner-content-informationbox-row-right">
                            <div className="product-page-inner-content-info-blockchain">
                              {displayChain()}
                            </div>
                          </div>
                        </div>

                        <div className="product-page-inner-content-informationbox-row">
                          <div className="product-page-inner-content-info-charity">
                            <Charity /> Donations: &nbsp;{' '}
                            <span className="text-link-underline ">
                              {' '}
                              CARE Ceska republika,
                            </span>{' '}
                            &nbsp; 10%
                          </div>
                        </div>
                      </div>
                      <div
                        className={`product-page-inner-tabscard m-b-15 ${descriptionToggle ? 'active' : ''
                          }`}
                      >
                        <div
                          className="product-page-inner-tabscard-heading"
                          onClick={() => {
                            setDescriptionToggle(!descriptionToggle);
                          }}
                        >
                          <span className="product-page-inner-tabscard-heading-icons">
                            <Description />
                          </span>{' '}
                          Description
                          <span className="product-page-inner-tabscard-heading-action">
                            <Angle side="down" />
                          </span>
                        </div>
                        {descriptionToggle ? (
                          <div className="product-page-inner-tabscard-body product-page-inner-tabscard-body-withContent">
                            {minter ? (
                              <div className="product-page-inner-content-creator mediaeyecreatedby withcreattorname">
                                <div className="mediaeyecreatedby-heading">
                                  <MinterCard address={minter} />
                                </div>
                                <div>
                                  <span>Royalties:</span> <span>10%</span>
                                </div>
                              </div>
                            ) : null}

                            {nft?.description ? (
                              <div className="product-page-inner-content-description">
                                {limitTextContent(
                                  nft?.description,
                                  300,
                                  descriptionLimit
                                )}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>


                      <div className="product-page-inner-content-tabs">
                        <DetailsCard
                          nft={nft}
                          currentListing={currentListing}
                          listingNFT={currentListingNFT}
                          mimetype={mimetype}
                        />
                      </div>


                      {collection?.attributes?.description ||
                        collection?.attributes?.links
                        ? creatoraboutText()
                        : null}
                    </div>
                    {/* end left col */}
                    <div className="product-page-inner-content-col">
                      <div className="product-page-inner-content-info">
                        <div className="product-page-inner-content-info-actions">
                          <div
                            className={`mediaeye-actions mediaeye-actions-right ${showMediaeyeActionsSocial ? 'open' : ''
                              } `}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowMediaeyeActionsSocial(false);
                            }}
                          >
                            <div className="mediaeye-actions-header">
                              <div
                                className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial ? 'active' : ''
                                  }`}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setShowMediaeyeActionsSocial(
                                    !showMediaeyeActionsSocial
                                  );
                                }}
                              >
                                <Share />
                                {showMediaeyeActionsSocial
                                  ? dorpDownActionsList()
                                  : null}
                              </div>
                              <div className="mediaeye-actions-header-btn">
                                <Report />
                              </div>
                            </div>
                          </div>
                        </div>

                        {nft?.title ? (
                          <h2 className="product-page-inner-content-info-title">
                            {nft?.title}
                          </h2>
                        ) : null}

                        {collection?.attributes?.name?.trim() != 'ERC721 Main' &&
                          collection?.attributes?.name?.trim() != 'ERC1155 Main' &&
                          collection?.attributes?.collectionAddress ? (
                          <div className="product-page-inner-content-info-items">
                            <div className="product-page-inner-content-info-items-col">
                              <div className="product-page-inner-content-info-items-col-label">
                                Collection:
                              </div>
                              <Link
                                className="product-page-inner-content-info-items-col-value mediaeye-link"
                                to={`/collections/${ChainName(
                                  collection?.attributes?.chainId
                                ).toLowerCase()}/${collection?.attributes?.collectionAddress
                                  }`}
                              >
                                {collection?.attributes?.name}
                              </Link>
                            </div>
                          </div>
                        ) : null}

                        {nft && owners?.length > 0 ? (
                          nft?.collectionType === 'ERC1155' ? (
                            <div className="product-page-inner-content-info-items">
                              <div className="product-page-inner-content-info-items-col">
                                <div className="product-page-inner-content-info-items-col-label">
                                  <User type="small" />
                                </div>
                                <div
                                  className="product-page-inner-content-info-items-col-value mediaeye-link cursor-pointer"
                                  onClick={togglePopupOwners}
                                >
                                  {owners?.length} Owners
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="product-page-inner-content-info-items owners-list">
                              <div className="product-page-inner-content-info-items-col">
                                <OwnersCard owners={owners} />
                              </div>
                            </div>
                          )
                        ) : null}

                        {nft ? (
                          <div className="product-page-inner-content-info-items">
                            <div className="product-page-inner-content-info-items-col">
                              <div className="product-page-inner-content-info-items-col-label">
                                <Grid />
                              </div>
                              {nft?.collectionType === 'ERC1155' ? (
                                <div className="product-page-inner-content-info-items-col-value">
                                  {nft.totalTokens} total
                                </div>
                              ) : (
                                <div className="product-page-inner-content-info-items-col-value">
                                  {nft?.totalTokens ? nft?.totalTokens : 0}/
                                  {nft?.totalTokens ? nft?.totalTokens : 0}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>

                      {currentListing?.attributes?.type === 'auction' ? (
                        <div className="product-page-inner-content-row">
                          <AuctionTimer
                            secondsLeft={
                              (Number(currentListing?.attributes?.endTime) -
                                Math.floor(Date.now() / 1000)) *
                              1000
                            }
                          />
                        </div>
                      ) : (
                        <></>
                        // <div className="product-page-inner-content-row">
                        //   {owners?.includes(user?.attributes?.ethAddress) ? null : (
                        //     <button
                        //       type="button"
                        //       className="btn btn-offer"
                        //       onClick={toggleMakeOffer}
                        //     >
                        //       MAKE OFFER
                        //     </button>
                        //   )}

                        // </div>
                      )}


                      <>
                        {selfOwner ? (
                          currentListing ? (
                            <>
                              <div className="product-page-inner-content-row product-page-inner-content-btns">
                                <button
                                  type="button"
                                  className="btn btn-transperant"
                                  onClick={(event) => {
                                    dispatch(
                                      toggleFeaturePopup({
                                        type: 'Spotlight My NFT',
                                        content: {
                                          attributes: {
                                            name: nft?.title,
                                            image: nft?.img
                                          },
                                          file: { type: mimetype }
                                        },
                                        nft: {
                                          ...nft,
                                          img: [nft?.img],
                                          collectionAddress: [
                                            nft?.collectionAddress
                                          ],
                                          description: [nft?.description],
                                          title: [nft?.title],
                                          tokenId: [nft?.tokenId]
                                        }
                                      })
                                    );
                                  }}
                                >
                                  Spotlight
                                </button>

                                {currentListing?.attributes?.type === 'listing' ? (
                                  <button
                                    type="button"
                                    className="btn btn-transperant"
                                    onClick={handleCancelListing}
                                  >
                                    CANCEL LISTING
                                  </button>
                                ) : currentListing?.attributes?.type ===
                                  'auction' &&
                                  bids.length === 0 &&
                                  Number(currentListing?.attributes?.endTime) <
                                  Math.floor(Date.now() / 1000) ? (
                                  <button
                                    type="button"
                                    className="btn btn-transperant"
                                    onClick={handleCancelListing}
                                  >
                                    CANCEL LISTING
                                  </button>
                                ) : null}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="product-page-inner-content-row product-page-inner-content-btns">
                                <button
                                  type="button"
                                  className="btn btn-info"
                                  onClick={() => {
                                    history.push('/submit-to-marketplace');
                                  }}
                                >
                                  LIST ON MARKETPLACE
                                </button>
                                <Link
                                  to={{
                                    pathname: '/list-on-event',
                                    state: {
                                      activeImages: [
                                        {
                                          //amount: 1,
                                          token_address: nft?.collectionAddress,
                                          token_id: nft?.tokenId,
                                          metadata: JSON.stringify({
                                            name: nft?.title,
                                            image: nft?.img,
                                            animation_url: nft?.animation_url
                                          })
                                        }
                                      ]
                                    }
                                  }}
                                  className="btn btn-event m-l-20"
                                >
                                  {' '}
                                  LIST ON EVENT{' '}
                                </Link>
                              </div>
                              <div className="product-page-inner-content-row product-page-inner-content-btns">
                                <button
                                  type="button"
                                  className="btn btn-burn"
                                  onClick={(event) => {
                                    dispatch(
                                      toggleBurnPopup({
                                        content: {
                                          attributes: {
                                            name: nft?.title,
                                            image: nft?.img
                                          },
                                          file: { type: mimetype }
                                        },
                                        nft: nft
                                      })
                                    );
                                  }}
                                >
                                  Burn NFT
                                </button>
                              </div>
                            </>
                          )
                        ) : !currentListing ? (
                          <div className="product-page-inner-content-row product-page-inner-content-btns">
                            <button
                              type="button"
                              className="btn btn-transperant"
                              onClick={toggleMakeOffer}
                            >
                              MAKE OFFER
                            </button>
                          </div>
                        ) : null}

                        {currentListing ? (
                          <>
                            <div className="product-page-inner-content-row">
                              <div className="product-page-inner-content-pricebox">
                                <div className="product-page-inner-content-pricebox-heading">
                                  {currentListing?.attributes?.type === 'auction'
                                    ? bids?.length > 0
                                      ? 'Top Bid'
                                      : 'Min Bid'
                                    : 'Current price'}
                                </div>
                                <div className="product-page-inner-content-pricebox-price">
                                  {showPrices()}
                                </div>
                                <div className="product-page-inner-content-pricebox-buttons">
                                  {currentListing?.attributes?.type ===
                                    'auction' ? (
                                    currentListing.attributes.seller !==
                                      user?.attributes?.ethAddress ? (
                                      Number(currentListing?.attributes?.endTime) >
                                        Math.floor(Date.now() / 1000) ? (
                                        <button
                                          type="button"
                                          className="btn btn-info"
                                          onClick={togglePopupBid}
                                        >
                                          PLACE BID
                                        </button>
                                      ) : null
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn btn-info product-page-inner-content-pricebox-buttons-disable"
                                      >
                                        PLACE BID
                                      </button>
                                    )
                                  ) : !selfOwner ? (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={handleBuyNow}
                                      >
                                        BUY NOW
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-transperant"
                                        onClick={toggleMakeOffer}
                                      >
                                        MAKE OFFER
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-info product-page-inner-content-pricebox-buttons-disable"
                                      >
                                        BUY NOW
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-transperant product-page-inner-content-pricebox-buttons-disable"
                                      >
                                        MAKE OFFER
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {currentListing?.attributes?.type === 'auction' ? (
                          <></>
                        ) : (
                          <div className="product-page-inner-content-row">
                            <div
                              className={`product-page-inner-tabscard ${offerToggle ? 'active' : ''
                                }`}
                            >
                              <div
                                className="product-page-inner-tabscard-heading"
                                onClick={() => {
                                  setOfferToggle(!offerToggle);
                                }}
                              >
                                Offers
                                <span className="product-page-inner-tabscard-heading-action">
                                  <Angle side="down" />
                                </span>
                              </div>
                              {offerToggle ? (
                                <div className="product-page-inner-tabscard-body">
                                  <ProductOffers nft={nft} selfOwner={selfOwner} />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )}

                        {currentListing?.attributes?.type === 'auction' ? (
                          <>
                            <div className="product-page-inner-content-row">
                              <div
                                className={`product-page-inner-tabscard ${bidsToggle ? 'active' : ''
                                  }`}
                              >
                                <div
                                  className="product-page-inner-tabscard-heading"
                                  onClick={() => {
                                    setBidsToggle(!bidsToggle);
                                  }}
                                >
                                  Auctions
                                  <span className="product-page-inner-tabscard-heading-action">
                                    <Angle side="down" />
                                  </span>
                                </div>
                                {bidsToggle ? (
                                  <div className="product-page-inner-tabscard-body">
                                    <BiddingCard
                                      nft={nft}
                                      bids={bids}
                                      selfOwner={
                                        currentListing?.attributes?.seller ===
                                        user?.attributes?.ethAddress &&
                                        currentListing?.attributes?.type ===
                                        'auction'
                                      }
                                      togglePopupClaim={togglePopupClaim}
                                      setPopupClaimIndex={setPopupClaimIndex}
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            {/* {
                      // show claim button to owner when its an auction
                      currentListing?.attributes?.seller ===
                        user?.attributes?.ethAddress &&
                      currentListing?.attributes?.type === 'auction' ? (
                        <div className="product-page-inner-content-row">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={togglePopupClaim}
                          >
                            Claim
                          </button>
                        </div>
                      ) : null
                    } */}
                          </>
                        ) : null}

                        {listings?.length > 0 ? (
                          <div className="product-page-inner-content-row">
                            <div
                              className={`product-page-inner-tabscard ${listingToggle ? 'active' : ''
                                }`}
                            >
                              <div
                                className="product-page-inner-tabscard-heading"
                                onClick={() => {
                                  setListingToggle(!listingToggle);
                                }}
                              >
                                Listings
                                <span className="product-page-inner-tabscard-heading-action">
                                  <Angle side="down" />
                                </span>
                              </div>
                              {listingToggle ? (
                                <div className="product-page-inner-tabscard-body">
                                  <ListingsCard
                                    nft={nft}
                                    listings={listings}
                                    listingNFT={listingNFTs ? listingNFTs[0] : null}
                                    setCurrentListingView={setCurrentListingView}
                                    handleBuyNow={handleBuyNow}
                                  />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ) : null}
                      </>

                    </div>
                    {/* end right col */}
                  </div>
                </div>
              </section>

              <section className="mediaeye-layout-section withspacebottom">
                <div className="mediaeye-layout-container">
                  <div className="product-page-inner-content-row">
                    <div
                      className={`product-page-inner-tabscard ${activityToggle ? 'active' : ''
                        }`}
                    >
                      <div
                        className="product-page-inner-tabscard-heading"
                        onClick={() => {
                          setActivityToggle(!activityToggle);
                        }}
                      >
                        Item Activity{' '}
                        <span className="product-page-inner-tabscard-heading-action">
                          <Angle side="down" />
                        </span>
                      </div>
                      {activityToggle ? (
                        <div className="product-page-inner-tabscard-body">
                          <TradeHistory nft={nft} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>

              <section className="mediaeye-layout-section">
                <div className="mediaeye-layout-container">
                  <div className="product-page-inner-footer">
                    <div className="product-page-inner-footer-heading">
                      {similarType === 'nft'
                        ? 'Similar SPOTLIGHT NFTs'
                        : 'More From  This Collection'}
                    </div>
                    <div className="product-page-inner-footer-content">
                      {nft && currentListing ? (
                        <ProductSimilar
                          nft={nft}
                          categories={currentListing?.attributes?.categories}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <PageLoader />
          )
        }
      </div>
    </>
  );
};

export default ProductSingle;
