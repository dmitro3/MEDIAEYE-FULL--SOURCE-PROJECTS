import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMoralis } from 'react-moralis';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './CollectionCard2.scss';
import { ChainName } from '../../../blockchain/functions/ChangeChain/ChainNames';
import {
  TokenName,
  ZERO_ADDRESS
} from '../../../blockchain/functions/Addresses';
import { queryTotalVolume } from '../../../blockchain/functions/Collection';
import {
  CheckUrlExist,
  GetDefaultImages
} from '../../../blockchain/functions/Utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GetNetworkIcon } from '../../../blockchain/functions/Utils';



const CollectionCard = (props) => {
  const { collection, onClickAction, active, position, Activecollection } =
    props;
  let history = useHistory();
  const { user, isInitialized, Moralis } = useMoralis();
  const [floorPrice, setFloorPrice] = useState();
  const [totalVolume, setTotalVolume] = useState();
  const [noImg, setNoImg] = useState(false);

  const getTotalVolume = async () => {
    const result = await queryTotalVolume(
      Moralis,
      collection?.attributes?.collectionAddress,
      collection?.attributes?.chainId
    );
    setTotalVolume(result);
  };

  useEffect(() => {
    if (isInitialized && collection) {
      getTotalVolume();
    }
  }, [isInitialized, collection]);


  const pricetoken = (collection, i) => {
    var token = collection?.paymentToken
    var a = collection?.quote;
    if (a) {
      return Math.abs(a[`${token}`]?.salesVolume).toFixed(2);
    } else {

      return ''
    }
  }
  return (
    <>
      <div className="mediaeye-collection2-card">
        {Activecollection === 'MEDIA EYE' ? (
          <>
            <Link
              className="mediaeye-collection2-card-inner"
              onClick={onClickAction ? (e) => onClickAction(e) : null}
              to={`/collections/${ChainName(
                collection?.attributes?.chainId
              )?.toLowerCase()}/${collection?.attributes?.collectionAddress}`}
            >
              <div className="mediaeye-collection2-card-inner-number">
                {position}
              </div>
              <div className="mediaeye-collection2-card-inner-imgbox">
                <div className="mediaeye-collection2-card-inner-imgbox-slide">
                  <LazyLoadImage
                    className="mediaeye-collection2-card-inner-imgbox-slide-img"
                    src={collection?.attributes?.logo}
                    effect="opacity"
                    onError={(event) => {
                      event.target.src =
                        '/img/token/lazyload.png';
                      event.onerror = null;
                    }}
                  />
                </div>
              </div>
              <div className="mediaeye-collection2-card-inner-content">
                <div className="mediaeye-collection2-card-inner-content-title">
                  <span>
                    {Activecollection == 'MEDIA EYE' ? (
                      <> {collection?.attributes?.name} </>
                    ) : null}
                  </span>
                </div>
                <div className="mediaeye-collection2-card-inner-content-price">
                  {/* <div className="mediaeye-collection2-card-inner-content-price-block">
                <span className="mediaeye-collection2-card-inner-content-price-block-name">Floor</span>
                <img src='/img/token/34/ETH.png' />
                <span>14.5</span>
              </div> */}
                  <div className="mediaeye-collection2-card-inner-content-price-block">
                    <span className="mediaeye-collection2-card-inner-content-price-block-name">
                      Total Volume
                    </span>
                    {Activecollection == 'MEDIA EYE' ? (
                      <>
                        <img
                          src={
                            '/img/token/34/' +
                            TokenName(
                              ZERO_ADDRESS,
                              collection?.attributes?.chainId
                            ) +
                            '.png'
                          }
                          alt={TokenName(
                            ZERO_ADDRESS,
                            collection?.attributes?.chainId
                          )}
                        />

                        <span>
                          {totalVolume && !isNaN(totalVolume)
                            ? Math.abs(
                              Moralis.Units.FromWei(totalVolume)
                            ).toFixed(2)
                            : '--'}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          </>
        ) :
          (
            <div className="mediaeye-collection2-card-inner">
              <div className="mediaeye-collection2-card-inner-number">
                {position}
              </div>
              <div className="mediaeye-collection2-card-inner-imgbox">
                <div className="mediaeye-collection2-card-inner-imgbox-slide">
                  <LazyLoadImage
                    src={collection?.collectionImageURL}
                    effect="opacity"
                    onError={(event) => {
                      event.target.src =
                        '/img/token/lazyload.png';
                      event.onerror = null;
                    }}
                  />
                </div>
              </div>
              <div className="mediaeye-collection2-card-inner-content">
                <div className="mediaeye-collection2-card-inner-content-title">
                  <span>
                    {Activecollection == 'MEDIA EYE' ? (
                      <> {collection?.attributes?.name} </>
                    ) : (
                      <>{collection?.collectionName}</>
                    )}
                  </span>
                  {Activecollection == 'WORLD WIDE' ? (
                    <>
                      {collection?.salesVolumeChangePercentage > 0 ? (
                        <span className="mediaeye-collection2-card-inner-content-title-right">
                          +{Math.abs(collection?.salesVolumeChangePercentage).toFixed(3)}%
                        </span>
                      ) : (
                        <span
                          className="mediaeye-collection2-card-inner-content-title-right"
                          style={{ color: 'red' }}
                        >
                          -{Math.abs(collection?.salesVolumeChangePercentage).toFixed(3)}%
                        </span>
                      )}
                    </>
                  ) : null}
                </div>
                <div className="mediaeye-collection2-card-inner-content-price">
                  {/* <div className="mediaeye-collection2-card-inner-content-price-block">
              <span className="mediaeye-collection2-card-inner-content-price-block-name">Floor</span>
              <img src='/img/token/34/ETH.png' />
              <span>14.5</span>
            </div> */}
                  <div className="mediaeye-collection2-card-inner-content-price-block">
                    <span className="mediaeye-collection2-card-inner-content-price-block-name">
                      Total Volume
                    </span>
                    {Activecollection == 'MEDIA EYE' ? (
                      <>
                        <img
                          src={
                            '/img/token/34/' +
                            TokenName(
                              ZERO_ADDRESS,
                              collection?.attributes?.chainId
                            ) +
                            '.png'
                          }
                          alt={TokenName(
                            ZERO_ADDRESS,
                            collection?.attributes?.chainId
                          )}
                        />

                        <span>
                          {totalVolume && !isNaN(totalVolume)
                            ? Math.abs(
                              Moralis.Units.FromWei(totalVolume)
                            ).toFixed(2)
                            : '--'}
                        </span>
                      </>
                    ) : (
                      <>
                        <img
                          src={GetNetworkIcon(collection?.paymentToken)}
                          alt={collection?.paymentToken}
                        />
                        {/* {collection?.paymentToken == 'ETH' ? (
                            <>
                              {' '}
                              <img src="/img/token/34/ETH.png" alt="ETH Token Logo" />
                            </>
                          ) : collection?.paymentToken == 'SOL' ? (
                            <>
                              {' '}
                              <img src="/img/token/34/solana.png" alt="solana Token Logo" />
                            </>
                          ) : null} */}
                        <span>
                          {pricetoken(collection)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
};

export default CollectionCard;
