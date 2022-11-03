import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useMoralis } from 'react-moralis';
import { useHistory, Link } from 'react-router-dom';
import { ImagePlug, User, Users, Private } from '../../Icons/';
import './CampaignBlock.scss';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
const CampaignBlock = (props) => {
  const { campaign, active, isFeatured, Spotlight } = props;
  let history = useHistory();
  const { user, isInitialized, Moralis } = useMoralis();
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState(false);
  useEffect(() => {
    setSpotlight(Spotlight);
  }, [Spotlight]);



  return (
    <>
      <div className="mediaeye-campaign-card">
        <Link

          className={`mediaeye-campaign-card-inner`}
          to="/campaign/launch"
          type={isFeatured === true || spotlight === true ? 'featured' : 'simple'}
        >
          <div className="mediaeye-campaign-card-inner-imgbox">
            <div className="mediaeye-campaign-card-inner-imgbox-slide">
              {campaign?.img ? (
                <img
                  className="mediaeye-campaign-card-inner-imgbox-slide-img"
                  src={campaign?.img}
                  alt={`${campaign?.title} Banner`}
                />
              ) : (
                <ImagePlug />
              )}
            </div>
            <div className="mediaeye-campaign-card-inner-content-logo">
              <img
                src={
                  campaign?.logo
                    ? campaign?.logo
                    : GetDefaultImages('cardlogo')
                }
                className="mediaeye-campaign-card-inner-content-logo-img"
                alt={`${campaign?.title} Logo`}
              />
            </div>

          </div>
          {campaign?.isLive ? (
            <div type="live" className="mediaeye-campaign-card-inner-content-status">Live</div>
          ) : null}
          <div className="mediaeye-campaign-card-inner-content">
            <div className="mediaeye-campaign-card-inner-content-inner">

              <div className="mediaeye-campaign-card-inner-content-top">
                <div className="mediaeye-campaign-card-inner-content-top-left">
                  <div className="mediaeye-campaign-card-inner-content-title">
                    {campaign?.title ? <span>{campaign?.title}</span> : null}
                  </div>

                  <div className="mediaeye-campaign-card-inner-content-date">
                    {campaign?.dateStart} - {campaign?.dateEnd}
                  </div>
                </div>
              </div>
              <div className='mediaeye-campaign-card-inner-content-middle'>
                <div className="mediaeye-campaign-card-inner-content-info">
                  <div className="mediaeye-campaign-card-inner-content-info-item">
                    <User type="small" /> Participants: 100/555
                  </div>
                </div>
              </div>

              <div className="mediaeye-campaign-card-inner-content-bottom">
                <div className="mediaeye-campaign-card-inner-content-bottom-left">
                  <div className="mediaeye-campaign-card-inner-content-bottom-left-item">
                    <div className="mediaeye-campaign-card-inner-content-bottom-left-item-btn">Airdrop</div>
                  </div>
                </div>

                <div className="mediaeye-airdrop-card-inner-content-bottom-right">
                  <div className="mediaeye-campaign-card-inner-content-bottom-left-item">
                    {campaign?.campaignType === 'public' ? (
                      <>
                        <Users /> Public
                      </>
                    ) : (
                      <>
                        <Private /> Private
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CampaignBlock;
