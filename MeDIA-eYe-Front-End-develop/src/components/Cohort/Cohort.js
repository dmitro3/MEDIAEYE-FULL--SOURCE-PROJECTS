import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Cohort.scss';
import { useMoralis } from 'react-moralis';
import { useDispatch } from 'react-redux';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../store/app/appSlice';
import CohortLoading from '../Icons/CohortLoading';
import Popup from '../CohortPopup/Popup';
import { ethers } from 'ethers';
import {
  checkAllowance,
  requestTokenApproval
} from '../../blockchain/functions/ApproveToken';
import {
  ContractAddress,
  TokenAddress
} from '../../blockchain/functions/Addresses';
import {
  claimRewards,
  deposit,
  getAPR,
  getDeposited,
  getRemaining,
  getReward,
  getRewardSpeed,
  getTotalDeposited,
  getUserShare,
  withdraw,
  withdrawAll
} from '../../blockchain/functions/Cohort';
import { roundString } from '../../blockchain/functions/Utils/RoundString';
import { ChainHexString } from '../../blockchain/functions/ChangeChain/ChainHexStrings';
import { ChainScanerLink } from '../../blockchain/functions/ChangeChain/ChainNames';
require('dotenv').config();

const Cohort = (props) => {
  const dispatch = useDispatch();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [depositAmount, setDeposit] = useState(0);
  const [depositedAmount, setDepositedAmount] = useState(0);
  const [initApproval, setInitApproval] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [rewards, setRewards] = useState([0, 0, 0]);
  const [remaining, setRemaining] = useState([0, 0, 0]);
  const [rewardSpeeds, setRewardSpeeds] = useState([0, 0]);
  const [depositLoading, setDepositLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [status, setStatus] = useState(6);
  const [showPopup, setShowPopup] = useState(false);
  const [apy, setApy] = useState('');
  const [eyeBalance, setEyeBalance] = useState('0');
  const [userShare, setUserShare] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(null);

  const { user, Moralis } = useMoralis();

  const cohortContractAddress = ContractAddress(
    'COHORT',
    ChainHexString(activeNetwork)
  );

  const togglePopup = async (status) => {
    setStatus(status);
    setShowPopup(!showPopup);
  };

  const changeDeposit = (e) => {
    let value = e.target.value;
    if (value >= parseInt(eyeBalance)) {
      setDeposit(eyeBalance);
    } else {
      setDeposit(value);
    }
  };

  const changeWithdraw = (e) => {
    let value = e.target.value;
    if (value >= parseInt(depositedAmount)) {
      setWithdrawAmount(depositedAmount);
    } else {
      setWithdrawAmount(value);
    }
  };

  // check if an amount larger than 0 is already approved
  const checkZeroApproval = async () => {
    // use arbitrarily small amount of EYE
    let amount = 1;
    let isApproved = await checkAllowance(
      Moralis,
      'EYE',
      user.attributes.ethAddress,
      amount,
      ContractAddress('COHORT', ChainHexString(activeNetwork))
    );

    setInitApproval(isApproved);
  };

  const getEyeBalance = async () => {
    const chain =
      activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
        ? process.env.REACT_APP_BSC_CHAIN_ID
        : '0x1';
    const payload = { chain }; //TODO: change from rinkeby to mainnet, should use DEV/PROD environment variables
    const balances = await Moralis.Web3API.account.getTokenBalances(payload);
    const tokenAddress = TokenAddress('EYE', chain);
    const eyeBalance = await balances.find(
      (token) => token.token_address === tokenAddress.toLowerCase()
    );
    if (eyeBalance) {
      const bigBalance = ethers.BigNumber.from(eyeBalance.balance);
      setEyeBalance(ethers.utils.formatEther(bigBalance));
    } else {
      setEyeBalance('0');
    }
  };

  const handleDeposit = async () => {
    setDepositLoading(true);

    if (
      !isNaN(depositAmount) &&
      depositAmount > 0 &&
      depositAmount <= eyeBalance
    ) {
      const amountWei = Moralis.Units.ETH(depositAmount);
      let isApproved = await checkAllowance(
        Moralis,
        'EYE',
        user.attributes.ethAddress,
        amountWei,
        cohortContractAddress
      );

      dispatch(
        toggleGeneralPopup({
          status: 'loading',
          message: 'Processing...',
          size: 'xs',
          autoClose: 'false'
        })
      );
      if (!isApproved) {
        const approvalSuccess = await requestTokenApproval(
          Moralis,
          'EYE',
          cohortContractAddress
        );
        setDepositLoading(false);
        dispatch(closeGeneralPopup());
        if (approvalSuccess) {
          setInitApproval(true);
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Transaction Approved, you may now Deposit',
              message: 'For more details view:',
              size: 'sm',
              copyText: approvalSuccess?.transactionHash,
              copyTextLink:
                ChainScanerLink(activeNetwork) +
                '/tx/' +
                approvalSuccess?.transactionHash,
              textButton: 'OK',
              autoClose: 'false'
            })
          );
          if (showPopup) {
            togglePopup();
          }
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              title: 'Token Approve Failed',
              message: approvalSuccess?.data?.message
                ? approvalSuccess.data.message
                : approvalSuccess.message
                  ? approvalSuccess.message
                  : 'Something went wrong. Try again',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      } else {
        const res = await deposit(Moralis, amountWei);
        setDepositLoading(false);
        dispatch(closeGeneralPopup());
        if (res?.status) {
          setDeposit(0);
          refreshPage();
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Transaction Successful',
              message: 'For more details view:',
              size: 'sm',
              copyText: res?.transactionHash,
              copyTextLink: ChainScanerLink(activeNetwork) + '/tx/' + res?.transactionHash,
              textButton: 'OK',
              autoClose: 'false'
            })
          );
          if (showPopup) {
            togglePopup();
          }
        } else {
          if (showPopup) {
            togglePopup();
          }
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              title: 'Transition Failed',
              message: res?.data?.message
                ? res.data.message
                : 'Something went wrong. Try again',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
    }
  };

  const handleDepositPopup = async () => {
    if (depositAmount != 0 || depositAmount != '') {
      if (
        !isNaN(depositAmount) &&
        depositAmount > 0 &&
        depositAmount <= eyeBalance
      ) {
        togglePopup('deposit');
      } else {
        setDepositLoading(false);
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            title: 'Transaction was not successful',
            message: 'You must deposit at least 1 eYe token',
            textButton: 'OK'
          })
        );
      }
    }
  };

  const handleWithdraw = async () => {
    if (withdrawAmount != 0 || withdrawAmount != '') {
      if (
        !isNaN(Number(withdrawAmount)) &&
        Number(withdrawAmount) > 0 &&
        Number(withdrawAmount) <= depositedAmount
      ) {
        const amountWeiStr = ethers.utils.parseEther(withdrawAmount);
        let result = null;
        dispatch(
          toggleGeneralPopup({
            status: 'loading',
            message: 'Processing...',
            size: 'xs',
            autoClose: 'false'
          })
        );
        if (withdrawAmount === depositedAmount) {
          result = await withdrawAll(Moralis);
        } else {
          result = await withdraw(Moralis, amountWeiStr);
        }

        dispatch(closeGeneralPopup());
        if (result?.transactionHash) {
          setWithdrawAmount(0);
          refreshPage();
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Transaction Successful',
              message: 'For more details view:',
              size: 'sm',
              copyText: result?.transactionHash,
              copyTextLink:
                ChainScanerLink(activeNetwork) + '/tx/' + result?.transactionHash,
              textButton: 'OK',
              autoClose: 'false'
            })
          );
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: result?.data?.message
                ? result.data.message
                : result.message
                  ? result.message
                  : 'Something went wrong. Try again',
              textButton: 'OK'
            })
          );
        }
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            title: 'Transaction was not successful',
            message: 'You cannot withdraw 0 tokens',
            textButton: 'OK'
          })
        );
        return;
      }
    }
  };

  const handleWithdrawMax = async () => {
    setWithdrawAmount(depositedAmount);
    dispatch(
      toggleGeneralPopup({
        status: 'max',
        message: 'You have chosen to Max Withdraw',
        submessage: 'Using this function will withdraw and claim all rewards.',
        textButton: 'OK'
      })
    );
  };

  const handleClaimRewards = async () => {
    setClaimLoading(true);
    let haveRewards = 3;
    for (let i = 0; i < 3; i++) {
      if (rewards[i] === 0) {
        haveRewards--;
      }
    }
    if (haveRewards === 0) {
      setClaimLoading(false);
      // dispatch(
      //   toggleGeneralPopup({
      //     status: 'error',
      //     message: "You don't have rewards",
      //     textButton: 'OK',
      //     size: 'sm'
      //   })
      // );
      return;
    }
    const result = await claimRewards(Moralis, togglePopup);
    setClaimLoading(false);
    if (result?.status) {
      refreshPage();
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: 'Your Transaction was successful',
          textButton: 'OK',
          size: 'sm'
        })
      );
    } else {
      if (result?.code === -32603 && result?.data?.code === -32000) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Metamask Insufficient Balance for Purchase',
            size: 'sm',
            textButton: 'OK'
          })
        );
      } else {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: result?.data?.message
              ? result.data.message
              : result.message
                ? result.message
                : 'Something went wrong. Try again',
            size: 'sm',
            textButton: 'OK'
          })
        );
      }
    }
  };

  const getDepositedAmount = async () => {
    try {
      const amount = await getDeposited(Moralis, user.attributes.ethAddress);
      const bigAmount = ethers.BigNumber.from(amount);
      const converted = ethers.utils.formatEther(bigAmount);
      setDepositedAmount(converted);
    } catch (e) {
      console.log(e);
    }
  };

  const getTotalSupply = async () => {
    try {
      const total = await getTotalDeposited(Moralis);
      const bigAmount = ethers.BigNumber.from(total);
      const converted = Number(ethers.utils.formatEther(bigAmount));
      setTotalDeposited(+converted.toFixed(4));
    } catch (e) {
      console.log(e);
    }
  };

  const getRewards = async () => {
    let getRewards = [];
    let hasRewards = 3;
    for (let i = 0; i < 3; i++) {
      const result = await getReward(Moralis, user.attributes.ethAddress, i);
      const converted = +Moralis.Units.FromWei(result);
      getRewards.push(converted);
      if (converted === 0) {
        hasRewards--;
      }
    }
    setRewards(getRewards);
    // if (hasRewards === 0) {
    //   dispatch(
    //     toggleGeneralPopup({
    //       status: 'error',
    //       message: "You don't have rewards",
    //       textButton: 'OK',
    //       size: 'sm'
    //     })
    //   );
    // }
  };

  const getRemainingRewards = async () => {
    let remainingRewardsList = [];
    for (let i = 0; i < 3; i++) {
      const result = await getRemaining(Moralis, i);
      const converted = +Moralis.Units.FromWei(result);
      remainingRewardsList.push(converted);
    }
    setRemaining(remainingRewardsList);
  };

  const getRewardSpeeds = async () => {
    let rewardSpeedList = [];
    for (let i = 1; i < 3; i++) {
      const result = await getRewardSpeed(Moralis, i);
      rewardSpeedList.push(result);
    }
    setRewardSpeeds(rewardSpeedList);
  };

  const getStakingShare = async () => {
    try {
      const result = await getUserShare(Moralis, user.attributes.ethAddress);
      setUserShare(result);
    } catch (e) {
      console.log(e);
    }
  };

  const refreshPage = async () => {
    getRemainingRewards();
    getRewardSpeeds();
    getRate();
    getTotalSupply();

    if (user) {
      getDepositedAmount();
      getStakingShare();
      getRewards();
      getEyeBalance();
    }
  };

  const [usdvalue, setUSDvalue] = useState('0');

  const initialUSDValue = async () => {
    const req = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=media-eye&vs_currencies=usd'
    );
    if (req.status == 200) {
      var responseData = req.data;
      const USDValue = responseData['media-eye'].usd;
      setUSDvalue(USDValue);
    }
  };

  useEffect(() => {
    initialUSDValue();
  }, []);

  useEffect(() => {
    if (activeNetwork === 'FTM') {
      dispatch(
        toggleGeneralPopup({
          status: 'info',
          message: 'Farming on FTM network coming in Q4 2022.',
          submessage:
            'Fees generated by the platform are accumulated to be distributed in the future to stakers on the cohort farm',
          textButton: 'ok',
          size: 'sm',
          autoClose: 'false'
        })
      );
      return;
    }

    if (activeNetwork && Moralis.provider) {
      if (user) {
        checkZeroApproval();
      } else {
        if (!user) {
          dispatch(
            toggleGeneralPopup({
              status: 'connect',
              message: 'Please connect your wallet',
              textButton: 'Connect',
              size: 'sm',
              autoClose: 'false'
            })
          );
        }
      }
      refreshPage();
    }
  }, [user, activeNetwork, Moralis.provider]);

  const getRate = async () => {
    const apr = await getAPR(Moralis);
    setApy(apr);
  };

  return (
    <>
      <Helmet>
        <meta property="og:url" content={window.location.origin + '/cohort'} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Community Centric Token Cohort Farm | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="MEDIA EYE token holders can farm up to 50% of the fees earned by the platform, everybody gets a chance to particpate, find out more.."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/earn.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/cohort" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/cohort'}
        />
        <meta
          name="twitter:title"
          content="Community Centric Token Cohort Farm | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="MEDIA EYE token holders can farm up to 50% of the fees earned by the platform, everybody gets a chance to particpate, find out more.."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/earn.png'}
        />
        <title>Community Centric Token Cohort Farm | MEDIA EYE </title>
        <meta
          name="description"
          content="MEDIA EYE token holders can farm up to 50% of the fees earned by the platform, everybody gets a chance to particpate, find out more.."
        />
      </Helmet>
      <Popup
        showPopup={showPopup}
        togglePopup={togglePopup}
        status={status}
        activeNetwork={activeNetwork}
        isApproved={initApproval}
        eyeAPR={apy}
        depositLoading={depositLoading}
        depositAmount={depositAmount}
        handleDeposit={handleDeposit}
        rewardSpeeds={rewardSpeeds}
      />

      <div className="cohort-page-inner">
        <div className="cohort-page-inner-banner m-b-20">
          <div className="mediaeye-layout-container">
            <div className="cohort-page-inner-banner-header">
              <h2 className="cohort-page-inner-banner-header-heading">
                COHORT FARM
              </h2>
            </div>
            <div className="cohort-page-inner-main-header">
              <div className="cohort-page-inner-main-header-bal m-b-10">
                Total eYe Staked
                <img src="img/token/EYE.png" alt="EYE" />
                <div className="cohort-page-inner-main-header-bal-box">
                  <div>{roundString(totalDeposited, 4)}</div>
                  <span className="text-semitransperant">eYe</span>
                </div>
              </div>
              <div className="cohort-page-inner-main-header-bal">
                Current Staking APR
                <span className="cohort-page-inner-main-header-bal-box">
                  120%
                </span>
              </div>

              {/* <div className='cohort-page-inner-main-header-balance'>
                    <span>{roundString(eyeBalance, 4)} eYe ($380)</span>
                  </div> */}
            </div>
          </div>
        </div>
        <div className="mediaeye-layout-container">
          <div className="cohort-page-inner-main">
            <div className="cohort-page-inner-main-part">
              <div className="cohort-page-inner-main-part-first">
                <div className="cohort-page-inner-main-part-first-top">
                  <div className="cohort-page-inner-main-part-first-top-left-div">
                    <span className="cohort-page-inner-main-part-first-top-left-div-media">
                      Your Share of eYe Staking Pool
                    </span>
                    <span>{userShare}%</span>
                  </div>
                  <div className="cohort-page-inner-main-part-first-top-left">
                    <span>Deposited </span>
                    <div className="cohort-page-inner-main-part-first-top-right m-t-10">
                      <div className="cohort-page-inner-main-part-first-top-left-prpl btn-gaming">
                        <span>
                          {Number(depositedAmount) > 0
                            ? roundString(depositedAmount, 4)
                            : 0}
                        </span>
                        <span>eYe</span>
                      </div>
                      <span>${roundString(depositedAmount * usdvalue, 2)}</span>
                    </div>
                  </div>
                </div>
                <div className="cohort-page-inner-main-part-first-bottom">
                  <div className="cohort-page-inner-main-part-first-bottom-wrapper">
                    <div className="cohort-page-inner-main-part-first-bottom-text">
                      Rate of rewards <span>per 1000 eYe</span>
                    </div>
                    <div className="cohort-page-inner-main-part-first-bottom-box">
                      <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                        {/* <label> */}
                        {activeNetwork === 'ETH' ? (
                          <img
                            className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                            src="img/token/34/USDT.png"
                            alt="USDT Token Type"
                          />
                        ) : activeNetwork ===
                          process.env.REACT_APP_BSC_CHAIN_NAME ? (
                          <img
                            className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                            src="img/token/34/BUSD.png"
                            alt="BUSD Token Type"
                          />
                        ) : activeNetwork === 'FTM' ? (
                          <img
                            className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                            src="img/token/34/USDC.png"
                            alt="USDC Token Type"
                          />
                        ) : null}
                        <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                          <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                            {rewardSpeeds[0]}
                          </div>
                          {activeNetwork === 'ETH' ? (
                            <span>USDT </span>
                          ) : activeNetwork ===
                            process.env.REACT_APP_BSC_CHAIN_NAME ? (
                            <span>BUSD </span>
                          ) : activeNetwork === 'FTM' ? (
                            <span>USDC </span>
                          ) : null}
                        </div>
                        {/* </label> */}
                      </div>
                      <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                        {/* <label> */}
                        {activeNetwork === 'ETH' ? (
                          <img
                            className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                            src="img/token/34/WETH.png"
                            alt="WETH Token Logo"
                          />
                        ) : activeNetwork ===
                          process.env.REACT_APP_BSC_CHAIN_NAME ? (
                          <img
                            className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                            src="img/token/34/BNB.png"
                            alt="WBNB Token Logo"
                          />
                        ) : activeNetwork === 'FTM' ? (
                          <img
                            className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                            src="img/token/34/WFTM.png"
                            alt="WFTM Token Logo"
                          />
                        ) : null}
                        <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                          <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                            {rewardSpeeds[1]}
                          </div>
                          {activeNetwork === 'ETH' ? (
                            <span>WETH </span>
                          ) : activeNetwork ===
                            process.env.REACT_APP_BSC_CHAIN_NAME ? (
                            <span>WBNB </span>
                          ) : activeNetwork === 'FTM' ? (
                            <span>WFTM </span>
                          ) : null}
                          {/* </label> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cohort-page-inner-main-part-first-bottom-wrapper">
                    <span className="cohort-page-inner-main-part-first-bottom-text">
                      Available for farming
                    </span>
                    <div className="cohort-page-inner-main-part-first-bottom-box">
                      {activeNetwork === 'ETH' ? (
                        <>
                          <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                            <img
                              className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                              src="img/token/EYE.png"
                              alt="EYE Token Type"
                            />
                            <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                              <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                                {remaining[0].toFixed(4) * 1}
                              </div>
                              <span>eYe</span>
                            </div>
                          </div>
                          <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                            <img
                              className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                              src="img/token/34/USDT.png"
                              alt="USDT Token Type"
                            />
                            <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                              <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                                {remaining[2].toFixed(4) * 1}
                              </div>
                              <span>USDT</span>
                            </div>
                          </div>
                          <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                            <img
                              className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                              src="img/token/34/WETH.png"
                              alt="WETH Token Logo"
                            />
                            <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                              <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                                {remaining[1].toFixed(4) * 1}
                              </div>
                              <span>WETH</span>
                            </div>
                          </div>
                        </>
                      ) : activeNetwork ===
                        process.env.REACT_APP_BSC_CHAIN_NAME ? (
                        <>
                          <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                            <img
                              className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                              src="img/token/EYE.png"
                              alt="EYE Token Type"
                            />
                            <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                              <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                                {remaining[0].toFixed(4) * 1}
                              </div>
                              <span>eYe</span>
                            </div>
                          </div>
                          <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                            <img
                              className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                              src="img/token/34/BUSD.png"
                              alt="BUSD Token Type"
                            />
                            <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                              <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                                {remaining[1].toFixed(4) * 1}
                              </div>
                              <span>BUSD</span>
                            </div>
                          </div>
                          <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                            <img
                              className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                              src="img/token/34/BNB.png"
                              alt="WBNB Token Type"
                            />
                            <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                              <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                                {remaining[2].toFixed(4) * 1}
                              </div>
                              <span>WBNB</span>
                            </div>
                          </div>
                        </>
                      ) : activeNetwork === 'FTM' ? (
                        <>
                          <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                            <img
                              className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                              src="img/token/EYE.png"
                              alt="EYE Token Type"
                            />
                            <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                              <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                                {remaining[0].toFixed(4) * 1}
                              </div>
                              <span>eYe</span>
                            </div>
                          </div>
                          <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                            <img
                              className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                              src="img/token/34/USDC.png"
                              alt="USDC Token Type"
                            />
                            <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                              <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                                {remaining[1].toFixed(4) * 1}
                              </div>
                              <span>USDC</span>
                            </div>
                          </div>
                          <div className="cohort-page-inner-main-part-first-bottom-box-wrapper">
                            <img
                              className="cohort-page-inner-main-part-first-bottom-box-wrapper-token"
                              src="img/token/34/WFTM.png"
                              alt="WFTM Token Type"
                            />
                            <div className="cohort-page-inner-main-part-first-bottom-box-row text-semitransperant">
                              <div className="cohort-page-inner-main-part-first-bottom-box-row-reward text-semitransperant">
                                {remaining[2].toFixed(4) * 1}
                              </div>
                              <span>WFTM</span>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="cohort-page-inner-main-part-middle">
                <div className="cohort-page-inner-main-part-middle-deposit">
                  <div className="">
                    {/* <div className="cohort-page-inner-main-part-middle-deposit-col-inner">
                      <div className="cohort-page-inner-main-part-middle-deposit-col-inner-text">
                        <span>eYe deposited </span>
                      </div>
                      <div className="cohort-page-inner-main-part-middle-deposit-col-inner-value">
                        <span>
                          {Number(depositedAmount) > 0
                            ? roundString(depositedAmount, 4)
                            : 0}{' '}
                        </span>
                        <span>eYe</span>
                      </div>
                    </div> */}
                    <div className="cohort-page-inner-main-part-middle-deposit-col-inner-head">
                      <span>Deposit</span>
                    </div>
                    <div className="cohort-page-inner-main-part-middle-deposit-col-inner-data">
                      <div className="cohort-page-inner-main-part-middle-deposit-col-inner-data-value">
                        <img src="img/token/EYE.png" alt="EYE Token Type" />

                        <div className="cohort-page-inner-main-part-middle-deposit-col-inner-data-value-box">
                          <label className="cohort-page-inner-main-part-middle-deposit-col-inner-data-value-amount">
                            <input
                              className=""
                              value={depositAmount}
                              onChange={changeDeposit}
                            />
                            <span>
                              <button onClick={() => setDeposit(eyeBalance)}>
                                eYe MAX
                              </button>
                            </span>
                            <div className="cohort-page-inner-main-part-middle-deposit-col-inner-data-value-box-available">
                              available: &nbsp; {roundString(eyeBalance, 4)}
                            </div>
                          </label>

                          <span>
                            <button
                              name="Stake Cohort"
                              className={`btn btn-square btn-${depositAmount === 0 || depositAmount === ''
                                ? 'transperant'
                                : 'gaming'
                                }`}
                              onClick={
                                !user
                                  ? () =>
                                    dispatch(
                                      toggleGeneralPopup({
                                        status: 'connect',
                                        message: 'Connect Wallet to View',
                                        textButton: 'Connect',
                                        size: 'sm',
                                        autoClose: 'false'
                                      })
                                    )
                                  : handleDepositPopup
                              }
                            >
                              {initApproval ? 'Stake' : 'Approve'}
                              {depositLoading ? <CohortLoading /> : null}
                            </button>
                          </span>
                        </div>
                      </div>
                      {/* <span className='cohort-page-inner-main-part-middle-deposit-col-inner-data-value-amount-available'>{roundString(eyeBalance, 4)} available </span> */}
                    </div>
                  </div>
                  {/* <button
                        className="farm-item__btn"
                        onClick={
                          !user
                            ? () =>
                                dispatch(
                                  toggleGeneralPopup({
                                    status: 'connect',
                                    message: 'Connect Wallet to View'
                                  })
                                )
                            : handleDepositPopup
                        }
                      >
                        {initApproval ? '' : 'Approve'} Approve eYe
                        {depositLoading ? <CohortLoading /> : null}
                      </button> */}
                </div>
                <div className="cohort-page-inner-main-part-middle-deposit">
                  <div className="cohort-page-inner-main-part-middle-deposit-col-inner-head">
                    <span>Amount to withdraw</span>
                  </div>
                  <div className="cohort-page-inner-main-part-middle-deposit-col-inner-data">
                    <div className="cohort-page-inner-main-part-middle-deposit-col-inner-data-value">
                      <img src="img/token/EYE.png" alt="EYE Token Type" />

                      <div className="cohort-page-inner-main-part-middle-deposit-col-inner-data-value-box">
                        <label className="cohort-page-inner-main-part-middle-deposit-col-inner-data-value-amount">
                          <input
                            className="cohort_value"
                            // value={withdrawAmount}
                            value={roundString(withdrawAmount, 4)}
                            onChange={changeWithdraw}
                          />
                          <span>
                            <button onClick={handleWithdrawMax}>eYe MAX</button>
                          </span>
                          <div className="cohort-page-inner-main-part-middle-deposit-col-inner-data-value-box-available">
                            available: &nbsp;{' '}
                            {Number(depositedAmount) > 0
                              ? roundString(depositedAmount, 4)
                              : 0}{' '}
                          </div>
                        </label>

                        <span>
                          <button
                            name="Withdraw Cohort"
                            className={`btn btn-square btn-${withdrawAmount === 0 || withdrawAmount === ''
                              ? 'transperant'
                              : 'gaming'
                              }`}
                            onClick={handleWithdraw}
                            text="Withdraw"
                          >
                            Withdraw
                          </button>
                        </span>
                      </div>
                    </div>
                    {/* <span className='cohort-page-inner-main-part-middle-deposit-col-inner-data-value-amount-available'>{roundString(depositedAmount, 4)} available </span> */}
                  </div>
                  {/* <button
                        className={
                          depositedAmount === null
                            ? 'farm-item__btn disabled'
                            : 'farm-item__btn '
                        }
                        onClick={handleWithdraw}
                      >
                        Withdraw
                        {withdrawLoading ? <CohortLoading /> : null}
                        {depositedAmount === null ? (
                          <span className="btn_error">
                            Your eYe token deposit equal 0
                          </span>
                        ) : null}
                      </button> */}
                </div>
              </div>
            </div>

            <section className="mediaeye-layout-section withspacebottom">
              <div className="cohort-page-inner-main-part-accumulated">
                {activeNetwork === 'ETH' ? (
                  <div className="cohort-page-inner-main-part-accumulated-content">
                    <div className="cohort-page-inner-main-part-accumulated-content-block">
                      <img
                        className="cohort-page-inner-main-part-accumulated-content-block-token"
                        src="img/token/EYE.png"
                        alt="EYE Token Type"
                      />

                      <div className="cohort-page-inner-main-part-accumulated-content-block-value text-semitransperant">
                        {' '}
                        {rewards[0].toFixed(4) * 1}
                        <span>eYe</span>
                      </div>
                    </div>
                    <div className="cohort-page-inner-main-part-accumulated-content-block">
                      <img
                        className="cohort-page-inner-main-part-accumulated-content-block-token"
                        src="img/token/34/USDT.png"
                        alt="USDT Token Type"
                      />

                      <div className="cohort-page-inner-main-part-accumulated-content-block-value text-semitransperant">
                        {' '}
                        {rewards[1].toFixed(4) * 1}
                        <span>USDT</span>
                      </div>
                    </div>
                    <div className="cohort-page-inner-main-part-accumulated-content-block">
                      <img
                        className="cohort-page-inner-main-part-accumulated-content-block-token"
                        src="img/token/34/WETH.png"
                        alt="WETH Token Logo"
                      />

                      <div className="cohort-page-inner-main-part-accumulated-content-block-value text-semitransperant">
                        {' '}
                        {rewards[2].toFixed(4) * 1}
                        <span>WETH</span>
                      </div>
                    </div>
                  </div>
                ) : activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME ? (
                  <div className="cohort-page-inner-main-part-accumulated-content">
                    <div className="cohort-page-inner-main-part-accumulated-content-block">
                      <img
                        className="cohort-page-inner-main-part-accumulated-content-block-token"
                        src="img/token/EYE.png"
                        alt="EYE Token Type"
                      />

                      <div className="cohort-page-inner-main-part-accumulated-content-block-value text-semitransperant">
                        {' '}
                        {rewards[0].toFixed(4) * 1}
                        <span>eYe</span>
                      </div>
                    </div>
                    <div className="cohort-page-inner-main-part-accumulated-content-block">
                      <img
                        className="cohort-page-inner-main-part-accumulated-content-block-token"
                        src="img/token/34/BUSD.png"
                        alt="BUSD Token Type"
                      />

                      <div className="cohort-page-inner-main-part-accumulated-content-block-value text-semitransperant">
                        {' '}
                        {rewards[1].toFixed(4) * 1}
                        <span>BUSD</span>
                      </div>
                    </div>
                    <div className="cohort-page-inner-main-part-accumulated-content-block">
                      <img
                        className="cohort-page-inner-main-part-accumulated-content-block-token"
                        src="img/token/34/BNB.png"
                        alt="BNB Token Type"
                      />

                      <div className="cohort-page-inner-main-part-accumulated-content-block-value text-semitransperant">
                        {' '}
                        {rewards[2].toFixed(4) * 1}
                        <span>WBNB</span>
                      </div>
                    </div>
                  </div>
                ) : activeNetwork === 'FTM' ? (
                  <div className="cohort-page-inner-main-part-accumulated-content">
                    <div className="cohort-page-inner-main-part-accumulated-content-block">
                      <img
                        className="cohort-page-inner-main-part-accumulated-content-block-token"
                        src="img/token/EYE.png"
                        alt="EYE Token Type"
                      />

                      <div className="cohort-page-inner-main-part-accumulated-content-block-value text-semitransperant">
                        {' '}
                        {rewards[0].toFixed(4) * 1}
                        <span>eYe</span>
                      </div>
                    </div>
                    <div className="cohort-page-inner-main-part-accumulated-content-block">
                      <img
                        className="cohort-page-inner-main-part-accumulated-content-block-token"
                        src="img/token/34/USDC.png"
                        alt="USDC Token Type"
                      />

                      <div className="cohort-page-inner-main-part-accumulated-content-block-value text-semitransperant">
                        {' '}
                        {rewards[1].toFixed(4) * 1}
                        <span>USDC</span>
                      </div>
                    </div>
                    <div className="cohort-page-inner-main-part-accumulated-content-block">
                      <img
                        className="cohort-page-inner-main-part-accumulated-content-block-token"
                        src="img/token/34/WFTM.png"
                        alt="WFTM Token Type"
                      />

                      <div className="cohort-page-inner-main-part-accumulated-content-block-value text-semitransperant">
                        {' '}
                        {rewards[2].toFixed(4) * 1}
                        <span>WFTM</span>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="cohort-page-inner-main-part-accumulated-content-btn">
                  <button
                    name="Claim Rewards Cohort"
                    className={`btn btn-square btn-${rewards[0] === 0 && rewards[1] === 0 && rewards[2] === 0
                      ? 'transperant'
                      : 'gaming'
                      }`}
                    // className="btn btn-gaming btn-square"
                    onClick={handleClaimRewards}
                  >
                    Claim Rewards {claimLoading ? <CohortLoading /> : null}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* <div className="cohort-page-inner-header">
          <span>
            50% OF ALL FEES GENERATED ON THE PLATFORM GO TO THE COHORT FARM AND
            USER REWARD POOL
          </span>
        </div> */}
      </div>
    </>
  );
};

export default Cohort;
