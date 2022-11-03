import React, { useEffect, useState } from 'react';
import {
  Angle,
  CloseIcon,
  Heart,
  RightSideArrow,
  Settings,
  Transfer
} from '../../Icons';
import './EyeSwapPopup.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  toggleGeneralPopup,
  closeGeneralPopup,
  changeNetwork
} from '../../../store/app/appSlice';
import { geteyeswaptokens } from '../../../blockchain/functions/Eyeswap/eyeswap';
import { async } from '@firebase/util';
import { ToastMessage } from 'pipeline-ui';
import { useMoralis } from 'react-moralis';
import { SDK, BLOCKCHAIN_NAME } from 'rubic-sdk';
import { CalculateTrade } from './CalculateTrade';
import { ChainName } from '../../../blockchain/functions/ChangeChain';

const network = [
  {
    img: '/img/token/ETH.png',
    value: 'ETHEREUM',
    name: 'Ethereum',
    token: 'Ethereum',
    symbol: 'ETH',
    chainHex: 1
  },
  {
    img: '/img/token/binance-smart-chain.png',
    value: 'BINANCE_SMART_CHAIN',
    name: 'Binance',
    token: 'Binance-smart-chain',
    symbol: 'BSC',
    chainHex: 56
  },
  {
    img: '/img/token/polygon.png',
    name: 'Polygon',
    value: 'POLYGON',
    token: 'Polygon',
    symbol: 'MATIC',
    chainHex: 137
  },
  {
    img: '/img/token/aurora.png',
    name: 'Aurora',
    value: 'AURORA',
    token: 'Aurora',
    symbol: 'Aurora',
    chainHex: 1313161554
  },
  {
    img: '/img/token/avalanche.png',
    name: 'Avalanche',
    value: 'AVALANCHE',
    token: 'Avalanche',
    symbol: 'Avalanche',
    chainHex: 43114
  },
  {
    img: '/img/token/FTM.png',
    name: 'Fantom',
    value: 'FANTOM',
    token: 'Fantom',
    symbol: 'Fantom',
    chainHex: 250
  },
  {
    img: '/img/token/moonriver.png',
    name: 'Moonriver',
    value: 'MOONRIVER',
    token: 'Moonriver',
    symbol: 'Moonriver',
    chainHex: 128
  },
  {
    img: '/img/token/harmony.png',
    name: 'Harmony',
    value: 'HARMONY',
    token: 'Harmony',
    symbol: 'Harmony',
    chainHex: 1666600000
  },
  {
    img: '/img/token/arbitrum.png',
    name: 'Arbitrum',
    value: 'ARBITRUM',
    token: 'Arbitrum',
    symbol: 'Arbitrum',
    chainHex: 0xa4b1
  }
];
const mediaEyenetwork = [
  {
    img: '/img/token/EYE.png',
    value: 'ETH',
    name: 'eYe ETH'
  },
  {
    img: '/img/token/EYE.png',
    value: 'BSC',
    name: 'eYe BSC'
  }
];

export default function EyeSwapPopup(props) {
  const CharityDonatePopup = props.charityDonate;
  const dispatch = useDispatch();
  const [trade, settrade] = useState(0);
  const [amount, setAmount] = useState();
  const [search, setSearch] = useState('');
  const [activeid, setActiveid] = useState();
  const [toggle, setToggle] = useState(false);
  const [tokenname, settokenname] = useState();
  const [tradeTypE, settradeTypE] = useState(0);
  const [tokenimage, settokenimage] = useState();
  const [tradetypYcal, settradetypYcal] = useState(0);
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [tokenselect, settokenselect] = useState(0);
  const [instantTrade, setinstantTrade] = useState();
  const [tokenaddress, settokenaddress] = useState();
  const [tokenlistarr, settokenlistarr] = useState([]);
  const [swapbtnstatus, setswapbtnstatus] = useState(0);
  const [gastokenamount, setgastokenamount] = useState(0);
  const [switchtokenname, setswitchtokenname] = useState();
  const [loadertokenlist, setloadertokenlist] = useState(0);
  const [mediaEyeactiveid, setmediaEyeactiveid] = useState(0);
  const [togglemediaEye, settogglemediaEye] = useState(false);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { Moralis, user, setUserData, userError, isUserUpdating } =
    useMoralis();

  const [hedaerToggleDropdown, setHedaerToggleDropdown] = useState(true);

  const toggleDropdown = async () => {
    setToggle(!toggle);
    if (activeid >= 0) {
    } else {
      setActiveid(0);
    }
  };

  const hedaerToggle = () => {
    setHedaerToggleDropdown(!hedaerToggleDropdown);
  };

  const mediaEyetoggleDropdown = async () => {
    settogglemediaEye(!togglemediaEye);
  };
  const toggleDropdownSecond = (index) => {
    let a = tokenlistarr[index];
    if (a) {
      settokenname(a.symbol);
      settokenimage(a.image);
      settokenaddress(a.address);
      let aa;
      if (tokenselect === 1) {
        aa = 2;
        settokenselect(aa);
        settrade(1);
      } else if (tokenselect === 2) {
        aa = 1;
        settokenselect(aa);
        settrade(1);
      } else {
        settokenselect(1);
        settrade(1);
      }
    }
    setToggle(false);
  };
  const amountCalculation = (value) => {
    value = value.replace(/^0+[0-9]/g, '0');
    setAmount(value);
  };
  const bluramountCalculation = (value) => {
    tradecalculation();
  };
  const handleActiveTab = (e) => {
    setSearch('');
    setActiveid(e);
    settrade(0);
  };
  const handlemediaEyeActiveTab = (e) => {
    setmediaEyeactiveid(e);
    settogglemediaEye(false);
  };
  const handleSearch = (e) => {
    settokenselect(0);
    setSearch(e.target.value);
  };
  const handleSwap = async () => {
    if (swapbtnstatus == 1) {
      let networkdata = network.find(
        (element) => element.token == switchtokenname
      );
      let chain = networkdata.symbol;
      let chainHex = '';
      if (chain === 'BNB' || chain === 'BSC' || chain === '0x38') {
        chainHex = '0x38';
      } else if (chain === 'FTM' || chain === 250 || chain === '0xfa') {
        chainHex = '0xfa';
      } else if (chain === 'MATIC') {
        chainHex = '0x89';
      } else if (chain === 'Aurora') {
        chainHex = '0x4E454152';
      } else if (chain === 'Avalanche') {
        chainHex = '0xA86A';
      } else if (chain === 'Fantom') {
        chainHex = '0xFA';
      } else if (chain === 'Moonriver') {
        chainHex = '0x80';
      } else if (chain === 'Harmony') {
        chainHex = '0x63564C40';
      } else if (chain === 'Arbitrum') {
        chainHex = '0xA4B1';
      } else {
        chainHex = '0x1';
      }
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainHex }]
          });
          setswapbtnstatus(0);
        } catch (error) {
          if (error.code === 4902) {
            try {
              let params = [];
              if (chainHex === '0x38') {
                params = [
                  {
                    chainName: 'Binance Smart Chain',
                    chainId: chainHex,
                    rpcUrls: ['https://bsc-dataseed.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com/']
                  }
                ];
              } else if (chainHex === '0xfa') {
                params = [
                  {
                    chainName: 'Fantom Opera',
                    chainId: chainHex,
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
        // change chain manually
        dispatch(changeNetwork(ChainName(chainHex)));
        alert(
          'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
        );
      }
    } else {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      const walletProvider = {
        address: accounts[0],
        // address: "0x7B974aefd3D5c05274bd239e3B697D111eD51Ade",
        chainId,
        core: window.ethereum
      };

      const configuration = {
        rpcProviders: {
          [BLOCKCHAIN_NAME.ETHEREUM]: {
            mainRpc: 'https://rpc.ankr.com/eth'
          },
          [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
            mainRpc: 'https://rpc.ankr.com/bsc'
          },
          [BLOCKCHAIN_NAME.POLYGON]: {
            mainRpc: 'https://rpc.ankr.com/polygon'
          },
          [BLOCKCHAIN_NAME.AVALANCHE]: {
            mainRpc: 'https://rpc.ankr.com/avalanche'
          },
          [BLOCKCHAIN_NAME.FANTOM]: {
            mainRpc: 'https://rpc.ankr.com/fantom'
          },
          [BLOCKCHAIN_NAME.MOONRIVER]: {
            mainRpc: 'https://rpc.ankr.com/moonbeam'
          },
          [BLOCKCHAIN_NAME.HARMONY]: {
            mainRpc: 'https://rpc.ankr.com/harmony'
          },
          [BLOCKCHAIN_NAME.ARBITRUM]: {
            mainRpc: 'https://rpc.ankr.com/arbitrum'
          },
          [BLOCKCHAIN_NAME.AURORA]: {
            mainRpc: 'https://mainnet.aurora.dev'
          },
          [BLOCKCHAIN_NAME.TELOS]: {
            mainRpc: 'https://mainnet.telos.net/evm'
          }
        },
        providerAddress: user.attributes.ethAddress,
        walletProvider,
        integratorAddress: '0x7B974aefd3D5c05274bd239e3B697D111eD51Ade'
      };

      try {
        const sdk = await SDK.createSDK(configuration);

        const onConfirm = () => {
          dispatch(
            toggleGeneralPopup({
              status: 'loading',
              message: 'Processing...',
              size: 'xs',
              autoClose: 'false'
            })
          );
        };

        const onApprove = () => {
          dispatch(
            toggleGeneralPopup({
              status: 'loading',
              message: 'Processing...',
              size: 'xs',
              autoClose: 'false'
            })
          );
        };

        await instantTrade.swap({ onConfirm, onApprove });
        dispatch(closeGeneralPopup());

        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: 'Swap Completed !!',
            textButton: 'OK',
            size: 'sm'
          })
        );

        setMoneyAmount(0);
        setgastokenamount(0);
        setAmount(0);
        settokenselect(0);
        setActiveid();
        setToggle(false);
      } catch (e) {
        dispatch(closeGeneralPopup());
        let a = e.stack;
        if (e.message) {
          if (e.message == 0 || e.message == 2) {
            setMoneyAmount(0);
            setgastokenamount(0);
            setAmount(0);
            settokenselect(0);
            setActiveid();
            setToggle(false);
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Insufficient Balance',
                textButton: 'OK',
                size: 'sm'
              })
            );
          } else if (a.includes('InsufficientFundsError')) {
            setMoneyAmount(0);
            setgastokenamount(0);
            setAmount(0);
            settokenselect(0);
            setActiveid();
            setToggle(false);
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Insufficient Balance',
                textButton: 'OK',
                size: 'sm'
              })
            );
          } else {
            setMoneyAmount(0);
            setgastokenamount(0);
            setAmount(0);
            settokenselect(0);
            setActiveid();
            setToggle(false);
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Swap Failed',
                textButton: 'OK',
                size: 'sm'
              })
            );
          }
        } else if (a.includes('InsufficientFundsError')) {
          setMoneyAmount(0);
          setgastokenamount(0);
          setAmount(0);
          settokenselect(0);
          setActiveid();
          setToggle(false);
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Insufficient Balance',
              textButton: 'OK',
              size: 'sm'
            })
          );
        } else {
          setMoneyAmount(0);
          setgastokenamount(0);
          setAmount(0);
          settokenselect(0);
          setActiveid();
          setToggle(false);
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Swap Failed',
              textButton: 'OK',
              size: 'sm'
            })
          );
        }
      }
    }
  };
  const tradecalculation = async () => {
    let tokenname = network[activeid]?.token;
    if (activeid > -1) {
      if (tokenname == 'Ethereum' || tokenname == 'Binance-smart-chain') {
        settradetypYcal(0);
      } else {
        settradetypYcal(1);
      }
    }
    if (
      amount > 0 &&
      activeid > -1 &&
      tokenselect > 0 &&
      trade == 1 &&
      mediaEyeactiveid > -1
    ) {
      dispatch(
        toggleGeneralPopup({
          status: 'loading',
          message: 'Processing...',
          size: 'xs',
          autoClose: 'false'
        })
      );
      setMoneyAmount(0);
      const configuration = {
        rpcProviders: {
          [BLOCKCHAIN_NAME.ETHEREUM]: {
            mainRpc: 'https://rpc.ankr.com/eth'
          },
          [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
            mainRpc: 'https://rpc.ankr.com/bsc'
          },
          [BLOCKCHAIN_NAME.POLYGON]: {
            mainRpc: 'https://rpc.ankr.com/polygon'
          },
          [BLOCKCHAIN_NAME.AVALANCHE]: {
            mainRpc: 'https://rpc.ankr.com/avalanche'
          },
          [BLOCKCHAIN_NAME.FANTOM]: {
            mainRpc: 'https://rpc.ankr.com/fantom'
          },
          [BLOCKCHAIN_NAME.MOONRIVER]: {
            mainRpc: 'https://rpc.ankr.com/moonbeam'
          },
          [BLOCKCHAIN_NAME.HARMONY]: {
            mainRpc: 'https://rpc.ankr.com/harmony'
          },
          [BLOCKCHAIN_NAME.ARBITRUM]: {
            mainRpc: 'https://rpc.ankr.com/arbitrum'
          },
          [BLOCKCHAIN_NAME.AURORA]: {
            mainRpc: 'https://mainnet.aurora.dev'
          },
          [BLOCKCHAIN_NAME.TELOS]: {
            mainRpc: 'https://mainnet.telos.net/evm'
          }
        },
        providerAddress: user.attributes.ethAddress
      };
      let tokenname = network[activeid]?.value;
      let mediaEyeblockchain = mediaEyenetwork[mediaEyeactiveid]?.value;
      let blockchain;

      if (tokenname == 'ETHEREUM') {
        blockchain = BLOCKCHAIN_NAME.ETHEREUM;
      } else if (tokenname == 'BINANCE_SMART_CHAIN') {
        blockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
      } else if (tokenname == 'POLYGON') {
        blockchain = BLOCKCHAIN_NAME.POLYGON;
      } else if (tokenname == 'MOONRIVER') {
        blockchain = BLOCKCHAIN_NAME.MOONRIVER;
      } else if (tokenname == 'FANTOM') {
        blockchain = BLOCKCHAIN_NAME.FANTOM;
      } else if (tokenname == 'AVALANCHE') {
        blockchain = BLOCKCHAIN_NAME.AVALANCHE;
      } else if (tokenname == 'HARMONY') {
        blockchain = BLOCKCHAIN_NAME.HARMONY;
      } else if (tokenname == 'ARBITRUM') {
        blockchain = BLOCKCHAIN_NAME.ARBITRUM;
      } else if (tokenname == 'AURORA') {
        blockchain = BLOCKCHAIN_NAME.AURORA;
      } else if (tokenname == 'TELOS') {
        blockchain = BLOCKCHAIN_NAME.TELOS;
      }

      const sdk = await SDK.createSDK(configuration);
      const fromTokenAddress = tokenaddress;
      const fromAmount = amount;
      const toTokenAddress = '0x9a257c90fa239fba07771ef7da2d554d148c2e89';
      try {
        let trades;
        let tradeType = 0;

        if (blockchain == 'ETH' || blockchain == 'BSC') {
          settradeTypE(0);
          tradeType = 0;
          trades = await sdk.instantTrades.calculateTrade(
            { blockchain, address: fromTokenAddress },
            fromAmount,
            toTokenAddress
          );
        } else {
          settradeTypE(1);
          tradeType = 1;
          const fromBlockchain = blockchain;
          const fromTokenAddress = tokenaddress;
          const fromAmount = amount;
          const toBlockchain = mediaEyeblockchain;
          const toTokenAddress = '0x9a257c90fa239fba07771ef7da2d554d148c2e89';
          trades = await sdk.crossChain.calculateTrade(
            { blockchain: fromBlockchain, address: fromTokenAddress },
            fromAmount,
            { blockchain: toBlockchain, address: toTokenAddress },
            {
              gasCalculation: 'enabled',
              fromAddress: user.attributes.ethAddress
            }
          );
        }

        if (trades.length > 0) {
          const tradedata = CalculateTrade(trades, tradeType);

          if (tradedata.sucessflag == 0) {
            dispatch(closeGeneralPopup());
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: tradedata.errmsg,
                textButton: 'OK',
                size: 'sm'
              })
            );
            return;
          }
          if (tradedata.minGasObject) {
            dispatch(closeGeneralPopup());
            setinstantTrade(tradedata.minGasObject);
            setMoneyAmount(tradedata.minGasAmount);
            setgastokenamount(tradedata.minGasValue);
            return;
          }
          if (!tradedata) {
            dispatch(closeGeneralPopup());
            setMoneyAmount(0);
            setgastokenamount(0);
            setAmount(0);
            settokenselect(0);
            setActiveid();
            setToggle(false);
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Trading is currently unavailable.',
                textButton: 'OK',
                size: 'sm'
              })
            );
          }
        } else {
          dispatch(closeGeneralPopup());
          setMoneyAmount(0);
          setgastokenamount(0);
          setAmount(0);
          settokenselect(0);
          setActiveid();
          setToggle(false);
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Trading is currently unavailable.',
              textButton: 'OK',
              size: 'sm'
            })
          );
        }
      } catch (e) {
        dispatch(closeGeneralPopup());
        setMoneyAmount(0);
        setgastokenamount(0);
        setAmount(0);
        settokenselect(0);
        setActiveid();
        setToggle(false);
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Trading is currently unavailable.',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
    }
  };
  useEffect(async () => {
    let metaactivenetwork = window.ethereum.networkVersion;
    setloadertokenlist(0);
    setMoneyAmount(0);
    let tokenname = network[activeid]?.token;
    if (metaactivenetwork && tokenname) {
      let chainHexsysmbol = network[activeid]?.chainHex;
      if (chainHexsysmbol != metaactivenetwork) {
        setswapbtnstatus(1);
        setswitchtokenname(tokenname);
      } else {
        setswapbtnstatus(0);
        setswitchtokenname(tokenname);
      }
    }
    if (search) {
      let da = [];
      tokenlistarr.forEach((element) => {
        if (element.address === search) {
          let a = [element];
          setloadertokenlist(1);
          settokenlistarr(a);
        }

        if (element.name.includes(search) === true) {
          da.push(element);
        }
      });

      if (da.length > 0) {
        setloadertokenlist(1);
        settokenlistarr(da);
      }
    }
    if (tokenname && !search) {
      let apires = await geteyeswaptokens(tokenname);

      if (apires === undefined) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Something Went Wrong!',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }

      if (apires.data.length > 0) {
        let arr = apires.data;
        setloadertokenlist(1);
        settokenlistarr(arr);
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
    if (activeid > -1) {
      if (tokenname == 'Ethereum' || tokenname == 'Binance-smart-chain') {
        settradetypYcal(0);
      } else {
        settradetypYcal(1);
      }
    }
    if (
      amount > 0 &&
      activeid > -1 &&
      tokenselect > 0 &&
      trade == 1 &&
      mediaEyeactiveid > -1
    ) {
      tradecalculation();
    }
  }, [activeid, search, tokenselect, mediaEyeactiveid]);

  return (
    <div className="eyeswap">
      <div className="eyeswap-header">
        <div className="eyeswap-header-left">
          <img src="/img/token/Subtract.png" alt="Subtract" />
          <span>eYeSwap</span>
        </div>

        {/* {CharityDonatePopup == 'charityDonate' ? (
          <div className="eyeswap-header-arrow" onClick={hedaerToggle}>
            <Angle side={hedaerToggleDropdown ? 'down' : 'up'} />
          </div>
        ) : null} */}
      </div>

      {hedaerToggleDropdown ? (
        <>
          <div className="eyeswap-headercontent" style={{ textAlign: 'left' }}>
            <div className="eyeswap-headercontent-section">
              <div className="eyeswap-headercontent-section-block">
                <input
                  type="number"
                  pattern="[0-9]*"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => {
                    amountCalculation(e.target.value);
                  }}
                  onBlur={(e) => {
                    bluramountCalculation(e.target.value);
                  }}
                />
                <div
                  className="eyeswap-headercontent-section-block-button"
                  onClick={toggleDropdown}
                >
                  {activeid > -1 ? (
                    network
                      .filter((item, i) => i === activeid)
                      .map((x) => (
                        <>
                          {tokenselect > 0 ? (
                            <>
                              <img src={tokenimage} alt={tokenname} />
                              <span>{tokenname}</span>
                            </>
                          ) : (
                            <span>Choose Token</span>
                          )}
                        </>
                      ))
                  ) : (
                    <span>Choose Token</span>
                  )}
                  <Angle side={toggle ? 'up' : 'down'} />
                </div>
              </div>

              {toggle ? (
                <div className="eyeswap-headercontent-section-dropdown mediaeyefancyScroll">
                  <div
                    className="eyeswap-headercontent-section-dropdown-close"
                    onClick={toggleDropdown}
                  >
                    <CloseIcon />
                  </div>

                  <div className="mediaeyeform-group">
                    <input
                      type="text"
                      placeholder="Name or Address"
                      value={search}
                      onChange={handleSearch}
                      className="mediaeyeform-input"
                    />
                  </div>

                  <div className="eyeswap-headercontent-section-dropdown-inner">
                    <div className="eyeswap-headercontent-section-dropdown-inner-left">
                      {network.map((item, i) => (
                        <div
                          key={i}
                          className={
                            i === activeid
                              ? 'eyeswap-headercontent-section-dropdown-inner-left-card active'
                              : 'eyeswap-headercontent-section-dropdown-inner-left-card'
                          }
                          onClick={() => handleActiveTab(i)}
                        >
                          <img src={item.img} alt={item.name} />
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="eyeswap-headercontent-section-dropdown-inner-right">
                      {loadertokenlist > 0 ? (
                        <div className="eyeswap-headercontent-section-dropdown-inner-right-content">
                          {tokenlistarr.map((element, index, array) => (
                            <div
                              className="eyeswap-headercontent-section-dropdown-inner-right-content-text"
                              onClick={() => {
                                toggleDropdownSecond(index);
                              }}
                            >
                              <img src={element.image} alt={element.name} />
                              <div className="eyeswap-headercontent-section-dropdown-inner-right-content-text-values">
                                <p>{element.name}</p>
                                <span>{element.symbol}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="box-3">
                          <div className="loader-3">
                            <div className="pulse"></div>
                            <div className="pulse"></div>
                            <div className="pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="eyeswap-headercontent-sidearrow">
              <RightSideArrow />
            </div>

            <div className="eyeswap-headercontent-section left">
              <div className="eyeswap-headercontent-section-block">
                <input
                  type="text"
                  readOnly
                  placeholder="0.0"
                  value={moneyAmount}
                />
                {tradetypYcal > 0 ? (
                  <div
                    className="eyeswap-headercontent-section-block-button"
                    onClick={(e) => {
                      mediaEyetoggleDropdown();
                    }}
                  >
                    {mediaEyeactiveid > -1 ? (
                      mediaEyenetwork
                        .filter((item, i) => i === mediaEyeactiveid)
                        .map((x) => (
                          <>
                            <img src={x.img} alt={x.name} />
                            <span>{x.name}</span>
                          </>
                        ))
                    ) : (
                      <span>Choose Token</span>
                    )}
                    <Angle side={togglemediaEye ? 'up' : 'down'} />
                  </div>
                ) : (
                  <div className="eyeswap-headercontent-section-block-button">
                    <img src="/img/token/EYE.png" alt="eye" />
                    <span>eYe</span>
                  </div>
                )}
              </div>
              {moneyAmount && gastokenamount > 0 ? (
                <div className="eyeswap-headercontent-section-suggetion">
                  <span>Est. fee ${gastokenamount}</span>
                </div>
              ) : null}

              {togglemediaEye ? (
                <div className="eyeswap-headercontent-section-dropdown mediaeyefancyScroll left">
                  <div
                    className="eyeswap-headercontent-section-dropdown-close"
                    onClick={mediaEyetoggleDropdown}
                  >
                    <CloseIcon />
                  </div>

                  <div className="eyeswap-headercontent-section-dropdown-inner">
                    <div className="eyeswap-headercontent-section-dropdown-inner-left">
                      {mediaEyenetwork.map((item, i) => (
                        <div
                          key={i}
                          className={
                            i === mediaEyeactiveid
                              ? 'eyeswap-headercontent-section-dropdown-inner-left-card active'
                              : 'eyeswap-headercontent-section-dropdown-inner-left-card'
                          }
                          onClick={() => handlemediaEyeActiveTab(i)}
                        >
                          <img src={item.img} alt={item.name} />
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="eyeswap-swapbutton">
            <ToastMessage.Provider
              ref={(node) => (window.toastProvider = node)}
            />
            {amount > 0 &&
            activeid > -1 &&
            moneyAmount &&
            mediaEyeactiveid > -1 ? (
              <button
                className="square-button square-button-gamming"
                onClick={handleSwap}
              >
                {swapbtnstatus > 0 ? (
                  <span>Switch to {switchtokenname} network </span>
                ) : (
                  <>
                    {' '}
                    <span>Swap</span>{' '}
                  </>
                )}
              </button>
            ) : (
              <button className="square-button square-button-disable">
                <span>Swap</span>
              </button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
