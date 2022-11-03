import React, { useContext, useEffect, useState } from 'react';
import './ParticipantEvent.scss';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import FeaturedCollection from '../../../components/Collections/FeaturedCollection';
import profileBanner from '../../../assets/img/TokenAirdrop/participantevent.png';
import profileAvatar from '../../../assets/img/TokenAirdrop/profileavatars.png';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import FeaturedAirdop from '../../Airdrop/FeaturedAirdop/FeaturedAirdop';
import arrow from '../../../assets/img/faq_arrow.png';
import { toggleBurnPopup } from '../../../store/app/appSlice';
import EventJoinPopup from '../../Modals/EventJoinPopup/EventJoinPopup';
import Taskdetail from '../../TaskDetail/Taskdetail';
import { Link, useHistory } from 'react-router-dom';
import { Horizontal } from '../../Icons';

import {
  Copy,
  Discord,
  Globe,
  Instagram,
  Telegram,
  Report,
  Twitter,
  Verticale,
  Share,
  Settings,
  Edit,
  Facebook,
  Code,
  Angle,
  Heart,
  User
} from '../../Icons';

import {
  AccountLinkFirst,
  AccountLinkFourth,
  AccountLinkSecond,
  AccountLinkThird,
  AccountLinkFifth
} from '../../Icons/AccountLink';

import { async } from '@firebase/util';

const ParticipantEvent = (props) => {
  let history = useHistory();

  const url = window.location.href;
  const [showCardActionmenu, setShowCardActionmenu] = useState(false);
  const onClick = () => setShowCardActionmenu(true);
  const [eventjoinPopup, setEventjoinPopup] = useState(false);
  const [active, setActive] = useState('');

  const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] =
    useState('');
  const manageSocialMediaDropdown = (type) => {
    if (showMediaeyeActionsSocial === type) {
      setShowMediaeyeActionsSocial('');
    } else {
      setShowMediaeyeActionsSocial(type);
    }
  };
  const socialMediaCloseOutSide = () => {
    setShowMediaeyeActionsSocial('');
  };
  useEffect(() => {
    if (showMediaeyeActionsSocial) {
      document.addEventListener('click', socialMediaCloseOutSide);
      return () =>
        document.removeEventListener('click', socialMediaCloseOutSide);
    }
  }, [showMediaeyeActionsSocial]);

  const toggleEventJoinPopup = () => {
    setEventjoinPopup(!eventjoinPopup);
  };
  const dispatch = useDispatch();

  const RelatedEventManage = (id) => {
    if (active === id) {
      setActive('');
    } else {
      setActive(id);
    }
  };

  const [twitter_Name, setTwitter_Name] = useState('HawksCode');
  const [twitter_Retweet, setTwitter_Retweet] = useState(
    'https://twitter.com/easy_shiksha/status/1498167042964619264?s=20&t=_7ODMgzX9iSS9VYpxPKHfA'
  );
  const [retweetwithhashtag_twitter, setRetweetwithhashtag_Twitter] =
    useState('#besttweet');
  const [spotify_artistName, setspotify_artistName] = useState('Ap dhillon');

  const eventBurn = {
    title: 'Burn Event',
    text: 'EVENT'
  };

  const RelatedEvents = [
    {
      id: 1,
      title: 'Discord Event',
      date: 'April 17,2022',
      time: '04 hr 24 min 48 sec',
      description:
        'Take the red bean to join the garden. View the collection at xxx.com/gallery.XXX starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Xxx holders receive access to exclusive drops, experiences, and more. Visit xxx.com for more details.'
    },
    {
      id: 2,
      title: 'Youtube Event',
      date: 'April 18,2022',
      time: '04 hr 24 min 48 sec',
      description:
        'Take the red bean to join the garden. View the collection at xxx.com/gallery.XXX starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Xxx holders receive access to exclusive drops, experiences, and more. Visit xxx.com for more details.'
    },
    {
      id: 3,
      title: 'Twitch Event',
      date: 'April 17,2022',
      time: '04 hr 24 min 48 sec',
      description:
        'Take the red bean to join the garden. View the collection at xxx.com/gallery.XXX starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Xxx holders receive access to exclusive drops, experiences, and more. Visit xxx.com for more details.'
    }
  ];

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/event/participant/'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Create and Schedule Unique Events Programmatically | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Creating Events on MEDIA EYE is easy! share your event across all major socials, add video and audio streaming, distribute announcements and invites with leading integrated mass marketing services. All done from one platform in minutes."
        />
        <meta
          property="og:image"
          content={window.location.origin + profileBanner}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/event/participant/"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/event/participant/'}
        />
        <meta
          name="twitter:title"
          content="Create and Schedule Unique Events Programmatically | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Creating Events on MEDIA EYE is easy! share your event across all major socials, add video and audio streaming, distribute announcements and invites with leading integrated mass marketing services. All done from one platform in minutes."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + profileBanner}
        />
        <title>
          Create and Schedule Unique Events Programmatically | MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Creating Events on MEDIA EYE is easy! share your event across all major socials, add video and audio streaming, distribute announcements and invites with leading integrated mass marketing services. All done from one platform in minutes."
        />
      </Helmet>
      <div className="mediaeye-layout-content">
        <EventJoinPopup
          eventjoinPopup={eventjoinPopup}
          toggleEventJoinPopup={toggleEventJoinPopup}
        />
        <div className="mediaeye-layout-middle">
          <img src={profileBanner} className="profileBanner" alt="Banner" />
        </div>
        <div className="mediaeye-layout-container">
          <div className="mediaeye-layout-container-eventhead">
            <img
              src={profileAvatar}
              className="mediaeye-layout-container-eventhead-profileAvatar"
              alt="Avatar"
            />
            <div className="mediaeye-layout-container-eventhead-detail">
              <div className="mediaeye-layout-container-eventhead-detail-info">
                <div className="mediaeye-layout-container-eventhead-detail-info-name">
                  <span> NFT Crypto Comicon </span>
                  <button className="btn btn-burn btn-sm">Live</button>
                  <button
                    className="btn btn-burn btn-sm"
                    onClick={(event) => {
                      dispatch(
                        toggleBurnPopup({
                          content: {
                            attributes: {
                              type: 'Event'
                              // name: nft?.title,
                              // image: nft?.img
                            },
                            file: { type: 'Event' }
                          }
                        })
                      );
                    }}
                  >
                    Burn Event
                  </button>
                </div>
                <div className="mediaeye-layout-container-eventhead-detail-account">
                  <div className="creator_account_main_header_info-setting">
                    <div
                      className={`mediaeye-actions mediaeye-actions-right ${showMediaeyeActionsSocial ? 'open' : ''
                        } `}
                      onClick={() => manageSocialMediaDropdown('')}
                    >
                      <div className="mediaeye-actions-header">
                        <div
                          className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'share'
                            ? 'active'
                            : ''
                            }`}
                          onClick={(event) => {
                            event.stopPropagation();
                            manageSocialMediaDropdown('share');
                          }}
                        >
                          <Share />
                        </div>
                        <div
                          className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'actions'
                            ? 'active'
                            : ''
                            }`}
                          onClick={() => history.push('/event/edit')}
                        >
                          <Edit />
                        </div>
                        <div
                          className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'actions'
                            ? 'active'
                            : ''
                            }`}
                          onClick={(event) => {
                            event.stopPropagation();
                            manageSocialMediaDropdown('actions');
                          }}
                        >
                          <Horizontal />
                        </div>
                      </div>
                      {showMediaeyeActionsSocial === 'share' ? (
                        <div className="mediaeye-actions-body">
                          <div
                            className="mediaeye-actions-body-row cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(url);
                            }}
                          >
                            <div className="mediaeye-actions-body-row-icon">
                              <Copy type="white" />
                            </div>
                            Copy Link
                          </div>
                          <TwitterShareButton
                            className="mediaeye-actions-body-row"
                            url={url}
                          >
                            <div className="mediaeye-actions-body-row-icon">
                              <Twitter />
                            </div>
                            Share on Twitter
                          </TwitterShareButton>
                          <FacebookShareButton
                            className="mediaeye-actions-body-row"
                            url={url}
                          >
                            <div className="mediaeye-actions-body-row-icon">
                              <Facebook type="circle" />
                            </div>
                            Share on Facebook
                          </FacebookShareButton>

                        </div>
                      ) : showMediaeyeActionsSocial === 'actions' ? (
                        <div className="mediaeye-actions-body">
                          <Link className="mediaeye-actions-body-row">
                            <div className="mediaeye-actions-body-row-icon">
                              <Report />
                            </div>
                            Report
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mediaeye-layout-container-eventhead-detail-data">
                <div className="mediaeye-layout-container-eventhead-detail-data-date">
                  <span className="mediaeye-layout-container-eventhead-detail-data-date-show">
                    17.04.2021 - 24.04.2021
                  </span>
                </div>
                <div className="mediaeye-layout-container-eventhead-detail-data-support">
                  <div>
                    <Heart />
                    <span>3k</span>
                  </div>
                  <div>
                    <User />
                    <span>100/555</span>
                  </div>
                </div>
                <div className="mediaeye-layout-container-eventhead-detail-data-social">
                  <div className="mediaeye-layout-container-eventhead-detail-data-social-connect">
                    <span className="mediaeye-layout-container-eventhead-detail-data-social-connect-accountimg">
                      {' '}
                      <AccountLinkFifth />
                    </span>
                    <h6 className="mediaeye-layout-container-eventhead-detail-data-social-connect-name">
                      Discord
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mediaeye-layout-container-eventhead-social">
            <div className="mediaeye-layout-container-eventhead-detail-data-choose">
              <div className="mediaeye-layout-container-eventhead-detail-data-choose-inside">
                <button className="mediaeye-layout-container-eventhead-detail-data-choose-inside-btn crypto">
                  Crypto
                </button>
                <button className="mediaeye-layout-container-eventhead-detail-data-choose-inside-btn media">
                  Media
                </button>
                <button className="mediaeye-layout-container-eventhead-detail-data-choose-inside-btn sports">
                  Sports
                </button>
              </div>
            </div>
            <div className="mediaeye-layout-container-eventhead-detail-data-connect">
              <div className="account_links">
                <a onClick={() => history.goBack()}>
                  <AccountLinkFirst />
                </a>
                <a href="/">
                  <AccountLinkSecond />
                </a>
                <a href="/">
                  <AccountLinkThird />
                </a>
                <a href="/">
                  <AccountLinkFourth />
                </a>
                <a href="/">
                  <AccountLinkFifth />
                </a>
              </div>
            </div>
          </div>
          <div className="mediaeye-layout-container-eventbody">
            <div className="mediaeye-layout-container-eventbody-description">
              <label className="mediaeye-layout-container-eventbody-description-title">
                Description:
              </label>
              <h6 className="mediaeye-layout-container-eventbody-description-info">
                Take the red bean to join the garden. View the collection at
                xxx.com/gallery.
                <br /> XXX starts with a collection of 10,000 avatars that give
                you membership access to The Garden: a corner of the internet
                where artists, builders, and web3 enthusiasts meet to create a
                decentralized future. Xxx holders receive access to exclusive
                drops, experiences, and more. Visit xxx.com for more details.
              </h6>
            </div>
            <div className="mediaeye-layout-container-eventbody-media">
              <label className="mediaeye-layout-container-eventbody-media-title">
                Embded Media
              </label>
              <iframe
                className="mediaeye-desc-video"
                src="https://www.youtube.com/embed/qfCNl1nntv8"
                title="Video Review"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mediaeye-layout-container-eventbody-collection">
              <label className="mediaeye-layout-container-eventbody-collection-title">
                Collections
              </label>
              <FeaturedCollection />
            </div>
            <Taskdetail />
            <div className="mediaeye-layout-container-eventbody-eventsocial">
              <label className="mediaeye-layout-container-eventbody-task-title">
                Related Events
              </label>
              <div className="mediaeye-layout-container-eventbody-eventsocial-box">
                {RelatedEvents.map((eventList) => (
                  <div
                    className={`mediaeye-layout-container-eventbody-eventsocial-box-inside ${active === eventList?.id ? 'active' : ''
                      } `}
                    onClick={() => RelatedEventManage(eventList?.id)}
                  >
                    <div className="mediaeye-layout-container-eventbody-eventsocial-box-inside-header">
                      <div className="mediaeye-layout-container-eventbody-eventsocial-box-inside-header-left">
                        <h5 className="mediaeye-layout-container-eventbody-eventsocial-box-inside-header-left-title">
                          {eventList.title}
                        </h5>
                        <h6 className="mediaeye-layout-container-eventbody-eventsocial-box-inside-header-left-date">
                          {eventList.date}
                        </h6>
                      </div>
                      <div className="mediaeye-layout-container-eventbody-eventsocial-box-inside-header-right">
                        <div className="mediaeye-layout-container-eventbody-eventsocial-box-inside-header-right-settime">
                          <h6 className="mediaeye-layout-container-eventbody-eventsocial-box-inside-header-right-settime-time">
                            {eventList.time}
                          </h6>

                          <div
                            className={`mediaeye-layout-container-eventbody-eventsocial-box-inside-header-right-settime-arrowset ${active === eventList?.id ? 'active' : ''
                              }`}
                          >
                            <Angle side="down" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {active === eventList?.id ? (
                      <div className="mediaeye-layout-container-eventbody-eventsocial-box-inside-body">
                        <div className="mediaeye-layout-container-eventbody-eventsocial-box-inside-body-description">
                          {eventList.description}
                        </div>
                        <div className="mediaeye-layout-container-eventbody-eventsocial-box-inside-body-conective">
                          <div className="mediaeye-layout-container-eventbody-eventsocial-box-inside-body-conective-inside">
                            <span className="mediaeye-layout-container-eventbody-eventsocial-box-inside-body-conective-inside-accountimg">
                              {' '}
                              <AccountLinkFifth />
                            </span>
                            <h6 className="mediaeye-layout-container-eventbody-eventsocial-box-inside-body-conective-inside-name">
                              Discord
                            </h6>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mediaeye-layout-container-eventbody-eventsocial-joinbox">
                <button
                  type="button"
                  onClick={() => toggleEventJoinPopup()}
                  className="btn btn-creative"
                >
                  JOIN
                </button>
              </div>
            </div>
            <div className="mediaeye-layout-container-eventbody-airdrop">
              <label className="mediaeye-layout-container-eventbody-airdrop-title">
                Airdrops & Bounties
              </label>
              <div className="mediaeye-layout-container-eventbody-airdrop-box">
                <FeaturedAirdop />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantEvent;
