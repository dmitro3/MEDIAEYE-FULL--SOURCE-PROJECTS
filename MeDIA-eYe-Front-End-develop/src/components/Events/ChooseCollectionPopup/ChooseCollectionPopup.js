import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';
import { CloseIcon, Upload } from '../../Icons';
import './ChooseCollectionPopup.scss';

export default function ChooseCollectionPopup(props) {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState();
  const { user, isInitialized } = useMoralis();
  const [activeHover, setActiveHover] = useState('');

  return (
    <div
      className={props.openPopup ? 'mediaeye-popup active' : 'mediaeye-popup'}
    >
      <div className="mediaeye-popup-wrapper choose-collection scrolled">
        <div className="mediaeye-popup-content">
          <div className="mediaeye-popup-content-inner choose-collection-inner">
            <div className="choose-collection-inner-title m-b-50">
              <div className="mediaeye-popup-close" onClick={props.togglePopup}>
                <CloseIcon />
              </div>
              <span>Select Collection Option</span>
            </div>
            <div>
              <div className="choose-collection-inner-block m-b-30">
                <div
                  className="choose-collection-inner-block-boxPadding"
                  type="nft"
                  onClick={() => history.push('/create/generative/collection')}
                  onMouseEnter={() => setActiveTab('generative')}
                >
                  {activeTab === 'generative' ? (
                    <div
                      className="choose-collection-inner-block-boxPadding-responsive"
                      level={user?.attributes?.subscriptionLevel}
                    >
                      <div className="choose-collection-inner-block-boxPadding-responsive-left">
                        <div className="choose-collection-inner-block-boxPadding-responsive-left-upper text-uppercase text-bold m-b-25">
                          Generative Collection
                        </div>
                        <div className="choose-collection-inner-block-boxPadding-responsive-left-bottom">
                          <div className="m-b-20">
                            Mint Generative collection by algorithm based on your
                            layers, properties and rarity score setup
                          </div>
                          <div>
                            NFT at time of creation is not minted yet but ready
                            for the first sale.
                          </div>
                        </div>
                      </div>
                      <div className="choose-collection-inner-block-boxPadding-responsive-right">
                        <div className="choose-collection-inner-block-boxPadding-responsive-right-inner">
                          <img
                            src="/img/icon/payasyougo.png"
                            alt="Payasyougo"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="choose-collection-inner-block-boxPadding-purple">
                      <div className="choose-collection-inner-block-boxPadding-purple-text text-uppercase text-bold">
                        Generative Collection
                      </div>
                      <div className="choose-collection-inner-block-boxPadding-purple-levels">
                        <img src="/img/icon/payasyougo.png" alt="Payasyougo" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                className="choose-collection-inner-block"
                onMouseEnter={() => setActiveHover('jumbo')}
                onMouseLeave={() => setActiveHover('')}
              >
                <div
                  className="choose-collection-inner-block-boxPadding"
                  type="nft"
                  onClick={() => history.push('/create/jumbomint')}
                  onMouseEnter={
                    user?.attributes?.subscriptionLevel > 0
                      ? () => setActiveTab('jumbo')
                      : null
                  }
                >
                  {activeTab === 'jumbo' ? (
                    <div
                      className="choose-collection-inner-block-boxPadding-responsive"
                      level={user?.attributes?.subscriptionLevel}
                    >
                      <div className="choose-collection-inner-block-boxPadding-responsive-left">
                        <div className="choose-collection-inner-block-boxPadding-responsive-left-upper text-uppercase text-bold m-b-25">
                          Jumbo Mint
                        </div>
                        <div className="choose-collection-inner-block-boxPadding-responsive-left-bottom">
                          <div>
                            List on Marketplace: <br /> <b>auto</b>
                          </div>
                        </div>
                      </div>
                      <div className="choose-collection-inner-block-boxPadding-responsive-right">
                        <div className="choose-collection-inner-block-boxPadding-responsive-right-inner">
                          <Upload />
                          {user?.attributes?.subscriptionLevel === 0 ? (
                            <span>50 MB</span>
                          ) : user?.attributes?.subscriptionLevel === 1 ? (
                            <span>100 MB</span>
                          ) : (
                            <span>250 MB</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="choose-collection-inner-block-boxPadding-purple">
                      <div className="choose-collection-inner-block-boxPadding-purple-text text-uppercase text-bold">
                        Jumbo Mint
                      </div>
                      {user?.attributes?.subscriptionLevel == 2 ? (
                        <div className="choose-collection-inner-block-boxPadding-purple-levels">
                          <button
                            className="subscription-level"
                            level="2"
                            data-html={true}
                            data-class="mediaeyetooltip"
                            data-tip="<span class='text-creative'>Level 2</span> <span class='other-text'> Subscription required</span>"
                            alt="info"
                          >
                            LVL 2
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
