import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  closeExtendPopup,
  closeFeaturePopup,
  toggleExtendPopup,
  toggleFeaturePopup
} from '../../../store/app/appSlice';
import FeaturedNftSection from '../FeatureNft/FeaturedNftSection';
import FeatureNftListed from '../FeatureNft/FeatureNftListed';
export default function FeatureListingContent(props) {
  const history = useHistory();
  const [product, setPrdouct] = useState([]);
  const dispatch = useDispatch();
  const [listedNftCardSelect, setListedNftCardSelect] = useState({});
  const [featuredNftCardSelect, setFeaturedNftCardSelect] = useState({});
  const [fixedButtons, setFixedButtons] = useState(true);
  const showFeaturePopup = useSelector((state) => state.app.showFeaturePopup);
  const showExtendPopup = useSelector((state) => state.app.showExtendPopup);

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

  const switchExtendPopup = (prop) => {
    if (showExtendPopup) {
      dispatch(closeExtendPopup());
    } else {
      dispatch(
        toggleExtendPopup({
          type: 'Extend My NFT',
          content: {
            attributes: {
              id: product.id
            }
          }
        })
      );
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

  return (
    <>
      <div className="mediaeye-layout-middle">
        <section className="mediaeye-layout-section withspace">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-section-header">
              <h2 className="mediaeye-layout-section-header-heading">
                Featured Listings
              </h2>
            </div>

            <FeaturedNftSection
              selectFeaturedNftCard={selectFeaturedNftCard}
              selectedCard={featuredNftCardSelect}
            />
          </div>
        </section>

        <section className="mediaeye-layout-section withspace">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-section-header">
              <h2 className="mediaeye-layout-section-header-heading">
                Listed on Marketplace
              </h2>
            </div>

            <FeatureNftListed
              selectListedNftCard={selectListedNftCard}
              selectedCard={listedNftCardSelect}
            />
          </div>
        </section>
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
