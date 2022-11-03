import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Angle, EyeSwap, Refresh } from '../../Icons';
import './LandingPage.scss';
import metaavatar from '../../../assets/img/spotlight/metaavatar.png';
import PopularTranding from '../../Hub/PopularTranding/PopularTranding';
import charityIcon from '../../../assets/img/care.png';
import imageLeft from '../../../assets/img/spotlight/img_left.png';
import imageRight from '../../../assets/img/spotlight/img_right.png';
import EyeSwapHome from '../../../components/EyeSwapHome/EyeSwapHome';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formatAdddress from '../../../utils/formatAdddress';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';
import MetaHubCards from './MetaHubCards';
import CreateCampaign from './CreateCampaign';
import Services from './Services';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';
import { TokenAddress } from '../../../blockchain/functions/Addresses';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import EyeSwapPro from '../../Modals/EyeSwap-Open/EyeSwapPro';
import EyeSwapPopup from '../../Modals/EyeSwapPopup/EyeSwapPopup';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { toggleProductRairtyScorePopup } from '../../../store/app/appSlice';
import ItemLoader from '../../Common/ItemLoader';
import {
  givingBlockOrganizationlist
} from '../../../blockchain/functions/Charity/charitycollection';

export default function LandingPage2(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [charityData, setcharityData] = useState([]);
  const [dataload, setdataload] = useState(0);
  const [key, setkey] = useState(0);
  const { user, Moralis, isInitialized } = useMoralis();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [eyeBalance, setEyeBalance] = useState(0);
  const [nativeBalance, setNativeBalance] = useState(0);
  const [biddingBalance, setBiddingBalance] = useState(0);
  const [stableBalance, setStableBalance] = useState(0);
  const [showEyePopup, setShowEyePopup] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  useEffect(() => {
    if (activeNetwork && isInitialized) {
      getBalances();
    }
  }, [activeNetwork, isInitialized]);

  const handleBalanceRefresh = () => {
    displayAllWalletRows();
    displayRewardsRows();
  };

  const getBalances = async () => {
    const payload = { chain: ChainHexString(activeNetwork) };
    const balances = await Moralis.Web3API.account.getTokenBalances(payload);
    const tokenAddress = TokenAddress('EYE', activeNetwork);
    let eyeBalance;
    if (activeNetwork !== 'FTM') {
      eyeBalance = balances.find(
        (token) => token.token_address === tokenAddress.toLowerCase()
      );
    }

    let biddingAddress;
    let stableAddress;
    if (activeNetwork === 'ETH') {
      biddingAddress = TokenAddress('WETH', activeNetwork);
      stableAddress = TokenAddress('USDT', activeNetwork);
    } else if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      biddingAddress = TokenAddress('WBNB', activeNetwork);
      stableAddress = TokenAddress('BUSD', activeNetwork);
    } else if (activeNetwork === 'FTM') {
      biddingAddress = TokenAddress('WFTM', activeNetwork);
      stableAddress = TokenAddress('USDC', activeNetwork);
    }
    const biddingBalance = balances.find(
      (token) => token.token_address === biddingAddress?.toLowerCase()
    );
    const stableBalance = balances.find(
      (token) => token.token_address === stableAddress?.toLowerCase()
    );
    if (eyeBalance) {
      setEyeBalance(Math.round(Moralis.Units.FromWei(eyeBalance.balance)));
    }
    if (biddingBalance) {
      const amount =
        biddingBalance.symbol === 'USDT'
          ? Moralis.Units.FromWei(biddingBalance.balance, 6)
          : Moralis.Units.FromWei(biddingBalance.balance);
      setBiddingBalance(roundString(amount, 4));
    }
    if (stableBalance) {
      setStableBalance(
        roundString(Moralis.Units.FromWei(stableBalance.balance), 4)
      );
    }
    const nativeBalance = await Moralis.Web3API.account.getNativeBalance(
      payload
    );
    if (nativeBalance) {
      setNativeBalance(
        roundString(Moralis.Units.FromWei(nativeBalance.balance), 4)
      );
    }
  };

  const displayAllWalletRows = (type) => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      return (
        <>
          <div className="landing-page-bottomdropdown-metabalance-row-title">
            <span className="landing-page-bottomdropdown-metabalance-row-title">
              MEDIA EYE Balance
            </span>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {eyeBalance} eYe
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <Link
                // to="/profile/eyeswap"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
                onClick={() => {
                  setShowDropdown(!showDropdown);
                }}
              >
                {showDropdown ? 'X' : 'Buy'}
              </Link>
              {/* <button
                type="button"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  dispatch(toggleAboutBuyPopup());
                  toggleWalletCollapse();
                }}
              >
                Buy
              </button> */}
            </div>
          </div>
          {showDropdown ? (
            <div className="landing-page-bottomdropdown-metabalance-row">
              <div className="eyeswap-withBox">
                {/* <EyeSwapPopup /> */}
                <EyeSwapPro />
              </div>
            </div>
          ) : null}

          <div className="landing-page-bottomdropdown-metabalance-row-title add">
            <span>All Balances</span>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/BNB.png" alt="BNB Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {nativeBalance} BNB
              </div>
              {/* <div className='user_header_menu_wallet_collapse_inner_balances_row_balance'>{nativeBalance}BNB</div> */}
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <Link
                to="/profile/payment/methods"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/BUSD.png" alt="BUSD Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {stableBalance} BUSD
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <Link
                to="/profile/payment/methods"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
              // onClick={() => {
              //   toggleWalletCollapse();
              // }}
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/WBNB.png" alt="WBNB Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {biddingBalance} WBNB
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <Link
                to="/profile/payment/methods"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
              // onClick={() => {
              //   toggleWalletCollapse();
              // }}
              >
                Buy
              </Link>
            </div>
          </div>
        </>
      );
    } else if (activeNetwork === 'ETH') {
      return (
        <>
          <div className="landing-page-bottomdropdown-metabalance-row-title">
            <span className="landing-page-bottomdropdown-metabalance-row-title">
              MEDIA EYE Balance
            </span>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {eyeBalance} eYe
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <button
                type="button"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
                onClick={() => setShowDropdown1(!showDropdown1)}
              >
                {showDropdown1 ? 'X' : 'Buy'}
              </button>
            </div>
          </div>
          {showDropdown1 ? (
            <div className="landing-page-bottomdropdown-metabalance-row">
              <div className="landing-page-bottomdropdown-metabalance-row-column">
                {/* <EyeSwapPopup /> */}
                <EyeSwapPro />
              </div>
            </div>
          ) : null}
          <div className="landing-page-bottomdropdown-metabalance-row-title add">
            <span>All Balances</span>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/ETH.png" alt="ETH Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {nativeBalance} ETH
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <Link
                to="/profile/payment/methods"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
              // onClick={() => {
              //   toggleWalletCollapse();
              // }}
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/USDT.png" alt="USDT Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {stableBalance} USDT
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <Link
                to="/profile/payment/methods"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
              // onClick={() => {
              //   toggleWalletCollapse();
              // }}
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/WETH.png" alt="WETH Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {biddingBalance} WETH
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <Link
                to="/profile/payment/methods"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
              // onClick={() => {
              //   toggleWalletCollapse();
              // }}
              >
                Buy
              </Link>
            </div>
          </div>
        </>
      );
    } else if (activeNetwork === 'FTM') {
      return (
        <>
          <div className="landing-page-bottomdropdown-metabalance-row-title">
            <span className="landing-page-bottomdropdown-metabalance-row-title">
              MEDIA EYE Balance
            </span>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {eyeBalance} eYe
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <button
                type="button"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
                onClick={() => setShowDropdown2(!showDropdown2)}
              >
                {showDropdown2 ? 'X' : 'Buy'}
              </button>
            </div>
          </div>
          {showDropdown2 ? (
            <div className="landing-page-bottomdropdown-metabalance-row">
              <div className="eyeswap-withBox">
                {/* <EyeSwapPopup /> */}
                <EyeSwapPro />
              </div>
            </div>
          ) : null}
          <div className="landing-page-bottomdropdown-metabalance-row-title add">
            <span>All Balances</span>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/FTM.png" alt="FTM Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {nativeBalance} FTM
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <Link
                to="/profile/payment/methods"
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
              // onClick={() => {
              //   toggleWalletCollapse();
              // }}
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/USDC.png" alt="USDC Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {stableBalance} USDC
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <a
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
                onClick={() => {
                  history.push('/profile/payment/methods');
                }}
              >
                Buy
              </a>
            </div>
          </div>

          <div className="landing-page-bottomdropdown-metabalance-row">
            <div className="landing-page-bottomdropdown-metabalance-row-imgwrapper">
              <img src="/img/token/34/WFTM.png" alt="WFTM Token Logo" />
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-content">
              <div className="landing-page-bottomdropdown-metabalance-row-name">
                {biddingBalance} WFTM
              </div>
            </div>
            <div className="landing-page-bottomdropdown-metabalance-row-action">
              <a
                className="landing-page-bottomdropdown-metabalance-row-action-btn"
                onClick={() => {
                  history.push('/profile/payment/methods');
                }}
              >
                Buy
              </a>
            </div>
          </div>
        </>
      );
    } else {
      return <div />;
    }
  };

  const displayRewardsRows = () => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      return (
        <>
          <div className="landing-page-bottomdropdown-metabalance-rewards">
            <div className="landing-page-bottomdropdown-metabalance-rewards-heading">
              <span>Rewards</span> Distribution
            </div>
            <div className="landing-page-bottomdropdown-metabalance-rewards-row">
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-imgwrapper">
                <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
              </div>
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-content">
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-name">
                  0
                </div>
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-balance">
                  eYe
                </div>
              </div>
            </div>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-rewards">
            <div className="landing-page-bottomdropdown-metabalance-rewards-row">
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-imgwrapper">
                <img src="/img/token/34/BUSD.png" alt="BUSD Token Logo" />
              </div>
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-content">
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-name">
                  0
                </div>
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-balance">
                  BUSD
                </div>
              </div>
            </div>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-rewards">
            <div className="landing-page-bottomdropdown-metabalance-rewards-row">
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-imgwrapper">
                <img src="/img/token/34/WBNB.png" alt="WBNB Token Logo" />
              </div>
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-content">
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-name">
                  0
                </div>
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-balance">
                  WBNB
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (activeNetwork === 'ETH') {
      return (
        <>
          <div className="landing-page-bottomdropdown-metabalance-rewards">
            <div className="landing-page-bottomdropdown-metabalance-rewards-heading">
              <span>Rewards</span> Distribution
            </div>
            <div className="landing-page-bottomdropdown-metabalance-rewards-row">
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-imgwrapper">
                <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
              </div>
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-content">
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-name">
                  {eyeBalance}
                </div>
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-balance">
                  eYe
                </div>
              </div>
            </div>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-rewards">
            <div className="landing-page-bottomdropdown-metabalance-rewards-row">
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-imgwrapper">
                <img src="/img/token/34/USDT.png" alt="USDT Token Logo" />
              </div>
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-content">
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-name">
                  {stableBalance}
                </div>
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-balance">
                  USDT
                </div>
              </div>
            </div>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-rewards">
            <div className="landing-page-bottomdropdown-metabalance-rewards-row">
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-imgwrapper">
                <img src="/img/token/34/WETH.png" alt="WETH Token Logo" />
              </div>
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-content">
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-name">
                  {stableBalance}
                </div>
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-balance">
                  WETH
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (activeNetwork === 'FTM') {
      return (
        <>
          <div className="landing-page-bottomdropdown-metabalance-rewards">
            <div className="landing-page-bottomdropdown-metabalance-rewards-heading">
              <span>Rewards</span> Distribution
            </div>
            <div className="landing-page-bottomdropdown-metabalance-rewards-row">
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-imgwrapper">
                <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
              </div>
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-content">
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-name">
                  {eyeBalance}
                </div>
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-balance">
                  eYe
                </div>
              </div>
            </div>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-rewards">
            <div className="landing-page-bottomdropdown-metabalance-rewards-row">
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-imgwrapper">
                <img src="/img/token/34/USDC.png" alt="USDC Token Logo" />
              </div>
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-content">
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-name">
                  {stableBalance}
                </div>
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-balance">
                  USDC
                </div>
              </div>
            </div>
          </div>
          <div className="landing-page-bottomdropdown-metabalance-rewards">
            <div className="landing-page-bottomdropdown-metabalance-rewards-row">
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-imgwrapper">
                <img src="/img/token/34/WFTM.png" alt="WFTM Token Logo" />
              </div>
              <div className="landing-page-bottomdropdown-metabalance-rewards-row-content">
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-name">
                  {nativeBalance}
                </div>
                <div className="landing-page-bottomdropdown-metabalance-rewards-row-balance">
                  WFTM
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <div />;
    }
  };

  const organizationlist = async () => {

    var pageNumber = 1;
    const givingBlockOrganizationres = await givingBlockOrganizationlist(pageNumber);
    if (givingBlockOrganizationres && givingBlockOrganizationres.length > 0) {
      let arar = givingBlockOrganizationres.slice(0, 20);
      console.log(arar, 'arar');
      setcharityData(arar);
      setdataload(1);
    } else {
      setdataload(2);
    }
  };

  const getpathname = (charity) => {
    if (charity?.type == "Giving Block") {
      let slug = charity?.name;
      let newslug = slug.replace(/\s+/g, '-');
      let oldslug = newslug.replaceAll('/', '-');
      slug = oldslug;
      let pathName = `/charity-place/${slug}/${charity?.orgId}`
      return pathName;
    } else {
      let slug = charity?.irdRegisterName;
      let newslug = slug.replace(/\s+/g, '-');
      let oldslug = newslug.replaceAll('/', '-');
      slug = oldslug;
      let pathName = `/charity-place/${slug}/${charity?._id}`
      return pathName;
    }
  };

  const getstate = (charity) => {
    if (charity?.type == "Giving Block") {
      let State = {};
      State.organizationId = charity?.orgId;
      State.organizationType = charity?.type;
      return State;
    } else {
      let State = {};
      State.organizationId = charity?._id;
      State.organizationType = charity?.type;
      return State;
    }
  };

  const networkimage = (charitynetworkDetails) => {
    if (charitynetworkDetails.name == 'Ethereum') {
      return (
        <img src='/img/token/ETH.png' />
      )
    } else if (charitynetworkDetails.name == 'Fantom') {
      return (
        <img src='/img/token/FTM.png' />
      )
    } else {
      return (
        <img src='/img/token/binance-smart-chain.png' />
      )
    }
  }

  useEffect(() => {
    if (key === 0) {
      setdataload(0);
      organizationlist();
      setkey(1);
    }
  });

  return (
    <div className="">
      <div className="landing-page mediaeye-layout-container">
        <div className="mediaeye-layout-container-header">
          <div className="landing-page-heading">
            <div className="mediaeye-layout-container-header-heading landing-page-heading-left">
              <img
                src={
                  user?.attributes?.profileImage
                    ? user.attributes.profileImage._url
                    : GetDefaultImages('USER')
                }
                alt="user"
              />
              <span>
                {user?.attributes?.defaultUsername
                  ? formatAdddress(user.attributes.ethAddress)
                  : user?.attributes?.username}
              </span>
            </div>
            <div className="landing-page-heading-right">
              <div className="landing-page-heading-right-subs">
                <span>Your Subscription</span>
                <button
                  className="subscription-level"
                  level={user?.attributes?.subscriptionLevel}
                  alt="info"
                >
                  {user?.attributes?.subscriptionLevel === 0
                    ? 'Free'
                    : user?.attributes?.subscriptionLevel === 1
                      ? 'LVL 1'
                      : 'LVL 2'}
                </button>
              </div>
              <button
                className="btn btn-square btn-transperant"
                onClick={() => history.push('profile/subscription')}
              >
                Subscription
              </button>
            </div>
          </div>
        </div>
        <Services />
        <div>
          <CreateCampaign />
        </div>
        <div className="landing-page-meta">
          <div className="landing-page-meta-metahub">
            <div className="text-right refresh" onClick={handleBalanceRefresh}>
              <Refresh />
            </div>
            <div className="landing-page-meta-metahub-title">METAHUB</div>
            <MetaHubCards />
            <div className="landing-page-meta-metahub-topusers">
              <PopularTranding title={'Top 50 Users'} />
            </div>
            <div
              className="landing-page-meta-metahub-bottom"
              onClick={() => history.push('/hub')}
            >
              <button className="btn btn-gaming">OPEN METAHUB</button>
            </div>
          </div>
          <div className="landing-page-meta-metaright">
            <div className="landing-page-meta-metaright-metaavatar">
              <div className="landing-page-meta-metaright-metaavatar-inner">
                <img src={metaavatar} alt="metaavatar" />
                <div className="landing-page-meta-metaright-metaavatar-inner-holder">
                  <span className="title">
                    YOUR
                    <br /> UNIVERSAL
                    <br /> AVATAR
                  </span>
                  <span className="text-gray m-t-20">Free Services</span>
                  <span className="text-gray m-t-5">
                    Pay as You Go Services
                  </span>
                  <span className="text-gray m-t-5">Avatar Generators</span>
                  <span className="text-gray m-t-5">Minting</span>
                  <span className="text-gray m-t-20">and more...</span>
                </div>
                <div className="m-t-20">
                  <button className="btn btn-campaign">Create</button>
                </div>
              </div>
            </div>
            <div className="landing-page-meta-metaright-charity">
              <div className="landing-page-meta-metaright-charity-inner">
                <div className="landing-page-meta-metaright-charity-inner-title">
                  CHARITIES
                </div>
                <div className="mediaeyefancyScroll">
                  <div className="landing-page-meta-metaright-charity-inner-content">
                    {dataload == 1 ? (
                      charityData.map((charity, i) => (
                        <Link
                          to={{
                            pathname: getpathname(charity),
                            state: getstate(charity)
                          }}
                        >
                          <div className="landing-page-meta-metaright-charity-inner-content-block" key={i}>
                            <div>
                              <LazyLoadImage
                                className="cryptoicon"
                                src={charity?.type == "Giving Block" ? charity?.logo : charity?.charityLogo.filePath}
                                effect="opacity"
                                onError={(event) => {
                                  event.target.src =
                                    '/img/token/lazyload.png';
                                  event.onerror = null;
                                }}
                              />
                              {/* <img src={charity?.type == "Giving Block" ? charity?.logo : charity?.charityLogo.filePath} /> */}
                              <span style={{ color: 'white' }}>
                                {charity?.type == "Giving Block" ? charity?.name : charity?.irdRegisterName}
                              </span>
                            </div>
                            <div className="icons">
                              {charity?.type == "Giving Block" ?
                                <>
                                  <img
                                    src="/img/token/34/ETH.png"
                                    alt="ETH Token Logo"
                                  />
                                  <img
                                    src="/img/token/BitCoinCash.png"
                                    alt="BitCoinCash Token Logo"
                                  />
                                </> :
                                charity.networkDetails.map((charitynetworkDetails, i) => (
                                  networkimage(charitynetworkDetails)
                                ))
                              }
                              <span className="text-gray">Donate</span>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : dataload == 0 ? (
                      <ItemLoader />
                    ) : (
                      <div>
                        <h1>No data available</h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-page-images">
          <div className="landing-page-images-show">
            <img src={imageLeft} alt="Spotlight" />
          </div>
          <div className="landing-page-images-show">
            <img src={imageRight} alt="Bearded-punks" />
          </div>
        </div>
        <div className="landing-page-bottomdropdown">
          <div
            className={
              showEyePopup
                ? 'landing-page-bottomdropdown-lefteye open'
                : 'landing-page-bottomdropdown-lefteye '
            }
          >
            <div
              className="landing-page-bottomdropdown-lefteye-top"
              onClick={() => setShowEyePopup(!showEyePopup)}
            >
              <div className="landing-page-bottomdropdown-lefteye-top-inner">
                <EyeSwap type={'green'} />
                <span>eYeSwap</span>
              </div>
              {showEyePopup ? <Angle side={'up'} /> : <Angle side={'down'} />}
            </div>
            <div className="landing-page-bottomdropdown-lefteye-bottom-wrapper">
              <div
                className={
                  showEyePopup
                    ? 'landing-page-bottomdropdown-lefteye-bottom open'
                    : 'landing-page-bottomdropdown-lefteye-bottom'
                }
              >
                <div className="eyeswap-withBox">
                  <EyeSwapPro />
                  {/* <EyeSwapPopup /> */}
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              showBalance
                ? 'landing-page-bottomdropdown-metabalance open'
                : 'landing-page-bottomdropdown-metabalance '
            }
          >
            <div
              className="landing-page-bottomdropdown-metabalance-header"
              onClick={() => setShowBalance(!showBalance)}
            >
              <span>MY METABALANCE</span>
              <div>
                {showBalance ? <Angle side={'up'} /> : <Angle side={'down'} />}
              </div>
            </div>
            <>
              <div className="landing-page-bottomdropdown-metabalance-bottom-wrapper">
                <div
                  className={
                    showBalance
                      ? 'landing-page-bottomdropdown-metabalance-bottom open'
                      : 'landing-page-bottomdropdown-metabalance-bottom '
                  }
                >
                  <div>
                    <div
                      className="text-right refresh"
                      onClick={handleBalanceRefresh}
                    >
                      <Refresh />
                    </div>
                    <div className="m-b-40">{displayAllWalletRows()}</div>
                    <div className="m-t-30">{displayRewardsRows()}</div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
