import React, { useState, useRef, useEffect } from 'react';
import { Collapse } from 'react-collapse';
import Slider from 'react-slick';
import {
  queryFileType,
  getOwnerAddresses,
  getMinterAddress
} from '../../../blockchain/functions/Utils';
import PopupImage from '../ProductPopup/Popup';
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
  Down,
  BackArrow,
  ImagePlug,
  RightArrow,
  Charity
} from '../../Icons/';
import { useHistory, Link } from 'react-router-dom';
import {
  AuctionTimer,
  BiddingCard,
  OwnersCard,
  ListingsCard,
  ProductSimilar,
  MinterCard,
  BundleItems
} from '../ProductReusables';
import { useMoralis } from 'react-moralis';
import {
  queryListing,
  queryListingBundle
} from '../../../blockchain/functions/Marketplace';
import { TokenName } from '../../../blockchain/functions/Addresses';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { Model3d } from '../../3d/Model3d';
import { zeroAddress } from 'ethereumjs-util';
import { convertPrice, roundString } from '../../../blockchain/functions/Utils';
import './Product.scss';
import { PopupCheckout, PopupOffer, PopupBid } from '../Popup/';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { queryCollection } from '../../../blockchain/functions/Collection';
import {
  queryLikesNFT,
  toggleLikeNFT
} from '../../../blockchain/functions/Likes';
import { CheckUrlExist } from '../../../blockchain/functions/Utils';
import { useDispatch } from 'react-redux';
import {
  toggleBurnPopup,
  toggleFeaturePopup
} from '../../../store/app/appSlice';
import PageLoader from '../../Common/PageLoader';

const ProductBunding = (props) => {
  const { Moralis, user, isInitialized } = useMoralis();
  const dispatch = useDispatch();
  const { product } = props;
  const [nav1, setNav1] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [activeImage, setActiveImage] = useState('');
  const [nav2, setNav2] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const slider1 = useRef();
  const slider2 = useRef();
  const [mimetype, setMimetype] = useState([]);
  const [showPopupImage, setShowPopupImage] = useState(false);
  const [showPopupBid, setShowPopupBid] = useState(false);
  const [showDropdownCharity, setShowDropdownCharity] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [currentListing, setCurrentListing] = useState(null);
  const [currentListingNFTs, setCurrentListingNFTs] = useState([]);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [bids, setBids] = useState([]);
  const [owner, setOwner] = useState(null);
  const [selfOwner, setSelfOwner] = useState(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const [collection, setCollections] = useState(null);
  const [similarType, setSimilarType] = useState('nft');
  const [minter, setMinter] = useState(null);
  const [showOffer, setShowOffer] = useState(false);
  const [descriptionLimit, setDescriptionLimit] = useState(true);
  const [bidsToggle, setBidsToggle] = useState(true);
  const [listingToggle, setListingToggle] = useState(true);
  const [bundleToggle, setBundleToggle] = useState(true);
  const [activeId, setActiveId] = useState(0);
  const [activeProductImageUrl, setActiveProductImage] = useState('');
  const [allLoaded, setAllLoaded] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] =
    useState(false);
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

  const getCollection = async () => {
    const result = await queryCollection(
      Moralis,
      product?.collectionAddress[activeProduct]
    );
    setCollections(result);
  };
  const getCurrentListing = async () => {
    const [result, bundledListingNFTs] = await queryListingBundle(
      Moralis,
      product?.id,
      Moralis.chainId
    );
    setCurrentListing(result);
    setCurrentListingNFTs(bundledListingNFTs);

    // get paymentMethod from listingpayments and chainlink payment
    let pMethods = await result?.attributes?.listingPayments.map(
      (paymentMethod) => {
        return paymentMethod[0];
      }
    );
    // add payment method from chainlink if available
    if (result?.attributes?.chainlinkPayment[0])
      pMethods.push(result?.attributes.chainlinkPayment[1]);
    setPaymentRequest({
      maxAmount: 1, // bundle always sells as 1
      chainId: result?.attributes?.chainId,
      charityAddress: result?.attributes?.charityAddress,
      charityPercent: result?.attributes?.charityPercent,
      listingId: result?.attributes?.listingId,
      paymentMethods: pMethods,
      prices: result?.attributes?.listingPayments.map((paymentMethod) => {
        return paymentMethod[1];
      })
    });
  };

  const getMinter = async () => {
    try {
      const minter = await getMinterAddress(
        Moralis,
        product?.collectionAddress[activeProduct],
        product?.tokenId[activeProduct],
        product?.chainId
      );
      setMinter(minter);
    } catch (e) {
      console.log(e);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      history.push('/connect-wallet');
    }
    togglePopup();
  };

  const handleToggleLike = async () => {
    const result = await toggleLikeNFT(
      Moralis,
      product?.collectionAddress?.[0],
      product?.tokenId?.[0],
      product?.chainId
    );
    if (result) setNumLikes(numLikes + 1);
    else if (isLiked !== result) setNumLikes(numLikes > 0 ? numLikes - 1 : 0);
    setIsLiked(result);
  };


  const showPrices = () => {
    const payments = currentListing?.attributes?.listingPayments;
    // payments should be an array of size 1 with a single payment method
    const listingPaymentUI = payments?.map((payment, i) => {
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
                currentListing?.attributes?.chainId
              )}.png`}
              className="product-page-inner-content-pricebox-price-col-network"
              alt="token"
            />
            <span className="product-page-inner-content-pricebox-price-col-amount">
              {Moralis.Units.FromWei(payment[1])}
            </span>
          </div>
        </>
      );
    });

    const chainlink = currentListing?.attributes?.chainlinkPayment;
    let chainlinkPaymentUI = <div></div>;
    if (chainlink) {
      if (chainlink[0]) {
        chainlinkPaymentUI = (
          <div>
            <strong>or</strong>
            <span>
              {' '}
              (
              {convertedPrice
                ? roundString(Moralis.Units.FromWei(convertedPrice), 5)
                : 0}{' '}
              {TokenName(
                chainlink[1]?.toLowerCase(),
                currentListing?.attributes?.chainId
              )}
              )
              {/* {`~${roundString(Moralis.Units.FromWei(convertedPrice), 5)}`}
              {TokenName(
                chainlink[1]?.toLowerCase(),
                currentListing?.attributes?.chainId
              )} */}
            </span>
          </div>
        );
      }
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {listingPaymentUI}
        {chainlinkPaymentUI}
      </div>
    );
  };

  useEffect(() => {
    const getConvertedPrice = async () => {
      // if chainlink is true, convert a price to display
      if (currentListing?.attributes?.chainlinkPayment[0]) {
        let payments = currentListing?.attributes?.listingPayments;
        let chainlink = currentListing?.attributes?.chainlinkPayment;
        // using chainlink estimation, handle new approximated price based on the primary tokens price
        const newPrice = await convertPrice(Moralis, {
          chainId: currentListing?.attributes?.chainId,
          price: payments[0][1],
          native: chainlink[1] === zeroAddress() ? true : false,
          token: TokenName(chainlink[1], currentListing?.attributes?.chainId)
        });
        setConvertedPrice(newPrice);
      }
    };
    getConvertedPrice();
  }, [currentListing, Moralis]);

  useEffect(() => {
    setNav2(slider2.current);
  }, []);

  useEffect(() => {
    setNav1(slider1.current);
  }, []);

  useEffect(async () => {
    if (isInitialized && product) {
      await getCurrentListing();
      await getCollection();
      await getMinter();
      setAllLoaded(true);
    }
  }, [isInitialized, product, activeProduct]);

  useEffect(() => {
    if (isInitialized && currentListing) {
      getUsers();
    }
  }, [isInitialized, currentListing]);

  const getUsers = async () => {
    const ownerAddress = currentListing?.attributes?.seller;
    setSelfOwner(ownerAddress === user?.attributes?.ethAddress);
    try {
      const ownerParams = { address: ownerAddress };
      const owner = await Moralis.Cloud.run('queryUser', ownerParams);
      setOwner(owner);
    } catch (e) {
      console.log(e);
    }
  };

  const togglePopupImage = () => {
    setShowPopupImage(!showPopupImage);
  };

  const togglePopupBid = () => {
    setShowPopupBid(!showPopupBid);
  };

  const setImage = (img, i) => {
    setActiveImage(img);
    //setActiveProduct(i);
    togglePopupImage();
    setActiveProduct(i);
  };

  const settings = {
    asNavFor: nav2,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    beforeChange: (current, next) => setActiveProduct(next)
  };

  // console.log(product);

  useEffect(() => {
    if (product && product.fullImage) {
      setActiveId(0);
      setActiveProductImage(product.fullImage[0]);
    }
  }, [product]);

  const displayChain = () => {
    if (product?.chainId === '0x38' || product?.chainId === '0x61') {
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
    } else if (product?.chainId === '0x1') {
      return (
        <>
          <img
            src="/img/token/34/ETH.png"
            className="product-page-inner-content-info-blockchain-icon"
            alt="eth"
          />
          Ethereum
        </>
      );
    } else if (product?.chainId === '0xfa') {
      return (
        <>
          <img
            src="/img/token/34/FTM.png"
            className="product-page-inner-content-info-blockchain-icon"
            alt="ftm"
          />
          Fantom
        </>
      );
    }
  };

  const url = window.location.href;
  const toggleMakeOffer = () => {
    setShowOffer(!showOffer);
  };
  useEffect(() => {
    const getFileType = async (images, i) => {
      const fileType = await queryFileType(images);
      const arr = [];
      arr[i] = fileType;
      setMimetype(arr);
    };
    if (product) {
      product.fullImage?.map((item, i) => getFileType(item, i));
    }
  }, [product]);

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

  const handleNext = (increament) => {
    const nextItemIndex = activeId + increament;
    if (product.fullImage[activeId + increament]) {
      setActiveProductImage(product.fullImage[activeId + increament]);
      setActiveId(activeId + increament);
    } else {
      if (increament === -1) {
        setActiveProductImage(product.fullImage[product.fullImage.length - 1]);
        setActiveId(product.fullImage.length - 1);
        debugger;
      } else {
        setActiveProductImage(product.fullImage[0]);
        setActiveId(0);
      }
    }
  };

  const [productImage, setProductImage] = useState();
  useEffect(async () => {
    if (
      product?.fullImage[activeId] &&
      (await CheckUrlExist(product?.fullImage[activeId]))
    ) {
      setProductImage(product?.fullImage[activeId]);
    } else {
      setProductImage(null);
    }
  }, [product?.fullImage[activeId]]);

  const handleCancelListing = async () => { };


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

        <TwitterShareButton
          className="mediaeye-actions-body-row"
          url={url}
        >
          <div className="mediaeye-actions-body-row-icon">
            <Twitter />
          </div>
          Share on Twitter
        </TwitterShareButton>
        <FacebookShareButton
          className="mediaeye-actions-body-row"
          url={url}
        >
          <div className="mediaeye-actions-body-row-icon">
            <Facebook type="circle" />
          </div>
          Share on Facebook
        </FacebookShareButton>

      </div>
    )
  };

  return (
    <div className="product-page-inner">
      {showOffer ?
        <PopupOffer
          showPopup={showOffer}
          nft={product}
          currListing={currentListing}
          togglePopup={toggleMakeOffer}
          mimetype={mimetype}
        />
        : null
      }
      {
        showPopupBid ? <PopupBid
          currListing={currentListing}
          showPopup={showPopupBid}
          togglePopupBid={togglePopupBid}
          paymentRequest={paymentRequest}
          nft={product}
        /> : null
      }
      {
        showPopup ?
          <PopupCheckout
            currListing={currentListing}
            paymentRequest={paymentRequest}
            showPopup={showPopup}
            togglePopup={togglePopup}
            nft={product}
          />
          : null
      }
      <PopupImage
        showPopup={showPopupImage}
        togglePopup={togglePopupImage}
        img={activeImage}
      />
      {
        allLoaded ? (
          <>
            <section className="mediaeye-layout-section withspace">
              <div className="mediaeye-layout-container">
                <div className="product-page-inner-content">
                  <div className="product-page-inner-content-col">
                    <div className="product-page-inner-content-imgbox">
                      <div className="product-page-inner-content-imgbox-slide">
                        <button
                          className="product-page-inner-content-imgbox-slide-arrows"
                          onClick={() => handleNext(-1)}
                        >
                          <Angle side={'left'} />
                        </button>
                        {mimetype && productImage ? (
                          mimetype[activeId] === 'video/mp4' ? (
                            <video
                              preload="metadata"
                              src={productImage}
                              playsInline
                              controlsList="nodownload"
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : mimetype[activeId] === 'model/gltf+json' ||
                            mimetype[activeId] === 'model/gltf-binary' ? (
                            <Model3d model={productImage} type={mimetype[activeId]} />
                          ) : (
                            <img src={productImage} alt={'product-preview'} />
                          )
                        ) : (
                          <ImagePlug />
                        )}
                        <button
                          className="product-page-inner-content-imgbox-slide-arrows rightone"
                          onClick={() => handleNext(1)}
                        >
                          <Angle />
                        </button>
                      </div>
                    </div>

                    <div className="product-page-inner-content-informationbox">
                      <div className="product-page-inner-content-informationbox-row">
                        <div className="product-page-inner-content-informationbox-row-right">
                          <div className="product-page-inner-content-info-blockchain">
                            {displayChain()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {minter ? (
                      <div className="product-page-inner-content-row">
                        <div className="product-page-inner-content-creator mediaeyecreatedby withcreattorname">
                          <div className="mediaeyecreatedby-heading">
                            <MinterCard address={minter} />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="product-page-inner-content-row">
                      <div
                        className={`product-page-inner-tabscard ${bundleToggle ? 'active' : ''
                          }`}
                      >
                        <div
                          className="product-page-inner-tabscard-heading"
                          onClick={() => {
                            setBundleToggle(!bundleToggle);
                          }}
                        >
                          {currentListingNFTs.length ?? '--'} Items
                          <span className="product-page-inner-tabscard-heading-action">
                            <Angle side="down" />
                          </span>
                        </div>

                        {bundleToggle ? (
                          <div className="product-page-inner-tabscard-body">
                            <BundleItems
                              collectionAddresses={product?.collectionAddress}
                              listingNFTs={currentListingNFTs}
                              activeProduct={activeProduct}
                              setActiveProduct={setActiveId}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
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
                              {showMediaeyeActionsSocial ? dorpDownActionsList() : null}
                            </div>
                            <div className="mediaeye-actions-header-btn">
                              <Report />
                            </div>
                          </div>
                        </div>
                      </div>

                      {product?.title ? (
                        <h2 className="product-page-inner-content-info-title">
                          {product?.title[activeId]}
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
                    </div>

                    {product?.description ? (
                      <div className="product-page-inner-content-row">
                        <h2 className="product-page-inner-content-row-title">
                          Description
                        </h2>
                        <div className="product-page-inner-content-description">
                          {limitTextContent(
                            product?.description[activeId],
                            300,
                            descriptionLimit
                          )}
                        </div>
                      </div>
                    ) : null}

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
                    ) : null}
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
                                    type: 'Spotlight My Collection',
                                    content: {
                                      attributes: {
                                        name: product?.title,
                                        image: product?.img
                                      },
                                      file: { type: mimetype }
                                    },
                                    nft: {
                                      ...product,
                                      img: [product?.img],
                                      collectionAddress: [product?.collectionAddress],
                                      description: [product?.description],
                                      title: [product?.title],
                                      tokenId: [product?.tokenId]
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
                            ) : currentListing?.attributes?.type === 'auction' &&
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
                      ) : null
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
                              {currentListing?.attributes?.type === 'auction' ? (
                                !selfOwner ? (
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
                                <ListingsCard />
                              </div>
                            ) : null}
                          </div>
                        </div>

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
                                    <BiddingCard />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </>
                        ) : null}
                      </>
                    ) : null}


                  </div>
                  {/* end right col */}
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
                    <ProductSimilar />
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
  );
};

export default ProductBunding;
