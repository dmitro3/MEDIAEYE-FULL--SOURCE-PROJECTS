import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Timer from 'react-compound-timer';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import formatAdddress from '../../../utils/formatAdddress';
import {
  queryFileType,
  GetNetworkIcon,
  roundString,
  getOwnerAddresses,
  convertPrice
} from '../../../blockchain/functions/Utils';
import {
  queryCollection,
  queryFloorPrice,
  queryTotalVolume
} from '../../../blockchain/functions/Collection';
import {
  TokenName,
  ZERO_ADDRESS
} from '../../../blockchain/functions/Addresses';
import { getToketImage } from '../../../utils/functions';
import { closeExtendPopup } from '../../../store/app/appSlice';
import { Model3dSmall } from '../../3d/Model3d';
import {
  Heart,
  Clock,
  Star,
  Share,
  Horizontal,
  Layer,
  Angle,
  Auction,
  ExploreBlockPlug,
  ImagePlug,
  Grid,
  Charity,
  Copy,
  Facebook,
  Twitter,
  Signal
} from '../../Icons/';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';
import { Check } from '../../Icons';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import './ExploreBlock.scss';
import { queryLikesNFT } from '../../../blockchain/functions/Likes';
import { toggleProductRairtyScorePopup } from '../../../store/app/appSlice';
import { queryTopOffer } from '../../../blockchain/functions/Marketplace';
import { CheckUrlExist } from '../../../blockchain/functions/Utils';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';
import { formatEther } from 'ethers/lib/utils';
import { queryLatestSale } from '../../../blockchain/functions/Sales';
import { TokenAddressDecimal } from '../../../blockchain/functions/Addresses/TokenDecimals';
import { queryNftCount } from '../../../blockchain/functions/Collection/QueryNftCount';
import { queryLastOffer } from '../../../blockchain/functions/Marketplace/QueryLastOffer';
import moment from 'moment';

const ExploreBlock = (props) => {
  const {
    product,
    mintedBlock,
    charities,
    from,
    isFeatured,
    selectCard,
    selectedCard,
    selectedEventCampaignCard,
    Spotlight,
    enableLastOffer
  } = props;

  const dispatch = useDispatch();
  const sliderRef = useRef();
  let history = useHistory();
  const [url, setUrl] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState();
  const [showFavorite, setShowFavorite] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [showWalletBlock, setShowWalletBlock] = useState(false);
  const [activeWalletUser, setActiveWalletUser] = useState('');
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showCollectionPopup, setShowCollectionPopup] = useState(false);
  const [showNftInformationPopup, setShowNftInformationPopup] = useState(false);
  const [showCardAction, setShowCardAction] = useState(false);
  const [showCardActionmenu, setShowCardActionmenu] = useState(false);
  const [copyWallet, setCopyWallet] = useState(false);
  const [collection, setCollections] = useState(null);
  const [topOffer, setTopOffer] = useState(null);
  const [lastSale, setLastSale] = useState(null);
  const { isInitialized, Moralis } = useMoralis();
  const [enableHover, setEnableHover] = useState(false);
  const moralisListing = product?.currentListing;
  let currentListing = moralisListing ? moralisListing : {};
  const [dimensionHeight, setDimensionHeight] = useState(0);
  const cardRef = useRef(null);
  // spotlight card
  const [spotlight, setSpotlight] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    setSpotlight(Spotlight);
  }, [Spotlight]);

  useEffect(() => {
    // card ratio 5:7
    setDimensionHeight(
      cardRef.current.clientWidth + (cardRef.current.clientWidth / 5) * 2
    );
  });

  if (moralisListing?.id) {
    currentListing = {
      id: moralisListing.id,
      type: moralisListing?.attributes?.type,
      status: moralisListing?.attributes?.status,
      size: moralisListing?.attributes?.size
    };
  }

  useEffect(() => {
    if (currentListing?.size === 'single') {
      const pathUrl = `product/${ChainName(product?.chainId)?.toLowerCase()}/${product?.collectionAddress
        }/${product?.tokenId}`;
      const linkUrl =
        window.location.pathname === '/'
          ? window.location.href.concat(pathUrl)
          : window.location.href.replace(
            window.location.pathname,
            `/${pathUrl}`
          );
      setUrl(linkUrl);
    } else if (currentListing?.size === 'bundle') {
      const pathUrl = `product/${ChainName(
        product?.chainId
      )?.toLowerCase()}/bundle/${currentListing.id}`;
      const linkUrl =
        window.location.pathname === '/'
          ? window.location.href.concat(pathUrl)
          : window.location.href.replace(
            window.location.pathname,
            `/${pathUrl}`
          );
      setUrl(linkUrl);
    } else {
      setUrl(window.location.href);
    }
  });

  const getLikes = async () => {
    const { count, likeStatus } = await queryLikesNFT(
      Moralis,
      product?.collectionAddress[0],
      product?.tokenId[0],
      product?.chainId
    );
    setLikesCount(count);
    setIsLiked(likeStatus);
  };
  const getTopOffer = async () => {
    const params = {
      collectionAddress: product?.collectionAddress[0],
      tokenId: product?.tokenId[0],
      chainId: product?.chainId
    };
    const result = await queryTopOffer(Moralis, params);
    if (result) setTopOffer(result);
  };
  const getLastSale = async () => {
    if (product?.id && !lastSale) {
      const result = await queryLatestSale(Moralis, product?.id);
      if (result) setLastSale(result);
    }
  };

  useEffect(() => {
    if (!allLoaded && product && isInitialized) {
      //getFileTypes();
      getCollection();
      if (product.isBundle === false) {
        getLikes();
        getTopOffer();
        getLastSale();
      }
      if (enableLastOffer) getLastOfferInfo();
      // set finished loading state
      setAllLoaded(true);
    }
  }, [product, isInitialized]);

  useEffect(() => {
    if (allLoaded) {
      getFileTypes();
    }
  }, [allLoaded]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    arrows: false,
    autoplaySpeed: 1500,
    autoplay: false,
    beforeChange: (current, next) => setCurrentSlide(next + 1)
  };

  const [mimetypes, setMimetypes] = useState(null);
  const [itemsCount, setItemsCount] = useState(0);
  const [numOwners, setNumOwners] = useState(0);
  const [floorPrice, setFloorPrice] = useState();
  const [totalVolume, setTotalVolume] = useState();
  const [nftOwners, setNftOwners] = useState(null);

  const [lastOfferPrice, setLastOfferPrice] = useState('--');
  const [lastOfferTokenType, setLastOfferTokenType] = useState('--');
  const [lastOfferDiff, setLastOfferDiff] = useState('--');
  const [lastOfferExpiry, setLastOfferExpiry] = useState('--');
  const [lastOfferUser, setLastOfferUser] = useState('--');

  const getCollection = async () => {
    if (product?.collectionAddress) {
      const result = await queryCollection(
        Moralis,
        product?.collectionAddress[0]
      );
      setCollections(result);
    }
  };

  const getItemsCount = async () => {
    const result = await queryNftCount(Moralis, {
      colAddress: product?.collectionAddress[0],
      chainId: ChainHexString(product?.chainId)
    });
    setItemsCount(result);
  };

  const getFloorPrice = async () => {
    const result = await queryFloorPrice(
      Moralis,
      product?.collectionAddress[0],
      product?.chainId
    );
    setFloorPrice(result);
  };

  const getTotalVolume = async () => {
    const result = await queryTotalVolume(
      Moralis,
      product?.collectionAddress[0],
      product?.chainId
    );
    setTotalVolume(result);
  };

  const getNumOwners = async () => {
    const params = { collectionAddress: product?.collectionAddress[0] };
    const result = await Moralis.Cloud.run(
      'queryCollectionOwnersCount',
      params
    );
    setNumOwners(result);
  };

  const getOwners = async () => {
    try {
      let { ownerAddresses } = await getOwnerAddresses(
        Moralis,
        product?.collectionAddress[0],
        product?.tokenId[0],
        product?.chainId
      );
      let filterOwnersAddress = [];
      for (let i in ownerAddresses) {
        const params = { address: ownerAddresses[i] };
        const ownerObject = await Moralis.Cloud.run('queryUser', params);
        if (ownerObject) {
          filterOwnersAddress.push(ownerObject);
        }
      }
      setNftOwners(filterOwnersAddress);
    } catch (e) {
      console.log(e);
    }
  };

  const getLastOfferInfo = async () => {
    const params = {
      collectionAddress: product?.collectionAddress[0],
      tokenId: product?.tokenId[0],
      chainId: product?.chainId
    };
    const result = await queryLastOffer(Moralis, params);

    if (result) {
      // offer price
      const tokenType = TokenName(
        result.attributes.paymentMethod.toLowerCase(),
        product?.chainId
      );
      const price =
        tokenType === 'USDT'
          ? Moralis.Units.FromWei(result.attributes.price, 6)
          : Moralis.Units.FromWei(result.attributes.price);
      setLastOfferPrice(roundString(price, 4));
      setLastOfferTokenType(tokenType);

      // floor diff
      let listingPrice = product?.paymentMethods[0][1];
      const listingPriceType = product?.paymentMethods[0][0].toLowerCase();
      if (listingPrice && listingPriceType) {
        let priceInNative = result.attributes.price;
        // convert currency to native if needed (to compare diff)
        if (result.attributes.paymentMethod !== ZERO_ADDRESS) {
          const paramsOffer = {
            chainId: product?.chainId,
            price: result.attributes.price,
            token: tokenType,
            native: true
          };
          priceInNative = await convertPrice(Moralis, paramsOffer);
        }
        if (listingPriceType !== ZERO_ADDRESS) {
          const paramsListing = {
            chainId: product?.chainId,
            price: listingPrice,
            token: TokenName(listingPriceType, product?.chainId),
            native: true
          };
          listingPrice = await convertPrice(Moralis, paramsListing);
        }
        // calculate diff
        const diff = (Number(priceInNative) / Number(listingPrice) - 1) * 100;
        let diffString = roundString(String(diff), 2);
        if (diff < 0) diffString = diffString.slice(1).concat('% below');
        else diffString = diffString.concat('% above');
        setLastOfferDiff(diffString);
      }

      // expiration
      const currentTime = moment(Date.now());
      const expiryTime = moment(Number(result.attributes.expiry.concat('000')));
      const timeDifference = expiryTime.diff(currentTime);
      const expiryStr = moment.duration(timeDifference).humanize(true);
      setLastOfferExpiry(expiryStr);

      // user
      const offerer = await Moralis.Cloud.run('queryUser', {
        address: result.attributes.offerer
      });
      const username =
        offerer?.attributes?.defaultUsername === false
          ? offerer.attributes.username
          : offerer?.attributes?.ethAddress;
      setLastOfferUser(formatAdddress(username));
    }
  };

  useEffect(() => {
    // load collection info only if needed
    if (collection && showCollectionPopup) {
      getItemsCount();
      getNumOwners();
      getFloorPrice();
      getTotalVolume();
    }
  }, [showCollectionPopup, collection]);

  useEffect(() => {
    // load other nft info only if needed
    if (showNftInformationPopup && product?.collectionType === 'ERC1155') {
      getOwners();
    }
  }, [showNftInformationPopup]);

  const openCartionActionDropdown = (type) => {
    if (showCardActionmenu === type) {
      setShowCardActionmenu('');
    } else {
      setShowCardActionmenu(type);
    }
  };

  const displayAuctionTimer = () => {
    return (
      <div className="mediaeye-nft-card-inner-content-detail-right-row">
        {product?.isAuction ? (
          Number(product.endTime) > Math.floor(Date.now() / 1000) ? (
            <>
              <Clock />
              <Timer
                initialTime={
                  product?.endTime
                    ? (Number(product.endTime) -
                      Math.floor(Date.now() / 1000)) *
                    1000
                    : 340000000
                }
                direction="backward"
              >
                {() => (
                  <React.Fragment>
                    <Timer.Days />
                    &nbsp;:&nbsp;
                    <Timer.Hours />
                    &nbsp;:&nbsp;
                    <Timer.Minutes />
                    &nbsp;:&nbsp;
                    <Timer.Seconds />
                  </React.Fragment>
                )}
              </Timer>
            </>
          ) : (
            'AUCTION FINISHED'
          )
        ) : (
          <>
            {lastSale ? (
              <>
                Last
                <img
                  src={getToketImage(
                    TokenName(
                      lastSale.attributes.paymentMethod?.toLowerCase(),
                      product?.chainId
                    )
                  )}
                />
                <span>
                  {lastSale.attributes.totalPrice &&
                    !isNaN(lastSale.attributes.totalPrice)
                    ? roundString(
                      formatEther(lastSale.attributes.totalPrice),
                      4
                    )
                    : 0}
                </span>
              </>
            ) : null}
          </>
        )}
      </div>
    );
  };

  const collectionPopup = () => {
    return (
      <>
        <div className="mediaeye-nft-card-inner-popup fadeInDown">
          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">Items</div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              {itemsCount}
            </div>
          </div>
          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">Type</div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              {collection?.attributes?.collectionType}
            </div>
          </div>
          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">Floor</div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              {floorPrice && !isNaN(floorPrice)
                ? roundString(formatEther(floorPrice), 4)
                : '-'}
            </div>
          </div>

          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">Volume</div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              {totalVolume && !isNaN(totalVolume)
                ? roundString(formatEther(totalVolume), 4)
                : '-'}
            </div>
          </div>
          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">Owners</div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              {numOwners}
            </div>
          </div>
        </div>
      </>
    );
  };

  const nftInfoPopup = () => {
    return (
      <>
        <div className="mediaeye-nft-card-inner-popup fadeIn">
          {product?.isBundle ? (
            <div className="mediaeye-nft-card-inner-popup-row">
              <div className="mediaeye-nft-card-inner-popup-row-left">
                Bundle
              </div>
              <div className="mediaeye-nft-card-inner-popup-row-right">
                <Layer /> {currentSlide + '/' + product?.img?.length}
              </div>
            </div>
          ) : null}
          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">
              Charity
            </div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              <Charity /> {product?.charityPercent ?? '-'}%
            </div>
          </div>

          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">
              Royalty
            </div>
            <div className="mediaeye-nft-card-inner-popup-row-right">5%</div>
          </div>
          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">Owners</div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              {nftOwners?.length ?? 1}
            </div>
          </div>
        </div>
      </>
    );
  };
  const lastOfferPopup = () => {
    return (
      <>
        <div className="mediaeye-nft-card-inner-popup fadeIn">
          <div className="mediaeye-nft-card-inner-popup-header">
            <div className="mediaeye-nft-card-inner-popup-header-title">
              Last Offer
            </div>
          </div>

          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">Price</div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              <img src={GetNetworkIcon(lastOfferTokenType)} /> {lastOfferPrice}
            </div>
          </div>
          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">
              Floor Difference
            </div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              {lastOfferDiff}
            </div>
          </div>
          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">
              Expiration
            </div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              {lastOfferExpiry}
            </div>
          </div>

          <div className="mediaeye-nft-card-inner-popup-row">
            <div className="mediaeye-nft-card-inner-popup-row-left">From</div>
            <div className="mediaeye-nft-card-inner-popup-row-right">
              {lastOfferUser}
            </div>
          </div>
        </div>
      </>
    );
  };
  const campaignCheckbox = () => {
    return (
      <div className="mediaeye-CreateCampaign-checkbox">
        <input type="checkbox" />
        <label></label>
      </div>
    );
  };

  const getFileTypes = async () => {
    let fileTypes = [];
    for (let i = 0; i < product?.img?.length; i++) {
      const fileType = await Moralis.Cloud.run('queryFileType', {
        url: product?.img[i]
      });

      fileTypes.push(fileType);
    }
    setMimetypes(fileTypes);
  };

  const displaynftinfo = () => {
    if (product?.isSold) {
      return (
        <>
          <div className="mediaeye-nft-card-inner-content-detail"></div>
          <div className="mediaeye-nft-card-inner-content-bottom">
            <div className="mediaeye-nft-card-inner-content-bottom-left">
              <span>
                {isLiked ? <Heart type="red" /> : <Heart type="white" />}{' '}
                {likesCount ?? '-'}
              </span>
              {isFeatured ? (
                <span>
                  <Charity type="outline" /> {product?.charityPercent ?? '-'}%
                </span>
              ) : null}
            </div>
            <div className="mediaeye-nft-card-inner-content-bottom-right">
              <span className="sold">SOLD</span>
            </div>
          </div>
        </>
      );
    } else if (product?.status === 'claimed') {
      return (
        <>
          <div className="mediaeye-nft-card-inner-content-detail"></div>
          <div className="mediaeye-nft-card-inner-content-bottom">
            <div className="mediaeye-nft-card-inner-content-bottom-left">
              <span>
                {isLiked ? <Heart type="red" /> : <Heart type="white" />}{' '}
                {likesCount ?? '-'}
              </span>
              {isFeatured ? (
                <span className="mediaeye-nft-card-inner-content-bottom-left-item">
                  <Star type="outline" />
                </span>
              ) : null}
            </div>
            <div className="mediaeye-nft-card-inner-content-bottom-right">
              <span className="claimed">Claimed</span>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="mediaeye-nft-card-inner-content-detail">
            {currentListing?.size === 'bundle' ? (
              <>
                <div className="mediaeye-nft-card-inner-content-detail-left">
                  <div className="mediaeye-nft-card-inner-content-detail-left-count">
                    <Layer /> {currentSlide + '/' + product?.img?.length}
                  </div>

                  <div className="mediaeye-nft-card-inner-content-detail-left-bottom">
                    {/* <span>
                      {isLiked ? <Heart type="red" /> : <Heart type="white" />}{' '}
                      {likesCount ?? '0'}
                    </span> */}
                    <span>
                      <Charity /> {product?.charityPercent ?? '0'}%
                    </span>
                  </div>
                </div>

                {product?.paymentMethods && isInitialized ? (
                  <div className="mediaeye-nft-card-inner-content-detail-right">
                    <div className="mediaeye-nft-card-inner-content-detail-right-label">
                      {product?.isAuction ? 'Min Bid ' : 'Price '}
                    </div>

                    <div className="mediaeye-nft-card-inner-content-detail-right-price">
                      <img
                        src={getToketImage(
                          TokenName(
                            product?.paymentMethods[0][0]?.toLowerCase(),
                            product?.chainId
                          )
                        )}
                        alt={TokenName(
                          product?.paymentMethods[0][0]?.toLowerCase(),
                          product?.chainId
                        )}
                      />
                      {roundString(
                        product?.paymentMethods[0][1] /
                        Math.pow(
                          10,
                          TokenAddressDecimal(
                            product?.paymentMethods[0][0],
                            product?.chainId
                          )
                        ),
                        TokenAddressDecimal(
                          product?.paymentMethods[0][0],
                          product?.chainId
                        )
                      )}
                    </div>

                    {displayAuctionTimer()}
                  </div>
                ) : null}
              </>
            ) : currentListing?.size === 'single' ? (
              <>
                <div className="mediaeye-nft-card-inner-content-detail-left">
                  <div className="mediaeye-nft-card-inner-content-detail-left-count">
                    <Grid />
                    {product?.collectionType === 'ERC1155' ? (
                      <>
                        {product?.quantity ? product?.quantity : 0}/
                        {product?.totalTokens ? product?.totalTokens : 0}
                      </>
                    ) : (
                      <>1/1</>
                    )}
                  </div>
                  <div className="mediaeye-nft-card-inner-content-detail-left-bottom">
                    <span>
                      {isLiked ? <Heart type="red" /> : <Heart type="white" />}{' '}
                      {likesCount ?? '0'}
                    </span>
                    <span>
                      <Charity /> {product?.charityPercent ?? '0'}%
                    </span>
                  </div>
                </div>
                <div className="mediaeye-nft-card-inner-content-detail-right">
                  <div className="mediaeye-nft-card-inner-content-detail-right-label">
                    {product?.isAuction ? 'Top Bid ' : 'Price '}
                  </div>

                  {product?.paymentMethods && isInitialized ? (
                    <>
                      <div className="mediaeye-nft-card-inner-content-detail-right-price">
                        <img
                          src={getToketImage(
                            TokenName(
                              product?.paymentMethods[0][0]?.toLowerCase(),
                              product?.chainId
                            )
                          )}
                          alt={TokenName(
                            product?.paymentMethods[0][0]?.toLowerCase(),
                            product?.chainId
                          )}
                        />
                        {roundString(
                          product?.paymentMethods[0][1] /
                          Math.pow(
                            10,
                            TokenAddressDecimal(
                              product?.paymentMethods[0][0],
                              product?.chainId
                            )
                          ),
                          TokenAddressDecimal(
                            product?.paymentMethods[0][0],
                            product?.chainId
                          )
                        )}
                      </div>
                      {!product?.isAuction && topOffer ? (
                        <div className="mediaeye-nft-card-inner-content-detail-right-row">
                          Offer for{' '}
                          <img
                            src={getToketImage(
                              TokenName(
                                topOffer.paymentMethod.toLowerCase(),
                                product?.chainId
                              )
                            )}
                            alt={TokenName(
                              topOffer.paymentMethod.toLowerCase(),
                              product?.chainId
                            )}
                          />
                          <span>
                            {roundString(
                              topOffer.price /
                              Math.pow(
                                10,
                                TokenAddressDecimal(
                                  topOffer.paymentMethod.toLowerCase(),
                                  product?.chainId
                                )
                              ),
                              TokenAddressDecimal(
                                topOffer.paymentMethod.toLowerCase(),
                                product?.chainId
                              )
                            )}
                          </span>
                        </div>
                      ) : null}

                      {displayAuctionTimer()}
                    </>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div className="mediaeye-nft-card-inner-content-detail-left">
                  <div className="mediaeye-nft-card-inner-content-detail-left-count">
                    <Grid />
                    {product?.collectionType === 'ERC1155' ? (
                      <>
                        {product?.quantity ? product?.quantity : 0}/
                        {product?.totalTokens ? product?.totalTokens : 0}
                      </>
                    ) : (
                      <>1/1</>
                    )}
                  </div>
                  <div className="mediaeye-nft-card-inner-content-detail-left-bottom">
                    <span>
                      {isLiked ? <Heart type="red" /> : <Heart type="white" />}{' '}
                      {likesCount ?? '0'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      );
    }
  };
  // const displayStatus = () => {
  //   if (product?.isSold) return <span className="sold">SOLD</span>;
  //   else if (product?.status === 'claimed') {
  //     return <span className="sold">CLAIMED</span>;
  //   } else {
  //     return (
  //       <span className="count">
  //         <span className="type_payment">
  //           {product?.isAuction ? 'Last bid: ' : 'Price: '}&nbsp;
  //         </span>
  //         {product?.paymentMethods && isInitialized ? (
  //           <>
  //             {Moralis.Units.FromWei(product?.paymentMethods[0][1])}
  //             <span className="type_payment">
  //               &nbsp;
  //               <img
  //                 src={getToketImage(
  //                   TokenName(
  //                     product?.paymentMethods[0][0]?.toLowerCase(),
  //                     product?.chainId
  //                   )
  //                 )}
  //               />
  //               {TokenName(
  //                 product?.paymentMethods[0][0]?.toLowerCase(),
  //                 product?.chainId
  //               )}
  //             </span>
  //           </>
  //         ) : (
  //           '0.3 BNB'
  //         )}
  //       </span>
  //     );
  //   }
  // };

  const cardActionbox = (currentListing) => {
    return (
      <div
        className="mediaeye-nft-card-inner-action"
        onClick={(event) => event.preventDefault()}
      >
        <div className="mediaeye-nft-card-inner-action-header">
          <div
            className={
              showCardActionmenu === 'share'
                ? 'mediaeye-nft-card-inner-action-header-btn active'
                : 'mediaeye-nft-card-inner-action-header-btn'
            }
            onClick={() => openCartionActionDropdown('share')}
          >
            <Share />
          </div>

          {/* for generative and jumbo collection */}
          {collection?.attributes?.type === 'generative' ||
            collection?.attributes?.type === 'jumbo' ? (
            <div
              className={
                showCardActionmenu === 'share'
                  ? 'mediaeye-nft-card-inner-action-header-btn active'
                  : 'mediaeye-nft-card-inner-action-header-btn'
              }
              onClick={() => {
                dispatch(toggleProductRairtyScorePopup({ content: product }));
                openCartionActionDropdown('');
              }}
            >
              <Signal />
            </div>
          ) : null}

          <div
            onClick={() => openCartionActionDropdown('action')}
            className={
              showCardActionmenu === 'action'
                ? 'mediaeye-nft-card-inner-action-header-btn active'
                : 'mediaeye-nft-card-inner-action-header-btn'
            }
          >
            <Horizontal />
          </div>
        </div>

        {showCardActionmenu === 'action' ? (
          <div
            className="mediaeye-nft-card-inner-action-body"
            onClick={() => openCartionActionDropdown('')}
          >
            <Link
              to={`/account/${product?.seller}`}
              className="mediaeye-nft-card-inner-action-body-row"
              onClick={() => dispatch(closeExtendPopup())}
            >
              Creator
            </Link>
            <div className="mediaeye-nft-card-inner-action-body-row">
              Report
            </div>
          </div>
        ) : showCardActionmenu === 'share' ? (
          <div
            className="mediaeye-nft-card-inner-action-body"
            onClick={() => openCartionActionDropdown('')}
          >
            <div
              className="mediaeye-nft-card-inner-action-body-row"
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
            >
              <div className="mediaeye-nft-card-inner-action-body-row-icon">
                <Copy type="white" />
              </div>
              Copy Link
            </div>
            <TwitterShareButton
              className="mediaeye-nft-card-inner-action-body-row"
              url={url}
            >
              <div className="mediaeye-nft-card-inner-action-body-row-icon">
                {' '}
                <Twitter />{' '}
              </div>{' '}
              Share on Twitter
            </TwitterShareButton>
            <FacebookShareButton
              className="mediaeye-nft-card-inner-action-body-row"
              url={url}
            >
              <div className="mediaeye-nft-card-inner-action-body-row-icon">
                <Facebook type="circle" />
              </div>
              Share on Facebook
            </FacebookShareButton>
          </div>
        ) : null}
      </div>
    );
  };
  const cardRank = (currentListing) => {
    return (
      <>
        <div
          className="mediaeye-nft-card-inner-rank"
          onClick={(event) => event.preventDefault()}
        >
          #1
        </div>
      </>
    );
  };
  const cardCheckbox = () => {
    return (
      <div
        className="mediaeye-nft-card-inner-content-checkbox"
        onClick={(event) => event.preventDefault()}
      >
        <label
          className="mediaeye-nft-card-inner-content-checkbox-label"
          onClick={(e) => {
            selectCard(
              selectedCard?.id === product?.id ? false : true,
              product
            );
          }}
        >
          {selectedCard?.id === product?.id ? <Check size="small" /> : null}
        </label>
      </div>
    );
  };

  useEffect(() => {
    if (copyWallet === true) {
      setTimeout(() => {
        setCopyWallet(false);
      }, 3000);
    }
  }, [copyWallet]);

  const [cardBanner, setCardBanner] = useState([]);

  useEffect(async () => {
    let fileTypes = [];
    for (let i = 0; i < product?.img?.length; i++) {
      if (product?.img[i] && (await CheckUrlExist(product?.img[i]))) {
        fileTypes.push(product?.img[i]);
      } else {
        fileTypes.push(null);
      }
    }
    setCardBanner(fileTypes);
  }, [product?.img]);
  const cardSlidePlay = () => {
    if (currentListing?.size === 'bundle') {
      sliderRef?.current?.slickPlay();
    }
  };
  const cardSlidePause = () => {
    if (currentListing?.size === 'bundle') {
      sliderRef?.current?.slickPause();
    }
  };
  useEffect(() => {
    if (currentListing?.size === 'bundle') {
      if (enableHover) {
        sliderRef?.current?.slickPlay();
      } else {
        sliderRef?.current?.slickPause();
      }
    }
  }, [enableHover]);
  return (
    <>
      {!isInitialized ? <ExploreBlockPlug /> : null}
      <div className="mediaeye-nft-card">
        {selectedEventCampaignCard ? campaignCheckbox() : null}
        <Link
          ref={cardRef}
          className="mediaeye-nft-card-inner"
          type={
            isFeatured || spotlight
              ? 'featured'
              : currentListing?.size
                ? currentListing?.size
                : 'single'
          }
          target={
            from === 'extendPopup' || from === 'featurePopup' ? '_blank' : null
          }
          to={{
            pathname:
              currentListing.size === 'bundle'
                ? `/product/${ChainName(
                  product?.chainId
                )?.toLowerCase()}/bundle/${currentListing.id}`
                : `/product/${ChainName(product?.chainId)?.toLowerCase()}/${product?.collectionAddress
                }/${product?.tokenId}`,
            state: { currentListing, product }
          }}
          onMouseLeave={() => {
            setShowCardAction(false);
            setShowCardActionmenu('');
            setEnableHover(false);
          }}
          onMouseEnter={() => {
            setShowCardAction(true);
            setEnableHover(true);
          }}
        >
          <div className="mediaeye-nft-card-inner-imgbox">
            <Slider {...settings} ref={sliderRef}>
              {product?.img?.map((image, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="mediaeye-nft-card-inner-imgbox-slide">
                      {mimetypes && cardBanner[i] ? (
                        mimetypes[i] === 'video/mp4' ? (
                          <video
                            preload="metadata"
                            src={cardBanner[i]}
                            playsInline
                            controlsList="nodownload"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : mimetypes[i] === 'model/gltf+json' ||
                          mimetypes[i] === 'application/json' ||
                          mimetypes[i] === 'model/gltf-binary' ||
                          mimetypes[i] === 'text/plain' ||
                          mimetypes[i] === 'text/plain; charset=utf-8' ||
                          mimetypes[i] === 'text/html' ? (
                          <Model3dSmall
                            model={cardBanner[i]}
                            type={mimetypes[i]}
                            key={i}
                          />
                        ) : (
                          <img
                            src={cardBanner[i]}
                            alt={product?.title ? product.title : 'Title NFT'}
                          />
                        )
                      ) : (
                        <ImagePlug />
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </Slider>
            {/* <button
              type="button"
              class="btn btn-info mediaeye-nft-card-inner-buy btn-square btn-sm"
            >
              {product?.isAuction ? 'Place a Bid' : 'Buy Now'}
            </button> */}
          </div>

          {showCollectionPopup ||
            showNftInformationPopup ||
            (enableLastOffer && !enableHover) ? (
            <div className="mediaeye-nft-card-inner-overlay"></div>
          ) : null}

          {showCollectionPopup ? collectionPopup() : null}
          {showNftInformationPopup ? nftInfoPopup() : null}

          {enableLastOffer && !enableHover ? lastOfferPopup() : null}

          {!showCollectionPopup && !showNftInformationPopup ? (
            <div className="mediaeye-nft-card-inner-top">
              {showCardAction && !showCollectionPopup
                ? cardActionbox(currentListing)
                : null}
              {/* for generative and jumbo collection */}

              {product ? (
                product?.isAuction ? (
                  product?.status === 'claimed' ||
                    product?.status === 'ended' ? null : !showCollectionPopup &&
                      !showNftInformationPopup &&
                      !showCardActionmenu &&
                      isFeatured ? (
                    <div className="mediaeye-nft-card-inner-content-timer">
                      <span className="mediaeye-nft-card-inner-content-timer-icon">
                        <Clock type="white" />
                      </span>
                      <span className="mediaeye-nft-card-inner-content-timer-time">
                        <Timer
                          initialTime={
                            product?.endTime
                              ? (Number(product.endTime) -
                                Math.floor(Date.now() / 1000)) *
                              1000
                              : 340000000
                          }
                          direction="backward"
                        >
                          {() => (
                            <React.Fragment>
                              <Timer.Days />
                              &nbsp;:&nbsp;
                              <Timer.Hours />
                              &nbsp;:&nbsp;
                              <Timer.Minutes />
                              &nbsp;:&nbsp;
                              <Timer.Seconds />
                            </React.Fragment>
                          )}
                        </Timer>
                      </span>
                    </div>
                  ) : null
                ) : null
              ) : null}
              {(collection?.attributes?.type === 'generative' ||
                collection?.attributes?.type === 'jumbo') &&
                showCardAction &&
                !showCollectionPopup &&
                !showNftInformationPopup
                ? cardRank(currentListing)
                : null}

              {!showCollectionPopup && !showNftInformationPopup && selectCard
                ? cardCheckbox()
                : null}
            </div>
          ) : null}
          {/* {product ? (
            currentListing?.size === 'bundle' ? (
              <div
                className="mediaeye-nft-card-inner-imgbox-buttons"
                onClick={(event) => event.preventDefault()}
              >
                <span
                  className="mediaeye-nft-card-inner-imgbox-buttons-left"
                  onClick={() => sliderRef?.current?.slickNext()}
                >
                  <Angle side="left" />
                </span>

                <span
                  className="mediaeye-nft-card-inner-imgbox-buttons-right"
                  onClick={() => sliderRef?.current?.slickPrev()}
                >
                  <Angle side="right" />
                </span>
              </div>
            ) : null
          ) : null} */}

          <div className={`mediaeye-nft-card-inner-content`}>
            <div className="mediaeye-nft-card-inner-content-inner">
              <div className="mediaeye-nft-card-inner-content-top">
                <div className="mediaeye-nft-card-inner-content-top-left">
                  <div
                    className="mediaeye-nft-card-inner-content-collection"
                    onMouseLeave={() => setShowCollectionPopup(false)}
                    onClick={(event) => {
                      event.preventDefault();
                      history.push(
                        `/collections/${ChainName(
                          product?.chainId
                        )?.toLowerCase()}/${product?.collectionAddress}`
                      );
                    }}
                    onMouseEnter={() => setShowCollectionPopup(true)}
                  >
                    {product?.collectionAddress
                      ? collection?.attributes?.name
                      : 'Elon Musk Astronaut'}
                  </div>
                  <div
                    className="mediaeye-nft-card-inner-content-title"
                    onMouseLeave={() => setShowNftInformationPopup(false)}
                    onMouseEnter={() => setShowNftInformationPopup(true)}
                  >
                    {product?.title ? product.title : 'Title NFT'}
                  </div>
                </div>
                {product?.isAuction ? (
                  <div className="mediaeye-nft-card-inner-content-top-right">
                    <Auction />
                  </div>
                ) : null}
              </div>
              {displaynftinfo()}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ExploreBlock;
