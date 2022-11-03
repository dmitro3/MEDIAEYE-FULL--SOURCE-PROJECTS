import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useDispatch, useSelector } from 'react-redux';
import {
  Angle,
  Business,
  CloseIcon,
  Copy,
  InfoCircle,
  InfoQuestion,
  Refresh,
  RightArrow,
  RightSideArrow,
  Settings,
  Transfer
} from '../../Icons';
import {
  toggleGeneralPopup,
  closeGeneralPopup,
  toggleAboutBuyPopup,
  toggleEyeDropdown,
  changeNetwork
} from '../../../store/app/appSlice';
import EyeSwapPopup from '../EyeSwapPopup/EyeSwapPopup';
import './EyeSwapOpen.scss';
import { SDK, BLOCKCHAIN_NAME } from 'rubic-sdk';
import { CalculateTrade } from '../EyeSwapPopup/CalculateTrade';
import { geteyeswaptokens } from '../../../blockchain/functions/Eyeswap/eyeswap';
import ReactTooltip from 'react-tooltip';
import Switch from 'react-switch';
import dots from '../../../assets/img/token/dots.png';
import pancakes from '../../../assets/img/token/Pancakes.svg';
import onelinch from '../../../assets/img/token/1inch.svg';
import rubix from '../../../assets/img/token/Rubix.svg';
import { type } from 'jquery';
import { async } from '@firebase/util';
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

export default function EyeSwapOpen(props) {
  const dispatch = useDispatch();
  const [trade, settrade] = useState(0);
  const [amount, setAmount] = useState();
  const [search, setSearch] = useState('');
  const [activeid, setActiveid] = useState();
  const [activeToken, setActiveToken] = useState();
  const [activeid2, setActiveid2] = useState();
  const [activeToken2, setActiveToken2] = useState();
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [tradeTypE, settradeTypE] = useState(0);
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
  const [tokenname, settokenname] = useState();
  const [tokenimage, settokenimage] = useState();
  const [mediaEyeactiveid, setmediaEyeactiveid] = useState(0);
  const [dummy, setDummy] = useState(0);
  const [togglemediaEye, settogglemediaEye] = useState(false);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const getId = useSelector((state) => state.app.getActiveTokenId);
  const type = useSelector((state) => state.app.setTypeofPopup);
  const token = useSelector((state) => state.app.getActiveNetwork);
  const { Moralis, user, setUserData, userError, isUserUpdating } =
    useMoralis();
  const [setting, setSetting] = useState(false);
  const [auto, setAuto] = useState(false);
  const [toggleRubic, setToggleRubic] = useState(true);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [toggleMultihops, setToggleMultihops] = useState(false);

  const mediaEyetoggleDropdown = async () => {
    settogglemediaEye(!togglemediaEye);
  };
  const amountCalculation = (value) => {
    setAmount(value);
  };
  const bluramountCalculation = (value) => {
    tradecalculation();
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
        setActiveid2();
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
            setActiveid2();
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
            setActiveid2();
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
            setActiveid2();
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
          setActiveid2();
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
          setActiveid2();
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
            setActiveid2();
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
          setActiveid2();
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
        setActiveid2();
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
  const autoRefresh = () => {
    if (toggleRefresh) {
      setToggleRefresh(false);
    } else {
      setToggleRefresh(true);
    }
  };
  const toggleDropdownSecond = (index) => {
    let a = tokenlistarr[index];
    if (a) {
      settokenname(a.symbol);
      settokenimage(a.image);
      settokenaddress(a.address);
      let a;
      if (tokenselect === 1) {
        a = 2;
        settokenselect(a);
        settrade(1);
        dispatch(
          toggleEyeDropdown({
            getId: activeid,
            token: index,
            type: type
          })
        );
      } else if (tokenselect === 2) {
        a = 1;
        settokenselect(a);
        settrade(1);
        dispatch(
          toggleEyeDropdown({
            getId: activeid,
            token: index,
            type: type
          })
        );
      } else {
        settokenselect(1);
        settrade(1);
        dispatch(
          toggleEyeDropdown({
            getId: activeid,
            token: index,
            type: type
          })
        );
      }
    }
    setToggle(false);
  };
  const switchRubic = () => {
    if (toggleRubic) {
      setToggleRubic(false);
    } else {
      setToggleRubic(true);
    }
  };
  const switchMultihops = () => {
    if (toggleMultihops) {
      setToggleMultihops(false);
    } else {
      setToggleMultihops(true);
    }
  };
  const toggleSetting = () => {
    setSetting(!setting);
  };
  const switchTokenDropdown = (type) => {
    setTokenOpen(!tokenOpen);
    if (type === 'first') {
      dispatch(
        toggleEyeDropdown({
          type: 'first'
        })
      );
      toggleDropdownSecond();
    } else {
      dispatch(
        toggleEyeDropdown({
          type: 'second'
        })
      );
      toggleDropdownSecond();
    }
  };
  useEffect(() => {
    if (type === 'first') {
      setActiveid(token);
      setActiveToken(getId);
    } else {
      if (type === 'second') {
        setActiveid2(token);
        setActiveToken2(getId);
      }
    }
  });
  const handleRefresh = () => {
    setActiveid(null);
    setActiveid2(null);
    setActiveToken(null);
    setActiveToken2(null);
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
    if (activeid2 > -1) {
      if (tokenname == 'Ethereum' || tokenname == 'Binance-smart-chain') {
        settradetypYcal(0);
      } else {
        settradetypYcal(1);
      }
    }
    if (
      amount > 0 &&
      activeid > -1 &&
      activeid2 > -1 &&
      tokenselect > 0 &&
      trade == 1 &&
      mediaEyeactiveid > -1
    ) {
      tradecalculation();
    }
  }, [activeid, search, tokenselect, mediaEyeactiveid, activeid2]);

  const handleSwapping = async () => {
    console.log(activeToken, activeToken2, 'swapping section');
    if (activeToken && activeToken2) {
      const val1 = activeToken;
      const val2 = activeToken2;
      console.log(val1, val2, 'swapped section');
      setActiveToken2(val1);
      setActiveToken(val2);
      console.log(activeToken, activeToken2, 'swapping section');
    } else {
      alert('choose both tokens first');
    }
  };

  return (
    <div className="mediaeye-layout-content eyeswap-open">
      <div className="eyeswap-open-inner">
        <div className="eyeswap-open-inner-header">
          {activeid && activeid2 ? (
            <div className="eyeswap-open-inner-header-leftside">
              <div className="eyeswap-open-inner-header-leftside-icons">
                {activeToken > -1
                  ? network
                      .filter((item, i) => i === activeToken)
                      .map((x) => <img src={x.img} alt="token" />)
                  : null}
                {activeToken2 > -1
                  ? network
                      .filter((item, i) => i === activeToken2)
                      .map((x) => (
                        <img className="second" src={x.img} alt="token" />
                      ))
                  : null}
              </div>
              <div className="eyeswap-open-inner-header-leftside-title">
                <span>Cross-Chain</span>
                <span className="bottom">
                  {activeToken > -1
                    ? network
                        .filter((item, i) => i === activeToken)
                        .map((x) => <>{x.name}</>)
                    : null}{' '}
                  to{' '}
                  {activeToken2 > -1
                    ? network
                        .filter((item, i) => i === activeToken2)
                        .map((x) => <>{x.name}</>)
                    : null}
                </span>
              </div>
            </div>
          ) : (
            <span className="eyeswap-open-inner-header-left">
              Cross-Chain Swaps for 15,000+ Assets
            </span>
          )}
          <div className="eyeswap-open-inner-header-right">
            {activeid && activeid2 ? (
              <div onClick={handleRefresh}>
                <Refresh />
              </div>
            ) : null}
            <div onClick={toggleSetting}>
              <Settings />
            </div>
          </div>
          {setting ? (
            <div
              className={
                !toggleRefresh
                  ? 'eyeswap-open-inner-settingdropdown big'
                  : 'eyeswap-open-inner-settingdropdown'
              }
            >
              <div className="eyeswap-open-inner-settingdropdown-header">
                <span>Slippage Tolerance</span>
                <div
                  className="mediaeyeinfo"
                  data-html={true}
                  data-class="mediaeyetooltip"
                  data-tip="Your transaction will be canceled if the <br/> price changes unfavorably by more <br/> than the entered percentage (a lower <br/> percentage decreases the chances of <br/> your transaction being front-run)."
                >
                  <InfoCircle type="outline-white" />
                </div>
              </div>
              <div className="eyeswap-open-inner-settingdropdown-middle">
                <button
                  className={
                    auto
                      ? 'eyeswap-open-inner-settingdropdown-middle-btn active'
                      : 'eyeswap-open-inner-settingdropdown-middle-btn'
                  }
                >
                  Auto
                </button>
                <div className="mediaeyeform-group-input">
                  <input value={'4%'} className="mediaeyeform-input" />
                </div>
              </div>
              {!toggleRefresh ? (
                <>
                  <div className="eyeswap-open-inner-settingdropdown-header">
                    <span>Transaction deadline</span>
                    <div
                      className="mediaeyeinfo"
                      data-html={true}
                      data-class="mediaeyetooltip"
                      data-tip="Your transaction will revert if it remains pending for more than this period of time.."
                    >
                      <InfoCircle type="outline-white" />
                    </div>
                  </div>
                  <div className="eyeswap-open-inner-settingdropdown-middle second">
                    <div className="mediaeyeform-group-input">
                      <input value={'20'} className="mediaeyeform-input" />
                    </div>

                    <span>minutes</span>
                  </div>
                  <div className="eyeswap-open-inner-settingdropdown-bottom m-t-30">
                    <div className="eyeswap-open-inner-settingdropdown-bottom-left">
                      <span>Disable multihops</span>
                      <div
                        className="mediaeyeinfo"
                        data-html={true}
                        data-class="mediaeyetooltip"
                        data-tip="Your swap will be completed only with direct pairs."
                      >
                        <InfoCircle type="outline-white" />
                      </div>
                      <ReactTooltip className="mediaeyetooltip" />
                    </div>
                    <Switch
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onChange={() => {
                        switchMultihops();
                      }}
                      checked={toggleMultihops}
                      height={20}
                      width={40}
                    />
                  </div>
                  <div className="eyeswap-open-inner-settingdropdown-bottom m-t-10">
                    <div className="eyeswap-open-inner-settingdropdown-bottom-left">
                      <span>Use Rubic Optimization</span>
                      <div
                        className="mediaeyeinfo"
                        data-html={true}
                        data-class="mediaeyetooltip"
                        data-tip="Rubic optimization is enabled by default. However, you can disable it so that the optimal trade route is executed without taking the cost of gas into account."
                      >
                        <InfoCircle type="outline-white" />
                      </div>
                      <ReactTooltip className="mediaeyetooltip" />
                    </div>
                    <Switch
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onChange={() => {
                        switchRubic();
                      }}
                      checked={toggleRubic}
                      height={20}
                      width={40}
                    />
                  </div>
                </>
              ) : null}
              <div className="eyeswap-open-inner-settingdropdown-bottom m-t-10">
                <div className="eyeswap-open-inner-settingdropdown-bottom-left">
                  <span>Auto-refresh</span>
                  <div
                    className="mediaeyeinfo"
                    data-html={true}
                    data-class="mediaeyetooltip"
                    data-tip="Updates trade parameters each 15 seconds"
                  >
                    <InfoCircle type="outline-white" />
                  </div>
                  <ReactTooltip className="mediaeyetooltip" />
                </div>
                <Switch
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onChange={() => {
                    autoRefresh();
                  }}
                  checked={toggleRefresh}
                  height={20}
                  width={40}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div
          className="eyeswap-open-inner-headercontent"
          style={{ textAlign: 'left' }}
        >
          <div className="eyeswap-open-inner-headercontent-section">
            <div className="eyeswap-open-inner-headercontent-section-block">
              <div
                className="eyeswap-open-inner-headercontent-section-block-button"
                onClick={() => {
                  switchTokenDropdown('first');
                }}
              >
                {activeToken > -1 ? (
                  <>
                    <img src={tokenlistarr[activeToken]?.image} alt="token" />
                    <span>{tokenlistarr[activeToken]?.name}</span>
                  </>
                ) : (
                  <span>Select Token</span>
                )}

                <Angle side={toggle ? 'up' : 'down'} />
              </div>
              <input
                type="number"
                pattern="[0-9]*"
                placeholder="Enter an Amount"
                value={amount}
                onChange={(e) => {
                  amountCalculation(e.target.value);
                }}
                onBlur={(e) => {
                  bluramountCalculation(e.target.value);
                }}
              />
            </div>
            {amount > 0 ? (
              <div className="eyeswap-open-inner-headercontent-section-refereceone">
                <div className="eyeswap-open-inner-headercontent-section-refereceone-box">
                  <span>You have 18.99978</span>
                  <span className="text-gray">MAX</span>
                </div>
              </div>
            ) : null}
          </div>
          <div
            className="eyeswap-open-inner-headercontent-sidearrow"
            onClick={handleSwapping}
          >
            <Transfer />
          </div>

          <div className="eyeswap-open-inner-headercontent-section left">
            <div className="eyeswap-open-inner-headercontent-section-block">
              <div
                className="eyeswap-open-inner-headercontent-section-block-button"
                onClick={(e) => {
                  switchTokenDropdown('second');
                }}
              >
                {activeToken2 > -1 ? (
                  <>
                    <img src={tokenlistarr[activeToken2]?.image} alt="token" />
                    <span>{tokenlistarr[activeToken2]?.name}</span>
                  </>
                ) : (
                  <span>Select Token</span>
                )}
                <Angle side={togglemediaEye ? 'up' : 'down'} />
              </div>
              <input
                type="text"
                readOnly
                placeholder="0.0"
                value={moneyAmount}
              />
            </div>
            {moneyAmount && gastokenamount > 0 ? (
              <div className="eyeswap-open-inner-headercontent-section-refereceone">
                <div className="eyeswap-open-inner-headercontent-section-refereceone-box">
                  <span>1 FTM = 0.215985 USDT</span>
                  <Transfer />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {tokenOpen ? (
          <div className="eyeswap-open-inner-chain">
            <div className="eyeswap-open-inner-chain-inner">
              <div className="eyeswap-open-inner-chain-inner-block">
                <div className="eyeswap-open-inner-chain-inner-block-one">
                  <img src={onelinch} />
                  <span>1inch</span>
                </div>
                <img
                  className="eyeswap-open-inner-chain-inner-block-picture"
                  src={dots}
                  alt="dots"
                />
              </div>
              <div
                className="eyeswap-open-inner-chain-inner-block"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <img src={rubix} alt="rubix" />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <span>Rubic</span>
                  <span>Smart Routing</span>
                </div>
              </div>
              <div className="eyeswap-open-inner-chain-inner-block">
                <img
                  src={dots}
                  className="eyeswap-open-inner-chain-inner-block-two"
                  alt="dots"
                />
                <div className="eyeswap-open-inner-chain-inner-block-pancake">
                  <img src={pancakes} alt="pancakes" />
                  <span>Pancakeswap</span>
                </div>
              </div>
            </div>
            <div className="eyeswap-open-inner-chain-outer"></div>
          </div>
        ) : null}
        <div className="eyeswap-open-inner-swapbutton">
          {/* <ToastMessage.Provider ref={(node) => (window.toastProvider = node)} /> */}
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
                  <span>Swap to ETH network</span>{' '}
                </>
              )}
            </button>
          ) : (
            <button className="square-button square-button-disable">
              <span>Swap to ETH network</span>
            </button>
          )}
        </div>
      </div>
      <div className="eyeswap-open-bottom">
        {activeid && activeid2 && transaction ? (
          <div className="eyeswap-open-bottom-content">
            <div
              onClick={() => setTransaction(!transaction)}
              className="eyeswap-open-bottom-content-header"
            >
              <span>Transaction details </span>
              <Angle side={'up'} />
            </div>
            <div className="eyeswap-open-bottom-content-section">
              <div className="eyeswap-open-bottom-content-section-row m-b-5">
                <div className="eyeswap-open-bottom-content-section-row-left">
                  <span>Network fee</span>
                  <div
                    className="mediaeyeinfo"
                    data-html={true}
                    data-class="mediaeyetooltip"
                    data-tip="Gas fee in target network taken in native token of source network."
                  >
                    <InfoQuestion />
                  </div>
                  <ReactTooltip className="mediaeyetooltip" />
                </div>
                <span>4.2 FTM ≈ $1.12</span>
              </div>
              <div className="eyeswap-open-bottom-content-section-row">
                <div className="eyeswap-open-bottom-content-section-row-left">
                  <span>Protocol fee</span>
                  <div
                    className="mediaeyeinfo"
                    data-html={true}
                    data-class="mediaeyetooltip"
                    data-tip="Platform's commission charges in USDC token."
                  >
                    <InfoQuestion />
                  </div>
                  <ReactTooltip className="mediaeyetooltip" />
                </div>
                <span>0.15% ≈ 0.00301 USDC</span>
              </div>
            </div>
            <div className="eyeswap-open-bottom-content-section">
              <div className="eyeswap-open-bottom-content-section-row m-b-5">
                <div className="eyeswap-open-bottom-content-section-row-left">
                  <span>Price impact in source network</span>
                  <div
                    className="mediaeyeinfo"
                    data-html={true}
                    data-class="mediaeyetooltip"
                    data-tip="Correlation between an incoming order and the change in the price of the asset involved caused by the trade. Cross-chain consists of two transactions and each has its' own price impact."
                  >
                    <InfoQuestion />
                  </div>
                  <ReactTooltip className="mediaeyetooltip" />
                </div>
                <span>0.19%</span>
              </div>
              <div className="eyeswap-open-bottom-content-section-row m-b-5">
                <div className="eyeswap-open-bottom-content-section-row-left">
                  <span>Price impact in target network</span>
                  <div
                    className="mediaeyeinfo"
                    data-html={true}
                    data-class="mediaeyetooltip"
                    data-tip="Correlation between an incoming order and the change in the price of the asset involved caused by the trade. Cross-chain consists of two transactions and each has its' own price impact."
                  >
                    <InfoQuestion />
                  </div>
                  <ReactTooltip className="mediaeyetooltip" />
                </div>
                <span>0.01%</span>
              </div>
              <div className="eyeswap-open-bottom-content-section-row">
                <div className="eyeswap-open-bottom-content-section-row-left">
                  <span>Current slippage</span>
                  <div
                    className="mediaeyeinfo"
                    data-html={true}
                    data-class="mediaeyetooltip"
                    data-tip="Output is estimated. You will receive at least 81,246.43276 WFTM or the transaction will revert."
                  >
                    <InfoQuestion />
                  </div>
                  <ReactTooltip className="mediaeyetooltip" />
                </div>
                <span>4%</span>
              </div>
            </div>
            <div className="eyeswap-open-bottom-content-foot">
              <div className="eyeswap-open-bottom-content-foot-left m-b-5">
                <span>You will receive BSC tokens at this address</span>
              </div>
              <div className="eyeswap-open-bottom-content-foot-right">
                <span>0x6b2...d2b48</span>
                <Business />
                <Copy type={'white'} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeid && activeid2 ? (
              <div
                className="eyeswap-open-bottom-header"
                onClick={() => setTransaction(!transaction)}
              >
                <span>
                  Transaction details <Angle side={'down'} />
                </span>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
