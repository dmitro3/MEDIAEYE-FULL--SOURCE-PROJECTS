import './EyeSwapPopup.scss';
import { Star } from '../../Icons';
import { useMoralis } from 'react-moralis';
import { BLOCKCHAIN_NAME } from 'rubic-sdk';
import CloseIcon from '../../Icons/CloseIcon';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { geteyeswaptokens } from '../../../blockchain/functions/Eyeswap/eyeswap';
import {
  closeeyeSwapProPopup,
  toggleGeneralPopup
} from '../../../store/app/appSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const network = [
  {
    img: '/img/token/ETH.png',
    name: 'Ethereum',
    symbol: 'ETH',
    chainid: 1,
    chainHex: '0x1',
    apiname: 'ethereum',
    blockchain: BLOCKCHAIN_NAME.ETHEREUM,
    link: 'https://etherscan.io/address/',
    tlink: 'https://etherscan.io/tx/'
  },
  {
    img: '/img/token/binance-smart-chain.png',
    name: 'Binance smart chain',
    symbol: 'BNB',
    chainid: 56,
    chainHex: '0x38',
    apiname: 'binance-smart-chain',
    blockchain: BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
    link: 'https://bscscan.com/address/',
    tlink: 'https://bscscan.com/tx/',
  },
  {
    img: '/img/token/polygon.png',
    name: 'Polygon',
    symbol: 'MATIC',
    chainid: 137,
    chainHex: '0x89',
    apiname: 'polygon',
    blockchain: BLOCKCHAIN_NAME.POLYGON,
    link: 'https://polygonscan.com/address/',
    tlink: 'https://polygonscan.com/tx/'
  },
  {
    img: '/img/token/aurora.png',
    name: 'Aurora',
    symbol: 'Aurora',
    chainid: 1313161554,
    chainHex: '0x4E454152',
    apiname: 'aurora',
    blockchain: BLOCKCHAIN_NAME.AURORA,
    link: 'https://explorer.mainnet.aurora.dev/address/',
    tlink: 'https://explorer.mainnet.aurora.dev/tx/'
  },
  {
    img: '/img/token/avalanche.png',
    name: 'Avalanche',
    symbol: 'AVAX',
    chainid: 43114,
    chainHex: '0xA86A',
    apiname: 'avalanche',
    blockchain: BLOCKCHAIN_NAME.AVALANCHE,
    link: 'https://snowtrace.io/address/',
    tlink: 'https://snowtrace.io/tx/'
  },
  {
    img: '/img/token/FTM.png',
    name: 'Fantom',
    symbol: 'FTM',
    chainid: 250,
    chainHex: '0xFA',
    apiname: 'fantom',
    blockchain: BLOCKCHAIN_NAME.FANTOM,
    link: 'https://ftmscan.com/address/',
    tlink: 'https://ftmscan.com/tx/'
  },
  {
    img: '/img/token/moonriver.png',
    name: 'Moonriver',
    symbol: 'MOVR',
    chainid: 1285,
    chainHex: '0x505',
    apiname: "moonriver",
    blockchain: BLOCKCHAIN_NAME.MOONRIVER,
    link: 'https://moonriver.moonscan.io/address/',
    tlink: 'https://moonriver.moonscan.io/tx/'
  },
  {
    img: '/img/token/harmony.png',
    name: 'Harmony',
    symbol: 'ONE',
    chainid: 1666600000,
    chainHex: '0x63564C40',
    apiname: 'harmony',
    blockchain: BLOCKCHAIN_NAME.HARMONY,
    link: 'https://explorer.harmony.one/address/',
    tlink: 'https://explorer.harmony.one/tx/'
  },
  {
    img: '/img/token/arbitrum.png',
    name: 'Arbitrum',
    symbol: 'ETH',
    chainid: 42161,
    chainHex: '0xA4B1',
    apiname: 'arbitrum',
    blockchain: BLOCKCHAIN_NAME.ARBITRUM,
    link: 'https://arbiscan.io/address/',
    tlink: 'https://arbiscan.io/tx/'
  },
  {
    img: '/img/token/telos-evm.png',
    name: 'Telos',
    symbol: 'TLOS',
    chainid: 40,
    chainHex: '0x28',
    apiname: 'telos-evm',
    blockchain: BLOCKCHAIN_NAME.TELOS,
    link: 'https://www.teloscan.io/address/',
    tlink: 'https://www.teloscan.io/tx/'
  },
  {
    img: '/img/token/OPTIMISM.png',
    name: 'Optimism',
    symbol: 'OP',
    chainid: 10,
    chainHex: '0xA',
    apiname: 'optimistic-ethereum',
    blockchain: BLOCKCHAIN_NAME.OPTIMISM,
    link: 'https://optimistic.etherscan.io/address/',
    tlink: 'https://optimistic.etherscan.io/tx/'
  },
  {
    img: '/img/token/CRONOS.png',
    name: 'Cronos',
    symbol: 'CRO',
    chainid: 25,
    chainHex: '0x19',
    apiname: 'cronos',
    blockchain: BLOCKCHAIN_NAME.CRONOS,
    link: 'https://testnet.cronoscan.com/address/',
    tlink: 'https://testnet.cronoscan.com/tx/'
  },
  {
    img: '/img/token/OKEXCHAIN.png',
    name: 'OKEXChain',
    symbol: 'OKT',
    chainid: 66,
    chainHex: '0x42',
    apiname: 'okex-chain',
    blockchain: BLOCKCHAIN_NAME.OKE_X_CHAIN,
    link: 'https://www.oklink.com/en/okc/address/',
    tlink: 'https://www.oklink.com/en/okc/tx/'
  },
  {
    img: '/img/token/Gnosis.png',
    name: 'Gnosis',
    symbol: 'GNO',
    chainid: 100,
    chainHex: '0x64',
    apiname: 'xdai',
    blockchain: BLOCKCHAIN_NAME.GNOSIS,
    link: 'https://blockscout.com/xdai/mainnet/address/',
    tlink: 'https://blockscout.com/xdai/mainnet/tx/'
  },
  {
    img: '/img/token/Fuse.png',
    name: 'Fuse',
    symbol: 'FUSE',
    chainid: 122,
    chainHex: '0x7A',
    apiname: 'fuse',
    blockchain: BLOCKCHAIN_NAME.FUSE,
    link: 'https://explorer.fuse.io/address/',
    tlink: 'https://explorer.fuse.io/tx/'
  },
  {
    img: '/img/token/celo.png',
    name: 'Celo',
    symbol: 'CELO',
    chainid: 42220,
    chainHex: '0xA4EC',
    apiname: 'celo',
    blockchain: BLOCKCHAIN_NAME.CELO,
    link: 'https://explorer.celo.org/address/',
    tlink: 'https://explorer.celo.org/tx/',
  },
  {
    img: '/img/token/moonbeam.png',
    name: 'Moonbeam',
    symbol: 'GLMR',
    chainid: 1284,
    chainHex: '0x504',
    apiname: 'moonbeam',
    blockchain: BLOCKCHAIN_NAME.MOONBEAM,
    link: 'https://moonscan.io/address/',
    tlink: 'https://moonscan.io/tx/'
  }
];

const EyeSwapProPopup = () => {
  const dispatch = useDispatch();
  const { Moralis, user } = useMoralis();
  const [activeId, setactiveId] = useState();
  const [searchnetwork, setsearchnetwork] = useState();
  const [tokenlistarray, settokenlistarray] = useState([]);
  const [loadertokenstatus, setloadertokenstatus] = useState(0);
  const [searchtokenlistarray, setsearchtokenlistarray] = useState([]);

  const Type = useSelector((state) => state.app.type);
  const activeNetwork = useSelector((state) => state.app.active_Network);
  const activeToken = useSelector((state) => state.app.active_token);
  const showPopup = useSelector((state) => state.app.showeyeSwapProtoggle);

  const handleActiveTab = (i) => {
    setactiveId(i);
  };
  const handleSearch = (e) => {
    setsearchnetwork(e.target.value);
  };

  useEffect(() => {
    if (activeNetwork) {
      setactiveId(activeNetwork);
    } else {
      setactiveId(0);
    }
  }, [activeNetwork]);

  const tokenlistDropdownSecond = (i) => {
    let tokenitem;
    if (searchnetwork) {
      tokenitem = tokenlistarray[i];
    } else {
      tokenitem = searchtokenlistarray[i];
    }
    let networkitem = network[activeId];
    if (tokenitem.address != activeToken.address) {
      dispatch(
        closeeyeSwapProPopup({
          activeId: activeId,
          networkitem: networkitem,
          tokenitem: tokenitem,
          type: Type
        })
      );
    } else {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Cannot select same coin',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  useEffect(async () => {
    if (showPopup) {
      setloadertokenstatus(0);
      let tokenname = network[activeId]?.apiname;
      if (tokenname && !searchnetwork) {
        const payload = { chain: network[activeId]?.chainHex };
        const networksym = network[activeId]?.symbol;
        let balancesdata;
        let nativeBalance;
        console.log(payload, 'payload');
        try {
          balancesdata = await Moralis.Web3API.account.getTokenBalances(
            payload
          );
        } catch (e) {
          console.log(e, 'e');
        }
        try {
          nativeBalance = await Moralis.Web3API.account.getNativeBalance(
            payload
          );
        } catch (e) {
          console.log(e, 'e');
        }
        if (!balancesdata) {
          balancesdata = []
        }
        if (!nativeBalance) {
          nativeBalance = {}
        }
        let apires = await geteyeswaptokens(tokenname, balancesdata, nativeBalance, networksym);

        if (apires && apires.abbb.length > 0) {
          let arr = apires.abbb;
          setloadertokenstatus(1);
          settokenlistarray(arr);
          setsearchtokenlistarray(arr);
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Something Went Wrong',
              textButton: 'OK',
              size: 'sm'
            })
          );
        }
      }
      if (searchnetwork) {
        let da = [];
        let search = searchnetwork.toLowerCase();
        searchtokenlistarray.forEach((element) => {
          let name = element.name.toLowerCase();
          if (element.address === search) {
            let a = [element];
            setloadertokenstatus(1);
            settokenlistarray(a);
          }
          if (name.includes(search) === true) {
            da.push(element);
          }
        });

        if (da.length > 0) {
          setloadertokenstatus(1);
          settokenlistarray(da);
        }
      }
    }
  }, [searchnetwork, activeId, showPopup]);


  return (
    <React.Fragment>
      {showPopup ? (
        <div
          className={
            showPopup
              ? 'mediaeye-popup active mediaeye-popup-sm eyeswap-popup'
              : 'mediaeye-popup'
          }
          priority="medium"
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-product-page scrolled"
            onClick={() =>
              dispatch(
                closeeyeSwapProPopup({
                  activeId: 0,
                  networkitem: {},
                  tokenitem: {},
                  type: ''
                })
              )
            }
          >
            <div
              className="mediaeye-popup-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() =>
                    dispatch(
                      closeeyeSwapProPopup({
                        activeId: 0,
                        networkitem: {},
                        tokenitem: {},
                        type: ''
                      })
                    )
                  }
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
                          value={searchnetwork}
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
                              i === activeId
                                ? 'eyeswap-open-inner-headercontent-section-dropdown-inner-left-card active'
                                : 'eyeswap-open-inner-headercontent-section-dropdown-inner-left-card'
                            }
                            onClick={() => handleActiveTab(i)}
                          >
                            <img src={item.img} alt={item.name} />
                            <span>{item.name.replace(/-/g, ' ')}</span>
                          </div>
                        ))}
                      </div>
                      <div className="eyeswap-open-inner-headercontent-section-dropdown-inner-right">
                        {loadertokenstatus > 0 ? (
                          <div className="eyeswap-open-inner-headercontent-section-dropdown-inner-right-content">
                            {tokenlistarray.map((element, i) => (
                              <div
                                key={i}
                                className="eyeswap-open-inner-headercontent-section-dropdown-inner-right-content-text"
                                onClick={() => {
                                  tokenlistDropdownSecond(i);
                                }}
                              >

                                <div className="eyeswap-open-inner-headercontent-section-dropdown-inner-right-content-text-box">
                                  <LazyLoadImage
                                    src={element?.image}
                                    effect="opacity"
                                    onError={(event) => {
                                      event.target.src =
                                        '/img/token/lazyload.png';
                                      event.onerror = null;
                                    }}
                                  />
                                  {/* <img src={element?.image}
                                  onError={event => {
                                    event.target.src = "/img/token/lazyload.png"
                                    event.onerror = null
                                  }}></img> */}

                                  <div className="eyeswap-open-inner-headercontent-section-dropdown-inner-right-content-text-values">
                                    <span>{element?.name}</span>
                                    <span>{element?.symbol}</span>
                                  </div>
                                </div>
                                <div className="eyeswap-open-inner-headercontent-section-dropdown-inner-right-content-text-balance">
                                  {element?.balance}
                                  <span>
                                    <Star type={'outline'} />
                                  </span>
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
        </div >
      ) : null
      }
    </React.Fragment >

  );
};
export default EyeSwapProPopup;
