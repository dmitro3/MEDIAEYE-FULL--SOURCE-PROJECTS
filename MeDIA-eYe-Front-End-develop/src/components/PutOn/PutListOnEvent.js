import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import {
  SearchIcon,
  Copy,
  Auction,
  BackArrow,
  Fixed,
  InfoCircle
} from '../Icons/';
import {
  closeGeneralPopup,
  toggleGeneralPopup
} from '../../store/app/appSlice';
import { useDispatch } from 'react-redux';
import PopupImage from '../ProductCard/ProductPopup/Popup';
import {
  createListing,
  createAuction,
  queryCharities,
  querySoldStatus,
  queryRoyalty
} from '../../blockchain/functions/Marketplace';
import { useMoralis } from 'react-moralis';
import {
  checkNFTApproval,
  requestNFTApproval
} from '../../blockchain/functions/ApproveToken';
import { TokenAddress } from '../../blockchain/functions/Addresses';
import ChangeChainRequest from '../../blockchain/functions/ChangeChain/ChangeChainRequest';
import DetailsCard from './PutOnReusables/DetailsCard';
import SelectSearch from 'react-select-search';
import formatAdddress from '../../utils/formatAdddress';
import ReactTooltip from 'react-tooltip';
import { TokenNameMap } from './TokenNameMap';
import {
  convertPrice,
  roundString,
  numberRoundConverter,
  allowOnlyNumber
} from '../../blockchain/functions/Utils';
import Switch from 'react-switch';
import { zeroAddress } from 'ethereumjs-util';
import CrossChainSig from '../../blockchain/functions/Subscription/CrossChainSig';
import { EMPTY_FEAT } from '../../blockchain/functions/Feature/EmptyFeat';
import CategoriesCard from './PutOnReusables/CategoriesCard';
import FeatureYourNFT from './PutOnReusables/FeatureYourNFT';
import FEATURETYPE from '../../utils/featureConstants';
import Web3 from 'web3';
import './PutOnMarketplacelisting.scss';
import {
  ChainScanerLink,
  ChainName
} from '../../blockchain/functions/ChangeChain/ChainNames';
import { Model3d } from '../3d/Model3d';
import charityIcon from '../../assets/img/charity.png';
import { include } from 'underscore';

const PutListOnEvent = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  //const product = location?.state?.activeImages;
  const owned = location?.state?.activeImages[0];
  const product = props.product;
  const totalOwned = owned?.amount;
  const [putForSale, setPutForSale] = useState(totalOwned);
  const [activeSingle, setActiveSingle] = useState(true);
  //const [recepient, setRecpient] = useState([]);
  const [fixedButtons, setFixedButtons] = useState(true);
  const [showPopupImage, setShowPopupImage] = useState(false);
  const { user, Moralis, isInitialized, web3 } = useMoralis();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [nftApproved, setNftApproved] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const ROYALTY_MAX = 15;
  const CHARITY_MAX = 15;
  const [categories, setCategories] = useState([]);
  const [showCharity, setShowCharity] = useState(false);
  // price factors
  const [featureInformation, setFeatureInformation] = useState({});
  const [prices, setPrices] = useState([0, 0]);

  const [descriptionLimit, setDescriptionLimit] = useState(true);

  const [activeTokens, setActiveTokens] = useState(() => {
    // true for active,false for inactive
    if (product?.attributes?.chainId === '0x38') {
      return [
        { token: 'BNB', active: true },
        { token: 'BUSD', active: false }
      ];
    } else if (product?.attributes?.chainId === '0x1') {
      return [
        { token: 'ETH', active: true },
        { token: 'USDT', active: false }
      ];
    } else if (product?.attributes?.chainId === '0xfa') {
      return [
        { token: 'FTM', active: true },
        { token: 'USDC', active: false }
      ];
    }
  });
  const [primaryToken, setPrimaryToken] = useState(activeTokens[0].token);
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
  const feePercent = 2.5;
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
  const minter = product?.attributes?.minter;
  const collectionType = product?.attributes?.collectionType;
  const collectionAddress = product?.attributes?.collectionAddress;
  const tokenId = Number(product?.attributes?.tokenId);
  const [isSold, setSold] = useState(true);
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(true);
  const [copyText, setCopyText] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

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
  const togglePopupImage = () => {
    setShowPopupImage(!showPopupImage);
  };
  const toggleCharityList = () => {
    setShowCharity(!showCharity);
  };

  const putForSaleChange = (e) => {
    if (e.target.value <= 0) {
      setPutForSale(' ');
    } else {
      if (
        (Number(e.target.value) <= totalOwned && Number(e.target.value) >= 0) ||
        e.target.value === null
      ) {
        setPutForSale(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    if (
      (activeTokens[0].active && prices[0] === 0) ||
      (activeTokens[1].active && prices[1] === 0)
    ) {
      setIsValid(false);
      return;
    }
    if (activeTokens[0].active && prices[0] !== 0 && prices[0].length > 0) {
      setIsValid(true);
      return;
    }
    if (activeTokens[1].active && prices[1] !== 0 && prices[1].length > 0) {
      setIsValid(true);
      return;
    } else {
      setIsValid(false);
    }
  }, [prices, activeTokens]);

  // when active token changes handle primary token selection
  useEffect(() => {
    for (let i in activeTokens) {
      // if primary token is no longer active, set primary token to the next active token
      if (!activeTokens[i].active && activeTokens[i].token === primaryToken) {
        for (let j in activeTokens) {
          if (activeTokens[j].active) {
            setPrimaryToken(activeTokens[j].token);
          }
        }
      }
    }
  }, [activeTokens]);

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

  const displayPriceInformation = () => {
    let charityStr = '';
    let recipientStr = '';
    let userStr = '';
    let royaltyStr = '';
    let listingTypeStr = activeSingle
      ? 'You will receive '
      : 'You will receive a minimum of ';
    let perNFTStr = ' for the single nft';
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

    let amountActive = 0;
    for (let i = 0; i < activeTokens.length; i++) {
      // if token is active include price information
      let roundOf = 3;
      if (feePrices[i] <= 0.0001) {
        roundOf = 6;
      } else if (feePrices[i] <= 0.001) {
        roundOf = 5;
      } else if (feePrices[i] <= 0.01) {
        roundOf = 4;
      }

      if (activeTokens[i].active) {
        amountActive++;
        let orStr = amountActive > 1 ? 'or' : '';

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
          )} ${activeTokens[i].token}`;
        }

        charityStr += ` ${orStr} ${charityReceives} ${activeTokens[i].token}`;
        recipientStr += ` ${orStr}   ${recipientReceives} ${activeTokens[i].token}`;
        userStr += ` ${orStr} ${numberRoundConverter(
          feePrices[i] - charityReceives - recipientReceives,
          roundOf
        )} ${activeTokens[i].token}`;
      }
    }

    return (
      <>
        {splitPercent > 100 ? (
          <div className="marketplace-create-page-inner-content-calculation-row">
            <div className="marketplace-create-page-inner-content-calculation-row-left">
              <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                Error
              </div>
            </div>
            <div className="marketplace-create-page-inner-content-calculation-row-right">
              <div className="marketplace-create-page-inner-content-calculation-row-right-label">
                Charity and Recipient Fee must add up to no more than 100%
              </div>
            </div>
          </div>
        ) : (
          <div>
            {royaltyPercent > 0 && isPriceSet ? (
              <div className="marketplace-create-page-inner-content-calculation-row">
                <div className="marketplace-create-page-inner-content-calculation-row-left">
                  <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                    {/* {listingTypeStr} */} Royalty Deduction ({royaltyPercent}
                    %)
                  </div>
                </div>
                <div className="marketplace-create-page-inner-content-calculation-row-right">
                  <div className="marketplace-create-page-inner-content-calculation-row-right-label">
                    {royaltyStr}
                  </div>
                </div>
              </div>
            ) : null}
            {selectedCharityIndex > 0 && charityPercent > 0 && isPriceSet ? (
              <div className="marketplace-create-page-inner-content-calculation-row">
                <div className="marketplace-create-page-inner-content-calculation-row-left">
                  <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                    {charities[selectedCharityIndex].name}
                  </div>
                </div>
                <div className="marketplace-create-page-inner-content-calculation-row-right">
                  <div className="marketplace-create-page-inner-content-calculation-row-right-label">
                    {charityStr} {perNFTStr}
                  </div>
                </div>
              </div>
            ) : null}

            {recipientPercent > 0 && recipientAddress && isPriceSet ? (
              <div className="marketplace-create-page-inner-content-calculation-row">
                <div className="marketplace-create-page-inner-content-calculation-row-left">
                  <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                    Proceed Split to Designated Receiver ({recipientPercent}%)
                  </div>
                </div>
                <div className="marketplace-create-page-inner-content-calculation-row-right">
                  <div className="marketplace-create-page-inner-content-calculation-row-right-label">
                    {recipientStr}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="marketplace-create-page-inner-content-calculation-row">
              <div className="marketplace-create-page-inner-content-calculation-row-left">
                <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                  Net Proceeds
                </div>
              </div>
              <div className="marketplace-create-page-inner-content-calculation-row-right">
                <div className="marketplace-create-page-inner-content-calculation-row-right-label text-bold">
                  {userStr} {/* {perNFTStr} */}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const switchWrapped = (wrapped) => {
    let newActiveTokens = [...activeTokens];
    newActiveTokens[0].token = TokenNameMap(
      product?.attributes?.chainId,
      wrapped
    );

    // handle primary token change
    if (activeTokens[0].active) {
      setPrimaryToken(newActiveTokens[0].token);
    }
    setActiveTokens(newActiveTokens);
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
    if (user && Moralis.isWeb3Enabled()) {
      checkApproved();
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
    // check if the amount for token is approved
    let isApproved = await checkNFTApproval(
      Moralis,
      user.attributes.ethAddress,
      collectionType,
      collectionAddress,
      activeSingle ? 0 : 1,
      dispatch
    );
    setNftApproved(isApproved);
  };

  const handleCreate = async () => {
    // check if a payment token is selected
    let tokenSelected = false;
    for (let i = 0; i < activeTokens.length; i++) {
      if (activeTokens[i].token) tokenSelected = true;
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
    // check if user is on the correct blockchain, if not request change
    if (!(product?.attributes?.chainId === (await Moralis.chainId))) {
      ChangeChainRequest(product?.attributes?.chainId);
    } else {
      //  activeSingle ? handleListing() : handleAuction();
    }
  };

  const handleListing = async () => {
    dispatch(
      toggleGeneralPopup({
        status: 'loading',
        message: 'Processing...',
        size: 'xs'
      })
    );

    if (!nftApproved) {
      let result = await requestNFTApproval(
        Moralis,
        collectionType,
        collectionAddress,
        0
      );

      dispatch(closeGeneralPopup());
      if (result?.status) {
        setNftApproved(true);
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Listing on Marketplace was successful',
            message: 'For more details view:',
            size: 'sm',
            copyText: result?.transactionHash,
            copyTextLink:
              ChainScanerLink(product?.attributes?.chainId) +
              '/tx/' +
              result?.transactionHash,
            textButton: 'OK',
            autoClose: 'false',
            linkButton: '/nft-marketplace'
          })
        );
        history.replace(`/nft-marketplace`);
      } else {
        setNftApproved(false);
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
              message: 'Listing on Marketplace has Failed!',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
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

    if (nftApproved) {
      // create listing payments object based on active tokens and prices
      let listingPayments = [];
      let isChainlinkValid = true;
      for (let i = 0; i < activeTokens.length; i++) {
        let token = activeTokens[i];
        let converted = Moralis.Units.ETH(prices[i].toString());
        // now only input primary token to listing payments
        if (token.active && token.token === primaryToken) {
          listingPayments.push([
            TokenAddress(token.token, product?.attributes?.chainId),
            converted
          ]);
        }
        if (!token.active) {
          // if there are any payment options not being accepted, then chainlink is not valid
          isChainlinkValid = false;
        }
      }

      // set secondary token to be the opposite of primary token
      let secondaryTokenAddress =
        primaryToken === activeTokens[0].token
          ? TokenAddress(activeTokens[1].token, product?.attributes?.chainId)
          : TokenAddress(activeTokens[0].token, product?.attributes?.chainId);
      // if ftm set to 0 address
      // if (product?.attributes?.chainId === '0xfa') {
      //   secondaryTokenAddress = zeroAddress();
      // }

      let chainlinkPayments = [isChainlinkValid, secondaryTokenAddress];

      // handle royalty logic
      let setRoyalty = '0';

      if (
        royaltyPercent > 0 &&
        minter === user.attributes.ethAddress &&
        !isSold
      ) {
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
              size: 'xs',
              textButton: 'OK'
            })
          );
          return;
        }
      }

      const split = [
        web3.utils.isAddress(recipientAddress)
          ? recipientAddress
          : TokenAddress('ETH'), // set to 0x000... address
        recipientPercent * 100,
        charityPercent > 0
          ? charities[selectedCharityIndex].address
          : TokenAddress('ETH'),
        selectedCharityIndex === 0 ? 0 : charityPercent * 100 // if none is selected then send 0 % to charity
      ];
      // get subscription sig
      const subscriptionSig = await CrossChainSig(
        user,
        product?.attributes?.chainId
      );
      const emptyFeat = EMPTY_FEAT;
      const listingRequest = [
        [
          [
            collectionType === 'ERC1155' ? 0 : 1,
            collectionAddress,
            tokenId,
            putForSale
          ]
        ],
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
      if (result?.status) {
        setNftApproved(true);
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Listing on Marketplace was successful',
            message: 'For more details view:',
            size: 'sm',
            copyText: result?.transactionHash,
            copyTextLink:
              ChainScanerLink(product?.attributes?.chainId) +
              '/tx/' +
              result?.transactionHash,
            textButton: 'OK',
            linkButton: '/nft-marketplace',
            autoClose: 'false'
          })
        );
        history.replace(`/nft-marketplace`);
      } else {
        setNftApproved(false);
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
              message: 'Listing on Marketplace has Failed!',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
    }
  };

  const handleAuction = async () => {
    dispatch(
      toggleGeneralPopup({
        status: 'loading',
        message: 'Processing...',
        size: 'xs'
      })
    );

    if (!nftApproved) {
      let result = await requestNFTApproval(
        Moralis,
        collectionType,
        collectionAddress,
        1
      );
      dispatch(closeGeneralPopup());
      if (result?.status) {
        setNftApproved(true);
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Listing on Marketplace has successfull',
            message: 'For more details view:',
            size: 'sm',
            copyText: result?.transactionHash,
            copyTextLink:
              ChainScanerLink(product?.attributes?.chainId) +
              '/tx/' +
              result?.transactionHash,
            textButton: 'OK',
            autoClose: 'false',
            linkButton: '/nft-marketplace'
          })
        );
        history.replace(`/nft-marketplace`);
      } else {
        setNftApproved(false);
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
      return;
    }

    if (Number(charityPercent) + Number(recipientPercent) > 100) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Charity, Royalties, Recipient and Marketplace Fee must add up to no more than 100%',
          size: 'xs',
          textButton: 'OK'
        })
      );
      return;
    }

    if (nftApproved) {
      // create listing payments object based on active tokens and prices
      let auctionPayments = [];
      let chainlinkPayments = [false, zeroAddress()];

      for (let i = 0; i < activeTokens.length; i++) {
        let token = activeTokens[i];
        let converted = Moralis.Units.ETH(prices[i].toString());
        if (token.active) {
          // if buy it now set chainlink payments for stable
          /* if (token[0] === 'USDT' || (token[0] === 'BUSD' && buyNowAvailable)) {
            chainlinkPayments[0] = true;
          }*/
          // if token is USDT/BUSD, allow an instant buy price otherwise set to 0
          const convertedPrice =
            (token.token === 'USDT' || token.token === 'BUSD') &&
              buyNowAvailable
              ? Moralis.Units.ETH(buyNowPrice.toString())
              : 0;
          auctionPayments.push([
            TokenAddress(token.token, product?.attributes?.chainId),
            converted,
            convertedPrice
          ]);
        }
      }

      // handle royalty logic
      let setRoyalty = '0';
      if (
        royaltyPercent > 0 &&
        minter === user.attributes.ethAddress &&
        !isSold
      ) {
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
              size: 'xs',
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
      const startTime = Date.now() + selectedStartIndex * (3600 * 1000 * 24);

      const endDays = Number(selectedEndIndex) * 3600 * 1000 * 24;
      const endTime = startTime + endDays;

      // get subscription sig
      const subscriptionSig = await CrossChainSig(
        user,
        product?.attributes?.chainId
      );
      const emptyFeat = EMPTY_FEAT;
      const auctionRequest = [
        [
          [
            collectionType === 'ERC1155' ? 0 : 1,
            collectionAddress,
            tokenId,
            putForSale
          ]
        ],
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
      if (result?.status) {
        setNftApproved(true);
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Listing on Marketplace has successfull',
            message: 'For more details view:',
            size: 'sm',
            copyText: result?.transactionHash,
            copyTextLink:
              ChainScanerLink(product?.attributes?.chainId) +
              '/tx/' +
              result?.transactionHash,
            textButton: 'OK',
            linkButton: '/nft-marketplace',
            autoClose: 'false'
          })
        );
        history.replace(`/nft-marketplace`);
      } else {
        setNftApproved(false);
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
              message: 'Listing on Marketplace has Failed!',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
    }
  };

  const makePrimary = (token) => {
    setPrimaryToken(token);
  };

  const handlePrices = async (value, index) => {
    // handle user input to reflect price of primary token (only primary token is editable )
    let newPrices = [...prices];
    newPrices[index] = value;
    value = value ? value : 0;
    if (product?.attributes?.chainId !== '0xfa') {
      // check if number is valid before doing conversion
      if (typeof Number(value) === 'number' && isFinite(Number(value))) {
        // adjust all prices to match the primary token
        for (let i in prices) {
          // if not the primary token, get price from chainlink
          if (index != i) {
            let params = {
              token: activeTokens[index].token,
              chainId: '0x38',
              price: Moralis.Units.ETH(value),
              native: i == 0 ? true : false // if index is 0, then we are resolving to a native price
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

  const displayPaymentInputFields = () => {
    let amountActive = 0;
    return activeTokens.map((active, index) => {
      if (active.active) {
        amountActive++;
        return (
          <div>
            {amountActive > 1 ? <span>OR</span> : <div></div>}
            <div className="price_input_wrapper">
              <input
                disabled={primaryToken === active.token ? false : true}
                type="text"
                placeholder={
                  activeSingle
                    ? 'Enter price for one piece'
                    : 'Enter minimum Bid'
                }
                value={prices[index]}
                // set corresponding price of active token
                onChange={(e) => {
                  handlePrices(
                    roundString(allowOnlyNumber(e.target.value), 5),
                    index
                  );
                }}
              />
              <span>{active.token}</span>
            </div>
            <button
              style={{
                display: primaryToken === active.token ? 'none' : 'block',
                color: 'white'
              }}
              onClick={() => makePrimary(active.token)}
            >
              Make Primary
            </button>
            <span
              style={{
                display: primaryToken === active.token ? 'none' : 'block'
              }}
            >
              Current price is an approximation based on the primary token.
              Price may change depending on fluctuations of the value of the
              token.
            </span>
          </div>
        );
      } else {
        return <div></div>;
      }
    });
  };

  const displayChain = () => {
    return (
      <>
        <div
          className={`mediaeyetoken-box  ${product?.attributes?.chainId ===
            process.env.REACT_APP_BSC_CHAIN_NAME
            ? 'active'
            : ''
            }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              await ChangeChainRequest(process.env.REACT_APP_BSC_CHAIN_NAME);
            }}
          >
            <div className="mediaeyetoken-box-icon">
              <img src="/img/token/34/BNB.png" alt="bnb" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">BSC</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetoken-box  ${product?.attributes?.chainId === '0x1' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              await ChangeChainRequest('0x1');
            }}
          >
            <div className="mediaeyetoken-box-icon">
              <img src="/img/token/34/ETH.png" alt="eth" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">ETH</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetoken-box ${product?.attributes?.chainId === '0xfa' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              await ChangeChainRequest('0xfa');
            }}
          >
            <div className="mediaeyetoken-box-icon">
              <img src="/img/token/34/FTM.png" alt="ftm" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">FTM</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const displayStableToken = () => {
    if (product?.attributes?.chainId === '0x38') {
      return (
        <>
          <div className="mediaeye-paymentmethod-box-icon">
            <img src="/img/token/34/BUSD.png" alt="busd" />
          </div>
          <div className="mediaeye-paymentmethod-box-content">
            <div className="mediaeye-paymentmethod-box-content-name">BUSD</div>
          </div>
        </>
      );
    } else if (product?.attributes?.chainId === '0x1') {
      return (
        <>
          <div className="mediaeye-paymentmethod-box-icon">
            <img src="/img/token/34/USDT.png" alt="usdt" />
          </div>
          <div className="mediaeye-paymentmethod-box-content">
            <div className="mediaeye-paymentmethod-box-content-name">USDT</div>
          </div>
        </>
      );
    } else if (product?.attributes?.chainId === '0xfa') {
      return (
        <>
          <div className="mediaeye-paymentmethod-box-icon">
            <img src="/img/token/34/USDC.png" alt="usdc" />
          </div>
          <div className="mediaeye-paymentmethod-box-content">
            <div className="mediaeye-paymentmethod-box-content-name">USDC</div>
          </div>
        </>
      );
    }
  };

  const displayNativeToken = () => {
    if (product?.attributes.chainId === '0x38') {
      return (
        <>
          <div className="mediaeye-paymentmethod-box-icon">
            <img
              src={
                activeSingle
                  ? '/img/token/34/BNB.png'
                  : '/img/token/34/WBNB.png'
              }
              alt="token"
            />
          </div>
          <div className="mediaeye-paymentmethod-box-content">
            <div className="mediaeye-paymentmethod-box-content-name">
              {activeSingle ? 'BNB' : 'WBNB'}
            </div>
          </div>
        </>
      );
    } else if (product?.attributes?.chainId === '0x1') {
      return (
        <>
          <div className="mediaeye-paymentmethod-box-icon">
            <img
              src={
                activeSingle
                  ? '/img/token/34/ETH.png'
                  : '/img/token/34/WETH.png'
              }
              alt="token"
            />
          </div>
          <div className="mediaeye-paymentmethod-box-content">
            <div className="mediaeye-paymentmethod-box-content-name">
              {activeSingle ? 'ETH' : 'WETH'}
            </div>
          </div>
        </>
      );
    } else if (product?.attributes?.chainId === '0xfa') {
      return (
        <>
          <div className="mediaeye-paymentmethod-box-icon">
            <img
              src={
                activeSingle
                  ? '/img/token/34/FTM.png'
                  : '/img/token/34/WFTM.png'
              }
              alt="token"
            />
          </div>
          <div className="mediaeye-paymentmethod-box-content">
            <div className="mediaeye-paymentmethod-box-content-name">
              {activeSingle ? 'FTM' : 'WFTM'}
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <div className="marketplace-create-page-inner">
      <div className="mediaeye-layout-middle">
        <PopupImage
          showPopup={showPopupImage}
          togglePopup={togglePopupImage}
          img={product?.attributes?.image}
        />
        <ReactTooltip className="mediaeyetooltip" />
        <div className="mediaeye-layout-container">
          <div className="mediaeye-layout-container-header">
            <div className="mediaeye-layout-container-header-heading">
              <h2>List on Event</h2>
            </div>
          </div>
        </div>
        <section className="mediaeye-layout-section">
          <div className="mediaeye-layout-container">
            <div className="marketplace-create-page-inner-content">
              <div className="marketplace-create-page-inner-content-col">
                <div className="marketplace-create-page-inner-content-imgbox">
                  <div className="marketplace-create-page-inner-content-imgbox-slide">
                    {product?.attributes?.fileType === 'video/mp4' ? (
                      <video
                        preload="metadata"
                        src={product?.attributes?.image}
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
                        src={product?.attributes.image}
                        alt="ProductImg"
                        onClick={togglePopupImage}
                      />
                    )}
                  </div>
                </div>

                <div className="mediaeyecreatedby withcreattorname">
                  <div className="mediaeyecreatedby-heading">Creator:</div>
                  <Link
                    to={`/account/${user?.attributes?.ethAddress}`}
                    className="mediaeyecreatedby-link"
                  >
                    Petryk13
                  </Link>
                </div>
                {/* <div className="mediaeyecreatedby">
                  <div className="mediaeyecreatedby-heading">Created by</div>
                  <div className="mediaeyecreatedby-row">
                    <div className="mediaeyecreatedby-row-box">
                      <div className="mediaeyecreatedby-row-box-inner">
                        <div className="mediaeyecreatedby-row-box-inner-icon">
                          <img src="/img/sellers_ava.png" />
                        </div>
                        <div className="mediaeyecreatedby-row-box-inner-content">
                          <div className="mediaeyecreatedby-row-box-inner-content-name">
                            @Petryk13
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="marketplace-create-page-inner-content-tabs">
                  <DetailsCard product={product} />
                </div>
              </div>
              {/* end left part */}
              <div className="marketplace-create-page-inner-content-col">
                <div className="marketplace-create-page-inner-content-info">
                  <h2 className="marketplace-create-page-inner-content-info-title">
                    {product?.attributes.name}
                  </h2>
                  <div className="marketplace-create-page-inner-content-info-product">
                    Contract address:
                    <div className="mediaeye-copy">
                      &nbsp;{' '}
                      {formatAdddress(product?.attributes?.collectionAddress)}
                      <div className="mediaeye-copy-box">
                        <button
                          className="mediaeye-copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              product?.attributes?.collectionAddress
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
                  </div>
                </div>
                <div className="marketplace-create-page-inner-content-row">
                  <h2 className="marketplace-create-page-inner-content-row-title">
                    Description
                  </h2>
                  <div className="marketplace-create-page-inner-content-description">
                    {limitTextContent(
                      product?.attributes?.description,
                      300,
                      descriptionLimit
                    )}
                  </div>
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <h2 className="marketplace-create-page-inner-content-row-title">
                    Blockchain
                  </h2>
                  <div
                    className="marketplace-create-page-inner-content-blockchain mediaeyetoken"
                    size="3"
                  >
                    {displayChain()}
                  </div>
                </div>

                <div className="marketplace-create-page-inner-content-row">
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
                          switchWrapped(false);
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

                    <div
                      className={
                        !activeSingle
                          ? 'mediaeyesaleformat-box active'
                          : 'mediaeyesaleformat-box'
                      }
                    >
                      {collectionType === 'ERC1155' ? (
                        <div />
                      ) : (
                        <div
                          className="mediaeyesaleformat-box-inner"
                          onClick={() => {
                            switchWrapped(true);
                            setActiveSingle(false);
                          }}
                        >
                          <div className="mediaeyesaleformat-box-icon">
                            <Auction />
                          </div>
                          <div className="mediaeyesaleformat-box-content">
                            <div className="mediaeyesaleformat-box-content-name">
                              Auction
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {totalOwned > 1 ? (
                  <div className="marketplace-create-page-inner-content-row">
                    <div className="marketplace-create-page-inner-content-quantity">
                      <h2 className="marketplace-create-page-inner-content-row-title">
                        NFTs For Sale
                      </h2>
                      <div className="marketplace-create-page-inner-content-quantity-content">
                        <input
                          type="number"
                          max={totalOwned}
                          pattern="[0-9]*"
                          step={1}
                          placeholder="Quantity"
                          value={putForSale}
                          onChange={(e) => putForSaleChange(e)}
                          className="marketplace-create-page-inner-content-quantity-content-input"
                        />
                        <div
                          className="marketplace-create-page-inner-content-quantity-content-max"
                          onClick={() => setPutForSale(totalOwned)}
                        >
                          Max
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="marketplace-create-page-inner-content-row">
                  <h2 className="marketplace-create-page-inner-content-row-title mediaeyeinfo">
                    Select Payment Tokens and{' '}
                    {activeSingle ? 'Set Sales Price' : 'Minimum Bid'}*{' '}
                    <span
                      className="mediaeyeinfo-sign"
                      data-class="mediaeyetooltip"
                      data-html="true"
                      data-tip="Select the accepted form of payment and set the minimum opening bid. <br/>  MEDIA EYE Supports the EIP-2981 Standard"
                    >
                      <InfoCircle type="outline" />
                    </span>{' '}
                  </h2>

                  <div className="marketplace-create-page-inner-content-paymentmethod">
                    <div
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
                                    Make Primary
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
                        {/* {product?.attributes?.chainId === '0xfa' ? (
                        <></>
                      ) : ( */}
                        <>
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
                                      Make Primary
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
                        </>
                        {/* )} */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <div className="marketplace-create-page-inner-content-calculation">
                    {!activeSingle ? (
                      <>
                        <div className="marketplace-create-page-inner-content-calculation-row">
                          <div className="marketplace-create-page-inner-content-calculation-row-left">
                            <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                              Starting Date{' '}
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

                    {minter === user.attributes.ethAddress && !isSold ? (
                      <div className="marketplace-create-page-inner-content-calculation-row">
                        <div className="marketplace-create-page-inner-content-calculation-row-left">
                          <div className="marketplace-create-page-inner-content-calculation-row-left-label mediaeyeinfo">
                            Royalty Rate{' '}
                            <span
                              className="mediaeyeinfo-sign"
                              data-class="mediaeyetooltip"
                              data-html="true"
                              data-tip="Select royalty rate and collect instantly when a user re-sells an item you originally created. </br>
                              MEDIA EYE Supports the EIP-2981 Standard."
                            >
                              <InfoCircle type="outline" />
                            </span>
                            <ReactTooltip />
                          </div>
                        </div>
                        <div className="marketplace-create-page-inner-content-calculation-row-right">
                          <div className="marketplace-create-page-inner-content-calculation-row-right-group">
                            <input
                              type="number"
                              pattern="[0-9]*"
                              min="0"
                              max={ROYALTY_MAX}
                              value={royaltyPercent}
                              onChange={(e) => {
                                let value = e.target.value;
                                if (e.target.value > ROYALTY_MAX)
                                  value = ROYALTY_MAX;
                                else value = e.target.value;
                                setRoyaltyPercent(value);
                              }}
                              className="marketplace-create-page-inner-content-calculation-row-right-group-input"
                            />
                            <div
                              className="marketplace-create-page-inner-content-calculation-row-right-group-max"
                              onClick={() => setRoyaltyPercent(ROYALTY_MAX)}
                            >
                              MAX &nbsp; %
                            </div>
                          </div>
                        </div>
                      </div>
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
                              type="number"
                              placeholder="0"
                              max="100"
                              pattern="[0-9]*"
                              step={1}
                              min="1"
                              value={recipientPercent}
                              onChange={(e) => {
                                let value = e.target.value;
                                value = value > 100 ? 100 : value;
                                e.target.value = value;
                                setRecipientPercent(value);
                              }}
                            />
                            <div className="marketplace-create-page-inner-content-calculation-row-right-group-text">
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="marketplace-create-page-inner-content-calculation-row">
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
                                setShowCharity(true);
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
                              type="number"
                              placeholder="0"
                              pattern="[0-9]*"
                              step={1}
                              min="1"
                              className="marketplace-create-page-inner-content-calculation-row-right-group-input"
                              max={CHARITY_MAX}
                              value={charityPercent}
                              onChange={(e) => {
                                let value = e.target.value;
                                value =
                                  value > CHARITY_MAX ? CHARITY_MAX : value;
                                e.target.value = value;
                                setCharityPercent(value);
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

                <div className="marketplace-create-page-inner-content-row">
                  <div className="marketplace-create-page-inner-content-featurenft">
                    <div className="mediaeyeFeatureNft">
                      <div className="mediaeyeFeatureNft-header">
                        <div className="mediaeyeFeatureNft-header-title">
                          Spotlight My NFT
                        </div>
                        <div className="mediaeyeinfo">
                          <span
                            className="mediaeyeinfo-sign"
                            data-class="mediaeyetooltip"
                            data-tip="Feature your content across the platform and increase its awareness."
                          >
                            <InfoCircle type="outline" />
                          </span>
                        </div>
                        <Switch
                          className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeFeatureNft-switch ${toggleFeatureYourNFT ? 'active' : ''}`}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          onChange={() => {
                            setToggleFeatureYourNFT(!toggleFeatureYourNFT);
                          }}
                          checked={toggleFeatureYourNFT}
                          height={21}
                          width={50}
                        />
                      </div>

                      {toggleFeatureYourNFT ? (
                        <FeatureYourNFT
                          setFeatureInformation={setFeatureInformation}
                          featureInformation={featureInformation}
                          featureType={FEATURETYPE.Auction}
                          isFeatured={false}
                          content={{
                            attributes: {
                              name: product[0]?.attributes?.nft?.attributes
                                ?.name,
                              image:
                                product[0]?.attributes?.nft?.attributes?.image,
                              specific: activeSingle ? 'Fixed Price' : 'Auction'
                            }
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {/* end right part */}
            </div>
            {/* end content */}
          </div>
        </section>
        {/* <div className="container">
        <div className="product_main">
           
          
        </div>
      </div> */}
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
                  List on Event
                </button>
              ) : (
                <button type="button" className="btn btn-lg btn-disable">
                  List on Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutListOnEvent;
