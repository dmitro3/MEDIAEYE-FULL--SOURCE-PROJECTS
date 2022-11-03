import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import './ProfileMain.scss';
import { Helmet } from 'react-helmet';
import { Unstoppable } from '../../Icons/';
import UAuth from '@uauth/js';

import {
  Globe,
  Instagram,
  Upload,
  Telegram,
  Discord,
  Linkedin,
  Twitter,
  Spotify,
  Edit,
  Flickr,
  Twitch,
  QRCode,
  Copy,
  Chain
} from '../../Icons/';

import {
  follow_twitter_user,
  retweet_post,
  retweetwithhashtag_post,
  followspotify,
  likespotifysong,
  joinflickrgroup,
  likeflickrimage,
  commentflickrimage,
  followtwitch,
  joindiscordpage,
  tumblerfollow,
  tumblerlike,
  getfollowvimeo,
  getvimeovideolike,
  joinreddituser,
  commentredditpost,
  saveredditpost,
  tumblercomment,
  youtubauthverify,
  youtubechannelsubscribe,
  youtubevideolike,
  youtubevideocomment,
  snapchatauthverify,
  bitLy,
  bitLyVerify,
  shortLink,
  shortLinkQr
} from '../../../blockchain/functions/Airdrops/socialnetworkfunctioning';

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
  getTwitchAuthVerify,
  gettumblerauthverify,
  geteventbriteauthverify,
  getredditauthverify
} from '../../../blockchain/functions/Profile/socialconnection';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import SelectSearch from 'react-select-search';
import { async } from 'validate.js';

const ProfileMain = (props) => {
  let location = window.location;
  let url = new URL(location.href);
  let origin = url.origin;
  const uauth = new UAuth({
    clientID: 'd496a1c7-87d0-4c78-aa27-36b46484984c',
    redirectUri: origin,
    scope: 'openid wallet email profile social'
  });
  const {
    authenticate,
    isAuthenticated,
    user,
    setUserData,
    userError,
    isUserUpdating,
    Moralis
  } = useMoralis();
  const [username, setUsername] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [profileLinkqrCode, setprofileLinkqrCode] = useState('');
  const [copyProfileUrl, setCopyProfileUrl] = useState(false);
  const [bio, setBio] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [savePressed, setSavePressed] = useState(false);
  const [isUsernameError, setUsernameError] = useState(false);
  const [links, setLinks] = useState({
    instagram: '',
    twitter: '',
    website: '',
    websiteProtocol: 'http://',
    telegram: '',
    discord: '',
    spotify: '',
    linkedin: '',
    flickr: '',
    twitch: ''
  });
  const [twitterName, setTwitterName] = useState('Twitter');
  const [discordName, setDiscordName] = useState('Discord');
  const [instagramName, setInstagramName] = useState('Instagram');
  const [telegramcodehash, setTelegramcodehash] = useState(null);
  const [telegramnumber, settelegramnumber] = useState(null);
  const [telegramName, setTelegramName] = useState('Telegram');
  const [userInstaInput, setUserInstaInput] = useState('');
  const [instaUser, setInstaUser] = useState('');
  const [instaPassword, setInstaPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [openInput, setOpenInput] = useState(false);
  const [otpInput, setOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [countryCode, setCountryCode] = useState('+');
  const [webProtocol, setWebProtocol] = useState('https://');
  const protocolOptions = [
    { name: 'https', value: 'https://' },
    { name: 'http', value: 'http://' }
  ];
  const regexErrors = [
    'username must start and end with an alphanumeric',
    'username _ or . cannot be followed by a _ or .',
    'username may not contain special characters excluding _ or .',
    'username must contain 6-50 characters'
  ];

  const usernameRegex = new RegExp(
    '^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,48}[a-zA-Z0-9]$'
  );

  const fullnameRegex = new RegExp(
    /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/
  );
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  );

  const instaUserRegex = new RegExp(/@(?:[\w][\.]{0,1})*[\w]/);
  const twitterUserRegex = new RegExp(/^@[a-zA-Z0-9_]{4,15}$/);
  const websiteRegex = new RegExp(
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
  );

  const getSocialMediaButtonText = (socialMedia) => {
    return socialMedia === '' ? 'Connect' : '@' + socialMedia;
  };

  // handle result based on error
  useEffect(() => {
    if (userError) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: userError?.message,
          size: 'sm',
          textButton: 'OK'
        })
      );
    } else if (savePressed) {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: 'Profile Updated',
          size: 'sm',
          textButton: 'OK'
        })
      );
      setSavePressed(false);
    }
  }, [userError, savePressed]);

  useEffect(() => {
    if (copyProfileUrl === true) {
      setTimeout(() => {
        setCopyProfileUrl(false);
      }, 3000);
    }
  }, [copyProfileUrl]);

  useEffect(() => {
    if (user) {
      setUsername(
        user?.attributes?.defaultUsername
          ? user?.attributes?.username
          : user?.attributes?.username
      );
      if (user?.attributes?.links) {
        setLinks(user.attributes.links);
      }
      if (user?.attributes?.bio) {
        setBio(user.attributes.bio);
      }
      if (user?.attributes?.email) {
        setEmail(user.attributes.email);
      }
      if (user?.attributes?.fullName) {
        setFullName(user.attributes.fullName);
      }
    }
  }, [user]);

  useEffect(async () => {
    let location = window.location;
    window.stop();
    let url = new URL(location.href);
    let mainurl = url.href;
    let snapverify = url.searchParams.get('state');
    let snapcode = url.searchParams.get('code');

    if (mainurl.includes('twitter') === true) {
      let oauth_token = url.searchParams.get('oauth_token');
      let oauth_verifier = url.searchParams.get('oauth_verifier');
      let requestSecret = localStorage.getItem('twittersecretkey');

      if (oauth_token && oauth_verifier && requestSecret) {
        let apidata = await getTwitterAuthVerify(
          oauth_token,
          oauth_verifier,
          requestSecret
        );

        if (apidata && apidata.key === 1) {
          let retweet = localStorage.getItem('retweet');
          let follow_twitter = localStorage.getItem('follow_twitter');
          let retweetwithhashtag = localStorage.getItem('retweetwithhashtag');
          let twitter_username = apidata.display_name.screen_name;

          if (follow_twitter === 'true') {
            let follow_twitter_username = localStorage.getItem(
              'follow_twitter_username'
            );

            let accessToken = apidata.display_name.accessToken;
            let accessSecret = apidata.display_name.accessSecret;
            let id = apidata.display_name.id;

            let followapidata = await follow_twitter_user(
              follow_twitter_username,
              accessToken,
              accessSecret,
              id
            );
            if (followapidata.key === 1) {
              localStorage.removeItem('follow_twitter');
              localStorage.removeItem('twittersecretkey');
              localStorage.removeItem('follow_twitter_username');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: followapidata.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('follow_twitter');
              localStorage.removeItem('twittersecretkey');
              localStorage.removeItem('follow_twitter_username');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (retweet === 'true') {
            let postlink = localStorage.getItem('retweetpostlink');
            let accessToken = apidata.display_name.accessToken;
            let accessSecret = apidata.display_name.accessSecret;
            let postlinkapidata = await retweet_post(
              accessToken,
              accessSecret,
              postlink
            );

            if (postlinkapidata && postlinkapidata.key === 1) {
              localStorage.removeItem('retweet');
              localStorage.removeItem('retweetpostlink');
              localStorage.removeItem('twittersecretkey');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: postlinkapidata.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('retweet');
              localStorage.removeItem('retweetpostlink');
              localStorage.removeItem('twittersecretkey');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (retweetwithhashtag === 'true') {
            let postlink = localStorage.getItem('retweetpostlink');
            let retweetpostlinktag = localStorage.getItem(
              'retweetpostlinktagtext'
            );
            let accessToken = apidata.display_name.accessToken;
            let accessSecret = apidata.display_name.accessSecret;
            let retweetwithhashtagg = await retweetwithhashtag_post(
              accessToken,
              accessSecret,
              postlink,
              retweetpostlinktag
            );
            if (retweetwithhashtagg.key === 1) {
              localStorage.removeItem('retweetpostlink');
              localStorage.removeItem('twittersecretkey');
              localStorage.removeItem('retweetwithhashtag');
              localStorage.removeItem('retweetpostlinktagtext');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: retweetwithhashtagg.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('retweetpostlink');
              localStorage.removeItem('twittersecretkey');
              localStorage.removeItem('retweetwithhashtag');
              localStorage.removeItem('retweetpostlinktagtext');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else {
            localStorage.removeItem('twittersecretkey');
            updateLinks('twitter', twitter_username);

            dispatch(
              toggleGeneralPopup({
                status: 'success',
                // message: `Great! you connected with @${twitter_username}`,
                message: `Your Twitter has been connected to your profile @${twitter_username}`,
                textButton: 'OK',
                size: 'sm'
              })
            );

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          localStorage.removeItem('retweet');
          localStorage.removeItem('follow_twitter');
          localStorage.removeItem('retweetpostlink');
          localStorage.removeItem('twittersecretkey');
          localStorage.removeItem('retweetwithhashtag');
          localStorage.removeItem('retweetpostlinktagtext');
          localStorage.removeItem('follow_twitter_username');

          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );

          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        localStorage.removeItem('retweet');
        localStorage.removeItem('follow_twitter');
        localStorage.removeItem('retweetpostlink');
        localStorage.removeItem('twittersecretkey');
        localStorage.removeItem('retweetwithhashtag');
        localStorage.removeItem('retweetpostlinktagtext');
        localStorage.removeItem('follow_twitter_username');

        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (mainurl.includes('discord') === true) {
      let verify = url.searchParams.get('code');
      if (verify) {
        let apidata = await getDiscordAuthVerify(verify);
        if (apidata.key === 1) {
          let discord_username = apidata.display_name.username;

          let joindiscord = localStorage.getItem('joindiscord');
          updateLinks('discord', discord_username);

          if (joindiscord === 'true') {
            let accesskey = apidata.display_name.accesskey;
            let discordpagename = localStorage.getItem('discordpagename');
            let joindiscordres = await joindiscordpage(
              accesskey,
              discordpagename
            );

            if (joindiscordres.key === 1) {
              localStorage.removeItem('joindiscord');
              localStorage.removeItem('discordpagename');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: joindiscordres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('joindiscord');
              localStorage.removeItem('discordpagename');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else {
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                // message: `Great! you connected with @${discord_username}`,
                message: `Your Discord has been connected to your profile @${discord_username}`,
                textButton: 'OK',
                size: 'sm'
              })
            );

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          localStorage.removeItem('joindiscord');
          localStorage.removeItem('discordpagename');

          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );

          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        localStorage.removeItem('joindiscord');
        localStorage.removeItem('discordpagename');

        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (mainurl.includes('linkedin') === true) {
      let verify = url.searchParams.get('code');
      if (verify) {
        let apidata = await getLinkedinAuthVerify(verify);
        if (apidata && apidata.key === 1) {
          let linkedin_username = apidata.display_name.username;
          let followlinkedin = localStorage.getItem('followlinkedin');
          updateLinks('linkedin', linkedin_username);

          if (followlinkedin === 'true') {
            let url = localStorage.getItem('linkedinpageId');

            localStorage.removeItem('followlinkedin');
            localStorage.removeItem('linkedinpageId');

            window.open(url);

            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: `Start Following`,
                textButton: 'OK',
                size: 'sm'
              })
            );

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          } else {
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                // message: `Great! you connected with @${linkedin_username}`,
                message: `Your Linkedin has been connected to your profile @${linkedin_username}`,
                textButton: 'OK',
                size: 'sm'
              })
            );

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          localStorage.removeItem('followlinkedin');
          localStorage.removeItem('linkedinpageId');

          dispatch(
            toggleGeneralPopup({
              status: 'success',
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );

          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        localStorage.removeItem('followlinkedin');
        localStorage.removeItem('linkedinpageId');

        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (mainurl.includes('spotify') === true) {
      let verify = url.searchParams.get('code');
      if (verify) {
        let apidata = await getSpotifyAuthVerify(verify);
        if (apidata.key === 1) {
          let spotify_username = apidata.display_name.display_name;
          let spotifyfollow = localStorage.getItem('followspotify');
          let likesongspotify = localStorage.getItem('likespotifysong');
          updateLinks('spotify', spotify_username);

          if (spotifyfollow === 'true') {
            let accessToken = apidata.display_name.accesstoken;
            let artistId = localStorage.getItem('spotify_artistName');
            let followartist = await followspotify(accessToken, artistId);

            if (followartist.key === 1) {
              localStorage.removeItem('followspotify');
              localStorage.removeItem('spotify_artistName');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: followartist.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('followspotify');
              localStorage.removeItem('spotify_artistName');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (likesongspotify === 'true') {
            let accessToken = apidata.display_name.accesstoken;
            let songId = localStorage.getItem('liksepotifysongId');
            let likesongspotifysong = await likespotifysong(
              accessToken,
              songId
            );

            if (likesongspotifysong.key === 1) {
              localStorage.removeItem('likespotifysong');
              localStorage.removeItem('liksepotifysongId');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: likesongspotifysong.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('likespotifysong');
              localStorage.removeItem('liksepotifysongId');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else {
            localStorage.removeItem('followspotify');
            localStorage.removeItem('likespotifysong');
            localStorage.removeItem('liksepotifysongId');
            localStorage.removeItem('spotify_artistName');

            dispatch(
              toggleGeneralPopup({
                status: 'success',
                // message: `Great! you connected with @${spotify_username}`,
                message: `Your Spotify has been connected to your profile @${spotify_username}`,
                textButton: 'OK',
                size: 'sm'
              })
            );

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          localStorage.removeItem('followspotify');
          localStorage.removeItem('likespotifysong');
          localStorage.removeItem('liksepotifysongId');
          localStorage.removeItem('spotify_artistName');

          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );

          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        localStorage.removeItem('followspotify');
        localStorage.removeItem('likespotifysong');
        localStorage.removeItem('liksepotifysongId');
        localStorage.removeItem('spotify_artistName');

        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (mainurl.includes('flickr') === true) {
      let oauth_token = url.searchParams.get('oauth_token');
      let oauth_verifier = url.searchParams.get('oauth_verifier');
      let requestSecret = localStorage.getItem('flickrsecretkey');
      if (oauth_token && oauth_verifier && requestSecret) {
        let apidata = await getFlickrAuthVerify(
          oauth_token,
          oauth_verifier,
          requestSecret
        );
        if (apidata && apidata.key === 1) {
          let flickr_username = apidata.display_name.username;
          let joinflickr = localStorage.getItem('joinflickr');
          let likeflickr = localStorage.getItem('likeflickrimage');
          let commentflickr = localStorage.getItem('commentflickrimage');
          if (joinflickr === 'true') {
            let accessToken = apidata.display_name.oauth_token;
            let accessSecret = apidata.display_name.oauth_token_secret;
            let flickrgroupName = localStorage.getItem('flickrgroupname');
            let flickrgroupNameres = await joinflickrgroup(
              accessToken,
              accessSecret,
              flickrgroupName
            );
            if (flickrgroupNameres && flickrgroupNameres.key == 1) {
              localStorage.removeItem('flickrgroupname');
              localStorage.removeItem('flickrsecretkey');
              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: flickrgroupNameres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('flickrgroupname');
              localStorage.removeItem('flickrsecretkey');
              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (likeflickr === 'true') {
            let accessToken = apidata.display_name.oauth_token;
            let accessSecret = apidata.display_name.oauth_token_secret;
            let flickrimage = localStorage.getItem('flickrimage');
            let flickrlikeimageres = await likeflickrimage(
              accessToken,
              accessSecret,
              flickrimage
            );
            if (flickrlikeimageres && flickrlikeimageres.key == 1) {
              localStorage.removeItem('flickrimage');
              localStorage.removeItem('flickrsecretkey');
              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: flickrlikeimageres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('flickrimage');
              localStorage.removeItem('flickrsecretkey');
              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (commentflickr === 'true') {
            let accessToken = apidata.display_name.oauth_token;
            let accessSecret = apidata.display_name.oauth_token_secret;
            let flickr_commentimage = localStorage.getItem(
              'flickr_commentimage'
            );
            let flickr_commenttxt = localStorage.getItem('flickr_commenttxt');
            let flickrcommentimageres = await commentflickrimage(
              accessToken,
              accessSecret,
              flickr_commentimage,
              flickr_commenttxt
            );
            if (flickrcommentimageres && flickrcommentimageres.key == 1) {
              localStorage.removeItem('flickr_commentimage');
              localStorage.removeItem('flickr_commenttxt');
              localStorage.removeItem('flickrsecretkey');
              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: flickrcommentimageres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('flickr_commentimage');
              localStorage.removeItem('flickr_commenttxt');
              localStorage.removeItem('flickrsecretkey');
              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else {
            /////////////You can call Webservice to store FLICKR username here and get FLICKR Username from Variable flickr_username/////////
            updateLinks('flickr', flickr_username);
            localStorage.removeItem('flickrsecretkey');
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                // message: `Great! you connected with @${flickr_username}`,
                message: `Your Flickr has been connected to your profile @${flickr_username}`,
                textButton: 'OK',
                size: 'sm'
              })
            );
          }
        } else {
          localStorage.removeItem('flickrsecretkey');
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );
          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      }
    } else if (mainurl.includes('twitch') === true) {
      let verifyurl = url.hash;
      let verify = verifyurl.substr(14, 30);
      if (verify) {
        let apidata = await getTwitchAuthVerify(verify);

        if (apidata && apidata.key === 1) {
          let twitch_username = apidata.display_name.username;
          let followtwitchres = localStorage.getItem('followtwitch');
          updateLinks('twitch', twitch_username);

          if (followtwitchres === 'true') {
            let twitchchannelId = localStorage.getItem('followtwitchname');
            let followtwitchuserres = await followtwitch(
              verify,
              twitchchannelId
            );

            if (followtwitchuserres.key === 1) {
              localStorage.removeItem('followtwitch');
              localStorage.removeItem('followtwitchname');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: followtwitchuserres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('followtwitch');
              localStorage.removeItem('followtwitchname');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else {
            localStorage.removeItem('followtwitch');
            localStorage.removeItem('followtwitchname');

            dispatch(
              toggleGeneralPopup({
                status: 'success',
                // message: `Great! you connected with @${twitch_username}`,
                message: `Your Twitch has been connected to your profile @${twitch_username}`,
                textButton: 'OK',
                size: 'sm'
              })
            );

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          localStorage.removeItem('followtwitch');
          localStorage.removeItem('followtwitchname');

          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );

          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        localStorage.removeItem('followtwitch');
        localStorage.removeItem('followtwitchname');

        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (mainurl.includes('tumbler') === true) {
      let oauth_token = url.searchParams.get('oauth_token');
      let oauth_verifier = url.searchParams.get('oauth_verifier');
      let tumbleroauthTokenSecret = localStorage.getItem(
        'tumbleroauthTokenSecret'
      );

      if (oauth_token && oauth_verifier && tumbleroauthTokenSecret) {
        let apidata = await gettumblerauthverify(
          oauth_token,
          oauth_verifier,
          tumbleroauthTokenSecret
        );
        if (apidata && apidata.key === 1) {
          let _oauthAccessToken = apidata._oauthAccessToken;
          let _oauthAccessTokenSecret = apidata._oauthAccessTokenSecret;

          let followtumbler = localStorage.getItem('followtumbler');
          let liketumbler = localStorage.getItem('liketumbler');
          let commenttumbler = localStorage.getItem('commenttumbler');

          if (followtumbler === 'true') {
            let followtumblername = localStorage.getItem('followtumblername');

            let followtumblerres = await tumblerfollow(
              _oauthAccessToken,
              _oauthAccessTokenSecret,
              followtumblername
            );
            if (followtumblerres && followtumblerres.key === 1) {
              localStorage.removeItem('followtumbler');
              localStorage.removeItem('followtumblername');
              localStorage.removeItem('tumbleroauthTokenSecret');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: followtumblerres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('followtumbler');
              localStorage.removeItem('followtumblername');
              localStorage.removeItem('tumbleroauthTokenSecret');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (liketumbler === 'true') {
            let tumblerlikeimageId = localStorage.getItem('tumblerlikeimageId');
            let reblog_key = localStorage.getItem('reblog_key');
            let liketumblerres = await tumblerlike(
              _oauthAccessToken,
              _oauthAccessTokenSecret,
              tumblerlikeimageId,
              reblog_key
            );
            if (liketumblerres && liketumblerres.key === 1) {
              localStorage.removeItem('reblog_key');
              localStorage.removeItem('liketumbler');
              localStorage.removeItem('tumblerlikeimageId');
              localStorage.removeItem('tumbleroauthTokenSecret');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: liketumblerres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('reblog_key');
              localStorage.removeItem('liketumbler');
              localStorage.removeItem('tumblerlikeimageId');
              localStorage.removeItem('tumbleroauthTokenSecret');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (commenttumbler === 'true') {
            let tumblerlog = localStorage.getItem('tumblerlog');
            let reblog_key = localStorage.getItem('reblog_key');
            let commenttxt = localStorage.getItem('commenttxt');
            let tumblerlikeimageId = localStorage.getItem('tumblerlikeimageId');
            let tumblercommentres = await tumblercomment(
              _oauthAccessToken,
              _oauthAccessTokenSecret,
              tumblerlikeimageId,
              reblog_key,
              tumblerlog,
              commenttxt
            );

            if (tumblercommentres && tumblercommentres.key === 1) {
              localStorage.removeItem('commenttxt');
              localStorage.removeItem('reblog_key');
              localStorage.removeItem('tumblerlog');
              localStorage.removeItem('commenttumbler');
              localStorage.removeItem('tumblerlikeimageId');
              localStorage.removeItem('tumbleroauthTokenSecret');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: tumblercommentres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('commenttxt');
              localStorage.removeItem('reblog_key');
              localStorage.removeItem('tumblerlog');
              localStorage.removeItem('commenttumbler');
              localStorage.removeItem('tumblerlikeimageId');
              localStorage.removeItem('tumbleroauthTokenSecret');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else {
            localStorage.removeItem('commenttxt');
            localStorage.removeItem('tumblerlog');
            localStorage.removeItem('reblog_key');
            localStorage.removeItem('liketumbler');
            localStorage.removeItem('followtumbler');
            localStorage.removeItem('commenttumbler');
            localStorage.removeItem('followtumblername');
            localStorage.removeItem('tumblerlikeimageId');
            localStorage.removeItem('tumbleroauthTokenSecret');

            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Something Went Wrong!',
                textButton: 'OK',
                size: 'sm'
              })
            );

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          localStorage.removeItem('commenttxt');
          localStorage.removeItem('tumblerlog');
          localStorage.removeItem('reblog_key');
          localStorage.removeItem('liketumbler');
          localStorage.removeItem('followtumbler');
          localStorage.removeItem('commenttumbler');
          localStorage.removeItem('followtumblername');
          localStorage.removeItem('tumblerlikeimageId');
          localStorage.removeItem('tumbleroauthTokenSecret');

          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );

          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        localStorage.removeItem('commenttxt');
        localStorage.removeItem('tumblerlog');
        localStorage.removeItem('reblog_key');
        localStorage.removeItem('liketumbler');
        localStorage.removeItem('followtumbler');
        localStorage.removeItem('commenttumbler');
        localStorage.removeItem('followtumblername');
        localStorage.removeItem('tumblerlikeimageId');
        localStorage.removeItem('tumbleroauthTokenSecret');

        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (mainurl.includes('eventbrite') === true) {
      let verify = url.searchParams.get('code');
      if (verify) {
        let apidata = await geteventbriteauthverify(verify);
        if (apidata.key === 1) {
          let eventbrite_name = apidata.name;
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              message: 'Join success',
              textButton: 'OK',
              size: 'sm'
            })
          );
          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );

          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (mainurl.includes('vimeo') === true) {
      let verifyurl = url.hash;
      let verify = verifyurl.substr(14, 32);
      if (verify) {
        let followvimeo = localStorage.getItem('followvimeo');
        let likevimeo = localStorage.getItem('likevimeovideo');
        if (followvimeo === 'true') {
          let followvimeouser = localStorage.getItem('followvimeouser');
          let followvimeores = await getfollowvimeo(verify, followvimeouser);
          if (followvimeores.key === 1) {
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: followvimeores.message,
                textButton: 'OK',
                size: 'sm'
              })
            );

            localStorage.removeItem('followvimeo');
            localStorage.removeItem('followvimeouser');

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          } else {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Something Went Wrong',
                textButton: 'OK',
                size: 'sm'
              })
            );

            localStorage.removeItem('followvimeo');
            localStorage.removeItem('followvimeouser');

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else if (likevimeo === 'true') {
          let likevimeovideoId = localStorage.getItem('likevimeovideoId');
          let likevimeovideoIdres = await getvimeovideolike(
            verify,
            likevimeovideoId
          );
          if (likevimeovideoIdres.key === 1) {
            localStorage.removeItem('likevimeovideo');
            localStorage.removeItem('likevimeovideoId');

            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: likevimeovideoIdres.message,
                textButton: 'OK',
                size: 'sm'
              })
            );

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          } else {
            localStorage.removeItem('likevimeovideo');
            localStorage.removeItem('likevimeovideoId');

            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Something Went Wrong',
                textButton: 'OK',
                size: 'sm'
              })
            );

            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          localStorage.removeItem('followvimeo');
          localStorage.removeItem('likevimeovideo');
          localStorage.removeItem('followvimeouser');
          localStorage.removeItem('likevimeovideoId');

          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );

          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        localStorage.removeItem('followvimeo');
        localStorage.removeItem('likevimeovideo');
        localStorage.removeItem('followvimeouser');
        localStorage.removeItem('likevimeovideoId');

        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (mainurl.includes('reddit') === true) {
      let verify = url.searchParams.get('code');
      if (verify) {
        let apidata = await getredditauthverify(verify);
        if (apidata && apidata.key === 1) {
          let joinreddit = localStorage.getItem('joinreddit');
          let commentreddit = localStorage.getItem('commentreddit');
          let savereddit = localStorage.getItem('savereddit');

          if (joinreddit === 'true') {
            let joinredditusername = localStorage.getItem('joinredditusername');
            let joinredditusernameres = await joinreddituser(
              joinredditusername
            );

            if (joinredditusernameres && joinredditusernameres.key === 1) {
              localStorage.removeItem('joinreddit');
              localStorage.removeItem('joinredditusername');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: joinredditusernameres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('joinreddit');
              localStorage.removeItem('joinredditusername');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (commentreddit === 'true') {
            let commentText = localStorage.getItem('commentText');
            let redditpostid = localStorage.getItem('saveredditpostid');
            let redditcommentres = await commentredditpost(
              redditpostid,
              commentText
            );

            if (redditcommentres && redditcommentres.key === 1) {
              localStorage.removeItem('commentreddit');
              localStorage.removeItem('commentText');
              localStorage.removeItem('saveredditpostid');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: redditcommentres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('commentreddit');
              localStorage.removeItem('commentText');
              localStorage.removeItem('saveredditpostid');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (savereddit === 'true') {
            let saveredditpostid = localStorage.getItem('saveredditpostid');
            let saveredditpostidres = await saveredditpost(saveredditpostid);
            if (saveredditpostidres && saveredditpostidres.key === 1) {
              localStorage.removeItem('savereddit');
              localStorage.removeItem('saveredditpostid');

              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: saveredditpostidres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('savereddit');
              localStorage.removeItem('saveredditpostid');

              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong',
                  textButton: 'OK',
                  size: 'sm'
                })
              );

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else {
            localStorage.removeItem('savereddit');
            localStorage.removeItem('joinreddit');
            localStorage.removeItem('commentText');
            localStorage.removeItem('commentreddit');
            localStorage.removeItem('saveredditpostid');
            localStorage.removeItem('joinredditusername');

            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Something Went Wrong',
                textButton: 'OK',
                size: 'sm'
              })
            );
            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          localStorage.removeItem('savereddit');
          localStorage.removeItem('joinreddit');
          localStorage.removeItem('commentText');
          localStorage.removeItem('commentreddit');
          localStorage.removeItem('saveredditpostid');
          localStorage.removeItem('joinredditusername');

          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong',
              textButton: 'OK',
              size: 'sm'
            })
          );

          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        localStorage.removeItem('savereddit');
        localStorage.removeItem('joinreddit');
        localStorage.removeItem('commentText');
        localStorage.removeItem('commentreddit');
        localStorage.removeItem('saveredditpostid');
        localStorage.removeItem('joinredditusername');

        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (mainurl.includes('youtube') === true) {
      let verify = url.searchParams.get('code');
      if (verify) {
        let apidata = await youtubauthverify(verify);
        if (apidata && apidata.key === 1) {
          let youtubechannelsubscribecheck = localStorage.getItem(
            'subscribeyoutubechannel'
          );
          let likeyoutubevideo = localStorage.getItem('likeyoutubevideo');
          let commentyoutubevideo = localStorage.getItem('commentyoutubevideo');
          if (youtubechannelsubscribecheck === 'true') {
            let subscribeyoutubechannelId = localStorage.getItem(
              'subscribeyoutubechannelId'
            );
            let subscribeyoutubechanneres = await youtubechannelsubscribe(
              subscribeyoutubechannelId
            );
            if (subscribeyoutubechanneres.key === 1) {
              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: subscribeyoutubechanneres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              localStorage.removeItem('subscribeyoutubechannel');
              localStorage.removeItem('subscribeyoutubechannelId');
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('subscribeyoutubechannel');
              localStorage.removeItem('subscribeyoutubechannelId');
              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong',
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (likeyoutubevideo === 'true') {
            let likeyoutubevideoId = localStorage.getItem('likeyoutubevideoId');
            let likeyoutubevideoIdres = await youtubevideolike(
              likeyoutubevideoId
            );
            if (likeyoutubevideoIdres.key === 1) {
              localStorage.removeItem('likeyoutubevideoId');
              localStorage.removeItem('likeyoutubevideo');
              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: likeyoutubevideoIdres.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              localStorage.removeItem('likeyoutubevideoId');
              localStorage.removeItem('likeyoutubevideo');
              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong',
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else if (commentyoutubevideo === 'true') {
            let videoId = localStorage.getItem('commentyoutubevideoId');
            let channelId = localStorage.getItem('subscribeyoutubechannelId');
            let commenttxt = localStorage.getItem('youtubecommenttxt');
            let AccessToken = apidata.accessToken;
            let youtubevideocommentres = await youtubevideocomment(
              videoId,
              channelId,
              commenttxt,
              AccessToken
            );
            if (youtubevideocommentres.key === 1) {
            } else {
            }
          } else {
            localStorage.removeItem('likeyoutubevideoId');
            localStorage.removeItem('likeyoutubevideo');
            localStorage.removeItem('subscribeyoutubechannel');
            localStorage.removeItem('subscribeyoutubechannelId');
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Something Went Wrong',
                textButton: 'OK',
                size: 'sm'
              })
            );
            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          localStorage.removeItem('likeyoutubevideoId');
          localStorage.removeItem('likeyoutubevideo');
          localStorage.removeItem('subscribeyoutubechannel');
          localStorage.removeItem('subscribeyoutubechannelId');
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong',
              textButton: 'OK',
              size: 'sm'
            })
          );
          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      } else {
        localStorage.removeItem('likeyoutubevideoId');
        localStorage.removeItem('likeyoutubevideo');
        localStorage.removeItem('subscribeyoutubechannel');
        localStorage.removeItem('subscribeyoutubechannelId');

        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(mainurl);
        }, 3000);
      }
    } else if (snapverify === 'N1yvs8Jj61eeiHjn3jdEyiGRDvlT7q45Wl8BDN9-dXI') {
      let snapauthverifyres = await snapchatauthverify(snapcode);
      if (snapauthverifyres.key === 1) {
        window.open('https://www.snapchat.com/add/rohitbohraji');
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: 'Login Successfully',
            textButton: 'OK',
            size: 'sm'
          })
        );
        setTimeout(() => {
          window.close(url);
        }, 3000);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setTimeout(() => {
          window.close(url);
        }, 3000);
      }
    } else if (mainurl.includes('bitly') === true) {
      let verifybitly = url.searchParams.get('code');
      if (verifybitly) {
        let bitLyVerifyres = await bitLyVerify(verifybitly);
        if (bitLyVerifyres) {
          let accesstoken = bitLyVerifyres.access_token;
          let name = bitLyVerifyres.name;
          let accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          accounts = accounts[0];
          let longlink = `https://test1.mediaeyenft.com/account/${accounts}`;
          let shortLinkres = await shortLink(accesstoken, longlink);
          if (shortLinkres) {
            let bitlink = shortLinkres.link;
            setProfileLink(bitlink);
            bitlink = bitlink.replace(/^https?:\/\//, '');
            let shortLinkQrres = await shortLinkQr(accesstoken, bitlink);
            if (shortLinkQrres) {
              let linkqr_code = shortLinkQrres.qr_code;
              setprofileLinkqrCode(linkqr_code);
              downloadBase64File(linkqr_code, 'image/png', 'test.png');
              function downloadBase64File(base64Data, contentType, fileName) {
                const linkSource = base64Data;
                const downloadLink = document.createElement('a');
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
              }

              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            } else {
              dispatch(
                toggleGeneralPopup({
                  status: 'error',
                  message: 'Something Went Wrong',
                  textButton: 'OK',
                  size: 'sm'
                })
              );
              setTimeout(() => {
                window.close(mainurl);
              }, 3000);
            }
          } else {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Something Went Wrong',
                textButton: 'OK',
                size: 'sm'
              })
            );
            setTimeout(() => {
              window.close(mainurl);
            }, 3000);
          }
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong',
              textButton: 'OK',
              size: 'sm'
            })
          );
          setTimeout(() => {
            window.close(mainurl);
          }, 3000);
        }
      }
    }
  }, []);

  const unstoppableDomain = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
      if (authorization.idToken.wallet_type_hint == 'web3') {
        const email = authorization?.idToken?.email;
        const location = authorization?.idToken?.location;
        const Name = authorization?.idToken?.name;
        const picture = authorization?.idToken?.picture;
        const wallet_address = authorization?.idToken?.wallet_address;
        const wallet_type_hint = authorization?.idToken?.wallet_type_hint;
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: `Welcome ${Name}, Login Successful`,
            // textButton: 'OK',
            size: 'sm'
          })
        );
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGeneratieProfileLink = async () => {
    let bitLyres = await bitLy();
    if (bitLyres) {
      window.open(bitLyres);
    } else {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const handleUsernameChange = (e) => {
    if (e.target.value === '') {
      setUsername(e.target.value);
      setUsernameError(false);
      return;
    }
    if (usernameRegex.test(e.target.value)) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
    setUsername(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value.replace(/[^\w\s]/gi, ''));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value.replace(/[^",'!.\w\s]/gi, ''));
  };

  const handleWebsiteChange = (e) => {
    updateLinks('website', e.target.value);
  };

  const handleWebsiteProtocolChange = (value) => {
    updateLinks('websiteProtocol', value);
  };

  const updateLinks = (type, value) => {
    let newLinks = { ...links };
    newLinks[type] = value;
    setLinks(newLinks);
  };

  const handleSave = async () => {
    try {
      // set default fields to new user
      if (isAuthenticated) {
        if (isUsernameError || username === '') {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Username is invalid.',
              textButton: 'OK',
              size: 'sm'
            })
          );
        }

        // if (fullName && !fullnameRegex.test(fullName)) {
        //   dispatch(
        //     toggleGeneralPopup({
        //       status: 'error',
        //       message: 'Fullname is invalid.',
        //       textButton: 'OK',
        //       size: 'sm'
        //     })
        //   );
        //   return;
        // }
        if (email && !emailRegex.test(email)) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Email address format is invalid.',
              textButton: 'OK',
              size: 'sm'
            })
          );
          return;
        }

        if (!websiteRegex.test(links.website) && links.website) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: `Website URL is invalid. Use "mediaeye.com" format.`,
              textButton: 'OK',
              size: 'sm'
            })
          );
          return;
        }

        if (!instaUserRegex.test(links.instagram) && links.instagram) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Instagram Username is invalid.',
              textButton: 'OK',
              size: 'sm'
            })
          );
          return;
        }
        if (!twitterUserRegex.test(links.twitter) && links.twitter) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Twitter Username is invalid.',
              textButton: 'OK',
              size: 'sm'
            })
          );
          return;
        }

        const userData = {
          defaultUsername: false,
          username: username,
          links: links,
          bio: bio,
          fullName: fullName
        };
        if (!(email === '' || email === user.attributes.email)) {
          userData.email = email;
        }
        setUserData(userData);

        setSavePressed(true);
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }
  };

  const connecttwitter = async () => {
    try {
      let apidata = await getTwitterAPiUrl();
      if (apidata && apidata.key === 1) {
        window.open(apidata.url);
        localStorage.setItem('twittersecretkey', apidata.requestSecret);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connecttwitch = async () => {
    try {
      let apidata = await getTwitchAPiUrl();
      if (apidata.key === 1) {
        window.open(apidata.url);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connectdiscord = async () => {
    try {
      let apidata = await getDiscordAPiUrl();
      if (apidata.key === 1) {
        window.open(apidata.url);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connectlinkedin = async () => {
    try {
      let apidata = await getLinkedinAPiUrl();
      if (apidata.key === 1) {
        window.open(apidata.url);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connectspotify = async () => {
    try {
      let apidata = await getSpotifyAPiUrl();
      if (apidata.key === 1) {
        window.open(apidata.url);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connectflickr = async () => {
    try {
      let apidata = await getFlickrAPiUrl();
      if (apidata.key === 1) {
        window.open(apidata.url);
        localStorage.setItem('flickrsecretkey', apidata.requestSecret);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const connectinstagram = async () => {
    try {
      let apidata = await getInstagramUser(instaUser, instaPassword);
      if (apidata.key === 1) {
        let instagram_username = apidata.display_name;

        /////////////You can call Webservice to store INSTAGRAM username here and get INSTAGRAM Username from Variable instagram_username/////////
        updateLinks('instagram', instagram_username);

        dispatch(
          toggleGeneralPopup({
            status: 'success',
            // message: `Great! you connected with @${instagram_username}`,
            message: `Your Instagram has been connected to your profile @${instagram_username}`,
            textButton: 'OK',
            size: 'sm'
          })
        );
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const openInstaDetails = () => {
    setUserInstaInput(!userInstaInput);
  };

  const openMobileInput = () => {
    setOpenInput(!openInput);
  };
  const getPhoneNumber = (e) => {
    setPhoneNo(e.target.value);
  };
  const getCountryCode = (e) => {
    setCountryCode(e.target.value);
  };
  const setYourOtp = () => {
    setOtpInput(!otpInput);
  };
  const getYourOtp = (e) => {
    setOtp(e.target.value);
  };
  const handleMobileNumber = async () => {
    if (
      countryCode === '+' ||
      phoneNo === undefined ||
      countryCode === '' ||
      countryCode.length > 3
    ) {
      openMobileInput();
    } else {
      let yourNumber = countryCode.concat(phoneNo);
      setCountryCode('+');
      setPhoneNo('');
      let apidata = await getTelegramApiUrl(yourNumber);
      if (apidata.key === 1) {
        setTelegramcodehash(apidata.url);
        settelegramnumber(yourNumber);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
      openMobileInput();
      setYourOtp();
    }
  };
  const openInNewTab = (url) => {
    // alert("ok")
    window.open(url, '_blank');
  };
  const handleYourOtp = async () => {
    if (otp.length !== 5) {
      setOtp('');
    } else {
      let yourOtp = otp;
      let phonecodehash = telegramcodehash;
      let phoneNumber = telegramnumber;
      let apidata = await getTelegramAuthVerify(
        phoneNumber,
        yourOtp,
        phonecodehash
      );
      if (apidata.key === 1) {
        let telegram_username = apidata.display_name;

        /////////////You can call Webservice to store TELEGRAM username here and get TELEGRAM Username from Variable telegram_username/////////
        updateLinks('telegram', telegram_username);

        dispatch(
          toggleGeneralPopup({
            status: 'success',
            // message: `Great! you connected with @${telegram_username}`,
            message: `Your Telegram has been connected to your profile @${telegram_username}`,
            textButton: 'OK',
            size: 'sm'
          })
        );
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
      setOtp('');
      setYourOtp();
    }
  };

  const handleProfileImage = (file) => {
    if (
      !(
        file?.type === 'image/png' ||
        file?.type === 'image/jpeg' ||
        file?.type === 'image/jpg'
      )
    ) {
      alert('Must be image of type .png, .jpg, .jpeg');
      return;
    }
    // only take files smaller than 2.5mb for profile image
    if (file.size > 2500000) {
      alert('File must be smaller than 2.5mb');
      return;
    }
    const moralisFile = new Moralis.File(file.name, file);

    setUserData({ profileImage: moralisFile });
  };

  return (
    <div className="profile-page-content-main">
      <div className="profile-page-content-main-innerpart">
        <div className="profile-page-content-main-innerpart-heading">
          <span>Profile</span>
          <div className="profile-page-content-main-innerpart-heading-loginRight">
            <button
              className="profile-page-content-main-unstoppableButton"
              onClick={() => unstoppableDomain()}
              data-position="bottom"
            >
              <Unstoppable />
              Connect with Unstoppable
            </button>
          </div>
        </div>

        <div className="profile-page-content-main-innerpart-content">
          <div className="profile-page-content-main-innerpart-content-left">
            <div className="profile-page-content-main-innerpart-content-left-image">
              {' '}
              <img
                src={
                  user?.attributes?.profileImage
                    ? user.attributes.profileImage._url
                    : GetDefaultImages('USER')
                }
                alt="UserImg"
              />
            </div>
            <div className="profile-page-content-main-innerpart-content-left-bottom">
              <label className="profile-page-content-main-innerpart-content-left-bottom-upload">
                <input
                  type="file"
                  onChange={(e) => handleProfileImage(e.target.files[0])}
                  disabled={isUserUpdating}
                />
                <Upload />
                <div>Replace</div>
              </label>
              <div className="profile-page-content-main-innerpart-content-left-bottom-footerPart">
                <span>
                  Maximum upload file size:
                  <br /> <b>2.5 MB</b>
                </span>
              </div>
            </div>
          </div>
          <div className="profile-page-content-main-innerpart-content-right">
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label" htmlFor="username">
                Username
              </label>
              <div className="mediaeyeform-group-input">
                <input
                  className={`mediaeyeform-input ${isUsernameError ? 'error' : ''
                    }`}
                  value={username}
                  id="username"
                  onChange={(e) => handleUsernameChange(e)}
                />
              </div>
              {isUsernameError ? (
                <div className={`m-t-10 text-danger`}>
                  Username is not case-sensitive. Must be between 6 and 50
                  characters long.
                  <br />
                  Can contain letters from A to Z, and numbers from 0 through 9.
                  <br />
                  Can contain some special characters, including @ . - _. <br />
                  Cannot contain spaces. <br />
                  Can contain non-English characters (such as é).
                  <br />
                </div>
              ) : null}
            </div>
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label" htmlFor="email">
                Email
              </label>
              <div className="mediaeyeform-group-input">
                <input
                  className="mediaeyeform-input"
                  value={email}
                  id="email"
                  onChange={(e) => handleEmailChange(e)}
                />
              </div>
            </div>
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label" htmlFor="my_bio">
                My Bio
              </label>
              <div className="mediaeyeform-group-input">
                <div className="mediaeyetextarea mediaeyefancyScroll">
                  <textarea
                    value={bio}
                    id="my_bio"
                    className="mediaeyetextarea-input"
                    rows="6"
                    onChange={(e) => handleBioChange(e)}
                  >
                    {bio}
                  </textarea>
                </div>
              </div>
            </div>
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label" htmlFor="profile_link">
                Short profile link
              </label>
              <div className="profile-page-content-main-innerpart-content-right-linkinput">
                <div className="profile-page-content-main-innerpart-content-right-linkinput-leftside">
                  <Chain />
                  <input
                    onClick={
                      profileLink ? () => openInNewTab(profileLink) : null
                    }
                    type="text"
                    placeholder="bit.ly/3w4hkt"
                    value={profileLink}
                    id="profile_link"
                    readOnly
                  />
                </div>
                <div className="profile-page-content-main-innerpart-content-right-linkinput-rightside">
                  {profileLink ? (
                    <div className="profile-page-content-main-innerpart-content-right-linkinput-rightside-copy-section">
                      <div className="mediaeye-copy-box">
                        <button
                          type="button"
                          className="mediaeye-copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(profileLink);
                            setCopyProfileUrl(true);
                          }}
                        >
                          <Copy />
                        </button>
                        <div className="mediaeye-copy-box-msg">
                          {copyProfileUrl ? (
                            <span className="text-grayShade">Copied</span>
                          ) : (
                            <span className="text-grayShade">Copy</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {profileLink ? (
                    <a
                      href="/img/QRcode.png"
                      download
                      className="profile-page-content-main-innerpart-content-right-linkinput-rightside-parts"
                    >
                      <QRCode />
                      <span className="text-grayShade">QR Code</span>
                    </a>
                  ) : (
                    <button
                      className="btn btn-square btn-transperant"
                      onClick={handleGeneratieProfileLink}
                    >
                      GENERATE
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {userError ? <div>{userError?.message}</div> : null}
        <div className="profile-page-content-main-innerpart-save_button">
          <button
            className="btn btn-info"
            onClick={handleSave}
            disabled={isUserUpdating}
          >
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="profile-page-content-main-innerpart">
        <div className="profile-page-content-main-innerpart-heading">
          <span>On the Web</span>
        </div>
        <div className="profile-page-content-main-innerpart-websitehandler">
          <div className="profile-page-content-main-innerpart-websitehandler-section1">
            <Globe />
            <label htmlFor="website">Website</label>
          </div>
          <div className="mediaeyeform-group-input">
            <div className="mediaeyeform-group-input-addon profile-page-content-main-innerpart-websiteaddon">
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                options={protocolOptions}
                value={links.websiteProtocol}
                onChange={(opt) => {
                  handleWebsiteProtocolChange(opt);
                }}
              />
            </div>
            <input
              className="mediaeyeform-input mediaeyeform-input-round"
              value={links.website}
              id="website"
              placeholder={'yourwebsite.com'}
              onChange={(e) => handleWebsiteChange(e, 'website')}
            />
            {!links.website ? (
              <button className="btn btn-info mediaeyeform-group-input-btn">
                Add
              </button>
            ) : (
              <button
                className="btn btn-info mediaeyeform-group-input-btn"
                onClick={handleSave}
                disabled={isUserUpdating}
              >
                Add
              </button>
            )}
          </div>
        </div>
        <div className="profile-page-content-main-innerpart-mainInputs">
          <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
            <label className="social-label twitter-logo">
              <Twitter />
              <span>{twitterName}</span>
            </label>
            <button
              type="button"
              onClick={connecttwitter}
              className={links.twitter === '' ? 'btn btn-info' : 'btn btn-main'}
              disabled={isUserUpdating}
            >
              <span>{getSocialMediaButtonText(links.twitter)}</span>
            </button>
            {/* Diconnect button */}
            {/*<button type='button' onClick={connectdiscord} className="btn btn-disconnect" disabled={isUserUpdating}>
            <span>DISCONNECT</span>
        </button> */}
          </div>

          <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
            <label className="social-label discord-logo">
              <Discord />
              <span>{discordName}</span>
            </label>
            <button
              type="button"
              onClick={connectdiscord}
              className={links.discord === '' ? 'btn btn-info' : 'btn btn-main'}
              disabled={isUserUpdating}
            >
              <span>{getSocialMediaButtonText(links.discord)}</span>
            </button>
          </div>

          {openInput ? (
            <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
              <input
                className="country-code"
                value={countryCode}
                onChange={getCountryCode}
                placeholder="+91"
              />
              <input
                className="mobileno-input"
                value={phoneNo}
                onChange={getPhoneNumber}
                placeholder="Mobile Nu."
              />

              <button
                type="button"
                onClick={handleMobileNumber}
                className="btn btn-info"
                disabled={isUserUpdating}
              >
                <span>send</span>
              </button>
            </div>
          ) : otpInput ? (
            <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
              <input
                className="mobileno-input"
                value={otp}
                onChange={getYourOtp}
                placeholder="OTP here"
              />
              <button
                type="button"
                onClick={handleYourOtp}
                className="btn btn-info"
                disabled={isUserUpdating}
              >
                <span>Submit</span>
              </button>
            </div>
          ) : (
            <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
              <label className="social-label">
                <Telegram />
                <span>{telegramName}</span>
              </label>
              <button
                type="button"
                onClick={openMobileInput}
                className={
                  links.telegram === '' ? 'btn btn-info' : 'btn btn-main'
                }
                disabled={isUserUpdating}
              >
                {telegramName === 'Telegram' ? (
                  <span>{getSocialMediaButtonText(links.telegram)}</span>
                ) : null}
              </button>
            </div>
          )}

          {userInstaInput ? (
            <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
              <input
                className="insta-input"
                value={instaUser}
                onChange={(e) => setInstaUser(e.target.value)}
                placeholder="Username"
              />
              <input
                type="password"
                className="insta-input"
                value={instaPassword}
                onChange={(e) => setInstaPassword(e.target.value)}
                placeholder="Password"
              />

              <button
                type="button"
                className="btn btn-info"
                disabled={isUserUpdating}
                onClick={connectinstagram}
              >
                <span>SUBMIT</span>
              </button>
            </div>
          ) : (
            <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
              <label className="social-label">
                <Instagram /> <span>{instagramName}</span>
              </label>
              <button
                type="button"
                className={
                  links.instagram === '' ? 'btn btn-info' : 'btn btn-main'
                }
                disabled={isUserUpdating}
                onClick={openInstaDetails}
              >
                <span>{getSocialMediaButtonText(links.instagram)}</span>
              </button>
            </div>
          )}

          <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
            <label className="social-label linkedin-logo">
              <Linkedin />
              <span>LinkedIn</span>
            </label>

            <button
              className={
                links.linkedin === '' ? 'btn btn-info' : 'btn btn-main'
              }
              onClick={connectlinkedin}
              disabled={isUserUpdating}
            >
              <span>{getSocialMediaButtonText(links.linkedin)}</span>
            </button>
          </div>

          <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
            <label className="social-label">
              <Twitch />
              <span>Twitch</span>
            </label>
            <button
              className={links.twitch === '' ? 'btn btn-info' : 'btn btn-main'}
              onClick={connecttwitch}
              disabled={isUserUpdating}
            >
              <span>{getSocialMediaButtonText(links.twitch)}</span>
            </button>
          </div>

          <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
            <label className="social-label">
              <Spotify />
              <span>Spotify</span>
            </label>

            <button
              className={links.spotify === '' ? 'btn btn-info' : 'btn btn-main'}
              onClick={connectspotify}
              disabled={isUserUpdating}
            >
              <span>{getSocialMediaButtonText(links.spotify)}</span>
            </button>
          </div>

          <div className="profile-page-content-main-innerpart-mainInputs-social_cateogry">
            <label className="social-label">
              <Flickr />
              <span>Flickr</span>
            </label>
            <button
              className={links.flickr === '' ? 'btn btn-info' : 'btn btn-main'}
              onClick={connectflickr}
              disabled={isUserUpdating}
            >
              <span>{getSocialMediaButtonText(links.flickr)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
