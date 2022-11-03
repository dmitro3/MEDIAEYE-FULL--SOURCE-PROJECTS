import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import './FeatureSpotlight.scss';
import mediaeyespotlight from '../../../assets/img/mediaeyespotlight.png';
import { roundString } from '../../../blockchain/functions/Utils';
import { TokenAddress } from '../../../blockchain/functions/Addresses';
import {
  getFeaturePrice,
  payFeature
} from '../../../blockchain/functions/Feature';
import {
  ContractAddress,
  ZERO_ADDRESS
} from '../../../blockchain/functions/Addresses';
import {
  checkAllowance,
  requestTokenApproval
} from '../../../blockchain/functions/ApproveToken';
import { useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import boxShadow from '../../../assets/img/bg/collection-featured.png';

export default function FeatureSpotlight(props) {
  const {
    featureInformation,
    setFeatureInformation,
    featureType,
    tokenAddressList,
    tokenIdList,
    isFeatured,
    type,
    name,
    activeDays
  } = props;
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(true);
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const { user, Moralis } = useMoralis();
  const [activeToken, setActiveToken] = useState('');
  const [duration, setDuration] = useState('3');
  const [startDate, setStartDate] = useState(new Date());
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [featurePriceUSD, setFeaturePriceUSD] = useState(0);
  const [featurePriceToken, setFeaturePriceToken] = useState(0);
  const [featurePriceEYE, setFeaturePriceEYE] = useState(0);

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

  return (
    <div className="featureSpotlight">
      {toggleFeatureYourNFT ? (
        <div className="featureSpotlight-block">
          <img
            className="featureSpotlight-block-img"
            src={boxShadow}
            alt="boxShadow"
          />
        </div>
      ) : null}
      <div className="featureSpotlight-demo">
        <div className="featureSpotlight-demo-header">
          <img src={mediaeyespotlight} alt="mediaeyespotlight" />
        </div>
        <div className="featureSpotlight-demo-head">
          <Switch
            id="toggleSpotlight"
            className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeFeatureNft-switch  ${toggleFeatureYourNFT ? 'active' : ''}`}

            checkedIcon={false}
            uncheckedIcon={false}
            onChange={() => {
              setToggleFeatureYourNFT(!toggleFeatureYourNFT);
            }}
            checked={toggleFeatureYourNFT}
            height={21}
            width={50}
          />
          <label htmlFor="toggleSpotlight" className="featureSpotlight-demo-head-title">
            {type ? type : 'Spotlight '}
          </label>
          <span className="text-grayShade">($ 30/day)</span>
        </div>
        <div className="featureSpotlight-demo-content m-t-30">
          <div className="featureSpotlight-demo-content-left">
            <span className="text-grayShade">
              {toggleFeatureYourNFT ? `Feature ${name}:` : null}
            </span>
            <span className="text-grayShade">Create {name}:</span>
            <span className="text-grayShade">Duration</span>
            <span>Total:</span>
          </div>
          <div className="featureSpotlight-demo-content-right">
            <span className="text-grayShade">
              {toggleFeatureYourNFT ? '$ 210' : null}
            </span>
            <span className="text-grayShade">$ 500</span>
            <span className="text-grayShade">{activeDays ? activeDays : "7 Days"}</span>
            <span>$ 710</span>
          </div>
        </div>
        <div>
          <div className="mediaeyeform-group m-t-50">
            <label className="mediaeyeform-label">Payment Method</label>
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
                            getDisplayPrice(key.name) * duration
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
                        <div className="mediaeyetokenpayment-box-content-des text-white">
                          {roundString(displayPrice * duration, 4)}
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
          </div>
        </div>
      </div>
    </div>
  );
}
