import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { PayAsYouGo, Upload } from '../../Icons';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';
import { TokenAddress } from '../../../blockchain/functions/Addresses';
import { roundString } from '../../../blockchain/functions/Utils/RoundString';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import ReactTooltip from 'react-tooltip';

export default function Services() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [eyeBalance, setEyeBalance] = useState(0);
  const { user, Moralis, isInitialized } = useMoralis();
  const [nativeBalance, setNativeBalance] = useState(0);
  const [biddingBalance, setBiddingBalance] = useState(0);
  const [stableBalance, setStableBalance] = useState(0);
  const [hideToolTip, setHideToolTip] = useState(false);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  useEffect(() => {
    if (activeNetwork && isInitialized) {
      getBalances();
    }
  }, [activeNetwork, isInitialized]);

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

  const handleLimitation = (type) => {
    if (type == 'Group Collection') {
      dispatch(
        toggleGeneralPopup({
          status: 'info',
          message:
            'Subscription Level 2 is required to enable Group Collection',
          textButton: 'OK',
          size: 'sm'
        })
      );
    } else if (type == 'JUMBO MINT') {
      dispatch(
        toggleGeneralPopup({
          status: 'info',
          message: 'Subscription Level 2 is required to enable Jumbo Mint',
          textButton: 'OK',
          size: 'sm'
        })
      );
    } else {
      dispatch(
        toggleGeneralPopup({
          status: 'info',
          message:
            'Subscription Level 1 or Level 2 is required to enable creation and minting NFTs to your collection',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }

    history.push('/create');
  };
  return (
    <div className="landing-page-services">
      <div className="landing-page-services-block left">
        <div className="landing-page-services-block-header">
          <span>MINTING SERVICES</span>
          <button className="btn btn-sm btn-gaming">Tutorial</button>
        </div>
        <div className="landing-page-services-block-content">
          <Link
            className="landing-page-services-block-content-card subscription-level"
            data-html={true}
            data-class="mediaeyetooltip createpage"
            data-tip="NFT minting services support the following types of digital content files: JPEG / PNG / SVG / MP4 / GLB / GLTF / OBJ"
            to="/create/mint"
            data-delay-show="1000"
            data-delay-hide="0"
          >
            <span>MINT NFT</span>
            <div className="landing-page-services-block-content-card-rgt">
              <Upload />
              {user?.attributes?.subscriptionLevel === 0 ? (
                <span>50 MB</span>
              ) : user?.attributes?.subscriptionLevel === 1 ? (
                <span>100 MB</span>
              ) : (
                <span>250 MB</span>
              )}
            </div>
          </Link>
          <Link
            className="landing-page-services-block-content-card subscription-level"
            data-html={true}
            data-class="mediaeyetooltip createpage"
            data-tip="Generative Collections Generator offers users the ability to easily create NFTs with unique properties, traits, and levels allowing for a variety of rarities in a single collection."
            to="/create/generative/collection"
            data-delay-show="1000"
            data-delay-hide="0"
          >
            <span>GENERATIVE COLLECTION</span>
            <PayAsYouGo />
          </Link>
          <Link
            to={
              user?.attributes?.subscriptionLevel > 0
                ? '/create/collection'
                : null
            }
            className="landing-page-services-block-content-card subscription-level"
            data-html={true}
            data-class="mediaeyetooltip createpage"
            data-delay-show="1000"
            data-delay-hide="0"
            data-tip="Minting a collection allows the creator to choose their preferred minting option and select their digital content which is then embedded to the NFT at minting. "
            onClick={() => {
              if (user?.attributes?.subscriptionLevel < 1) {
                handleLimitation();
              }
            }}
          >
            <span>MINT COLLECTION</span>
            {user?.attributes?.subscriptionLevel < 1 ? (
              <button
                type="button"
                className="subscription-level"
                level={1}
                data-html={true}
                data-class="mediaeyetooltip"
              >
                LVL 1
              </button>
            ) : null}
          </Link>
          <Link
            className="landing-page-services-block-content-card subscription-level"
            data-html={true}
            data-class="mediaeyetooltip createpage"
            data-tip="Share the ability to mint NFTs to your collection with friends, collectives, teams or community members. Create together without any limitations! "
            to={
              user?.attributes?.subscriptionLevel > 1
                ? '/create/collection'
                : null
            }
            data-delay-show="1000"
            data-delay-hide="0"
            onClick={() => {
              if (user?.attributes?.subscriptionLevel < 2) {
                handleLimitation('Group Collection');
              }
            }}
          >
            <span>GROUP COLLECTION</span>
            {user?.attributes?.subscriptionLevel < 2 ? (
              <button
                className="subscription-level"
                level={2}
                data-html={true}
                data-class="mediaeyetooltip"
                alt="info"
              >
                LVL 2
              </button>
            ) : null}
          </Link>
          <Link
            className="landing-page-services-block-content-card subscription-level"
            data-html={true}
            data-class="mediaeyetooltip createpage"
            data-tip="Jumbo Mint supports creation of unlimited sized NFT Collections without creators having to carry the cost of blockchain gas charges."
            data-delay-show="1000"
            data-delay-hide="0"
            to={
              user?.attributes?.subscriptionLevel > 1
                ? '/create/jumbomint'
                : null
            }
            onClick={() => {
              if (user?.attributes?.subscriptionLevel < 2) {
                handleLimitation('JUMBO MINT');
              }
            }}
          >
            <span>JUMBO MINT</span>
            {user?.attributes?.subscriptionLevel < 2 ? (
              <button
                className="subscription-level"
                level={2}
                data-html={true}
                data-class="mediaeyetooltip"
                alt="info"
              >
                LVL 2
              </button>
            ) : null}
          </Link>
        </div>
      </div>
      <div className="landing-page-services-block right">
        <div className="landing-page-services-block-header">
          <span>PROMOTE</span>
          <PayAsYouGo />
        </div>
        <div className="landing-page-services-block-content">
          <Link
            className="landing-page-services-block-content-card"
            data-html={true}
            data-class="mediaeyetooltip createpage"
            data-tip="Create Airdrops for your NFTs or ERC20 compatible tokens, determine a range of tasks for participants to perform to qualify for bounties, or whitelisting, or send out promo codes to your audiences. Airdrops can be deployed globally with fully automated services and can all be done without any coding experience."
            data-delay-show="1000"
            data-deley-hide="0"
            to="/airdrop/launch"
          >
            CREATE AIRDROP
          </Link>
          <Link
            className="landing-page-services-block-content-card"
            data-html={true}
            data-class="mediaeyetooltip createpage"
            data-tip="SPOTLIGHT content featuring services highlight NFTs, NFT Collections, Campaign, and Airdrops on the most visible and trafficked pages of the MEDIA EYE NFT Portal."
            data-delay-show="1000"
            data-delay-hide="0"
            to="/spotlight"
          >
            SPOTLIGHT
          </Link>
        </div>
      </div>
    </div>
  );
}
