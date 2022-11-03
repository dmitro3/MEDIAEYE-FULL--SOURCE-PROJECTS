import React from 'react';
import './ExtendPopup.scss';
import { closeExtendPopup } from '../../../../store/app/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import CloseIcon from '../../../Icons/CloseIcon';
import FeatureYourNFT from '../../../PutOn/PutOnReusables/FeatureYourNFT';
import { Link, useHistory } from 'react-router-dom';
import ExploreBlock from '../../../ContentMarketplace/ExploreBlock/ExploreBlock';
import CollectionCard from '../../../ContentMarketplace/CollectionCard/CollectionCard';
import FEATURETYPE from '../../../../utils/featureConstants';
import mediaeyespotlight from '../../../../assets/img/mediaeyespotlight.png';

export default function ExtendPopup(props) {
  const showPopup = useSelector((state) => state.app.showExtendPopup);
  const content = useSelector((state) => state.app.extendPopupContent);
  const type = useSelector((state) => state.app.extendPopupType);
  const nft = useSelector((state) => state.app.extendPopupNFT);
  const [activeToken, setActiveToken] = useState(null);
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [showdropdown, setShowdropdown] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateState, setDateState] = useState(new Date());
  const [product, setProduct] = useState([content]);
  const [selectDay, setSelectDay] = useState(3);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [featureInformation, setFeatureInformation] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  const changeDate = (e) => {
    setDateState(e);
    setDate();
  };
  const setDate = () => {
    setOpenCalendar(!openCalendar);
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
          img: '/img/token/34/FTM.png',
          des: 'Fantom'
        },
        {
          name: 'USDC',
          des: 'USD Coin',
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
          <div className="mediaeye-popup-wrapper extend-popup scrolled">
            <div className="mediaeye-popup-content extend-popup-content">
              <div className="mediaeye-popup-content-inner extend-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => dispatch(closeExtendPopup())}
                >
                  <CloseIcon />
                </div>

                <div className="extend-popup-content-inner-product" type={type}>
                  {type === 'Extend Your NFT' ? (
                    <ExploreBlock from={'extendPopup'} product={nft} key={1} />
                  ) : type === 'Extend Your Collection' ? (
                    <CollectionCard
                      from={'extendPopup'}
                      collection={content}
                      key={1}
                    />
                  ) : type === 'Extend Your Campaign' ? (
                    <ExploreBlock product={nft} key={1} />
                  ) : type === 'Extend Your Airdrop' ? (
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
}
