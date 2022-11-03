import React, { useState, useEffect } from 'react';
import './Popup.scss';
import CloseIcon from '../../Icons/CloseIcon';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeFeaturePopup,
  toggleExtendPopup
} from '../../../store/app/appSlice';
import moment from 'moment';
import FeatureYourNFT from '../../PutOn/PutOnReusables/FeatureYourNFT';
import FEATURETYPE from '../../../utils/featureConstants';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import CollectionCard from '../../ContentMarketplace/CollectionCard/CollectionCard';
import mediaeyespotlight from '../../../assets/img/mediaeyespotlight.png';

const Popup = (props) => {
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const showPopup = useSelector((state) => state.app.showFeaturePopup);
  const content = useSelector((state) => state.app.featurePopupContent);
  const type = useSelector((state) => state.app.featurePopupType);
  const nft = useSelector((state) => state.app.featurePopupNFT);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('7');
  const [activeToken, setActiveToken] = useState(null);
  const [datePickerInput, setDatePickerInput] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateState, setDateState] = useState(new Date());
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [showdropdown, setShowdropdown] = useState(false);
  const [selectDay, setSelectDay] = useState(3);
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [check, setCheck] = useState(false);
  const [featureInformation, setFeatureInformation] = useState({});
  const focusActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };
  const datePicker = () => {
    setDatePickerInput(!datePickerInput);
  };

  const changeDate = (e) => {
    setDateState(e);
    setDate();
  };

  const setDate = () => {
    setOpenCalendar(!openCalendar);
  };

  const setDays = (props) => {
    setSelectDay(props);
    toggleDropdown();
  };
  const toggleDropdown = () => {
    setShowdropdown(!showdropdown);
  };

  useEffect(() => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      setActiveToken('BNB');
      let array = [
        {
          name: 'BNB',
          img: '/img/token/34/BNB.png',
          des: 'Binance',
          price: '$ 120'
        },
        {
          name: 'BUSD',
          img: '/img/token/34/BUSD.png',
          des: 'BUSD',
          price: '$ 150'
        },
        {
          name: 'eYe',
          img: '/img/token/34/EYE.png',
          des: 'MEDIA EYE',
          price: '$ 106,25'
        }
      ];
      setPaymentTokensList(array);
    } else if (activeNetwork === 'FTM') {
      let array = [
        {
          name: 'FTM',
          img: '/img/token/34/FTM.png'
        },
        {
          name: 'USDC',
          img: '/img/token/34/USDC.png'
        }
      ];
      setPaymentTokensList(array);
      setActiveToken('FTM');
    } else if (activeNetwork === 'ETH') {
      let array = [
        {
          name: 'ETH',
          img: '/img/token/34/ETH.png',
          des: 'Ethereum'
        },
        {
          name: 'USDT',
          img: '/img/token/34/USDT.png',
          des: 'Tether'
        },
        {
          name: 'eYe',
          img: '/img/token/34/EYE.png',
          des: 'MEDIA EYE'
        }
      ];
      setPaymentTokensList(array);
      setActiveToken('ETH');
    }
  }, [activeNetwork]);

  const getFeatureType = (type) => {
    switch (type) {
      case 'nft':
        return FEATURETYPE.SingleNFT;
      case 'collection':
        return FEATURETYPE.Collection721;
      case 'event':
        return FEATURETYPE.Event;
      case 'airdrop':
        return FEATURETYPE.Airdrop;
      default:
        return 0;
    }
  };

  return (
    <React.Fragment>
      {showPopup ? (
        <div className={showPopup ? 'mediaeye-popup active' : 'mediaeye-popup'}>
          <div className="mediaeye-popup-wrapper feature-popup scrolled">
            <div className="mediaeye-popup-content feature-popup-content">
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => dispatch(closeFeaturePopup())}
                >
                  <CloseIcon />
                </div>

                <div className="extend-popup-content-product" type={type}>
                  {type === 'Spotlight My NFT' ? (
                    <ExploreBlock from={'featurePopup'} product={nft} key={1} />
                  ) : type === 'Spotlight My Collection' ? (
                    <CollectionCard
                      from={'featurePopup'}
                      collection={content}
                      key={1}
                    />
                  ) : type === 'Feature Your Campaign' ? (
                    <ExploreBlock product={nft} key={1} />
                  ) : type === 'Feature Your Airdrop' ? (
                    <ExploreBlock product={nft} key={1} />
                  ) : null}
                </div>
                <div className="mediaeye-popup-content-inner-wrapper">
                  <FeatureYourNFT
                    setFeatureInformation={setFeatureInformation}
                    featureInformation={featureInformation}
                    featureType={getFeatureType(type)}
                    tokenAddressList={nft.collectionAddress}
                    tokenIdList={nft.tokenId}
                    isFeatured={true}
                    type={type}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Popup;
