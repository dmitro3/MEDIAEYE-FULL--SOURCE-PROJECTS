import React, { useState, useEffect, useRef } from 'react';
import SelectSearch from 'react-select-search';
import {
  Instagram,
  Telegram,
  Twitter,
  Linkedin,
  YouTube,
  Twitch,
  Spotify,
  Soundcloud,
  Clubhouse,
  Flickr,
  Edit,
  Globe,
  Discord,
  EditAvatar,
  Reddit,
  Tumblr,
  Vimeo,
  Hubspot,
  Sendgrid,
  Eventbrite,
  Mailchimp,
  Snapchat,
  Tiktok,
  Medium,
  Coinmarketcap,
  Coingecko
} from '../../Icons/';
import {
  getInstagramUser,
  getTwitterAPiUrl,
  getTwitterAuthVerify,
  getDiscordAPiUrl,
  getDiscordAuthVerify,
  getFlickrAPiUrl,
  getFlickrAuthVerify,
  getLinkedinAPiUrl,
  getLinkedinAuthVerify,
  getSpotifyAPiUrl,
  getSpotifyAuthVerify,
  getTelegramApiUrl,
  getTelegramAuthVerify,
  getTwitchAPiUrl,
  getTwitchAuthVerify
} from '../../../blockchain/functions/Profile/socialconnection';
import './AirdropTasks.scss';
import AirdropTaskField from './AirdropTaskField';
import TASKS from './Tasks';
import AirdropTaskSaved from './AirdropTaskSaved';
var validate = require('validate.js');

const typeSpotify = [
  {
    name: 'Artist',
    value: 'artist'
  },
  {
    name: 'User',
    value: 'user'
  }
];
const listSendgrid = [
  {
    name: 'List 1',
    value: 1
  },
  {
    name: 'List 2',
    value: 2
  },
  {
    name: 'List 3',
    value: 3
  }
];
const listMalichimp = [
  {
    name: 'List 1',
    value: 1
  },
  {
    name: 'List 2',
    value: 2
  },
  {
    name: 'List 3',
    value: 3
  }
];

const AirdropTasks = (props) => {
  const { tasksDict, setTasksDict } = props;
  const [selectedMedia, setSelectedMedia] = useState('');
  const [openDropdown, setDropdown] = useState('');
  const [ReweetUsername, setReweetUsername] = useState('');
  const [editBox, setEditBox] = useState('');
  const [activeListMalichimp, setActiveListMalichimp] = useState('Select...');
  const [activeListSendgrid, setActiveListSendgrid] = useState('Select...');
  const [activeTypeSpotify, setActiveTypeSpotify] = useState('Artist');
  const [currentFields, setCurrentFields] = useState({});
  const [currentTask, setCurrentTask] = useState('');
  const [currentMedia, setCurrentMedia] = useState('');
  const [properties, setProperties] = useState(0);
  const airdropAddSocial = useRef();

  var constraints = {
    name: {
      presence: true
    }
  };

  const [airdropTasksFromId, setAirdropTasksFromId] = useState(
    'mediaeye-airdrop-tasks-form'
  );
  const [airdropTaskInputError, setAirdropTaskInputError] = useState([]);

  const onTaskSaved = (task, media, params) => {
    var form = document.querySelector(`#${airdropTasksFromId}`);
    var errors = validate(form, constraints);
    setAirdropTaskInputError(errors);
    if (errors == undefined) {
      let newTaskList = { ...tasksDict };
      // checks if media exists before calling a nested task, otherwise adds media to dict
      if (!(typeof newTaskList[media] === 'object')) {
        newTaskList[media] = {};
      }
      newTaskList[media][`${task}`] = params;
      setTasksDict(newTaskList);
      setDropdown('');
      setEditBox(task);
      // reset current task fields
      setCurrentFields({});
      setCurrentTask('');
      setCurrentMedia('');
    }
  };

  const SocialMediaDropdownManage = (type) => {
    if (selectedMedia === type) {
      setSelectedMedia('');
    } else {
      setSelectedMedia(type);
    }
  };

  const socialTasksCloseOutSide = () => {
    setSelectedMedia('');
  };

  useEffect(() => {
    if (selectedMedia) {
      document.addEventListener('click', socialTasksCloseOutSide);
      return () =>
        document.removeEventListener('click', socialTasksCloseOutSide);
    }
  }, [selectedMedia]);

  const onClickDropdownTask = (media, task) => {
    if (currentMedia === media && currentTask === task) {
      setDropdown('');
      setCurrentTask('');
      setCurrentMedia('');
    } else {
      airdropAddSocial.current.scrollIntoView({ behavior: 'smooth' });
      setDropdown(task);
      setCurrentTask(task);
      setCurrentMedia(media);
    }
    setSelectedMedia('');
    setAirdropTaskInputError('');
  };

  const removeTask = (media, task) => {
    const currTasks = { ...tasksDict };
    delete currTasks[media][task];
    // if no keys exist remove the media key as well
    if (!Object.keys(currTasks[media]).length) {
      delete currTasks[media];
    }
    setTasksDict(currTasks);
    setEditBox('');
  };
  const addVideoListTwitch = (type) => {
    if (type === 'addVideolist') {
      setProperties(properties + 1);
    } else if (type === 'removeVideolist') {
      setProperties(properties - 1);
    }
  };

  const mapTaskList = () => {
    let tasksList = [];
    for (const media in tasksDict) {
      for (const task in tasksDict[media]) {
        tasksList.push(
          <AirdropTaskSaved
            task={task}
            media={media}
            params={tasksDict[media][task]}
            editBox={editBox}
            removeTask={removeTask}
          />
        );
      }
    }
    return tasksList;
  };

  const test = () => {
    return [...Array(properties)].map((e, i) => (
      <div className="mediaeyesocialtask-airsocial-socialmedia singlebox">
        <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft">
          <button className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-button btn twt">
            Twitch
          </button>
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title">
            <label>Video URL</label>
            <input type="text" placeholder="Watch a Featured Videolist" />
          </div>
        </div>
        <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight">
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight-plusbtn">
            <button
              onClick={() => addVideoListTwitch('addVideolist')}
              className=""
            >
              +
            </button>
          </div>
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight-plusbtn">
            <button
              onClick={() => addVideoListTwitch('removeVideolist')}
              className=""
            >
              -
            </button>
          </div>
          <button className="mediaeyesocialtask-airsocial-socialmedia-boxRight-button btn btn-info">
            Save
          </button>
        </div>
      </div>
    ));
  };
  return (
    <>
      <div className="mediaeyesocialtask-airsocial">
        <div className="mediaeyesocialtask-airsocial-col">
          <div className="mediaeyesocialtask-airsocial-col-row">
            <h4 className="mediaeyesocialtask-airsocial-col-row-title">
              Social Media
            </h4>
            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="twitter"
                type="button"
                onClick={() => SocialMediaDropdownManage('twitter')}
                className="mediaeyesocialtask-airsocial-col-row-btn twitter"
              >
                <Twitter />
                <span className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  TWITTER
                </span>
              </button>
              {selectedMedia === 'twitter' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TWITTER.TWITTER_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'TWITTER',
                        TASKS.TWITTER.TWITTER_FOLLOW.id
                      )
                    }
                  >
                    Follow on Twitter
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TWITTER.RETWEET.id}
                    onClick={() =>
                      onClickDropdownTask('TWITTER', TASKS.TWITTER.RETWEET.id)
                    }
                  >
                    Retweet
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TWITTER.RETWEET_HASHTAG.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'TWITTER',
                        TASKS.TWITTER.RETWEET_HASHTAG.id
                      )
                    }
                  >
                    Retweet with a hashtag
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="telegram"
                onClick={() => SocialMediaDropdownManage('telegram')}
                className="mediaeyesocialtask-airsocial-col-row-btn telegram"
              >
                <Telegram />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  TELEGRAM
                </p>
              </button>
              {selectedMedia === 'telegram' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TELEGRAM.JOIN_TEL.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'TELEGRAM',
                        TASKS.TELEGRAM.JOIN_TEL.id
                      )
                    }
                  >
                    Join a Channel/Group
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TELEGRAM.POST_TEL.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'TELEGRAM',
                        TASKS.TELEGRAM.POST_TEL.id
                      )
                    }
                  >
                    View a post
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="instagram"
                onClick={() => SocialMediaDropdownManage('instagram')}
                className="mediaeyesocialtask-airsocial-col-row-btn insta"
              >
                <Instagram />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  INSTAGRAM
                </p>
              </button>
              {selectedMedia === 'instagram' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.INSTAGRAM.INSTA_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'INSTAGRAM',
                        TASKS.INSTAGRAM.INSTA_FOLLOW.id
                      )
                    }
                  >
                    Follow on Instagram
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.INSTAGRAM.INSTA_LIKE.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'INSTAGRAM',
                        TASKS.INSTAGRAM.INSTA_LIKE.id
                      )
                    }
                  >
                    Like a post
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="linkedin"
                onClick={() => SocialMediaDropdownManage('linkedin')}
                className="mediaeyesocialtask-airsocial-col-row-btn linkedin"
              >
                <Linkedin />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  LINKEDIN
                </p>
              </button>
              {selectedMedia === 'linkedin' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.LINKEDIN.LINKEDIN_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'LINKEDIN',
                        TASKS.LINKEDIN.LINKEDIN_FOLLOW.id
                      )
                    }
                  >
                    Follow on LinkedIn
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="snapchat"
                onClick={() => SocialMediaDropdownManage('snapchat')}
                className="mediaeyesocialtask-airsocial-col-row-btn snapchat"
              >
                <Snapchat />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  SNAPCHAT
                </p>
              </button>
              {selectedMedia === 'snapchat' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.SNAPCHAT.SNAPCHAT_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'SNAPCHAT',
                        TASKS.SNAPCHAT.SNAPCHAT_FOLLOW.id
                      )
                    }
                  >
                    Follow on Snapchat
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mediaeyesocialtask-airsocial-col-row">
            <h4 className="mediaeyesocialtask-airsocial-col-row-title">
              Community and Blogging
            </h4>
            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="discord"
                onClick={() => SocialMediaDropdownManage('discord')}
                className="mediaeyesocialtask-airsocial-col-row-btn discord"
              >
                <Discord />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  DISCORD
                </p>
              </button>
              {selectedMedia === 'discord' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.DISCORD.JOIN_CHANNEL.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'DISCORD',
                        TASKS.DISCORD.JOIN_CHANNEL.id
                      )
                    }
                  >
                    Join a Channel
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="reddit"
                onClick={() => SocialMediaDropdownManage('reddit')}
                className="mediaeyesocialtask-airsocial-col-row-btn reddit"
                ref={airdropAddSocial}
              >
                <Reddit />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  REDDIT
                </p>
              </button>
              {selectedMedia === 'reddit' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.REDDIT.REDDIT_JOIN.id}
                    onClick={() =>
                      onClickDropdownTask('REDDIT', TASKS.REDDIT.REDDIT_JOIN.id)
                    }
                  >
                    Join a Community
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.REDDIT.REDDIT_SAVE.id}
                    onClick={() =>
                      onClickDropdownTask('REDDIT', TASKS.REDDIT.REDDIT_SAVE.id)
                    }
                  >
                    Save a post
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.REDDIT.REDDIT_COMMENT.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'REDDIT',
                        TASKS.REDDIT.REDDIT_COMMENT.id
                      )
                    }
                  >
                    Comment a post
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="tumblr"
                onClick={() => SocialMediaDropdownManage('tumblr')}
                className="mediaeyesocialtask-airsocial-col-row-btn tumbler"
              >
                <Tumblr />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  TUMBLR
                </p>
              </button>
              {selectedMedia === 'tumblr' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TUMBLR.TUMBLR_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'TUMBLR',
                        TASKS.TUMBLR.TUMBLR_FOLLOW.id
                      )
                    }
                  >
                    Follow on Tumblr
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TUMBLR.TUMBLR_LIKE.id}
                    onClick={() =>
                      onClickDropdownTask('TUMBLR', TASKS.TUMBLR.TUMBLR_LIKE.id)
                    }
                  >
                    Like a post
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TUMBLR.TUMBLR_COMMENT.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'TUMBLR',
                        TASKS.TUMBLR.TUMBLR_COMMENT.id
                      )
                    }
                  >
                    Comment a post
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="medium"
                onClick={() => SocialMediaDropdownManage('medium')}
                className="mediaeyesocialtask-airsocial-col-row-btn medium"
              >
                <Medium />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  MEDIUM
                </p>
              </button>
              {selectedMedia === 'medium' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.MEDIUM.MEDIUM_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'MEDIUM',
                        TASKS.MEDIUM.MEDIUM_FOLLOW.id
                      )
                    }
                  >
                    Follow on Medium
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.MEDIUM.MEDIUM_LIKE.id}
                    onClick={() =>
                      onClickDropdownTask('MEDIUM', TASKS.MEDIUM.MEDIUM_LIKE.id)
                    }
                  >
                    Clap/Like a Post
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.MEDIUM.MEDIUM_COMMENT.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'MEDIUM',
                        TASKS.MEDIUM.MEDIUM_COMMENT.id
                      )
                    }
                  >
                    Comment a Post
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mediaeyesocialtask-airsocial-col">
          <div className="mediaeyesocialtask-airsocial-col-row">
            <h4 className="mediaeyesocialtask-airsocial-col-row-title">
              E-mail Marketing
            </h4>
            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="mailchimp"
                onClick={() => SocialMediaDropdownManage('mailchimp')}
                className="mediaeyesocialtask-airsocial-col-row-btn mailchimp"
              >
                <Mailchimp />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  MAILCHIMP
                </p>
              </button>
              {selectedMedia === 'mailchimp' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.MAILCHIMP.MAILCHIMP_SUB.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'MAILCHIMP',
                        TASKS.MAILCHIMP.MAILCHIMP_SUB.id
                      )
                    }
                  >
                    Subscribe on Malichimp
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="hubspot"
                onClick={() => SocialMediaDropdownManage('hubspot')}
                className="mediaeyesocialtask-airsocial-col-row-btn hubspot"
              >
                <Hubspot />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  HUBSPOT
                </p>
              </button>
              {selectedMedia === 'hubspot' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.HUBSPOT.HUBSPOT_SUB.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'HUBSPOT',
                        TASKS.HUBSPOT.HUBSPOT_SUB.id
                      )
                    }
                  >
                    Subscribe on Hubspot
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="sendgrid"
                onClick={() => SocialMediaDropdownManage('sendgrid')}
                className="mediaeyesocialtask-airsocial-col-row-btn sendgrid"
              >
                <Sendgrid />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  SENDGRID
                </p>
              </button>
              {selectedMedia === 'sendgrid' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.SENDGRID.SENDGRID_SUB.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'SENDGRID',
                        TASKS.SENDGRID.SENDGRID_SUB.id
                      )
                    }
                  >
                    Subscribe on SendGrid
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mediaeyesocialtask-airsocial-col-row">
            <h4 className="mediaeyesocialtask-airsocial-col-row-title">
              Crypto Tracker
            </h4>
            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="coinmarketcap"
                onClick={() => SocialMediaDropdownManage('coinmarketcap')}
                className="mediaeyesocialtask-airsocial-col-row-btn coinmarketcap"
              >
                <Coinmarketcap />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  COINMARKETCAP
                </p>
              </button>
              {selectedMedia === 'coinmarketcap' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={
                      TASKS.COINMARKETCAP.COINMARKETCAP_WATCHLIST.id
                    }
                    onClick={() =>
                      onClickDropdownTask(
                        'COINMARKETCAP',
                        TASKS.COINMARKETCAP.COINMARKETCAP_WATCHLIST.id
                      )
                    }
                  >
                    Add to Watchlist
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="coingecko"
                onClick={() => SocialMediaDropdownManage('coingecko')}
                className="mediaeyesocialtask-airsocial-col-row-btn coingecko"
              >
                <Coingecko />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  COINGECKO
                </p>
              </button>
              {selectedMedia === 'coingecko' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.COINGECKO.COINGECKO_WATCHLIST.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'COINGECKO',
                        TASKS.COINGECKO.COINGECKO_WATCHLIST.id
                      )
                    }
                  >
                    Add to Watchlist
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mediaeyesocialtask-airsocial-col-row">
            <h4 className="mediaeyesocialtask-airsocial-col-row-title">
              Events Platforms
            </h4>
            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="eventbrite"
                onClick={() => SocialMediaDropdownManage('eventbrite')}
                className="mediaeyesocialtask-airsocial-col-row-btn eventbrite"
              >
                <Eventbrite />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  EVENTBRITE
                </p>
              </button>
              {selectedMedia === 'eventbrite' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.EVENTBRITE.EVENTBRITE_ATTEND.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'EVENTBRITE',
                        TASKS.EVENTBRITE.EVENTBRITE_ATTEND.id
                      )
                    }
                  >
                    Attend an Event
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mediaeyesocialtask-airsocial-col">
          <div className="mediaeyesocialtask-airsocial-col-row">
            <h4 className="mediaeyesocialtask-airsocial-col-row-title">
              Video & Audio Streaming
            </h4>
            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="twitch"
                onClick={() => SocialMediaDropdownManage('twitch')}
                className="mediaeyesocialtask-airsocial-col-row-btn twitch"
              >
                <Twitch />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  TWITCH
                </p>
              </button>
              {selectedMedia === 'twitch' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TWITCH.TWITCH_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'TWITCH',
                        TASKS.TWITCH.TWITCH_FOLLOW.id
                      )
                    }
                  >
                    Follow on Twitch
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown="VideoList_Twitch"
                    onClick={onClickDropdownTask}
                  >
                    Watch a Featured Videolist
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="spotify"
                onClick={() => SocialMediaDropdownManage('spotify')}
                className="mediaeyesocialtask-airsocial-col-row-btn spotify"
              >
                <Spotify />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  SPOTIFY
                </p>
              </button>
              {selectedMedia === 'spotify' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.SPOTIFY.SPOTIFY_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'SPOTIFY',
                        TASKS.SPOTIFY.SPOTIFY_FOLLOW.id
                      )
                    }
                  >
                    Follow on Spotify
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.SPOTIFY.SPOTIFY_LIKE.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'SPOTIFY',
                        TASKS.SPOTIFY.SPOTIFY_LIKE.id
                      )
                    }
                  >
                    Like a song
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="tiktok"
                onClick={() => SocialMediaDropdownManage('tiktok')}
                className="mediaeyesocialtask-airsocial-col-row-btn tiktok"
              >
                <Tiktok />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  TIKTOK
                </p>
              </button>
              {selectedMedia === 'tiktok' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.TIKTOK.TIKTOK_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'TIKTOK',
                        TASKS.TIKTOK.TIKTOK_FOLLOW.id
                      )
                    }
                  >
                    Follow on TikTok
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="youtube"
                onClick={() => SocialMediaDropdownManage('youtube')}
                className="mediaeyesocialtask-airsocial-col-row-btn youtube"
              >
                <YouTube />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  YOUTUBE
                </p>
              </button>
              {selectedMedia === 'youtube' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.YOUTUBE.YOUTUBE_SUB.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'YOUTUBE',
                        TASKS.YOUTUBE.YOUTUBE_SUB.id
                      )
                    }
                  >
                    Subscribe on YouTube
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.YOUTUBE.YOUTUBE_LIKE.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'YOUTUBE',
                        TASKS.YOUTUBE.YOUTUBE_LIKE.id
                      )
                    }
                  >
                    Like a video
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.YOUTUBE.YOUTUBE_COMMENT.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'YOUTUBE',
                        TASKS.YOUTUBE.YOUTUBE_COMMENT.id
                      )
                    }
                  >
                    Comment a video
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="vimeo"
                onClick={() => SocialMediaDropdownManage('vimeo')}
                className="mediaeyesocialtask-airsocial-col-row-btn vimeo"
              >
                <Vimeo />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  VIMEO
                </p>
              </button>
              {selectedMedia === 'vimeo' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.VIMEO.VIMEO_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask('VIMEO', TASKS.VIMEO.VIMEO_FOLLOW.id)
                    }
                  >
                    Follow a Channel
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.VIMEO.VIMEO_LIKE.id}
                    onClick={() =>
                      onClickDropdownTask('VIMEO', TASKS.VIMEO.VIMEO_LIKE.id)
                    }
                  >
                    Like a video
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="flickr"
                onClick={() => SocialMediaDropdownManage('flickr')}
                className="mediaeyesocialtask-airsocial-col-row-btn flicker"
              >
                <Flickr />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  FLICKR
                </p>
              </button>
              {selectedMedia === 'flickr' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.FLICKR.FLICKR_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'FLICKR',
                        TASKS.FLICKR.FLICKR_FOLLOW.id
                      )
                    }
                  >
                    Follow on Flickr
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.FLICKR.FLICKR_LIKE.id}
                    onClick={() =>
                      onClickDropdownTask('FLICKR', TASKS.FLICKR.FLICKR_LIKE.id)
                    }
                  >
                    Like a photo
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.FLICKR.FLICKR_COMMENT.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'FLICKR',
                        TASKS.FLICKR.FLICKR_COMMENT.id
                      )
                    }
                  >
                    Comment a photo
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="soundcloud"
                onClick={() => SocialMediaDropdownManage('soundcloud')}
                className="mediaeyesocialtask-airsocial-col-row-btn soundcloud"
              >
                <Soundcloud />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  SOUNDCLOUD
                </p>
              </button>
              {selectedMedia === 'soundcloud' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.SOUNDCLOUD.SOUNDCLOUD_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'SOUNDCLOUD',
                        TASKS.SOUNDCLOUD.SOUNDCLOUD_FOLLOW.id
                      )
                    }
                  >
                    Follow User
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.SOUNDCLOUD.SOUNDCLOUD_LIKE.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'SOUNDCLOUD',
                        TASKS.SOUNDCLOUD.SOUNDCLOUD_LIKE.id
                      )
                    }
                  >
                    Like Track or Playlist
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mediaeyesocialtask-airsocial-col-row-btnWrapper">
              <button
                value="clubhouse"
                onClick={() => SocialMediaDropdownManage('clubhouse')}
                className="mediaeyesocialtask-airsocial-col-row-btn clubhouse"
              >
                <Clubhouse />
                <p className="mediaeyesocialtask-airsocial-col-row-btn-name">
                  CLUBHOUSE
                </p>
              </button>
              {selectedMedia === 'clubhouse' ? (
                <div className="social-media-dropdown">
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.CLUBHOUSE.CLUBHOUSE_FOLLOW.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'CLUBHOUSE',
                        TASKS.CLUBHOUSE.CLUBHOUSE_FOLLOW.id
                      )
                    }
                  >
                    Follow User
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.CLUBHOUSE.CLUBHOUSE_CHANNEL.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'CLUBHOUSE',
                        TASKS.CLUBHOUSE.CLUBHOUSE_CHANNEL.id
                      )
                    }
                  >
                    Join Channel
                  </div>
                  <div
                    className="social-media-dropdown-value"
                    data-dropdown={TASKS.CLUBHOUSE.CLUBHOUSE_CLUB.id}
                    onClick={() =>
                      onClickDropdownTask(
                        'CLUBHOUSE',
                        TASKS.CLUBHOUSE.CLUBHOUSE_CLUB.id
                      )
                    }
                  >
                    Join Club
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {currentTask?.length > 0 && currentMedia?.length > 0 ? (
        <AirdropTaskField
          currentFields={currentFields}
          setCurrentFields={setCurrentFields}
          task={currentTask}
          media={currentMedia}
          params={TASKS[currentMedia][currentTask].params}
          onTaskSaved={onTaskSaved}
          onTaskCancel={onClickDropdownTask}
          airdropTasksFromId={airdropTasksFromId}
          airdropTaskInputError={airdropTaskInputError}
        />
      ) : null}

      {/*openDropdown === 'VideoList_Twitch' ? (
        <>
          <div className="mediaeyesocialtask-airsocial-socialmedia singlebox">
            <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft">
              <button className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-button btn twt">
                Twitch
              </button>
              <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title">
                <label className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title-label">
                  Video URL
                </label>
                <input
                  className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title-input"
                  type="text"
                  placeholder="Enter Video URL"
                />
              </div>
            </div>
            <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight">
              <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight-plusbtn">
                <button
                  onClick={() => addVideoListTwitch('addVideolist')}
                  className=""
                >
                  +
                </button>
              </div>
              <button className="mediaeyesocialtask-airsocial-socialmedia-boxRight-button btn btn-info">
                Save
              </button>
            </div>
          </div>
          {test()}
        </>
      ) : null*/}

      {/* openDropdown ? (
        <div className="mediaeyesocialtask-airsocial-socialmedia">
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft">
            <button className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-button btn spt">
              Spotify
            </button>
            <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title">
              <label className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title-label">
                Username
              </label>
              <input
                className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title-input"
                type="text"
                placeholder="Enter Username"
              />
            </div>
          </div>
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight">
            <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight-url">
              <label className="mediaeyesocialtask-airsocial-socialmedia-boxRight-url-label">
                Type
              </label>
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                size="lg"
                options={typeSpotify}
                value={activeTypeSpotify}
                placeholder={activeTypeSpotify}
                onChange={(opt) => setActiveTypeSpotify(opt)}
              />
            </div>
            <button className="mediaeyesocialtask-airsocial-socialmedia-boxRight-button btn btn-info">
              Save
            </button>
          </div>
        </div>
      ) : null*/}

      {/*openDropdown !== 'Subscribe_Malichimp' ? (
        <div className="mediaeyesocialtask-airsocial-socialmedia">
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft">
            <button className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-button btn mcp">
              Malichimp
            </button>
            <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title">
              <label className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title-label">
                API Key
              </label>
              <input
                className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title-input"
                type="text"
                placeholder="Enter API Key"
              />
            </div>
          </div>
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight">
            <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight-url">
              <label className="mediaeyesocialtask-airsocial-socialmedia-boxRight-url-label">
                Choose List
              </label>
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                size="lg"
                options={listMalichimp}
                value={activeListMalichimp}
                placeholder={activeListMalichimp}
                onChange={(opt) => setActiveListMalichimp(opt)}
              />
            </div>
            <button className="mediaeyesocialtask-airsocial-socialmedia-boxRight-button btn btn-info">
              Save
            </button>
          </div>
        </div>
      ) : null}
      {openDropdown !== 'Subscribe_Sendgrid' ? (
        <div className="mediaeyesocialtask-airsocial-socialmedia">
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft">
            <button className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-button btn sng">
              Sendgrid
            </button>
            <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title">
              <label className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title-label">
                API Key
              </label>
              <input
                className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-title-input"
                type="text"
                placeholder="Enter API Key"
              />
            </div>
          </div>
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight">
            <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight-url">
              <label className="mediaeyesocialtask-airsocial-socialmedia-boxRight-url-label">
                Choose List
              </label>
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                size="lg"
                options={listSendgrid}
                value={activeListSendgrid}
                placeholder={activeListSendgrid}
                onChange={(opt) => setActiveListSendgrid(opt)}
              />
            </div>
            <button className="mediaeyesocialtask-airsocial-socialmedia-boxRight-button btn btn-info">
              Save
            </button>
          </div>
        </div>
      ) : null*/}
      {/* ------------------------------------------- SAVE FIX ------------------------------------------*/}
      {mapTaskList()}

      {editBox === 'Retweet' ? (
        <div className="mediaeyesocialtask-airsocial-socialmedia editBox">
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft">
            <button className="btn ttr">Twitter</button>
            <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-edit">
              <input
                type="text"
                placeholder="Attend an Event"
                value={ReweetUsername}
              />
              <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft-edit-icon">
                <button onClick={() => { }}>
                  <Edit />
                </button>
              </div>
            </div>
          </div>
          <div className="mediaeyesocialtask-airsocial-socialmedia-boxRight">
            <button
              onClick={() => {
                removeTask(editBox);
              }}
              className=""
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AirdropTasks;
