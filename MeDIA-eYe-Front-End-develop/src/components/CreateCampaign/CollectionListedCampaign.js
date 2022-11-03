import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import CollectionCard from '../ContentMarketplace/CollectionCard/CollectionCard';
import ChooseCollectionPopup from '../Events/ChooseCollectionPopup/ChooseCollectionPopup';
import { queryCollectionsByChain } from '../../blockchain/functions/Collection';
import { ChainHexString } from '../../blockchain/functions/ChangeChain/ChainHexStrings';
import { useIsVisible } from 'react-is-visible';
import { Plus } from '../Icons';

const settingCollection = {
  slidesPerView: 1,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-CreateCampaign-collection-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    889: {
      slidesPerView: 2
    },
    1181: {
      slidesPerView: 3
    },
    1280: {
      slidesPerView: 3
    }
  }
};

const productPerPage = 8;

const CollectionListedCampaign = (props) => {
  console.log(props, 'props');
  // const { toggleCollection } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { user, Moralis, isInitialized } = useMoralis();
  const [productToShow, setproductToShow] = useState([]);
  const [next, setNext] = useState(productPerPage);
  const anchorVisible = useRef();
  const isVisible = useIsVisible(anchorVisible);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const queryCollectionList = async (startIndex) => {
    setIsLoading(true);
    const params = {
      chain: ChainHexString(activeNetwork),
      skip: startIndex, //next - productPerPage,
      limit: productPerPage,
      hidden: false,
      userAddress: user?.attributes?.ethAddress
    };
    const result = await queryCollectionsByChain(Moralis, params);
    setCollections(result);
    setIsLoading(false);
  };

  useEffect(() => {
    setproductToShow([]); // reset array
    setNext(productPerPage); // reset page

    if (isInitialized) {
      queryCollectionList(0);
    }
  }, [activeNetwork, isInitialized]);

  useEffect(() => {
    if (isVisible) {
      queryCollectionList(next);
      setNext(next + productPerPage);
    }
  }, [isVisible]);

  useEffect(() => {
    if (collections && collections.length > 0) {
      const newProducts = [...productToShow, ...collections];
      setproductToShow(newProducts);
    }
  }, [collections]);

  const toggleChooseCollection = () => {
    setOpenPopup(!openPopup);
  };

  return (
    <>
      {openPopup ? (
        <ChooseCollectionPopup
          openPopup={openPopup}
          togglePopup={toggleChooseCollection}
        />
      ) : null}
      <div className="mediaeye-nft-slide">
        {productToShow.length > 0 ? (
          <>
            <Swiper
              {...settingCollection}
              className="mediaeye-collection-pagination m-t-30"
            >
              {productToShow.map((collection, i) =>
                props?.selectYourCollectionCard ? (
                  <>
                    <SwiperSlide key={i}>
                      <CollectionCard
                        collection={collection}
                        key={i}
                        selectCard={props.selectYourCollectionCard}
                        selectedCard={props?.selectedCard}
                      />
                    </SwiperSlide>
                  </>
                ) : (
                  <>
                    <SwiperSlide key={i}>
                      <CollectionCard collection={collection} key={i} />
                    </SwiperSlide>
                  </>
                )
              )}
              <SwiperSlide>
                <div className="mediaeye-collection-card">
                  <div
                    onClick={toggleChooseCollection}
                    className="mediaeye-collection-card-inner mediaeye-collection-card-inner-add"
                  >
                    <div className="mediaeye-collection-card-inner-add-content">
                      <div className="mediaeye-collection-card-inner-add-content-icon">
                        <Plus />
                      </div>
                      <div className="mediaeye-collection-card-inner-add-content-text">
                        New Collection
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <div ref={anchorVisible}></div>
            </Swiper>
            <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-CreateCampaign-collection-pagination"></div>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-semitransperant m-b-30 text-medium">
              You have no Collections yet
            </h1>
            <button
              className="btn btn-transperant btn-lg"
              onClick={toggleChooseCollection}
            >
              CREATE COLLECTION
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionListedCampaign;
