import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from 'react-switch';
import SelectSearch from 'react-select-search';
import { useMoralis } from 'react-moralis';
import { roundString } from '../../../blockchain/functions/Utils';
import { TokenAddress } from '../../../blockchain/functions/Addresses';
import 'react-datepicker/dist/react-datepicker.css';
import { toggleGeneralPopup } from '../../../store/app/appSlice';

import {
  getFeaturePrice,
  payFeature
} from '../../../blockchain/functions/Feature';
import {
  checkAllowance,
  requestTokenApproval
} from '../../../blockchain/functions/ApproveToken';
import {
  ContractAddress,
  ZERO_ADDRESS
} from '../../../blockchain/functions/Addresses';
import { display } from '@mui/system';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import mediaeyespotlight from '../../../assets/img/mediaeyespotlight.png';
import { InfoCircle } from '../../Icons';
import ReactTooltip from 'react-tooltip';
import { ChainScanerLink } from '../../../blockchain/functions/ChangeChain/ChainNames';

export const FeatureYourNFT = (props) => {
  const {
    featureInformation,
    setFeatureInformation,
    featureType,
    tokenAddressList,
    tokenIdList,
    isFeatured,
    type
  } = props;
  const { user, Moralis } = useMoralis();
  const dispatch = useDispatch();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [featurePriceUSD, setFeaturePriceUSD] = useState(0);
  const [featurePriceToken, setFeaturePriceToken] = useState(0);
  const [featurePriceEYE, setFeaturePriceEYE] = useState(0);
  // const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [activeToken, setActiveToken] = useState('');
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [durationDays, setDurationDays] = useState(0);
  const [count, setCount] = useState();

  useEffect(() => {
    onChangeNFTDate([startDate, endDate]);
  }, [startDate, endDate]);
  const onChangeNFTDate = (dates) => {
    const [start, end] = dates;
    if (start > end) {
      setDurationDays(0)
      setCount("Enter Valid Date");
    }
    else
      if (end && start) {
        const diffInMs = Math.abs(end - start);
        setDurationDays(Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1);
        setCount("");
      }
  }

  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(true);
  useEffect(() => {
    const getPrice = async () => {
      const price = await getFeaturePrice(Moralis, activeNetwork, 1);
      setFeaturePriceUSD(Moralis.Units.FromWei(price.USDTotalPrice));
      setFeaturePriceToken(Moralis.Units.FromWei(price.totalPrice));
      setFeaturePriceEYE(Moralis.Units.FromWei(price.eyeTotalPrice));
    };
    getPrice();
  }, [activeNetwork]);

  const onFeaturePay = async () => {
    if (activeToken) {
      const price = await getFeaturePrice(Moralis, activeNetwork, durationDays);
      let isApproved = await checkAllowance(
        Moralis,
        activeToken,
        user.attributes.ethAddress,
        price.totalPrice,
        ContractAddress('FEE', activeNetwork)
      );

      if (!isApproved) {
        isApproved = await requestTokenApproval(
          Moralis,
          activeToken,
          ContractAddress('FEE', activeNetwork)
        );
      }
      if (isApproved) {
        const today = new Date();
        let startTime =
          today.toDateString() === startDate.toDateString()
            ? 0
            : startDate.getTime() / 1000;

        const transactionStatus = await payFeature(
          Moralis,
          activeToken,
          tokenAddressList,
          tokenIdList,
          startTime,
          durationDays,
          featureType,
          ZERO_ADDRESS,
          0,
          0,
          price,
          user.attributes.ethAddress
        );

        if (transactionStatus) {
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Transaction Successful',
              message:
                'Please allow several minutes to display spotlight NFT/collection in your account.',
              size: 'sm',
              copyText: transactionStatus?.transactionHash,
              copyTextLink:
                ChainScanerLink(activeNetwork) +
                '/tx/' +
                transactionStatus?.transactionHash,
              textButton: 'OK',
              autoClose: 'false'
            })
          );
        }

        return transactionStatus;
      }
    }
  };

  useEffect(() => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      setActiveToken('BNB');
      setFeatureInformation({
        ...featureInformation,
        paymentMethod: TokenAddress('BNB', activeNetwork),
        price: Moralis.Units.ETH(featurePriceToken)
      });
      let array = [
        {
          name: 'BNB',
          img: '/img/token/34/BNB.png',
          des: 'Binance',
          price: '$ 120',
          convert: '0.25'
        },
        {
          name: 'BUSD',
          img: '/img/token/34/BUSD.png',
          des: 'BUSD',
          price: '$ 150',
          convert: '125'
        },
        {
          name: 'EYE',
          img: '/img/token/34/EYE.png',
          des: 'MEDIA EYE',
          price: '$ 106.25',
          offer: '15%',
          convert: '14414.66'
        }
      ];
      setPaymentTokensList(array);
    } else if (activeNetwork === 'FTM') {
      let array = [
        {
          name: 'FTM',
          img: '/img/token/34/FTM.png',
          des: 'Fantom',
          price: '$ 106.25',
          convert: '125'
        },
        {
          name: 'USDC',
          img: '/img/token/34/USDC.png',
          des: 'USD Coin',
          price: '$ 106.25',
          convert: '125'
        },
        {
          name: 'eYe',
          img: '/img/token/34/EYE.png',
          des: 'MEDIA EYE',
          price: '$ 106.25',
          convert: '14414.66'
        }
      ];
      setPaymentTokensList(array);
      setActiveToken('FTM');
      setFeatureInformation({
        ...featureInformation,
        paymentMethod: TokenAddress('FTM', activeNetwork),
        price: Moralis.Units.ETH(featurePriceToken)
      });
    } else if (activeNetwork === 'ETH') {
      let array = [
        {
          name: 'ETH',
          img: '/img/token/34/ETH.png',
          des: 'Ethereum',
          price: '$ 106.25',
          convert: '0.25'
        },
        {
          name: 'USDT',
          img: '/img/token/34/USDT.png',
          des: 'Tether',
          price: '$ 120,25',
          convert: '125'
        },
        {
          name: 'EYE',
          img: '/img/token/34/EYE.png',
          des: 'MEDIA EYE',
          price: '$ 106.25',
          convert: '14414.66'
        }
      ];
      setPaymentTokensList(array);
      setActiveToken('ETH');
      setFeatureInformation({
        ...featureInformation,
        paymentMethod: TokenAddress('ETH', activeNetwork),
        price: Moralis.Units.ETH(featurePriceToken)
      });
    }
  }, [activeNetwork]);

  const getDisplayPrice = (token) => {
    let displayPrice;
    if (['bnb', 'ftm', 'eth'].includes(token.toLowerCase())) {
      displayPrice = featurePriceToken;
    } else if (token.toLowerCase() === 'eye') {
      displayPrice = featurePriceEYE;
    } else {
      displayPrice = featurePriceUSD;
    }
    return displayPrice;
  };

  const daysFilterOption = [
    {
      name: '3',
      value: 3
    },
    {
      name: '5',
      value: 5
    },
    {
      name: '7',
      value: 7
    }
  ];

  const handleDates = (date, tag) => {
    if (tag === 'start') {
      setStartDate(date);
    }
    else {
      if (startDate) {
        if (date > startDate) {
          setEndDate(date);
        }
        else {
          setEndDate(null)
        }
      }

    }

  }

  return (
    <>
      <div className="mediaeyeFeatureNft-detail">
        <div className="mediaeyeFeatureNft-detail-row">
          <div className="mediaeyeFeatureNft-header">
            <div>
              <img src={mediaeyespotlight} alt="mediaeyespotlight" />
            </div>
            <div className="mediaeyeFeatureNft-header-right">
              <Switch
                id="toggleSpotlight"
                className={`mediaeyeswitch-btn mediaeyeswitch-right ${toggleFeatureYourNFT ? 'active' : ''
                  }`}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={() => {
                  setToggleFeatureYourNFT(!toggleFeatureYourNFT);
                }}
                checked={toggleFeatureYourNFT}
                height={21}
                width={50}
              />

              <label htmlFor="toggleSpotlight" className="mediaeyeFeatureNft-header-title m-l-10">
                {type ? type : 'Spotlight My NFT'}
              </label>
              <div className="mediaeyeinfo">
                <span
                  className="mediaeyeinfo-sign"
                  data-class="mediaeyetooltip"
                  data-tip="Feature your content across the platform and increase its awareness."
                >
                  <InfoCircle type="outline" />
                </span>
                <ReactTooltip />
              </div>
            </div>
            {toggleFeatureYourNFT ? (
              <>
                <div className="mediaeyeFeatureNft-detail-row-col">
                  <div className="mediaeyeFeatureNft-detail-row-col-inner">
                    <div className="mediaeyeFeatureNft-detail-row-col-label">
                      Price per day
                    </div>
                    <div className="mediaeyeFeatureNft-detail-row-col-value">
                      ${featurePriceUSD}
                    </div>
                  </div>
                </div>
                <div className="mediaeyeFeatureNft-detail-row-col">
                  <div className="mediaeyeFeatureNft-detail-row-col-inner">
                    <label className="mediaeyeFeatureNft-detail-row-col-label" htmlFor="startDate">
                      Start Date
                    </label>
                    <div className="mediaeyeFeatureNft-detail-row-col-value mediaeye-datepicker">
                      <DatePicker
                        id="startDate"
                        className="mediaeyeform-input"
                        minDate={new Date()}
                        withPortal
                        selected={startDate}
                        shouldCloseOnSelect={true}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                  </div>
                </div>
                <div className="mediaeyeFeatureNft-detail-row-col">
                  <div className="mediaeyeFeatureNft-detail-row-col-inner">
                    <label className="mediaeyeFeatureNft-detail-row-col-label" htmlFor="endDate">
                      End Date
                    </label>
                    <div className="mediaeyeFeatureNft-detail-row-col-value mediaeye-datepicker">
                      <DatePicker
                        id="endDate"
                        className="mediaeyeform-input"
                        minDate={new Date()}
                        withPortal
                        selected={endDate}
                        shouldCloseOnSelect={true}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                  </div>
                </div>

                <div className="mediaeyeFeatureNft-detail-row-col">
                  <div className="mediaeyeFeatureNft-detail-row-col-inner">
                    <div className="mediaeyeFeatureNft-detail-row-col-label">
                      Duration days :
                    </div>
                    <div className="mediaeyeFeatureNft-detail-row-col-value">
                      {/* <SelectSearch
                          className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow mediaeyeFeatureNft-detail-row-col-value-select dark-style"
                          size="sm"
                          options={daysFilterOption}
                          value={duration}
                          onChange={(e) => {
                            setDuration(e.target.value);
                            setFeatureInformation({
                              ...featureInformation,
                              numDays: e.target.value
                            });
                          }}
                        /> */}
                      <span> {durationDays}</span>
                      {/* <span className='text-grayShade'>{count}</span> */}
                    </div>
                  </div>
                </div>

                <div className="mediaeyeFeatureNft-detail-row-col">
                  <div className="mediaeyeFeatureNft-detail-row-col-inner">
                    <div className="mediaeyeFeatureNft-detail-row-col-label">
                      Total price :
                    </div>
                    <div className="mediaeyeFeatureNft-detail-row-col-value">
                      ${featurePriceUSD * durationDays}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {toggleFeatureYourNFT ? (
        <div className="mediaeyeFeatureNft-token">
          <div className="mediaeyeFeatureNft-token-heading">Payment Token</div>

          <div
            className="mediaeyeFeatureNft-token-row mediaeyetokenpayment"
            size={paymentTokensList?.length}
          >
            {paymentTokensList.map((key, i) => {
              const displayPrice = getDisplayPrice(key.name);

              return (
                <div
                  className={
                    activeToken === key.name
                      ? 'active mediaeyetokenpayment-box'
                      : 'mediaeyetokenpayment-box'
                  }
                >
                  <div
                    className="mediaeyetokenpayment-box-inner"
                    data-offer={key.offer ? true : false}
                    onClick={() => {
                      setActiveToken(key.name);
                      setFeatureInformation({
                        ...featureInformation,
                        paymentMethod: TokenAddress(key.name, activeNetwork),
                        price: Moralis.Units.ETH(
                          getDisplayPrice(key.name) * durationDays
                        )
                      });
                    }}
                  >
                    <div className="mediaeyetokenpayment-box-icon">
                      <img src={key.img} alt={key.name} />
                    </div>
                    <div className="mediaeyetokenpayment-box-content">
                      <div className="mediaeyetokenpayment-box-content-name small-14">
                        {key.name}
                      </div>
                      <div className="mediaeyetokenpayment-box-content-des">
                        {roundString(displayPrice * durationDays, 4)}
                      </div>
                      {key.offer ? (
                        <div className="mediaeyetokenpayment-box-content-offer">
                          {key.offer} OFF
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {isFeatured ? (
            <div className="mediaeyeFeatureNft-token-row text-left m-b-10">
              <button
                type="button"
                className={
                  isFeatured
                    ? 'btn btn-gaming btn-sm'
                    : 'btn btn-sm btn-disable'
                }
                onClick={onFeaturePay}
              >
                Pay
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
export default FeatureYourNFT;
