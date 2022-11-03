import React, { useState, useEffect } from 'react';
import './CharitiesSingle.scss';
import { Helmet } from 'react-helmet';
import TopProducts from '../../../components/ContentMarketplace/Top/TopProducts/TopProducts';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CharityDetailBanner from '../../../assets/img/Charity/CharityProfileBanner.png';
import {
  getorganizationlistbyId,
  getcurrencieslist,
  givingBlockLogin
} from '../../../blockchain/functions/Charity/charitycollection';
import Popover from '@mui/material/Popover';
import {
  Share,
  Horizontal,
  Copy,
  Report,
  Twitter,
  Facebook,
  Code,
  Globe,
  Instagram,
  Telegram,
  Discord,
  Heart,
  Angle,
  InfoCircle,
  DoubleCheck
} from '../../Icons/';
import TopLiveBids from '../../ContentMarketplace/Top/TopLiveBids';
import ItemLoader from '../../Common/ItemLoader';
// media and images
import Check from '../../../assets/img/Charity/check.png';
import {
  toggleCharityDonatePopup,
  toggleGeneralPopup
} from '../../../store/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CharitiesSingle = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const url = window.location.href;
  const [openCrypto, setOpenCrypto] = useState(true);
  const { organizationId, organizationType } = location.state;
  const [currencieslistdata, setcurrencieslistdata] = useState([]);
  const [organizationdetailflag, setorganizationdetailflag] = useState(1);
  const [organizationdetaildata, setorganizationdetaildata] = useState();
  const iframe = useSelector((state) => state.app.getCharityDonationIframe);
  const script = useSelector((state) => state.app.getCharityDonationScript);
  const [organizationdetailiframe, setorganizationdetailiframe] = useState();
  const [organizationdetailscript, setorganizationdetailscript] = useState();
  const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] = useState('');
  const [networkcurrencieslistdata, setnetworkcurrencieslistdata] = useState([]);

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
  const organizationdetail = async (access_token) => {
    if (access_token && organizationId && organizationType) {
      const organizationdetailres = await getorganizationlistbyId(
        access_token,
        organizationId,
        organizationType
      );
      if (organizationdetailres.key == 1) {
        const a = organizationdetailres.organizationdetail;
        const iframecode =
          organizationdetailres.organizationdetail?.widgetCode?.iframe;
        const scriptcode =
          organizationdetailres.organizationdetail?.widgetCode?.script;
        setorganizationdetaildata(a);
        setorganizationdetailiframe(iframecode);
        setorganizationdetailscript(scriptcode);
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
    }
  };
  const currencieslist = async (access_token) => {
    if (access_token && organizationId && organizationType) {
      const currencieslistres = await getcurrencieslist(
        access_token,
        organizationId,
        organizationType
      );
      if (currencieslistres.key == 1) {
        if (organizationType == 'Giving Block') {
          const a = currencieslistres.currencieslist;
          setcurrencieslistdata(a);
        } else {
          const a = currencieslistres.cryptoToken;
          const b = currencieslistres.cryptoCurrencies;
          setcurrencieslistdata(a);
          setnetworkcurrencieslistdata(b);
        }
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
    }
  };
  const handlesettingOpen = () => {
    setOpenCrypto(!openCrypto);
  };
  const dorpDownActionsList = (type) => {
    return type === 'share' ? (
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
        <TwitterShareButton className="mediaeye-actions-body-row" url={url}>
          <div className="mediaeye-actions-body-row-icon">
            <Twitter />
          </div>
          Share on Twitter
        </TwitterShareButton>
        <FacebookShareButton className="mediaeye-actions-body-row" url={url}>
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
    ) : null;
  };
  useEffect(() => {
    if (showMediaeyeActionsSocial) {
      document.addEventListener('click', socialMediaCloseOutSide);
      return () =>
        document.removeEventListener('click', socialMediaCloseOutSide);
    }
  }, [showMediaeyeActionsSocial]);
  useEffect(async () => {
    if (organizationdetailflag == 1) {
      let givingBlockLoginres = await givingBlockLogin();
      if (givingBlockLoginres.key == 1) {
        var access_token = givingBlockLoginres.accessToken;
        organizationdetail(access_token);
        currencieslist(access_token);
        setorganizationdetailflag(0);
      } else {
        setorganizationdetailflag(1);
      }

    }
  });

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={
            window.location.origin + '/charity-place/charity-detail-page'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          property="og:image"
          content={window.location.origin + CharityDetailBanner}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/charity-place/charity-detail-page"
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin + '/charity-place/charity-detail-page'
          }
        />
        <meta
          name="twitter:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + CharityDetailBanner}
        />
        <title>
          NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative
          Collections for Creators, Artists, Sports, Gaming and Charities |
          MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
      </Helmet>
      <div className="mediaeye-charitysingle-inner">
        <div className="mediaeye-charitysingle-profileBanner"></div>
        {organizationdetailflag == 0 ? (
          <div className="mediaeye-layout-container">
            <div className="mediaeye-charitysingle-inner-flexout">
              <div className="CharityAvatar">
                <img
                  src={
                    organizationType == 'Giving Block'
                      ? organizationdetaildata?.logo
                      : organizationdetaildata?.charityLogo.filePath
                  }
                  className="CharityAvatar-img"
                />
              </div>
              <div className="mediaeye-charitysingle-inner-flexout-rightprofile">
                <div className="mediaeye-charitysingle-inner-flexout-rightprofile-firstrow">
                  <h2>
                    {organizationType == 'Giving Block'
                      ? organizationdetaildata?.name
                      : organizationdetaildata?.irdRegisterName}
                    {/* {organizationdetaildata?.name}{' '} */}
                  </h2>
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
                        {showMediaeyeActionsSocial === 'share'
                          ? dorpDownActionsList(showMediaeyeActionsSocial)
                          : null}
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
                        {showMediaeyeActionsSocial === 'actions'
                          ? dorpDownActionsList(showMediaeyeActionsSocial)
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mediaeye-charitysingle-inner-flexout-rightprofile-secondrow">
                  {organizationType == 'Giving Block' ? (
                    <h4 className="mediaeye-charitysingle-inner-flexout-rightprofile-secondrow-col">
                      Charity Id <span>{organizationdetaildata?.id}</span>
                    </h4>
                  ) : (
                    <h4 className="mediaeye-charitysingle-inner-flexout-rightprofile-secondrow-col">
                      Charity Registration (CC) Number{' '}
                      <span>
                        {organizationdetaildata?.charityRegistrationNo}
                      </span>
                    </h4>
                  )}
                  {organizationType == 'Media eye' ? (
                    <h4 className="mediaeye-charitysingle-inner-flexout-rightprofile-secondrow-col">
                      IRD Number <span>{organizationdetaildata?.irdNo}</span>
                    </h4>
                  ) : null}
                  <h4 className="mediaeye-charitysingle-inner-flexout-rightprofile-secondrow-col">
                    Location: <span>{organizationdetaildata?.country}</span>
                  </h4>
                  <h4 className="mediaeye-charitysingle-inner-flexout-rightprofile-secondrow-col">
                    Tax Receipt
                    {organizationType == 'Giving Block' ? (
                      organizationdetaildata?.isReceiptEnabled ? (
                        <div>
                          <DoubleCheck />
                        </div>
                      ) : null
                    ) : organizationdetaildata?.isTaxReceipt ? (
                      <div>
                        <DoubleCheck />
                      </div>
                    ) : null}
                  </h4>
                </div>
                <div className="mediaeye-charitysingle-inner-flexout-rightprofile-secondrow mgap">
                  {organizationType == 'Giving Block' ? (
                    <button
                      type="button"
                      className="btn btn-gaming"
                      onClick={() =>
                        dispatch(
                          toggleCharityDonatePopup({
                            currencies: currencieslistdata,
                            organizationdata: organizationdetaildata
                          })
                        )
                      }
                    >
                      Donate
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-gaming"
                      onClick={() =>
                        dispatch(
                          toggleCharityDonatePopup({
                            currencies: networkcurrencieslistdata,
                            organizationdata: organizationdetaildata,
                            token: currencieslistdata
                          })
                        )
                      }
                    // onClick={() => dispatch(toggleCharityDonatePopup())}
                    >
                      Donate
                    </button>
                  )}
                </div>
              </div>
            </div>
            <section className="mediaeye-layout-section">
              <div className="mediaeye-desc">
                <div
                  className={
                    openCrypto
                      ? 'mediaeye-charitysingle-inner-crypto m-b-50'
                      : 'mediaeye-charitysingle-inner-crypto m-b-50 open'
                  }
                >
                  <div
                    className="mediaeye-charitysingle-inner-crypto-head"
                    onClick={handlesettingOpen}
                  >
                    <h4 className="mediaeyeinfo">
                      Cryptocurrency Accepted{' '}
                      <div
                        className="mediaeyeinfo-sign"
                        data-html={true}
                        data-class="mediaeyetooltip"
                        data-tip="MEDIA EYE supports donation in ERC-20 compatible tokens on the Ethereum and Smart Bitcoin Cash blockchains."
                      >
                        <InfoCircle type="outline-white" />
                      </div>
                    </h4>
                    <ReactTooltip />
                    <button>
                      <Angle side={openCrypto ? 'down' : 'up'} />
                    </button>
                  </div>
                  <div className="mediaeye-charitysingle-inner-crypto-wrapper m-t-30">
                    <div
                      className={
                        openCrypto
                          ? 'mediaeye-charitysingle-inner-crypto-box'
                          : 'mediaeye-charitysingle-inner-crypto-box open'
                      }
                    >
                      <div className="mediaeye-charitysingle-popover">
                        <div className="mediaeye-charitysingle-popover-inner">
                          {currencieslistdata.map((currencies, i) => (
                            <div
                              className="mediaeye-charitysingle-inner-crypto-cont"
                              key={i}
                            >
                              <LazyLoadImage
                                className="Bitcoin"
                                src={
                                  organizationType == 'Giving Block'
                                    ? currencies?.imageUrl
                                    : currencies?.image
                                }
                                effect="opacity"
                                onError={(event) => {
                                  event.target.src = '/img/token/lazyload.png';
                                  event.onerror = null;
                                }}
                              />
                              {currencies?.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h4>Description:</h4>
                <h6>
                  {organizationType == 'Giving Block'
                    ? organizationdetaildata?.websiteBlocks?.whyDonate?.value
                    : organizationdetaildata?.charityDescription}
                </h6>
              </div>
            </section>
            <div className="m-t-30">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading text-center">
                  Participating Creators
                </h2>
              </div>
              <TopLiveBids />
            </div>
          </div>
        ) : (
          <ItemLoader />
        )}
      </div>
    </>
  );
};

export default CharitiesSingle;
