import React from 'react';
import CloseIcon from '../../Icons/CloseIcon';
import './Popup.scss';
import CharityCardSmall from '../../CardSmall/CharityCardSmall';
import AirdropCardSmall from '../../CardSmall/AirdropCardSmall';
import CollectionCardSmall from '../../CardSmall/CollectionCardSmall';
import {
  CollectionSmallJson,
  CharitySmallJson,
  AirdropSmallJson
} from '../../../utils/JsonData';

//media and images

const Popup = (props) => {
  const charityData = CharitySmallJson();
  const airdropData = AirdropSmallJson();
  const collectionData = CollectionSmallJson();

  return (
    <React.Fragment>
      {props.popup ? (
        <div
          className={
            props.popup
              ? 'mediaeye-popup active mediaeye-popup-md'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-mintnft scrolled"
            onClick={props.togglePopup}
          >
            <div
              className="mediaeye-popup-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-popup-content-inner-header">
                  <div class="mediaeye-popup-content-inner-header-title text-center">
                    Campaign Stats
                  </div>
                </div>
                <div className="mediaeyefancyScroll">
                  <div className="mediaeye-campaignStats-body">
                    <div className="mediaeye-campaignStats-body-wrapper">
                      <h5 className="m-b-20 m-t-5">Airdrops</h5>
                      <div className="mediaeye-campaignStats-body-wrapper-innerbox">
                        {airdropData.map((airdrop, i) => (
                          <AirdropCardSmall airdrop={airdrop} key={i} />
                        ))}
                      </div>
                    </div>
                    <div className="mediaeye-campaignStats-body-wrapper">
                      <h5 className="m-b-20 m-t-30">Collections</h5>
                      <div className="mediaeye-campaignStats-body-wrapper-innerbox">
                        {collectionData.map((collection, i) => (
                          <CollectionCardSmall
                            collection={collection}
                            key={i}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mediaeye-campaignStats-body-wrapper">
                      <h5 className="m-b-20 m-t-30">Charities</h5>
                      <div className="mediaeye-campaignStats-body-wrapper-innerbox">
                        {charityData.map((charity, i) => (
                          <CharityCardSmall charity={charity} key={i} />
                        ))}
                      </div>
                    </div>
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
