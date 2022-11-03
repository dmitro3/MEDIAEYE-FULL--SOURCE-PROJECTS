import React, { useState, useEffect } from 'react';
import './Popup.scss';
import CloseIcon from '../../Icons/CloseIcon';
import { useSelector, useDispatch } from 'react-redux';
import { closeBurnPopup, toggleBurnPopup } from '../../../store/app/appSlice';
import { Model3d } from '../../3d/Model3d';
import { subString } from '../../../utils/functions';
import { useMoralis } from 'react-moralis';
import { burnToken } from '../../../blockchain/functions/Content/Burn';
import AgreeBlock from '../../Common/AgreeBlock';
import MarketplaceBlock from '../../ContentMarketplace/MarketplaceBlock/MarketplaceBlock';
import EventsBlock from '../../Events/EventsBlock/EventsBlock';
import { EventsJson } from '../../../utils/JsonData';
import ExploreNormalCard from '../../ContentMarketplace/ExploreBlock/ExploreNormalCard';
const Popup = (props) => {
  const featured = EventsJson();
  const showPopup = useSelector((state) => state.app.showBurnPopup);
  const content = useSelector((state) => state.app.burnPopupContent);
  const { Moralis, isInitialized, user } = useMoralis();
  const nft = useSelector((state) => state.app.currentNFT);
  const dispatch = useDispatch();
  const [amountOwned, setAmountOwned] = useState(0);
  const [amountToBurn, setAmountToBurn] = useState(1);
  const [termsAgree, setTermsAgree] = useState(false);
  const burnTxt = 'I understand';

  useEffect(async () => {
    if (isInitialized && nft.id) {
      const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');
      const newNFT = new MediaEyeNFT(nft);
      const UserNFT = Moralis.Object.extend('UserNFT');
      const query = new Moralis.Query(UserNFT);
      query.equalTo('nft', newNFT);
      query.equalTo('owner', user.attributes.ethAddress);
      const res = await query.first();
      setAmountOwned(res?.attributes?.amount);
    }
  }, [nft, isInitialized]);

  const putForSaleChange = (e) => {
    if (
      (Number(e.target.value) <= amountOwned && Number(e.target.value) >= 0) ||
      e.target.value === null
    ) {
      setAmountToBurn(e.target.value);
    }
  };
  const toggleTermsAgree = () => {
    setTermsAgree(!termsAgree);
  };
  const burnNFT = async () => {
    // remove from chain by calling contract
    const burnRes = await burnToken(
      dispatch,
      Moralis,
      nft.collectionType,
      nft.collectionAddress,
      nft.tokenId,
      nft.chainId,
      amountToBurn
    );
    if (burnRes > 0) {
      setAmountOwned(amountOwned - burnRes);
      dispatch(closeBurnPopup);
    }
  };

  return (
    <React.Fragment>
      {showPopup ? (
        <div
          className={
            showPopup
              ? 'mediaeye-popup active mediaeye-popup-sm burn-popup'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-product-page scrolled"
            onClick={() => dispatch(closeBurnPopup())}
          >
            <div
              className="mediaeye-popup-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => dispatch(closeBurnPopup())}
                >
                  <CloseIcon />
                </div>
                {content?.attributes?.type === 'Event' ? (
                  <div className="burn-popup-title">
                    <span>Burn Event</span>
                  </div>
                ) : null}
                <div className="burn-popup-wrapper">
                  {content?.attributes?.type === 'collection' ? (
                    <div className="collection_block_single_wrapper">
                      <img src={content?.attributes?.image} alt="marketplace" />

                      <div className="collection_block_single_ava">
                        <img
                          src={
                            content?.attributes?.logo
                              ? content?.attributes?.logo
                              : '../../img/05.png'
                          }
                          alt="avatar"
                        />
                      </div>
                      <h6>
                        {content?.attributes?.name
                          ? subString(content?.attributes?.name, 28)
                          : 'Collection 1 [Title] '}
                      </h6>
                    </div>
                  ) : content?.attributes?.type === 'Event' ? (
                    <div>
                      {featured
                        .filter((event) => event.id === 1)
                        .map((event, i) => (
                          <EventsBlock event={event} key={i} />
                        ))}
                    </div>
                  ) : (
                    <ExploreNormalCard product={nft} />
                    // <MarketplaceBlock
                    //   key={1}
                    //   name={content?.attributes?.name}
                    //   url={content?.attributes?.image}
                    //   myNft={true}
                    // ></MarketplaceBlock>
                  )}
                  <div className="burn-popup-wrapper-burning-title">
                    {content?.attributes?.type === 'collection' ? (
                      <span>
                        Burning Collection is irreversible, you will no longer
                        have access to this collection.
                      </span>
                    ) : content?.attributes?.type === 'Event' ? (
                      <span>
                        Burning an Event is an
                        <br /> irreversible transaction!
                      </span>
                    ) : (
                      <span>
                        Burning an NFT is an
                        <br /> irreversible transaction!
                      </span>
                    )}
                  </div>
                  <div
                    className="put_on_amount_block"
                    style={{
                      display: nft?.amountOwned > 1 ? 'block' : 'none'
                    }}
                  >
                    <input
                      className="btn btn-main"
                      type="number"
                      max={amountOwned}
                      pattern="[0-9]*"
                      step={1}
                      placeholder="Quantity to burn"
                      value={amountToBurn}
                      onChange={(e) => putForSaleChange(e)}
                    />
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => setAmountToBurn(amountOwned)}
                    >
                      MAX {amountOwned}
                    </span>
                  </div>
                  <div className="burn-popup-wrapper-burn-bottom">
                    <AgreeBlock
                      agree={termsAgree}
                      toggleAgree={toggleTermsAgree}
                      contentText={burnTxt}
                    />
                    {/* <div className="on_sale_in_checkbox">
                      <input
                        id="check"
                        type="checkbox"
                        onChange={() => setCheck(!check)}
                        checked={check}
                      />
                    </div>
                  <span style={{ margin: '0 20px 0 -20px' }}>I understand</span> */}
                    {/* <div
                      className="put_on_amount_block"
                      style={{
                      display: nft?.collectionType === 'ERC721' ? 'none' : 'flex'
                      }}
                    >*/}

                    <button
                      type="button"
                      className={
                        termsAgree ? 'btn btn-main' : 'btn btn-disable'
                      }
                      disabled={
                        !termsAgree || amountToBurn === '' ? true : false
                      }
                      onClick={() => burnNFT()}
                    >
                      Burn
                    </button>
                  </div>
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
