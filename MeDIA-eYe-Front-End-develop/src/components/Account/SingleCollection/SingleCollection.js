import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Collapse } from 'react-collapse';
import Switch from 'react-switch';
import { Helmet } from 'react-helmet';
import makeAnimated from 'react-select/animated';
import formatAdddress from '../../../utils/formatAdddress';
import './SingleCollection.scss';
import {
  SearchIcon,
  Report,
  HeartLike,
  Heart,
  ImagePlug,
  Close
} from '../../Icons/';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { useParams } from 'react-router-dom';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import { formatEther } from 'ethers/lib/utils';
import AllMinters from '../../Icons/AllMinters';
import Angle from '../../Icons/Angle';
import Select from 'react-select';
import {
  queryCollection,
  queryFloorPrice,
  queryTotalVolume
} from '../../../blockchain/functions/Collection';
import {
  queryLikesCollection,
  toggleLikeCollection
} from '../../../blockchain/functions/Likes';
import { useMoralis } from 'react-moralis';
import avatar from '../../../assets/img/avatar_collection.png';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { queryNFTs } from '../../../blockchain/functions/NFT/QueryNFTs';
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
  Plus,
  Varify
} from '../../Icons';

import { TwitterShareButton, FacebookShareButton } from 'react-share';
import FilterProperty from '../../ContentMarketplace/FilterProperty/FilterProperty';
import { GetNetworkIcon } from '../../../blockchain/functions/Utils';
import {
  GetDefaultImages,
  CheckUrlExist
} from '../../../blockchain/functions/Utils';
import { formatNFTDisplay } from '../../../utils/FormatNFTDisplay';
import GenerativeLandingTop from '../../GenerativeLanding/GenerativeLandingTop';
import Tabs from '../../Common/AnimatedTab/Tabs';
import MarketplaceNfts from '../../Marketplace/nft/MarketplaceNfts';
import CollectionItemsTab from '../../GenerativeLanding/CollectionItemsTab/CollectionItemsTab';
import { ChainName } from '../../../blockchain/functions/ChangeChain';

const options = [
  { heading: 'Top 20' },
  { value: 'blues', label: 'Blues' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'orchestra', label: 'Orchestra' }
];

const minters = [
  {
    id: 1,
    value: '@user111 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5F',
    name: '@user111',
    wallet: '0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5F',
    img: avatar,
    owner: true,
    minter: false
  },
  {
    id: 2,
    value: '@user222 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5G',
    name: '@user222',
    wallet: '0x732b2e3caBEd09A39d8964eD985bBF253Fe187E5G',
    img: avatar,
    owner: false,
    minter: true
  },
  {
    id: 3,
    value: '@user333 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5H',
    name: '@user333',
    wallet: '0x732b2e3caBEd09A39d8964D985rBF253Fe187E5H',
    img: avatar,
    owner: false,
    minter: true
  },
  {
    id: 4,
    value: '@user444 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5I',
    name: '@user444',
    wallet: '0x732b2e3caBEd09A3ed8964D985bBF253Fe187E5I',
    img: avatar,
    owner: false,
    minter: true
  },
  {
    id: 5,
    value: '@user555 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5J',
    name: '@user555',
    wallet: '0x732b2e3ceEd09A39d8964D985bBF253Fe187E5J',
    img: avatar,
    owner: false,
    minter: true
  },
  {
    id: 6,
    value: '@user666 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5K',
    name: '@user666',
    wallet: '0x732b2e3caBEd09r39d8964D985bBF253Fe187E5K',
    img: avatar,
    owner: false,
    minter: false
  },
  {
    id: 7,
    value: '@user777 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5L',
    name: '@user777',
    wallet: '0x732b2e3caBEd09A39d8964Dr85bBF253Fe187E5L',
    img: avatar,
    owner: false,
    minter: false
  },
  {
    id: 8,
    value: '@user888 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5M',
    name: '@user888',
    wallet: '0x732b2e3caBEd09A39d8964Dr85bBF253Fe187E5M',
    img: avatar,
    owner: false,
    minter: false
  },
  {
    id: 9,
    value: '@user999 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5N',
    name: '@user999',
    wallet: '0x732b2e3caBEd09A39d8964Dr85bBF253Fe187E5N',
    img: avatar,
    owner: false,
    minter: false
  },
  {
    id: 10,
    value: '@user101 0x732b2e3caBEd09A39d8964D985bBF253Fe187Ee5O',
    name: '@user101',
    wallet: '0x732b2e3caBEd09A39d8964Dr85bBF253Fe187E5O',
    img: avatar,
    owner: false,
    minter: false
  }
];

const SingleCollection = (props) => {
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [copyLink, setCopyLink] = useState(false);
  const [activeMinters, setActiveMinters] = useState(minters ? minters : []);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.darkTheme);
  const [showEditblock, setShowEditblock] = useState(false);
  const [searchMinters, setSearchMinters] = useState('');
  const [hiddenCollection, setHiddenCollection] = useState(null);
  let history = useHistory();
  const { address, chain } = useParams();
  const { isInitialized, user, Moralis, web3, isWeb3Enabled } = useMoralis();
  const [collection, setCollection] = useState({});
  const [nfts, setNFTs] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [numOwners, setNumOwners] = useState(0);
  const [numLikes, setNumLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [floorPrice, setFloorPrice] = useState();
  const [generativeCollection, setGenerativeCollection] = useState(false);
  const [jumboCollection, setJumboCollection] = useState(false);
  const [totalVolume, setTotalVolume] = useState();
  const [fixedButtons, setFixedButtons] = useState(true);
  const [username, setUsername] = useState('');
  const [minterOpen, setMinterOpen] = useState(false);
  const [isLevel, setLevel] = useState('true');
  const [collectionLogo, setCollectionLogo] = useState(null);
  const [collectionBanner, setCollectionBanner] = useState(null);
  const [valueSelect, setValueSelect] = useState(false);
  const [showCopyIconOwner, setShowCopyIconOwner] = useState('');
  const [showCopyText, setShowCopyText] = useState('');
  const [minterSearchValue, setMinterSearchValue] = useState();
  const [addMinterOnClick, setAddMinterOnClick] = useState(true);
  const [addingMinters, setAddingMinters] = useState([]);
  const [showMediaeyeActionsSocial, setShowMediaeyeActionsSocial] =
    useState('');
  const animatedComponents = makeAnimated();
  const [searchedMinters, setSearchedMinters] = useState([]);
  const tabs = [
    'Items',
    'Activity'
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabValue, setactiveTabValue] = useState('Items');
  const [copyUserAddress, setCopyUserAddress] = useState('');
  const [collectionOwner, setCollectionOwner] = useState(
    formatAdddress(collection?.attributes?.owner)
  );



  const manageSocialMediaDropdown = (type) => {
    if (showMediaeyeActionsSocial === type) {
      setShowMediaeyeActionsSocial('');
    } else {
      setShowMediaeyeActionsSocial(type);
    }
  };
  const allowMinters = (e) => {
    if (
      user.attributes.subscriptionLevel > 1 &&
      user.attributes.subscriptionEnd > Date.now() / 1000
    ) {
      handleChangMinters(e);
    } else {
      setLevel(false);
    }
  };
  const handleChangMinters = (e) => {
    if (e[0] === undefined) {
      return;
    }
    let arr = activeMinters.slice();
    arr.push(e[0]);
    setActiveMinters(arr);
  };
  const handleSearchMinters = (e) => {
    if (e.length > 0) {
      searchMinters(e);
    } else {
      setSearchedMinters([]);
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
  const url = window.location.href;

  const getFloorPrice = async () => {
    const result = await queryFloorPrice(
      Moralis,
      address,
      collection?.attributes?.chainId
    );
    setFloorPrice(result);
  };

  const getTotalVolume = async () => {
    const result = await queryTotalVolume(
      Moralis,
      address,
      collection?.attributes?.chainId
    );
    setTotalVolume(result);
  };

  const getNumOwners = async () => {
    const params = { collectionAddress: address };
    const result = await Moralis.Cloud.run(
      'queryCollectionOwnersCount',
      params
    );
    setNumOwners(result);
  };

  const getLikes = async () => {
    const { count, likeStatus } = await queryLikesCollection(
      Moralis,
      address,
      collection?.attributes?.chainId
    );
    setNumLikes(count);
    setIsLiked(likeStatus);
  };

  const loadCollectionData = async () => {
    const collection = await queryCollection(Moralis, address);
    setCollection(collection);

    const { results, count } = await queryNFTs(Moralis, {
      colAddress: address,
      chainId: ChainHexString(chain),
      page: 0,
      limit: 16
    });
    setNFTs(results);
    setItemsCount(count);
    setHiddenCollection(collection?.attributes?.hidden);
  };
  const handleToggleLike = async () => {
    const result = await toggleLikeCollection(
      Moralis,
      address,
      collection?.attributes?.chainId
    );
    if (result) setNumLikes(numLikes + 1);
    else if (isLiked !== result) setNumLikes(numLikes - 1);
    setIsLiked(result);
  };

  const searchMintersChange = () => {
    const value = searchMinters.trim().toLowerCase();
    const currentActiveMinters = activeMinters.filter((asset) =>
      asset.value.toLowerCase().includes(value)
    );
    if (value === '') {
      return setActiveMinters(minters);
    }
    return setActiveMinters(currentActiveMinters);
  };

  const handleScroll = (e) => {
    let offset;
    if (window.screen.width > 575) {
      offset = 250;
    } else {
      offset = 550;
    }
    if (
      document.body.clientHeight <
      window.scrollY + window.innerHeight + offset
    ) {
      setFixedButtons(false);
    }
    if (
      document.body.clientHeight >
      window.scrollY + window.innerHeight + offset
    ) {
      setFixedButtons(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(async () => {
    searchMintersChange();
  }, [searchMinters]);

  useEffect(() => {
    if (showCopyText === true) {
      setTimeout(() => {
        setShowCopyText(false);
      }, 20);
    }
  }, [showCopyText]);
  // useEffect(() => {
  //   if (isInitialized) {
  //     userDisplay();
  //   }
  // }, [isInitialized]);


  const userDisplay = async () => {
    const params = { address: collection?.attributes?.owner };
    const user = await Moralis.Cloud.run('queryUser', params);
    if (user?.attributes?.defaultUsername === false)
      setCollectionOwner(user?.attributes?.username);
  };

  const creator = () => {
    return (
      <>
        {user?.attributes?.ethAddress === collection?.attributes?.owner ? (
          <Link
            to={`/account/${user?.attributes?.ethAddress}`}
            className="mediaeye-collection-card-inner-content-creator-link"
          >
            You
          </Link>
        ) : (
          <Link
            to={`/account/${collection?.attributes?.owner}`}
            className="mediaeye-collection-card-inner-content-creator-link"
          >
            {collectionOwner}
          </Link>
        )}
      </>
    );
  };

  useEffect(() => {
    if (copyUserAddress === true) {
      setTimeout(() => {
        setCopyUserAddress(false);
      }, 2000);
    }
  }, [copyUserAddress]);


  const renderSocialMedia = (collection) => {
    let socialMediaIcons = [];
    if (collection?.attributes?.links?.website) {
      socialMediaIcons.push(
        <a
          target="_blank"
          href={collection?.attributes?.links?.website}
          rel="noreferrer"
          className="my-account-page-inner-profileHeader-left-socialmedia-sites globeSetup"
        >
          <Globe />
        </a>
      );
    }
    if (collection?.attributes?.links?.instagram)
      socialMediaIcons.push(
        <a
          target="_blank"
          href={
            'https://instagram.com/' + collection?.attributes?.links?.instagram
          }
          rel="noreferrer"
          className="my-account-page-inner-profileHeader-left-socialmedia-sites instaMargin"
        >
          <Instagram />
        </a>
      );
    if (collection?.attributes?.links?.telegram)
      socialMediaIcons.push(
        <a
          target="_blank"
          href={'https://t.me/' + collection?.attributes?.links?.telegram}
          rel="noreferrer"
          className="my-account-page-inner-profileHeader-left-socialmedia-sites telegramMargin"
        >
          <Telegram />
        </a>
      );
    if (collection?.attributes?.links?.twitter)
      socialMediaIcons.push(
        <a
          target="_blank"
          href={'https://twitter.com/' + collection?.attributes?.links?.twitter}
          rel="noreferrer"
          className="my-account-page-inner-profileHeader-left-socialmedia-sites twitterMargin"
        >
          <Twitter />
        </a>
      );
    if (collection?.attributes?.links?.discord)
      socialMediaIcons.push(
        <a
          target="_blank"
          href={
            'https://discord.com/user/' + collection?.attributes?.links?.discord
          }
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
    if (isInitialized && chain && address) {
      loadCollectionData();
      getNumOwners();
    }
  }, [isInitialized, chain, address]);

  useEffect(() => {
    if (collection?.attributes?.chainId && Moralis.isWeb3Enabled()) {
      getLikes();
      getFloorPrice();
      getTotalVolume();
    }
  }, [collection?.attributes?.chainId, address, web3]);

  useEffect(() => {
    if (isInitialized && collection?.attributes?.owner) {
      userDisplay();
    }
  }, [isInitialized, collection?.attributes?.owner]);

  useEffect(() => {
    if (user) {
      setUsername(user?.attributes?.username);
    }
  }, [user]);

  const CollectionOption = (props) => {
    const { data } = props;
    return <div>{data.nameryy4g}</div>;
  };

  const colorStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        alignItems: 'center',
        backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.05)' : null
      };
    }
  };

  const handleDropdown = () => {
    setValueSelect(true);
  };
  const handleSearchInput = (e) => {
    setAddMinterOnClick(true);
    if (e.target.value.length > 6) {
      setMinterSearchValue(formatAdddress(e.target.value));
    } else {
      setMinterSearchValue(e.target.value);
    }
  };
  const removeMinters = (index) => {
    minters.splice(index, 1);
  };
  const handleAddMinters = (wallet) => {
    setAddMinterOnClick(false);
    setMinterSearchValue('');
    let demo;
    minters.map((result) => {
      if (result.wallet === wallet) {
        demo = [...addingMinters, { value: result.wallet }];
        setAddingMinters(demo);
      }
    });
  };
  const CollectionUserLevelFeatures = () => {
    return (
      <div className="minters-dropdown-inner">
        <div className="minters-dropdown-inner-searchbar">
          <input
            placeholder="@user_name or wallet address"
            type="text"
            onFocus={handleDropdown}
            onChange={handleSearchInput}
            value={minterSearchValue}
          />
        </div>
        {valueSelect ? (
          <div className="mediaeyefancyScroll">
            <div className="minters-dropdown-inner-dropdown">
              {user?.attributes?.ethAddress ===
                collection?.attributes?.owner ? (
                <div className="minters-dropdown-inner-dropdown-section">
                  <div className="minters-dropdown-inner-dropdown-section-title">
                    Add Minter
                  </div>
                  {minters
                    .filter(
                      (x) =>
                        x.minter === false &&
                        x.owner === false &&
                        formatAdddress(x.wallet) === minterSearchValue
                    )
                    .map((item, i) => {
                      return (
                        <>
                          {addMinterOnClick ? (
                            <div
                              className="minters-dropdown-inner-dropdown-section-item"
                              onMouseOver={() =>
                                setShowCopyIconOwner(item.name)
                              }
                              key={i}
                            >
                              <div className="minters-dropdown-inner-dropdown-section-item-left">
                                <img
                                  src="/img/user/mediaeye-user-144.png"
                                  alt="mediaeye-user"
                                />
                                <span className="text-grayShade">
                                  {item.name}
                                </span>
                              </div>
                              <div className="minters-dropdown-inner-dropdown-section-item-right">
                                <span>{formatAdddress(item.wallet)}</span>
                                {showCopyIconOwner === item.name ? (
                                  <div
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        item.wallet
                                      );
                                      setShowCopyText(true);
                                    }}
                                  >
                                    <Copy />{' '}
                                  </div>
                                ) : null}
                                {showCopyText && showCopyIconOwner === item.name
                                  ? 'copied'
                                  : null}
                                {showCopyIconOwner === item.name ? (
                                  <div
                                    onClick={() =>
                                      handleAddMinters(item.wallet)
                                    }
                                  >
                                    <Plus />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                  {minters.filter(
                    (x) =>
                      x.minter === false &&
                      x.owner === false &&
                      formatAdddress(x.wallet) === minterSearchValue
                  ).length < 1 || !addMinterOnClick ? (
                    <div className="text-grayShade text-center minters-dropdown-inner-dropdown-section-title">
                      No Resutls
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div className="minters-dropdown-inner-dropdown-section">
                <div className="minters-dropdown-inner-dropdown-section-title">
                  Owner
                </div>
                {minters
                  .filter((x) => x.owner == true)
                  .map((item, i) => {
                    return (
                      <div
                        className="minters-dropdown-inner-dropdown-section-item"
                        onMouseOver={() => setShowCopyIconOwner(item.name)}
                        key={i}
                      >
                        <div className="minters-dropdown-inner-dropdown-section-item-left">
                          <img
                            src="/img/user/mediaeye-user-144.png"
                            alt="mediaeye-user"
                          />
                          <span className="text-grayShade">{item.name}</span>
                        </div>
                        <div className="minters-dropdown-inner-dropdown-section-item-right">
                          <span>{formatAdddress(item.wallet)}</span>
                          {showCopyIconOwner === item.name ? (
                            <div
                              onClick={() => {
                                navigator.clipboard.writeText(item.wallet);
                                setShowCopyText(true);
                              }}
                            >
                              <Copy />
                            </div>
                          ) : null}
                          {showCopyText && showCopyIconOwner === item.name
                            ? 'copied'
                            : null}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="minters-dropdown-inner-dropdown-section">
                <div className="minters-dropdown-inner-dropdown-section-title">
                  Minter
                </div>
                {minters
                  .filter((x) => x.minter == true)
                  .map((item, i) => {
                    return (
                      <div
                        className="minters-dropdown-inner-dropdown-section-item"
                        onMouseOver={() => setShowCopyIconOwner(item.name)}
                        key={i}
                      >
                        <div className="minters-dropdown-inner-dropdown-section-item-left">
                          <img
                            src="/img/user/mediaeye-user-144.png"
                            alt="mediaeye-user"
                          />
                          <span className="text-grayShade">{item.name}</span>
                        </div>
                        <div className="minters-dropdown-inner-dropdown-section-item-right">
                          <span>{formatAdddress(item.wallet)}</span>
                          {showCopyIconOwner === item.name ? (
                            <div
                              onClick={() => {
                                navigator.clipboard.writeText(item.wallet);
                                setShowCopyText(true);
                              }}
                            >
                              <Copy />
                            </div>
                          ) : null}
                          {showCopyText && showCopyIconOwner === item.name
                            ? 'copied'
                            : null}
                          {showCopyIconOwner === item.name &&
                            user?.attributes?.ethAddress ===
                            collection?.attributes?.owner ? (
                            <div onClick={() => removeMinters(i)}>
                              {' '}
                              <Close />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                <div></div>
              </div>
              <div className="minters-dropdown-inner-dropdown-section">
                {minters.map((result, i) => {
                  return addingMinters.map((e) => {
                    if (result.wallet === e.value) {
                      return (
                        <div
                          className="minters-dropdown-inner-dropdown-section-item"
                          onMouseOver={() => setShowCopyIconOwner(result.name)}
                          key={i}
                        >
                          <div className="minters-dropdown-inner-dropdown-section-item-left">
                            <img
                              src="/img/user/mediaeye-user-144.png"
                              alt="mediaeye-user"
                            />
                            <span className="text-grayShade">
                              {result.name}
                            </span>
                          </div>
                          <div className="minters-dropdown-inner-dropdown-section-item-right">
                            <span>{formatAdddress(result.wallet)}</span>
                            {showCopyIconOwner === result.name ? (
                              <div
                                onClick={() => {
                                  navigator.clipboard.writeText(result.wallet);
                                  setShowCopyText(true);
                                }}
                              >
                                <Copy />
                              </div>
                            ) : null}
                            {showCopyText && showCopyIconOwner === result.name
                              ? 'copied'
                              : null}
                            {showCopyIconOwner === result.name &&
                              user?.attributes?.ethAddress ===
                              collection?.attributes?.owner ? (
                              <div onClick={() => removeMinters(i)}>
                                {' '}
                                <Close />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    }
                  });
                })}
                {/* {minters.filter((x) => x.wallet === addingMinters.value).map((item, i) => {
                  return (
                    <div>
                      working
                    </div>
                  )

                })} */}
                {/* {
                  minters.filter((x) => {
                    { JSON.stringify(x.wallet) }
                    addingMinters.map((result) => {
                      { JSON.stringify(result.value) }

                      if (x.wallet === result.value) {
                        return (
                          <div>ghfhjk;</div>
                        )

                      }
                    })
                  })
                } */}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const [descriptionLimit, setDescriptionLimit] = useState(true);
  const limitTextContent = (text, limit, enable) => {
    if (text?.length > limit) {
      if (enable && text?.length > limit) {
        return (
          <>
            {text.substring(0, limit)}...{' '}
            <span
              onClick={() => setDescriptionLimit(false)}
              className="mediaeyeShowmore"
            >
              Show More
            </span>
          </>
        );
      } else {
        return (
          <>
            {text}...{' '}
            <span
              onClick={() => setDescriptionLimit(true)}
              className="mediaeyeShowmore"
            >
              Show Less
            </span>
          </>
        );
      }
    } else {
      return text;
    }
  };
  const getCreatedAt = () => {
    let date = new Date(collection?.attributes?.createdAt);
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  useEffect(async () => {
    if (
      collection?.attributes?.logo &&
      (await CheckUrlExist(collection?.attributes?.logo))
    ) {
      setCollectionLogo(collection?.attributes?.logo);
    }
  }, [collection?.attributes?.logo]);
  useEffect(async () => {
    if (
      collection?.attributes?.banner &&
      (await CheckUrlExist(collection?.attributes?.banner))
    ) {
      setCollectionBanner(collection?.attributes?.banner);
    }
  }, [collection?.attributes?.banner]);


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
          {user?.attributes?.ethAddress === collection?.attributes?.owner ?
            <Link className="mediaeye-actions-body-row" to={collection?.attributes?.collectionType === 'ERC1155' ?
              "/generative-landing" :
              `/edit/collection/${ChainName(collection?.attributes?.chainId)}/${collection?.attributes?.collectionAddress}`
            }>
              <div className="mediaeye-actions-body-row-icon">
                <Settings />
              </div>
              Edit Collection
            </Link>
            :
            null
          }

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


  const activeComponent = {
    Items: (
      <CollectionItemsTab nfts={nfts} collectionType={collection?.attributes?.collectionType} />
    ),
    Activity: <div>Activity</div>
  };
  const onTabChange = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
      openAccountTabs(tabs[index]);
    }
  };
  const openAccountTabs = (tab) => {
    setactiveTabValue(tab);
  };


  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={
            window.location.origin + '/collections/' + chain + '/' + address
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            collection?.attributes?.name + ' by ' + username + ' | MEDIA EYE'
          }
        />
        <meta
          property="og:description"
          content={collection?.attributes?.description}
        />
        <meta
          property="og:image"
          content={
            collection?.attributes?.banner ? collection?.attributes?.banner : ''
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content={'mediaeyenft.com/collections/' + chain + '/' + address}
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin + '/collections/' + chain + '/' + address
          }
        />
        <meta
          name="twitter:title"
          content={
            collection?.attributes?.name + ' by ' + username + ' | MEDIA EYE'
          }
        />
        <meta
          name="twitter:description"
          content={collection?.attributes?.description}
        />
        <meta
          name="twitter:image"
          content={
            collection?.attributes?.banner ? collection?.attributes?.banner : ''
          }
        />
        <title>
          {collection?.attributes?.name + ' by ' + username + ' | MEDIA EYE'}
        </title>
        <meta
          name="description"
          content={collection?.attributes?.description}
        />
      </Helmet>
      <div className="creator_account account_collection single_collection">
        <div className="mediaeye-layout-content">
          <div className="creator_account_main">
            <div className="creator_account_main-img_line">
              {collectionBanner ? (
                <img
                  className="creator_account_main-img_line-banner"
                  src={collectionBanner}
                  alt="banner"
                />
              ) : (
                <ImagePlug />
              )}
              <div className="creator_account_main-img_line-profiletext">
                <div className="creator_account_main-img_line-profiletext-title">
                  <span> {collection?.attributes?.name}</span>
                  <Varify />
                </div>
                <div className='flex-between'>
                  <div className="creator_account_main-img_line-profiletext-details m-t-50">
                    <div className="creator_account_main-img_line-profiletext-details-data">
                      <div className="creator_account_main-img_line-profiletext-details-data-row1">
                        <span className="text-semitransperant">Created by</span>
                        <span>{creator()}</span>
                      </div>
                      <div className="creator_account_main-img_line-profiletext-details-data-row2">
                        <span className="text-semitransperant">Address</span>
                        <span>
                          {formatAdddress(collection?.attributes?.collectionAddress)}
                        </span>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(
                              collection?.attributes?.collectionAddress
                            );
                            setCopyUserAddress(true);
                          }}
                        >
                          <Copy />{' '}
                        </div>
                        {copyUserAddress
                          ? 'copied'
                          : null}
                      </div>
                    </div>
                  </div>

                  <div className='creator_account_main-img_line-profiletext-right'>
                    <div className='creator_account_main-img_line-profiletext-right-block'>
                      <span>{itemsCount}</span>
                      <span className='subtitle'>Items</span>
                    </div>
                    <div className='creator_account_main-img_line-profiletext-right-block'>
                      <span>{numOwners}</span>
                      <span className='subtitle'>Owners</span>
                    </div>
                    <div className='creator_account_main-img_line-profiletext-right-block'>
                      <span>
                        {floorPrice
                          ? roundString(formatEther(floorPrice), 4)
                          : '-'}{' '}{activeNetwork}</span>
                      <span className='subtitle'>Floor price</span>
                    </div>
                    <div className='creator_account_main-img_line-profiletext-right-block'>
                      <span>{totalVolume
                        ? roundString(formatEther(totalVolume), 4)
                        : '-'}{' '}{activeNetwork}</span>
                      <span className='subtitle'>Volume traded</span>
                    </div>
                    <div className='creator_account_main-img_line-profiletext-right-block'>
                      <span>9%</span>
                      <span className='subtitle'>Royalty</span>
                    </div>
                    <div className='creator_account_main-img_line-profiletext-right-block'>
                      <span>16%</span>
                      <span className='subtitle'>Listed</span>
                    </div>
                    <div className='creator_account_main-img_line-profiletext-right-block no-border'>
                      <span>{getCreatedAt()}</span>
                      <span className='subtitle'>Created</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className=" mediaeye-layout-middle">
              <div
                className="creator_account_main_header"
              >
                <div className="creator_account_main_header_info">
                  <div className="mediaeye-layout-content">
                    <div className='mediaeye-layout-middle creator_account_main_header_info_mainpage m-t-30'>
                      {/* <div className="creator_account_main-img_line-profiletext-details-icons">
                        <div className="creator_account_main-img_line-profiletext-details-icons-globe">
                          {' '}
                          <Globe />
                        </div>
                        <div className="creator_account_main-img_line-profiletext-details-icons-insta">
                          {' '}
                          <Instagram />
                        </div>
                        <div className="creator_account_main-img_line-profiletext-details-icons-telegram">
                          {' '}
                          <Telegram />
                        </div>
                        <div className="creator_account_main-img_line-profiletext-details-icons-twitter">
                          <Twitter />
                        </div>
                        <div className="creator_account_main-img_line-profiletext-details-icons-discord">
                          <Discord />
                        </div>
                      </div> */}
                      <div>
                        {renderSocialMedia()}
                      </div>
                      <div className='creator_account_main_header_info_mainpage_header m-t-20 m-b-40'>
                        <span className='text-semitransperant'>{limitTextContent(
                          collection?.attributes?.description,
                          300,
                          descriptionLimit
                        )}</span>
                        <div
                          className={`mediaeye-actions mediaeye-actions-right ${showMediaeyeActionsSocial ? 'open' : ''
                            } `}
                          onClick={() => manageSocialMediaDropdown('')}
                        >
                          <div className="mediaeye-actions-header">
                            <div className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'share' ? 'active' : ''}`}
                              onClick={(event) => { event.stopPropagation(); manageSocialMediaDropdown('share'); }}>

                              <Share />
                              {showMediaeyeActionsSocial === 'share' ? dorpDownActionsList(showMediaeyeActionsSocial) : null}
                            </div>
                            <div className={`mediaeye-actions-header-btn  ${showMediaeyeActionsSocial === 'actions' ? 'active' : ''}`}
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
                      <div className="mediaeye-tabss">
                        <Tabs
                          tabs={tabs}
                          activeTab={activeTab}
                          onTabChange={onTabChange} />
                      </div>
                      <div className=''>
                        {activeComponent[activeTabValue]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 
                {collection?.attributes?.minters ? (
                  collection?.attributes?.minters.includes(
                    user?.attributes?.ethAddress
                  ) ? (
                    <h3>
                      You are Minter of the {collection?.attributes?.name}
                    </h3>
                  ) : null
                ) : null}
                <div className="creator_account_main_filter">
                  {generativeCollection || jumboCollection ? (
                    <FilterProperty />
                  ) : (
                    <>
                      <div
                        className="minter-section"
                        onClick={() => setMinterOpen(!minterOpen)}
                      >
                        <AllMinters />
                        <span>Minters</span>
                        {minterOpen ? (
                          <Angle side={'up'} />
                        ) : (
                          <Angle side={'down'} />
                        )}
                      </div>
                    </>
                  )}

                  <div
                    className="creator_account_search"
                    onClick={() => setMinterOpen(false)}
                  >
                    <input type="text" placeholder="Search" />
                    <button>
                      <SearchIcon />
                    </button>
                  </div>
                </div>
                {minterOpen ? (
                  <div className="minters-dropdown">
                    {CollectionUserLevelFeatures()}
                  </div>
                ) : null}
                 */}
            </div>
          </div>
          <div
            className={
              fixedButtons
                ? 'put_on_marketplace_buttons_wrapper fixed'
                : 'put_on_marketplace_buttons_wrapper'
            }
          ></div>
        </div>
      </div>
    </>
  );
};

export default SingleCollection;