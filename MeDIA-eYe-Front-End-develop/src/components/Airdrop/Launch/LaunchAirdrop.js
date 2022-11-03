import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  GetNetworkIcon,
  GetDefaultImages
} from '../../../blockchain/functions/Utils';
import { Helmet } from 'react-helmet';
import { useMoralis } from 'react-moralis';
import ChangeChainRequest from '../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import ReactTooltip from 'react-tooltip';
import Switch from 'react-switch';
import SelectSearch from 'react-select-search';
import { useSelector, useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { Close, InfoCircle, EditAvatar, Copy } from '../../Icons';
import FeatureYourNFT from '../../PutOn/PutOnReusables/FeatureYourNFT';
import FEATURETYPE from '../../../utils/featureConstants';
import './Launch.scss';
import 'react-datepicker/dist/react-datepicker.css';
import ConnectSocial from '../../CreateProduct/Addons/ConnectSocial/ConnectSocial';
import LaunchTasks from '../AirdropTasks/LaunchTasks';
import { BuyAirdrop } from '../../../blockchain/functions/Airdrops/BuyAirdrop';
import SelectTokenAddress from './SelectTokenAddress';
import WhitelistUser from './WhitelistUser';
import LaunchPrivate from './LaunchPrivate';
import LaunchBuy from './LaunchBuy';
import SelectNFTAddress from './SelectNFTAddress';

const LaunchAirdrop = (props) => {
  const { user, Moralis, isUserUpdating } = useMoralis();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  const dispatch = useDispatch();
  let history = useHistory();
  const [featureInformation, setFeatureInformation] = useState({});
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [activeToken, setActiveToken] = useState(
    activeNetwork === 'BSC' ? 'BNB' : activeNetwork
  );
  const [hideCollection, setHideCollection] = useState(false);
  const [hideAddManually, setHideAddManually] = useState(false);
  const [hideAccessCode, setHideAccessCode] = useState(false);
  const [hidePromoCodes, setHidePromoCodes] = useState(false);
  const [hideUploadparticipants, setHideUploadparticipants] = useState(false);
  // Collection Images
  const [featured, setFeatured] = useState({});
  const [featuredURL, setFeaturedURL] = useState(null);
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(true);

  const [paymentTokensList, setPaymentTokensList] = useState([]);
  // Collection Fields Validate
  const [nameValid, setNameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [openSeaURLValid, setOpenSeaURLValid] = useState(true);
  const [symbolValid, setSymbolValid] = useState(true);
  const [loading, setLoading] = useState(true);
  // Create Airdrop State
  const [accessibility, setAccessibility] = useState('Public');
  const [activeDays, setActiveDays] = useState(21);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [airdropType, setAirdropType] = useState('Token');
  const [airdropLocked, setAirdropLocked] = useState('Locked');
  const [banner, setBanner] = useState({});
  const [bannerURL, setBannerURL] = useState(null);
  const [description, setDescription] = useState('');
  const [embedMedia, setEmbedMedia] = useState('');
  const [tasks, setTasks] = useState({});
  const [logo, setLogo] = useState({});
  const [logoURL, setLogoURL] = useState(null);
  const [name, setName] = useState('');
  const [participantAllocation, setParticipantAllocation] = useState(1);
  // const [SelectNFT, setSelectNFT] = useState(NFTArray);
  const [selectedToken, setSelectedToken] = useState(null);
  const [whitelistDate, setWhitelistDate] = useState(new Date().getTime());
  const [claimDate, setClaimDate] = useState(
    new Date(whitelistDate + Number(activeDays) * 24 * 60 * 60 * 1000).getTime()
  );
  const [totalAllocation, setTotalAllocation] = useState(0);
  const [file, setFile] = React.useState('');

  const [closeAirdropTaskDropdown, setCloseAirdropTaskDropdown] =
    useState(false);

  const dropdownManage = () => {
    // alert('ok');
    setCloseAirdropTaskDropdown(true);
  };

  useEffect(() => {
    setActiveToken(
      activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
        ? 'BNB'
        : activeNetwork
    );
  }, activeNetwork);

  // Collection Links
  const [links, setLinks] = useState({
    website: '',
    discord: '',
    twitter: '',
    instagram: '',
    medium: '',
    telegram: '',
    twitch: '',
    flickr: '',
    linkedin: '',
    spotify: ''
  });

  const changeSocialLinks = (link, value) => {
    setLinks({ ...links, [link]: value });
  };

  const changeName = (e) => {
    if (e.target.value === '') {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
    setName(e.target.value);
  };

  const changeDescription = (e) => {
    if (e.target.value === '') {
      setDescriptionValid(false);
    } else {
      setDescriptionValid(true);
    }
    setDescription(e.target.value);
  };

  const airdropAccessibility = (type) => {
    setAccessibility(type);
  };

  const [activeAirdropTokenFilter, setActiveAirdropTokenFilter] =
    useState('Select...');
  const [activeAirdropNFTFilter, setActiveAirdropNFTFilter] =
    useState('Select...');
  const [NFTTypeFilter, setNFTTypeFilter] = useState();

  const airdropTokenFilter = [
    { name: 'Presale', value: 'Presale' },
    { name: 'Campaign', value: 'Campaign' },
    { name: 'Promotion', value: 'Promotion' },
    { name: 'Private Sale', value: 'PrivateSale' },
    { name: 'Pre-IDO', value: 'PreIDO' }
  ];

  const airdropNFTFilter = [
    { name: 'Pre-Mint', value: 'Pre-Mint' },
    { name: 'First Mint', value: 'FirstMint' },
    { name: 'Special Mint', value: 'SpecialMint' },
    { name: 'ICO', value: 'ICO' }
  ];

  const airdropNFTTypeFilter = [
    { name: 'ERC 721', value: 'ERC 721' },
    { name: 'ERC 1155', value: 'ERC 1155' }
  ];

  const handleFileSelected = async (e) => {
    const files = Array.from(e.target.files);
    // exit if file is not of specified image type:
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg' ||
        files[0]?.type === 'image/gif'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          title: 'Logo image',
          message: 'Must be of type .png, .jpg, .jpeg, .gif',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }
    // create url to load image
    const url = URL.createObjectURL(files[0]);
    if (e.target.id === 'logo') {
      await setLogo(files[0]);
      setLogoURL(url);
    } else if (e.target.id === 'banner') {
      await setBanner(files[0]);
      setBannerURL(url);
    } else if (e.target.id === 'featured') {
      await setFeatured(files[0]);
      setFeaturedURL(url);
    }
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
  }, [user]);

  useEffect(() => {
    if (isLogin === 'false') {
      history.replace('/connect-wallet');
    }
  }, []);

  const payAirdropPressed = async () => {
    let request = {
      accessibility: accessibility,
      activeDays: activeDays,
      activeToken: activeToken,
      additionalInfo: additionalInfo,
      airdropType: airdropType,
      banner: banner,
      description: description,
      embedMedia: embedMedia,
      links: links,
      claimDate: claimDate,
      logo: logo,
      name: name,
      participantAllocation: participantAllocation,
      selectedToken: selectedToken,
      startDate: claimDate,
      tasks: tasks,
      totalAllocation: totalAllocation
    };

    // check if airdrop contract is approved for selected token before proceeding
    await BuyAirdrop(Moralis, request);
  };

  const accessType = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${accessibility === 'Private' ? 'active' : null
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => setAccessibility('Private')}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('private')} alt="private" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Private</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetokentype-box  ${accessibility === 'Public' ? 'active' : null
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => setAccessibility('Public')}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('public')} alt="public" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Public</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyenetworks = () => {
    return (
      <>
        <div
          className={`mediaeyetoken-box ${activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
            ? 'active'
            : ''
            }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              if (activeNetwork != process.env.REACT_APP_BSC_CHAIN_NAME) {
                await ChangeChainRequest(process.env.REACT_APP_BSC_CHAIN_NAME);
              }
            }}
          >
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('BNB')} alt="NetworkIcon" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">BSC</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetoken-box ${activeNetwork === 'ETH' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              if (activeNetwork != 'ETH') {
                await ChangeChainRequest('ETH');
              }
            }}
          >
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('ETH')} alt="NetworkIcon" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">ETH</div>
            </div>
          </div>
        </div>

        <div
          className={`mediaeyetoken-box ${activeNetwork === 'FTM' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetoken-box-inner"
            onClick={async () => {
              if (activeNetwork != 'FTM') {
                await ChangeChainRequest('FTM');
              }
            }}
          >
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('FTM')} alt="NetworkIcon" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">FTM</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyelocked = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${airdropLocked === 'Locked' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropLocked('Locked');
            }}
          >
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Locked</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropLocked === 'Unlocked' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropLocked('Unlocked');
            }}
          >
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Unlocked</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyelockedtokens = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'Token' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('Token');
            }}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('Token')} alt="TokenImage" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 20</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'NFT' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('NFT');
            }}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('NFT')} alt="NFTImage" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 1155</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyeunlockedtokens = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'Token' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('Token');
            }}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('Token')} alt="TokenImage" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 20</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'ERC 721' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('ERC 721');
            }}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('NFT')} alt="NFTImage" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 721</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'NFT' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('NFT');
            }}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('NFT')} alt="NFTImage" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">ERC 1155</div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${airdropType === 'Free Mint' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              // set to null on type switch
              setSelectedToken(null);
              setAirdropType('Free Mint');
            }}
          >
            <div className="mediaeyetokentype-box-icon">
              <img src={GetDefaultImages('NFT')} alt="NFTImage" />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">
                Free Mint
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (
    user?.attributes?.subscriptionLevel < 0 &&
    user?.attributes?.subscriptionEnd < Date.now() / 1000
  ) {
    dispatch(
      toggleGeneralPopup({
        status: 'info',
        message: 'Subscription Level 1 or higher required to create airdrop.',
        textButton: 'OK',
        size: 'sm'
      })
    );
    history.goBack();
    return <> </>;
  } else
    return (
      <>
        <Helmet>
          <meta
            property="og:url"
            content={window.location.origin + '/airdrop/launch'}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Create Airdrops in Minutes Programmatically | MEDIA EYE"
          />
          <meta
            property="og:description"
            content="Create and Schedule Aidrops for NFTs and Tokens, Integrate with Socials and Mass Marketing Services, Assign Tasks and Offer Bounties"
          />
          <meta
            property="og:image"
            content={
              window.location.origin + '/img/meta_tag/create_airdrops.png'
            }
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:domain"
            content="mediaeyenft.com/airdrop/launch"
          />
          <meta
            property="twitter:url"
            content={window.location.origin + '/airdrop/launch'}
          />
          <meta
            name="twitter:title"
            content="Create Airdrops in Minutes Programmatically | MEDIA EYE"
          />
          <meta
            name="twitter:description"
            content="Create and Schedule Aidrops for NFTs and Tokens, Integrate with Socials and Mass Marketing Services, Assign Tasks and Offer Bounties"
          />
          <meta
            name="twitter:image"
            content={
              window.location.origin + '/img/meta_tag/create_airdrops.png'
            }
          />
          <title>
            Create Airdrops in Minutes Programmatically | MEDIA EYE{' '}
          </title>
          <meta
            name="description"
            content="Create and Schedule Aidrops for NFTs and Tokens, Integrate with Socials and Mass Marketing Services, Assign Tasks and Offer Bounties"
          />
        </Helmet>
        <div className="launch-airdrop-page-inner mediaeye-layout-middle">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-container-header">
              <div className="mediaeye-layout-container-header-heading">
                <h2>Create Airdrop</h2>
                <a
                  className="mediaeye-layout-container-header-heading-link"
                  href=""
                  target="_blank"
                >
                  &#9654; Tutorial
                </a>
              </div>
            </div>

            <div className="launch-airdrop-page-inner-content">
              <div className="launch-airdrop-page-inner-content-row launch-airdrop-page-inner-content-row-metadata">
                <div className="launch-airdrop-page-inner-content-row-card">
                  <div className="launch-airdrop-page-inner-content-row-card-header">
                    <div className="launch-airdrop-page-inner-content-row-card-header-heading">
                      Airdrop Metadata
                    </div>
                  </div>
                  <div className="launch-airdrop-page-inner-content-row-card-body mediaeyeform">
                    <div className="launch-airdrop-page-inner-content-row-card-body-colleft">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">
                          Airdrop Name
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            className="mediaeyeform-input"
                            placeholder="My Airdrop Name"
                            type="text"
                            value={name}
                            onChange={(e) => changeName(e)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="launch-airdrop-page-inner-content-row-card-body-colfull">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">
                          Description
                        </label>
                        <div className="mediaeyeform-group-input">
                          <div className="mediaeyetextarea">
                            <textarea
                              value={description}
                              className="mediaeyetextarea-input"
                              rows="5"
                              placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                              onChange={(e) => changeDescription(e)}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="mediaeyeform-group m-0">
                        <label className="mediaeyeform-label mediaeyeinfo">
                          Embed Media{' '}
                          <span
                            className="mediaeyeinfo-sign"
                            data-html={true}
                            data-class="mediaeyetooltip"
                            data-tip="Share from Vimeo, YouTube, GIPHY, SoundCloud, Spotify and more"
                          >
                            <InfoCircle type="outline-white" />
                          </span>
                        </label>
                        <div className="mediaeyeform-group-input">
                          <div className="mediaeyetextarea">
                            <textarea
                              value={embedMedia}
                              className="mediaeyetextarea-input"
                              rows="5"
                              placeholder="Paste Embed Code"
                              onChange={(e) => setEmbedMedia(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="launch-airdrop-page-inner-content-row launch-airdrop-page-inner-content-row-appearance">
                <div className="launch-airdrop-page-inner-content-row-card">
                  <div className="launch-airdrop-page-inner-content-row-card-header">
                    <div className="launch-airdrop-page-inner-content-row-card-header-heading">
                      Appearance
                    </div>
                  </div>
                  <div className="launch-airdrop-page-inner-content-row-card-body mediaeyeform">
                    <div className="launch-airdrop-page-inner-content-row-card-body-colleft launch-airdrop-page-inner-content-row-uploadBox">
                      <div className="mediaeyeform-group text-center">
                        <label className="mediaeyeform-label">Logo Image</label>
                      </div>

                      <div className="launch-airdrop-page-inner-content-row-uploadBox-content">
                        <label className="launch-airdrop-page-inner-content-row-uploadBox-logo">
                          <div
                            className="launch-airdrop-page-inner-content-row-uploadBox-logo-inner"
                            onClick={(event) => {
                              setLogoURL(null);
                              setLogo(null);
                            }}
                          >
                            <img
                              src={logoURL ? logoURL : GetDefaultImages('user')}
                              alt="user-logo"
                            />
                            <input
                              type="file"
                              className="launch-airdrop-page-inner-content-row-uploadBox-content-inputfile"
                              name="logo"
                              id="logo"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => handleFileSelected(e)}
                            />
                          </div>
                          <div className="launch-airdrop-page-inner-content-row-uploadBox-content-action launch-airdrop-page-inner-content-row-uploadBox-logo-action">
                            <EditAvatar />
                          </div>
                        </label>
                      </div>
                      <div className="launch-airdrop-page-inner-content-row-uploadBox-bottom">
                        140 x 140 JPEG, PNG
                        <br /> recommended.
                      </div>
                    </div>

                    <div className="launch-airdrop-page-inner-content-row-card-body-colright launch-airdrop-page-inner-content-row-uploadBox">
                      <div className="mediaeyeform-group text-center">
                        <label className="mediaeyeform-label">
                          Banner Image
                        </label>
                      </div>
                      <div className="launch-airdrop-page-inner-content-row-uploadBox-content">
                        <label className="launch-airdrop-page-inner-content-row-uploadBox-banner">
                          <div className="launch-airdrop-page-inner-content-row-uploadBox-banner-inner">
                            <img
                              src={
                                bannerURL
                                  ? bannerURL
                                  : GetDefaultImages('banner')
                              }
                              alt="banner"
                            />
                            <input
                              className="launch-airdrop-page-inner-content-row-uploadBox-content-inputfile"
                              type="file"
                              id="banner"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => handleFileSelected(e)}
                            />
                          </div>
                          <div className="launch-airdrop-page-inner-content-row-uploadBox-content-action">
                            <EditAvatar />
                          </div>
                        </label>
                      </div>
                      <div className="launch-airdrop-page-inner-content-row-uploadBox-bottom">
                        1500 x 240 JPEG, PNG <br />
                        Minimum image size
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="launch-airdrop-page-inner-content-row launch-airdrop-page-inner-content-row-social">
                <div className="launch-airdrop-page-inner-content-row-card">
                  <div className="launch-airdrop-page-inner-content-row-card-header">
                    <div className="launch-airdrop-page-inner-content-row-card-header-heading">
                      Connect Social Media Accounts
                    </div>
                  </div>
                  <div className="launch-airdrop-page-inner-content-row-card-body">
                    <ConnectSocial
                      socialLinks={links}
                      changeSocialLinks={changeSocialLinks}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="launch-airdrop-page-inner-content-row launch-airdrop-page-inner-content-row-accessibility">
                <div className="launch-airdrop-page-inner-content-row-card">
                  <div className="launch-airdrop-page-inner-content-row-card-header">
                    <div className="launch-airdrop-page-inner-content-row-card-header-heading">
                      Airdrop Accessibility
                    </div>
                  </div>

                  <div className="launch-airdrop-page-inner-content-row-card-body">
                    <div
                      className="mediaeyetokentype create-collection-page-inner-content-row-token m-b-20"
                      size={3}
                    >
                      {accessType()}
                    </div>

                    {accessibility === 'Private' ? (
                      <LaunchPrivate
                        Switch={Switch}
                        setHidePromoCodes={setHidePromoCodes}
                        hidePromoCodes={hidePromoCodes}
                        setHideUploadparticipants={setHideUploadparticipants}
                        hideUploadparticipants={hideUploadparticipants}
                      />
                    ) : null}
                  </div>
                </div>
              </div> */}
              <div className="launch-airdrop-page-inner-content-row-wrap">
                <div className="launch-airdrop-page-inner-content-row launch-airdrop-page-inner-content-row-airdroptype">
                  <div className="launch-airdrop-page-inner-content-row-card">
                    <div className="launch-airdrop-page-inner-content-row-card-header">
                      <div className="launch-airdrop-page-inner-content-row-card-header-heading">
                        Airdrop Type and Bounties
                      </div>
                    </div>

                    <div className="launch-airdrop-page-inner-content-row-card-body">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">Blockchain</label>
                      </div>
                      <div className="mediaeyetoken m-b-30" size={3}>
                        {mediaeyenetworks()}
                      </div>
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label">
                          Airdrop Type
                        </label>
                      </div>
                      <div className="mediaeyetokentype m-b-30" size={3}>
                        {mediaeyelocked()}
                      </div>
                      {airdropLocked == 'Locked' ? (
                        <div className="mediaeyetokentype m-b-30" size={3}>
                          {mediaeyelockedtokens()}
                        </div>
                      ) : (
                        <div className="mediaeyetokentype m-b-30" size={4}>
                          {mediaeyeunlockedtokens()}
                        </div>
                      )}
                      {airdropType === 'Token' ? (
                        <>
                          <div className="mediaeyeform-group">
                            <label className="mediaeyeform-label mediaeyeinfo">
                              Airdrop Category{' '}
                              <span
                                className="mediaeyeinfo-sign"
                                data-html={true}
                                data-class="mediaeyetooltip"
                                data-tip="<strong>Presale</strong> is a sale held or made before an item is made available for purchase.<br/><strong>Campaign</strong> is an organized course of action to achieve a goal.<br/><strong>Promotion</strong> is publicizing a product, organization, or venture to increase sales or public awareness.<br/><strong>Private Sale</strong> is a sale of tokens to a limited number of early investors.<br/><strong>Pre-IDO</strong> is a tokens offerings before the actual initial DEX offering (IDO) takes place.<br/>"
                              >
                                <InfoCircle type="outline-white" />
                              </span>
                              <ReactTooltip />
                            </label>
                            <div className="launch-airdrop-page-inner-content-row-card-body-selectairdrop">
                              <div className="mediaeyeform-group-input">
                                <SelectSearch
                                  className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                  size="lg"
                                  options={airdropTokenFilter}
                                  value={activeAirdropTokenFilter}
                                  placeholder={activeAirdropTokenFilter}
                                  onChange={(opt) =>
                                    setActiveAirdropTokenFilter(opt)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <SelectTokenAddress
                            activeNetwork={activeNetwork}
                            participantAllocation={participantAllocation}
                            selectedToken={selectedToken}
                            totalAllocation={totalAllocation}
                            setSelectedToken={setSelectedToken}
                            setParticipantAllocation={setParticipantAllocation}
                            setTotalAllocation={setTotalAllocation}
                          />
                        </>
                      ) : null}
                      {airdropType === 'NFT' ? (
                        <>
                          <div className="mediaeyeform-group">
                            <label className="mediaeyeform-label mediaeyeinfo">
                              Airdrop Category{' '}
                              <span
                                className="mediaeyeinfo-sign"
                                data-html={true}
                                data-class="mediaeyetooltip"
                                data-tip="<strong>Standard Mint</strong> is a pre-announced mint, whereby the mint address and information are made public ahead of the mint time.<br/><strong>Genesis Mint</strong> can be dropped for a new collection and could be a partial drop for Whitelisters or registered users.<br/><strong>Free Mint.</strong> The only cost to free mints is the transaction fees. <br/><strong>Stealth Mint</strong> approach releases the minting smart contract at the time of or shortly before the NFT mint goes “live” to the public."
                              >
                                <InfoCircle type="outline-white" />
                              </span>
                              <ReactTooltip />
                            </label>
                            <div className="launch-airdrop-page-inner-content-row-card-body-selectairdrop">
                              <div className="mediaeyeform-group-input">
                                <SelectSearch
                                  className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                  size="lg"
                                  options={airdropNFTFilter}
                                  value={activeAirdropNFTFilter}
                                  placeholder={activeAirdropNFTFilter}
                                  onChange={(opt) =>
                                    setActiveAirdropNFTFilter(opt)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          {/* <div className="mediaeyeform-group">
                            <label className="mediaeyeform-label">
                              NFT Type{' '}
                            </label>
                            <div className="launch-airdrop-page-inner-content-row-card-body-selectairdrop">
                              <div className="mediaeyeform-group-input">
                                <SelectSearch
                                  className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                  size="lg"
                                  options={airdropNFTTypeFilter}
                                  value={NFTTypeFilter}
                                  placeholder={NFTTypeFilter}
                                  onChange={(opt) => setNFTTypeFilter(opt)}
                                />
                              </div>
                            </div>
                          </div> */}
                          <SelectNFTAddress
                            activeNetwork={activeNetwork}
                            participantAllocation={participantAllocation}
                            selectedToken={selectedToken}
                            totalAllocation={totalAllocation}
                            setSelectedToken={setSelectedToken}
                            setParticipantAllocation={setParticipantAllocation}
                            setTotalAllocation={setTotalAllocation}
                            NFTTypeFilter={NFTTypeFilter}
                          />
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="launch-airdrop-page-inner-content-row launch-airdrop-page-inner-content-row-whitelist">
                  <WhitelistUser />
                </div>
              </div>
              <div className="launch-airdrop-page-inner-content-row launch-airdrop-page-inner-content-row-airdroptask">
                <div className="launch-airdrop-page-inner-content-row-card">
                  <div className="launch-airdrop-page-inner-content-row-card-header">
                    <div className="launch-airdrop-page-inner-content-row-card-header-heading mediaeyeswitch">
                      Airdrop Tasks
                      <Switch
                        className="mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right"
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          setHideCollection(!hideCollection);
                        }}
                        checked={hideCollection}
                        height={21}
                        width={50}
                      />
                    </div>
                    <div className="launch-airdrop-page-inner-content-row-airdroptask-info">
                      Choose social media tasks to be completed by participants
                      to be able to claim the airdrop rewards.
                    </div>
                  </div>
                  <div className="launch-airdrop-page-inner-content-row-card-body">
                    {hideCollection ? (
                      <LaunchTasks
                        tasksDict={tasks}
                        setTasksDict={setTasks}
                        closeAirdropTaskDropdown={closeAirdropTaskDropdown}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="launch-airdrop-page-inner-content-row launch-airdrop-page-inner-content-row-additionalinfo">
                <div className="launch-airdrop-page-inner-content-row-card">
                  <div className="launch-airdrop-page-inner-content-row-card-header">
                    <div className="launch-airdrop-page-inner-content-row-card-header-heading">
                      Additional Information for Subscribers
                    </div>
                  </div>
                  <div className="launch-airdrop-page-inner-content-row-card-body">
                    <div className="mediaeyetextarea">
                      <textarea
                        className="mediaeyetextarea-input"
                        rows="5"
                        placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group."
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <LaunchBuy
                activeNetwork={activeNetwork}
                activeDays={activeDays}
                activeToken={activeToken}
                setActiveToken={setActiveToken}
                setActiveDays={setActiveDays}
                claimDate={claimDate}
                setClaimDate={setClaimDate}
                setWhiteListDate={setWhitelistDate}
                whitelistDate={whitelistDate}
                payAirdropPressed={payAirdropPressed}
                Moralis={Moralis}
              />
              <div className="mediaeyeFeatureNft launch-airdrop-page-inner-feature-box">
                <div className="mediaeyeFeatureNft-header">
                  <div className="mediaeyeFeatureNft-header-title">
                    Spotlight My Airdrop
                  </div>
                  <div className="mediaeyeinfo">
                    <span
                      className="mediaeyeinfo-sign"
                      data-class="mediaeyetooltip"
                      data-tip="Feature your content across the platform and increase its awareness."
                    >
                      <InfoCircle type="outline" />
                    </span>
                  </div>
                  <Switch
                    className="mediaeyeFeatureNft-switch"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={() => {
                      setToggleFeatureYourNFT(!toggleFeatureYourNFT);
                    }}
                    checked={toggleFeatureYourNFT}
                    height={20}
                    width={50}
                  />
                </div>

                {toggleFeatureYourNFT ? (
                  <FeatureYourNFT
                    setFeatureInformation={setFeatureInformation}
                    featureInformation={featureInformation}
                    featureType={FEATURETYPE.Airdrop}
                    isfeatured={false}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default LaunchAirdrop;
