import React, { useState, useEffect } from 'react';
import './Taskdetail.scss';
import { useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../store/app/appSlice';

// media and images
import AirdropRegisterPopup from '../Modals/AirdropRegisterPopup/AirdropRegisterPopup';
import AirdropWinnersPopup from '../Modals/AirdropWinnersPopup/AirdropWinnersPopup';

///////////API IMPORT ///////////
import {
  hubSpotEmail,
  addSendGridEmail,
  getSendGridList,
  getMailChimpList,
  addEmailMailChimp,
  followInstagram,
  likeInstagram,
  followLinkedin,
  youtubAuth,
  tiktokAuth,
  snapChatAuth
} from '../../blockchain/functions/Airdrops/socialnetworkfunctioning';

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
  getTumblerAPiUrl,
  getEventbriteApiUrl,
  getVimeoAccessToken,
  getRedditUrl
} from '../../blockchain/functions/Profile/socialconnection';

import { async } from '@firebase/util';
import AirdropSocialPopup from '../Modals/AirdropSocialPopup/AirdropSocialPopup';
import AirdropSocialEmailPopup from '../Modals/AirdropSocialEmailPopup/AirdropSocialEmailPopup';
import AirdropSocialPostPopup from '../Modals/AirdropSocialPostPopup/AirdropSocialPostPopup';
import AirdropSocialCommentPopup from '../Modals/AirdropSocialCommentPopup/AirdropSocialCommentPopup';
import { event } from 'jquery';

const Taskdetail = () => {
  const url = window.location.href;
  const [showCardActionmenu, setShowCardActionmenu] = useState(false);
  const onClick = () => setShowCardActionmenu(true);
  const [registerPopup, setRegister] = useState(false);
  const [windersPopup, setWindersPopup] = useState(false);
  const [ethAddress, setEthAddress] = useState();
  const dispatch = useDispatch();
  const [telegramName, setTelegramName] = useState('active');
  const [instagramUserName, setInstagramUserName] = useState('active');
  const [instagramUserNamelike, setInstagramUserNamelike] = useState('active');
  const [showPopup, setShowPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [txt, setTxt] = useState('');
  const [title, setTitle] = useState('');
  const [link, setlink] = useState('');

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

  const toggleAirdropRegisterPopup = () => {
    setRegister(!registerPopup);
  };

  const toggleAirdropWinersPopup = () => {
    setWindersPopup(!windersPopup);
  };

  const [twitter_Name, setTwitter_Name] = useState('HawksCode');
  const [twitter_Retweet, setTwitter_Retweet] = useState(
    'https://twitter.com/easy_shiksha/status/1498167042964619264?s=20&t=_7ODMgzX9iSS9VYpxPKHfA'
  );
  const [twitter_Retweethashtag, setRetweethashtag] = useState(
    'https://twitter.com/easy_shiksha/status/1498167042964619264?s=20&t=_7ODMgzX9iSS9VYpxPKHfA'
  );

  const [spotify_songId, setspotify_songId] = useState(
    '29m79w9xPMH4YCD6r8JSmV'
  );
  const [spotify_artistName, setspotify_artistName] = useState(
    '6LEG9Ld1aLImEFEVHdWNSB'
  );
  const [spotify_songlink, setspotify_songlink] = useState(
    'https://open.spotify.com/embed/track/29m79w9xPMH4YCD6r8JSmV?utm_source=generator'
  );

  const [soundcloudlikesong, setsoundcloudlikesong] = useState(
    'https://soundcloud.com/officialshubh/no-love'
  );

  const [mailchimplistname, setmailchimplistname] = useState('rorrohit');
  const [mailchimp_key, setmailchimp_key] = useState(
    '648c5e1943d3f45e3acafd4825d5c5b5-us14'
  );

  const [hubspot_key, sethubspot_key] = useState(
    'c86da316-7b40-4268-9a5e-06889d3633a9'
  );

  const [sendgrid_key, setsendgrid_key] = useState(
    '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'
  );
  const [sendgridlistid, setsendgridlistid] = useState(
    '2a9d9f71-39cd-4834-b546-fb0cea79cdbb'
  );

  const [follow_instauser, setfollow_instauser] = useState('4833096479');
  const [like_instapost, setlike_instapost] = useState(
    '2781295363414234455_4833096479'
  );
  const [instapost_link, setinstapost_link] = useState(
    'https://www.instagram.com/p/CZqmaHIvzpi/?utm_source=ig_embed&amp;utm_campaign=loading'
  );
  const [instaUser, setInstaUser] = useState('');
  const [instaPassword, setInstaPassword] = useState('');

  const [joindiscordpage, setjoindiscordpage] = useState('953266514214150295');

  const [followlinkedinpageId, setfollowlinkedinpageId] = useState('3476');

  const [telegramcode, settelegramcode] = useState('');
  const [telegramnumber, settelegramnumber] = useState('');
  const [teleotp, setteleotp] = useState();
  const [telecodehash, settelecodehash] = useState('');
  const [telegrouplink, settelegrouplink] = useState(
    'https://telegram.me/testworldindia'
  );
  const [telepostlink, settelepostlink] = useState(
    'MeDIAeYeNFTofficial/117462'
  );

  const [flickr_grname, setflickr_grname] = useState('1075049@N20');
  const [flickr_image, setflickr_image] = useState('49347168437');
  const [flickr_commentimage, setflickr_commentimage] = useState('49347168437');
  const [flickr_commenttxt, setflickr_commenttxt] = useState('nice pic');

  const [followtwitch, setfollowtwitch] = useState('dreamleague');

  const [followtumblername, setfollowtumblername] = useState(
    'deepak-hcs.tumblr.com'
  );
  const [tumblerlikeimage, settumblerlikeimage] = useState(
    'https://embed.tumblr.com/embed/post/r_BTLFg8QzTPUMVSbe3vbg/682251046093979648'
  );
  const [tumblerlikeimageId, settumblerlikeimageId] =
    useState('680058676226244608');
  const [tumblerreblog_key, settumblerreblog_key] = useState('HWNOmBzE');
  const [tumblerlog, settumblerlog] = useState('deepak-hcs');

  const [eventbriteventId, seteventbriteventId] = useState('101283469584');

  const [followvimeo, setfollowvimeo] = useState('172091049');
  const [likevimeovideoId, setlikevimeovideoId] = useState('698099353');

  const [joinredditusername, setjoinredditusername] =
    useState('hcsdeepaksharma');
  const [saveredditpostid, setsaveredditpostid] = useState('t3_toit18');

  const [youtubechannelId, setyoutubechannelId] = useState(
    'UCZPvrV-MiE6x2c-IXvgiMcA'
  );
  const [youtubevideoId, setyoutubevideoId] = useState('zbdrEUfk7XI');

  const [followmedium, setfollowmedium] = useState('suraj.hawkscode');
  const [likepostmedium, setlikepostmedium] = useState(
    'https://rabbinikki.medium.com/pride-is-not-a-rainbow-its-a-riot-378200620b8e'
  );
  const [commentpostmedium, setcommentpostmedium] = useState(
    'https://rabbinikki.medium.com/pride-is-not-a-rainbow-its-a-riot-378200620b8e'
  );
  const [followsoundcloud, setfollowsoundcloud] = useState('ykwim-karan-aujla');

  const [description, setDescription] = useState('');

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleinstausername = (event) => {
    setInstaUser(event.target.value);
  };

  const handleinstausernamepassword = (event) => {
    setInstaPassword(event.target.value);
  };

  const switchSocialPopup = async () => {
    setShowPopup(!showPopup);
    if (showPopup === true) {
      if (title === 'Spotify-Like a Song') {
        try {
          let apidata = await getSpotifyAPiUrl();
          if (apidata.key === 1) {
            localStorage.setItem('likespotifysong', 'true');
            localStorage.setItem('liksepotifysongId', spotify_songId);
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
      } else if (title === 'Like a Vimeo Video') {
        try {
          let apidata = await getVimeoAccessToken();
          if (apidata.key === 1) {
            localStorage.setItem('likevimeovideo', 'true');
            localStorage.setItem('likevimeovideoId', likevimeovideoId);
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
      } else if (title === 'Like Video on Youtube') {
        try {
          let apidata = await youtubAuth();
          if (apidata.key === 1) {
            localStorage.setItem('likeyoutubevideo', 'true');
            localStorage.setItem('likeyoutubevideoId', youtubevideoId);
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
      }
    }
  };

  const switchSocialEmailPopup = async (title, email) => {
    setShowEmailPopup(!showEmailPopup);
    if (showEmailPopup === true) {
      if (title === 'Mailchimp Email Subscription') {
        try {
          let apidata = await addEmailMailChimp(
            email,
            mailchimplistname,
            mailchimp_key
          );
          if (apidata.key === 1) {
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: 'Added to Mailchimp!',
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
      } else if (title === 'Hubspot - Email Subscription') {
        try {
          let apidata = await hubSpotEmail(hubspot_key, email);
          if (apidata.key === 1) {
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: 'Connected to Hubspot!',
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
      } else if (title === 'Sendgrid - Email Subscription') {
        try {
          let apidata = await addSendGridEmail(
            sendgrid_key,
            sendgridlistid,
            email
          );

          if (apidata.key === 1) {
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: 'Added to Sendgrid!',
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
      }
    }
  };

  const switchSocialPostPopup = async (title) => {
    setShowPostPopup(!showPostPopup);
    if (showPostPopup === true) {
      if (title === 'Instagram Post Like') {
        try {
          let apidata = await likeInstagram(
            instaUser,
            instaPassword,
            like_instapost
          );
          if (apidata.key === 1) {
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: 'Liked on Instagram!',
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
      } else if (title === 'Tumblr Post Like') {
        try {
          let apidata = await getTumblerAPiUrl();

          if (apidata.key === 1) {
            localStorage.setItem('liketumbler', 'true');
            localStorage.setItem(
              'tumbleroauthTokenSecret',
              apidata.oauthTokenSecret
            );
            localStorage.setItem('tumblerlikeimageId', tumblerlikeimageId);
            localStorage.setItem('reblog_key', tumblerreblog_key);
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
      } else if (title === 'Eventbrite: Attend an Event') {
        try {
          let apidata = await getEventbriteApiUrl();
          if (apidata.key === 1) {
            window.open(apidata.url);
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
      } else if (title === 'Flickr Post Like') {
        try {
          let apidata = await getFlickrAPiUrl();
          if (apidata.key === 1) {
            localStorage.setItem('flickrsecretkey', apidata.requestSecret);
            localStorage.setItem('likeflickrimage', 'true');
            localStorage.setItem('flickrimage', flickr_image);
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
      }
    }
  };

  const switchSocialCommentPopup = async (txt, comment) => {
    setShowCommentPopup(!showCommentPopup);
    if (showCommentPopup === true) {
      if (title === 'Retweet Twitter Post') {
        try {
          let apidata = await getTwitterAPiUrl();
          if (apidata.key === 1) {
            localStorage.setItem('retweet', 'true');
            localStorage.setItem('retweetpostlink', twitter_Retweet);
            localStorage.setItem('twittersecretkey', apidata.requestSecret);
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
      } else if (title === 'Retweet Post with Hashtag') {
        try {
          let apidata = await getTwitterAPiUrl();
          if (apidata.key === 1) {
            localStorage.setItem('retweetwithhashtag', 'true');
            localStorage.setItem('retweetpostlinktagtext', comment);
            localStorage.setItem('retweetpostlink', twitter_Retweethashtag);
            localStorage.setItem('twittersecretkey', apidata.requestSecret);
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
      } else if (txt === 'Flickr Post Comment') {
        try {
          let apidata = await getFlickrAPiUrl();
          if (apidata.key === 1) {
            localStorage.setItem('flickrsecretkey', apidata.requestSecret);
            localStorage.setItem('commentflickrimage', 'true');
            localStorage.setItem('flickr_commentimage', flickr_commentimage);
            localStorage.setItem('flickr_commenttxt', comment);
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
      } else if (title === 'Reddit Save Post') {
        try {
          let apidata = await getRedditUrl();
          if (apidata.key === 1) {
            localStorage.setItem('savereddit', 'true');
            localStorage.setItem('saveredditpostid', saveredditpostid);
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
      } else if (title === 'Reddit Post Comment') {
        try {
          let apidata = await getRedditUrl();
          if (apidata.key === 1) {
            localStorage.setItem('commentreddit', 'true');
            localStorage.setItem('saveredditpostid', saveredditpostid);
            localStorage.setItem('commentText', comment);
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
      } else if (title === 'Tumblr Post Comment') {
        try {
          let apidata = await getTumblerAPiUrl();
          if (apidata.key === 1) {
            localStorage.setItem('commenttumbler', 'true');
            localStorage.setItem(
              'tumbleroauthTokenSecret',
              apidata.oauthTokenSecret
            );
            localStorage.setItem('commenttxt', comment);
            localStorage.setItem('reblog_key', tumblerreblog_key);
            localStorage.setItem('tumblerlog', tumblerlog);
            localStorage.setItem('tumblerlikeimageId', tumblerlikeimageId);
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
      } else if (title === 'Comment on Youtube Video') {
        try {
          let apidata = await youtubAuth();
          if (apidata.key === 1) {
            localStorage.setItem('commentyoutubevideo', 'true');
            localStorage.setItem('commentyoutubevideoId', youtubevideoId);
            localStorage.setItem('subscribeyoutubechannelId', youtubechannelId);
            localStorage.setItem('youtubecommenttxt', comment);
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
      }
    }
  };

  const follow_twitter = async () => {
    try {
      let apidata = await getTwitterAPiUrl();
      if (apidata.key === 1) {
        localStorage.setItem('follow_twitter', 'true');
        localStorage.setItem('follow_twitter_username', twitter_Name);
        localStorage.setItem('twittersecretkey', apidata.requestSecret);
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

  const follow_spotify = async () => {
    try {
      let apidata = await getSpotifyAPiUrl();
      if (apidata.key === 1) {
        localStorage.setItem('followspotify', 'true');
        localStorage.setItem('spotify_artistName', spotify_artistName);
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

  const insta_follow = async () => {
    try {
      if (!instaUser || !instaPassword) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Please Provide Required details',
            textButton: 'OK',
            size: 'sm'
          })
        );
      } else {
        let apidata = await followInstagram(
          instaUser,
          instaPassword,
          follow_instauser
        );
        if (apidata.key === 1) {
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              message: 'Followed on Instagram!',
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
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong! s',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const insta_like = async () => {
    try {
      if (!instaUser || !instaPassword) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Liked on Instagram!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      } else {
        setTxt('Like');
        setlink(instapost_link);
        setTitle('Instagram Post Like');
        switchSocialPostPopup();
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong! s',
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
        localStorage.setItem('joindiscord', 'true');
        localStorage.setItem('discordpagename', joindiscordpage);
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

  const follow_linkedin = async () => {
    try {
      let apidata = await getLinkedinAPiUrl();
      if (apidata.key === 1) {
        let url = `https://www.linkedin.com/company/${followlinkedinpageId}/?isFollowingPage=true`;
        localStorage.setItem('followlinkedin', 'true');
        localStorage.setItem('linkedinpageId', url);
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

  const handletelecode = (event) => {
    settelegramcode(event.target.value);
  };

  const handletelenumber = (event) => {
    settelegramnumber(event.target.value);
  };

  const handleteleotp = (event) => {
    setteleotp(event.target.value);
  };

  const connecttelgram = async () => {
    try {
      let telephonenumber = '+' + telegramcode + telegramnumber;
      let apidata = await getTelegramApiUrl(telephonenumber);
      if (apidata.key === 1) {
        settelecodehash(apidata.url.phonecodehash);
        setTelegramName('TelegramOTP');
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

  const verifytelgram = async () => {
    try {
      let phoneNumber = '+' + telegramcode + telegramnumber;
      let phonecode = teleotp;
      let phonecodehash = telecodehash;
      let grouplink = telegrouplink;

      let apidata = await getTelegramAuthVerify(
        phoneNumber,
        phonecode,
        phonecodehash,
        grouplink
      );

      if (apidata.key === 1) {
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: 'Telegram verified!',
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

  const follow_twitch = async () => {
    try {
      let apidata = await getTwitchAPiUrl();

      if (apidata.key === 1) {
        localStorage.setItem('followtwitch', 'true');
        localStorage.setItem('followtwitchname', followtwitch);
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

  const follow_tumbler = async () => {
    try {
      let apidata = await getTumblerAPiUrl();

      if (apidata.key === 1) {
        localStorage.setItem('followtumbler', 'true');
        localStorage.setItem(
          'tumbleroauthTokenSecret',
          apidata.oauthTokenSecret
        );
        localStorage.setItem('followtumblername', followtumblername);
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

  const join_flickr = async () => {
    try {
      let apidata = await getFlickrAPiUrl();
      if (apidata.key === 1) {
        localStorage.setItem('flickrsecretkey', apidata.requestSecret);
        localStorage.setItem('joinflickr', 'true');
        localStorage.setItem('flickrgroupname', flickr_grname);
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

  const follow_vimeo = async () => {
    try {
      let apidata = await getVimeoAccessToken();
      if (apidata.key === 1) {
        localStorage.setItem('followvimeo', 'true');
        localStorage.setItem('followvimeouser', followvimeo);
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

  const join_reddit = async () => {
    try {
      let apidata = await getRedditUrl();
      if (apidata.key === 1) {
        localStorage.setItem('joinreddit', 'true');
        localStorage.setItem('joinredditusername', joinredditusername);
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

  const youtube_subscribe = async () => {
    try {
      let apidata = await youtubAuth();
      if (apidata.key === 1) {
        localStorage.setItem('subscribeyoutubechannel', 'true');
        localStorage.setItem('subscribeyoutubechannelId', youtubechannelId);
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

  const follow_tiktok = async () => {
    try {
      let apidata = await tiktokAuth();
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

  const add_watchilist_coinmarketcap = async () => {
    try {
      let apidata = await tiktokAuth();
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

  const add_watchilist_coingecko = async () => {
    try {
      let apidata = await tiktokAuth();
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

  const follow_snapchat = async () => {
    try {
      let apidata = await snapChatAuth();
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
  const follow_soundcloud = async () => {
    let url = `https://soundcloud.com/${followsoundcloud}`;
    window.open(url);
  };
  const like_soundcloud = async () => {
    window.open(soundcloudlikesong);
  };

  const follow_medium = async () => {
    let url = `https://medium.com/@${followmedium}`;
    window.open(url);
  };
  const comment_medium = async () => {
    window.open(commentpostmedium);
  };
  const like_medium = async () => {
    window.open(likepostmedium);
  };

  return (
    <div className="mediaeye-layout-container fullwidth">
      <AirdropRegisterPopup
        ethAddress={ethAddress}
        registerPopup={registerPopup}
        toggleAirdropRegisterPopup={toggleAirdropRegisterPopup}
      />
      <AirdropSocialPopup
        switchSocialPopup={switchSocialPopup}
        showPopup={showPopup}
        txt={txt}
        title={title}
        link={link}
      />
      <AirdropSocialEmailPopup
        switchSocialEmailPopup={switchSocialEmailPopup}
        showEmailPopup={showEmailPopup}
        txt={txt}
        title={title}
      />
      <AirdropSocialPostPopup
        switchSocialPostPopup={switchSocialPostPopup}
        showPostPopup={showPostPopup}
        txt={txt}
        title={title}
        link={link}
      />
      <AirdropSocialCommentPopup
        switchSocialCommentPopup={switchSocialCommentPopup}
        showCommentPopup={showCommentPopup}
        txt={txt}
        title={title}
        link={link}
      />
      <AirdropWinnersPopup
        windersPopup={windersPopup}
        toggleAirdropWinersPopup={toggleAirdropWinersPopup}
      />

      <section className="mediaeye-layout-section">
        <div className="mediaeye-task">
          <h4>Tasks</h4>

          <div className="mediaeye-task-row">
            <button type="button" className="btn ttr">
              TWITTER
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @{twitter_Name} on Twitter</h6>
              <button
                type="button"
                onClick={follow_twitter}
                className="btn btn-info"
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn ttr">
              TWITTER
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Retweet last @{twitter_Name} Twitter Pinned post</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Retweet');
                  setlink(twitter_Retweet);
                  setTitle('Retweet Twitter Post');
                  switchSocialCommentPopup();
                }}
              >
                retweet
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn ttr">
              TWITTER
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Retweet Twitter post With hashtags</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Retweet With Hashtag');
                  setlink(twitter_Retweethashtag);
                  setTitle('Retweet Post with Hashtag');
                  switchSocialCommentPopup();
                }}
              >
                retweet with Hashtag
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn lkd">
              linkedin
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @QuarashiN on Linkedin</h6>
              <button
                type="button"
                onClick={follow_linkedin}
                className="btn btn-info"
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn dis">
              DISCORD
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Join @QuarashiN's Channel</h6>
              <button
                type="button"
                onClick={connectdiscord}
                className="btn btn-info"
              >
                Join
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn tel">
              TELEGRAM
            </button>
            {telegramName === 'active' ? (
              <div className="mediaeye-task-row-inner">
                <h6>Join @QuarashiN's Channel/Group</h6>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setTelegramName('Telegram')}
                >
                  Join
                </button>
              </div>
            ) : telegramName === 'Telegram' ? (
              <div className="mediaeye-task-row-inner mediaeye-task-row-inner-telegram-phone-number-active">
                <div className="mediaeye-task-row-inner-telegram-phone-number-active-show">
                  <label className="mediaeye-task-row-inner-telegram-phone-number-active-show-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    onChange={handletelecode}
                    className="mediaeye-task-row-inner-telegram-phone-number-active-show-phone-code"
                    placeholder="+91"
                  ></input>
                  <input
                    type="number"
                    onChange={handletelenumber}
                    className="mediaeye-task-row-inner-telegram-phone-number-active-show-phone-number"
                    placeholder="Enter Phone Number"
                  ></input>
                </div>
                {/* <button type='button' className='btn btn-info' onClick={() => setTelegramName("TelegramOTP")}>Send</button> */}
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={connecttelgram}
                >
                  Send
                </button>
              </div>
            ) : telegramName === 'TelegramOTP' ? (
              <div className="mediaeye-task-row-inner mediaeye-task-row-inner-telegram-phone-number-active">
                <div className="mediaeye-task-row-inner-telegram-phone-number-active-show">
                  <label className="mediaeye-task-row-inner-telegram-phone-number-active-show-label">
                    OTP
                  </label>
                  <input
                    type="number"
                    onChange={handleteleotp}
                    className="mediaeye-task-row-inner-telegram-phone-number-active-show-phone-number"
                    placeholder="Enter OTP"
                  ></input>
                </div>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={verifytelgram}
                >
                  Submit
                </button>
              </div>
            ) : null}
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn tel">
              TELEGRAM
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>View @QuarashiN's post</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Done');
                  setlink(telepostlink);
                  setTitle('Telegram Post');
                  switchSocialPostPopup();
                }}
              >
                View
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn tmb">
              TUMBLR
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @QuarashiN on Tumblr</h6>
              <button
                type="button"
                onClick={follow_tumbler}
                className="btn btn-info"
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn tmb">
              TUMBLR
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Like @QuarashiN's post</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Like');
                  setlink(tumblerlikeimage);
                  setTitle('Tumblr Post Like');
                  switchSocialPostPopup();
                }}
              >
                Like
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn tmb">
              TUMBLR
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Comment on @QuarashiN's post</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Comment');
                  setTitle('Tumblr Post Comment');
                  setlink(tumblerlikeimage);
                  switchSocialCommentPopup();
                }}
              >
                Comment
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn flk">
              flickr
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @QuarashiN on Flickr</h6>
              <button
                type="button"
                onClick={join_flickr}
                className="btn btn-info"
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn flk">
              flickr
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Like a photo of @QuarashiN's on Flickr</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Like');
                  setTitle('Flickr Post Like');
                  switchSocialPostPopup();
                }}
              >
                Like
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn flk">
              flickr
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Comment on a photo of @QuarashiN's on Flickr</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Comment');
                  setTitle('Flickr Post Comment');
                  switchSocialCommentPopup();
                }}
              >
                Comment
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn rdt">
              reddit
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Join @QuarashiN's Community on Reddit</h6>
              <button
                type="button"
                onClick={join_reddit}
                className="btn btn-info"
              >
                Join
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn rdt">
              reddit
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Save a post of @QuarashiN's on Reddit</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Save');
                  setTitle('Reddit Save Post');
                  switchSocialCommentPopup();
                }}
              >
                Save
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn rdt">
              reddit
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Comment on a post of @QuarashiN's on Reddit</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Comment');
                  setTitle('Reddit Post Comment');
                  switchSocialCommentPopup();
                }}
              >
                Comment
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn inst">
              INSTAGRAM
            </button>
            {instagramUserName === 'active' ? (
              <div className="mediaeye-task-row-inner">
                <h6>Follow @QuarashiN on Instagram</h6>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setInstagramUserName('Instagram')}
                >
                  Follow
                </button>
              </div>
            ) : instagramUserName === 'Instagram' ? (
              <div className="mediaeye-task-row-inner mediaeye-task-row-inner-insta-active">
                <div className="mediaeye-task-row-inner-insta-active-show">
                  <div className="mediaeye-task-row-inner-insta-active-show-flex">
                    <label className="mediaeye-task-row-inner-insta-active-show-flex-label">
                      Username
                    </label>
                    <input
                      type="text"
                      onChange={handleinstausername}
                      className="mediaeye-task-row-inner-insta-active-show-flex-input"
                      placeholder="Enter Username"
                    ></input>
                  </div>
                  <div className="mediaeye-task-row-inner-insta-active-show-flex">
                    <label className="mediaeye-task-row-inner-insta-active-show-flex-label">
                      Password
                    </label>
                    <input
                      type="text"
                      onChange={handleinstausernamepassword}
                      className="mediaeye-task-row-inner-insta-active-show-flex-input"
                      placeholder="Enter Password"
                    ></input>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={insta_follow}
                  className="btn btn-info"
                >
                  Follow
                </button>
              </div>
            ) : null}
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn inst">
              INSTAGRAM
            </button>
            {instagramUserNamelike === 'active' ? (
              <div className="mediaeye-task-row-inner">
                <h6>Like @QuarashiN's Latest post on Instagram</h6>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setInstagramUserNamelike('Instagram')}
                >
                  Like
                </button>
              </div>
            ) : instagramUserNamelike === 'Instagram' ? (
              <div className="mediaeye-task-row-inner mediaeye-task-row-inner-insta-active">
                <div className="mediaeye-task-row-inner-insta-active-show">
                  <div className="mediaeye-task-row-inner-insta-active-show-flex">
                    <label className="mediaeye-task-row-inner-insta-active-show-flex-label">
                      Username
                    </label>
                    <input
                      type="text"
                      onChange={handleinstausername}
                      className="mediaeye-task-row-inner-insta-active-show-flex-input"
                      placeholder="Enter Username"
                    ></input>
                  </div>
                  <div className="mediaeye-task-row-inner-insta-active-show-flex">
                    <label className="mediaeye-task-row-inner-insta-active-show-flex-label">
                      Password
                    </label>
                    <input
                      type="text"
                      onChange={handleinstausernamepassword}
                      className="mediaeye-task-row-inner-insta-active-show-flex-input"
                      placeholder="Enter Password"
                    ></input>
                  </div>
                </div>
                {/* <button type='button' className='btn btn-info' onClick={() => { setTxt('Like'); setlink(instapost_link); setTitle('Instagram Post Like'); switchSocialPostPopup() }}>Like</button> */}
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={insta_like}
                >
                  Like
                </button>
              </div>
            ) : null}
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn twt">
              TWITCH
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @QuarashiN's on Twitch</h6>
              <button
                type="button"
                onClick={follow_twitch}
                className="btn btn-info"
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn twt">
              TWITCH
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Watch a Featured Videolist</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Done');
                  setTitle('Twitch - Watch a Featured Videolist');
                  switchSocialPopup();
                }}
              >
                Watch
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn vim">
              VIMEO
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @QuarashiN on Vimeo</h6>
              <button
                type="button"
                onClick={follow_vimeo}
                className="btn btn-info"
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn vim">
              VIMEO
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Like a video of @QuarashiN</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Like');
                  setTitle('Like a Vimeo Video');
                  switchSocialPopup();
                }}
              >
                Like
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn spt">
              SPOTIFY
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @Quarashi on Spotify</h6>
              <button
                type="button"
                onClick={follow_spotify}
                className="btn btn-info"
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn spt">
              SPOTIFY
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Like a song</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Like');
                  setlink(spotify_songlink);
                  setTitle('Spotify-Like a Song');
                  switchSocialPopup();
                }}
              >
                Like
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn mcp">
              MAILCHIMP
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Subscribe @QuarashiN on Malichimp</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('SUBSCRIBE');
                  setTitle('Mailchimp Email Subscription');
                  switchSocialEmailPopup();
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn hub">
              HUBSPOT
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Subscribe @QuarashiN on Hubspot</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('SUBSCRIBE');
                  setTitle('Hubspot - Email Subscription');
                  switchSocialEmailPopup();
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn sng">
              SENDGRID
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Subscribe @QuarashiN on Sendgrid</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('SUBSCRIBE');
                  setTitle('Sendgrid - Email Subscription');
                  switchSocialEmailPopup();
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn evt">
              EVENTBRITE
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Attend an Event</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Attend');
                  setlink(eventbriteventId);
                  setTitle('Eventbrite: Attend an Event');
                  switchSocialPostPopup();
                }}
              >
                Attend
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn yt">
              youtube
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Subscribe @QuarashiN on YouTube</h6>
              <button
                type="button"
                onClick={youtube_subscribe}
                className="btn btn-info"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn yt">
              youtube
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Like @QuarashiN video on YouTube</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Like');
                  setTitle('Like Video on Youtube');
                  switchSocialPopup();
                }}
              >
                Like
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button
              type="button"
              className="btn yt"
              onClick={() => {
                setTxt('Approve');
                setTitle('Follow Snapchat');
                switchSocialPopup();
              }}
            >
              youtube
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Comment @QuarashiN video on YouTube</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Comment');
                  setTitle('Comment on Youtube Video');
                  switchSocialCommentPopup();
                }}
              >
                Comment
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn tiktok">
              TIKTOK
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @Quarashi on TIKTOK</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Submit');
                  setTitle('Follow Tiktok');
                  switchSocialPopup();
                  follow_tiktok();
                }}
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn snapchat">
              SNAPCHAT
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @Quarashi on SNAPCHAT</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Submit');
                  setTitle('Follow Snapchat');
                  switchSocialPopup();
                  follow_snapchat();
                }}
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn medium">
              MEDIUM
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @Quarashi on Medium</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Submit');
                  setTitle('Follow Medium');
                  switchSocialPopup();
                  follow_medium();
                }}
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn medium">
              MEDIUM
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Like a Post @Quarashi on Medium</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Submit');
                  setTitle('Like Medium');
                  switchSocialPopup();
                  like_medium();
                }}
              >
                Like
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn medium">
              MEDIUM
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Comment @Quarashi on Medium</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Submit');
                  setTitle('Comment Medium');
                  switchSocialPopup();
                  comment_medium();
                }}
              >
                Comment
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn Clubhouse">
              CLUBHOUSE
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @Quarashi on Clubhouse</h6>
              <button type="button" className="btn btn-info">
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn Clubhouse">
              CLUBHOUSE
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Join Channel @Quarashi on Clubhouse</h6>
              <button type="button" className="btn btn-info">
                Join
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn Clubhouse">
              CLUBHOUSE
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow Club @Quarashi on Clubhouse</h6>
              <button type="button" className="btn btn-info">
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn Soundcloud">
              SOUNDCLOUD
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Follow @Quarashi on Soundcloud</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Submit');
                  setTitle('Follow SoundCloud');
                  switchSocialPopup();
                  follow_soundcloud();
                }}
              >
                Follow
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn Soundcloud">
              SOUNDCLOUD
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Like Track or Playlist @Quarashi on Soundcloud</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Submit');
                  setTitle('Soundcloud-Like a Song');
                  switchSocialPopup();
                  like_soundcloud();
                }}
              >
                Like
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn coinmarketcap">
              COINMARKETCAP
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Add Watchlist @Quarashi on Coinmarketcap</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Submit');
                  setTitle('CoinMarketCap');
                  switchSocialPopup();
                  add_watchilist_coinmarketcap();
                }}
              >
                Add
              </button>
            </div>
          </div>

          <div className="mediaeye-task-row">
            <button type="button" className="btn coingecko">
              COINGECKO
            </button>
            <div className="mediaeye-task-row-inner">
              <h6>Add Watchlist @Quarashi on Coingecko</h6>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setTxt('Submit');
                  setTitle('CoinGecko');
                  switchSocialPopup();
                  add_watchilist_coingecko();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Taskdetail;
