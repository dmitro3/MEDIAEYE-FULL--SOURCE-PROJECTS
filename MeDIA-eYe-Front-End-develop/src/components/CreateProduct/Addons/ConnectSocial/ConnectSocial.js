import React, { useState, useEffect } from 'react';
import { toggleGeneralPopup } from '../../../../store/app/appSlice';
import { useMoralis } from 'react-moralis';
import { useSelector, useDispatch } from 'react-redux';
import {
  Instagram,
  Telegram,
  Twitter,
  Linkedin,
  Twitch,
  Spotify,
  Flickr,
  Globe,
  Discord
} from '../../../Icons/';
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
} from '../../../../blockchain/functions/Profile/socialconnection';

import './ConnectSocial.scss';

const ConnectSocial = (props) => {
  const { socialLinks, changeSocialLinks, editSocial } = props;
  const {
    authenticate,
    isAuthenticated,
    user,
    setUserData,
    userError,
    isUserUpdating,
    Moralis
  } = useMoralis();
  const dispatch = useDispatch();
  const [userInstaInput, setUserInstaInput] = useState('');
  const [instaUser, setInstaUser] = useState('');
  const [instaPassword, setInstaPassword] = useState('');
  const [telegramcodehash, setTelegramcodehash] = useState(null);
  const [telegramnumber, settelegramnumber] = useState(null);
  const [openInput, setOpenInput] = useState(false);
  const [countryCode, setCountryCode] = useState('+');
  const [phoneNo, setPhoneNo] = useState('');
  const [otpInput, setOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
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

  const getSocialMediaButtonText = (socialMedia) => {
    return socialMedia === '' ? 'Connect' : '@' + socialMedia;
  };

  useEffect(() => {
    setLinks(socialLinks);
  }, [socialLinks]);

  useEffect(async () => {
    let location = window.location;
    window.stop();
    let url = new URL(location.href);
    let mainurl = url.href;
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
        if (apidata.key === 1) {
          let twitter_username = apidata.display_name;

          //You can call Webservice to store twitter username here and get Twitter Username from Variable twitter_username
          changeSocialLinks('twitter', twitter_username);

          dispatch(
            toggleGeneralPopup({
              status: 'success',
              message: `Great! you connected with @${twitter_username}`,
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
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );
        }
      }
    } else if (mainurl.includes('discord') === true) {
      let verify = url.searchParams.get('code');
      if (verify) {
        let apidata = await getDiscordAuthVerify(verify);
        if (apidata.key === 1) {
          let discord_username = apidata.display_name;

          //You can call Webservice to store DISCORD username here and get Discord Username from Variable discord_username

          changeSocialLinks('discord', discord_username);
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              message: `Great! you connected with @${discord_username}`,
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
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );
        }
      }
    } else if (mainurl.includes('linkedin') === true) {
      let verify = url.searchParams.get('code');
      if (verify) {
        let apidata = await getLinkedinAuthVerify(verify);
        if (apidata.key === 1) {
          let linkedin_username = apidata.display_name;

          //You can call Webservice to store LINKEDIN username here and get LINKEDIN Username from Variable linkedin_username

          changeSocialLinks('linkedin', linkedin_username);
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              message: `Great! you connected with @${linkedin_username}`,
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
              message: 'Something Went Wrong!',
              textButton: 'OK',
              size: 'sm'
            })
          );
        }
      }
    } else if (mainurl.includes('spotify') === true) {
      let verify = url.searchParams.get('code');
      if (verify) {
        let apidata = await getSpotifyAuthVerify(verify);
        if (apidata.key === 1) {
          let spotify_username = apidata.display_name;

          //You can call Webservice to store SPOTIFY username here and get SPOTIFY Username from Variable spotify_username
          changeSocialLinks('spotify', spotify_username);
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              message: `Great! you connected with @${spotify_username}`,
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
        }
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
        if (apidata.key === 1) {
          let flickr_username = apidata.display_name;

          //You can call Webservice to store FLICKR username here and get FLICKR Username from Variable flickr_username
          changeSocialLinks('flickr', flickr_username);
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              message: `Great! you connected with @${flickr_username}`,
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
        }
      }
    } else if (mainurl.includes('twitch') === true) {
      let verifyurl = url.hash;
      let verify = verifyurl.substr(14, 30);
      if (verify) {
        let apidata = await getTwitchAuthVerify(verify);
        if (apidata.key === 1) {
          let twitch_username = apidata.display_name;

          //You can call Webservice to store TWITCH username here and get TWITCH Username from Variable twitch_username

          changeSocialLinks('twitch', twitch_username);
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              message: `Great! you connected with @${twitch_username}`,
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
        }
      }
    }
  }, []);

  const handleLinkChange = async (e) => {
    //await setLinks({ ...links, ['website']: e.target.value });
    await changeSocialLinks('website', e.target.value);
  };
  const connecttwitter = async () => {
    try {
      let apidata = await getTwitterAPiUrl();
      if (apidata.key === 1) {
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

  const openInstaDetails = () => {
    setUserInstaInput(!userInstaInput);
  };

  const openMobileInput = () => {
    setOpenInput(!openInput);
  };
  const getCountryCode = (e) => {
    setCountryCode(e.target.value);
  };
  const getPhoneNumber = (e) => {
    setPhoneNo(e.target.value);
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

        // You can call Webservice to store TELEGRAM username here and get TELEGRAM Username from Variable telegram_username
        changeSocialLinks('telegram', telegram_username);
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: `Great! you connected with @${telegram_username}`,
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

  const connectinstagram = async () => {
    try {
      let apidata = await getInstagramUser(instaUser, instaPassword);
      if (apidata.key === 1) {
        let instagram_username = apidata.display_name;

        //You can call Webservice to store INSTAGRAM username here and get INSTAGRAM Username from Variable instagram_username
        changeSocialLinks('instagram', instagram_username);
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: `Great! you connected with @${instagram_username}`,
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
  return (
    <div className="mediaeyeconnectsocial">
      <div className="mediaeyeconnectsocial-top">
        <div className="mediaeyeconnectsocial-icon">
          <Globe />
        </div>
        <label className="mediaeyeconnectsocial-name" htmlFor="websiteLink">Website</label>

        <div className="mediaeyeform-group-input">
          <input
            id="websiteLink"
            className="mediaeyeform-input mediaeyeform-input-round"
            onChange={(e) => handleLinkChange(e)}
            value={links?.website}
            disabled={editSocial}
          />
          <button
            type="button"
            className="btn btn-info mediaeyeform-group-input-btn"
            disabled={editSocial}
          >
            ADD
          </button>
        </div>
      </div>

      <div className="mediaeyeconnectsocial-all">
        <div className="mediaeyeconnectsocial-all-row">
          <div className="mediaeyeconnectsocial-icon">
            <Twitter />
          </div>
          <div className="mediaeyeconnectsocial-name">Twitter</div>
          <button
            type="button"
            onClick={connecttwitter}
            className={
              links?.twitter === ''
                ? 'btn btn-info mediaeyeconnectsocial-btn'
                : 'btn btn-main mediaeyeconnectsocial-btn'
            }
            disabled={!editSocial ? isUserUpdating : true}
          >
            {getSocialMediaButtonText(links?.twitter)}
          </button>
        </div>

        <div className="mediaeyeconnectsocial-all-row">
          <div className="mediaeyeconnectsocial-icon">
            <Discord />
          </div>
          <div className="mediaeyeconnectsocial-name">Discord</div>
          <button
            type="button"
            onClick={connectdiscord}
            className={
              links?.discord === ''
                ? 'btn btn-info mediaeyeconnectsocial-btn'
                : 'btn btn-main mediaeyeconnectsocial-btn'
            }
            disabled={!editSocial ? isUserUpdating : true}
          >
            {getSocialMediaButtonText(links?.discord)}
          </button>
        </div>

        {openInput ? (
          <div className="mediaeyeconnectsocial-all-row">
            <input
              className="mediaeyeform-input mediaeyeconnectsocial-countrycode mediaeyeconnectsocial-input mediaeyeform-input-round"
              value={countryCode}
              onChange={getCountryCode}
              placeholder="+1"
            />

            <input
              className="mediaeyeform-input mediaeyeconnectsocial-input mediaeyeform-input-round"
              value={phoneNo}
              onChange={getPhoneNumber}
              placeholder="Mobile Nu."
            />

            <button
              type="button"
              onClick={handleMobileNumber}
              className="btn btn-info mediaeyeconnectsocial-btn"
              disabled={isUserUpdating}
            >
              Send
            </button>
          </div>
        ) : otpInput ? (
          <div className="mediaeyeconnectsocial-all-row">
            <input
              className="mediaeyeform-input mediaeyeconnectsocial-input mediaeyeform-input-round"
              value={otp}
              onChange={getYourOtp}
              placeholder="OTP here"
            />

            <button
              type="button"
              onClick={handleYourOtp}
              className="btn btn-info mediaeyeconnectsocial-btn"
              disabled={isUserUpdating}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="mediaeyeconnectsocial-all-row">
            <div className="mediaeyeconnectsocial-icon">
              <Telegram />
            </div>
            <div className="mediaeyeconnectsocial-name">Telegram</div>
            <button
              type="button"
              onClick={openMobileInput}
              className={
                links?.telegram === ''
                  ? 'btn btn-info mediaeyeconnectsocial-btn'
                  : 'btn btn-main mediaeyeconnectsocial-btn'
              }
              disabled={!editSocial ? isUserUpdating : true}
            >
              {getSocialMediaButtonText(links?.telegram)}
            </button>
          </div>
        )}

        {userInstaInput ? (
          <div className="mediaeyeconnectsocial-all-row">
            <input
              className="mediaeyeform-input mediaeyeform-input-round mediaeyeconnectsocial-input"
              value={instaUser}
              onChange={(e) => setInstaUser(e.target.value)}
              placeholder="Username"
            />
            <input
              className="mediaeyeform-input mediaeyeform-input-round mediaeyeconnectsocial-input"
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
              Submit
            </button>
          </div>
        ) : (
          <div className="mediaeyeconnectsocial-all-row">
            <div className="mediaeyeconnectsocial-icon">
              <Instagram />
            </div>
            <div className="mediaeyeconnectsocial-name">Instagram</div>
            <button
              type="button"
              onClick={openInstaDetails}
              className={
                links?.instagram === ''
                  ? 'btn btn-info mediaeyeconnectsocial-btn'
                  : 'btn btn-main mediaeyeconnectsocial-btn'
              }
              disabled={!editSocial ? isUserUpdating : true}
            >
              {getSocialMediaButtonText(links?.instagram)}
            </button>
          </div>
        )}

        <div className="mediaeyeconnectsocial-all-row">
          <div className="mediaeyeconnectsocial-icon">
            <Linkedin />
          </div>
          <div className="mediaeyeconnectsocial-name">LinkedIn</div>
          <button
            type="button"
            onClick={connectlinkedin}
            className={
              links?.linkedin === ''
                ? 'btn btn-info mediaeyeconnectsocial-btn'
                : 'btn btn-main mediaeyeconnectsocial-btn'
            }
            disabled={!editSocial ? isUserUpdating : true}
          >
            {getSocialMediaButtonText(links?.linkedin)}
          </button>
        </div>

        <div className="mediaeyeconnectsocial-all-row">
          <div className="mediaeyeconnectsocial-icon">
            <Twitch />
          </div>
          <div className="mediaeyeconnectsocial-name">Twitch</div>
          <button
            type="button"
            onClick={connecttwitch}
            className={
              links?.twitch === ''
                ? 'btn btn-info mediaeyeconnectsocial-btn'
                : 'btn btn-main mediaeyeconnectsocial-btn'
            }
            disabled={!editSocial ? isUserUpdating : true}
          >
            {getSocialMediaButtonText(links?.twitch)}
          </button>
        </div>

        <div className="mediaeyeconnectsocial-all-row">
          <div className="mediaeyeconnectsocial-icon">
            <Spotify />
          </div>
          <div className="mediaeyeconnectsocial-name">Spotify</div>
          <button
            type="button"
            onClick={connectspotify}
            className={
              links?.spotify === ''
                ? 'btn btn-info mediaeyeconnectsocial-btn'
                : 'btn btn-main mediaeyeconnectsocial-btn'
            }
            disabled={!editSocial ? isUserUpdating : true}
          >
            {getSocialMediaButtonText(links?.spotify)}
          </button>
        </div>

        <div className="mediaeyeconnectsocial-all-row">
          <div className="mediaeyeconnectsocial-icon">
            <Flickr />
          </div>
          <div className="mediaeyeconnectsocial-name">Flickr</div>
          <button
            type="button"
            onClick={connectflickr}
            className={
              links?.flickr === ''
                ? 'btn btn-info mediaeyeconnectsocial-btn'
                : 'btn btn-main mediaeyeconnectsocial-btn'
            }
            disabled={!editSocial ? isUserUpdating : true}
          >
            {getSocialMediaButtonText(links?.flickr)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectSocial;
