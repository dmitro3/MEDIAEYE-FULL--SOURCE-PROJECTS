import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { useMoralis } from 'react-moralis';
import './ProductRairtyScorePopup.scss';
import { ImagePlug, Angle } from '../../Icons/';
import { useSelector, useDispatch } from 'react-redux';
import { closeProductRairtyScorePopup } from '../../../store/app/appSlice';
import { queryFileType } from '../../../blockchain/functions/Utils';
import { queryCollection } from '../../../blockchain/functions/Collection';
const ProductRairtyScorePopup = () => {
  const showPopup = useSelector(
    (state) => state.app.showProductRairtyScorePopup
  );
  const product = useSelector(
    (state) => state.app.productRairtyScorePopupContent
  );
  const { isInitialized, Moralis } = useMoralis();
  const dispatch = useDispatch();
  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [mimetypes, setMimetypes] = useState(null);
  const [collection, setCollections] = useState(null);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    arrows: false,
    fade: true,
    autoplay: false,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next + 1)
  };

  const getFileTypes = async () => {
    let fileTypes = [];
    for (let i = 0; i < product?.img?.length; i++) {
      const fileType = await queryFileType(product?.img[i]);

      fileTypes.push(fileType);
    }
    setMimetypes(fileTypes);
  };

  useEffect(() => {
    if (product && isInitialized) {
      getFileTypes();
      getCollection();
    }
  }, [product, isInitialized]);

  const getCollection = async () => {
    if (product?.collectionAddress) {
      const result = await queryCollection(
        Moralis,
        product?.collectionAddress[0]
      );
      setCollections(result);
    }
  };

  return (
    <React.Fragment>
      {showPopup ? (
        <div
          className={
            showPopup
              ? 'mediaeye-popup mediaeye-popup-md active'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-rarityscore-popup scrolled"
            onClick={() => dispatch(closeProductRairtyScorePopup())}
          >
            <div className="mediaeye-popup-content">
              <div
                className="mediaeye-popup-content-inner"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    {/* {collection?.attributes?.name} */}
                    Rarity Stats
                  </div>
                </div>

                <div className="mediaeye-rarityscore-popup-content">
                  <div className="mediaeye-rarityscore-popup-content-colleft">
                    <div className="mediaeye-rarityscore-popup-content-imgbox">
                      {(mimetypes && mimetypes === 'model/gltf+json') ||
                      (mimetypes && mimetypes === 'model/gltf-binary') ? (
                        <Slider {...settings} ref={sliderRef}>
                          {product?.img?.map((image, i) => {
                            return (
                              <img
                                model={image + '?filename={filename.glb}'}
                                key={i}
                                alt="img"
                              />
                            );
                          })}
                        </Slider>
                      ) : (
                        <Slider {...settings} ref={sliderRef}>
                          {product?.img?.map((image, i) => {
                            return (
                              <React.Fragment key={i}>
                                <div className="mediaeye-rarityscore-popup-content-imgbox-slide">
                                  {mimetypes ? (
                                    mimetypes[i] === 'video/mp4' ? (
                                      <video
                                        preload="metadata"
                                        src={image}
                                        loop
                                        controls
                                        playsInline
                                        controlsList="nodownload"
                                      >
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : (
                                      <img src={image} alt="img" />
                                    )
                                  ) : (
                                    <ImagePlug />
                                  )}
                                </div>
                              </React.Fragment>
                            );
                          })}
                        </Slider>
                      )}

                      {product ? (
                        product?.img?.length > 1 ? (
                          <div
                            className="mediaeye-rarityscore-popup-content-imgbox-buttons"
                            onClick={(event) => event.preventDefault()}
                          >
                            <span
                              className="mediaeye-rarityscore-popup-content-imgbox-buttons-left"
                              onClick={() => sliderRef?.current?.slickNext()}
                            >
                              <Angle side="left" />
                            </span>

                            <span
                              className="mediaeye-rarityscore-popup-content-imgbox-buttons-right"
                              onClick={() => sliderRef?.current?.slickPrev()}
                            >
                              <Angle side="right" />
                            </span>
                          </div>
                        ) : null
                      ) : null}
                    </div>
                  </div>

                  <div className="mediaeye-rarityscore-popup-content-colright mediaeyefancyScroll">
                    <div className="mediaeye-rarityscore-popup-content-tabscard">
                      <div className="mediaeye-rarityscore-popup-content-tabscard-header">
                        <div className="mediaeye-rarityscore-popup-content-tabscard-header-headers">
                          <span>Trait Count:</span>{' '}
                          <span className="text-action">4</span>
                        </div>
                        <div className="mediaeye-rarityscore-popup-content-tabscard-header-headers">
                          <span>Total Rarity Score:</span>{' '}
                          <span className="text-action">22.2</span>
                        </div>
                      </div>
                      <div className="mediaeye-rarityscore-popup-content-tabscard-body">
                        <table>
                          <thead>
                            <tr>
                              <th>Property</th>
                              <th>Value</th>
                              <th>Score</th>
                            </tr>
                          </thead>
                          <tbody className="mediaeyefancyScroll-box">
                            <tr>
                              <td>Background</td>
                              <td>Blue</td>
                              <td>
                                <div className="text-action">+7.1</div>
                              </td>
                            </tr>
                            <tr>
                              <td>Clothes</td>
                              <td>Spaceman</td>
                              <td>
                                <div className="text-action">+7.8</div>
                              </td>
                            </tr>

                            <tr>
                              <td>Body</td>
                              <td>Brown</td>
                              <td>
                                <div className="text-action">+0.1</div>
                              </td>
                            </tr>

                            <tr>
                              <td>Hat</td>
                              <td>Green</td>
                              <td>
                                <div className="text-action">+1.0</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-main"
                    type="button"
                    onClick={() => dispatch(closeProductRairtyScorePopup())}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ProductRairtyScorePopup;
