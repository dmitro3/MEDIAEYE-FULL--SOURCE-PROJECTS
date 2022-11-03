import './EyeSwapOpen.scss';
import Switch from 'react-switch';
import ReactTooltip from 'react-tooltip';
import { useMoralis } from 'react-moralis';
import Popover from '@mui/material/Popover';
import { useLocation } from "react-router-dom";
import { SDK, BLOCKCHAIN_NAME } from 'rubic-sdk';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CalculateadvanceTrade } from './AdvanceSwapcalculation';
import {
  Angle,
  InfoCircle,
  Refresh,
  Settings,
  Transfer,
  Business,
  Copy,
  Star,
  InfoQuestion
} from '../../Icons';
import {
  toggleGeneralPopup,
  eyeSwapProPopup,
  closeGeneralPopup,
  changeNetwork
} from '../../../store/app/appSlice';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import rubic from '../../../assets/img/token/rubic.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ChangingProgressProvider from "./ChangingProgressProvider";
import { ChainName } from '../../../blockchain/functions/ChangeChain';

const EyeSwapPro = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const [tocoin, settocoin] = useState();
  const { Moralis, user } = useMoralis();
  const [amount, setamount] = useState('');
  const [fromcoin, setfromcoin] = useState();
  const [accountid, setaccountid] = useState();
  const [maxamount, setmaxamount] = useState(0);
  const [tradedata, settradedata] = useState([]);
  const [toggleone, settoggleone] = useState(false);
  const [toggletwo, settoggletwo] = useState(false);
  const [chainstatus, setchainstatus] = useState(0);
  const [tocoinamount, settocoinamount] = useState();
  const [refreshtimer, setrefreshtimer] = useState(1);
  const [timerflagflag, settimerflagflag] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tokenitemone, settokenitemone] = useState({});
  const [tokenitemtwo, settokenitemtwo] = useState({});
  const [refresh_timer, setrefresh_timer] = useState(1);
  const [swapbtnstatus, setswapbtnstatus] = useState(0);
  const [maintradedata, setmaintradedata] = useState([]);
  const [fromcoinamount, setfromcoinamount] = useState();
  const [showLessMore, setShowLessMore] = useState(false);
  const [coinexchange, setcoinexchange] = useState(false);
  const [slippageamount, setslippageamount] = useState(1);
  const [ToggleRefresh, setToggleRefresh] = useState(true);
  const [networkitemone, setnetworkitemone] = useState({});
  const [networkitemtwo, setnetworkitemtwo] = useState({});
  const [maxamountstatus, setmaxamountstatus] = useState(0);
  const [networkactiveone, setnetworkactiveone] = useState();
  const [networkactivetwo, setnetworkactivetwo] = useState();
  const [timerdivstatus, settimerdivstatus] = useState(false);
  const [outputmoneyAmount, setoutputmoneyAmount] = useState();
  const [stoptimertradeerr, setstoptimertradeerr] = useState(0);
  const [transactiondetail, settransactiondetail] = useState({});
  const [tradedatadivstatus, settradedatadivstatus] = useState(false);
  const [copyWalletCreators, setCopyWalletCreators] = useState(false);
  const [transactionDropdown, setTransactionDropdown] = useState(false);
  const [tradedatadivclassstatus, settradedatadivclassstatus] = useState(0);

  const eyeSwapProPopuptype = useSelector(
    (state) => state.app.eyeSwapProPopuptype
  );
  const eyeSwapProPopupactiveId = useSelector(
    (state) => state.app.eyeSwapProPopupactiveId
  );
  const eyeSwapProPopuptokenitem = useSelector(
    (state) => state.app.eyeSwapProPopuptokenitem
  );
  const eyeSwapProPopupnetworkitem = useSelector(
    (state) => state.app.eyeSwapProPopupnetworkitem
  );

  const switchTokenDropdown = (type) => {
    if (type === 'first') {
      settoggleone(!toggleone);
      let key;
      if (!networkactiveone && networkactivetwo) {
        key = 0;
      } else {
        key = networkactiveone;
      }
      dispatch(
        eyeSwapProPopup({
          type: 'first',
          active_Network: key,
          active_token: tokenitemtwo
        })
      );
    } else {
      settoggletwo(!toggletwo);
      let key;
      if (!networkactivetwo && networkactiveone) {
        key = 0;
      } else {
        key = networkactivetwo;
      }
      dispatch(
        eyeSwapProPopup({
          type: 'second',
          active_Network: key,
          active_token: tokenitemone
        })
      );
    }
  };
  const handleSwappingnetwork = async () => {
    setstoptimertradeerr(1);
    const tokenitem_one = tokenitemone;
    const tokenitem_two = tokenitemtwo;
    settokenitemtwo(tokenitem_one);
    settokenitemone(tokenitem_two);
    const networkitem_one = networkitemone;
    const networkitem_two = networkitemtwo;
    setnetworkitemtwo(networkitem_one);
    setnetworkitemone(networkitem_two);
    const networkactive_two = networkactivetwo;
    const networkactive_one = networkactiveone;
    setnetworkactivetwo(networkactive_one);
    setnetworkactiveone(networkactive_two);
  };
  const handleSwap = async () => {
    if (swapbtnstatus === 1) {
      if (window.ethereum) {
        let chainHex = networkitemone.chainHex;
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainHex }]
          });
          setswapbtnstatus(3);
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
              setswapbtnstatus(0);
            }
          } else if (error.code === -32002) {
            alert('Please check Metamask for pending request.');
            setswapbtnstatus(0);
          }
        }
      } else {
        // change chain manually
        dispatch(changeNetwork(ChainName(networkitemone.chainHex)));
        alert(
          'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
        );
        setswapbtnstatus(0);
      }
    }
    if (swapbtnstatus === 2) {
      let a = tradedata[tradedatadivclassstatus];
      let trade_swap;
      let vaal = 0;
      maintradedata.forEach((trade, index) => {
        if (networkitemone.name === networkitemtwo.name) {
          let name = trade.constructor.name.toString();
          if (name == a.name) {
            trade_swap = trade;
            vaal = 0;
          }
        } else {
          let name = trade.tradeType.toString();
          if (name == a.name) {
            trade_swap = trade;
            vaal = 1;
          }
        }
      });
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const walletProvider = {
        address: accounts[0],
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
          },
          [BLOCKCHAIN_NAME.CELO]: {
            mainRpc: 'https://rpc.ankr.com/celo'
          },
          [BLOCKCHAIN_NAME.FUSE]: {
            mainRpc: 'https://rpc.fuse.io'
          },
          [BLOCKCHAIN_NAME.GNOSIS]: {
            mainRpc: 'https://rpc.ankr.com/gnosis'
          },
          [BLOCKCHAIN_NAME.OKE_X_CHAIN]: {
            mainRpc: 'https://exchainrpc.okex.org'
          },
          [BLOCKCHAIN_NAME.CRONOS]: {
            mainRpc: 'https://evm.cronos.org'
          },
          [BLOCKCHAIN_NAME.OPTIMISM]: {
            mainRpc: 'https://rpc.ankr.com/optimism'
          }
        },
        providerAddress: user.attributes.ethAddress,
        walletProvider,
        integratorAddress: '0x7B974aefd3D5c05274bd239e3B697D111eD51Ade'
      };
      try {
        await SDK.createSDK(configuration);
        let txnhash = '';
        const onConfirm = (hash) => {
          txnhash = hash;
          dispatch(
            toggleGeneralPopup({
              status: 'loading',
              message: 'Processing...',
              size: 'xs',
              autoClose: 'false'
            })
          );
        };

        const onApprove = (hash) => {
          dispatch(
            toggleGeneralPopup({
              status: 'loading',
              message: 'Processing...',
              size: 'xs',
              autoClose: 'false'
            })
          );
        };

        if (vaal == 0) {
          await trade_swap.swap({ onConfirm, onApprove });
        } else {
          await trade_swap.trade.swap({ onConfirm, onApprove });
        }

        dispatch(closeGeneralPopup());
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            message: 'Swap Completed !!',
            copyText: txnhash,
            copyTextLink: `${networkitemone.tlink}${txnhash}`,
            textButton: 'OK',
            size: 'sm'
          })
        );
        setswapbtnstatus(0);
        settradedatadivstatus(false);
        setoutputmoneyAmount(null);
        return;
      } catch (e) {
        dispatch(closeGeneralPopup());
        let a = e.stack;
        if (e.message) {
          if (e.message == 0 || e.message == 2) {
            setswapbtnstatus(0);
            settradedatadivstatus(false);
            setoutputmoneyAmount(null);
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Insufficient Balance',
                textButton: 'OK',
                size: 'sm'
              })
            );
          } else if (a.includes('InsufficientFundsError')) {
            setswapbtnstatus(0);
            settradedatadivstatus(false);
            setoutputmoneyAmount(null);
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Insufficient Balance',
                textButton: 'OK',
                size: 'sm'
              })
            );
          } else {
            setswapbtnstatus(0);
            settradedatadivstatus(false);
            setoutputmoneyAmount(null);
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
          setswapbtnstatus(0);
          settradedatadivstatus(false);
          setoutputmoneyAmount(null);
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Insufficient Balance',
              textButton: 'OK',
              size: 'sm'
            })
          );
        } else {
          setswapbtnstatus(0);
          settradedatadivstatus(false);
          setoutputmoneyAmount(null);

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
    if (swapbtnstatus === 3) {
      setchainstatus(1);
      setswapbtnstatus(2);
    }
  };
  const amountCalculation = (value) => {
    value = value.replace(/^0+[0-9]/g, '0');
    setamount(value);
  };
  const slippageamountCalculation = (value) => {
    value = value.replace(/^0+[0-9]/g, '0');
    setslippageamount(value);
  };
  const bluramountCalculation = () => {
    tradecalculation();
  };
  const tradecalculation = async (aa) => {
    if (
      Object.keys(tokenitemone).length > 0 &&
      Object.keys(tokenitemtwo).length > 0 &&
      Object.keys(networkitemtwo).length > 0 &&
      Object.keys(networkitemone).length > 0 &&
      amount
    ) {
      if (!aa) {
        dispatch(
          toggleGeneralPopup({
            status: 'loading',
            message: 'Processing...',
            size: 'xs',
            autoClose: 'false'
          })
        );
      }

      const userethAddress = user.attributes.ethAddress;
      const CalculateadvanceTraderes = await CalculateadvanceTrade(
        tokenitemone,
        tokenitemtwo,
        networkitemone,
        networkitemtwo,
        amount,
        userethAddress
      );
      console.log(
        CalculateadvanceTraderes,
        'CalculateadvanceTradeCalculateadvanceTradeCalculateadvanceTrade'
      );
      if (CalculateadvanceTraderes?.status == 2) {
        setstoptimertradeerr(1);
        dispatch(closeGeneralPopup());
        settradedatadivstatus(false);
        setswapbtnstatus(0);
        setrefreshtimer(0);
        setoutputmoneyAmount(null);
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: CalculateadvanceTraderes.msg,
            textButton: 'OK',
            size: 'sm'
          })
        );
      } else if (
        CalculateadvanceTraderes?.status == 1 &&
        CalculateadvanceTraderes?.abc.length > 0
      ) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        if (ToggleRefresh) {
          setrefresh_timer(1);
        } else {
          setrefresh_timer(0);
        }
        await getbalancedata()
        setaccountid(accounts[0]);
        setCopyWalletCreators(false);
        let tradedataa = CalculateadvanceTraderes.abc;
        settradedata(tradedataa);
        let maintradedataa = CalculateadvanceTraderes.cba;
        setmaintradedata(maintradedataa);
        let amount_ = tradedataa[0].amount;
        setoutputmoneyAmount(amount_);
        const metaactivenetwork = window.ethereum.networkVersion;
        if (networkitemone.chainid == metaactivenetwork) {
          setswapbtnstatus(3);
        } else {
          setswapbtnstatus(1);
        }
        settradedatadivstatus(true);
        setfromcoinamount(1);
        let fromonecoinvalue = tokenitemone.usdPrice;
        let toonecoinvalue = tokenitemtwo.usdPrice;
        let tocoinvalue = fromonecoinvalue / toonecoinvalue;
        settocoinamount(tocoinvalue.toFixed(5));
        setfromcoin(tokenitemone.symbol);
        settocoin(tokenitemtwo.symbol);
        setcoinexchange(true);
        dispatch(closeGeneralPopup());
      } else {
        setstoptimertradeerr(1);
        dispatch(closeGeneralPopup());
        settradedatadivstatus(false);
        setswapbtnstatus(0);
        setrefreshtimer(0);
        setoutputmoneyAmount('');
        setoutputmoneyAmount('Trading Not available');
      }
    }
  };
  const handleShowHideTrade = () => {
    setShowLessMore(!showLessMore);
  };
  const toggleTransactionDetails = () => {
    setTransactionDropdown(!transactionDropdown);
  };
  const handlesettingOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlesettingClose = () => {
    setAnchorEl(null);
  };
  const selecttradedata = (i) => {
    let amount_ = tradedata[i].amount;
    setoutputmoneyAmount(amount_);
    settradedatadivclassstatus(i);
  };
  const handlerefresh = () => {
    tradecalculation();
  };
  const handlepriceexchange = () => {
    let fromonecoinvalue;
    let toonecoinvalue;
    if (tokenitemone.symbol == fromcoin) {
      fromonecoinvalue = tokenitemtwo.usdPrice;
      toonecoinvalue = tokenitemone.usdPrice;
    } else {
      fromonecoinvalue = tokenitemone.usdPrice;
      toonecoinvalue = tokenitemtwo.usdPrice;
    }
    let tocoinvalue = fromonecoinvalue / toonecoinvalue;
    settocoinamount(tocoinvalue.toFixed(5));
    setfromcoinamount(1);
    setfromcoin(tocoin);
    settocoin(fromcoin);
  };
  const autoRefresh = () => {
    if (timerflagflag) {
      clearInterval(timerflagflag);
      settimerflagflag();
      setrefresh_timer(0);
      setrefreshtimer(0);
      setToggleRefresh(false);
      settimerdivstatus(false);
    } else {
      setToggleRefresh(!ToggleRefresh);
    }
  };
  const runautoRefresh = async (a) => {
    if (ToggleRefresh == true && refreshtimer > 0) {
      var counter = 0;
      let nIntervId = setInterval(flashText, 1000);
      settimerflagflag(nIntervId)
      async function flashText() {
        let location = window.location;
        window.stop();
        let url = new URL(location.href);
        let mainurl = url.href;
        // if (mainurl != "https://test1.mediaeyenft.com/eyeswap-home" || mainurl != "https://test1.mediaeyenft.com/eyeswap-home" || mainurl != "https://test1.mediaeyenft.com/eyeswap-home") {
        //   clearInterval(nIntervId);
        //   settimerflagflag();
        //   setrefresh_timer(0);
        //   setrefreshtimer(0);
        //   setToggleRefresh(false);
        //   settimerdivstatus(false);
        // }
        if (counter == 10) {
          setrefresh_timer(0);
          settimerdivstatus(true);
        }
        if (counter == 48) {
          counter = 0;
          settimerdivstatus(false);
          setrefresh_timer(1);
          await tradecalculation("call");
        }
        counter++;
      }
    };
  };
  const timerfunset = () => {
    clearInterval(timerflagflag);
    settimerflagflag();
    setrefresh_timer(0);
    setrefreshtimer(0);
    setToggleRefresh(false);
    settimerdivstatus(false);
  };
  const openAccount = () => {
    let openlink = networkitemtwo.link + accountid;
    window.open(openlink);
  };
  const copyLink = async () => {
    setCopyWalletCreators(true);
    let openlink = networkitemtwo.link + accountid;
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(openlink);
    } else {
      document.execCommand('copy', true, openlink);
    }
  };
  const calculateTxnDetails = () => {
    let a = tradedata[tradedatadivclassstatus];
    let trade_swap;
    let vaal = 0;
    maintradedata.forEach((trade, index) => {
      if (networkitemone.name == networkitemtwo.name) {
        let name = trade.constructor.name.toString();
        if (name && a.name && name == a.name) {
          trade_swap = trade;
          vaal = 0;
        }
      } else {
        let name = trade.tradeType;
        if (name && a.name && name == a.name) {
          trade_swap = trade;
          vaal = 1;
        }
      }
    });
    var data = {};
    if (vaal == 0) {
      data.slippageTolerance = trade_swap?.slippageTolerance;
      var minval = trade_swap?.gasFeeInfo?.gasFeeInEth?.toString();
      minval = parseFloat(minval);
      let amout = parseFloat(outputmoneyAmount);
      minval = amout - minval;
      data.priceImpact = trade_swap?.priceImpact;
      if (minval) {
        data.minval = minval;
      }
    } else {
      data.priceImpact = trade_swap?.trade.priceImpact;
      data.networkFee = trade_swap?.trade.networkFee.toString();
      let pfee = trade_swap?.trade?.feeInfo?.fixedFee?.amount.toString();
      let pfeesymbol = trade_swap?.trade?.feeInfo?.fixedFee?.tokenSymbol;
      pfee = parseFloat(pfee);
      if (
        pfee &&
        pfeesymbol &&
        pfee === 0.0005767212245 &&
        pfeesymbol === 'ETH'
      ) {
        data.pfee = pfee;
        data.pfeesymbol = pfeesymbol;
        data.outputpfee = '1$';
      }
    }
    settransactiondetail(data);
  };
  const setmaxvalue = () => {
    setamount(maxamount);
  };
  const getbalancedata = async () => {
    const payload = { chain: networkitemone.chainHex };
    try {
      const balancesdata = await Moralis.Web3API.account.getTokenBalances(
        payload
      );
      const nativeBalance = await Moralis.Web3API.account.getNativeBalance(
        payload
      );
      if (balancesdata && balancesdata.length > 0) {
        let balance = balancesdata.find(
          (el) => el.symbol === tokenitemone.symbol
        );
        if (balance) {
          let bal = balance.balance;
          let decimal = balance.decimals;
          let a = parseInt(bal) / Math.pow(10, decimal);
          a = a.toFixed(5);
          if (a) {
            setmaxamount(a);
            setmaxamountstatus(1);
            return
          } else {
            setmaxamountstatus(0);
            return
          }
        }
        if (
          tokenitemone.symbol == networkitemone.symbol
        ) {
          let a = parseInt(nativeBalance.balance) / Math.pow(10, 18);
          a = a.toFixed(5);
          if (a) {
            setmaxamount(a);
            setmaxamountstatus(1);
            return
          } else {
            setmaxamountstatus(0);
            return
          }
        }
      } else {
        return;
      }
    } catch (e) {
      setmaxamount(0);
      setmaxamountstatus(0);
      return
    }
  };

  useEffect(() => {
    if (tradedata.length > 0 && maintradedata.length > 0) {
      calculateTxnDetails();
    }
  }, [tradedata, maintradedata, tradedatadivclassstatus, outputmoneyAmount]);

  useEffect(async () => {
    if (eyeSwapProPopuptype && eyeSwapProPopuptype == 'first') {
      const payload = { chain: eyeSwapProPopupnetworkitem.chainHex };
      try {
        const balancesdata = await Moralis.Web3API.account.getTokenBalances(
          payload
        );
        const nativeBalance = await Moralis.Web3API.account.getNativeBalance(
          payload
        );
        if (balancesdata && balancesdata.length > 0) {
          let balance = balancesdata.find(
            (el) => el.symbol === eyeSwapProPopuptokenitem.symbol
          );
          if (balance) {
            let bal = balance.balance;
            let decimal = balance.decimals;
            let a = parseInt(bal) / Math.pow(10, decimal);
            a = a.toFixed(5);
            if (a) {
              setmaxamount(a);
              setmaxamountstatus(1);
            } else {
              setmaxamountstatus(0);
            }

          }
          if (
            eyeSwapProPopuptokenitem.symbol == eyeSwapProPopupnetworkitem.symbol
          ) {
            let a = parseInt(nativeBalance.balance) / Math.pow(10, 18);
            a = a.toFixed(5);
            if (a) {
              setmaxamount(a);
              setmaxamountstatus(1);
            } else {
              setmaxamountstatus(0);
            }
          }
        }
      } catch (e) {
        setmaxamount(0);
        setmaxamountstatus(0);
      }
      settokenitemone(eyeSwapProPopuptokenitem);
      setnetworkactiveone(eyeSwapProPopupactiveId);
      setnetworkitemone(eyeSwapProPopupnetworkitem);
    }
    if (eyeSwapProPopuptype && eyeSwapProPopuptype == 'second') {
      settokenitemtwo(eyeSwapProPopuptokenitem);
      setnetworkactivetwo(eyeSwapProPopupactiveId);
      setnetworkitemtwo(eyeSwapProPopupnetworkitem);
    }
  }, [
    eyeSwapProPopuptype,
    eyeSwapProPopupactiveId,
    eyeSwapProPopuptokenitem,
    eyeSwapProPopupnetworkitem
  ]);

  useEffect(async () => {
    if (
      Object.keys(tokenitemone).length > 0 &&
      Object.keys(tokenitemtwo).length > 0 &&
      Object.keys(networkitemtwo).length > 0 &&
      Object.keys(networkitemone).length > 0 &&
      amount
    ) {
      tradecalculation();
    }
  }, [networkitemone, networkitemtwo, tokenitemone, tokenitemtwo]);

  useEffect(() => {
    if (ToggleRefresh == true && refreshtimer > 0) {
      runautoRefresh();
    }
  }, [ToggleRefresh, refreshtimer]);

  useEffect(() => {
    if (stoptimertradeerr == 1) {
      setstoptimertradeerr(0);
      timerfunset()
    }
  }, [stoptimertradeerr]);

  const valuess = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  const open = Boolean(anchorEl);
  const id = open ? 'setting-popover' : undefined;

  return (
    <div className="mediaeye-layout-content eyeswap-open">
      <div className="eyeswap-open-inner">
        <div className="eyeswap-open-inner-header">
          {networkactiveone >= 0 && networkactivetwo >= 0 ? (
            <div className="eyeswap-open-inner-header-leftside">
              <div className="eyeswap-open-inner-header-leftside-icons">
                <div className="eyeswap-open-inner-header-leftside-icons-wrapper">
                  <div className="eyeswap-open-inner-header-leftside-icons-wrapper-container">
                    <img src={networkitemone?.img} alt="network" />
                  </div>
                </div>
                <div className="eyeswap-open-inner-header-leftside-icons-wrapper second">
                  <div className="eyeswap-open-inner-header-leftside-icons-wrapper-container">
                    <img src={networkitemtwo?.img} alt="network" />
                  </div>
                </div>
              </div>
              <div className="eyeswap-open-inner-header-leftside-title">
                {networkitemone.name === networkitemtwo.name ? (
                  <span>Instant Trade</span>
                ) : (
                  <span>Cross-Chain</span>
                )}
                <span className="bottom">
                  {networkitemone.name} to {networkitemtwo.name}
                </span>
              </div>
            </div>
          ) : (
            <span className="eyeswap-open-inner-header-left">
              Cross-Chain Swaps for 15,000+ Assets
            </span>
          )}
          <div className="eyeswap-open-inner-header-right text-right">
            {tradedatadivstatus ? (
              <div className='rotate-wrap'>
                {timerdivstatus ?
                  <>
                    <div className="rotate-wrap-timer-none">
                      <ChangingProgressProvider values={valuess}>
                        {percentage => (
                          <CircularProgressbar
                            value={percentage}
                            styles={{
                              pathTransitionDuration: 0.5
                            }}
                          />
                        )}
                      </ChangingProgressProvider>
                    </div>

                    <div className={
                      refresh_timer == 1 ? 'rotate-wrap-rotate-style rotate' : 'rotate-wrap-rotate-style'
                    }
                      onClick={handlerefresh}>
                      <Refresh />
                    </div>
                  </>
                  :
                  <div className={
                    refresh_timer == 1 ? 'rotate-wrap-rotate-style rotate' : 'rotate-wrap-rotate-style'
                  }
                    onClick={handlerefresh}>
                    <Refresh />
                  </div>
                }
              </div>
            ) : null}
            <div onClick={handlesettingOpen}>
              <Settings />
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlesettingClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              className="eyeswap-setting-popover"
            >
              <div className="eyeswap-open-inner-settingdropdown">
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
                  <button className="eyeswap-open-inner-settingdropdown-middle-btn">
                    Auto
                  </button>
                  <div className="mediaeyeform-group-input">
                    <input
                      type="text"
                      value={slippageamount}
                      onChange={(e) => {
                        const validNumber = /^[0-9\b]+$/;
                        let value = e.target.value;
                        if (value <= 50 && value > -1) {
                          if (value === '' || validNumber.test(value)) {
                            value = setslippageamount(value);
                          }
                        }
                      }}
                      className="mediaeyeform-input"
                      style={{ paddingRight: '20px' }}
                    />
                    <span className="eyeswap-percentIcon">%</span>
                  </div>
                </div>
                {/* <div className="eyeswap-open-inner-settingdropdown-header">
                  <span>Transaction deadline</span>
                  <div
                    className="mediaeyeinfo"
                    data-html={true}
                    data-class="mediaeyetooltip"
                    data-tip="Your transaction will revert if it remains pending for more than this period of time."
                  >
                    <InfoCircle type="outline-white" />
                  </div>
                </div> */}
                {/* <div className="eyeswap-open-inner-settingdropdown-middle second">
                  <div className="mediaeyeform-group-input">
                    <input value={'20'} className="mediaeyeform-input" />
                  </div>
                  <span>minutes</span>
                </div> */}
                {/* <div className="eyeswap-open-inner-settingdropdown-bottom m-t-30">
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
                    height={20}
                    width={40}
                  />
                </div> */}
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
                    checked={ToggleRefresh}
                    height={20}
                    width={40}
                  />
                </div>
              </div>
            </Popover>
          </div>
        </div>
        <div
          className="eyeswap-open-inner-headercontent"
          style={{ textAlign: 'left' }}
        >
          <div className="eyeswap-open-inner-headercontent-section">
            <label className="eyeswap-open-inner-headercontent-section-block">
              <div
                className="eyeswap-open-inner-headercontent-section-block-button"
                onClick={() => {
                  switchTokenDropdown('first');
                }}
              >
                {networkactiveone > -1 ? (
                  <>
                    <LazyLoadImage
                      src={tokenitemone.image}
                      effect="opacity"
                      onError={(event) => {
                        event.target.src = '/img/token/lazyload.png';
                        event.onerror = null;
                      }}
                    />
                    {/* <img src={tokenitemone.image} alt="token" /> */}
                    <span>{tokenitemone.symbol}</span>
                  </>
                ) : (
                  <span>Select Token</span>
                )}

                <Angle side={toggleone ? 'up' : 'down'} />
              </div>
              <input
                type="text"
                placeholder="Enter an Amount"
                value={amount}
                onChange={(e) => {
                  const validNumber = new RegExp(/^\d*\.?\d*$/);
                  let value = e.target.value;
                  if (value === '' || validNumber.test(value)) {
                    value = setamount(value);
                  }
                }}
                onBlur={(e) => {
                  bluramountCalculation();
                }}
              />
            </label>
            <div className="eyeswap-open-inner-headercontent-section-refereceone">
              {maxamountstatus > 0 ? (
                <div className="eyeswap-open-inner-headercontent-section-refereceone-box">
                  <span>You have {maxamount}</span>
                  <span onClick={setmaxvalue}>MAX</span>
                </div>
              ) : null}
            </div>
          </div>
          {networkactiveone >= 0 && networkactivetwo >= 0 ? (
            <div className="eyeswap-open-inner-headercontent-sidearrow">
              <button onClick={handleSwappingnetwork}>
                <Transfer />
              </button>
            </div>
          ) : (
            <div className="eyeswap-open-inner-headercontent-sidearrow">
              <Transfer />
            </div>
          )}
          <div className="eyeswap-open-inner-headercontent-section left">
            <label className="eyeswap-open-inner-headercontent-section-block">
              <div
                className="eyeswap-open-inner-headercontent-section-block-button"
                onClick={() => {
                  switchTokenDropdown('second');
                }}
              >
                {networkactivetwo > -1 ? (
                  <>
                    <LazyLoadImage
                      src={tokenitemtwo.image}
                      effect="opacity"
                      onError={(event) => {
                        event.target.src = '/img/token/lazyload.png';
                        event.onerror = null;
                      }}
                    />
                    {/* <img src={tokenitemtwo.image} alt="token" /> */}
                    <span>{tokenitemtwo.symbol}</span>
                  </>
                ) : (
                  <span>Select Token</span>
                )}

                <Angle side={toggletwo ? 'up' : 'down'} />
              </div>
              <input
                type="text"
                readOnly
                placeholder="0.0"
                value={outputmoneyAmount}
              />
            </label>
            {coinexchange ? (
              <div className="eyeswap-open-inner-headercontent-section-refereceone">
                <div className="eyeswap-open-inner-headercontent-section-refereceone-box">
                  <span>
                    {fromcoinamount} {fromcoin} = {tocoinamount} {tocoin}
                  </span>
                  <div onClick={handlepriceexchange}>
                    <Transfer />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {tradedatadivstatus ? (
          <div className="eyeswap-open-inner-chain">
            {chainstatus == 0 ? (
              <>
                <div className="eyeswap-open-inner-chain-inner">
                  <div
                    className={
                      showLessMore
                        ? 'eyeswap-open-inner-chain-inner-body open'
                        : 'eyeswap-open-inner-chain-inner-body'
                    }
                  >
                    {tradedata.map((item, i) => (
                      <div
                        className={
                          i === tradedatadivclassstatus
                            ? 'eyeswap-open-inner-chain-inner-body-one selected'
                            : 'eyeswap-open-inner-chain-inner-body-one'
                        }
                        key={i}
                      >
                        <div
                          onClick={() => {
                            selecttradedata(i);
                          }}
                        >
                          <div className="eyeswap-open-inner-chain-inner-body-one-left">
                            {item.amount}
                          </div>
                          {item.gasfee ? (
                            <div className="eyeswap-open-inner-chain-inner-body-one-right">
                              Est. gas fee ≈ ${item.gasfee}{' '}
                              <div
                                className="mediaeyeinfo"
                                data-html={true}
                                data-class="mediaeyetooltip"
                                data-tip="Estimated gas fee amount. It will be required to provide more gas in MetaMask to complete the trade, the extra gas will be returned after the transaction is completed."
                              >
                                <InfoCircle type={'outline'} />
                              </div>
                            </div>
                          ) : null}
                          <div className="eyeswap-open-inner-chain-inner-nameTag firstTag">
                            Via {item.name}
                          </div>
                          <div className="eyeswap-open-inner-chain-inner-body-one-star firstShow btn-info">
                            <Star type={'outline'} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {tradedata.length > 3 ? (
                  <div
                    className={
                      showLessMore
                        ? 'eyeswap-open-inner-chain-inner-showLess open'
                        : 'eyeswap-open-inner-chain-inner-showLess'
                    }
                    onClick={handleShowHideTrade}
                  >
                    {showLessMore ? (
                      <span>Show less providers</span>
                    ) : (
                      <span>Show more providers</span>
                    )}

                    <Angle side={'down'} />
                  </div>
                ) : null}
              </>
            ) : (
              <div className="eyeswap-open-inner-chain-outer">
                <div className="eyeswap-open-inner-chain-outer-sidebox">
                  <div className="eyeswap-open-inner-chain-outer-sidebox-imgbox">
                    <LazyLoadImage
                      src={tokenitemone.image}
                      effect="opacity"
                      onError={(event) => {
                        event.target.src = '/img/token/lazyload.png';
                        event.onerror = null;
                      }}
                    />
                  </div>
                  <span>{tokenitemone.symbol}</span>
                </div>
                <div className="eyeswap-open-inner-chain-outer-centerbox">
                  <div className="eyeswap-open-inner-chain-outer-centerbox-imgbox">
                    <img src={rubic} alt="rubic" />
                  </div>
                  <span>Rubic</span>
                </div>
                <div className="eyeswap-open-inner-chain-outer-sidebox">
                  <div className="eyeswap-open-inner-chain-outer-sidebox-imgbox">
                    <LazyLoadImage
                      src={tokenitemtwo.image}
                      effect="opacity"
                      onError={(event) => {
                        event.target.src = '/img/token/lazyload.png';
                        event.onerror = null;
                      }}
                    />
                    {/* <img src={tokenitemtwo.image} alt="token" /> */}
                  </div>
                  <span>{tokenitemtwo.symbol}</span>
                </div>
              </div>
            )}
          </div>
        ) : null}
        <div className="eyeswap-open-inner-swapbutton">
          {swapbtnstatus == 0 ? (
            <button className="btn btn-gaming btn-disable">
              <span>Swap</span>
            </button>

          ) : swapbtnstatus == 1 ? (

            <button className="btn btn-gaming" onClick={() => { handleSwap(); }}>
              <span>Switch to {networkitemone.name} network</span>
            </button>
          ) : swapbtnstatus == 2 ? (
            <button
              className="btn btn-gaming"
              onClick={() => {
                handleSwap();
                timerfunset();
              }}
            >
              <span>Swap</span>
            </button>

          ) : swapbtnstatus == 3 ? (
            <button className="btn btn-gaming" onClick={() => { handleSwap(); }}>
              <span>Continue</span>
            </button>
          ) : null}
        </div>
      </div>
      {tradedatadivstatus ? (
        <div className="eyeswap-open-bottom">
          <div
            className={
              transactionDropdown
                ? 'eyeswap-open-bottom-content open'
                : 'eyeswap-open-bottom-content '
            }
          >
            <div
              className={
                transactionDropdown
                  ? 'eyeswap-open-bottom-content-header'
                  : 'eyeswap-open-bottom-content-header open'
              }
              onClick={toggleTransactionDetails}
            >
              <span>Transaction details </span>
              <Angle side={'up'} />
            </div>
            <div className="eyeswap-open-bottom-content-body-wrapper">
              <div
                className={
                  transactionDropdown
                    ? 'eyeswap-open-bottom-content-body open'
                    : 'eyeswap-open-bottom-content-body'
                }
              >
                {networkitemone.name === networkitemtwo.name ? (
                  <>
                    <div className="eyeswap-open-bottom-content-section">
                      {transactiondetail?.minval ? (
                        <div className="eyeswap-open-bottom-content-section-row m-b-5">
                          <div className="eyeswap-open-bottom-content-section-row-left">
                            <span>Minimum received</span>
                            <div
                              className="mediaeyeinfo"
                              data-html={true}
                              data-class="mediaeyetooltip"
                              data-tip="Estimated gas fee amount. It will be required to provide more gas in MetaMask to complete the trade, the extra gas will be returned after the transaction is completed."
                            >
                              <InfoQuestion />
                            </div>
                          </div>

                          <span>
                            {transactiondetail?.minval} {tokenitemtwo.symbol}
                          </span>
                        </div>
                      ) : null}
                      {/* <div className="eyeswap-open-bottom-content-section-row m-b-5">
                        <div className="eyeswap-open-bottom-content-section-row-left">
                          <span>Minimum received</span>
                          <div
                            className="mediaeyeinfo"
                            data-html={true}
                            data-class="mediaeyetooltip"
                            data-tip="Estimated gas fee amount. It will be required to provide more gas in MetaMask to complete the trade, the extra gas will be returned after the transaction is completed."
                          >
                            <InfoQuestion />
                          </div>
                        </div>

                        <span>{transactiondetail?.minval} ETH</span>
                      </div> */}
                      <div className="eyeswap-open-bottom-content-section-row m-b-5">
                        <div className="eyeswap-open-bottom-content-section-row-left">
                          <span>Price impact</span>
                          <div
                            className="mediaeyeinfo"
                            data-html={true}
                            data-class="mediaeyetooltip"
                            data-tip="Estimated gas fee amount. It will be required to provide more gas in MetaMask to complete the trade, the extra gas will be returned after the transaction is completed."
                          >
                            <InfoQuestion />
                          </div>
                        </div>
                        <span>{transactiondetail?.priceImpact} %</span>
                      </div>
                    </div>
                    <div className="eyeswap-open-bottom-content-section">
                      <div className="eyeswap-open-bottom-content-section-row m-b-5">
                        <div className="eyeswap-open-bottom-content-section-row-left">
                          <span>Slippage</span>
                          <div
                            className="mediaeyeinfo"
                            data-html={true}
                            data-class="mediaeyetooltip"
                            data-tip="Correlation between an incoming order and the change in the price of the asset involved caused by the trade. Cross-chain consists of two transactions and each has its' own price impact."
                          >
                            <InfoQuestion />
                          </div>
                        </div>
                        <span>{transactiondetail?.slippageTolerance} %</span>
                      </div>
                      <div className="eyeswap-open-bottom-content-section-row m-b-5">
                        <div className="eyeswap-open-bottom-content-section-row-left">
                          <span>Rate</span>
                          <div
                            className="mediaeyeinfo"
                            data-html={true}
                            data-class="mediaeyetooltip"
                            data-tip="Correlation between an incoming order and the change in the price of the asset involved caused by the trade. Cross-chain consists of two transactions and each has its' own price impact."
                          >
                            <InfoQuestion />
                          </div>
                        </div>
                        <span>
                          {fromcoinamount} {fromcoin} = {tocoinamount} {tocoin}
                        </span>
                      </div>
                      <div className="eyeswap-open-bottom-content-section-row">
                        <div className="eyeswap-open-bottom-content-section-row-left">
                          <span>Route</span>
                          <div
                            className="mediaeyeinfo"
                            data-html={true}
                            data-class="mediaeyetooltip"
                            data-tip="Output is estimated. You will receive at least 81,246.43276 WFTM or the transaction will revert."
                          >
                            <InfoQuestion />
                          </div>
                        </div>
                        <span>
                          {tokenitemone.symbol} to {tokenitemtwo.symbol}{' '}
                        </span>
                      </div>
                    </div>
                    <div className="eyeswap-open-bottom-content-foot">
                      <div className="eyeswap-open-bottom-content-foot-left m-b-5">
                        <span>
                          You will receive {tokenitemtwo.symbol} tokens at this
                          address
                        </span>
                      </div>
                      <div className="eyeswap-open-bottom-content-foot-right">
                        <span>
                          {accountid.slice(0, 4)}...
                          {accountid.slice(-4)}
                        </span>
                        <button onClick={openAccount}>
                          <Business />
                        </button>
                        <div className="mediaeye-copy-box">
                          <button
                            className="mediaeye-copy-btn"
                            onClick={copyLink}
                          >
                            <Copy type={'white'} />
                          </button>
                          <div className="mediaeye-copy-box-msg">
                            {copyWalletCreators ? 'Copied!' : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="eyeswap-open-bottom-content-section-row">
                      <div className="eyeswap-open-bottom-content-section-row-left">
                        <span>Network fee</span>
                        <div
                          className="mediaeyeinfo"
                          data-html={true}
                          data-class="mediaeyetooltip"
                          data-tip="Estimated gas fee amount. It will be required to provide more gas in MetaMask to complete the trade, the extra gas will be returned after the transaction is completed."
                        >
                          <InfoQuestion />
                        </div>
                      </div>
                      <span>{transactiondetail?.networkFee}</span>
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
                      </div>
                      <span>
                        {transactiondetail?.pfee}{' '}
                        {transactiondetail?.pfeesymbol} ≈{' '}
                        {transactiondetail?.outputpfee}
                      </span>
                    </div>
                    <div className="eyeswap-open-bottom-content-section-row">
                      <div className="eyeswap-open-bottom-content-section-row-left">
                        <span>Price impact</span>
                        <div
                          className="mediaeyeinfo"
                          data-html={true}
                          data-class="mediaeyetooltip"
                          data-tip="Platform's commission charges in USDC token."
                        >
                          <InfoQuestion />
                        </div>
                      </div>
                      <span>{transactiondetail?.priceImpact}</span>
                    </div>
                    <div className="eyeswap-open-bottom-content-section-row">
                      <div className="eyeswap-open-bottom-content-section-row-left">
                        <span>Route</span>
                        <div
                          className="mediaeyeinfo"
                          data-html={true}
                          data-class="mediaeyetooltip"
                          data-tip="Output is estimated. You will receive at least 81,246.43276 WFTM or the transaction will revert."
                        >
                          <InfoQuestion />
                        </div>
                      </div>
                      <span>
                        {tokenitemone.symbol} to {tokenitemtwo.symbol}{' '}
                      </span>
                    </div>
                    <div className="eyeswap-open-bottom-content-foot">
                      <div className="eyeswap-open-bottom-content-foot-left m-b-5">
                        <span>
                          You will receive {tokenitemtwo.symbol} tokens at this
                          address
                        </span>
                      </div>
                      <div className="eyeswap-open-bottom-content-foot-right">
                        <span>
                          {accountid.slice(0, 4)}...
                          {accountid.slice(-4)}
                        </span>
                        <button onClick={openAccount}>
                          <Business />
                        </button>
                        <div className="mediaeye-copy-box">
                          <button
                            className="mediaeye-copy-btn"
                            onClick={copyLink}
                          >
                            <Copy type={'white'} />
                          </button>
                          <div className="mediaeye-copy-box-msg">
                            {copyWalletCreators ? 'Copied!' : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default EyeSwapPro;
