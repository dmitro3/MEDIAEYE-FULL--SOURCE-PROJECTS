import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import Switch from 'react-switch';
import Slider from 'react-slick';
import {
  SearchIcon,
  Copy,
  Auction,
  BackArrow,
  Fixed,
  InfoCircle,
  Twitter,
  Facebook,
  Circle,
  Edit,
  CircleActive,
  ImagePlug,
  Check
} from '../Icons/';
import PopupImage from '../ProductCard/ProductPopup/Popup';
import { TokenNameMap } from './TokenNameMap';
import {
  createListing,
  createAuction,
  queryCharities,
  queryRoyalty,
  querySoldStatus
} from '../../blockchain/functions/Marketplace';
import { useMoralis } from 'react-moralis';
import {
  checkNFTApproval,
  requestNFTApproval
} from '../../blockchain/functions/ApproveToken';
import { TokenAddress } from '../../blockchain/functions/Addresses';
import DetailsCard from './PutOnReusables/DetailsCard';
import SelectSearch from 'react-select-search';
import formatAdddress from '../../utils/formatAdddress';
import {
  closeGeneralPopup,
  toggleGeneralPopup
} from '../../store/app/appSlice';
import { useDispatch } from 'react-redux';
import {
  convertPrice,
  queryFileType,
  roundString,
  numberRoundConverter,
  allowOnlyNumber,
  CheckUrlExist,
  GetNetworkIcon
} from '../../blockchain/functions/Utils';
import ChangeChainRequest from '../../blockchain/functions/ChangeChain/ChangeChainRequest';
import ReactTooltip from 'react-tooltip';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { zeroAddress } from 'ethereumjs-util';
import CrossChainSig from '../../blockchain/functions/Subscription/CrossChainSig';
import { EMPTY_FEAT } from '../../blockchain/functions/Feature/EmptyFeat';
import CategoriesCard from './PutOnReusables/CategoriesCard';
import FeatureYourNFT from './PutOnReusables/FeatureYourNFT';
import FEATURETYPE from '../../utils/featureConstants';
import './PutOnMarketplacelisting.scss';
import Web3 from 'web3';
import {
  ChainScanerLink,
  ChainName
} from '../../blockchain/functions/ChangeChain/ChainNames';

import charityIcon from '../../assets/img/charity.png';
import { TokenDecimal } from '../../blockchain/functions/Addresses/TokenDecimals';

const PutOnMarketplace = (props) => {
  const theme = useSelector((state) => state.app.darkTheme);
  const dispatch = useDispatch();
  const location = useLocation();
  const owned = location?.state?.activeImages[0];
  const products = props.products;
  const { nft } = props;
  const [currentListingNFT, setCurrentListingNFT] = useState(null);
  const [mimetype, setMimetype] = useState(null);
  const history = useHistory();
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentListing, setCurrentListing] = useState(null);
  const [showRecipient, setShowRecipient] = useState(false);
  const [coverImage, setCoverImage] = useState(0);
  const [activeSingle, setActiveSingle] = useState(true);
  const [showPopupImage, setShowPopupImage] = useState(false);
  const [nav2, setNav2] = useState(null);
  const slider = useRef();
  const [fixedButtons, setFixedButtons] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameValid, setNameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showCharity, setShowCharity] = useState(false);
  const [featureInformation, setFeatureInformation] = useState({});
  const { user, Moralis, web3 } = useMoralis();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [nftsApproved, setNftsApproved] = useState(false);
  const [approvedStatus, setApprovedStatus] = useState([]);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  // amount factors
  const totalOwned = props.totalOwned;
  const [putForSale, setPutForSale] = useState(1);

  useEffect(() => {
    let newarray = [];
    for (let i in totalOwned) {
      // newarray.push(1);
    }
    setPutForSale(newarray);
  }, [totalOwned]);
  // price factors
  const [prices, setPrices] = useState([0, 0]);
  const [charityEnable, setCharityEnable] = useState(true);
  const [activePaymentToken, setActivePaymentToken] = useState(0);
  const [activeTokens, setActiveTokens] = useState(null);
  // const [primaryToken, setPrimaryToken] = useState(null);
  const getPaymentList = () => {
    if (products[0]?.attributes?.chainId === '0x38') {
      return [
        {
          name: TokenNameMap(
            products[0]?.attributes?.chainId,
            activeSingle ? false : true
          ),
          token: [
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            )
          ],
          value: '0',
          primary: TokenNameMap(
            products[0]?.attributes?.chainId,
            activeSingle ? false : true
          )
        },
        { name: 'BUSD', token: ['BUSD'], value: '1', primary: 'BUSD' },
        {
          name:
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ) + ' Primary & BUSD',
          token: [
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'BUSD'
          ],
          primary: TokenNameMap(
            products[0]?.attributes?.chainId,
            activeSingle ? false : true
          ),
          value: '2'
        },
        {
          name:
            'BUSD Primary & ' +
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ),
          token: [
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'BUSD'
          ],
          primary: 'BUSD',
          value: '3'
        }
      ];
    } else if (products[0]?.attributes?.chainId === '0x1') {
      return [
        {
          name: TokenNameMap(
            products[0]?.attributes?.chainId,
            activeSingle ? false : true
          ),
          token: [
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            )
          ],
          value: '0',
          primary: TokenNameMap(
            products[0]?.attributes?.chainId,
            activeSingle ? false : true
          )
        },
        { name: 'USDT', token: ['USDT'], value: '1', primary: 'USDT' },
        {
          name:
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ) + ' Primary & USDT',
          token: [
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'USDT'
          ],
          primary: TokenNameMap(
            products[0]?.attributes?.chainId,
            activeSingle ? false : true
          ),
          value: '2'
        },
        {
          name:
            'USDT Primary & ' +
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ),
          token: [
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'USDT'
          ],
          primary: 'USDT',
          value: '3'
        }
      ];
    } else if (products[0]?.attributes?.chainId === '0xfa') {
      return [
        {
          name: TokenNameMap(
            products[0]?.attributes?.chainId,
            activeSingle ? false : true
          ),
          token: [
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            )
          ],
          value: '0',
          primary: TokenNameMap(
            products[0]?.attributes?.chainId,
            activeSingle ? false : true
          )
        },
        { name: 'USDC', token: ['USDC'], value: '1', primary: 'USDC' },
        {
          name:
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ) + ' Primary & USDC',
          token: [
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'USDC'
          ],
          primary: TokenNameMap(
            products[0]?.attributes?.chainId,
            activeSingle ? false : true
          ),
          value: '2'
        },
        {
          name:
            'USDC Primary & ' +
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ),
          token: [
            TokenNameMap(
              products[0]?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'USDC'
          ],
          primary: 'USDC',
          value: '3'
        }
      ];
    } else {
      return [];
    }
  };
  const [paymentTokensSelectList, setPaymentTokensSelectList] = useState(() => {
    return getPaymentList();
  });
  useEffect(() => {
    setPaymentTokensSelectList(getPaymentList());
  }, [products, activeSingle]);

  useEffect(() => {
    let tokenRow = paymentTokensSelectList[activePaymentToken];
    setActiveTokens(tokenRow);
  }, [activePaymentToken, paymentTokensSelectList]);

  const [buyNowPrice, setBuyNowPrice] = useState('disabled');
  const [buyNowAvailable, setBuyNowAvailable] = useState(false);
  const [charities, setCharities] = useState([]);
  const [charityPercent, setCharityPercent] = useState(0);
  const [charitySearchCursor, setCharitySearchCursor] = useState(false);
  const [selectedCharityType, setSelectedCharityType] =
    useState('All Charities');
  const [selectedCharityIndex, setSelectedCharityIndex] = useState(0);
  const [recipientPercent, setRecipientPercent] = useState(0);
  const [royaltyPercent, setRoyaltyPercent] = useState(0);
  const [isSold, setSold] = useState(true);
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(false);
  const feePercent = 2.5;
  const CHARITY_MAX = 15;
  // auction options
  const startingOptions = [
    {
      name: 'Now',
      value: 0
    },
    {
      name: '1 day',
      value: 1
    },
    {
      name: '2 days',
      value: 2
    },
    {
      name: '3 days',
      value: 3
    },
    {
      name: '4 days',
      value: 4
    },
    {
      name: '5 days',
      value: 5
    },
    {
      name: '6 days',
      value: 6
    },
    {
      name: '7 days',
      value: 7
    }
  ];
  const expirationOptions = [
    {
      name: '7 days',
      value: 7
    },
    {
      name: '14 days',
      value: 14
    }
  ];
  const [selectedStartIndex, setSelectedStartIndex] = useState(0);
  const [selectedEndIndex, setSelectedEndIndex] = useState(7);
  // product data
  const minter = products[0]?.attributes?.minter; // TODO: this should be different per nft
  const collectionType = products[0]?.attributes?.collectionType;
  const collectionAddress = products[0]?.attributes?.collectionAddress;
  const tokenId = Number(products[0]?.attributes?.tokenId);
  const [copyText, setCopyText] = useState(false);
  const [descriptionLimit, setDescriptionLimit] = useState(true);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

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

  const smililarSlidersettings = {
    slidesPerView: 4,
    grabCursor: true,
    modules: [Pagination],
    pagination: {
      el: '.mediaeye-product-more-pagination',
      enable: true,
      clickable: true
    }
  };

  const changeDescription = (e) => {
    if (e.target.value === '') {
      setDescriptionValid(false);
    } else {
      setDescriptionValid(true);
    }
    setDescription(e.target.value);
  };

  const changeName = (e) => {
    if (e.target.value === '') {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
    setName(e.target.value);
  };

  useEffect(() => {
    if (!nftsApproved) {
      setIsValid(false);
      return;
    }
    for (let i = 0; i < activeTokens?.token?.length; i++) {
      // not valid if any token selected has price set to 0
      setIsValid(prices[i] && prices[i] !== '0' ? true : false);
    }
  }, [prices, activeTokens, nftsApproved]);

  const handleScroll = (e) => {
    let offset;
    if (window.screen.width > 575) {
      offset = 250;
    } else {
      offset = 550;
    }
    if (
      document.body.clientHeight <
      window.scrollY + window.innerHeight + offset
    ) {
      setFixedButtons(false);
    }
    if (
      document.body.clientHeight >
      window.scrollY + window.innerHeight + offset
    ) {
      setFixedButtons(true);
    }
  };

  const togglePopupImage = () => {
    setShowPopupImage(!showPopupImage);
  };

  // when active token changes handle primary token selection
  // useEffect(() => {
  //   for (let i in activeTokens) {
  //     // if primary token is no longer active, set primary token to the next active token
  //     if (!activeTokens[i].active && activeTokens[i].token === primaryToken) {
  //       for (let j in activeTokens) {
  //         if (activeTokens[j].active) {
  //           setPrimaryToken(activeTokens[j].token);
  //         }
  //       }
  //     }
  //   }
  // }, [activeTokens]);

  useEffect(() => {
    if (!showRecipient) {
      setRecipientAddress('');
      setRecipientPercent(0);
    }
  }, [showRecipient]);

  const addCategory = (category) => {
    const newCategories = [...categories];
    newCategories.push(category);
    setCategories(newCategories);
  };

  const removeCategory = (category) => {
    const newCategories = [...categories];
    newCategories.splice(newCategories.indexOf(category), 1);
    setCategories(newCategories);
  };

  const settings = {
    asNavFor: nav2,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    beforeChange: (current, next) => setActiveSlide(next)
  };

  const putForSaleChange = (value, index) => {
    if (
      (Number(value) <= totalOwned[index] && Number(value) >= 1) ||
      !Number(value)
    ) {
      const newArray = [...putForSale];
      newArray[index] = value;
      setPutForSale(newArray);
    }
  };
  const maxputForSaleChange = (index, max) => {
    const newArray2 = [...putForSale];
    newArray2[index] = max;
    setPutForSale(newArray2);
  };

  const displayPriceInformation = () => {
    let charityStr = '';
    let recipientStr = '';
    let userStr = '';
    let royaltyStr = '';
    let listingTypeStr = activeSingle
      ? 'You will receive '
      : 'You will receive a minimum of ';
    let perNFTStr = ' for the bundle';
    let royaltyReceives = 0;
    let isPriceSet = false;
    let feePrices = [];
    // check if there exists a non-zero price and set each of the existing fee prices based on royalties and platform fees
    for (let x = 0; x < prices.length; x++) {
      if (Number(prices[x]) > 0) {
        isPriceSet = true;
        const platformReceives = prices[x] * (feePercent / 100);
        royaltyReceives = prices[x] * (royaltyPercent / 100);
        feePrices.push(prices[x] - royaltyReceives - platformReceives);
      } else {
        feePrices.push(0);
      }
    }
    const splitPercent = Number(charityPercent) + Number(recipientPercent);

    for (let i = 0; i < activeTokens?.token?.length; i++) {
      // if token is active include price information
      let roundOf = 3;
      if (feePrices[i] <= 0.0001) {
        roundOf = 6;
      } else if (feePrices[i] <= 0.001) {
        roundOf = 5;
      } else if (feePrices[i] <= 0.01) {
        roundOf = 4;
      }
      let orStr = activeTokens.token.length > 1 ? 'or' : '';

      let charityReceives = 0;
      if (charityPercent > 0)
        charityReceives = numberRoundConverter(
          feePrices[i] * (charityPercent / 100),
          roundOf
        );
      let recipientReceives = 0;
      if (recipientPercent > 0 && recipientAddress)
        recipientReceives = numberRoundConverter(
          feePrices[i] * (recipientPercent / 100),
          roundOf
        );

      if (royaltyPercent > 0) {
        royaltyStr += ` ${orStr} ${numberRoundConverter(
          prices[i] * (royaltyPercent / 100),
          roundOf
        )} ${activeTokens.token[i]}`;
      }

      charityStr += ` ${orStr} ${charityReceives} ${activeTokens.token[i]}`;
      recipientStr += ` ${orStr}   ${recipientReceives} ${activeTokens.token[i]}`;
      userStr += ` ${orStr} ${numberRoundConverter(
        feePrices[i] - charityReceives - recipientReceives,
        roundOf
      )} ${activeTokens.token[i]}`;
    }
    return (
      <>
        <div>
          <div className="marketplace-create-page-inner-content-calculation-row">
            <div className="marketplace-create-page-inner-content-calculation-row-left">
              <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                Marketplace fee
              </div>
            </div>
            <div className="marketplace-create-page-inner-content-calculation-row-right">
              <div className="marketplace-create-page-inner-content-calculation-row-right-label">
                2.5%
              </div>
            </div>
          </div>
          <div className="marketplace-create-page-inner-content-calculation-row">
            <div className="marketplace-create-page-inner-content-calculation-row-left">
              <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                You receive
              </div>
            </div>
            <div className="marketplace-create-page-inner-content-calculation-row-right">
              <div className="marketplace-create-page-inner-content-calculation-row-right-label">
                0.95 WBNB
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const getSoldStatus = async () => {
    const isSold = await querySoldStatus(Moralis, collectionAddress, tokenId);
    setSold(isSold);
    if (isSold) {
      const royaltyPercent = await queryRoyalty(
        Moralis,
        collectionAddress,
        tokenId
      );
      setRoyaltyPercent(royaltyPercent);
    }
  };

  useEffect(() => {
    if (user && Moralis.provider && products[0]?.chainId === activeNetwork) {
      checkApproved();
    }
    if (user && Moralis.provider) {
      getCharities();
      getSoldStatus();
    }
  }, [user, activeSingle, web3]);

  const getCharities = async () => {
    const result = [];
    const arr = await queryCharities(Moralis);
    arr.map((item) => {
      result.push({
        name: item.attributes.name,
        value: item.attributes.order,
        address: item.attributes.address
      });
    });
    setCharities(result);
  };

  const checkApproved = async () => {
    // check if the amount for multiple tokens
    let allApproved = true;
    let approvedStatus = [];

    for (let i in products) {
      let isApproved = await checkNFTApproval(
        Moralis,
        user.attributes.ethAddress,
        products[i]?.attributes?.collectionType,
        products[i]?.attributes?.collectionAddress,
        activeSingle ? 0 : 1,
        dispatch
      );
      if (!isApproved) {
        approvedStatus.push(false);
        allApproved = false;
      } else {
        approvedStatus.push(true);
      }
    }
    setApprovedStatus(approvedStatus);
    setNftsApproved(allApproved);
  };

  const handlePrices = async (value, index) => {
    // handle user input to reflect price of primary token (only primary token is editable )
    let newPrices = [...prices];
    newPrices[index] = value;
    value = value ? value : ' ';

    if (products[0]?.attributes?.chainId !== '0xfa') {
      // check if number is valid before doing conversion
      if (
        !value.endsWith('.') &&
        typeof Number(value) === 'number' &&
        Number(value) !== 0 &&
        isFinite(Number(value))
      ) {
        // adjust all prices to match the primary token
        for (let i in prices) {
          // if not the primary token, get price from chainlink
          if (index != i) {
            let params = {
              token: activeTokens?.token[index],
              chainId: '0x38',
              price: Moralis.Units.ETH(value),
              native: i === 0 ? true : false // if index is 0, then we are resolving to a native price
            };

            newPrices[i] = roundString(
              Moralis.Units.FromWei(await convertPrice(Moralis, params)),
              5
            );
          }
        }
      }
    }
    setPrices(newPrices);
  };

  const handleCreate = async () => {
    if (!nftsApproved) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: "Approve all NFT's before continuing",
          textButton: 'OK',
          size: 'sm'
        })
      );
    }

    // check if at least 1 category has been selected
    if (categories.length < 1) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Please select at least 1 category',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // check if a payment token is selected
    let tokenSelected = false;
    for (let i = 0; i < activeTokens?.token?.length; i++) {
      if (activeTokens.token[i]) tokenSelected = true;
    }
    if (!tokenSelected) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Please select a payment method',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // name
    if (!name) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Please enter bundle name',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // description
    if (!description) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Please enter bundle description',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // check if user is on the correct blockchain, if not request change

    const chainId = await Moralis.chainId;
    if (!(products[0]?.attributes?.chainId === chainId)) {
      ChangeChainRequest(products[0]?.attributes?.chainId);
    } else {
      activeSingle ? handleListing() : handleAuction();
    }
  };

  const handleListing = async () => {
    if (!nftsApproved) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: "Approve all NFT's before continuing",
          textButton: 'OK',
          size: 'sm'
        })
      );
      //let requestApproved = await requestMultipleApproval(Moralis, notApproved);
      //setNftApproved(requestApproved);
      return;
    }

    if (Number(charityPercent) + Number(recipientPercent) > 100) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Charity, Royalties, Recipient and Marketplace Fee must add up to no more than 100%',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    if (nftsApproved) {
      dispatch(
        toggleGeneralPopup({
          status: 'loading',
          message: 'Processing...',
          size: 'xs'
        })
      );

      // create listing payments object based on active tokens and prices
      let listingPayments = [];
      let isChainlinkValid = true;
      let secondaryTokenAddress = zeroAddress();
      if (activeTokens?.token?.length > 1) {
        for (let i = 0; i < activeTokens.token.length; i++) {
          let token = activeTokens.token[i];
          // now only input primary token to listing payments
          if (token === activeTokens.primary) {
            listingPayments.unshift([
              TokenAddress(token, products[0]?.attributes?.chainId),
              (prices[i] * Math.pow(10, TokenDecimal(token))).toString()
            ]);
          } else {
            listingPayments.push([
              TokenAddress(token, products[0]?.attributes?.chainId),
              (prices[i] * Math.pow(10, TokenDecimal(token))).toString()
            ]);

            // set secondary token to be the opposite of primary token
            secondaryTokenAddress = TokenAddress(
              activeTokens.token[i],
              products[0]?.attributes?.chainId
            );
          }
        }
      } else {
        // if only one payment method is accepted, primary token is the only payment
        listingPayments.push([
          TokenAddress(activeTokens.primary, products[0]?.attributes?.chainId),
          (
            prices[0] * Math.pow(10, TokenDecimal(activeTokens.primary))
          ).toString()
        ]);
        // if there are any payment options not being accepted, then chainlink is not valid
        isChainlinkValid = false;
      }

      let chainlinkPayments = [isChainlinkValid, secondaryTokenAddress];

      // handle royalty logic
      let setRoyalty = '0';
      if (royaltyPercent > 0 && minter === user.attributes.ethAddress) {
        setRoyalty = '1';
      }
      const web3 = new Web3(Moralis.provider);
      if (recipientPercent > 0) {
        try {
          web3.utils.toChecksumAddress(recipientAddress);
        } catch (e) {
          dispatch(closeGeneralPopup());
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Invalid ethereum address',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
      const split = [
        web3.utils.isAddress(recipientAddress)
          ? recipientAddress
          : TokenAddress('ETH'),
        recipientPercent * 100,
        charityPercent > 0
          ? charities[selectedCharityIndex].address
          : TokenAddress('ETH'),
        selectedCharityIndex === 0 ? 0 : charityPercent * 100 // if none is selected then send 0 % to charity
      ];
      // get subscription sig
      const subscriptionSig = await CrossChainSig(
        user,
        products[0]?.attributes?.chainId
      );
      const emptyFeat = EMPTY_FEAT;

      const nfts = [];
      products.map((product, i) => {
        const nft = [
          product?.attributes?.collectionType === 'ERC1155' ? 0 : 1,
          product?.attributes?.collectionAddress,
          product?.attributes?.tokenId,
          putForSale[i]
        ];
        if (coverImage === i) {
          return nfts.unshift(nft);
        }
        return nfts.push(nft);
      });

      const listingRequest = [
        nfts,
        listingPayments,
        chainlinkPayments,
        setRoyalty,
        String(royaltyPercent * 100),
        split,
        subscriptionSig,
        emptyFeat,
        JSON.stringify(categories)
      ];

      const result = await createListing(Moralis, listingRequest);
      dispatch(closeGeneralPopup());
      if (result?.status) {
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Listing on Marketplace was successful',
            message: 'For more details view:',
            size: 'sm',
            copyText: result?.transactionHash,
            copyTextLink:
              ChainScanerLink(products[0]?.attributes?.chainId) +
              '/tx/' +
              result?.transactionHash,
            textButton: 'OK',
            linkButton: '/nft-marketplace',
            autoClose: 'false'
          })
        );
        history.replace(`/nft-marketplace`);
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
              message: 'Listing on Marketplace was Failed!',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
    }
  };

  const handleAuction = async () => {
    if (!nftsApproved) {
      //let requestApproved = await requestMultipleApproval(Moralis, notApproved);
      //setNftApproved(requestApproved);
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Approve all NFTs before creating auction',
          size: 'sm',
          textButton: 'OK'
        })
      );
      return;
    }

    if (Number(charityPercent) + Number(recipientPercent) > 100) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Charity, Royalties, Recipient and Marketplace Fee must add up to no more than 100%',
          size: 'sm',
          textButton: 'OK'
        })
      );
      return;
    }

    if (nftsApproved) {
      dispatch(
        toggleGeneralPopup({
          status: 'loading',
          message: 'Processing...',
          size: 'xs'
        })
      );
      // create listing payments object based on active tokens and prices
      let auctionPayments = [];
      let chainlinkPayments = [false, zeroAddress()];

      for (let i = 0; i < activeTokens?.token?.length; i++) {
        let token = activeTokens.token[i];
        let converted = prices[i] * Math.pow(10, TokenDecimal(token));
        // if buy it now set chainlink payments for stable
        /* if (token[0] === 'USDT' || (token[0] === 'BUSD' && buyNowAvailable)) {
         chainlinkPayments[0] = true;
       }*/
        // if token is USDT/BUSD, allow an instant buy price otherwise set to 0
        const convertedPrice =
          (token === 'USDT' || token === 'BUSD' || token === 'USDC') &&
            buyNowAvailable
            ? buyNowPrice * Math.pow(10, TokenDecimal(token))
            : 0;
        auctionPayments.push([
          TokenAddress(token, products[0]?.attributes?.chainId),
          converted,
          convertedPrice
        ]);
      }

      // handle royalty logic
      let setRoyalty = '0';
      if (royaltyPercent > 0 && minter === user.attributes.ethAddress) {
        setRoyalty = '1';
      }

      const web3 = new Web3(Moralis.provider);

      if (recipientPercent > 0) {
        try {
          web3.utils.toChecksumAddress(recipientAddress);
        } catch (e) {
          dispatch(closeGeneralPopup());
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Invalid ethereum address',
              size: 'sm',
              textButton: 'OK'
            })
          );
          return;
        }
      }

      const split = [
        web3.utils.isAddress(recipientAddress)
          ? recipientAddress
          : TokenAddress('ETH'),
        recipientPercent * 100,
        charityPercent > 0
          ? charities[selectedCharityIndex].address
          : TokenAddress('ETH'),
        selectedCharityIndex === 0 ? 0 : charityPercent * 100 // if none is selected then send 0 % to charity
      ];

      const startTime = Date.now() + selectedStartIndex * (3600 * 1000 * 24);

      const endDays = (Number(selectedEndIndex) + 1) * 3600 * 1000 * 24;
      const endTime = startTime + endDays;

      const nfts = [];
      products.map((product, i) => {
        const nft = [
          product?.attributes?.collectionType === 'ERC1155' ? 0 : 1,
          product?.attributes?.collectionAddress,
          product?.attributes?.tokenId,
          putForSale[i]
        ];
        if (coverImage === i) {
          return nfts.unshift(nft);
        }
        return nfts.push(nft);
      });

      // get subscription sig
      const subscriptionSig = await CrossChainSig(
        user,
        products[0]?.attributes?.chainId
      );
      const emptyFeat = EMPTY_FEAT;
      const auctionRequest = [
        nfts,
        auctionPayments,
        chainlinkPayments,
        setRoyalty,
        String(royaltyPercent * 100),
        split,
        [parseInt(startTime / 1000), parseInt(endTime / 1000)],
        subscriptionSig,
        emptyFeat,
        JSON.stringify(categories)
      ];
      const result = await createAuction(Moralis, auctionRequest);
      dispatch(closeGeneralPopup());
      if (result?.status) {
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Listing on Marketplace was successful',
            message: 'For more details view:',
            size: 'sm',
            copyText: result?.transactionHash,
            copyTextLink:
              ChainScanerLink(products[0]?.attributes?.chainId) +
              '/tx/' +
              result?.transactionHash,
            textButton: 'OK',
            linkButton: '/nft-marketplace',
            autoClose: 'false'
          })
        );
        history.replace(`/nft-marketplace`);
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
              message: 'Listing on Marketplace was Failed!',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
    }
  };

  const handleSingleApprove = async (index) => {
    const res = await requestNFTApproval(
      Moralis,
      products[index]?.attributes?.collectionType,
      products[index]?.attributes?.collectionAddress,
      activeSingle ? 0 : 1
    );

    // manually update approve

    checkApproved();
  };

  const url = window.location.href;

  const [productBanner, setProductBanner] = useState(null);

  useEffect(async () => {
    if (
      products[activeSlide]?.attributes?.image &&
      (await CheckUrlExist(products[activeSlide]?.attributes?.image))
    ) {
      setProductBanner(products[activeSlide]?.attributes?.image);
    }
  }, [products[activeSlide]?.attributes?.image]);

  const paymentMethodList = () => {
    if (activeTokens?.token?.length > 0) {
      return (
        <div
          className="mediaeye-paymentmethod"
          size={activeTokens.token.length}
        >
          <div className="mediaeye-paymentmethod-inner">
            {activeTokens.token.map((tokenRow, i) => (
              <>
                {i > 0 ? (
                  <div className="mediaeye-paymentmethod-inner-middle">
                    <span>and</span>
                  </div>
                ) : null}
                <div
                  className={`mediaeye-paymentmethod-box active  ${activeTokens.primary === tokenRow &&
                    activeTokens.token.length > 1
                    ? 'makeprimary'
                    : ''
                    }`}
                >
                  <div className="mediaeye-paymentmethod-box-inner">
                    <div className="mediaeye-paymentmethod-box-btn">
                      <div className="mediaeye-paymentmethod-box-icon">
                        <img src={GetNetworkIcon(tokenRow)} alt={tokenRow} />
                      </div>
                      <div className="mediaeye-paymentmethod-box-content">
                        <div className="mediaeye-paymentmethod-box-content-name">
                          {tokenRow}
                        </div>
                      </div>
                    </div>

                    <label className="mediaeye-paymentmethod-box-price">
                      <input
                        className={'mediaeye-paymentmethod-box-price-input'}
                        disabled={
                          activeTokens.primary === tokenRow ? false : true
                        }
                        type="text"
                        placeholder={
                          activeSingle
                            ? 'Enter price for one piece'
                            : 'Enter minimum Bid'
                        }
                        value={prices[i]}
                        onChange={(e) => {
                          handlePrices(
                            roundString(allowOnlyNumber(e.target.value), 5),
                            i
                          );
                        }}
                      />
                    </label>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div className="marketplace-create-page-inner">
      <ReactTooltip className="mediaeyetooltip" />
      <PopupImage
        showPopup={showPopupImage}
        togglePopup={togglePopupImage}
        img={products[activeSlide]?.attributes.image}
      />

      <div className="mediaeye-layout-middle">
        <section className="mediaeye-layout-section">
          <div className="mediaeye-layout-container">
            <div className="marketplace-create-page-inner-content">
              <div className="marketplace-create-page-inner-content-col">
                <div className="marketplace-create-page-inner-content-imgbox">
                  <Slider {...settings} ref={slider}>
                    {products.map((product, i) => (
                      <div className="marketplace-create-page-inner-content-imgbox-slide">
                        {productBanner ? (
                          product?.attributes?.fileType === 'video/mp4' ? (
                            <video
                              preload="metadata"
                              src={productBanner}
                              alt="/img/marketplace_img.png"
                              loop
                              controls
                              playsInline
                              controlsList="nodownload"
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={productBanner}
                              alt="ProductImg"
                              onClick={togglePopupImage}
                            />
                          )
                        ) : (
                          <ImagePlug />
                        )}
                        <div
                          className="marketplace-create-page-inner-content-imgbox-choose"
                          onClick={() => setCoverImage(activeSlide)}
                        >
                          <div className="marketplace-create-page-inner-content-imgbox-choose-heading">
                            {activeSlide === coverImage ? (
                              <CircleActive />
                            ) : (
                              <Circle />
                            )}{' '}
                            Choose as a cover
                          </div>
                          <div className="marketplace-create-page-inner-content-imgbox-choose-des">
                            Select one of the NFT Images to change the cover
                            image for bundle
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="marketplace-create-page-inner-content-info">
                  <h2 className="marketplace-create-page-inner-content-info-title">
                    {products[activeSlide]?.attributes?.name}
                  </h2>
                  {/* <div className="marketplace-create-page-inner-content-info-product">
                    Contract address:
                    <div className="mediaeye-copy">
                      &nbsp;{' '}
                      {formatAdddress(
                        products[activeSlide]?.attributes?.collectionAddress
                      )}
                      <div className="mediaeye-copy-box">
                        <button
                          className="mediaeye-copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              products[activeSlide]?.attributes
                                ?.collectionAddress
                            );
                            setCopyText(true);
                            setTimeout(function () {
                              setCopyText(false);
                            }, 3000);
                          }}
                        >
                          <Copy />
                        </button>
                        <div className="mediaeye-copy-box-msg">
                          {copyText ? 'Copied!' : null}
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* <span>
                    Share:
                    <TwitterShareButton url={url}>
                      <Twitter />
                    </TwitterShareButton>
                    <FacebookShareButton url={url}>
                      <Facebook />
                    </FacebookShareButton>
                     <TelegramShareButton url={url}>
                      <Telegram />
                    </TelegramShareButton>
                    <Instagram>
                      <InstagramEmbed
                        url={url}
                        clientAccessToken="302417301779313|ed7d9ade615e8bd22fa916b3959b1774"
                      />
                    </Instagram>
                  </span> */}

                {/* <div className="marketplace-create-page-inner-content-row">
                  <h2 className="marketplace-create-page-inner-content-row-title">
                    Description
                  </h2>
                  <div className="marketplace-create-page-inner-content-description">
                    {limitTextContent(
                      products[activeSlide]?.attributes?.description,
                      300,
                      descriptionLimit
                    )}
                  </div>
                </div> */}

                <div className="marketplace-create-page-inner-content-tabs">
                  <DetailsCard
                    product={products[activeSlide]}
                    nft={nft}
                    currentListing={currentListing}
                    listingNFT={currentListingNFT}
                    mimetype={mimetype}
                  />
                </div>
              </div>
              {/* end left col */}

              <div className="marketplace-create-page-inner-content-col">
                <div className="marketplace-create-page-inner-content-col-title">
                  List Bundle on Marketplace
                </div>
                <div className="marketplace-create-page-inner-content-row">
                  <h2 className="marketplace-create-page-inner-content-row-title">
                    Select NFTs for Bundling and Approve
                  </h2>
                  <div className="approve_cards marketplace-create-page-inner-content-approvecards">
                    <div className="approvecards">
                      <Swiper
                        {...smililarSlidersettings}
                        className="mediaeye-nft-slide"
                      >
                        {products.map((product, i) => {
                          return (
                            <SwiperSlide key={i}>
                              <div
                                className={
                                  coverImage === i
                                    ? 'approvecards-item active'
                                    : 'approvecards-item'
                                }
                                onClick={() => slider.current.slickGoTo(i)}
                              >
                                <div className="approvecards-item-inner">
                                  <div className="approvecards-item-inner-imgbox">
                                    {product?.attributes?.image ? (
                                      product?.attributes?.fileType ===
                                        'video/mp4' ? (
                                        <video
                                          preload="metadata"
                                          src={product?.attributes?.image}
                                          playsInline
                                          onClick={() =>
                                            slider.current.slickGoTo(i)
                                          }
                                          controlsList="nodownload"
                                        >
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      ) : (
                                        <img
                                          src={product?.attributes?.image}
                                          alt="product_img"
                                        />
                                      )
                                    ) : null}
                                  </div>

                                  <div className="approvecards-item-inner-content">
                                    {approvedStatus[i] ? (
                                      <>
                                        <div className="approvecards-item-inner-content-quantity">
                                          {product?.attributes
                                            ?.collectionType === 'ERC1155' ? (
                                            <>
                                              <input
                                                className="approvecards-item-inner-content-quantity-input"
                                                id={i}
                                                type="text"
                                                pattern="[0-9]*"
                                                min={1}
                                                max={totalOwned[i]}
                                                value={putForSale[i]}
                                                onChange={(e) =>
                                                  putForSaleChange(
                                                    allowOnlyNumber(
                                                      e.target.value,
                                                      false
                                                    ),
                                                    i
                                                  )
                                                }
                                              />
                                              <span
                                                className="approvecards-item-inner-content-quantity-max"
                                                onClick={() =>
                                                  maxputForSaleChange(
                                                    i,
                                                    totalOwned[i]
                                                  )
                                                }
                                              >
                                                MAX
                                              </span>
                                            </>
                                          ) : (
                                            <>
                                              <span className="approvecards-item-inner-content-quantity-input">
                                                1
                                              </span>
                                            </>
                                          )}
                                        </div>
                                        <div className="approvecards-item-inner-content-quantity-lable">
                                          Quantity
                                        </div>
                                        <div
                                          className={
                                            'approvecards-item-inner-content-title approved'
                                          }
                                        >
                                          Approved
                                        </div>
                                      </>
                                    ) : (
                                      <div
                                        className={
                                          'approvecards-item-inner-content-title approve'
                                        }
                                        onClick={() => handleSingleApprove(i)}
                                      >
                                        {' '}
                                        Approve
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                    <div className="mediaeye-swiper-pagination withscroll mediaeye-product-more-pagination"></div>
                  </div>
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <div>
                    <label
                      className="marketplace-create-page-inner-content-row-title"
                      htmlFor="nameBundle"
                    >
                      Name
                    </label>
                    <div className="marketplace-create-page-inner-content-name">
                      <input
                        id="nameBundle"
                        className="marketplace-create-page-inner-content-name-input"
                        value={name}
                        onChange={(e) => changeName(e)}
                      />
                      <div className="marketplace-create-page-inner-content-help">
                        {!nameValid
                          ? 'Enter valid name'
                          : 'Enter name for your bundle'}
                      </div>
                    </div>
                  </div>
                  <div className="m-t-30">
                    <label
                      className="marketplace-create-page-inner-content-row-title"
                      htmlFor="descriptionBundle"
                    >
                      Description
                    </label>
                    <div className="marketplace-create-page-inner-content-description mediaeyetextarea">
                      <textarea
                        id="descriptionBundle"
                        className="mediaeyetextarea-input"
                        rows="5"
                        onChange={(e) => changeDescription(e)}
                        value={description}
                      >
                        {description}
                      </textarea>
                    </div>
                    <div className="marketplace-create-page-inner-content-help">
                      {!descriptionValid
                        ? 'Enter valid description'
                        : 'Enter a description for your bundle'}
                    </div>
                  </div>
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <h2 className="marketplace-create-page-inner-content-row-title">
                    Listing Category
                  </h2>
                  <CategoriesCard
                    categories={categories}
                    addCategory={addCategory}
                    removeCategory={removeCategory}
                  />
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <h2 className="marketplace-create-page-inner-content-row-title">
                    Sale Format
                  </h2>
                  <div
                    className="marketplace-create-page-inner-content-blockchain mediaeyesaleformat"
                    size="3"
                  >
                    <div
                      className={
                        activeSingle
                          ? 'mediaeyesaleformat-box active'
                          : 'mediaeyesaleformat-box'
                      }
                    >
                      <div
                        className="mediaeyesaleformat-box-inner"
                        onClick={() => {
                          setActiveSingle(true);
                        }}
                      >
                        <div className="mediaeyesaleformat-box-icon">
                          <Fixed />
                        </div>
                        <div className="mediaeyesaleformat-box-content">
                          <div className="mediaeyesaleformat-box-content-name">
                            Fixed price
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <h2 className="marketplace-create-page-inner-content-row-title mediaeyeinfo">
                    Select Payment Tokens and{' '}
                    {activeSingle ? 'Set Sale Price' : 'Minimum Bid'}*{' '}
                    <span
                      className="mediaeyeinfo-sign"
                      data-class="mediaeyetooltip"
                      data-tip="Select the accepted form of payment and set the minimum opening bid."
                    >
                      <InfoCircle type="outline" />
                    </span>{' '}
                  </h2>
                  <div className="marketplace-create-page-inner-content-paymentmethod">
                    <SelectSearch
                      placeholder="Select Payment Tokens"
                      className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style marketplace-create-page-inner-content-paymentmethod-select"
                      options={paymentTokensSelectList}
                      value={activePaymentToken}
                      onChange={(opt) => {
                        setActivePaymentToken(opt);
                      }}
                    />

                    {paymentMethodList()}

                    {/* <div
                      className="mediaeye-paymentmethod"
                      size={activeTokens?.length}
                    >
                      <div className="mediaeye-paymentmethod-inner">
                        <div
                          data-primary="true"
                          className={
                            activeTokens[0].active
                              ? primaryToken !== activeTokens[0].token
                                ? 'mediaeye-paymentmethod-box active makeprimary'
                                : 'mediaeye-paymentmethod-box active'
                              : 'mediaeye-paymentmethod-box'
                          }
                        >
                          <div className="mediaeye-paymentmethod-box-inner">
                            <div
                              className="mediaeye-paymentmethod-box-btn"
                              onClick={() => {
                                let newTokens = [...activeTokens];
                                let activeStatus = activeTokens[0].active;
                                newTokens[0].active = !activeStatus;
                                setActiveTokens(newTokens);
                              }}
                            >
                              {displayNativeToken()}
                              {activeTokens[0].active &&
                                primaryToken !== activeTokens[0].token ? (
                                <div
                                  className="mediaeye-paymentmethod-box-makeprimary"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div
                                    className="mediaeye-paymentmethod-box-makeprimary-btn"
                                    onClick={() =>
                                      makePrimary(activeTokens[0].token)
                                    }
                                  >
                                    <span className="mediaeye-paymentmethod-box-makeprimary-btn-icon"><Check size={'small'} /></span> Primary
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <label className="mediaeye-paymentmethod-box-price">
                              <input
                                className={
                                  'mediaeye-paymentmethod-box-price-input'
                                }
                                disabled={
                                  primaryToken === activeTokens[0].token
                                    ? false
                                    : true
                                }
                                type="text"
                                placeholder={
                                  activeSingle
                                    ? 'Enter price for one piece'
                                    : 'Enter minimum Bid'
                                }
                                value={prices[0]}
                                onChange={(e) => {
                                  handlePrices(
                                    roundString(
                                      allowOnlyNumber(e.target.value),
                                      5
                                    ),
                                    0
                                  );
                                }}
                              />
                              <div className="mediaeye-paymentmethod-box-price-token">
                                {activeTokens[0].token}
                              </div>
                            </label>
                          </div>
                        </div>

                        <div
                          data-primary="true"
                          className={
                            activeTokens[1].active
                              ? primaryToken !== activeTokens[1].token
                                ? 'mediaeye-paymentmethod-box active makeprimary'
                                : 'mediaeye-paymentmethod-box active'
                              : 'mediaeye-paymentmethod-box'
                          }
                        >
                          <div className="mediaeye-paymentmethod-box-inner">
                            <div
                              className="mediaeye-paymentmethod-box-btn"
                              onClick={() => {
                                let newTokens = [...activeTokens];
                                let activeStatus = activeTokens[1].active;
                                newTokens[1].active = !activeStatus;
                                setActiveTokens(newTokens);
                              }}
                            >
                              {displayStableToken()}
                              {activeTokens[1].active &&
                                primaryToken !== activeTokens[1].token ? (
                                <div
                                  className="mediaeye-paymentmethod-box-makeprimary"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div
                                    className="mediaeye-paymentmethod-box-makeprimary-btn"
                                    onClick={() =>
                                      makePrimary(activeTokens[1].token)
                                    }
                                  >
                                    <span className="mediaeye-paymentmethod-box-makeprimary-btn-icon"><Check size={'small'} /></span> Primary
                                  </div>
                                </div>
                              ) : null}
                            </div>

                            <label className="mediaeye-paymentmethod-box-price">
                              <input
                                className="mediaeye-paymentmethod-box-price-input"
                                disabled={
                                  primaryToken === activeTokens[1].token
                                    ? false
                                    : true
                                }
                                type="text"
                                placeholder={
                                  activeSingle
                                    ? 'Enter price for one piece'
                                    : 'Enter minimum Bid'
                                }
                                value={prices[1]}
                                onChange={(e) => {
                                  handlePrices(
                                    roundString(
                                      allowOnlyNumber(e.target.value),
                                      5
                                    ),
                                    1
                                  );
                                }}
                              />
                              <div className="mediaeye-paymentmethod-box-price-token">
                                {activeTokens[1].token}
                              </div>
                            </label>
                          </div>
                        </div>

                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <div className="marketplace-create-page-inner-content-calculation">
                    {!activeSingle ? (
                      <>
                        <div className="marketplace-create-page-inner-content-calculation-row">
                          <div className="marketplace-create-page-inner-content-calculation-row-left">
                            <div className="marketplace-create-page-inner-content-calculation-row-left-label mediaeyeinfo">
                              Buy Now Price{' '}
                              <span
                                className="mediaeyeinfo-sign"
                                data-class="mediaeyetooltip"
                                data-tip="Select the proceed ratio split and specified wallet address to receive the split net payment (after deduction marketplace, royalty and charity fees)."
                              >
                                <InfoCircle type="outline" />
                              </span>
                            </div>
                          </div>
                          <div className="marketplace-create-page-inner-content-calculation-row-right">
                            <div className="marketplace-create-page-inner-content-calculation-row-right-group">
                              <SelectSearch
                                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                options={startingOptions}
                                placeholder="Right after listing"
                                value={selectedStartIndex}
                                onChange={(opt) => setSelectedStartIndex(opt)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="marketplace-create-page-inner-content-calculation-row">
                          <div className="marketplace-create-page-inner-content-calculation-row-left">
                            <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                              Expiration Date{' '}
                            </div>
                          </div>
                          <div className="marketplace-create-page-inner-content-calculation-row-right">
                            <div className="marketplace-create-page-inner-content-calculation-row-right-group">
                              <SelectSearch
                                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                options={expirationOptions}
                                placeholder="..."
                                value={selectedEndIndex}
                                onChange={(opt) => setSelectedEndIndex(opt)}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div className="marketplace-create-page-inner-content-calculation-row">
                      <div className="marketplace-create-page-inner-content-calculation-row-left">
                        <div className="marketplace-create-page-inner-content-calculation-row-left-label mediaeyeinfo">
                          Set Proceed Split{' '}
                          <span
                            className="mediaeyeinfo-sign"
                            data-class="mediaeyetooltip"
                            data-tip="Select the proceed ratio split and specified wallet address to receive the split net payment (after deduction marketplace, royalty and charity fees)."
                          >
                            <InfoCircle type="outline" />
                          </span>
                        </div>
                      </div>
                      <div className="marketplace-create-page-inner-content-calculation-row-right">
                        <div className="marketplace-create-page-inner-content-calculation-row-right-group">
                          <div className="marketplace-create-page-inner-content-calculation-row-right-group-col">
                            <input
                              type="text"
                              value={recipientAddress}
                              onChange={(e) =>
                                setRecipientAddress(e.target.value)
                              }
                              placeholder="Recipient Address"
                              className="marketplace-create-page-inner-content-calculation-row-right-group-input"
                            />
                          </div>
                          <div className="marketplace-create-page-inner-content-calculation-row-right-group-col mw80">
                            <input
                              className="marketplace-create-page-inner-content-calculation-row-right-group-input"
                              type="text"
                              placeholder="0"
                              value={recipientPercent}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                let value = allowOnlyNumber(e.target.value);
                                if (value === '' || re.test(value)) {
                                  value = value > 100 ? 100 : value;
                                  e.target.value = value;
                                  setRecipientPercent(value);
                                }
                              }}
                            />
                            <div className="marketplace-create-page-inner-content-calculation-row-right-group-text">
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* {activeTokens[1].active && !activeSingle ? (
                      <div className="marketplace-create-page-inner-content-calculation-row">
                        <div className="marketplace-create-page-inner-content-calculation-row-left">
                          <div className="marketplace-create-page-inner-content-calculation-row-left-label mediaeyeinfo">
                            Buy Now Price (Optional){' '}
                            <span
                              className="mediaeyeinfo-sign"
                              data-class="mediaeyetooltip"
                              data-tip="Bids below this amount won’t be allowed."
                            >
                              <InfoCircle type="outline" />
                            </span>
                          </div>
                        </div>
                        <div className="marketplace-create-page-inner-content-calculation-row-right">
                          <div className="marketplace-create-page-inner-content-calculation-row-right-group">
                            <input
                              className="marketplace-create-page-inner-content-calculation-row-right-group-input"
                              type="text"
                              placeholder={'Buy Now Price'}
                              value={buyNowPrice}
                              onChange={(e) => {
                                setBuyNowPrice(e.target.value);
                              }}
                              disabled={!buyNowAvailable}
                            />
                            <div className="marketplace-create-page-inner-content-calculation-row-right-group-max">
                              {products?.attributes?.chainId === '0x38'
                                ? 'BUSD'
                                : 'USDT'}
                            </div>
                          </div>
                          <div className="marketplace-create-page-inner-content-calculation-row-right-label">
                            <div className="checkbox-custom checkbox-custom-link">
                              <input
                                id="buy_now"
                                onChange={(e) => {
                                  if (!buyNowAvailable) {
                                    setBuyNowPrice(0);
                                  } else {
                                    setBuyNowPrice('disabled');
                                  }
                                  setBuyNowAvailable(e.target.checked);
                                }}
                                type="checkbox"
                                checked={buyNowAvailable}
                              />
                              <label htmlFor="buy_now">Enabled</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null} */}

                    <div
                      className={`marketplace-create-page-inner-content-calculation-row ${!charityEnable
                        ? ' marketplace-create-page-inner-content-calculation-row-disable'
                        : ''
                        } `}
                    >
                      <div className="marketplace-create-page-inner-content-calculation-row-left">
                        <div className="marketplace-create-page-inner-content-calculation-row-left-label mediaeyeinfo">
                          Charity <img src={charityIcon} alt="charity" />{' '}
                          <span
                            className="mediaeyeinfo-sign"
                            data-class="mediaeyetooltip"
                            data-tip="Charity is coming soon! Donate to approved charities  on-chain and receive a receipt."
                          >
                            <InfoCircle type="outline" />
                          </span>
                        </div>
                      </div>

                      <div className="marketplace-create-page-inner-content-calculation-row-right">
                        <div className="marketplace-create-page-inner-content-calculation-row-right-group mediaeyeCharitySearch">
                          <div className="marketplace-create-page-inner-content-calculation-row-right-group-col">
                            <input
                              className="marketplace-create-page-inner-content-calculation-row-right-group-input"
                              type="text"
                              placeholder="Select Charity"
                              onFocus={() => {
                                if (charityEnable) {
                                  setShowCharity(true);
                                }
                              }}
                              onBlur={() => {
                                if (!charitySearchCursor) {
                                  setShowCharity(false);
                                }
                              }}
                              value={charities[selectedCharityIndex]?.name}
                            />
                            <div className="marketplace-create-page-inner-content-calculation-row-right-group-icon">
                              <SearchIcon type="white" />
                            </div>
                          </div>
                          <div className="marketplace-create-page-inner-content-calculation-row-right-group-col mw80">
                            <input
                              type="text"
                              placeholder="0"
                              pattern="[0-9]*"
                              step={1}
                              min="1"
                              className="marketplace-create-page-inner-content-calculation-row-right-group-input"
                              max={CHARITY_MAX}
                              value={charityPercent}
                              onChange={(e) => {
                                let re = /^[0-9\b]+$/;
                                if (charityEnable) {
                                  let value = allowOnlyNumber(e.target.value);
                                  value =
                                    value > CHARITY_MAX ? CHARITY_MAX : value;
                                  e.target.value = value;
                                  setCharityPercent(value);
                                }
                              }}
                            />
                            <div className="marketplace-create-page-inner-content-calculation-row-right-group-text">
                              %
                            </div>
                            {/* <span className='pointer' onClick={() => setCharityPercent(CHARITY_MAX)}>MAX {CHARITY_MAX}%</span> */}
                          </div>
                          {showCharity ? (
                            <div
                              className="mediaeyeCharitySearch-dropdown"
                              onMouseEnter={() => setCharitySearchCursor(true)}
                              onMouseLeave={() => setCharitySearchCursor(false)}
                            >
                              <div className="mediaeyeCharitySearch-dropdown-header">
                                <div
                                  onClick={() => {
                                    setSelectedCharityType('All Charities');
                                  }}
                                  className={`mediaeyeCharitySearch-dropdown-header-col ${selectedCharityType === 'All Charities'
                                    ? 'active'
                                    : ''
                                    }`}
                                >
                                  All Charities
                                </div>
                                {products[0]?.attributes?.chainId === '0x1' ? (
                                  <div
                                    onClick={() => {
                                      setSelectedCharityType('Giving Block');
                                    }}
                                    className={`mediaeyeCharitySearch-dropdown-header-col ${selectedCharityType === 'Giving Block'
                                      ? 'active'
                                      : ''
                                      }`}
                                  >
                                    Giving Block
                                  </div>
                                ) : null}
                              </div>
                              <div className="mediaeyeCharitySearch-dropdown-body">
                                {charities?.length > 0 ? (
                                  <>
                                    {charities.map((charity, i) => (
                                      <div
                                        onClick={() => {
                                          setSelectedCharityIndex(i);
                                          setShowCharity(false);
                                        }}
                                        className={`mediaeyeCharitySearch-dropdown-list ${selectedCharityIndex === i
                                          ? 'active'
                                          : ''
                                          }`}
                                      >
                                        {charity?.name}
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <div
                                    onClick={() => {
                                      setShowCharity(false);
                                    }}
                                    className="mediaeyeCharitySearch-dropdown-list"
                                  >
                                    No Charity
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {displayPriceInformation()}
                  </div>
                </div>

                <div className="m-b-30">
                  <div className="marketplace-create-page-inner-content-featurenft">
                    <div className="mediaeyeFeatureNft">
                      <FeatureYourNFT
                        content={{
                          attributes: {
                            name: products[0].attributes.name,
                            image: products[0].attributes.image,
                            specific: activeSingle ? 'Fixed Price' : 'Auction'
                          }
                        }}
                        setFeatureInformation={setFeatureInformation}
                        featureInformation={featureInformation}
                        featureType={FEATURETYPE.Auction}
                        isFeatured={false}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* end right col */}
            </div>
            {/* end container */}
          </div>
        </section>
      </div>
      <div
        className={
          fixedButtons ? 'mediaeyepage-bottom isfixed' : 'mediaeyepage-bottom'
        }
      >
        <div className="mediaeye-layout-container">
          <div className="mediaeyepage-bottom-inner">
            <div className="mediaeyepage-bottom-inner-item">
              {isValid ? (
                <button
                  type="button"
                  className="btn btn-lg btn-info"
                  onClick={() => handleCreate()}
                >
                  {!nftsApproved ? 'Approve NFTs' : 'List on Marketplace'}
                </button>
              ) : (
                <button type="button" className="btn btn-lg btn-disable">
                  {!nftsApproved ? 'Approve NFTs' : 'List on Marketplace'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutOnMarketplace;
