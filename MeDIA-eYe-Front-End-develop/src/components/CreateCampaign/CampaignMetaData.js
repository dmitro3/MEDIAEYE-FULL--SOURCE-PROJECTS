import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SelectSearch from 'react-select-search';
import { useMoralis } from 'react-moralis';
import { EventsJson } from '../../utils/JsonData';
import { AirdropJson } from '../../utils/JsonData';
import { roundString } from '../../blockchain/functions/Utils';
import { TokenAddress } from '../../blockchain/functions/Addresses';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FeatureSpotlight from '../Spotlight/FeatureSpotlight/FeatureSpotlight';
import boxShadow from '../../assets/img/bg/collection-featured.png';

const CampaignMetaData = (props) => {
  const { featureInformation, setFeatureInformation } = props;
  const [activeTC, setActiveTc] = useState(7);
  const [activeToken, setActiveToken] = useState('');
  const eventData = EventsJson();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [featurePriceUSD, setFeaturePriceUSD] = useState(0);
  const [featurePriceEYE, setFeaturePriceEYE] = useState(0);
  const featured = AirdropJson();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState('3');
  const [featurePriceToken, setFeaturePriceToken] = useState(0);
  const { user, Moralis } = useMoralis();

  const daysFilterOption = [
    {
      name: '7 day',
      value: 7
    },
    {
      name: '14 days',
      value: 14
    },
    {
      name: '21 days',
      value: 21
    }
  ];
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
    <div className="mediaeye-CreateCampaign-wrapper-card bottom">
      <div className="mediaeye-CreateCampaign-wrapper-box-left-header">
        <h2>Campaign Terms and Conditions</h2>
      </div>
      <div className="mediaeye-CreateCampaign-wrapper-box-left-upper">
        <div className="mediaeyeform-group leftone">
          <label className="mediaeyeform-label" htmlFor="startDate">Start Date</label>
          <div className="mediaeyeform-group-input mediaeyeFeatureNft-detail-row-col-value mediaeye-datepicker">
            <DatePicker
              id="startDate"
              minDate={new Date()}
              className="mediaeyeform-input mediaeye-datepicker"
              withPortal
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        {/* <div className="mediaeyeform-group rightone">
          <label className="mediaeyeform-label">Duration</label>
          <div className="mediaeyeform-group-input">
            <div className="">
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                size="lg"
                options={daysFilterOption}
                value={activeTC}
                onChange={(opt) => setActiveTc(opt)}
              />
            </div>
          </div>
        </div> */}
      </div>
      <div className="mediaeye-CreateCampaign-wrapper-box-left-lower">
        <div className="mediaeyeform-group m-t-10">
          <label className="mediaeyeform-label" htmlFor="endDate">End Date</label>
          <div className="mediaeyeform-group-input mediaeyeFeatureNft-detail-row-col-value mediaeye-datepicker">
            <input
              id="endDate"
              className="mediaeyeform-input mediaeye-datepicker"
              disabled="true"
              value="April 29, 2022 10:38 AM"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignMetaData;
