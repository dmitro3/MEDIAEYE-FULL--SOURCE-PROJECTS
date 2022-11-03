import React, { useContext, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Collapse } from 'react-collapse';
import Popup from 'reactjs-popup';
import { useMoralis, useChain } from 'react-moralis';
import ReactTooltip from 'react-tooltip';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { isAuth, isSubscriptionUpdated } from '../../../utils/auth';
import {
  updateTheme,
  changeNetwork,
  updateIsLogin,
  toggleGeneralPopup,
  toggleAboutBuyPopup,
  setActiveNetwork
} from '../../../store/app/appSlice';
import { Angle, Settings, EyeSwap } from '../../../components/Icons/';
import { UserContext } from '../../../context/UserContext';
import { TokenAddress } from '../../../blockchain/functions/Addresses';
import { ChangeChainRequest } from '../../../blockchain/functions/ChangeChain';
import Search from '../Search/HeaderSearch';
import './Header.scss';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import logo from '../../../assets/img/logo.png';
import formatAdddress from '../../../utils/formatAdddress';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import EyeSwapPopup from '../../Modals/EyeSwapPopup/EyeSwapPopup';
import { walletAuthenticationService } from '../../../services/api.service';
import EyeSwapPro from '../../Modals/EyeSwap-Open/EyeSwapPro';
import { setActiveLink } from 'react-scroll/modules/mixins/scroller';

const Header = (props) => {
  const { logout, user, Moralis, isInitialized } = useMoralis();
  const {
    toggleDropdash,
    showDropdash,
    showWalletCollapse,
    toggleWalletCollapse,
    showMenuDropDown,
    toggleMenuDropDown,
    closeAll
  } = props;
  const theme = useSelector((state) => state.app.darkTheme);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const user2 = useSelector((state) => state.app.user);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscription, setIsSubscription] = useState(isSubscriptionUpdated());
  const wrapperRef = useRef(null);
  const { userData } = useContext(UserContext);
  const [eyeBalance, setEyeBalance] = useState(0);
  const [nativeBalance, setNativeBalance] = useState(0);
  const [biddingBalance, setBiddingBalance] = useState(0);
  const [stableBalance, setStableBalance] = useState(0);
  const [eyeRewards, setEyeRewards] = useState(0);
  const [biddingRewards, setBiddingRewards] = useState(0);
  const [stableRewards, setStableRewards] = useState(0);
  const [userAllWalletToggle, setUserAllWalletToggle] = useState(false);
  const [userEyeswapToggle, setUserEyeswapToggle] = useState(false);
  const location = useLocation();
  const { chainId } = useChain();

  
  useEffect(() => {
    async function login() {
      await walletAuthenticationService.login(user.attributes.ethAddress);
    }
    if (activeNetwork && isInitialized && user) {
      getBalances();
      login();
    }
  }, [activeNetwork, isInitialized]);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  useEffect(() => {
    if (isSubscription) {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message:
            'Please allow for subscription to update from 10-15 minutes, currently all the blockchains are processing'
        })
      );
    }
  }, [isSubscription]);

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
    } else setBiddingBalance('0');

    if (stableBalance) {
      setStableBalance(
        roundString(
          Moralis.Units.FromWei(stableBalance.balance, stableBalance.decimals),
          4
        )
      );
    } else setStableBalance('0');

    const nativeBalance = await Moralis.Web3API.account.getNativeBalance(
      payload
    );
    if (nativeBalance) {
      setNativeBalance(
        roundString(Moralis.Units.FromWei(nativeBalance.balance), 4)
      );
    } else setNativeBalance('0');
  };

  useEffect(() => {
    if (!user) {
      dispatch(updateIsLogin(false));
    } else {
      dispatch(updateIsLogin(true));
    }
  }, [user]);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  function handleNetwork(network) {
    ChangeChainRequest(network, dispatch);
  }

  const displayMyWalletRows = () => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      return (
        <>
          <div className="user_header_menu_wallet_collapse_inner_header_mybalancerow">
            <div className="user_header_menu_wallet_collapse_inner_header_mybalancerow_imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_header_mybalancerow_name">
              {eyeBalance} eYe
            </div>
          </div>
        </>
      );
    } else if (activeNetwork === 'ETH') {
      return (
        <>
          <div className="user_header_menu_wallet_collapse_inner_header_mybalancerow">
            <div className="user_header_menu_wallet_collapse_inner_header_mybalancerow_imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_header_mybalancerow_name">
              {eyeBalance} eYe
            </div>
          </div>
        </>
      );
    } else if (activeNetwork === 'FTM') {
      return (
        <>
          <div className="user_header_menu_wallet_collapse_inner_header_mybalancerow">
            <div className="user_header_menu_wallet_collapse_inner_header_mybalancerow_imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_header_mybalancerow_name">
              {eyeBalance} eYe
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  };
  const displayAllWalletRows = (type) => {
    if (activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME) {
      return (
        <>
          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {eyeBalance} eYe
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <Link
                to="/profile/eyeswap"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
                }}
              >
                Buy
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

          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/BNB.png" alt="BNB Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {nativeBalance} BNB
              </div>
              {/* <div className='user_header_menu_wallet_collapse_inner_balances_row_balance'>{nativeBalance}BNB</div> */}
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <Link
                to="/profile/payment/methods"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
                }}
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/BUSD.png" alt="BUSD Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {stableBalance} BUSD
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <Link
                to="/profile/payment/methods"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
                }}
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/WBNB.png" alt="WBNB Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {biddingBalance} WBNB
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <Link
                to="/profile/payment/methods"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
                }}
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
          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {eyeBalance} eYe
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <button
                type="button"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  dispatch(toggleAboutBuyPopup());
                  toggleWalletCollapse();
                }}
              >
                Buy
              </button>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/ETH.png" alt="ETH Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {nativeBalance} ETH
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <Link
                to="/profile/payment/methods"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
                }}
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/USDT.png" alt="USDT Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {stableBalance} USDT
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <Link
                to="/profile/payment/methods"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
                }}
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/WETH.png" alt="WETH Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {biddingBalance} WETH
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <Link
                to="/profile/payment/methods"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
                }}
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
          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {eyeBalance} eYe
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <button
                type="button"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  dispatch(toggleAboutBuyPopup());
                  toggleWalletCollapse();
                }}
              >
                Buy
              </button>
            </div>
          </div>
          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/FTM.png" alt="FTM Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {nativeBalance} FTM
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <Link
                href="https://spooky.fi/#/swap"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
                }}
              >
                Buy
              </Link>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/USDC.png" alt="USDC Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {stableBalance} USDC
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <a
                href="https://spooky.fi/#/swap"
                target="_blank"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
                }}
              >
                Buy
              </a>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_balances_row">
            <div className="user_header_menu_wallet_collapse_inner_balances_row_imgwrapper">
              <img src="/img/token/34/WFTM.png" alt="WFTM Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_content">
              <div className="user_header_menu_wallet_collapse_inner_balances_row_name">
                {biddingBalance} WFTM
              </div>
            </div>
            <div className="user_header_menu_wallet_collapse_inner_balances_row_action">
              <a
                href="https://spooky.fi/#/swap"
                target="_blank"
                className="user_header_menu_wallet_collapse_inner_balances_row_action_btn"
                onClick={() => {
                  toggleWalletCollapse();
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
          <div className="user_header_menu_wallet_collapse_inner_rewards_row">
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_content">
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_name">
                {eyeRewards}
              </div>
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_balance">
                eYe
              </div>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_rewards_row">
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_imgwrapper">
              <img src="/img/token/34/BUSD.png" alt="BUSD Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_content">
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_name">
                {stableRewards}
              </div>
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_balance">
                BUSD
              </div>
            </div>
          </div>
          <div className="user_header_menu_wallet_collapse_inner_rewards_row">
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_imgwrapper">
              <img src="/img/token/34/WBNB.png" alt="WBNB Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_content">
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_name">
                {biddingRewards}
              </div>
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_balance">
                WBNB
              </div>
            </div>
          </div>
        </>
      );
    } else if (activeNetwork === 'ETH') {
      return (
        <>
          <div className="user_header_menu_wallet_collapse_inner_rewards_row">
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_content">
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_name">
                {eyeRewards}
              </div>
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_balance">
                eYe
              </div>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_rewards_row">
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_imgwrapper">
              <img src="/img/token/34/USDT.png" alt="USDT Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_content">
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_name">
                {stableRewards}
              </div>
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_balance">
                USDT
              </div>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_rewards_row">
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_imgwrapper">
              <img src="/img/token/34/WETH.png" alt="token" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_content">
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_name">
                {biddingRewards}
              </div>
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_balance">
                WETH
              </div>
            </div>
          </div>
        </>
      );
    } else if (activeNetwork === 'FTM') {
      return (
        <>
          <div className="user_header_menu_wallet_collapse_inner_rewards_row">
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_imgwrapper">
              <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_content">
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_name">
                {eyeRewards}
              </div>
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_balance">
                eYe
              </div>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_rewards_row">
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_imgwrapper">
              <img src="/img/token/34/USDC.png" alt="USDC Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_content">
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_name">
                {stableRewards}
              </div>
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_balance">
                USDC
              </div>
            </div>
          </div>

          <div className="user_header_menu_wallet_collapse_inner_rewards_row">
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_imgwrapper">
              <img src="/img/token/34/WFTM.png" alt="WFTM Token Logo" />
            </div>
            <div className="user_header_menu_wallet_collapse_inner_rewards_row_content">
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_name">
                {biddingRewards}
              </div>
              <div className="user_header_menu_wallet_collapse_inner_rewards_row_balance">
                WFTM
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <div />;
    }
  };

  if (location.pathname === '/metaverse-landing') {
    return '';
  }

  return (
    <React.Fragment>
      <header className="mediaeye-layout-header">
        <div className="mediaeye-layout-header-inner">
          <div
            className="mediaeye-layout-header-inner-content"
            ref={wrapperRef}
          >
            <Link className="mediaeye-layout-header-logo" to="/">
              <img src={logo} alt="Media Eye Logo" />
            </Link>
            <div className="mediaeye-layout-header-navigation">
              {/* <button
                className={
                  showDropdash
                    ? 'mediaeye-layout-header-navigation-btn active header-hover-effect-btn'
                    : 'mediaeye-layout-header-navigation-btn header-hover-effect-btn'
                }
                onClick={toggleDropdash}
              >
                <span>
                  META - GATE <DasboardDown />
                </span>
              </button> */}
              <button
                className={
                  showDropdash
                    ? 'mediaeye-layout-header-navigation-btn active header-hover-effect-btn'
                    : 'mediaeye-layout-header-navigation-btn header-hover-effect-btn'
                }
                onClick={() => {
                  history.push('/create');
                  closeAll();
                }}
              >
                <span>METAGATE</span>
              </button>
            </div>
            <div className="mediaeye-layout-header-leftmenu">
              <NavLink
                to="/nft-marketplace"
                className="mediaeye-layout-header-leftmenu-link"
                onClick={() => closeAll()}
                exact
              >
                Marketplace
              </NavLink>
              <NavLink
                to="/collections"
                className="mediaeye-layout-header-leftmenu-link"
                onClick={() => closeAll()}
                exact
              >
                Collections
              </NavLink>
              <a
                className={
                  showMenuDropDown === 'marketing'
                    ? 'mediaeye-layout-header-leftmenu-link has-dropdown open'
                    : 'mediaeye-layout-header-leftmenu-link has-dropdown'
                }
                onClick={() => {
                  toggleMenuDropDown('marketing');
                }}
                exact
              >
                Marketing
                <Angle className="downarrow" side="small_down" />
                <Collapse isOpened={showMenuDropDown === 'marketing'}>
                  {showMenuDropDown === 'marketing' ? (
                    <div className="mediaeye-layout-header-leftmenu-link-sub">
                      <NavLink
                        to="/campaigns"
                        className="mediaeye-layout-header-leftmenu-link-sub-item"
                      >
                        Campaigns
                      </NavLink>
                      <NavLink
                        to="/airdrops"
                        className="mediaeye-layout-header-leftmenu-link-sub-item"
                      >
                        Airdrops
                      </NavLink>
                      <NavLink
                        to="/spotlight"
                        className="mediaeye-layout-header-leftmenu-link-sub-item"
                      >
                        Spotlight
                      </NavLink>
                      <NavLink
                        to="/charity-place"
                        onClick={() => {
                          toggleMenuDropDown('marketing');
                        }}
                        className="mediaeye-layout-header-leftmenu-link-sub-item"
                      >
                        Charity Place
                      </NavLink>
                    </div>
                  ) : null}{' '}
                </Collapse>{' '}
              </a>
              <NavLink
                to="/cohort"
                className="mediaeye-layout-header-leftmenu-link"
                onClick={() => closeAll()}
                exact
              >
                Earn{' '}
              </NavLink>
              <NavLink
                to="/rewards-pool"
                className="mediaeye-layout-header-leftmenu-link"
                onClick={() => closeAll()}
                exact
              >
                <span>Rewards</span>
              </NavLink>
              <NavLink
                to="/about"
                className="mediaeye-layout-header-leftmenu-link"
                onClick={() => closeAll()}
                exact
              >
                About
              </NavLink>
            </div>
            {/* <div
              className={
                userData
                  ? 'mediaeye-layout-header-search'
                  : 'mediaeye-layout-header-search open'
              }
            >
              <Search />
            </div> */}

            <div className="mediaeye-layout-header-rightmenu">
              <div className="user_header_menu">
                <div className="network_switcher">
                  <div
                    className={
                      activeNetwork === 'ETH'
                        ? 'network_sircle ETH'
                        : activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
                          ? 'network_sircle  BSC center'
                          : 'network_sircle FTM right'
                    }
                  ></div>

                  <span
                    onClick={() => handleNetwork('ETH')}
                    className={activeNetwork === 'ETH' ? 'active ETH' : 'ETH'}
                  >
                    ETH
                  </span>
                  <span
                    className={
                      activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
                        ? 'active BSC'
                        : process.env.REACT_APP_BSC_CHAIN_NAME
                    }
                    onClick={() =>
                      handleNetwork(process.env.REACT_APP_BSC_CHAIN_NAME)
                    }
                  >
                    BSC
                  </span>
                  <span
                    className={activeNetwork === 'FTM' ? 'active FTM' : 'FTM'}
                    onClick={() => handleNetwork('FTM')}
                  >
                    FTM
                  </span>
                </div>
                {userData ? (
                  <React.Fragment>
                    {/* <div
                       onClick={toggleNotifications} 
                      className="header_selected_link"
                      data-class="mediaeyetooltip"
                      data-tip="Coming soon!"
                      data-position="bottom"
                    >
                      <Bell  />
                        {listNotifications.length > 0 ? (
                        <span>{listNotifications.length}</span>
                      ) : null} 
                      <div
                        className="notifications_header_popup_wrapper"
                        onMouseEnter={() => {
                          document.body.style.overflowY = 'hidden';
                        }}
                        onMouseLeave={() => {
                          document.body.style.overflowY = 'scroll';
                        }}
                      >
                        <Collapse isOpened={showNotifications}>
                          <div className="notifications_popup">
                            <div className="notifications_popup_header">
                              <h5>
                                <span>{listNotifications.length}</span> Pending
                                Notifications
                              </h5>
                              <button className="clear_btn">Clear All</button>
                              <button
                                className="view_all_btn"
                                onClick={() => history.push('/notifications')}
                              >
                                View All
                              </button>
                            </div>
                            <ul className="notifications_popup_list">
                              {listNotifications.map((item, index) => (
                                <li
                                  onClick={() =>
                                    dispatch(
                                      toggleNotificationPopup({
                                        listNotifications: listNotifications,
                                        initialSlideNotification: index
                                      })
                                    )
                                  }
                                >
                                  <div>
                                    {type(item.type)}
                                    <div className="new_icon"></div>
                                  </div>
                                  <div>
                                    <h6>{item.title}</h6>
                                    <span>5 days ago</span>
                                  </div>
                                  <button
                                    onClick={(event) => {
                                      event.stopPropagation();
                                    }}
                                  >
                                    <Close />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Collapse>
                      </div>
                    </div> */}
                    <div className="header_avatar">
                      <div
                        className="header_avatar_wrapper"
                        onClick={toggleWalletCollapse}
                      >
                        <img
                          style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                          src={
                            user?.attributes?.profileImage
                              ? user.attributes.profileImage._url
                              : '/img/user/mediaeye-user.png'
                          }
                          alt="User Profile"
                        />
                      </div>
                      <div
                        className={
                          showWalletCollapse
                            ? 'user_header_menu_wallet_collapse wallet_collapse  active mediaeyefancyScroll'
                            : 'user_header_menu_wallet_collapse wallet_collapse'
                        }
                      >
                        <Collapse isOpened={showWalletCollapse}>
                          {showWalletCollapse ? (
                            <div className="user_header_menu_wallet_collapse_inner">
                              <div className="user_header_menu_wallet_collapse_inner_header">
                                <div
                                  className="user_header_menu_wallet_collapse_inner_header_profierow"
                                  onClick={() => {
                                    history.push('/profile');
                                    toggleWalletCollapse();
                                  }}
                                >
                                  <div className="user_header_menu_wallet_collapse_inner_header_profierow_imgwrapper">
                                    <img
                                      style={{
                                        aspectRatio: '1/1',
                                        objectFit: 'cover'
                                      }}
                                      src={
                                        user?.attributes?.profileImage
                                          ? user.attributes.profileImage._url
                                          : '/img/user/mediaeye-user.png'
                                      }
                                      alt="User Profile"
                                    />
                                  </div>

                                  <div className="user_header_menu_wallet_collapse_inner_header_profierow_name">
                                    {user?.attributes?.defaultUsername
                                      ? formatAdddress(
                                        user.attributes.ethAddress
                                      )
                                      : user?.attributes?.username}{' '}
                                  </div>
                                  <div className="user_header_menu_wallet_collapse_inner_header_profierow_content">
                                    <div
                                      className="user_header_menu_wallet_collapse_inner_header_profierow_level"
                                      level={
                                        user?.attributes?.subscriptionLevel
                                      }
                                    >
                                      {user?.attributes?.subscriptionLevel > 0
                                        ? 'LVL ' +
                                        user?.attributes?.subscriptionLevel
                                        : 'Free'}
                                    </div>
                                    <div className="user_header_menu_wallet_collapse_inner_header_profierow_action">
                                      <Settings />
                                    </div>
                                  </div>
                                </div>
                                {displayMyWalletRows()}
                              </div>
                              <div className="user_header_menu_wallet_collapse_inner_links">
                                <Link
                                  className="user_header_menu_wallet_collapse_inner_links_row"
                                  to={`/account/${user?.attributes?.ethAddress}`}
                                  onClick={() => {
                                    toggleWalletCollapse();
                                  }}
                                >
                                  My Account
                                </Link>

                                <Link
                                  className="user_header_menu_wallet_collapse_inner_links_row"
                                  to={`/watchlist`}
                                  onClick={() => {
                                    toggleWalletCollapse();
                                  }}
                                >
                                  Watchlist
                                </Link>

                                <Link
                                  className="user_header_menu_wallet_collapse_inner_links_row"
                                  to="/profile/subscription"
                                  onClick={() => {
                                    toggleWalletCollapse();
                                  }}
                                >
                                  Subscription
                                </Link>
                                <Link
                                  className="user_header_menu_wallet_collapse_inner_links_row"
                                  to={`/account/${user?.attributes?.ethAddress}/Favorites`}
                                  onClick={() => {
                                    toggleWalletCollapse();
                                  }}
                                >
                                  Favorites
                                </Link>
                                <Link
                                  className="user_header_menu_wallet_collapse_inner_links_row"
                                  to={`/account/${user?.attributes?.ethAddress}/Collections`}
                                  onClick={() => {
                                    toggleWalletCollapse();
                                  }}
                                >
                                  My Collections
                                </Link>
                              </div>
                              <div className="user_header_menu_wallet_collapse_inner_eyeswap">
                                <div
                                  onClick={() =>
                                    setUserEyeswapToggle(!userEyeswapToggle)
                                  }
                                  className={
                                    userEyeswapToggle
                                      ? 'user_header_menu_wallet_collapse_inner_eyeswap_heading active'
                                      : 'user_header_menu_wallet_collapse_inner_eyeswap_heading'
                                  }
                                >
                                  <EyeSwap type={'green'} />
                                  eYeSwap
                                  <Angle side="down" />
                                </div>
                                {/* <Collapse isOpened={userEyeswapToggle}> */}
                                {userEyeswapToggle ? (
                                  <div className="eyeswap-withBox">
                                    {/* <EyeSwapPopup /> */}
                                    <EyeSwapPro />
                                  </div>
                                ) : null}
                                {/* </Collapse> */}
                              </div>
                              <div className="user_header_menu_wallet_collapse_inner_balances">
                                <div
                                  onClick={() =>
                                    setUserAllWalletToggle(!userAllWalletToggle)
                                  }
                                  className={
                                    userAllWalletToggle
                                      ? 'user_header_menu_wallet_collapse_inner_balances_heading active'
                                      : 'user_header_menu_wallet_collapse_inner_balances_heading'
                                  }
                                >
                                  All Balances <Angle side="down" />
                                </div>
                                <Collapse isOpened={userAllWalletToggle}>
                                  {displayAllWalletRows()}
                                </Collapse>
                              </div>

                              <div className="user_header_menu_wallet_collapse_inner_rewards">
                                <div className="user_header_menu_wallet_collapse_inner_rewards_heading">
                                  <span className="text-rewards">Reward</span>{' '}
                                  Distribution
                                </div>
                                {displayRewardsRows()}
                              </div>
                            </div>
                          ) : null}
                        </Collapse>
                      </div>
                    </div>
                    <Link
                      to="/profile/subscription"
                      className="header-subscription-level"
                      level={user?.attributes?.subscriptionLevel}
                    >
                      {user?.attributes?.subscriptionLevel > 0
                        ? 'LVL ' + user?.attributes?.subscriptionLevel
                        : 'Free'}
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button
                      type="button"
                      className="header-connect-btn header-hover-effect-btn"
                      onClick={() => history.push('/connect-wallet')}
                    >
                      <span>Connect</span>
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          <ReactTooltip className="mediaeyetooltip" />
        </div>
      </header>
      {/* <div className={isOpen ? 'open' : null}>
        <Menu
          onOpen={handleIsOpen}
          onClose={handleIsOpen}
          isOpen={isOpen}
          width={'100%'}
          outerContainerId={'MeDIAeYeNftPortal'}
        >
          <a className="menu-item" href="https://mediaeyenft.com/newsletter/">
            {' '}
            Newsletter
          </a>
          <a
            className="menu-item"
            href="https://docs.mediaeyenft.com/"
            target="_blank"
            rel="noreferrer"
          >
            Litepaper
          </a>
          <a
            className="menu-item"
            href="https://mediaeyenft.com/blog/about/what-is-the-media-eye-nft-portal/"
            target="_blank"
            rel="noreferrer"
          >
            About
          </a>
          <a href="/#team" onClick={closeMenu}>
            Team
          </a>
          <a className="menu-item" href="https://mediaeyenft.com/blog/">
            Blog
          </a>
          <a className="menu-item" href="mailto:mediaeye@mediaeyenft.com">
            Contact
          </a>
            <div className="menu-item">
              <div className="soc_header_mobile">
                <a
                  href="https://medium.com/@MeDIAeYeNFT"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MediumIcon />
                </a>
                <a
                  href="https://t.me/MEDIAEYENFTPortal"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TelegramIcon />
                </a>
                <a
                  href="https://twitter.com/MeDIAeYeNFT"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://www.instagram.com/mediaeyenfts/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          <div className="menu-item">
            <div>
              {!userData && (
                <>
                  <ButtonSM
                    spanStyle={{ fontSize: '12px' }}
                    text="Connect"
                    onClick={() => history.push('/connect-wallet')}
                  ></ButtonSM>

                  
                </>
              )}
            </div>
          </div>
        </Menu>
     
      </div> 
      <PilotDashboard show={showDropdash} toggleDashboard={toggleDropdash} />
      */}
      {/* {location.pathname !== '/terms-conditions' ? (
        <CookieConsent
          location="bottom"
          enableDeclineButton={false}
          cookieSecurity={true}
          cookieValue={true}
          contentClasses="mediaeye-layout-cookiesAccept-inner"
          containerClasses="mediaeye-layout-cookiesAccept"
          buttonWrapperClasses="mediaeye-layout-cookiesAccept-buttons"
          buttonText="ACCEPT"
          cookieName="mediaeyesiteacceptcookies"
          buttonClasses="btn btn-info"
          expires={150}
          flipButtons
          onAccept={() => {
            history.push('/');
          }}
        >
          <div className="mediaeye-layout-cookiesAccept-inner-imgBox">
            <img
              src={cookiesperson}
              className="mediaeye-layout-cookiesAccept-inner-imgBox-img"
              alt="CookiesImg"
            />
          </div>
          <div className="mediaeye-layout-cookiesAccept-inner-contentBox">
            <div className="mediaeye-layout-cookiesAccept-inner-contentBox-inner">
              <div className="mediaeye-layout-cookiesAccept-inner-contentBox-inner-heading">
                Our site uses cookies
              </div>
              <div className="mediaeye-layout-cookiesAccept-inner-contentBox-inner-text">
                By clicking on this button, you agree to our Privacy Policy.
                View{' '}
                <Link
                  target="_blank"
                  className="mediaeye-layout-cookiesAccept-inner-contentBox-inner-link"
                  to="/terms-conditions"
                >
                  Terms.
                </Link>
              </div>
            </div>
          </div>
        </CookieConsent>
      ) : null} */}
    </React.Fragment>
  );
};

export default withRouter(Header);
