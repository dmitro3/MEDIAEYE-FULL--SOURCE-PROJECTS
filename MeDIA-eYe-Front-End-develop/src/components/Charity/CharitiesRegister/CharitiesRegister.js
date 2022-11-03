import './CharitiesRegister.scss';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import { useMoralis } from 'react-moralis';
import { Model3d } from '../../3d/Model3d';
import { useHistory } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import { useSelector, useDispatch } from 'react-redux';
import DocumentUpload from '../../Icons/DocumentUpload';
import Image from '../../../assets/img/token/34/BNB.png';
import Check from '../../../assets/img/Charity/check.png';
import React, { useEffect, useState, useRef } from 'react';
import formatAdddress from '../../../utils/formatAdddress';
import { Close, Edit, EditAvatar, Upload } from '../../Icons/';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import {
  GetTokenIcon,
  GetNetworkIcon,
  GetDefaultImages
} from '../../../blockchain/functions/Utils';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import {
  particulartoken,
  gettoken,
  registration,
  particularnetwork
} from '../../../blockchain/functions/Charity/charitycollection';
import { element } from 'prop-types';
import { async } from 'validate.js';

const CharitiesRegister = () => {
  var validate = require('validate.js');

  const image = () => {
    <img src={Image} alt="charity-image" />;
  };

  const {
    authenticate,
    isAuthenticated,
    user,
    setUserData,
    userError,
    isUserUpdating,
    Moralis
  } = useMoralis();

  let constraints = {
    email: {
      presence: true,
      email: true
    },
    RegisteredName: {
      presence: true
    },
    CharityRegistrationNumber: {
      presence: true
    },
    IRDNumber: {
      presence: true
    },
    country: {
      presence: true
    },
    description: {
      presence: true
    },
    // Cryptocurrency: {
    //   presence: true
    // },
    'minimum-donation': {
      presence: true
    },
    image: {
      presence: true
    }
  };

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );

  let history = useHistory();
  const dispatch = useDispatch();
  let inputElement = useRef(null);
  const registerCharityForm = useRef();
  const [logo, setLogo] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setErrors] = useState([]);
  const [banner, setBanner] = useState({});
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');
  const [file, setFile] = React.useState([]);
  const [logoURL, setLogoURL] = useState(null);
  const [featured, setFeatured] = useState({});
  const [IRDNumber, setIRDNumber] = useState('');
  const [bannerURL, setBannerURL] = useState(null);
  const [description, setDescription] = useState('');
  const [cryptoToken, setCryptoToken] = useState('');
  const [walletAddress, setWalletAddress] = useState();
  const [featuredURL, setFeaturedURL] = useState(null);
  const [addressAdded, setAddressAdded] = useState([]);
  const [CryptoOptions, setCryptoOptions] = useState([]);
  const [registerNumber, setRegisterNumber] = useState('');
  const [cryptoDonation, setCryptoDonation] = useState('');
  const [donationschecked, setdonationschecked] = useState(true);
  const [taxrecptchecked, settaxrecptchecked] = useState(true);
  const [CryptoTokenOptions, setCryptoTokenOptions] = useState([]);
  const [CryptoOptionsstatus, setCryptoOptionsstatus] = useState(0);
  const [walletAddressAdded, setWalletAddressAdded] = useState(false);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const [errorCryptocurrency, setErrorCryptocurrency] = useState('false');
  const [placeholderValue, setPlaceholderValue] = useState([]);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeRegisterNumber = (e) => {
    setRegisterNumber(e.target.value);
  };

  const changeIRDNumber = (e) => {
    const validNumber = new RegExp(/^\d*\.?\d*$/);
    let value = e.target.value;
    if (value === '' || validNumber.test(value)) {
      value = setIRDNumber(value);
    }
    // setIRDNumber(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changeSite = (e) => {
    setWebsite(e.target.value);
  };

  const changeCountry = (e) => {
    setCountry(e.target.value);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleClickInput = (e) => {
    inputElement.current.click();
  };

  const editPopUp = async () => {
    if (errorCryptocurrency == 'false') {
      setErrorCryptocurrency('true');
    }
    scrollToRef(registerCharityForm);
    var form = document.querySelector('#mediaeye-register-charity-form');
    var errors = validate(form, constraints);
    setErrors(errors);
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    if (!(addressAdded.length > 0)) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Please select Donation Token',
          size: 'sm',
          textButton: 'OK'
        })
      );
      return;
    }
    let sendData = {};
    let fileData = {};
    sendData.website = website;
    sendData.irdRegisterName = name;
    sendData.charityRegistrationNo = registerNumber;
    sendData.irdNo = IRDNumber;
    sendData.status = 1;
    sendData.email = email;
    sendData.charityDescription = description;
    sendData.country = country;
    sendData.metaMaskId = accounts[0];
    sendData.networktokendata = addressAdded;
    sendData.isAnonymous = donationschecked ? 'true' : 'false';
    sendData.isTaxReceipt = taxrecptchecked ? 'true' : 'false';
    fileData.govdoc = file;
    fileData.logo = logo;
    fileData.banner = banner;
    fileData.status = 0;
    fileData.govdoclength = file.length;
    let regisapires = await registration(sendData, fileData);
    if (regisapires) {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: 'Thanks for registering, we will get back to you soon!',
          size: 'sm',
          textButton: 'OK'
        })
      );
    } else {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Something went wrong,Unable to register please try again later!! ',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
    setName('');
    setRegisterNumber('');
    setIRDNumber('');
    setEmail('');
    setWebsite('');
    setFile([]);
    setCryptoToken('');
    setCryptoDonation('');
    setLogo('');
    setBanner('');
    setDescription('');
    setCountry('');
    setAddressAdded([]);
    setBannerURL(null);
    setLogoURL(null);
    getnetworkfun();
  };

  const handleFileSelected = async (e) => {
    const files = Array.from(e.target.files);
    // exit if file is not of specified image type:
    if (
      !(
        files[0]?.type === 'image/png' ||
        files[0]?.type === 'image/jpeg' ||
        files[0]?.type === 'image/jpg'
      )
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Must be of type .png, .jpg, .jpeg',
          size: 'sm',
          textButton: 'OK'
        })
      );
      return;
    }
    // create url to load image
    const url = URL.createObjectURL(files[0]);
    if (e.target.id === 'logo') {
      setLogo(files[0]);
      setLogoURL(url);
    } else if (e.target.id === 'banner') {
      setBanner(files[0]);
      setBannerURL(url);
    } else if (e.target.id === 'featured') {
      setFeatured(files[0]);
      setFeaturedURL(url);
    }
  };

  // useEffect(() => {
  //   CryptoTokenOptions.filter((item) => item.isChecked === true).map(
  //     (value) => {
  //       console.log(value, 'value');
  //       if (value.isChecked === true) {
  //         placeholderValue.push(value.name);
  //       }
  //     }
  //   );
  // }, [CryptoTokenOptions]);

  console.log(placeholderValue, 'placeholderValue');

  const handleOnChange = async (el) => {
    let findIndex = CryptoTokenOptions.findIndex(
      (element) => element.image == el.image
    );
    let oppIndex = findIndex == 1 ? 0 : 1;
    if (el.isChecked) {
      el.isChecked = false;
      setCryptoToken(el);
      CryptoTokenOptions[findIndex] = el;
      selectone(findIndex, oppIndex, el);
      placeholderValue.push(el.name);
    } else {
      el.isChecked = true;
      setCryptoToken(el);
      CryptoTokenOptions[findIndex] = el;
      // let findersameindex = cryptoDonationToken.findIndex(element => element.symbol == el.symbol);
      // let newUploadList = [...cryptoDonationToken];
      // newUploadList.splice(findersameindex, 1);
      // setcryptoDonationToken(newUploadList);
    }

    function selectone(findIndex, oppIndex, el) {
      let firstchecboxbox = CryptoTokenOptions[findIndex];
      let secondchecboxbox = CryptoTokenOptions[oppIndex];
      if (
        firstchecboxbox.isChecked == false &&
        secondchecboxbox.isChecked == true
      ) {
        console.log('one');
      } else if (
        firstchecboxbox.isChecked == true &&
        secondchecboxbox.isChecked == false
      ) {
        console.log('two');
      } else if (
        firstchecboxbox.isChecked == true &&
        secondchecboxbox.isChecked == true
      ) {
        console.log('three');
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Select atleast one coin',
            textButton: 'OK',
            size: 'sm'
          })
        );
        el.isChecked = true;
        setCryptoToken(el);
        CryptoTokenOptions[findIndex] = el;
        return;
      }
    }
  };

  const addWallet = (e) => {
    setWalletAddress(e.target.value);
    e.preventDefault();
  };

  const handleAddWallet = (e) => {
    e.preventDefault();
    if (
      walletAddress &&
      walletAddress.length >= 26 &&
      walletAddress.length <= 42
    ) {
      setErrorCryptocurrency(false);
      setWalletAddressAdded(!walletAddressAdded);
      let cryptoDonationToken = [];
      CryptoTokenOptions.map((element, index, array) => {
        if (element.isChecked) {
          cryptoDonationToken.push(element);
        }
      });
      let data = {};
      data.name = cryptoDonation.name;
      data.walletAddress = walletAddress;
      data.cryptoDonation = cryptoDonation;
      data.cryptoToken = cryptoDonationToken;
      let length = addressAdded.length;
      addressAdded[length] = data;
      const foundi = CryptoOptions.findIndex(
        (element) => element.apiname == cryptoDonation.apiname
      );
      let aa = cryptoDonation;
      aa.isdisabled = true;
      CryptoOptions[foundi] = aa;
      setCryptoDonation('');
      setCryptoToken('');
      setWalletAddress('');
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleAddWallet();
    }
  };

  const removeWallet = (i) => {
    let newUploadList = [...addressAdded];
    let newUploadListtwo = [...CryptoOptions];
    let aa = newUploadListtwo[i];
    aa.isdisabled = false;
    newUploadListtwo[i] = aa;
    newUploadList.splice(i, 1);
    setAddressAdded(newUploadList);
  };

  const handleUpload = (event) => {
    if (event.target.files[0].size <= 10485760) {
      if (file.length <= 4) {
        setFile((file) => [...file, event.target.files[0]]);
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'You can upload 5 documents only!!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    }
  };

  const deletehandleUpload = (i) => {
    let newUploadList = [...file];
    newUploadList.splice(i, 1);
    setFile(newUploadList);
  };

  const getnetworkfun = async () => {
    let getnetworkres = await particularnetwork();
    setCryptoOptionsstatus(1);
    setCryptoOptions(getnetworkres);
  };

  useEffect(async () => {
    if (cryptoDonation) {
      let gettokenres = await particulartoken(cryptoDonation.apiname);
      setCryptoTokenOptions(gettokenres);
      setCryptoToken(gettokenres);
    }
  }, [cryptoDonation]);

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
  }, [user]);

  useEffect(() => {
    if (isLogin === 'false') {
      history.replace('/connect-wallet');
    }
  });

  useEffect(() => {
    if (CryptoOptionsstatus == 0) {
      getnetworkfun();
    }
  });

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/charity/register'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Register Your Charity. We welcome Charities Globally | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Any legally registered non-profit can take advantage of programmtic technologies, which offer direct dontatios from NFT sales. Join the new era for charitable donation services, become an approved Charity on MEDIA EYE Charity Place"
        />
        <meta
          property="og:image"
          content={
            window.location.origin + '/img/meta_tag/CHARITY_REGISTER.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/charity/register"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/charity/register'}
        />
        <meta
          name="twitter:title"
          content="Register Your Charity. We welcome Charities Globally | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Any legally registered non-profit can take advantage of programmtic technologies, which offer direct dontatios from NFT sales. Join the new era for charitable donation services, become an approved Charity on MEDIA EYE Charity Place"
        />
        <meta
          name="twitter:image"
          content={
            window.location.origin + '/img/meta_tag/CHARITY_REGISTER.png'
          }
        />
        <title>
          Register Your Charity. We welcome Charities Globally | MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Any legally registered non-profit can take advantage of programmtic technologies, which offer direct dontatios from NFT sales. Join the new era for charitable donation services, become an approved Charity on MEDIA EYE Charity Place"
        />
      </Helmet>
      <div
        className="register-charity-page-inner"
        id="mediaeye-register-charity-form"
        ref={registerCharityForm}
      >
        <div className="mediaeye-layout-middle">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-section-header">
              <h2 className="mediaeye-layout-section-header-heading text-senibold m-t-30">
                Register your Charity
              </h2>
              <span className="text-semitransperant">
                Please allow up to 24 hours for moderation process
              </span>
            </div>
            <div className="register-charity-page-inner-content">
              <div className="register-charity-page-inner-content-row register-charity-page-inner-content-row-networks">
                <div className="register-charity-page-inner-content-row-card">
                  <div className="register-charity-page-inner-content-row-card-header">
                    <div className="register-charity-page-inner-content-row-card-header-heading">
                      Charity Metadata
                    </div>
                  </div>

                  <div className="register-charity-page-inner-content-row-card-body mediaeyeform">
                    <div className="register-charity-page-inner-content-row-card-body-colfull">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="IRD">
                          IRD Registered Name*
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="IRD"
                            type="text"
                            className={
                              error?.RegisteredName
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            name="RegisteredName"
                            value={name}
                            onChange={(e) => changeName(e)}
                          />
                        </div>
                        {error?.RegisteredName ? (
                          <div className="mediaeyeform-group-input-error-message">
                            IRD Registered Name can't be blank
                          </div>
                        ) : null}
                      </div>

                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="cc">
                          Charity Registration (CC) Number*
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="cc"
                            type="text"
                            className={
                              error?.CharityRegistrationNumber
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            value={registerNumber}
                            name="CharityRegistrationNumber"
                            onChange={(e) => changeRegisterNumber(e)}
                          />
                        </div>
                        {error?.CharityRegistrationNumber ? (
                          <div className="mediaeyeform-group-input-error-message">
                            Charity Registration Number can't be blank
                          </div>
                        ) : null}
                      </div>

                      <div className="mediaeyeform-group">
                        <label
                          className="mediaeyeform-label"
                          htmlFor="IRDNumber"
                        >
                          IRD Number*
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="IRDNumber"
                            type="text"
                            className={
                              error?.IRDNumber
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            value={IRDNumber}
                            name="IRDNumber"
                            onChange={(e) => changeIRDNumber(e)}
                          />
                        </div>
                        {error?.IRDNumber ? (
                          <div className="mediaeyeform-group-input-error-message">
                            IRD Number can't be blank
                          </div>
                        ) : null}
                      </div>

                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="country">
                          Country*
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="country"
                            type="text"
                            className={
                              error?.country
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            name="country"
                            value={country}
                            onChange={(e) => changeCountry(e)}
                          />
                        </div>
                        {error?.country ? (
                          <div className="mediaeyeform-group-input-error-message">
                            {error?.country}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="register-charity-page-inner-content-row-card-body-colfull">
                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="site">
                          Website
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            type="text"
                            className="mediaeyeform-input"
                            id="site"
                            name="site"
                            value={website}
                            onChange={(e) => changeSite(e)}
                          />
                        </div>
                      </div>

                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="mail">
                          Email*
                        </label>
                        <div className="mediaeyeform-group-input">
                          <input
                            id="mail"
                            type="email"
                            className={
                              error?.email
                                ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                                : 'mediaeyeform-input'
                            }
                            name="email"
                            value={email}
                            onChange={(e) => changeEmail(e)}
                          />
                        </div>
                        {error?.email ? (
                          <div className="mediaeyeform-group-input-error-message">
                            {error?.email}
                          </div>
                        ) : null}
                      </div>

                      <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="des">
                          Charity Description*
                        </label>
                        <div className="mediaeyetextarea">
                          <textarea
                            id="des"
                            type="text"
                            className={
                              error?.description
                                ? 'mediaeyetextarea-input mediaeyeform-group-input-error-border'
                                : 'mediaeyetextarea-input'
                            }
                            rows="5"
                            name="description"
                            value={description}
                            onChange={(e) => changeDescription(e)}
                          ></textarea>
                        </div>
                        {error?.description ? (
                          <div className="mediaeyeform-group-input-error-message">
                            {error?.description}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="register-charity-page-inner-content-row-wrapper">
                <div className="register-charity-page-inner-content-row register-charity-page-inner-content-row-networks">
                  <div className="register-charity-page-inner-content-row-card">
                    <div className="register-charity-page-inner-content-row-card-header">
                      <div className="register-charity-page-inner-content-row-card-header-heading">
                        Governance Documents*
                      </div>
                    </div>
                    <div className="register-charity-page-inner-content-row-card-body mediaeyeform">
                      <div className="register-charity-page-inner-content-row-card-body-colfull">
                        <div className="mediaeyeform-group">
                          <div className="register-charity-page-inner-content-row-card-body-Attachments">
                            <div
                              className="register-charity-page-inner-content-row-card-body-Attachments-uploadbox mediaeyeinfo"
                              onClick={
                                file?.url ? null : () => handleClickInput()
                              }
                            >
                              <input
                                ref={inputElement}
                                id="file"
                                style={{ display: 'none' }}
                                type="file"
                                accept="image/png,image/jpg,image/jpeg, application/pdf"
                                onChange={handleUpload}
                                onClick={(e) => (e.target.value = null)}
                                name="image"
                              />
                              <Upload upload={'folder'} /> Upload file
                              {error?.image ? (
                                <div className="mediaeyeform-group-input-error-message">
                                  Governing Document is required
                                </div>
                              ) : null}
                            </div>
                            {file.map((file, i) => (
                              <div className="register-charity-page-inner-content-row-card-body-Attachments-file m-t-15">
                                <div className="register-charity-page-inner-content-row-card-body-Attachments-file-icon">
                                  <DocumentUpload />
                                </div>
                                <div className="register-charity-page-inner-content-row-card-body-cryptocurrency-input text-semitransperant">
                                  {file.name}
                                  <button
                                    type="button"
                                    className="register-charity-page-inner-content-row-card-body-Attachments-file-icon mediaeyeform-group-input-btn"
                                    onClick={() => deletehandleUpload(i)}
                                  >
                                    <Close />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="register-charity-page-inner-content-row register-charity-page-inner-content-row-networks">
                  <div className="register-charity-page-inner-content-row-card">
                    <div className="register-charity-page-inner-content-row-card-header">
                      <div className="register-charity-page-inner-content-row-card-header-heading">
                        Add Wallet Addresses to Recieve Donations
                      </div>
                    </div>
                    <div className="register-charity-page-inner-content-row-card-body mediaeyeform">
                      <div className="register-charity-page-inner-content-row-card-body-colfull">
                        <div className="register-charity-page-inner-content-row-card-body-colfull-addselect mediaeyeform-group mediaeyeform-group-input mediaeyefancyScroll">
                          <Select
                            placeholder="Select Blockchain"
                            options={CryptoOptions}
                            value={cryptoDonation}
                            isOptionDisabled={(option) => option.isdisabled}
                            classNamePrefix="register-charity-page-dropdown"
                            onChange={(opt) => setCryptoDonation(opt)}
                            getOptionLabel={(i) => (
                              <>
                                <img src={i.img} alt={i.name} />
                                <span>{i.value}</span>
                              </>
                            )}
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            isSearchable={false}
                          />
                          <Select
                            options={CryptoTokenOptions}
                            value={cryptoToken}
                            placeholder="Select Token"
                            controlShouldRenderValue={false}
                            className="tokenSearch"
                            // isMulti
                            classNamePrefix="register-charity-page-dropdown"
                            // onChange={(opt) => setCryptoToken(opt)}
                            // getOptionValue={(element) => (
                            //   <>
                            //     <div className="topping">
                            //       <input
                            //         type="checkbox"
                            //         checked={element.isChecked}
                            //         onChange={() => handleOnChange(element)}
                            //       />
                            //       <LazyLoadImage
                            //         className="cryptoicon"
                            //         src={element.image}
                            //         effect="opacity"
                            //         onError={(event) => {
                            //           event.target.src =
                            //             '/img/token/lazyload.png';
                            //           event.onerror = null;
                            //         }}
                            //       />
                            //     </div>

                            //     <span>{element.name}</span>
                            //   </>
                            // )}
                            getOptionLabel={(element) => (
                              <>
                                <div className="topping">
                                  <input
                                    type="checkbox"
                                    checked={element.isChecked}
                                    onChange={() => handleOnChange(element)}
                                  />
                                  <LazyLoadImage
                                    className="cryptoicon"
                                    src={element.image}
                                    effect="opacity"
                                    onError={(event) => {
                                      event.target.src =
                                        '/img/token/lazyload.png';
                                      event.onerror = null;
                                    }}
                                  />
                                </div>

                                <span>{element.name}</span>
                              </>
                            )}
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            isSearchable={false}
                          />
                          <form
                            onSubmit={(e) => handleAddWallet(e)}
                            style={{ width: '100%' }}
                          >
                            <input
                              className="mediaeyeform-input addinpt"
                              placeholder="Enter Wallet Address"
                              id="wallet-address"
                              onChange={(e) => addWallet(e)}
                              value={walletAddress}
                              name="Wallet"
                              onKeyPress={handleKeypress}
                            />
                            <button
                              type="submit"
                              className="btn btn-transperant btn-square mediaeyeform-group-input-btn addbtn"
                            >
                              add
                            </button>
                          </form>
                        </div>
                        <div className="mediaeyeform-group">
                          <div className="register-charity-page-inner-content-row-card-body-cryptocurrency">
                            {addressAdded.map((name, i) => (
                              <div
                                className="register-charity-page-inner-content-row-card-body-cryptocurrency-input pd50"
                                key={i}
                              >
                                <LazyLoadImage
                                  src={name.cryptoDonation.img}
                                  effect="opacity"
                                  className="cryptoImg"
                                  onError={(event) => {
                                    event.target.src =
                                      '/img/token/lazyload.png';
                                    event.onerror = null;
                                  }}
                                />
                                {formatAdddress(name.walletAddress)}
                                <button
                                  type="button"
                                  className="btn btn-transperant mediaeyeform-group-input-btn"
                                  onClick={() => removeWallet(i)}
                                >
                                  <Close />
                                </button>
                              </div>
                            ))}
                            {/* <div className="register-charity-page-inner-content-row-card-body-cryptocurrency-input pd50">
                              <img
                                src={GetNetworkIcon('busd')}
                                className="cryptoImg"
                                alt="BUSD"
                              />
                              0xC71...1Rc6
                              <button
                                type="button"
                                className="btn btn-transperant mediaeyeform-group-input-btn active"
                              >
                                <Close />
                              </button>
                            </div> */}
                          </div>
                        </div>
                        <div className="mediaeyeform-group">
                          <div className="checkbox-custom ">
                            <input
                              id="donations"
                              checked={donationschecked}
                              type="checkbox"
                              onChange={() =>
                                setdonationschecked(!donationschecked)
                              }
                            />
                            <label htmlFor="donations">
                              Charity accepting anonymous donations
                            </label>
                          </div>
                        </div>
                        <div className="checkbox-custom ">
                          <input
                            id="taxrecpt"
                            checked={taxrecptchecked}
                            type="checkbox"
                            onChange={() =>
                              settaxrecptchecked(!taxrecptchecked)
                            }
                          />
                          <label htmlFor="taxrecpt">
                            Charity can issue an official receipt for income tax
                            purposes
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="register-charity-page-inner-content-row register-charity-page-inner-content-row-appearance">
                <div className="register-charity-page-inner-content-row-card">
                  <div className="register-charity-page-inner-content-row-card-header">
                    <div className="register-charity-page-inner-content-row-card-header-heading">
                      Appearance
                    </div>
                  </div>
                  <div className="register-charity-page-inner-content-row-card-body mediaeyeform">
                    <div className="register-charity-page-inner-content-row-card-body-colleft register-charity-page-inner-content-row-uploadBox">
                      <div className="mediaeyeform-group text-center">
                        <label className="mediaeyeform-label">Logo Image</label>
                      </div>

                      <div className="register-charity-page-inner-content-row-uploadBox-content">
                        <label className="register-charity-page-inner-content-row-uploadBox-logo">
                          <div
                            className="register-charity-page-inner-content-row-uploadBox-logo-inner"
                            onClick={(event) => {
                              setLogoURL(null);
                              setLogo(null);
                            }}
                          >
                            <img
                              src={
                                logoURL ? logoURL : GetDefaultImages('logo2')
                              }
                              alt="logo"
                            />
                            <input
                              type="file"
                              className="register-charity-page-inner-content-row-uploadBox-content-inputfile"
                              name="logo"
                              id="logo"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => handleFileSelected(e)}
                            />
                          </div>
                          <div className="register-charity-page-inner-content-row-uploadBox-content-action register-charity-page-inner-content-row-uploadBox-logo-action">
                            <EditAvatar />
                          </div>
                        </label>
                      </div>
                      <div className="register-charity-page-inner-content-row-uploadBox-bottom">
                        140 x 140 JPEG, PNG
                        <br /> recommended.
                      </div>
                    </div>

                    <div className="register-charity-page-inner-content-row-card-body-colright register-charity-page-inner-content-row-uploadBox">
                      <div className="mediaeyeform-group text-center">
                        <label className="mediaeyeform-label">
                          Banner Image
                        </label>
                      </div>
                      <div className="register-charity-page-inner-content-row-uploadBox-content">
                        <label className="register-charity-page-inner-content-row-uploadBox-banner">
                          <div className="register-charity-page-inner-content-row-uploadBox-banner-inner">
                            <img
                              src={
                                bannerURL
                                  ? bannerURL
                                  : GetDefaultImages('banner')
                              }
                              alt="Banner"
                            />
                            <input
                              className="register-charity-page-inner-content-row-uploadBox-content-inputfile"
                              type="file"
                              id="banner"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={(e) => handleFileSelected(e)}
                            />
                          </div>
                          <div className="register-charity-page-inner-content-row-uploadBox-content-action">
                            <EditAvatar />
                          </div>
                        </label>
                      </div>
                      <div className="register-charity-page-inner-content-row-uploadBox-bottom">
                        1500 x 240 JPEG, PNG <br />
                        Minimum image size
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="register-charity-page-inner-btn">
                <button className="btn btn-gaming" onClick={() => editPopUp()}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharitiesRegister;
