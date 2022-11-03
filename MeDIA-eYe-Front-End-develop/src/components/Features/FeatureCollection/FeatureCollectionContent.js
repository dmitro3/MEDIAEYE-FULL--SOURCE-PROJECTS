import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YourCollecitons from '../../Collections/YourCollecitons';
import FeaturedCollection from '../../../components/Collections/FeaturedCollection';
import {
  closeExtendPopup,
  closeFeaturePopup,
  toggleExtendPopup,
  toggleFeaturePopup
} from '../../../store/app/appSlice';
import { collection } from '@firebase/firestore';
import PopupFeatureHistory from '../FeatureNft/FeatureHistory/PopupFeatureHistory';
export default function FeatureCollectionContent() {
  const dispatch = useDispatch();
  const [fixedButtons, setFixedButtons] = useState(true);
  const [openFeatureHistory, setOpenFeatureHistory] = useState(false);
  const [yourCollectionCardSelect, setYourCollectionCardSelect] = useState({});
  const [featuredCollectionCardSelect, setFeaturedCollectionCardSelect] =
    useState({});

  const selectFeaturedCollectionCard = (status, collection) => {
    if (status && collection?.attributes?.collectionAddress) {
      setFeaturedCollectionCardSelect(collection);
      setYourCollectionCardSelect({});
    } else {
      setFeaturedCollectionCardSelect({});
    }
  };

  const toggleFeatureHistory = () => {
    setOpenFeatureHistory(!openFeatureHistory);
  };

  const selectYourCollectionCard = (status, collection) => {
    if (status && collection?.attributes?.collectionAddress) {
      setYourCollectionCardSelect(collection);
      setFeaturedCollectionCardSelect({});
    } else {
      setYourCollectionCardSelect({});
    }
  };
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

  const switchFeaturePopup = () => {
    dispatch(
      toggleFeaturePopup({
        type: 'Spotlight My Collection',
        content: yourCollectionCardSelect
      })
    );
  };

  const switchExtendPopup = () => {
    dispatch(
      toggleExtendPopup({
        type: 'Extend Your Collection',
        content: featuredCollectionCardSelect
      })
    );
  };
  return (
    <>
      <div className="mediaeye-layout-middle">
        {openFeatureHistory ? (
          <PopupFeatureHistory
            openFeatureHistory={openFeatureHistory}
            togglePopup={toggleFeatureHistory}
          />
        ) : null}
        <section className="mediaeye-layout-section">
          <div className="mediaeye-layout-container">
            <div className="feature-collection-page-headbar">
              <span>SPOTLIGHT Collections </span>
              <div className="feature-collection-page-headbar-inner">
                <button type="button" onClick={toggleFeatureHistory}>
                  Spotlight History
                </button>
                <div className="mediaeye-searchbar">
                  <input placeholder="Search" type="text" />
                </div>
              </div>
            </div>
            <FeaturedCollection
              selectFeaturedCollectionCard={selectFeaturedCollectionCard}
              selectedCard={featuredCollectionCardSelect}
              owner={true}
            />
          </div>
        </section>

        <section className="mediaeye-layout-section withspace">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-section-header">
              <h2 className="mediaeye-layout-section-header-heading">
                Collections
              </h2>
            </div>
            <YourCollecitons
              selectYourCollectionCard={selectYourCollectionCard}
              selectedCard={yourCollectionCardSelect}
            />
          </div>
        </section>
      </div>
      {yourCollectionCardSelect?.attributes?.collectionAddress ||
      featuredCollectionCardSelect?.attributes?.collectionAddress ? (
        <div
          className={
            fixedButtons ? 'mediaeyepage-bottom isfixed' : 'mediaeyepage-bottom'
          }
        >
          <div className="mediaeye-layout-container">
            <div className="mediaeyepage-bottom-inner">
              {yourCollectionCardSelect?.attributes?.collectionAddress ? (
                <div className="mediaeyepage-bottom-inner-item">
                  <button
                    type="button"
                    className="btn btn-lg btn-featured"
                    onClick={() => switchFeaturePopup()}
                  >
                    Spotlight
                  </button>
                </div>
              ) : null}
              {featuredCollectionCardSelect?.attributes?.collectionAddress ? (
                <div className="mediaeyepage-bottom-inner-item">
                  <button
                    type="button"
                    className="btn btn-lg btn-info"
                    onClick={() => switchExtendPopup()}
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
