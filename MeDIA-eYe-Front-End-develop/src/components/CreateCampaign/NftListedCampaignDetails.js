import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { SearchIcon, Fixed, InfoCircle } from '../Icons/';

import { useDispatch } from 'react-redux';
import PopupImage from '../ProductCard/ProductPopup/Popup';
import {
  queryCharities,
  querySoldStatus,
  queryRoyalty
} from '../../blockchain/functions/Marketplace';
import { useMoralis } from 'react-moralis';
import { checkNFTApproval } from '../../blockchain/functions/ApproveToken';
import SelectSearch from 'react-select-search';
import ReactTooltip from 'react-tooltip';

import charityIcon from '../../assets/img/charity.png';
import { CheckUrlExist } from '../../blockchain/functions/Utils';

const NftListedCampaignDetails = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  //const product = location?.state?.activeImages;
  const owned = location?.state?.activeImages[0];
  const product = props.product;
  //   const totalOwned = owned?.amount;
  const [putForSale, setPutForSale] = useState(1);
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
  const [prices, setPrices] = useState([0, 0]);

  const [charityEnable, setCharityEnable] = useState(false);
  const [activeTokens, setActiveTokens] = useState(() => {
    // true for active,false for inactive
    if (product?.attributes?.chainId === '0x38') {
      setCharityEnable(false);
      return [
        { token: 'BNB', active: true },
        { token: 'BUSD', active: false }
      ];
    } else if (product?.attributes?.chainId === '0x1') {
      setCharityEnable(true);
      return [
        { token: 'ETH', active: true },
        { token: 'USDT', active: false }
      ];
    } else if (product?.attributes?.chainId === '0xfa') {
      setCharityEnable(false);
      return [
        { token: 'FTM', active: true },
        { token: 'USDC', active: false }
      ];
    }
  });
  //   const [primaryToken, setPrimaryToken] = useState(activeTokens[0].token);
  const [charities, setCharities] = useState([]);
  const [charityPercent, setCharityPercent] = useState(0);
  const [charitySearchCursor, setCharitySearchCursor] = useState(false);
  const [selectedCharityType, setSelectedCharityType] =
    useState('All Charities');
  const [selectedCharityIndex, setSelectedCharityIndex] = useState(0);
  const [recipientPercent, setRecipientPercent] = useState(0);
  const [royaltyPercent, setRoyaltyPercent] = useState(2.5);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
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

  const togglePopupImage = () => {
    setShowPopupImage(!showPopupImage);
  };
  const toggleCharityList = () => {
    setShowCharity(!showCharity);
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

  //   const makePrimary = (token) => {
  //     setPrimaryToken(token);
  //   };

  const [productBanner, setProductBanner] = useState(null);

  useEffect(async () => {
    if (
      product?.attributes?.image &&
      (await CheckUrlExist(product?.attributes?.image))
    ) {
      setProductBanner(product?.attributes?.image);
    }
  }, [product?.attributes?.image]);
  return (
    <>
      <PopupImage
        showPopup={showPopupImage}
        togglePopup={togglePopupImage}
        img={product?.attributes?.image}
      />
      <ReactTooltip className="mediaeyetooltip" />

      <div className="mediaeye-CreateCampaign-wrapper-card-details-content">
        <div className="mediaeye-CreateCampaign-wrapper-card-details-content-col">
          <div className="mediaeye-CreateCampaign-wrapper-card-details-content-row sale-nft">
            <div>
              <h2 className="mediaeye-CreateCampaign-wrapper-card-details-content-row-title">
                Sale Format
              </h2>
              <div
                className="mediaeye-CreateCampaign-wrapper-card-details-content-blockchain mediaeyesaleformat"
                size="4"
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
                  //   onClick={() => {
                  //     switchWrapped(false);
                  //     setActiveSingle(true);
                  //   }}
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
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-quantity">
                    <h2 className="mediaeye-CreateCampaign-wrapper-card-details-content-row-title">
                      NFTs For Sale
                    </h2>
                    <form
                      className="mediaeye-CreateCampaign-wrapper-card-details-content-quantity-content m-t-10"
                      id="Quantity"
                    >
                      <input
                        type="number"
                        pattern="[0-9]*"
                        step={1}
                        placeholder="Quantity"
                        className="mediaeye-CreateCampaign-wrapper-card-details-content-quantity-content-input"
                        aria-aria-labelledby="Quantity"
                      />
                      <div className="mediaeye-CreateCampaign-wrapper-card-details-content-quantity-content-max">
                        Max
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mediaeye-CreateCampaign-wrapper-card-details-content-row">
            <h2 className="mediaeye-CreateCampaign-wrapper-card-details-content-row-title mediaeyeinfo">
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

            <div className="mediaeye-CreateCampaign-wrapper-card-details-content-paymentmethod">
              <div
                className="mediaeye-paymentmethod"
                size={activeTokens?.length}
              >
                <div className="mediaeye-paymentmethod-inner">
                  <div
                    data-primary="true"
                    className="mediaeye-paymentmethod-box "
                  >
                    <div className="mediaeye-paymentmethod-box-inner">
                      <div className="mediaeye-paymentmethod-box-btn">
                        <div className="mediaeye-paymentmethod-box-icon">
                          <img src="/img/token/34/BNB.png" alt="token" />
                        </div>
                        <div className="mediaeye-paymentmethod-box-content">
                          <div className="mediaeye-paymentmethod-box-content-name">
                            BNB
                          </div>
                        </div>
                      </div>
                      <label className="mediaeye-paymentmethod-box-price">
                        <input
                          className="mediaeye-paymentmethod-box-price-input"
                          type="number"
                          placeholder="Enter price"
                        />
                      </label>
                    </div>
                  </div>
                  <>
                    <div
                      data-primary="true"
                      className="mediaeye-paymentmethod-box active"
                    >
                      <div className="mediaeye-paymentmethod-box-inner">
                        <div className="mediaeye-paymentmethod-box-btn btn-gaming">
                          <div className="mediaeye-paymentmethod-box-icon">
                            <img src="/img/token/34/WBNB.png" alt="token" />
                          </div>
                          <div className="mediaeye-paymentmethod-box-content">
                            <div className="mediaeye-paymentmethod-box-content-name">
                              WBNB
                            </div>
                          </div>
                        </div>

                        <label className="mediaeye-paymentmethod-box-price">
                          <input
                            className="mediaeye-paymentmethod-box-price-input"
                            type="number"
                            placeholder="Enter price"
                          />
                        </label>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>

          <div className="mediaeye-CreateCampaign-wrapper-card-details-content-row">
            <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation">
              <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-head">
                Checkout
              </div>
              {!activeSingle ? (
                <>
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left">
                      <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left-label">
                        Starting Date{' '}
                      </div>
                    </div>
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right">
                      <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group">
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

                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left">
                      <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left-label">
                        Expiration Date{' '}
                      </div>
                    </div>
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right">
                      <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group">
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
                <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row">
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left-label mediaeyeinfo">
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
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group">
                      <input
                        type="text"
                        // pattern="[0-9]*"
                        min="0"
                        max={ROYALTY_MAX}
                        value={royaltyPercent}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          let value = e.target.value;
                          if (value === '' || re.test(value)) {
                            if (e.target.value > ROYALTY_MAX)
                              value = ROYALTY_MAX;
                            else value = e.target.value;
                            setRoyaltyPercent(value);
                          }
                        }}
                        className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-input"
                      />
                      <div
                        className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-max"
                        onClick={() => setRoyaltyPercent(ROYALTY_MAX)}
                      >
                        MAX &nbsp; %
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row">
                <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left">
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left-label mediaeyeinfo">
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
                <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right">
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-col">
                      <input
                        type="text"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        placeholder="Recipient Address"
                        className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-input"
                      />
                    </div>
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-col mw80">
                      <input
                        className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-input"
                        type="text"
                        placeholder="0"
                        max="100"
                        // pattern="[0-9]*"
                        step={1}
                        min="1"
                        value={recipientPercent}
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          let value = e.target.value;
                          if (value === '' || re.test(value)) {
                            value = value > 100 ? 100 : value;
                            e.target.value = value;
                            setRecipientPercent(value);
                          }
                        }}
                      />
                      <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-text">
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row ${!charityEnable
                  ? ' mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-disable'
                  : ''
                  } `}
              >
                <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left">
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left-label mediaeyeinfo">
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

                <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right">
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group mediaeyeCharitySearch">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-col">
                      <input
                        className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-input"
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
                      <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-icon">
                        <SearchIcon type="white" />
                      </div>
                    </div>
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-col mw80">
                      <input
                        type="number"
                        placeholder="0"
                        pattern="[0-9]*"
                        step={1}
                        min="1"
                        className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-input"
                        max={CHARITY_MAX}
                        value={charityPercent}
                        onChange={(e) => {
                          if (charityEnable) {
                            let value = e.target.value;
                            value = value > CHARITY_MAX ? CHARITY_MAX : value;
                            e.target.value = value;
                            setCharityPercent(value);
                          }
                        }}
                      />
                      <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-group-text">
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
                          <div
                            onClick={() => {
                              setShowCharity(false);
                            }}
                            className="mediaeyeCharitySearch-dropdown-list"
                          >
                            No Charity
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="m-t-20">
                <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row">
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left-label">
                      Marketplace fee
                    </div>
                  </div>
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-label">
                      2.5%
                    </div>
                  </div>
                </div>

                <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row">
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left-label">
                      Proceed Split(40%)
                    </div>
                  </div>
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-label">
                      0.5 BUSD
                    </div>
                  </div>
                </div>

                <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row">
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-left-label">
                      Net Proceeds
                    </div>
                  </div>
                  <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right">
                    <div className="mediaeye-CreateCampaign-wrapper-card-details-content-calculation-row-right-label">
                      0.5 BUSD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftListedCampaignDetails;
