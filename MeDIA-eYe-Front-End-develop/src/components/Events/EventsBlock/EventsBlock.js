import React, { useState, useEffect } from 'react';
import './EventsBlock.scss';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Heart, User, ImagePlug } from '../../Icons/';

const EventsBlock = (props) => {
  const dispatch = useDispatch();
  const { status, time } = props;
  const {
    event,
    isFeatured,
    selectCard,
    selectedCard,
    selectedEventCampaignCard,
    Spotlight
  } = props;
  const history = useHistory();
  const [like, setLike] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  useEffect(() => {
    setSpotlight(Spotlight);
  }, [Spotlight]);
  const campaignCheckbox = () => {
    return (
      <div className="mediaeye-CreateCampaign-checkbox">
        <input type="checkbox" />
        <label></label>
      </div>
    );
  };

  return (
    <>
      <div className="mediaeye-event-card">
        {selectedEventCampaignCard ? campaignCheckbox() : null}
        <Link
          className="mediaeye-event-card-inner"
          to={`/event/participant/`}
          type={isFeatured === true || spotlight ? 'featured' : 'simple'}
        >
          <div className="mediaeye-event-card-inner-imgbox">
            <div className="mediaeye-event-card-inner-imgbox-slide">
              {
                event?.img ? (
                  <img
                    className="mediaeye-event-card-inner-imgbox-slide-img"
                    src={event?.img}
                    alt={event?.title}
                  />
                ) : <ImagePlug />}

            </div>
          </div>

          <div className="mediaeye-event-card-inner-content">
            <div className="mediaeye-collection-card-inner-content-type">
              EVENT
            </div>

            <div className="mediaeye-event-card-inner-content-inner">
              {event?.isLive ? (
                <div
                  type="live"
                  className="mediaeye-event-card-inner-content-status"
                >
                  Live
                </div>
              ) : (
                <div
                  type="expired"
                  className="mediaeye-event-card-inner-content-status"
                >
                  Expired
                </div>
              )}

              <div className="mediaeye-event-card-inner-content-top">
                <div className="mediaeye-event-card-inner-content-title">
                  {event?.title}
                </div>

                <div className="mediaeye-event-card-inner-content-date">
                  {event?.dateStart} - {event?.dateEnd}
                </div>
                <div className="mediaeye-event-card-inner-content-info">
                  <div className="mediaeye-event-card-inner-content-info-item">
                    <Heart type="white" /> 3 K
                  </div>
                  <div className="mediaeye-event-card-inner-content-info-item">
                    <User type="small" /> 150/555
                  </div>
                </div>
              </div>

              <div className="mediaeye-event-card-inner-content-allocation"></div>
              <div className="mediaeye-event-card-inner-content-bottom">
                <div className="mediaeye-event-card-inner-content-bottom-left">
                  <div className="mediaeye-event-card-inner-content-bottom-left-category">
                    Art
                  </div>
                  <div className="mediaeye-event-card-inner-content-bottom-left-category">
                    Business
                  </div>
                  <div className="mediaeye-event-card-inner-content-bottom-left-category">
                    Gaming
                  </div>
                </div>
                {event?.isLive ? (
                  <div className="mediaeye-event-card-inner-content-bottom-right">
                    <button type="button" className="btn btn-info btn-sm">
                      JOIN
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {spotlight ? (
            <div className="mediaeye-event-card-inner-spotlight">SPOTLIGHT</div>
          ) : null}
        </Link>
      </div>
    </>
  );
};

export default EventsBlock;
