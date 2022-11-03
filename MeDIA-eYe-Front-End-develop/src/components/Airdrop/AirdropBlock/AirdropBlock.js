import React, { useRef, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { trimString } from '../../../utils/functions';
import { useDispatch } from 'react-redux';
import Timer from 'react-compound-timer';
import { Heart, User, Token, Clock, NFTAirdrop, Cyliner, Check } from '../../Icons/';
import './AirdropBlock.scss';
import { roundString } from '../../../blockchain/functions/Utils';
import { ethers } from 'ethers';
import { ChainName } from '../../../blockchain/functions/ChangeChain';
import { format } from 'date-fns';
import { ImagePlug } from '../../Icons/';
const AirdropBlock = (props) => {
  const dispatch = useDispatch();
  const {
    airdrop,
    isFeatured,
    selectCard,
    selectedCard,
    selectedCampaignCard,
    Spotlight
  } = props;
  const history = useHistory();
  const [like, setLike] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  useEffect(() => {
    setSpotlight(Spotlight);
  }, [Spotlight]);
  const airdropCheckbox = () => {
    return (
      <div className="mediaeye-airdrop-card-inner-content-checkbox" onClick={(event) => event.preventDefault()} >
        <label className="mediaeye-airdrop-card-inner-content-checkbox-label" onClick={(e) => {
          selectCard(
            selectedCard?.attributes?.id === airdrop?.attributes?.id ? false : true,
            airdrop
          );
        }}>
          {selectedCard?.id === airdrop?.id ? <Check size="small" /> : null}
        </label>
      </div>
    );
  };

  const cardTimerbox = () => {
    return (
      <div className="mediaeye-airdrop-card-inner-content-bottom-right-time">
        <div className="mediaeye-airdrop-card-inner-content-bottom-right-time-label">Left for claiming phase</div>
        <div className="mediaeye-airdrop-card-inner-content-bottom-right-time-value"><Clock />
          {airdrop?.timer === 'days' ? (
            <>5 days</>
          ) : (
            <>
              <span className="mediaeye-airdrop-card-inner-content-bottom-right-time-value-time">
                <Timer
                  initialTime={
                    airdrop?.endTime
                      ? (Number(airdrop?.endTime) - Math.floor(Date.now() / 1000)) *
                      1000
                      : 340000000
                  }
                  direction="backward"
                >
                  {() => (
                    <React.Fragment>
                      <Timer.Hours />
                      :
                      <Timer.Minutes />
                      :
                      <Timer.Seconds />
                    </React.Fragment>
                  )}
                </Timer>
              </span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mediaeye-airdrop-card">

        <Link
          className="mediaeye-airdrop-card-inner"
          to={`/airdrop/${ChainName(airdrop?.attributes?.chainId)}/${airdrop?.attributes?.airdropId
            }`}
          type={isFeatured === true || spotlight ? 'featured' : 'simple'}
        >
          <div className="mediaeye-airdrop-card-inner-imgbox">
            <div className="mediaeye-airdrop-card-inner-imgbox-slide">
              {airdrop?.attributes?.logo ? (
                <img
                  className="mediaeye-airdrop-card-inner-imgbox-slide-img"
                  src={airdrop?.attributes?.logo}
                  alt={airdrop?.attributes?.name}
                />
              ) : (
                <ImagePlug />
              )}
            </div>
            {selectedCampaignCard ? airdropCheckbox() : null}
          </div>

          <div className="mediaeye-airdrop-card-inner-content">

            <div className="mediaeye-airdrop-card-inner-content-inner">

              <div className="mediaeye-airdrop-card-inner-content-top">
                <div className="mediaeye-airdrop-card-inner-content-top-left">
                  <div className="mediaeye-airdrop-card-inner-content-title">
                    {airdrop?.attributes?.name}
                  </div>

                  <div className="mediaeye-airdrop-card-inner-content-date">
                    {airdrop?.attributes?.phaseTimes?.whitelisting ? (
                      <>
                        {format(
                          new Date(
                            airdrop?.attributes?.phaseTimes?.whitelisting
                          ),
                          'dd.MM.yyyy'
                        )}{' '}
                        -{' '}
                      </>
                    ) : null}
                    {airdrop?.attributes?.phaseTimes?.ended ? (
                      <>
                        {format(
                          new Date(airdrop?.attributes?.phaseTimes?.ended),
                          'dd.MM.yyyy'
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="mediaeye-airdrop-card-inner-content-info">
                    <div className="mediaeye-airdrop-card-inner-content-info-item">
                      <User type="small" /> {airdrop?.attributes?.participantAllocation ? airdrop?.attributes?.participantAllocation : '0'}/{airdrop?.attributes?.totalAllocation ? airdrop?.attributes?.totalAllocation : '0'}
                    </div>
                    <div className="mediaeye-airdrop-card-inner-content-info-item">
                      <Cyliner /> {airdrop?.attributes?.participantAllocation
                        ? roundString(
                          ethers.utils.formatEther(
                            airdrop?.attributes?.participantAllocation
                          ),
                          7
                        )
                        : '10000'} {airdrop?.attributes?.airdropType === 'ERC20'
                          ? airdrop?.attributes?.token?.symbol
                          : 'eYe'}  <span className='mediaeye-airdrop-card-inner-content-info-item-label'>per participant</span>
                    </div>
                  </div>
                </div>

              </div>


              <div className="mediaeye-airdrop-card-inner-content-bottom">
                <div className="mediaeye-airdrop-card-inner-content-bottom-left">
                  <div className="mediaeye-airdrop-card-inner-content-bottom-left-item">
                    {airdrop?.attributes?.airdropType === 'ERC20' ? (
                      <>
                        <Token /> Token Airdrop
                      </>
                    ) : (
                      <>
                        <NFTAirdrop /> NFT Airdrop
                      </>
                    )}
                  </div>
                </div>

                <div className="mediaeye-airdrop-card-inner-content-bottom-right">
                  {cardTimerbox()}
                </div>

              </div>
            </div>
          </div>

        </Link>
      </div>
    </>
  );
};

export default AirdropBlock;
