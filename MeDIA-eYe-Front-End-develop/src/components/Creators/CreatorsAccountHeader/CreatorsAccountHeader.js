import React, { useEffect, useState } from 'react';
import formatAdddress from '../../../utils/formatAdddress';
import '../../Account/Account/Account.scss';
import cover from '../../../assets/img/myaccount_cover.png';
import accountTag from '../../../assets/img/CreateCampaign/accountTag.png';
import { useMoralis } from 'react-moralis';
import {
  queryLikesUser,
  toggleLikeUser
} from '../../../blockchain/functions/Likes';
import {
  queryFollowCount,
  queryFollowStatus,
  toggleFollow
} from '../../../blockchain/functions/Follows';
import {
  Chain,
  Code,
  Copy,
  Discord,
  Edit,
  Facebook,
  Globe,
  Instagram,
  QRCode,
  Report,
  Settings,
  Share,
  Telegram,
  Twitter,
  Horizontal
} from '../../Icons';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

const CreatorsAccountHeader = (props) => {
  const {
    Moralis,
    isInitialized,
    isUserUpdating,
    isInitializing,
    setUserData
  } = useMoralis();
  const { link, user } = props;
  const [bio, setBio] = useState('');
  const [wallet, setWallet] = useState('');
  const [profileLink, setProfileLink] = useState('bit.ly/3w4hkt');
  const [numLikesUser, setNumLikesUser] = useState(0);
  const [copyProfileUrl, setCopyProfileUrl] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [username, setUsername] = useState('');
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [copyWalletCreators, setCopyWalletCreators] = useState(false);
  const [showCardActionmenu, setShowCardActionmenu] = useState(false);
  const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] =
    useState('');
  let currentListing = {};
  const url = window.location.href;
  const history = useHistory();
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

  const handleToggleLike = async () => {
    const likeStatus = await toggleLikeUser(Moralis, user?.id);

    if (likeStatus) setNumLikesUser(numLikesUser + 1);
    else setNumLikesUser(numLikesUser - 1);
    setUserLiked(likeStatus);
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

  const handleToggleFollow = async () => {
    const followStatus = await toggleFollow(Moralis, user?.id);
    if (followStatus) setFollowerCount(followerCount + 1);
    else setFollowerCount(followerCount - 1);
    setIsFollowed(followStatus);
  };

  const getUserLikes = async () => {
    const { count, likeStatus } = await queryLikesUser(Moralis, user?.id);
    setNumLikesUser(count);
    setUserLiked(likeStatus);
  };

  const getUserFollows = async () => {
    const { numFollowers, numFollowing } = await queryFollowCount(
      Moralis,
      user?.id
    );
    setFollowingCount(numFollowing);
    setFollowerCount(numFollowers);

    const followStatus = await queryFollowStatus(Moralis, user?.id);
    setIsFollowed(followStatus);
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (user && isInitialized) {
      getUserLikes();
      getUserFollows();
    }
  }, [user, isInitialized]);

  useEffect(() => {
    if (user) {
      setBio(user?.attributes?.bio);
      setWallet(user?.attributes?.ethAddress);
      setUsername(user?.attributes?.username);
    }
  }, [user]);

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
        <title>{username} | MEDIA EYE NFT Portal</title>
        <meta name="description" content={bio} />
      </Helmet>
      <div className="my-account-page-header">
        <img
          className="my-account-page-header-cover"
          src={cover}
          alt="CoverImg"
        />
      </div>
      <div className="mediaeye-layout-container my-account-page-inner">
        <div className="my-account-page-inner-user">
          <img
            className="userImg"
            src={
              user?.attributes?.profileImage
                ? user.attributes.profileImage._url
                : '/img/user/elon_musk.png'
            }
            alt="UserImg"
          />
        </div>
        <div className="my-account-page-inner-profileHeader">
          <div className="my-account-page-inner-profileHeader-left">
            <span className="my-account-page-inner-profileHeader-left-username">
              {username}
            </span>
            <div className="my-account-page-inner-profileHeader-left-details">
              <div className="my-account-page-inner-profileHeader-left-details-card svg-id">
                {formatAdddress(wallet)}
                <div className="mediaeye-copy-box">
                  <button
                    type="button"
                    className="mediaeye-copy-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(wallet);
                      setCopyWalletCreators(true);
                    }}
                  >
                    <Copy type={'white'} />
                  </button>
                  <div className="mediaeye-copy-box-msg">
                    {copyWalletCreators ? (
                      <span className="text-grayShade">Copied</span>
                    ) : null}
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
              </div>

              <div className="my-account-page-inner-profileHeader-left-details-card svg-small">
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

              <a
                href="/img/QRcode.png"
                download
                className="my-account-page-inner-profileHeader-left-details-card"
              >
                <QRCode />
                <span className="text-grayShade">QR Code</span>
              </a>
            </div>
            {renderSocialMedia()}
            {bio ? (
              <div className="my-account-page-inner-profileHeader-left-discription">
                {bio}
              </div>
            ) : null}
            <div className="my-account-page-inner-profileHeader-left-imgbottom">
              <div
                className="my-account-page-inner-profileHeader-left-imgbottom-inner"
                onClick={() => history.push('/charity-place')}
              >
                <img src={accountTag} alt="account tag" />
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
                  <div
                    className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'share' ? 'active' : ''
                      }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      manageSocialMediaDropdown('share');
                    }}
                  >
                    <Share />
                    {showMediaeyeActionsSocial === 'share' ? dorpDownActionsList(showMediaeyeActionsSocial) : null}
                  </div>
                  <div
                    className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'actions' ? 'active' : ''
                      }`}
                    onClick={(event) => {
                      event.stopPropagation();
                      manageSocialMediaDropdown('actions');
                    }}
                  >
                    <Horizontal />
                    {showMediaeyeActionsSocial === 'actions' ? dorpDownActionsList(showMediaeyeActionsSocial) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-account-page-inner-profileHeader-right-subscriptionDropdown"></div>
          </div>
        </div>
      </div>
      {/* <AccountMenu
      active={initialTab}
      isOwner={true}
      initialCollection={initialCollection}
      user={user}
    /> */}
    </div>
  );
};
export default CreatorsAccountHeader;
