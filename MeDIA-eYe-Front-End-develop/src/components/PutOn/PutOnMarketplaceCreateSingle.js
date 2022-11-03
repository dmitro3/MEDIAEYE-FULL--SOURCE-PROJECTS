import Web3 from 'web3';
import ReactTooltip from 'react-tooltip';
import './PutOnMarketplacelisting.scss';
import { useMoralis } from 'react-moralis';
import { TokenNameMap } from './TokenNameMap';
import { zeroAddress } from 'ethereumjs-util';
import SelectSearch from 'react-select-search';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailsCard from './PutOnReusables/DetailsCard';
import FEATURETYPE from '../../utils/featureConstants';
import charityIcon from '../../assets/img/charity.png';
import PopupImage from '../ProductCard/ProductPopup/Popup';
import CategoriesCard from './PutOnReusables/CategoriesCard';
import FeatureYourNFT from './PutOnReusables/FeatureYourNFT';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { TokenAddress } from '../../blockchain/functions/Addresses';
import { EMPTY_FEAT } from '../../blockchain/functions/Feature/EmptyFeat';
import { SearchIcon, Auction, Fixed, InfoCircle, ImagePlug, Angle } from '../Icons/';
import { CheckUrlExist, GetNetworkIcon } from '../../blockchain/functions/Utils';
import { TokenDecimal } from '../../blockchain/functions/Addresses/TokenDecimals';
import { closeGeneralPopup, toggleGeneralPopup } from '../../store/app/appSlice';
import CrossChainSig from '../../blockchain/functions/Subscription/CrossChainSig';
import { ChainScanerLink } from '../../blockchain/functions/ChangeChain/ChainNames';
import ChangeChainRequest from '../../blockchain/functions/ChangeChain/ChangeChainRequest';
import { checkNFTApproval, requestNFTApproval } from '../../blockchain/functions/ApproveToken';
import { convertPrice, roundString, numberRoundConverter, allowOnlyNumber } from '../../blockchain/functions/Utils';
import InfiniteScroll from 'react-infinite-scroll-component';

import { createListing, createAuction, queryCharities, querySoldStatus, queryRoyalty } from '../../blockchain/functions/Marketplace';



import { givingBlockOrganizationlist } from '../../blockchain/functions/Charity/charitycollection'

const PutOnMarketplace = (props) => {

  const feePercent = 2.5;
  const ROYALTY_MAX = 25;
  const CHARITY_MAX = 100;

  const history = useHistory();
  const product = props.product;
  const dispatch = useDispatch();
  const location = useLocation();

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

  const minter = product?.attributes?.minter;
  const tokenId = Number(product?.attributes?.tokenId);
  const collectionType = product?.attributes?.collectionType;
  const collectionAddress = product?.attributes?.collectionAddress;

  const [toggleone, settoggleone] = useState(true);
  const [isSold, setSold] = useState(true);
  const [prices, setPrices] = useState([0, 0]);
  const [isValid, setIsValid] = useState(false);
  const [charitiesData, setCharitiesData] = useState([]);
  const [copyText, setCopyText] = useState(false);
  const [putForSale, setPutForSale] = useState(1);
  const [categories, setCategories] = useState([]);
  const [showCharity, setShowCharity] = useState(false);
  const [charityvalue, setcharityvalue] = useState();
  const [nftApproved, setNftApproved] = useState(false);
  const [activeSingle, setActiveSingle] = useState(true);
  const [fixedButtons, setFixedButtons] = useState(true);
  const [activeTokens, setActiveTokens] = useState(null);
  const [royaltyPercent, setRoyaltyPercent] = useState(0);
  const [charityPercent, setCharityPercent] = useState(0);
  const [charityEnable, setCharityEnable] = useState(true);
  const [productBanner, setProductBanner] = useState(null);
  const [buyNowPrice, setBuyNowPrice] = useState('disabled');
  const [selectedEndIndex, setSelectedEndIndex] = useState(7);
  const [recipientPercent, setRecipientPercent] = useState(0);
  const [showPopupImage, setShowPopupImage] = useState(false);
  const { user, Moralis, isInitialized, web3 } = useMoralis();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [buyNowAvailable, setBuyNowAvailable] = useState(false);
  const [selectedStartIndex, setSelectedStartIndex] = useState(0);
  const [activePaymentToken, setActivePaymentToken] = useState(0);
  const [featureInformation, setFeatureInformation] = useState({});
  const [selectedCharityIndex, setSelectedCharityIndex] = useState(0);
  const [searchingcharityData, setsearchingcharityData] = useState([]);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [charitySearchCursor, setCharitySearchCursor] = useState(false);
  const [pageNumber, setpageNumber] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [datastate, setdatastate] = useState(0);
  const [selectedCharityType, setSelectedCharityType] = useState('All Charities');

  const owned = location?.state?.activeImages[0];
  const totalOwned = owned?.amount;

  const getPaymentList = () => {
    if (product?.attributes?.chainId === '0x38') {
      return [
        {
          name: TokenNameMap(
            product?.attributes?.chainId,
            activeSingle ? false : true
          ),
          token: [
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            )
          ],
          value: '0',
          primary: TokenNameMap(
            product?.attributes?.chainId,
            activeSingle ? false : true
          )
        },
        {
          name: 'BUSD',
          token: ['BUSD'],
          value: '1',
          primary: 'BUSD'
        },
        {
          name:
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ) + ' Primary & BUSD',
          token: [
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'BUSD'
          ],
          primary: TokenNameMap(
            product?.attributes?.chainId,
            activeSingle ? false : true
          ),
          value: '2'
        },
        {
          name:
            'BUSD Primary & ' +
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ),
          token: [
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'BUSD'
          ],
          primary: 'BUSD',
          value: '3'
        }
      ];
    } else if (product?.attributes?.chainId === '0x1') {
      return [
        {
          name: TokenNameMap(
            product?.attributes?.chainId,
            activeSingle ? false : true
          ),
          token: [
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            )
          ],
          value: '0',
          primary: TokenNameMap(
            product?.attributes?.chainId,
            activeSingle ? false : true
          )
        },
        {
          name: 'USDT',
          token: ['USDT'],
          value: '1',
          primary: 'USDT'
        },
        {
          name:
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ) + ' Primary & USDT',
          token: [
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'USDT'
          ],
          primary: TokenNameMap(
            product?.attributes?.chainId,
            activeSingle ? false : true
          ),
          value: '2'
        },
        {
          name:
            'USDT Primary & ' +
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ),
          token: [
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'USDT'
          ],
          primary: 'USDT',
          value: '3'
        }
      ];
    } else if (product?.attributes?.chainId === '0xfa') {
      return [
        {
          name: TokenNameMap(
            product?.attributes?.chainId,
            activeSingle ? false : true
          ),
          token: [
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            )
          ],
          value: '0',
          primary: TokenNameMap(
            product?.attributes?.chainId,
            activeSingle ? false : true
          )
        },
        {
          name: 'USDC',
          token: ['USDC'],
          value: '1',
          primary: 'USDC'
        },
        {
          name:
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ) + ' Primary & USDC',
          token: [
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ),
            'USDC'
          ],
          primary: TokenNameMap(
            product?.attributes?.chainId,
            activeSingle ? false : true
          ),
          value: '2'
        },
        {
          name:
            'USDC Primary & ' +
            TokenNameMap(
              product?.attributes?.chainId,
              activeSingle ? false : true
            ),
          token: [
            TokenNameMap(
              product?.attributes?.chainId,
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

  const putForSaleChange = (value) => {
    if (Number(value) > Number(totalOwned)) {
      setPutForSale(totalOwned);
    } else {
      setPutForSale(value);
    }
  };

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
          <div className="m-t-20">
            <div className="marketplace-create-page-inner-content-calculation-row">
              <div className="marketplace-create-page-inner-content-calculation-row-left">
                <div className="marketplace-create-page-inner-content-calculation-row-left-label">
                  Marketplace fee
                </div>
              </div>
              <div className="marketplace-create-page-inner-content-calculation-row-right">
                <div className="marketplace-create-page-inner-content-calculation-row-right-label">
                  2.5 %
                </div>
              </div>
            </div>
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
                    {charityvalue}
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
                    Proceed Split({recipientPercent}%)
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
                <div className="marketplace-create-page-inner-content-calculation-row-right-label">
                  {userStr} {/* {perNFTStr} */}
                </div>
              </div>
            </div>
          </div>
        )}
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

  const getCharities = async () => {
    const givingBlockOrganizationres = await givingBlockOrganizationlist(pageNumber);
    if (givingBlockOrganizationres && givingBlockOrganizationres.length > 0) {
      setdatastate(1);
      setpageNumber(2);
      setCharitiesData(givingBlockOrganizationres);
      setsearchingcharityData(givingBlockOrganizationres);
    }
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
      activeSingle ? handleListing() : handleAuction();
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
            title: 'Approved',
            message: 'For more details view:',
            size: 'sm',
            copyText: result?.transactionHash,
            copyTextLink:
              ChainScanerLink(product?.attributes?.chainId) +
              '/tx/' +
              result?.transactionHash,
            autoClose: 'false',
            textButton: 'ok'
          })
        );
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
      let secondaryTokenAddress = zeroAddress();
      if (activeTokens?.token?.length > 1) {
        for (let i = 0; i < activeTokens.token.length; i++) {
          let token = activeTokens.token[i];
          // now only input primary token to listing payments
          if (token === activeTokens.primary) {
            listingPayments.unshift([
              TokenAddress(token, product?.attributes?.chainId),
              (prices[i] * Math.pow(10, TokenDecimal(token))).toString()
            ]);
          } else {
            listingPayments.push([
              TokenAddress(token, product?.attributes?.chainId),
              0
            ]);

            // set secondary token to be the opposite of primary token
            secondaryTokenAddress = TokenAddress(
              activeTokens.token[i],
              product?.attributes?.chainId
            );
          }
        }
      } else {
        // if only one payment method is accepted, primary token is the only payment
        listingPayments.push([
          TokenAddress(activeTokens.primary, product?.attributes?.chainId),
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
          ? charityvalue
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
            title: 'Approved',
            message: 'For more details view:',
            size: 'sm',
            copyText: result?.transactionHash,
            copyTextLink:
              ChainScanerLink(product?.attributes?.chainId) +
              '/tx/' +
              result?.transactionHash,
            autoClose: 'false',
            textButton: 'ok'
          })
        );
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

      for (let i = 0; i < activeTokens?.token?.length; i++) {
        let token = activeTokens.token[i];
        let converted = (
          prices[i] * Math.pow(10, TokenDecimal(token))
        ).toString();
        // if buy it now set chainlink payments for stable
        /* if (token[0] === 'USDT' || (token[0] === 'BUSD' && buyNowAvailable)) {
            chainlinkPayments[0] = true;
          }*/
        // if token is USDT/BUSD, allow an instant buy price otherwise set to 0
        const convertedPrice =
          (token === 'USDT' || token === 'BUSD' || token === 'USDC') &&
            buyNowAvailable
            ? (buyNowPrice * Math.pow(10, TokenDecimal(token))).toString()
            : 0;
        auctionPayments.push([
          TokenAddress(token, product?.attributes?.chainId),
          converted,
          convertedPrice
        ]);
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
          ? charityvalue
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

  const handlePrices = async (value, index) => {
    // handle user input to reflect price of primary token (only primary token is editable )
    let newPrices = [...prices];
    newPrices[index] = value; // sets new price value
    value = value ? value : ' '; // if value dne, set to 0
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
        if (index !== Number(i)) {
          let params = {
            token: activeTokens?.token[index],
            chainId: product?.attributes?.chainId,
            price: Moralis.Units.ETH(value),
            native: Number(i) === 0 ? true : false // if index is 0, then we are resolving to a native price
          };
          newPrices[i] = roundString(
            Moralis.Units.FromWei(await convertPrice(Moralis, params)),
            5
          );
        }
      }
    }
    setPrices(newPrices);
  };

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

  const handlecharityinput = (value) => {
    setcharityvalue(value);
  };

  useEffect(() => {
    setPaymentTokensSelectList(getPaymentList());
  }, [product?.attributes?.chainId, activeSingle]);

  useEffect(() => {
    let tokenRow = paymentTokensSelectList[activePaymentToken];
    setActiveTokens(tokenRow);
  }, [activePaymentToken, paymentTokensSelectList]);

  useEffect(async () => {
    if (
      product?.attributes?.image &&
      (await CheckUrlExist(product?.attributes?.image))
    ) {
      setProductBanner(product?.attributes?.image);
    }
  }, [product?.attributes?.image]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user && Moralis.provider && product?.chainId === activeNetwork) {
      checkApproved();
    }
    if (user && Moralis.provider) {
      getCharities();
      getSoldStatus();
    }
  }, [user, activeSingle, web3]);

  useEffect(() => {
    if (Number(putForSale) === 0) {
      setIsValid(false);
      return;
    }
    for (let i = 0; i < activeTokens?.token?.length; i++) {
      // not valid if any token selected has price set to 0
      setIsValid(prices[i] && prices[i] !== '0' ? true : false);
    }
  }, [prices, activeTokens, putForSale]);

  const searching = () => {
    let dataarr = [];
    let search = charityvalue.toLowerCase();
    searchingcharityData.filter((element, index) => {
      let name = element.type === "Media eye" ? element.irdRegisterName.toLowerCase() : element.name.toLowerCase()
      if (name === search) {
        let a = [element];
        setCharitiesData(a);
      }
      if (name.includes(search) === true) {
        dataarr.push(element);
      }
    });
    setdatastate(1);
    setCharitiesData(dataarr);
  };
  const charityangelview = () => {
    settoggleone(!toggleone)
  };
  const charityvaluefun = (i) => {
    const a = [...charitiesData];
    var item = a[i];
    let name = item.type == "Media eye" ? item.irdRegisterName.toLowerCase() : item.name.toLowerCase()
    setcharityvalue(name);
    setShowCharity(false);
  };

  useEffect(() => {
    if (charitiesData.length <= 0 && datastate == 1) {
      sethasMore(false);
    }
  }, [charitiesData]);

  useEffect(() => {
    if (charityvalue) {
      searching();
    }
  }, [charityvalue]);


  const fetchData = async () => {
    const givingBlockOrganizationres = await givingBlockOrganizationlist(pageNumber);
    if (givingBlockOrganizationres && givingBlockOrganizationres.length > 0) {
      const a = [...charitiesData];
      const addgivingkeyarr = a.concat(givingBlockOrganizationres);
      setpageNumber(pageNumber + 1);
      setCharitiesData(addgivingkeyarr);
      setsearchingcharityData(addgivingkeyarr);
    } else {
      sethasMore(false);
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
        <section className="mediaeye-layout-section m-t-30">
          <div className="mediaeye-layout-container">
            <div className="marketplace-create-page-inner-content">
              <div className="marketplace-create-page-inner-content-col">
                <div className="marketplace-create-page-inner-content-imgbox">
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
                  </div>
                </div>

                <div className="marketplace-create-page-inner-content-col-usernameheading">
                  <Link to={`/account/${user?.attributes?.ethAddress}`}>
                    {product?.attributes.name}
                  </Link>
                </div>

                <div className="marketplace-create-page-inner-content-tabs">
                  <DetailsCard product={product} />
                </div>
              </div>
              {/* end left part */}
              <div className="marketplace-create-page-inner-content-col">
                <div className="marketplace-create-page-inner-content-info">
                  <h2 className="marketplace-create-page-inner-content-info-title">
                    List NFT on Marketplace
                  </h2>
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <CategoriesCard
                    categories={categories}
                    addCategory={addCategory}
                    removeCategory={removeCategory}
                    text="Listing Category"
                  />
                </div>

                <div className="marketplace-create-page-inner-content-row sale-nft">
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

                    <div
                      className={
                        !activeSingle
                          ? 'mediaeyesaleformat-box active'
                          : 'mediaeyesaleformat-box'
                      }
                    >
                      {collectionType === 'ERC1155' ? (
                        <>
                          {totalOwned > 1 ? (
                            <div className="marketplace-create-page-inner-content-quantity">
                              <label
                                htmlFor="nftForSale"
                                className="marketplace-create-page-inner-content-row-title"
                              >
                                NFTs For Sale
                              </label>
                              <div className="marketplace-create-page-inner-content-quantity-content m-t-10">
                                <input
                                  id="nftForSale"
                                  type="text"
                                  max={totalOwned}
                                  pattern="[0-9]*"
                                  step={1}
                                  placeholder="Quantity"
                                  value={putForSale}
                                  onChange={(e) =>
                                    putForSaleChange(
                                      allowOnlyNumber(e.target.value, false)
                                    )
                                  }
                                  onBlur={(e) => {
                                    if (!totalOwned) {
                                      setPutForSale(1);
                                    }
                                  }}
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
                          ) : null}
                        </>
                      ) : (
                        <div
                          className="mediaeyesaleformat-box-inner"
                          onClick={() => {
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

                  {/* <div>
                    {totalOwned > 1 ? (
                      <div className="marketplace-create-page-inner-content-quantity">
                        <h2 className="marketplace-create-page-inner-content-row-title">
                          NFTs For Sale
                        </h2>
                        <div className="marketplace-create-page-inner-content-quantity-content m-t-10">
                          <input
                            type="number"
                            max={totalOwned}
                            pattern="[0-9]*"
                            step={1}
                            placeholder="Quantity"
                            value={putForSale}
                            onChange={(e) => putForSaleChange(e)}
                            onWheel={(e) => e.target.blur()}
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
                    ) : null}
                  </div> */}
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <h2 className="marketplace-create-page-inner-content-row-title mediaeyeinfo">
                    Select Payment Tokens and{' '}
                    {activeSingle ? 'Set Sales Price' : 'Minimum Bid'}*{' '}
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
                  </div>
                </div>

                <div className="marketplace-create-page-inner-content-row">
                  <div className="marketplace-create-page-inner-content-calculation">
                    <div className="marketplace-create-page-inner-content-calculation-head">
                      Checkout
                    </div>
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
                              type="text"
                              min="0"
                              max={ROYALTY_MAX}
                              value={royaltyPercent}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                let value = allowOnlyNumber(e.target.value);
                                if (value === '' || re.test(value)) {
                                  if (e.target.value > ROYALTY_MAX) {
                                    value = ROYALTY_MAX;
                                  }
                                  setRoyaltyPercent(value);
                                }
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
                              type="text"
                              placeholder="0"
                              max="100"
                              // pattern="[0-9]*"
                              step={1}
                              min="1"
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
                              value={charityvalue}
                              onFocus={() => {
                                if (charityEnable) {
                                  setShowCharity(true);
                                }
                              }}
                              onClick={() => {
                                setSelectedCharityType('All Charities');
                                charityangelview()
                              }}
                              // onBlur={(e) => {
                              //   if (!charitySearchCursor) {
                              //     handlecharityinput(e.target.value)
                              //     // setShowCharity(false);
                              //   }
                              // }}
                              onChange={(e) => { handlecharityinput(e.target.value); }}
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
                                {/* <div
                                  onClick={() => {
                                    setSelectedCharityType('All Charities');
                                    charityangelview()
                                  }}
                                  className={`mediaeyeCharitySearch-dropdown-header-col ${selectedCharityType === 'All Charities'
                                    ? 'active'
                                    : ''
                                    }`}
                                >
                                  All Charities
                                </div>
                                <div className='select-arrow'>
                                  <Angle side={toggleone ? 'up' : 'down'} />
                                </div> */}
                                {product?.attributes?.chainId === '0x1' ? (
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
                              {toggleone ?
                                <div className="mediaeyefancyScroll">
                                  <div className="mediaeyeCharitySearch-dropdown-body">
                                    {charitiesData?.length > 0 ? (
                                      <>
                                        <InfiniteScroll
                                          dataLength={charitiesData.length}
                                          next={fetchData()}
                                          hasMore={hasMore}
                                          loader={<h4>Loading...</h4>}
                                        >
                                          {charitiesData.map((charity, i) => (
                                            <div
                                              onClick={() => {
                                                charityvaluefun(i);
                                                setSelectedCharityIndex(i);
                                              }}
                                              className={`mediaeyeCharitySearch-dropdown-list ${selectedCharityIndex === i
                                                ? 'active'
                                                : ''
                                                }`}
                                            >
                                              {charity?.type == "Media eye" ? charity?.irdRegisterName : charity?.name}

                                            </div>
                                          ))}
                                        </InfiniteScroll>
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
                                : null}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {displayPriceInformation()}
                  </div>
                </div>
                <div className="m-b-30">
                  <div className="mediaeyeFeatureNft">
                    <FeatureYourNFT
                      setFeatureInformation={setFeatureInformation}
                      featureInformation={featureInformation}
                      featureType={FEATURETYPE.Auction}
                      isFeatured={false}
                      content={{
                        attributes: {
                          name: product[0]?.attributes?.nft?.attributes?.name,
                          image: product[0]?.attributes?.nft?.attributes?.image,
                          specific: activeSingle ? 'Fixed Price' : 'Auction'
                        }
                      }}
                    />
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
                  {!nftApproved ? 'Approve NFT' : 'List on Marketplace'}
                </button>
              ) : (
                <button type="button" className="btn btn-lg btn-disable">
                  {!nftApproved ? 'Approve NFT' : 'List on Marketplace'}
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
