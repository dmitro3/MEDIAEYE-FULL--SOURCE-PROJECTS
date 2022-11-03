import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './EditCollection.scss';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import avatar from '../../../assets/img/avatar_collection.png';
import { useMoralis } from 'react-moralis';

import { toggleGeneralPopup } from '../../../store/app/appSlice';
import {
  createERC721Collection,
  createERC1155Collection,
  queryCollection,
  updateCollection
} from '../../../blockchain/functions/Collection';
import Switch from 'react-switch';
import { useSelector, useDispatch } from 'react-redux';

import { Close, Edit, EditAvatar } from '../../Icons/';
import FeatureYourNFT from '../../PutOn/PutOnReusables/FeatureYourNFT';
import ConnectSocial from '../../CreateProduct/Addons/ConnectSocial/ConnectSocial';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import formatAdddress from '../../../utils/formatAdddress';
const Collection = (props) => {
  const {
    authenticate,
    isAuthenticated,
    isInitialized,
    user,
    setUserData,
    userError,
    isUserUpdating,
    Moralis
  } = useMoralis();
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const [activeMinters, setActiveMinters] = useState([]);
  const { address, chain } = useParams();
  const [collection, setCollection] = useState();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [valueSelect] = useState(null);
  const [hideCollection, setHideCollection] = useState(false);
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
  const [logoURL, setLogoURL] = useState();
  const [featured, setFeatured] = useState({});
  const [featuredURL, setFeaturedURL] = useState(null);
  const [banner, setBanner] = useState({});
  const [bannerURL, setBannerURL] = useState();
  const animatedComponents = makeAnimated();
  // social media Links
  const ROYALTY_MAX = 10;
  const [royaltyPercent, setRoyaltyPercent] = useState(0);
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

  const getCollectionInfo = async () => {
    const collection = await queryCollection(Moralis, address);
    setCollection(collection);
    setName(collection?.attributes?.name);
    setDescription(collection?.attributes?.description);
    setSymbol(collection?.attributes?.symbol);
    setLogoURL(collection?.attributes?.logo);
    setBannerURL(collection?.attributes?.banner);
    setFeaturedURL(collection?.attributes?.featured);
    setLinks(collection?.attributes?.links);
    setHideCollection(collection?.attributes?.hidden === true);

    // get minter info
    const minterAddresses = collection?.attributes?.minters;
    const minters = [];
    for (let i = 0; i < minterAddresses?.length; i++) {
      const user = await Moralis.Cloud.run('queryUser', {
        address: minterAddresses[i]
      });
      const minter = {
        id: user?.id,
        address: user?.attributes.ethAddress,
        value:
          user?.attributes.defaultUsername === false
            ? user?.attributes.username
            : formatAdddress(user?.attributes.ethAddress),
        img: user?.attributes.profileImage?._url
          ? user?.attributes.profileImage?._url
          : avatar
      };
      minters.push(minter);
    }
    setActiveMinters(minters);
  };

  useEffect(() => {
    if (isInitialized) getCollectionInfo();
  }, [isInitialized]);

  useEffect(() => {
    // check user is owner of collection
    if (
      user?.attributes?.ethAddress &&
      collection?.attributes?.owner &&
      user?.attributes?.ethAddress !== collection?.attributes?.owner
    ) {
      // error popup
      history.goBack();
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'You must own the collection to edit it!',
          size: 'sm',
          textButton: 'OK'
        })
      );
    }
  }, [user, collection, isInitialized]);

  const changeSocialLinks = (link, value) => {
    setLinks({ ...links, [link]: value });
  };
  const editPopUp = async () => {
    if (isInitialized) {
      const minters = activeMinters.map((minter) => minter.address);
      const params = {
        name: nameValid ? name : null,
        description: descriptionValid ? description : null,
        symbol: symbolValid ? symbol : null,
        logo: logo,
        banner: banner,
        featured: featured,
        links: links,
        hidden: hideCollection,
        minters: minters
      };
      const result = await updateCollection(Moralis, collection, params);

      if (result) {
        history.goBack();
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: 'Your collection has been successfully updated ',
            size: 'sm',
            textButton: 'OK'
          })
        );
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Your collection has failed to update ',
            size: 'sm',
            textButton: 'OK'
          })
        );
      }
    }
  };

  // handle change text fields
  const changeName = (e) => {
    if (e.target.value === '') setNameValid(false);
    else setNameValid(true);
    setName(e.target.value);
  };

  const changeSymbol = (e) => {
    // if (e.target.value === '') setSymbolValid(false);
    // else setSymbolValid(true);
    setSymbol(e.target.value);
  };

  const changeOpenSeaURL = (e) => {
    const prefix = 'https://';
    let value = prefix.concat(e.target.value);
    if (e.target.value === '') setOpenSeaURLValid(false);
    else setOpenSeaURLValid(true);
    setOpenSeaURL(value);
  };

  const changeDescription = (e) => {
    if (e.target.value === '') setDescriptionValid(false);
    else setDescriptionValid(true);
    setDescription(e.target.value);
  };

  // Search List
  const [searchedMinters, setSearchedMinters] = useState([]);

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
          id: searchedUser.id,
          address: searchedUser.attributes.ethAddress,
          value:
            searchedUser.attributes.defaultUsername === false
              ? searchedUser.attributes.username
              : formatAdddress(searchedUser.attributes.ethAddress),
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

  const activeMintersList = activeMinters.map((item, i) => {
    return (
      <div className="active_minters_block" key={i}>
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
          title: 'Must be of type .png, .jpg, .jpeg, .gif',
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

  const handleLogoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg' ||
        files[0]?.type === 'image/gif' ||
        files[0]?.type === 'image/svg+xml' ||
        files[0]?.type === 'video/mp4' ||
        files[0]?.type === 'model/obj' ||
        files[0]?.name.split('.').pop() === 'gltf' ||
        files[0]?.name.split('.').pop() === 'glb' ||
        files[0]?.name.split('.').pop() === 'obj'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }
    // if file size is larger than 500mb return error
    if (files[0].size > 500000000) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          title: 'File must be smaller than 500mb',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // create url to load image
    const url = URL.createObjectURL(files[0]);
    // set current file
    setLogo(files[0]);
    setLogoURL(url);
  };

  const handleBannerSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg' ||
        files[0]?.type === 'image/gif' ||
        files[0]?.type === 'image/svg+xml' ||
        files[0]?.type === 'video/mp4' ||
        files[0]?.type === 'model/obj' ||
        files[0]?.name.split('.').pop() === 'gltf' ||
        files[0]?.name.split('.').pop() === 'glb' ||
        files[0]?.name.split('.').pop() === 'obj'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          title:
            'Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }
    // if file size is larger than 500mb return error
    if (files[0].size > 500000000) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          title: 'File must be smaller than 500mb',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // create url to load image
    const url = URL.createObjectURL(files[0]);
    // set current file
    setBanner(files[0]);
    setBannerURL(url);
  };

  const handleDisplaySelect = async (e) => {
    const files = Array.from(e.target.files);
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg' ||
        files[0]?.type === 'image/gif' ||
        files[0]?.type === 'image/svg+xml' ||
        files[0]?.type === 'video/mp4' ||
        files[0]?.type === 'model/obj' ||
        files[0]?.name.split('.').pop() === 'gltf' ||
        files[0]?.name.split('.').pop() === 'glb' ||
        files[0]?.name.split('.').pop() === 'obj'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          title:
            'Must be of type .png, .jpg, .jpeg, .gif, .svg, .mp4, .gltf, .glb, .obj',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }
    // if file size is larger than 500mb return error
    if (files[0].size > 500000000) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          title: 'File must be smaller than 500mb',
          textButton: 'OK',
          size: 'sm'
        })
      );
      return;
    }

    // create url to load image
    const url = URL.createObjectURL(files[0]);
    // set current file
    setFeatured(files[0]);
    setFeaturedURL(url);
  };

  const CollectionUserLevelFeatures = () => {
    return (
      <>
        {user?.attributes?.subscriptionLevel > 1 ? (
          <div className="edit-collection-page-inner-content-box-5-setting-grid">
            <div className="edit-collection-page-inner-content-box-5-setting-grid-flex">
              <div>
                <label>Create Community Collection</label>
                <div className="edit-collection-page-inner-content-box-5-setting-grid-box">
                  <div className="edit-collection-page-inner-content-box-5-setting-grid-box-inner">
                    <img src="../img/collect-user-1.png" alt="CollectionUser" />
                    You
                  </div>
                  <div className="edit-collection-page-inner-content-box-5-setting-grid-box-bg">
                    Add Collaborator
                  </div>
                </div>
                <div>
                  <div className="edit-collection-page-inner-content-box-5-setting-grid-address">
                    <Select
                      className="edit-collection-page-inner-content-box-5-setting-grid-address-search_select"
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
                  <div className="edit-collection-page-inner-content-box-5-setting-grid-active_minters">
                    {activeMintersList}
                  </div>
                </div>
              </div>
              <button className="btn btn-info">Submit</button>
            </div>
            <div className="edit-collection-page-inner-content-box-5-setting-grid-five">
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-1.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-2.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-3.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-1.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-2.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-1.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-2.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-3.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-1.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
              <div className="edit-collection-page-inner-content-box-5-setting-grid-five-inner">
                <img
                  className="edit-collection-page-inner-content-box-5-setting-grid-five-inner-image"
                  src="../img/collect-user-2.png"
                  alt="User"
                />
                <span>&times;</span>
                <p>@user123</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="edit-collection-page-inner-content-box-5-setting-simple mediaeyeswitch">
              <Switch
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={() => {
                  setHideCollection(!hideCollection);
                }}
                checked={hideCollection}
                height={21}
                width={50}
                className={`mediaeyeswitch-btn mediaeyeswitch-right ${hideCollection ? 'active' : ''}`}
              />
              <label>Create Community Collection</label>
              <span>Available for Business</span>
              <div className="edit-collection-page-inner-content-box-5-setting-lvl-2">
                LVL 2
              </div>
            </div>
            <p className="edit-collection-page-inner-content-box-5-setting-para">
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

  if (
    user?.attributes?.subscriptionLevel < 0 &&
    user?.attributes?.subscriptionEnd < Date.now() / 1000
  ) {
    dispatch(
      toggleGeneralPopup({
        status: 'info',
        message: 'Subscription Level 1 or higher required to Mint Collection.',
        textButton: 'OK',
        size: 'sm'
      })
    );
    return <div className="edit-collection-page-inner"></div>;
  } else
    return (
      <div className="edit-collection-page-inner mediaeye-layout-middle">
        <div className="mediaeye-layout-container">
          <div className="mediaeye-layout-container-header">
            <div className="mediaeye-layout-container-header-heading">
              <h2>Edit Collection</h2>
            </div>
          </div>

          <div className="edit-collection-page-inner-content">
            <div className="edit-collection-page-inner-content-row edit-collection-page-inner-content-row-metadata">
              <div className="edit-collection-page-inner-content-row-card">
                <div className="edit-collection-page-inner-content-row-card-header">
                  <div className="edit-collection-page-inner-content-row-card-header-heading">
                    Collection Metadata
                  </div>
                </div>
                <div className="edit-collection-page-inner-content-row-card-body mediaeyeform">
                  <div className="edit-collection-page-inner-content-row-card-body-colleft">
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label">
                        Collection name*
                      </label>
                      <div className="mediaeyeform-group-input">
                        <input
                          className="mediaeyeform-input"
                          placeholder="Collection name"
                          value={name}
                          type="text"
                          onChange={(e) => changeName(e)}
                        />
                      </div>
                    </div>

                    {/* <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label">
                        Your Payout wallet address*
                      </label>
                      <div className="mediaeyeform-group-input">
                        <input
                          className="mediaeyeform-input"
                          placeholder="0xC71...1Rc6"
                          type="text"
                        />
                      </div>
                    </div> */}

                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label">
                        Associated Symbol*
                      </label>
                      <div className="mediaeyeform-group-input">
                        <input
                          className="mediaeyeform-input"
                          value={symbol}
                          type="text"
                          onChange={(e) => changeSymbol(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="edit-collection-page-inner-content-row-card-body-colright">
                    {/* <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label">
                        Customized URL
                      </label>
                      <div className="mediaeyeform-group-input">
                        <input
                          className="mediaeyeform-input"
                          placeholder="https://mediaeyenft.com/collection/untitled-collection-12345"
                          type="text"
                          onChange={(e) => changeOpenSeaURL(e)}
                        />
                      </div>
                    </div> */}

                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label">Description</label>
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
                </div>
              </div>
            </div>

            <div className="edit-collection-page-inner-content-row edit-collection-page-inner-content-row-appearance">
              <div className="edit-collection-page-inner-content-row-card">
                <div className="edit-collection-page-inner-content-row-card-header">
                  <div className="edit-collection-page-inner-content-row-card-header-heading">
                    Appearance
                  </div>
                </div>
                <div className="edit-collection-page-inner-content-row-card-body">
                  <div className="edit-collection-page-inner-content-row-card-body-colleft edit-collection-page-inner-content-row-uploadBox">
                    <div className="mediaeyeform-group text-center">
                      <label className="mediaeyeform-label">Logo Image</label>
                    </div>

                    <div className="edit-collection-page-inner-content-row-uploadBox-content">
                      <label className="edit-collection-page-inner-content-row-uploadBox-logo">
                        <div className="edit-collection-page-inner-content-row-uploadBox-logo-inner">
                          <img
                            src={
                              logo?.url ?? logoURL ?? GetDefaultImages('user')
                            }
                            alt="UserLogo"
                          />
                          <input
                            type="file"
                            className="edit-collection-page-inner-content-row-uploadBox-content-inputfile"
                            name="logo"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => handleLogoUpload(e)}
                          />
                        </div>
                        <div className="edit-collection-page-inner-content-row-uploadBox-content-action edit-collection-page-inner-content-row-uploadBox-logo-action">
                          <EditAvatar />
                        </div>
                      </label>
                    </div>
                    <div className="edit-collection-page-inner-content-row-uploadBox-bottom">
                      140 x 140 JPEG, PNG
                      <br /> recommended.
                    </div>
                  </div>
                  <div className="edit-collection-page-inner-content-row-card-body-colmiddle edit-collection-page-inner-content-row-uploadBox">
                    <div className="mediaeyeform-group text-center">
                      <label className="mediaeyeform-label">
                        Displayed Image
                      </label>
                    </div>

                    <div className="edit-collection-page-inner-content-row-uploadBox-content">
                      <label className="edit-collection-page-inner-content-row-uploadBox-display">
                        <div className="edit-collection-page-inner-content-row-uploadBox-display-inner">
                          <img
                            src={
                              featured?.url ??
                              featuredURL ??
                              GetDefaultImages('display')
                            }
                            alt="FeaturedImg"
                          />
                          <input
                            type="file"
                            className="edit-collection-page-inner-content-row-uploadBox-content-inputfile"
                            name="display"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => handleDisplaySelect(e)}
                          />
                        </div>
                        <div className="edit-collection-page-inner-content-row-uploadBox-content-action">
                          <EditAvatar />
                        </div>
                      </label>
                    </div>
                    <div className="edit-collection-page-inner-content-row-uploadBox-bottom">
                      280 x 170 JPEG, PNG <br />
                      recommended.
                    </div>
                  </div>

                  <div className="edit-collection-page-inner-content-row-card-body-colright edit-collection-page-inner-content-row-uploadBox">
                    <div className="mediaeyeform-group text-center">
                      <label className="mediaeyeform-label">Banner image</label>
                    </div>
                    <div className="edit-collection-page-inner-content-row-uploadBox-content">
                      <label className="edit-collection-page-inner-content-row-uploadBox-banner">
                        <div className="edit-collection-page-inner-content-row-uploadBox-banner-inner">
                          <img
                            src={
                              banner?.url ??
                              bannerURL ??
                              GetDefaultImages('banner')
                            }
                            alt="Banner"
                          />
                          <input
                            className="edit-collection-page-inner-content-row-uploadBox-content-inputfile"
                            type="file"
                            name="banner"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e) => handleBannerSelect(e)}
                          />
                        </div>
                        <div className="edit-collection-page-inner-content-row-uploadBox-content-action">
                          <EditAvatar />
                        </div>
                      </label>
                    </div>
                    <div className="edit-collection-page-inner-content-row-uploadBox-bottom">
                      1500 x 240 JPEG, PNG <br />
                      recommended.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit-collection-page-inner-content-row edit-collection-page-inner-content-row-social">
              <div className="edit-collection-page-inner-content-row-card">
                <div className="edit-collection-page-inner-content-row-card-header">
                  <div className="edit-collection-page-inner-content-row-card-header-heading">
                    Connect Social Media Accounts
                  </div>
                </div>
                <div className="edit-collection-page-inner-content-row-card-body">
                  <ConnectSocial
                    socialLinks={links}
                    changeSocialLinks={changeSocialLinks}
                  />
                </div>
              </div>
            </div>

            <div className="edit-collection-page-inner-content-row edit-collection-page-inner-content-row-setting">
              <div className="edit-collection-page-inner-content-row-card">
                <div className="edit-collection-page-inner-content-row-card-header">
                  <div className="edit-collection-page-inner-content-row-card-header-heading">
                    Collection Settings
                  </div>
                </div>
                <div className="edit-collection-page-inner-content-row-card-body">
                  <div className="edit-collection-page-inner-content-box-5-setting">
                    <div className="edit-collection-page-inner-content-box-5-setting-simple mediaeyeswitch">
                      <Switch
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                          setHideCollection(!hideCollection);
                        }}
                        checked={hideCollection}
                        height={21}
                        width={50}
                        className={`mediaeyeswitch-btn mediaeyeswitch-right ${hideCollection ? 'active' : ''}`}
                      />
                      <label>Private Collection</label>
                    </div>
                    <p className="edit-collection-page-inner-content-box-5-setting-para">
                      Enable if you are not ready to share your collection to
                      the Metaverse
                    </p>

                    {CollectionUserLevelFeatures()}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-creative"
                onClick={editPopUp}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Collection;
