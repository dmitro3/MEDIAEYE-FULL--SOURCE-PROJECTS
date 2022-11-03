import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  closeExtendPopup,
  closeFeaturePopup,
  toggleExtendPopup,
  toggleFeaturePopup
} from '../../../store/app/appSlice';
import FeaturedNftSection from './FeaturedNftSection';
import PopupFeatureHistory from './FeatureHistory/PopupFeatureHistory';
import FeatureNftListed from './FeatureNftListed';

export default function FeatureNftContent(props) {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const [openFeatureHistory, setOpenFeatureHistory] = useState(false);
  const [listedNftCardSelect, setListedNftCardSelect] = useState({});
  const [featuredNftCardSelect, setFeaturedNftCardSelect] = useState({});
  const [fixedButtons, setFixedButtons] = useState(true);
  const showFeaturePopup = useSelector((state) => state.app.showFeaturePopup);
  const showExtendPopup = useSelector((state) => state.app.showExtendPopup);

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
  const selectFeaturedNftCard = (status, product) => {
    if (status && product?.id) {
      setFeaturedNftCardSelect(product);
      setListedNftCardSelect({});
    } else {
      setFeaturedNftCardSelect({});
    }
  };

  const selectListedNftCard = (status, product) => {
    if (status && product?.id) {
      setListedNftCardSelect(product);
      setFeaturedNftCardSelect({});
    } else {
      setListedNftCardSelect({});
    }
  };

  const toggleFeatureHistory = () => {
    setOpenFeatureHistory(!openFeatureHistory);
  };

  const switchFeaturePopup = () => {
    if (showFeaturePopup) {
      dispatch(closeFeaturePopup());
    } else {
      dispatch(
        toggleFeaturePopup({
          type: 'Spotlight My NFT',
          content: {
            attributes: {
              // image: product[0].fullImage,
              // specific: activeSingle ? 'Fixed Price' : 'Auction'
            }
          },
          nft: listedNftCardSelect
        })
      );
    }
  };

  const switchExtendPopup = () => {
    if (showExtendPopup) {
      dispatch(closeExtendPopup());
    } else {
      dispatch(
        toggleExtendPopup({
          type: 'Extend Your NFT',
          content: {
            attributes: {
              id: product.id
            }
          },
          nft: featuredNftCardSelect
        })
      );
    }
  };

  return (
    <>
      <div className="mediaeye-layout-container feature-nft-page-inner-featuredCards">
        {openFeatureHistory ? (
          <PopupFeatureHistory
            openFeatureHistory={openFeatureHistory}
            togglePopup={toggleFeatureHistory}
          />
        ) : null}
        <div className="featuredCards-Title">
          <sapn>SPOTLIGHT NFTs</sapn>
          <div className="featuredCards-Title-inner">
            <button type="button" onClick={toggleFeatureHistory}>
              Spotlight History
            </button>
            <div className="mediaeye-searchbar">
              <input placeholder="Search" type="text" />
            </div>
          </div>
        </div>
        <FeaturedNftSection
          selectFeaturedNftCard={selectFeaturedNftCard}
          selectedCard={featuredNftCardSelect}
          checkOwner={true}
        />
      </div>
      <div className="feature-nft-page-inner-featuredCards">
        <div className="mediaeye-layout-container">
          <h2 className="featuredCards-Title">NFTs Listed on Marketplace</h2>
          {FeatureNftListed.length > 0 ? (
            <FeatureNftListed
              selectListedNftCard={selectListedNftCard}
              selectedCard={listedNftCardSelect}
              checkOwner={true}
            />
          ) : (
            <div className="featuredCards-notAvailable">
              <span>You have no Marketplace Listings yet.</span>
              <button
                type="btn"
                className="btn btn-creative"
                onClick={() => history.push('/create')}
              >
                Create Nft
              </button>
            </div>
          )}
        </div>
      </div>
      {listedNftCardSelect?.id || featuredNftCardSelect?.id ? (
        <div
          className={
            fixedButtons ? 'mediaeyepage-bottom isfixed' : 'mediaeyepage-bottom'
          }
        >
          <div className="mediaeye-layout-container">
            <div className="mediaeyepage-bottom-inner">
              {listedNftCardSelect?.id ? (
                <div className="mediaeyepage-bottom-inner-item">
                  <button
                    type="button"
                    className="btn btn-lg btn-featured"
                    onClick={() => switchFeaturePopup('NFT')}
                  >
                    Spotlight
                  </button>
                </div>
              ) : null}
              {featuredNftCardSelect?.id ? (
                <div className="mediaeyepage-bottom-inner-item">
                  <button
                    type="button"
                    className="btn btn-lg btn-info"
                    onClick={() => switchExtendPopup(product)}
                  >
                    EXTEND
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
