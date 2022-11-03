import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Account.scss';
import AccountMenu from '../AccountMenu/AccountMenu';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { TokenAddress } from '../../../blockchain/functions/Addresses';
import cover from '../../../assets/img/myaccount_cover.png';
import formatAdddress from '../../../utils/formatAdddress';
import { Helmet } from 'react-helmet';
import { queryLikesUser } from '../../../blockchain/functions/Likes';
import { queryFollowCount } from '../../../blockchain/functions/Follows';
import accountTag from '../../../assets/img/CreateCampaign/accountTag.png';
import {
  Copy,
  Discord,
  Globe,
  Instagram,
  Telegram,
  Twitter,
  Horizontal,
  Share,
  Settings,
  Edit,
  Facebook,
  Code,
  Chain,
  QRCode,
  Report
} from '../../Icons';
import { roundString } from '../../../blockchain/functions/Utils';
import { TwitterShareButton, FacebookShareButton } from 'react-share';

const MyAccount = (props) => {
  const [showIcon, setShowIcon] = useState(false);
  const [showIconCover, setShowIconCover] = useState(false);
  const [bio, setBio] = useState('');
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [copyWalletCreators, setCopyWalletCreators] = useState(false);
  const [copyProfileUrl, setCopyProfileUrl] = useState(false);
  const url = window.location.href;
  const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] = useState('');
  const [expanded, setExpanded] = useState(false);
  const dataForDisplay = expanded ? bio : bio.substring(0, 250);
  const {
    Moralis,
    user,
    setUserData,
    userError,
    isUserUpdating,
    isInitialized
  } = useMoralis();
  const [wallet, setWallet] = useState('');
  const [profileLink, setProfileLink] = useState('bit.ly/3w4hkt');
  const [eyeBalance, setEyeBalance] = useState(null);
  const [username, setUsername] = useState('Username');
  const [numLikesUser, setNumLikesUser] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  // here we get the dimensions of the offset in x and y and also the dimensions in percent
  const imagePopupCroppCoordinate = useSelector(
    (state) => state.app.imagePopupCroppCoordinate
  );
  let history = useHistory();
  const location = useLocation();
  // if history pushes an active tab, start on that else use minted
  const initialTab = location?.state?.activeTab
    ? location.state.activeTab
    : 'NFTs';
  const initialCollection = location?.state?.initialCollection;

  const getUserLikes = async () => {
    const { count } = await queryLikesUser(Moralis, user?.id);
    setNumLikesUser(count);
  };

  const getUserFollows = async () => {
    const { numFollowers } = await queryFollowCount(Moralis, user?.id);
    setFollowerCount(numFollowers);
  };

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

  useEffect(() => {
    if (user && isInitialized) {
      getUserLikes();
      getUserFollows();
    }
  }, [user, isInitialized]);

  const openInNewTab = (url) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (copyWalletCreators === true) {
      setTimeout(() => {
        setCopyWalletCreators(false);
      }, 3000);
    }
  }, [copyWalletCreators]);

  useEffect(() => {
    if (copyProfileUrl === true) {
      setTimeout(() => {
        setCopyProfileUrl(false);
      }, 3000);
    }
  }, [copyProfileUrl]);

  useEffect(() => {
    const getBalances = async () => {
      // const web3 = await Moralis.enableWeb3();
      const chainHex = activeNetwork;
      const payload = { chain: activeNetwork.toLowerCase() };
      const balances = await Moralis.Web3API.account.getTokenBalances(payload);

      const tokenAddress = TokenAddress('EYE', chainHex);
      const eyeBalance = balances.find(
        (token) => token.token_address === tokenAddress.toLowerCase()
      );
      if (eyeBalance) {
        setEyeBalance(
          roundString(Moralis.Units.FromWei(eyeBalance.balance), 4)
        );
      } else {
        setEyeBalance(0);
      }
    };
    if (activeNetwork) {
      getBalances();
    }
  }, [activeNetwork]);

  useEffect(() => {
    if (!user) {
      return;
    }
    setWallet(user.attributes.ethAddress);
    getUserData();
  }, [user]);

  const getUserData = async () => {
    // show username if is not the default username
    user.attributes.defaultUsername
      ? setUsername(user.attributes.ethAddress)
      : setUsername(user.attributes.username);
    if (user.attributes.bio) {
      setBio(user?.attributes?.bio);
    }
  };
  const handleEdit = (props) => {
    if (props === 'enter') {
      setShowIcon(true);
    } else {
      setShowIcon(false);
    }
  };

  const handleEditCover = (props) => {
    if (props === 'enter') {
      setShowIconCover(true);
    } else {
      setShowIconCover(false);
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

    /*   dispatch(openImagePopupCropp({ file, aspect: [1, 1] }));
    if (imagePopupCroppCoordinate) { */
    // here we get the dimensions of the offset in x and y and also the dimensions in percent
    const moralisFile = new Moralis.File(file.name, file);
    setUserData({ profileImage: moralisFile });
    /* } */
  };

  const handleHeaderImage = (file) => {
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
    // only take files smaller than 2.8mb for profile header
    if (file.size > 2800000) {
      alert('File must be smaller than 2.8mb');
      return;
    }
    const moralisFile = new Moralis.File(file.name, file);
    setUserData({ headerImage: moralisFile });
  };

  const renderSocialMedia = () => {
    let socialMediaIcons = [];
    if (user?.attributes?.links?.website) {
      socialMediaIcons.push(
        <a
          title="Website"
          target="_blank"
          href={
            user?.attributes?.links?.websiteProtocol +
            user?.attributes?.links?.website
          }
          rel="noreferrer"
          className="my-account-page-inner-profileHeader-left-socialmedia-sites globeSetup"
        >
          <Globe />
        </a>
      );
    }
    if (user?.attributes?.links?.instagram)
      socialMediaIcons.push(
        <a
          title="Instagram"
          target="_blank"
          href={'https://instagram.com/' + user?.attributes?.links?.instagram}
          rel="noreferrer"
          className="my-account-page-inner-profileHeader-left-socialmedia-sites instaMargin"
        >
          <Instagram />
        </a>
      );
    if (user?.attributes?.links?.telegram)
      socialMediaIcons.push(
        <a
          title="Telegram"
          target="_blank"
          href={'https://t.me/' + user?.attributes?.links?.telegram}
          rel="noreferrer"
          className="my-account-page-inner-profileHeader-left-socialmedia-sites telegramMargin"
        >
          <Telegram />
        </a>
      );
    if (user?.attributes?.links?.twitter)
      socialMediaIcons.push(
        <a
          title="Twitter"
          target="_blank"
          href={'https://twitter.com/' + user?.attributes?.links?.twitter}
          rel="noreferrer"
          className="my-account-page-inner-profileHeader-left-socialmedia-sites twitterMargin"
        >
          <Twitter />
        </a>
      );
    if (user?.attributes?.links?.discord)
      socialMediaIcons.push(
        <a
          title="Discord"
          target="_blank"
          href={'https://discord.com/users/' + user?.attributes?.links?.discord}
          rel="noreferrer"
          className="my-account-page-inner-profileHeader-left-socialmedia-sites discordMargin"
        >
          <Discord />
        </a>
      );

    if (socialMediaIcons !== [])
      return (
        <div className="my-account-page-inner-profileHeader-left-socialmedia">
          {socialMediaIcons}
        </div>
      );
    else return null;
  };

  useEffect(() => {
    if (isInitialized) {
      setIsLogin(localStorage.getItem('isLogin'));
    }
  }, [user, isInitialized]);

  useEffect(() => {
    if (isLogin === 'false' && isInitialized) {
      history.replace('/connect-wallet');
    }
  }, [isLogin, isInitialized]);

  const dorpDownActionsList = (type) => {
    return (
      type === 'share' ? (
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
      ) : type === 'actions' ? (
        <div className="mediaeye-actions-body">
          <Link className="mediaeye-actions-body-row">
            <div className="mediaeye-actions-body-row-icon">
              <Report />
            </div>
            Report
          </Link>
        </div>
      ) : null
    )
  };
  return (
    <div className="mediaeye-layout-middle my-account-page">
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/account/' + wallet}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={username + ' Account | MEDIA EYE'} />
        <meta property="og:description" content={username + ' - ' + bio} />
        <meta
          property="og:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : '/img/user/elon_musk.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content={'mediaeyenft.com/account/' + wallet}
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/account/' + wallet}
        />
        <meta
          name="twitter:title"
          content={username + ' Account | MEDIA EYE'}
        />
        <meta name="twitter:description" content={username + ' - ' + bio} />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : '/img/user/elon_musk.png'
          }
        />
        <title>{username + ' Account | MEDIA EYE'}</title>
        <meta name="description" content={username + ' - ' + bio} />
      </Helmet>
      <div className="my-account-page-header">
        <img
          className="my-account-page-header-cover"
          src={
            user?.attributes?.headerImage
              ? user.attributes.headerImage._url
              : cover
          }
          alt="User_img"
          onMouseEnter={() => handleEditCover('enter')}
          onMouseLeave={() => handleEditCover('out')}
        />
        {showIconCover ? (
          <button
            type="button"
            className="my-account-page-header-button"
            onMouseEnter={() => handleEditCover('enter')}
          >
            <Edit type="black" />
            <label>
              <input
                className="edit-icon"
                type="file"
                onChange={(e) => handleHeaderImage(e.target.files[0])}
                disabled={isUserUpdating}
              />
            </label>
          </button>
        ) : null}
      </div>
      <div className="mediaeye-layout-container my-account-page-inner">
        <div className="my-account-page-inner-user">
          <img
            className="userImg"
            onMouseEnter={() => handleEdit('enter')}
            onMouseLeave={() => handleEdit('out')}
            src={
              user?.attributes?.profileImage
                ? user.attributes.profileImage._url
                : '/img/user/elon_musk.png'
            }
            alt="User_img"
          />
          {showIcon ? (
            <button
              type="button"
              className="my-account-page-header-button second-edit"
              onMouseEnter={() => handleEdit('enter')}
              onMouseLeave={() => handleEdit('out')}
            >
              <Edit type="black" />
              <label>
                <input
                  className="edit-icon"
                  type="file"
                  onChange={(e) => handleProfileImage(e.target.files[0])}
                  disabled={isUserUpdating}
                />
              </label>
            </button>
          ) : null}
        </div>
        <div className="my-account-page-inner-profileHeader">
          <div className="my-account-page-inner-profileHeader-left">
            <span className="my-account-page-inner-profileHeader-left-username">
              {username}
            </span>
            <div className="my-account-page-inner-profileHeader-left-details">
              <div className="my-account-page-inner-profileHeader-left-details-card svg-id">
                {formatAdddress(wallet)
                  ? formatAdddress(wallet)
                  : 'not-available'}
                <div className="mediaeye-copy-box">
                  <button
                    type="button"
                    className={
                      copyWalletCreators
                        ? 'mediaeye-copy-btn cpd'
                        : 'mediaeye-copy-btn'
                    }
                    onClick={() => {
                      navigator.clipboard.writeText(wallet);
                      setCopyWalletCreators(true);
                    }}
                  >
                    <Copy type={'white'} />
                  </button>
                  <div className="mediaeye-copy-box-msg">
                    {copyWalletCreators ? <span>Copied</span> : null}
                  </div>
                </div>
              </div>
              <div className="my-account-page-inner-profileHeader-left-details-card svg-copy">
                <Chain />
                <input
                  onClick={
                    profileLink
                      ? () => openInNewTab('https://bit.ly/3w4hkt')
                      : null
                  }
                  type="text"
                  placeholder="bit.ly/3w4hkt"
                  value={profileLink}
                  readOnly
                />
                <div className="mediaeye-copy-box">
                  <button
                    type="button"
                    className={
                      copyProfileUrl
                        ? 'mediaeye-copy-btn cpd'
                        : 'mediaeye-copy-btn'
                    }
                    onClick={() => {
                      navigator.clipboard.writeText(profileLink);
                      setCopyProfileUrl(true);
                    }}
                  >
                    <Copy type={'white'} />
                  </button>
                  <div className="mediaeye-copy-box-msg">
                    {copyProfileUrl ? <span>Copied</span> : null}
                  </div>
                </div>
              </div>
              <a
                href="/img/QRcode.png"
                download
                className="my-account-page-inner-profileHeader-left-details-card qrcode"
              >
                <div className="my-account-page-inner-profileHeader-left-details-card qrcode-icon">
                  <QRCode />
                </div>
                <span>QR Code</span>
              </a>
            </div>
            {renderSocialMedia()}
            {dataForDisplay ? (
              <div className="my-account-page-inner-profileHeader-left-discription">
                {dataForDisplay}{' '}
                <span
                  onClick={() => setExpanded(!expanded)}
                  className="mediaeyeShowmore"
                >
                  {expanded ? 'Show Less' : 'Show More'}
                </span>
              </div>
            ) : null}
            <div
              className="my-account-page-inner-profileHeader-left-imgbottom"
              onClick={() => history.push('/charity-place')}
            >
              <div className="my-account-page-inner-profileHeader-left-imgbottom-inner">
                <img src={accountTag} alt="accountTag" />
                <span>
                  I'm making the world <br />a better place
                </span>
              </div>
            </div>
          </div>

          <div className="my-account-page-inner-profileHeader-right">
            <div className="my-account-page-inner-profileHeader-right-actionBar">
              <div
                className={`mediaeye-actions mediaeye-actions-right ${showMediaeyeActionsSocial ? 'open' : ''
                  } `}
                onClick={() => manageSocialMediaDropdown('')}
              >
                <div className="mediaeye-actions-header">
                  <div className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'share' ? 'active' : ''
                    }`} onClick={(event) => { event.stopPropagation(); manageSocialMediaDropdown('share'); }}>
                    <Share />
                    {showMediaeyeActionsSocial === 'share' ? dorpDownActionsList(showMediaeyeActionsSocial) : null}
                  </div>
                  <div className={`mediaeye-actions-header-btn   ${showMediaeyeActionsSocial === 'actions' ? 'active' : ''}`} onClick={(event) => { event.stopPropagation(); manageSocialMediaDropdown('actions'); }}>
                    <Horizontal />
                    {showMediaeyeActionsSocial === 'actions' ? dorpDownActionsList(showMediaeyeActionsSocial) : null}
                  </div>
                  <div className={`mediaeye-actions-header-btn`} onClick={() => history.push('/profile')}>
                    <Settings />
                  </div>
                </div>

              </div>
              {/* <Link
                to="/profile"
                className="my-account-page-inner-profileHeader-right-setting"
              >
                <Settings />
              </Link> */}
            </div>
            <div className="my-account-page-inner-profileHeader-right-subscription">
              <span>Your Subscription</span>
              <Link
                to="/profile/subscription"
                className="subscription-level"
                level={user?.attributes?.subscriptionLevel}
              >
                {user?.attributes?.subscriptionLevel > 0
                  ? 'LVL ' + user?.attributes?.subscriptionLevel
                  : 'Free'}
              </Link>
            </div>
            <div className="my-account-page-inner-profileHeader-right-subscriptionDropdown"></div>
          </div>
        </div>
      </div>
      <AccountMenu
        active={initialTab}
        isOwner={true}
        initialCollection={initialCollection}
        user={user}
      />
    </div>
  );
};

export default MyAccount;
