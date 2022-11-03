import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Collection.scss';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import avatar from '../../../assets/img/avatar_collection.png';
import { useMoralis } from 'react-moralis';
import ChangeChainRequest from '../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import CrossChainSig from '../../../blockchain/functions/Subscription/CrossChainSig';
import {
  createERC721Collection,
  createERC1155Collection
} from '../../../blockchain/functions/Collection';
import Switch from 'react-switch';
import { useSelector, useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { Close, BackArrow, InfoCircle, Edit, EditAvatar } from '../../Icons/';
import FeatureYourNFT from '../../PutOn/PutOnReusables/FeatureYourNFT';
import FEATURETYPE from '../../../utils/featureConstants';
import { EMPTY_FEAT_OBJ } from '../../../blockchain/functions/Feature/EmptyFeat';
import mediaeyespotlight from '../../../assets/img/mediaeyespotlight.png';

import ConnectSocial from '../Addons/ConnectSocial/ConnectSocial';
import {
  GetNetworkIcon,
  GetDefaultImages
} from '../../../blockchain/functions/Utils';
var validate = require('validate.js');
const Collection = (props) => {
  const { user, Moralis } = useMoralis();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const createCollectionForm = useRef();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const [activeMinters, setActiveMinters] = useState([]);
  const [activeToken, setActiveToken] = useState('ERC721');
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [valueSelect] = useState(null);
  const [hideCollection, setHideCollection] = useState(false);
  const [communityCollection, showCommunityCollection] = useState(false);

  const [approvedList, setApprovedList] = useState([]);
  const [readyIds, setReadyIds] = useState({});
  // variable used to decide whether user has access to minters based on sub level
  const [isLevel, setLevel] = useState('true');
  // Collection Fields
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [openSeaURL, setOpenSeaURL] = useState('');
  // Collection Fields Validate
  const [nameValid, setNameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [openSeaURLValid, setOpenSeaURLValid] = useState(true);
  const [symbolValid, setSymbolValid] = useState(true);
  // Collection Images
  const [logo, setLogo] = useState({});

  const [logoURL, setLogoURL] = useState(null);
  const [featured, setFeatured] = useState({});
  const [featuredURL, setFeaturedURL] = useState(null);
  const [banner, setBanner] = useState({});
  const [bannerURL, setBannerURL] = useState(null);
  const animatedComponents = makeAnimated();
  const [toggleFeatureYourNFT, setToggleFeatureYourNFT] = useState(true);
  const [featureInformation, setFeatureInformation] = useState({
    ...EMPTY_FEAT_OBJ,
    feature: toggleFeatureYourNFT
  });
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

  // Search List
  const [searchedMinters, setSearchedMinters] = useState([]);
  const [royaltyPercent, setRoyaltyPercent] = useState('');
  const ROYALTY_MAX = 25;

  const changeName = (e) => {
    if (e.target.value === '') {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
    setName(e.target.value);
  };

  const changeSymbol = (e) => {
    if (e.target.value === '') {
      setSymbolValid(false);
    } else {
      setSymbolValid(true);
    }
    setSymbol(e.target.value);
  };

  const changeOpenSeaURL = (e) => {
    const prefix = 'https://';
    let value = prefix.concat(e.target.value);
    if (e.target.value === '') {
      setOpenSeaURLValid(false);
    } else {
      setOpenSeaURLValid(true);
    }
    setOpenSeaURL(value);
  };

  const changeDescription = (e) => {
    if (e.target.value === '') {
      setDescriptionValid(false);
    } else {
      setDescriptionValid(true);
    }
    setDescription(e.target.value);
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
    /* searchedMinters.forEach(function (item, i) {
      if (item.id === e[0].id) {
        searchedMinters.splice(i, 1);
      }
    });*/
  };

  const handleSearchMinters = (e) => {
    if (e.length > 0) {
      searchMinters(e);
    } else {
      setSearchedMinters([]);
    }
  };

  const searchMinters = async (searchText) => {
    const searchParams = { searchText: searchText };
    // map each minter to a <Select/> label
    const result = await Moralis.Cloud.run('SearchUsers', searchParams);
    const newSearchedMinters = await result
      .filter((searchedUser) => {
        // filter out own user and any users already in the active minter list
        if (
          searchedUser.attributes.ethAddress === user.attributes.ethAddress ||
          activeMinters.filter(
            (e) => e.address === searchedUser.attributes.ethAddress
          ).length > 0
        ) {
          return false;
        }
        return true;
      })
      .map((searchedUser, i) => {
        return {
          id: i,
          address: searchedUser.attributes.ethAddress,
          value: searchedUser.attributes.defaultUsername
            ? 'Unnamed'
            : searchedUser.attributes.username,
          label: (
            <span>
              <img
                style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                src={
                  searchedUser.attributes.profileImage?._url
                    ? searchedUser.attributes.profileImage?._url
                    : avatar
                }
                alt="avatar"
              />
              &ensp;
              {searchedUser.attributes.defaultUsername
                ? searchedUser.attributes.ethAddress
                : searchedUser.attributes.username}
              <button>Add</button>
            </span>
          ),
          img: searchedUser.attributes.profileImage?._url
            ? searchedUser.attributes.profileImage?._url
            : avatar
        };
      });

    setSearchedMinters(newSearchedMinters);
  };

  const deleteMinters = (id) => {
    let arr = activeMinters.slice();
    arr.forEach(function (item, i) {
      if (item.id === id) {
        arr.splice(i, 1);
        //minters.push(item);
      }
    });
    setActiveMinters(arr);
  };

  const activeMintersList = activeMinters.map((item) => {
    return (
      <div className="active_minters_block">
        <img
          src="../img/close_btn.png"
          className="close_btn"
          onClick={() => deleteMinters(item.id)}
          alt="close"
        />
        <img
          style={{ aspectRatio: '1/1', objectFit: 'cover' }}
          src={item.img}
          alt="avatar"
        />
        <h5>{item.value}</h5>
      </div>
    );
  });

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

  var constraints = {
    'Collection-name': {
      presence: true
    },
    'Collection-Symbol': {
      presence: true
    },
    logo: {
      presence: true
    }
  };

  const [createCollectionErrors, setCreateCollectionErrors] = useState([]);

  const onCreatePressed = async () => {
    scrollToRef(createCollectionForm);
    var form = document.querySelector('#mediaeye-create-collection-form');
    var errors = validate(form, constraints);
    setCreateCollectionErrors(errors);
    if (errors == undefined) {
      setLoading(true);
      // if (name === '') {
      //   setNameValid(false);
      // }
      // if (symbol === '') {
      //   setSymbolValid(false);
      // }
      // if (description === '') {
      //   setDescriptionValid(false);
      // }
      // if (openSeaURL === '') {
      //   setOpenSeaURLValid(false);
      // }
      const minters = activeMinters.map((minters) => {
        return minters.address;
      });
      let createdResult = false;

      const subscriptionSig = await CrossChainSig(user, activeNetwork);

      const socialMedia = {
        website: links.website,
        twitter: links.twitter,
        discord: links.discord,
        telegram: links.telegram,
        flickr: links.flickr,
        linkedin: links.linkedin,
        twitch: links.twitch,
        instagram: links.instagram,
        spotify: links.spotify
      };

      if (activeToken === 'ERC721') {
        let mints721 = [];
        for (let key in readyIds) {
          mints721.push({
            to: user.attributes.ethAddress,
            amount: 1,
            tokenData: approvedList[key].id,
            mediaUri: approvedList[key].attributes.ipfs
          });
        }
        featureInformation['feature'] = false; // Temp disable featured as it has been broken again
        createdResult = await createERC721Collection(
          Moralis,
          user.attributes.ethAddress,
          minters,
          mints721,
          description,
          name,
          symbol,
          banner,
          logo,
          dispatch,
          featured,
          hideCollection,
          subscriptionSig,
          socialMedia,
          featureInformation
        );
      } else if (activeToken === 'ERC1155') {
        let mints1155 = [];
        for (let key in readyIds) {
          mints1155.push({
            to: user.attributes.ethAddress,
            amounts: [readyIds[key]],
            data: '0x',
            tokenDatum: [approvedList[key].id],
            mediaUris: [approvedList[key].attributes.ipfs]
          });
        }
        featureInformation['feature'] = false; // Temp disable featured as it has been broken again
        try {
          createdResult = await createERC1155Collection(
            Moralis,
            user.attributes.ethAddress,
            minters,
            mints1155,
            description,
            name,
            banner,
            logo,
            dispatch,
            featured,
            hideCollection,
            subscriptionSig,
            socialMedia,
            featureInformation
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Must fill in all required fields',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
      setLoading(false);

      if (createdResult?.status) {
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message:
              'You have successfully created your Collection, would you like to Mint to that collection?',
            textButton: 'Mint'
          })
        );
        history.replace(`/account/${user?.attributes?.ethAddress}`);
      }
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

  const optionsUsers = [
    {
      id: 1,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 2,
      name: '@user123',
      img: '../img/ava.png'
    },
    {
      id: 3,
      name: '@user123',
      img: '../img/collect-user-1.png'
    },
    {
      id: 4,
      name: '@user123',
      img: '../img/collect-user-2.png'
    },
    {
      id: 5,
      name: '@user123',
      img: '../img/collect-user-3.png'
    },
    {
      id: 6,
      name: '@user123',
      img: '../img/hub_product_wrapper.png'
    },
    {
      id: 7,
      name: '@user123',
      img: '../img/hub_product_wrapper.png'
    },
    {
      id: 8,
      name: '@user123',
      img: '../img/collect-user-2.png'
    },
    {
      id: 9,
      name: '@user123',
      img: '../img/creators_mobile_header.png'
    },
    {
      id: 10,
      name: '@user123',
      img: '../img/ava.png'
    }
  ];

  const removeItem = (id) => {
    const temp = [...product];
    const index = temp.findIndex((item) => item.id === id);
    if (index !== -1) {
      temp.splice(index, 1);
      setProduct(temp);
    }
  };

  let [product, setProduct] = useState(optionsUsers);

  const CollectionUserLevelFeatures = () => {
    return (
      <>
        {user?.attributes?.subscriptionLevel > 1 ? (
          <div className="create-collection-page-inner-content-box-5-setting-grid">
            <div className="create-collection-page-inner-content-box-5-setting-grid-flex">
              <div>
                <div className="create-collection-page-inner-content-box-5-setting-grid-box">
                  <div className="create-collection-page-inner-content-box-5-setting-grid-box-inner">
                    <img src="../img/collect-user-1.png" alt="CollectionUser" />
                    You
                  </div>
                  <div className="create-collection-page-inner-content-box-5-setting-grid-box-bg">
                    Add Collaborator
                  </div>
                </div>
                <div>
                  <div className="create-collection-page-inner-content-box-5-setting-grid-address">
                    <Select
                      className="create-collection-page-inner-content-box-5-setting-grid-address-search_select"
                      components={animatedComponents}
                      options={searchedMinters}
                      filterOption={null}
                      placeholder="@user_name or wallet address"
                      onChange={allowMinters}
                      onInputChange={handleSearchMinters}
                      isMulti
                      value={valueSelect}
                    />
                    <span
                      style={isLevel ? { display: 'none' } : { color: 'red' }}
                    >
                      &nbsp; Required Subscription Level 2 to add minters
                    </span>
                  </div>
                  <div className="create-collection-page-inner-content-box-5-setting-grid-active_minters">
                    {activeMintersList}
                  </div>
                </div>
              </div>
              <button className="btn btn-gaming">Submit</button>
            </div>
            <div className="create-collection-page-inner-content-box-5-setting-grid-five">
              {product.map((user) => (
                <div className="create-collection-page-inner-content-box-5-setting-grid-five-inner">
                  <img
                    className="create-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                    src={user.img}
                    alt="UserImg"
                  />
                  <span onClick={() => removeItem(user.id)}>&times;</span>
                  <p>{user.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="create-collection-page-inner-content-box-5-setting-simple">
              <Switch
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={() => {
                  setHideCollection(!hideCollection);
                }}
                checked={hideCollection}
                height={20}
                width={40}
              />
              <label>Create Community Collection</label>
              <span>Available for Business</span>
              <div className="create-collection-page-inner-content-box-5-setting-lvl-2">
                LVL 2
              </div>
            </div>
            <p className="create-collection-page-inner-content-box-5-setting-para">
              Boost your productivity by granting access to mint NFTs to this
              Collection. Please specificy wallet address of trusted
              representatives.
            </p>
            <button className="btn btn-main">Subscribe</button>
          </div>
        )}
      </>
    );
  };

  const changeSocialLinks = (link, value) => {
    setLinks({ ...links, [link]: value });
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
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('BNB')} alt="BNB" />
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
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('ETH')} alt="ETH" />
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
            <div className="mediaeyetoken-box-circle"></div>
            <div className="mediaeyetoken-box-icon">
              <img src={GetNetworkIcon('FTM')} alt="FTM" />
            </div>
            <div className="mediaeyetoken-box-content">
              <div className="mediaeyetoken-box-content-name">FTM</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const mediaeyetokens = () => {
    return (
      <>
        <div
          className={`mediaeyetokentype-box  ${activeToken === 'ERC721' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => setActiveToken('ERC721')}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name mediaeyeinfo">
                ERC-721
                <span
                  className="mediaeyeinfo-sign"
                  data-class="mediaeyetooltip"
                  data-tip="ERC-721 is a global Token standard exhibiting functionalities of developing the Non-Fungible Tokens over the Ethereum blockchain. The ERC-721 contributes to the rarity and uniqueness to the assets designed and developed. The NFTs are developed with unique uint256 token ID attributes that are available globally."
                >
                  {' '}
                  <InfoCircle type="outline" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mediaeyetokentype-box  ${activeToken === 'ERC1155' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => setActiveToken('ERC1155')}
          >
            <div className="mediaeyetokentype-box-circle"></div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name mediaeyeinfo">
                ERC-1155{' '}
                <span
                  className="mediaeyeinfo-sign"
                  data-class="mediaeyetooltip"
                  data-tip="ERC-1155 is a token standard specifically designed and developed by the Enjin network. ERC-1155 can be used to create both fungible (currencies) and non-fungible (digital cards, pets and in-game skins) assets exclusively on the Ethereum Blockchain Network Architecture along with Transaction bundling which reduces the cost of token development."
                >
                  <InfoCircle type="outline" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (user?.attributes?.subscriptionLevel < 1) {
    dispatch(
      toggleGeneralPopup({
        status: 'info',
        message:
          'Subscription Level 1 or Level 2 is required to enable creation and minting NFTs to your collection',
        textButton: 'OK',
        size: 'sm'
      })
    );
    history.push('/create');
    return <div className="create-collection-page-inner"></div>;
  } else {
    return (
      <div
        className="create-collection-page-inner"
        id="mediaeye-create-collection-form"
      >
        <Helmet>
          <meta
            property="og:url"
            content={window.location.origin + '/create/collection'}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="NFT Collection Creator Servicers for Groups, Communities Businesses, Artists and Charities | MEDIA EYE"
          />
          <meta
            property="og:description"
            content="Create NFT collections with easy to follow user dashboards and interfaces. Use MEDIA EYE NFT collections creator tools make it easy and fun."
          />
          <meta
            property="og:image"
            content={
              window.location.origin + '/img/meta_tag/create_collections.png'
            }
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:domain"
            content="mediaeyenft.com/create/collection"
          />
          <meta
            property="twitter:url"
            content={window.location.origin + '/create/collection'}
          />
          <meta
            name="twitter:title"
            content="NFT Collection Creator Servicers for Groups, Communities Businesses, Artists and Charities | MEDIA EYE"
          />
          <meta
            name="twitter:description"
            content="Create NFT collections with easy to follow user dashboards and interfaces. Use MEDIA EYE NFT collections creator tools make it easy and fun."
          />
          <meta
            name="twitter:image"
            content={
              window.location.origin + '/img/meta_tag/create_collections.png'
            }
          />
          <title>
            NFT Collection Creator Servicers for Groups, Communities Businesses,
            Artists and Charities | MEDIA EYE
          </title>
          <meta
            name="description"
            content="Create NFT collections with easy to follow user dashboards and interfaces. Use MEDIA EYE NFT collections creator tools make it easy and fun."
          />
        </Helmet>
        <div className="mediaeye-layout-middle">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-container-header">
              <div className="mediaeye-layout-container-header-heading">
                <h2>Mint Collection</h2>
                <a
                  className="mediaeye-layout-container-header-heading-link"
                  href="/"
                  target="_blank"
                >
                  &#9654; Tutorial
                </a>
              </div>
            </div>

            <div className="create-collection-page-inner-content">
              <div className="create-collection-page-inner-content-row create-collection-page-inner-content-row-networks">
                <div className="create-collection-page-inner-content-row-card">
                  <div className="create-collection-page-inner-content-row-card-header">
                    <div className="create-collection-page-inner-content-row-card-header-heading">
                      Blockchain Network And Token Type
                    </div>
                  </div>
                  <div className="create-collection-page-inner-content-row-card-body top">
                    <div className="mediaeyetoken" size={3}>
                      {mediaeyenetworks()}
                    </div>

                    <div
                      className="mediaeyetokentype create-collection-page-inner-content-row-token"
                      size={3}
                    >
                      {mediaeyetokens()}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="create-collection-page-inner-content-row create-collection-page-inner-content-row-metadata"
                ref={createCollectionForm}
              >
                <div className="create-collection-page-inner-content-row-card">
                  <div className="create-collection-page-inner-content-row-card-header">
                    <div className="create-collection-page-inner-content-row-card-header-heading">
                      Collection Metadata
                    </div>
                  </div>
                  <div className="create-collection-page-inner-content-row-card-body mediaeyeform">
                    <div className="create-collection-page-inner-content-row-card-body-colleft">
                      <div className="mediaeyeform-group">
                        <label
                          className="mediaeyeform-label"
                          htmlFor="collectionName"
                        >
                          Collection Name*
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="collectionName"
                            className={
                              createCollectionErrors?.[`Collection-name`]
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            placeholder="Collection Name"
                            value={name}
                            onChange={(e) => changeName(e)}
                            type="text"
                            name="Collection-name"
                          />
                        </div>
                        {createCollectionErrors?.[`Collection-name`] ? (
                          <div className="mediaeyeform-group-input-error-message">
                            {createCollectionErrors?.[`Collection-name`]}
                          </div>
                        ) : null}
                      </div>
                      <div className="mediaeyeform-group">
                        <label
                          className="mediaeyeform-label mediaeyeinfo"
                          htmlFor="collectionSymbol"
                        >
                          Collection Symbol*{' '}
                          <span
                            className="mediaeyeinfo-sign"
                            data-class="mediaeyetooltip"
                            data-tip="Short meta name for a Collection (max 64 characters)"
                          >
                            <InfoCircle type="outline-white" />
                          </span>{' '}
                        </label>
                        <div className="mediaeyeform-group-input mediaeyeform-group-input-auto">
                          <input
                            id="collectionSymbol"
                            className={
                              createCollectionErrors?.[`Collection-Symbol`]
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            type="text"
                            value={symbol}
                            maxLength="64"
                            onChange={(e) => changeSymbol(e)}
                            name="Collection-Symbol"
                          />
                        </div>
                        {createCollectionErrors?.[`Collection-Symbol`] ? (
                          <div className="mediaeyeform-group-input-error-message">
                            {createCollectionErrors?.[`Collection-Symbol`]}
                          </div>
                        ) : null}
                      </div>

                      <div className="mediaeyeform-group">
                        <label
                          className="mediaeyeform-label mediaeyeinfo"
                          htmlFor="creatorRoyalties"
                        >
                          Creator Royalties{' '}
                          <span
                            className="mediaeyeinfo-sign"
                            data-class="mediaeyetooltip"
                            data-html="true"
                            data-tip="
                            Royaties payout to be sent to Creator’s  wallet address.
                            MEDIA EYE supports EIP-2981: NFT Royalty Standard. This standard allows ERC-721 and ERC-1155 contracts to signal a royalty amount to be paid to the NFT creator or rights holder every time the NFT is sold or re-sold even if it was listed on 3rd party marketplace (not MEDIA EYE Marketplace)

                            "
                          >
                            <InfoCircle type="outline-white" />
                          </span>{' '}
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="creatorRoyalties"
                            className="mediaeyeform-input"
                            type="text"
                            placeholder="0.00"
                            max={ROYALTY_MAX}
                            value={royaltyPercent}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              let value = e.target.value;
                              if (value === '' || re.test(value)) {
                                if (e.target.value > ROYALTY_MAX)
                                  value = ROYALTY_MAX;
                                else value = e.target.value;
                                setRoyaltyPercent(value);
                              }
                            }}
                          />
                          <span
                            className="mediaeyeform-group-input-max"
                            onClick={() => setRoyaltyPercent(ROYALTY_MAX)}
                          >
                            MAX
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="create-collection-page-inner-content-row-card-body-colright">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="description">
                          Description
                        </label>
                        <div className="mediaeyetextarea">
                          <textarea
                            id="description"
                            className="mediaeyetextarea-input"
                            value={description}
                            rows="5"
                            onChange={(e) => changeDescription(e)}
                            placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group. "
                            name="Description"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="create-collection-page-inner-content-row create-collection-page-inner-content-row-appearance">
                <div className="create-collection-page-inner-content-row-card">
                  <div className="create-collection-page-inner-content-row-card-header">
                    <div className="create-collection-page-inner-content-row-card-header-heading">
                      Appearance
                    </div>
                  </div>
                  <div className="create-collection-page-inner-content-row-card-body">
                    <div className="create-collection-page-inner-content-row-card-body-colleft create-collection-page-inner-content-row-uploadBox">
                      <div className="mediaeyeform-group text-center">
                        <label className="mediaeyeform-label">Logo Image</label>
                      </div>

                      <div className="create-collection-page-inner-content-row-uploadBox-content">
                        <label className="create-collection-page-inner-content-row-uploadBox-logo">
                          <div
                            className="create-collection-page-inner-content-row-uploadBox-logo-inner"
                            onClick={(event) => {
                              setLogoURL(null);
                              setLogo(null);
                            }}
                          >
                            <img
                              src={logoURL ? logoURL : GetDefaultImages('logo')}
                              alt="UserLogo"
                            />
                            <input
                              type="file"
                              className="create-collection-page-inner-content-row-uploadBox-content-inputfile"
                              name="logo"
                              id="logo"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => handleFileSelected(e)}
                            />
                          </div>
                          <div className="create-collection-page-inner-content-row-uploadBox-content-action create-collection-page-inner-content-row-uploadBox-logo-action">
                            <EditAvatar />
                          </div>
                        </label>
                      </div>
                      <div className="create-collection-page-inner-content-row-uploadBox-bottom">
                        140 x 140 JPEG, PNG
                        <br /> recommended.
                      </div>
                      {createCollectionErrors?.logo ? (
                        <div className="mediaeyeform-group-input-error-message">
                          Logo image is required
                        </div>
                      ) : null}
                    </div>

                    <div className="create-collection-page-inner-content-row-card-body-colmiddle create-collection-page-inner-content-row-uploadBox">
                      <div className="mediaeyeform-group text-center">
                        <label className="mediaeyeform-label">
                          Displayed Image
                        </label>
                      </div>

                      <div className="create-collection-page-inner-content-row-uploadBox-content">
                        <label className="create-collection-page-inner-content-row-uploadBox-display">
                          <div
                            className="create-collection-page-inner-content-row-uploadBox-display-inner"
                            onClick={() => {
                              setFeatured(null);
                              setFeaturedURL(null);
                            }}
                          >
                            <img
                              src={
                                featuredURL
                                  ? featuredURL
                                  : GetDefaultImages('display')
                              }
                              alt="FeaturedImg"
                            />
                            <input
                              type="file"
                              className="create-collection-page-inner-content-row-uploadBox-content-inputfile"
                              id="featured"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => handleFileSelected(e)}
                            />
                          </div>
                          <div className="create-collection-page-inner-content-row-uploadBox-content-action">
                            <EditAvatar />
                          </div>
                        </label>
                      </div>
                      <div className="create-collection-page-inner-content-row-uploadBox-bottom">
                        280 x 170 JPEG, PNG <br />
                        recommended.
                      </div>
                    </div>

                    <div className="create-collection-page-inner-content-row-card-body-colright create-collection-page-inner-content-row-uploadBox">
                      <div className="mediaeyeform-group text-center">
                        <label className="mediaeyeform-label">
                          Banner image
                        </label>
                      </div>
                      <div className="create-collection-page-inner-content-row-uploadBox-content">
                        <label className="create-collection-page-inner-content-row-uploadBox-banner">
                          <div
                            className="create-collection-page-inner-content-row-uploadBox-banner-inner"
                            onClick={(event) => {
                              setBanner(null);
                              setBannerURL(null);
                            }}
                          >
                            <img
                              src={
                                bannerURL
                                  ? bannerURL
                                  : GetDefaultImages('banner')
                              }
                              alt="BannerImg"
                            />
                            <input
                              className="create-collection-page-inner-content-row-uploadBox-content-inputfile"
                              type="file"
                              id="banner"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => handleFileSelected(e)}
                            />
                          </div>
                          <div className="create-collection-page-inner-content-row-uploadBox-content-action">
                            <EditAvatar />
                          </div>
                        </label>
                      </div>
                      <div className="create-collection-page-inner-content-row-uploadBox-bottom">
                        1500 x 240 JPEG, PNG <br />
                        Minimum image size
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="create-collection-page-inner-content-row create-collection-page-inner-content-row-social">
                <div className="create-collection-page-inner-content-row-card">
                  <div className="create-collection-page-inner-content-row-card-header">
                    <div className="create-collection-page-inner-content-row-card-header-heading">
                      Connect Social Media Accounts
                    </div>
                  </div>
                  <div className="create-collection-page-inner-content-row-card-body">
                    <ConnectSocial
                      socialLinks={links}
                      changeSocialLinks={changeSocialLinks}
                    />
                  </div>
                </div>
              </div>

              <div className="create-collection-page-inner-content-row create-collection-page-inner-content-row-setting">
                <div className="create-collection-page-inner-content-row-card">
                  <div className="create-collection-page-inner-content-row-card-header">
                    <div className="create-collection-page-inner-content-row-card-header-heading">
                      Collection Settings
                    </div>
                  </div>
                  <div className="create-collection-page-inner-content-row-card-body">
                    <div className="create-collection-page-inner-content-box-5-setting">
                      <div className="create-collection-page-inner-content-box-5-setting-simple mediaeyeswitch">
                        <Switch
                          className={`mediaeyeswitch-btn mediaeyeswitch-right ${hideCollection ? 'active' : ''
                            }`}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          onChange={() => {
                            setHideCollection(!hideCollection);
                          }}
                          checked={hideCollection}
                          height={21}
                          width={50}
                          id="privateCollection"
                        />
                        <label htmlFor="privateCollection">
                          Private Collection
                        </label>
                      </div>
                      <p className="create-collection-page-inner-content-box-5-setting-para">
                        Enable if you are not ready to share your collection to
                        the Metaverse
                      </p>
                      {communityCollection ? (
                        <div className="create-collection-page-inner-content-box-5-setting-simple mediaeyeswitch">
                          <Switch
                            className={`mediaeyeswitch-btn mediaeyeswitch-right ${communityCollection ? 'active' : ''
                              }`}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onChange={() => {
                              showCommunityCollection(!communityCollection);
                            }}
                            checked={communityCollection}
                            height={21}
                            width={50}
                          />
                          <label>Create Community Collection</label>
                        </div>
                      ) : (
                        <div className="create-collection-page-inner-content-box-5-setting-simple mediaeyeswitch">
                          <Switch
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onChange={() => {
                              showCommunityCollection(!communityCollection);
                            }}
                            checked={communityCollection}
                            height={21}
                            width={50}
                            id="communityCollection"
                            className={`mediaeyeswitch-btn mediaeyeswitch-right ${communityCollection ? 'active' : ''
                              }`}
                          />
                          <label htmlFor="communityCollection">
                            Create Community Collection
                          </label>

                          <label className="avail-text">
                            Available for Business
                          </label>
                          {user?.attributes?.subscriptionLevel != 2 ? (
                            <label
                              className="subscription-level"
                              level={user?.attributes?.subscriptionLevel}
                            >
                              LVL {user?.attributes?.subscriptionLevel}
                            </label>
                          ) : null}
                        </div>
                      )}
                      {communityCollection ? (
                        CollectionUserLevelFeatures()
                      ) : (
                        <>
                          <p className="create-collection-page-inner-content-box-5-setting-para">
                            Boost your productivity by granting access to mint
                            NFTs to this Collection.
                            <br /> Please specify wallet address of trusted
                            representatives.
                          </p>
                          {user?.attributes?.subscriptionLevel != 2 ? (
                            <Link to="/profile/subscription">
                              <button className="btn btn-sm btn-gaming">
                                SUBSCRIBE
                              </button>
                            </Link>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mediaeyeFeatureNft create-collection-page-inner-feature-box">
                <FeatureYourNFT
                  setFeatureInformation={setFeatureInformation}
                  featureInformation={featureInformation}
                  featureType={
                    activeToken === 'ERC721'
                      ? FEATURETYPE.Collection721
                      : FEATURETYPE.Collection1155
                  }
                  type={'Spotlight My Collection'}
                  isFeatured={false}
                />
              </div>
              <div className="create-collection-page-inner-btn">
                <button
                  className="btn btn-lg btn-creative"
                  onClick={onCreatePressed}
                  disabled={isLoading}
                >
                  Mint Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Collection;
