import React, { useEffect, useState } from 'react';
import uniswaplogo from '../../../assets/img/uniswaplogo.png';
import pancakeswaplogo from '../../../assets/img/pancakeswaplogo.png';
import {
  closeAboutBuyPopup,
  closeEyeDropdown,
  toggleGeneralPopup,
  closeGeneralPopup,
  toggleEyeDropdown
} from '../../../store/app/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import { CloseIcon, Star } from '../../Icons';
import { useMoralis } from 'react-moralis';
import './EyeSwapOpen.scss';
import { CalculateTrade } from '../EyeSwapPopup/CalculateTrade';
import { geteyeswaptokens } from '../../../blockchain/functions/Eyeswap/eyeswap';
import { SDK, BLOCKCHAIN_NAME } from 'rubic-sdk';

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

export default function EyeDropdown(props) {
  const { Moralis, user, setUserData, userError, isUserUpdating } =
    useMoralis();

  const showEyeDropdown = useSelector((state) => state.app.showEyeDropdown);
  const getId = useSelector((state) => state.app.getActiveTokenId);
  const type = useSelector((state) => state.app.setTypeofPopup);
  const token = useSelector((state) => state.app.getActiveNetwork);
  const dispatch = useDispatch();
  const [tokenselect, settokenselect] = useState(0);
  const [search, setSearch] = useState('');
  const [activeid, setActiveid] = useState();
  const [loadertokenlist, setloadertokenlist] = useState(0);
  const [tokenlistarr, settokenlistarr] = useState([]);
  const [trade, settrade] = useState(0);
  const [tokenname, settokenname] = useState();
  const [tokenimage, settokenimage] = useState();
  const [tokenaddress, settokenaddress] = useState();
  const [toggle, setToggle] = useState(false);
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [swapbtnstatus, setswapbtnstatus] = useState(0);
  const [switchtokenname, setswitchtokenname] = useState();
  const [tradetypYcal, settradetypYcal] = useState(0);
  const [mediaEyeactiveid, setmediaEyeactiveid] = useState(0);
  const [amount, setAmount] = useState();
  const [gastokenamount, setgastokenamount] = useState(0);
  const [tradeTypE, settradeTypE] = useState(0);
  const [instantTrade, setinstantTrade] = useState();

  const handleSearch = (e) => {
    settokenselect(0);
    setSearch(e.target.value);
  };
  const handleActiveTab = (e, type) => {
    setActiveid(e);
    setSearch('');
    settrade(0);
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

  const loadInfo = async () => {
    var metaactivenetwork = window.ethereum?.networkVersion;
    setloadertokenlist(0);
    setMoneyAmount(0);
    let tokenname = network[activeid]?.token;
    if (metaactivenetwork && tokenname) {
      var chainHexsysmbol = network[activeid]?.chainHex;
      if (chainHexsysmbol !== metaactivenetwork) {
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
      if (tokenname === 'Ethereum' || tokenname === 'Binance-smart-chain') {
        settradetypYcal(0);
      } else {
        settradetypYcal(1);
      }
    }
    if (
      amount > 0 &&
      activeid > -1 &&
      tokenselect > 0 &&
      trade === 1 &&
      mediaEyeactiveid > -1
    ) {
      tradecalculation();
    }
  };

  useEffect(() => {
    loadInfo();
  }, [activeid, search, tokenselect, mediaEyeactiveid]);

  return (
    <>
      {showEyeDropdown ? (
        <div
          className={
            showEyeDropdown ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => dispatch(closeEyeDropdown())}
          >
            <div
              className="mediaeye-popup-content eye-token"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => dispatch(closeEyeDropdown())}
                >
                  <CloseIcon />
                </div>
                <div className="eye-token-header">Tokens List</div>
                <div>
                  <div className="mediaeyefancyScroll">
                    <div className="eye-token-searchbar">
                      <div className="mediaeyeform-group-input">
                        <input
                          className="mediaeyeform-input"
                          type="text"
                          placeholder="Name or Address"
                          value={search}
                          onChange={handleSearch}
                        />
                      </div>
                      <div className="eye-token-searchbar-right">
                        <Star type={'outline'} />
                      </div>
                    </div>
                    <div className="eyeswap-open-inner-headercontent-section-dropdown-inner">
                      <div className="eyeswap-open-inner-headercontent-section-dropdown-inner-left">
                        {network.map((item, i) => (
                          <div
                            key={i}
                            className={
                              i === activeid
                                ? 'eyeswap-open-inner-headercontent-section-dropdown-inner-left-card active'
                                : 'eyeswap-open-inner-headercontent-section-dropdown-inner-left-card'
                            }
                            onClick={() => handleActiveTab(i)}
                          >
                            <img src={item.img} alt={item.name} />
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="eyeswap-open-inner-headercontent-section-dropdown-inner-right">
                        {loadertokenlist > 0 ? (
                          <div className="eyeswap-open-inner-headercontent-section-dropdown-inner-right-content">
                            {tokenlistarr.map((element, index, array) => (
                              <div
                                className="eyeswap-open-inner-headercontent-section-dropdown-inner-right-content-text"
                                onClick={() => {
                                  toggleDropdownSecond(index);
                                }}
                              >
                                <img src={element.image} alt={element.name} />
                                <div className="eyeswap-open-inner-headercontent-section-dropdown-inner-right-content-text-values">
                                  <span>{element.name}</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
