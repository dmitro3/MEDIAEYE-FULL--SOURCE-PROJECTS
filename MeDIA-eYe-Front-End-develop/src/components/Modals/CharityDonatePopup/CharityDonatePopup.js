import Web3 from 'web3';
import './CharityDonatePopup.scss';
import { useMoralis } from 'react-moralis';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EyeSwapPro from '../../Modals/EyeSwap-Open/EyeSwapPro';
import { Angle, CloseIcon, Transfer } from '../../Icons';
import CharityDonateInfo from './InfoSection/CharityDonateInfo';
import {
  changeNetwork,
  closeCharityDonatePopup
} from '../../../store/app/appSlice';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../../store/app/appSlice';
import {
  getdonation,
  gettoken,
  charitytxn
} from '../../../blockchain/functions/Charity/charitycollection';
import { ChainName } from '../../../blockchain/functions/ChangeChain';
let validate = require('validate.js');

let gnetwork = [
  {
    img: '/img/token/ETH.png',
    name: 'Ethereum',
    value: 'Ethereum',
    symbol: 'ETH',
    chainHex: '0x1',
    chainid: 1
  },
  {
    img: '/img/token/BitCoinCash.png',
    name: 'Bitcoin Cash',
    value: 'bitcoincash',
    symbol: 'BCH',
    chainid: 10000,
    chainHex: '0x2710'
  }
];

export default function CharityDonatePopup() {
  let obj = {};
  const dispatch = useDispatch();
  const [tag, setTag] = useState(1);
  const { Moralis, user } = useMoralis();
  const [maxamount, setmaxamount] = useState();
  const [amountPrice, setAmountPrice] = useState();
  const [activeToken, setActiveToken] = useState({});
  const [networktoggle, setnetworktoggle] = useState();
  const [ActiveNetwork, setActiveNetwork] = useState({});
  const [formTaxRecipt, setFormTaxRecipt] = useState(false);
  const metaactivenetwork = window.ethereum?.networkVersion;
  const [maxamountstatus, setmaxamountstatus] = useState(0);
  const [continuebtnstate, setcontinuebtnstate] = useState(0);
  const [network, setnetwork] = useState([]);
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [togglePaymentList, setTogglePaymentList] = useState(false);
  const [togglenetworkList, settogglenetworkList] = useState(false);
  const [switchnetworkstatus, setswitchnetworkstatus] = useState(0);
  const [hedaerToggleDropdown, setHedaerToggleDropdown] = useState(true);
  const [charityDonateInfoError, setCharityDonateInfoError] = useState([]);

  let constraints = {
    email: {
      presence: true,
      email: true
    },
    fname: {
      presence: true
    },
    lname: {
      presence: true
    },
    country: {
      presence: true
    },
    state: {
      presence: true
    },
    address1: {
      presence: true
    },
    city: {
      presence: true
    },
    pincode: {
      presence: true
    }
  };

  const showCharityDonatePopup = useSelector(
    (state) => state.app.showCharityDonatePopup
  );

  const currencies = useSelector(
    (state) => state.app.getCharityDonationcurrencies
  );

  const currenciestoken = useSelector((state) => state.app.gettoken);

  const organizationdata = useSelector(
    (state) => state.app.getCharityDonationorganizationdata
  );

  const [charityDonateInfoId, setCharityDonateInfoId] = useState(
    'mediaeye-charity-donate-info-form'
  );

  const handleStartOver = async () => {
    let form = document.querySelector(`#${charityDonateInfoId}`);
    let errors = validate(form, constraints);
    setCharityDonateInfoError(errors);
    if (errors == undefined || formTaxRecipt == true) {
      let txndata = {};
      txndata.orgName = organizationdata.name;
      txndata.orgId = `${obj.organizationId}`;
      txndata.networkName = ActiveNetwork.name;
      txndata.networkSymbol = ActiveNetwork.symbol;
      txndata.tokenName = activeToken.name;
      txndata.tokenSymbol = activeToken.code;
      txndata.amount = obj.pledgeAmount;
      txndata.pledgeCurrency = activeToken.code;
      txndata.isAnonymous = obj.isAnonymous ? 'true' : 'false';
      txndata.isTaxReceipt = obj.istaxrecipt ? 'true' : 'false';

      if (obj.firstName != '') {
        txndata.userFirstName = obj.firstName;
      }
      if (obj.lastName != '') {
        txndata.userLastName = obj.lastName;
      }
      if (obj.country != '') {
        txndata.userCountry = obj.country;
      }
      if (obj.city != '') {
        txndata.userCity = obj.city;
      }
      if (obj.state != '') {
        txndata.userState = obj.state;
      }
      if (obj.zipcode != '') {
        txndata.userPostalCode = obj.zipcode;
      }
      if (obj.addressLine2 != '' || obj.addressLine1 != '') {
        txndata.userAddress = `${obj.addressLine1} ${obj.addressLine2}`;
      }
      if (obj.receiptEmail != '') {
        txndata.userEmail = obj.receiptEmail;
      }

      const donationapires = await getdonation(obj);

      if (donationapires) {
        txndata.pledgeId = donationapires.pledgeId;
        txndata.depositAddress = donationapires.depositAddress;
        txndata.qrcode = donationapires.qrCode;
        dispatch(
          toggleGeneralPopup({
            status: 'loading',
            message: 'Processing...',
            size: 'xs',
            autoClose: 'false'
          })
        );
        let tokenname = activeToken.network;
        let gettokenres = await gettoken(tokenname);

        if (gettokenres) {
          let addressobj = gettokenres.find(
            (el) => el.symbol == activeToken.code
          );
          if (addressobj) {
            const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts'
            });
            const weiValue = Web3.utils.toWei(obj.pledgeAmount, 'ether');
            const hex = Web3.utils.numberToHex(weiValue);
            txndata.userMetaMaskAddress = accounts[0];
            txndata.hexAmount = hex;
            const charitytxnres = await charitytxn(txndata);
            if (charitytxnres) {
              let transactionParam = {
                to: donationapires.depositAddress,
                from: accounts[0],
                value: hex,
                contractAddress: addressobj.address
              };
              let a = obj.pledgeAmount.toString();

              const options = {
                type: 'erc20',
                amount: Moralis.Units.Token(a, `${addressobj.decimals}`),
                receiver: donationapires.depositAddress,
                contractAddress: addressobj.address
              };
              try {
                await Moralis.transfer(options);
                window.ethereum
                  .request({
                    method: 'eth_sendTransaction',
                    params: [transactionParam]
                  })
                  .then((txhash) => {
                    dispatch(closeCharityDonatePopup());
                    dispatch(closeGeneralPopup());
                    setTag(1);
                    return dispatch(
                      toggleGeneralPopup({
                        status: 'success',
                        title: 'Transaction Approved!',
                        size: 'sm',
                        copyText: txhash,
                        textButton: 'OK',
                        autoClose: 'false'
                      })
                    );
                  });
              } catch (e) {
                dispatch(
                  toggleGeneralPopup({
                    status: 'error',
                    message:
                      'MetaMask Tx Signature: User denied transaction Signature.',
                    textButton: 'OK',
                    size: 'sm'
                  })
                );
                dispatch(closeGeneralPopup());
                setTag(1);
                return;
              }
            }
          } else {
            dispatch(closeCharityDonatePopup());
            dispatch(closeGeneralPopup());
            setTag(1);
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                title: 'Something Went Wrong',
                size: 'sm',
                textButton: 'OK',
                autoClose: 'false'
              })
            );
            return;
          }
        } else {
          dispatch(closeCharityDonatePopup());
          dispatch(closeGeneralPopup());
          setTag(1);
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              title: 'Something Went Wrong',
              size: 'sm',
              textButton: 'OK',
              autoClose: 'false'
            })
          );
          return;
        }
      } else {
        dispatch(closeCharityDonatePopup());
        dispatch(closeGeneralPopup());
        setTag(1);
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            title: 'Something Went Wrong',
            size: 'sm',
            textButton: 'OK',
            autoClose: 'false'
          })
        );
        return;
      }
    }
  };

  const tokenrenderOptions = (item) => {
    setActiveToken(item);
    setTogglePaymentList(!togglePaymentList);
  };

  const networkrenderOptions = (item) => {
    setActiveNetwork(item);
    if (organizationdata?.type == 'Media eye') {
      let networkname = item?.apiname.toLowerCase();
      let currenciesarr = [];
      currenciestoken.map((element) => {
        if (element.blockchainNetwork === networkname) {
          currenciesarr.push(element);
        }
      });
      setActiveToken(currenciesarr[0]);
      setPaymentTokensList(currenciesarr);
      settogglenetworkList(!togglenetworkList);
    } else {
      let networkname = item?.value.toLowerCase();
      let currenciesarr = [];
      currencies.map((element) => {
        if (element.network === networkname) {
          currenciesarr.push(element);
        }
      });
      setActiveToken(currenciesarr[0]);
      setPaymentTokensList(currenciesarr);
      settogglenetworkList(!togglenetworkList);
    }
  };

  const handleContinue = async () => {
    const metaactivenetwork = window.ethereum?.networkVersion;
    if (metaactivenetwork.toString() === ActiveNetwork.chainid.toString()) {
      if (amountPrice && organizationdata) {
        if (amountPrice < activeToken.minDonation) {
          return dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: `Minimum required donation amount is: ${activeToken.minDonation}`,
              textButton: 'OK',
              size: 'sm'
            })
          );
        }
        setTag(2);
      } else {
        alert('Enter some amount first');
      }
    } else {
      switchnetwork();
    }
  };

  const hedaerToggle = () => {
    setHedaerToggleDropdown(!hedaerToggleDropdown);
  };

  const pull_data = (details, termsAgree, taxrecipt) => {
    obj.firstName = details.fname;
    obj.lastName = details.lname;
    obj.state = details.state;
    obj.zipcode = details.pincode;
    obj.receiptEmail = details.email;
    obj.country = details.country;
    obj.city = details.city;
    obj.addressLine2 = details.address2;
    obj.addressLine1 = details.address1;
    obj.isAnonymous = termsAgree;
    obj.istaxrecipt = taxrecipt;
    obj.access_token = localStorage.getItem('givingBlock_accessToken');
    obj.organizationId = organizationdata.id;
    obj.pledgeCurrency = activeToken.code;
    obj.pledgeAmount = amountPrice;
  };

  const toggleDropdown = () => {
    setTogglePaymentList(!togglePaymentList);
  };

  const networktoggleDropdown = () => {
    settogglenetworkList(!togglenetworkList);
  };

  const switchnetwork = async () => {
    let chainHex = ActiveNetwork.chainHex;
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainid: chainHex }]
        });
        setswitchnetworkstatus(0);
      } catch (error) {
        if (error.code === 4902) {
          try {
            let params = [];
            if (chainHex === '0x38') {
              params = [
                {
                  chainName: 'Binance Smart Chain',
                  chainid: chainHex,
                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                  blockExplorerUrls: ['https://bscscan.com/']
                }
              ];
            } else if (chainHex === '0xfa') {
              params = [
                {
                  chainName: 'Fantom Opera',
                  chainid: chainHex,
                  rpcUrls: ['https://rpc.ftm.tools/'],
                  blockExplorerUrls: ['https://ftmscan.com/'],
                  nativeCurrency: {
                    name: 'Fantom',
                    symbol: 'FTM',
                    decimals: 18
                  }
                }
              ];
            }
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: params
            });
          } catch (addError) {
            console.error(addError);
          }
        } else if (error.code === -32002) {
          alert('Please check Metamask for pending request.');
        }
      }
    } else {
      dispatch(changeNetwork(ChainName(chainHex)));
      alert(
        'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
      );
    }
  };

  const closedonationpopup = () => {
    setTag(1);
    setAmountPrice();
    dispatch(closeCharityDonatePopup());
  };

  useEffect(() => {
    if (currencies) {
      if (organizationdata?.type == 'Media eye') {
        setnetwork(currencies);
        setActiveNetwork(currencies[0]);
        let networkname = currencies[0]?.apiname.toLowerCase();
        let currenciesarr = [];
        currenciestoken.map((element) => {
          if (element.blockchainNetwork === networkname) {
            currenciesarr.push(element);
          }
        });
        console.log(currenciesarr, 'currenciesarr');
        setActiveToken(currenciesarr[0]);
        setPaymentTokensList(currenciesarr);
      } else {
        setnetwork(gnetwork);
        setActiveNetwork(gnetwork[0]);
        let networkname = gnetwork[0]?.value.toLowerCase();
        let currenciesarr = [];
        currencies.map((element) => {
          if (element.network === networkname) {
            currenciesarr.push(element);
          }
        });
        setActiveToken(currenciesarr[0]);
        setPaymentTokensList(currenciesarr);
      }
    }
  }, [currencies]);

  useEffect(async () => {
    if (
      Object.keys(ActiveNetwork).length > 0 &&
      Object.keys(activeToken).length > 0
    ) {
      const payload = { chain: ActiveNetwork.chainHex };
      try {
        const balancesdata = await Moralis.Web3API.account.getTokenBalances(
          payload
        );
        const nativeBalance = await Moralis.Web3API.account.getNativeBalance(
          payload
        );
        if (balancesdata && balancesdata.length > 0) {
          let balance = balancesdata.find(
            (el) => el.symbol === activeToken.code
          );
          if (balance) {
            let bal = balance.balance;
            let decimal = balance.decimals;
            let a = parseInt(bal) / Math.pow(10, decimal);
            a = a.toFixed(5);
            setmaxamount(a);
            setmaxamountstatus(1);
          } else {
            var a = 0.0;
            setmaxamount(a);
            setmaxamountstatus(1);
          }
        }
      } catch (e) {
        setmaxamount('');
        setmaxamountstatus(0);
      }
    }
  }, [activeToken, ActiveNetwork]);

  useEffect(() => {
    if (parseInt(metaactivenetwork) === parseInt(ActiveNetwork.chainid)) {
      console.log('here');
      setswitchnetworkstatus(0);
    } else {
      setswitchnetworkstatus(1);
    }
  }, [ActiveNetwork, metaactivenetwork]);

  useEffect(() => {
    if (amountPrice < maxamount) {
      setcontinuebtnstate(1);
    } else {
      setcontinuebtnstate(0);
    }
  }, [amountPrice, maxamount]);

  return (
    <>
      {showCharityDonatePopup ? (
        <div
          className={
            showCharityDonatePopup ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper scrolled"
            onClick={() => dispatch(closeCharityDonatePopup())}
          >
            <div
              className="mediaeye-popup-content charity-donate-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => closedonationpopup()}
                >
                  <CloseIcon />
                </div>
                <div>
                  <div className="charity-donate-popup-header">
                    <img
                      src={
                        organizationdata?.type == 'Giving Block'
                          ? organizationdata?.logo
                          : organizationdata?.charityLogo.filePath
                      }
                    />
                    <span>
                      {organizationdata?.type == 'Giving Block'
                        ? organizationdata?.name
                        : organizationdata?.irdRegisterName}
                    </span>
                  </div>
                  <div className="charity-donate-popup-title">
                    <div
                      className={
                        tag === 1
                          ? 'charity-donate-popup-title-tab active'
                          : 'charity-donate-popup-title-tab'
                      }
                    >
                      {tag === 2 ? '1. PLEDGE' : 'PLEDGE'}
                    </div>
                    <div
                      className={
                        tag === 2
                          ? 'charity-donate-popup-title-tab active'
                          : 'charity-donate-popup-title-tab'
                      }
                    >
                      {tag === 2 ? '2. INFO' : 'INFO'}
                    </div>
                  </div>
                  <div className="charity-donate-popup-inner">
                    {tag === 1 ? (
                      <>
                        <div className="charity-donate-popup-inner-inputtitle">
                          <div className="charity-donate-popup-inner-inputtitle-one">
                            <span>Select Your Crypto</span>
                          </div>
                          <div className="charity-donate-popup-inner-inputtitle-two">
                            {maxamountstatus == 1 ? (
                              <span className="span-space">
                                You have {maxamount} {activeToken.name}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="charity-donate-popup-inner-input">
                          <div className="mediaeye-popup-product-page-tokenlistwithprice">
                            <div className="mediaeye-popup-product-page-tokenlistwithprice-token mediaeyefancyScroll">
                              <div
                                className="mediaeye-popup-product-page-tokenlistwithprice-token-header"
                                onClick={() => networktoggleDropdown()}
                              >
                                <div className="mediaeye-popup-product-page-tokenlistwithprice-token-header-inner">
                                  <img src={ActiveNetwork?.img} />
                                  <span
                                    className={
                                      ActiveNetwork?.name ==
                                      'Binance smart chain'
                                        ? 'activenetwork'
                                        : null
                                    }
                                  >
                                    {ActiveNetwork?.name}
                                  </span>
                                </div>
                                <Angle
                                  side={togglenetworkList ? 'up' : 'down'}
                                />
                              </div>
                              {togglenetworkList ? (
                                <div className="mediaeye-popup-product-page-tokenlistwithprice-token-body">
                                  {network.map((item, i) => (
                                    <div
                                      className="mediaeye-popup-product-page-tokenlistwithprice-token-body-row"
                                      onClick={() => {
                                        networkrenderOptions(item);
                                      }}
                                      key={i}
                                    >
                                      <img src={item?.img} />
                                      <span>{item.name}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                            <div className="mediaeye-popup-product-page-tokenlistwithprice-token mediaeyefancyScroll m-l-10">
                              <div
                                className="mediaeye-popup-product-page-tokenlistwithprice-token-header"
                                onClick={() => toggleDropdown()}
                              >
                                <div className="mediaeye-popup-product-page-tokenlistwithprice-token-header-inner">
                                  <img
                                    src={
                                      organizationdata?.type == 'Giving Block'
                                        ? activeToken?.imageUrl
                                        : activeToken?.image
                                    }
                                  />
                                  <span>{activeToken?.name}</span>
                                </div>
                                {paymentTokensList.length > 0 ? (
                                  <Angle
                                    side={togglePaymentList ? 'up' : 'down'}
                                  />
                                ) : null}
                              </div>
                              {togglePaymentList ? (
                                <div className="mediaeye-popup-product-page-tokenlistwithprice-token-body">
                                  {paymentTokensList.map((item, i) => (
                                    <div
                                      className="mediaeye-popup-product-page-tokenlistwithprice-token-body-row"
                                      onClick={() => {
                                        tokenrenderOptions(item);
                                      }}
                                      key={i}
                                    >
                                      <img
                                        src={
                                          organizationdata?.type ==
                                          'Giving Block'
                                            ? item?.imageUrl
                                            : item?.image
                                        }
                                      />
                                      <span>{item.name}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                            <div className="mediaeye-popup-product-page-tokenlistwithprice-price">
                              <input
                                type="text"
                                pattern="[0-9]*"
                                className="mediaeye-popup-product-page-tokenlistwithprice-price-input"
                                placeholder="Enter Amount"
                                value={amountPrice}
                                onChange={(e) => {
                                  const validNumber = new RegExp(/^\d*\.?\d*$/);
                                  let value = e.target.value;
                                  if (value === '' || validNumber.test(value)) {
                                    value = setAmountPrice(value);
                                  }
                                  // setAmountPrice(e.target.value);
                                }}
                              />
                              {/* <div className="mediaeye-popup-product-page-tokenlistwithprice-price-addon">
                                <Transfer />
                                $100
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="charity-donate-popup-inner-inputbottom">
                          {activeToken?.minDonation ? (
                            <span>
                              Min Donation : {activeToken?.minDonation}
                            </span>
                          ) : null}
                        </div>
                        {amountPrice ? (
                          <div className="charity-donate-popup-inner-bottomtag">
                            <span>Your Donation :</span>{' '}
                            <span className="big-font">
                              {amountPrice} {activeToken?.name}
                            </span>
                          </div>
                        ) : null}
                        <div
                          className={
                            hedaerToggleDropdown
                              ? 'charity-donate-popup-inner-eyeswaps'
                              : 'charity-donate-popup-inner-eyeswaps open'
                          }
                        >
                          <div
                            className="eyeswap-header nodis"
                            onClick={hedaerToggle}
                          >
                            <div className="eyeswap-header-left">
                              <img
                                src="/img/token/Subtract.png"
                                alt="Subtract"
                              />
                              <span>eYeSwap</span>
                            </div>
                            <div className="eyeswap-header-arrow">
                              <Angle side={'down'} />
                            </div>
                          </div>
                          <div className="eyeswap-body-wrapper">
                            <div
                              className={
                                hedaerToggleDropdown
                                  ? 'eyeswap-body '
                                  : 'eyeswap-body open'
                              }
                            >
                              <EyeSwapPro />
                              {/* <EyeSwapPopup /> */}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <CharityDonateInfo
                        tag={tag}
                        organizationdata={organizationdata}
                        propfunc={pull_data}
                        charityDonateInfoId={charityDonateInfoId}
                        charityDonateInfoError={charityDonateInfoError}
                        setFormTaxRecipt={setFormTaxRecipt}
                      />
                    )}

                    {tag === 1 ? (
                      <div className="charity-donate-popup-inner-bottombutton">
                        {switchnetworkstatus == 0 ? (
                          <>
                            {amountPrice?.length > 0 &&
                            continuebtnstate == 1 ? (
                              <button
                                className="btn btn-gaming"
                                onClick={handleContinue}
                              >
                                Continue
                              </button>
                            ) : (
                              <button className="btn btn-disable">
                                Continue
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            className="btn btn-gaming"
                            onClick={handleContinue}
                          >
                            Switch Network
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="charity-donate-info-bottom">
                        <button
                          type="button"
                          className="btn btn-gaming"
                          onClick={() => setTag(1)}
                        >
                          Previous
                        </button>
                        <button
                          type="submit"
                          className="btn btn-gaming"
                          onClick={() => {
                            handleStartOver();
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
