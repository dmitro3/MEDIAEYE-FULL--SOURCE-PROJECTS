import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { GetDefaultImages } from '../../blockchain/functions/Utils';
import formatAdddress from '../../utils/formatAdddress';
import { EyeSwap, Lock, PayAsYouGo, Refresh, Settings } from '../Icons';
import './MetagateNewPage.scss';
import CountUp from 'react-countup';
import rewards_banner from '../../assets/img/Rewards/rewards.png';
import { useSelector } from 'react-redux';
import charityslogan from '../../assets/img/Charity/slogan.png';
import mediaeye from '../../assets/img/mediaeyetext.png';
import care from '../../assets/img/care.png';
import eyeq from '../../assets/img/eyeQ.png';
import EyeSwapPro from '../Modals/EyeSwap-Open/EyeSwapPro';
import { Link, useHistory } from 'react-router-dom';
import { ChainHexString } from '../../blockchain/functions/ChangeChain';
import { TokenAddress } from '../../blockchain/functions/Addresses';
import { roundString } from '../../blockchain/functions/Utils';

import {
    givingBlockLogin,
    givingBlockRefreshToken,
    givingBlockOrganizationlist
} from '../../blockchain/functions/Charity/charitycollection';
import ItemLoader from '../Common/ItemLoader'
import { DownloadEyeWallet } from './DownloadEyeWallet';

export default function MetagateNewPage() {
    const { user, Moralis, isInitialized } = useMoralis();
    const history = useHistory();
    const [dataload, setdataload] = useState(0);
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const [eyeBalance, setEyeBalance] = useState(0);
    const [nativeBalance, setNativeBalance] = useState(0);
    const [biddingBalance, setBiddingBalance] = useState(0);
    const [stableBalance, setStableBalance] = useState(0);
    const [key, setkey] = useState(0);
    const [charityData, setcharityData] = useState([]);

    useEffect(() => {
        if (activeNetwork && isInitialized) {
            getBalances();
        }
    }, [activeNetwork, isInitialized]);


    const organizationlist = async () => {
        const access_token = localStorage.getItem('givingBlock_accessToken');
        if (access_token) {
            var pageNumber = 1
            const givingBlockOrganizationres = await givingBlockOrganizationlist(
                access_token, pageNumber
            );
            if (givingBlockOrganizationres && givingBlockOrganizationres.length > 0) {
                let arar = givingBlockOrganizationres.slice(0, 20);
                setcharityData(arar);
                setdataload(1);
            } else {
                setdataload(2);
            }
        } else {
            setdataload(0);
            logintogivingblock(1);
        }

    };
    console.log(charityData, "all the charities");
    const logintogivingblock = async (key) => {
        let givingBlockLoginres;
        if (key == 0) {
            givingBlockLoginres = await givingBlockLogin();
        } else {
            const refresh_token = localStorage.getItem('givingBlock_refreshToken');
            givingBlockLoginres = await givingBlockRefreshToken(refresh_token);
        }

        if (givingBlockLoginres.key == 1) {
            let logintime = new Date();
            localStorage.setItem('givingBlock_loginstatus', 1);
            localStorage.setItem('givingBlock_logintime', logintime);
            localStorage.setItem(
                'givingBlock_accessToken',
                givingBlockLoginres.accessToken
            );
            localStorage.setItem(
                'givingBlock_refreshToken',
                givingBlockLoginres.refreshToken
            );
            console.log('iijijijij');
            // organizationlist();
        } else {
            localStorage.setItem('givingBlock_loginstatus', 0);
        }
    };
    useEffect(() => {
        if (key === 0) {
            setdataload(0);
            let loginstatus = localStorage.getItem('givingBlock_loginstatus');
            if (loginstatus == 1) {
                let logintime = localStorage.getItem('givingBlock_logintime');
                let oldtime = new Date(logintime);
                let newtime = new Date();
                let diff = (newtime.getTime() - oldtime.getTime()) / 1000;
                diff /= 60 * 60;
                let a = Math.abs(Math.round(diff));
                if (a >= 2) {
                    let key = 1;
                    logintogivingblock(key);
                    setkey(1);
                } else {
                    organizationlist();
                    setkey(1);
                }
            } else {
                let key = 0;
                logintogivingblock(key);
                setkey(1);
            }
        }
    });
    const link = (charity) => {
        let slug = charity?.name;
        // slug = slug.replace(/\s+/g, '-');
        return slug;
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
                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span> {eyeBalance}</span> <span>eYe</span>
                        </div>
                    </div>
                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/BNB.png" alt="BNB Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span> {nativeBalance}</span> <span>BNB</span>
                        </div>
                    </div>

                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/BUSD.png" alt="BUSD Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span>{stableBalance}</span>
                            <span>BUSD</span>
                        </div>
                    </div>

                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/WBNB.png" alt="WBNB Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span>{biddingBalance}</span>
                            <span>WBNB</span>
                        </div>
                    </div>
                </>
            );
        } else if (activeNetwork === 'ETH') {
            return (
                <>
                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span> {eyeBalance}</span> <span>eYe</span>
                        </div>
                    </div>
                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/ETH.png" alt="ETH Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span> {nativeBalance}</span> <span>ETH</span>
                        </div>
                    </div>

                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/USDT.png" alt="USDT Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span>{stableBalance}</span>
                            <span>USDT</span>
                        </div>
                    </div>

                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/WETH.png" alt="WETH Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span>{biddingBalance}</span>
                            <span>WETH</span>
                        </div>
                    </div>
                </>
            );
        } else if (activeNetwork === 'FTM') {
            return (
                <>
                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/EYE.png" alt="eYe Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span> {eyeBalance}</span> <span>eYe</span>
                        </div>
                    </div>
                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/FTM.png" alt="FTM Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span> {nativeBalance}</span> <span>FTM</span>
                        </div>
                    </div>

                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/USDC.png" alt="USDC Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span>{stableBalance}</span>
                            <span>USDC</span>
                        </div>
                    </div>

                    <div className="new-metagate-inner-right-metabalance-content-row m-b-20">
                        <div className="new-metagate-inner-right-metabalance-content-row-imgwrapper">
                            <img src="/img/token/34/WFTM.png" alt="WFTM Token Logo" />
                        </div>
                        <div className="new-metagate-inner-right-metabalance-content-row-item">
                            <span>{biddingBalance}</span>
                            <span>WFTM</span>
                        </div>
                    </div>
                </>
            );
        } else {
            return <div />;
        }
    };
    const handleEyeQButton = () => {
        window.open('https://eyeqdao.com/', '_blank');
    };
    return (
        <div className="new-metagate">
            <div className="mediaeye-layout-middle">
                <div className="new-metagate-header m-t-50">
                    <div className="new-metagate-header-userid">
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
                    <div className="flex-between-center new-metagate-header-metaeye">
                        <div className="new-metagate-header-metaeye-parts">
                            <div className="flex-between-center">
                                <img className='m-r-10' src={mediaeye} />
                                <button>PLUS</button>
                            </div>
                            <div className="flex-between-center">
                                <span className="text-action">Active</span>
                                <div>
                                    <span className="text-semitransperant">Days remaining</span>
                                    <strong className="m-l-10">25</strong>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-square btn-gaming">Extend</button>
                    </div>
                </div>
                <div className="new-metagate-inner m-t-50">
                    <div className="new-metagate-inner-left">
                        <div className="new-metagate-inner-left-top">
                            <div className="new-metagate-inner-left-top-block">
                                <div className="new-metagate-inner-left-top-block-title">
                                    <span>MINTING SERVICES</span>
                                </div>
                                <div className="new-metagate-inner-left-top-block-content">
                                    <div className="new-metagate-inner-left-top-block-content-item active" onClick={() => history.push('/create/mint')}>
                                        <span>Create NFT</span>
                                    </div>
                                    <div className="new-metagate-inner-left-top-block-content-item active" onClick={() => history.push('/create/collection')}>
                                        <span>Create Collection</span>
                                    </div>
                                    <div className="new-metagate-inner-left-top-block-content-item active">
                                        <span>Bloom</span>
                                        <PayAsYouGo />
                                    </div>
                                </div>
                            </div>
                            <div className="new-metagate-inner-left-top-block">
                                <div className="new-metagate-inner-left-top-block-title">
                                    <span>PROMOTE</span>
                                    <PayAsYouGo />
                                </div>
                                <div className="new-metagate-inner-left-top-block-content">
                                    <div className="new-metagate-inner-left-top-block-content-item">
                                        <span className="text-semitransperant">
                                            Create Campaign
                                        </span>
                                        <div className="new-metagate-inner-left-top-block-content-item-locked">
                                            <Lock />
                                        </div>
                                    </div>
                                    <div className="new-metagate-inner-left-top-block-content-item">
                                        <span className="text-semitransperant">Create Airdrop</span>
                                        <div className="new-metagate-inner-left-top-block-content-item-locked">
                                            <Lock />
                                        </div>
                                    </div>
                                    <div className="new-metagate-inner-left-top-block-content-item" onClick={() => history.push('/spotlight')}>
                                        <span>Spotlight</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="new-metagate-inner-left-charity">
                            <div className="new-metagate-inner-left-charity-inner">
                                <div className="new-metagate-inner-left-charity-inner-block">
                                    <div className="new-metagate-inner-left-charity-inner-block-title">
                                        <span>CHARITIES</span>
                                        <img src={charityslogan} alt="charity-slogan" />
                                    </div>
                                    <div className="mediaeyefancyScroll">
                                        <div className="new-metagate-inner-left-charity-inner-block-content m-t-50">
                                            {dataload == 1 ? (

                                                <>
                                                    {charityData.filter((item) => item.status === 1).map((charity, i) => (
                                                        <Link
                                                            className="new-metagate-inner-left-charity-inner-block-content-item m-b-20"
                                                            to={{
                                                                pathname: `/charity-place/${link(charity)}/${charity?.orgId
                                                                    }`,
                                                                state: {
                                                                    organizationId: charity?.orgId,
                                                                    organizationType: charity?.isGivingBlock
                                                                }
                                                            }}
                                                        >
                                                            {/* <div > */}
                                                            <div className='new-metagate-inner-left-charity-inner-block-content-item-left'>
                                                                <img src={charity?.charityBanner?.filePath} alt="charity-logo" />
                                                                <span>{charity?.irdRegisterName}</span>
                                                            </div>
                                                            <div className='new-metagate-inner-left-charity-inner-block-content-item-right'>
                                                                {
                                                                    charity?.networkDetails.map((item) => (

                                                                        item.name === "Ethereum" ?
                                                                            <img src="/img/token/ETH.png" alt="ETH Token Logo" /> : item.name === "Binance smart chain" ? <img src="/img/token/BNB.png" /> :
                                                                                <img src="/img/token/ftm.png" />

                                                                    ))
                                                                }
                                                            </div>
                                                            {/* </div> */}
                                                        </Link>
                                                    ))}
                                                    {charityData.filter((item) => item.status !== 1).map((charity, i) => (
                                                        <Link
                                                            className="new-metagate-inner-left-charity-inner-block-content-item m-b-20"
                                                            to={{
                                                                pathname: `/charity-place/${link(charity)}/${charity?.orgId
                                                                    }`,
                                                                state: {
                                                                    organizationId: charity?.orgId,
                                                                    organizationType: charity?.isGivingBlock
                                                                }
                                                            }}
                                                        >
                                                            {/* <div > */}
                                                            <div className='new-metagate-inner-left-charity-inner-block-content-item-left'>
                                                                <img src={charity?.logo} alt="charity-logo" />
                                                                <span>{charity?.name}</span>
                                                            </div>
                                                            <div className='new-metagate-inner-left-charity-inner-block-content-item-right'>
                                                                <img src="/img/token/34/ETH.png" alt="ETH Token Logo" />
                                                                <img
                                                                    src="/img/token/BitCoinCash.png"
                                                                    alt="BitCoinCash Token Logo"
                                                                />
                                                            </div>
                                                            {/* </div> */}
                                                        </Link>
                                                    ))}
                                                </>
                                            ) : dataload == 0 ? (
                                                <ItemLoader />
                                            ) : (
                                                <div>
                                                    <h1>No data available</h1>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <button className="btn btn-square btn-gaming" onClick={() => history.push('/charity-place')}>
                                            Charity place
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="new-metagate-inner-left-eyeq">
                            <div className="new-metagate-inner-left-eyeq-content">
                                <img src={eyeq} alt="eye-Q banner" />
                                <div className="new-metagate-inner-left-eyeq-content-button">
                                    <button onClick={handleEyeQButton}>Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="new-metagate-inner-right">
                        <div className="new-metagate-inner-right-rewards">
                            <div className="new-metagate-inner-right-rewards-content">
                                <div className="new-metagate-inner-right-rewards-content-image">
                                    <img src={rewards_banner} alt="rewards-banner" />
                                </div>
                                <div className="new-metagate-inner-right-rewards-content-bottom">
                                    <span className="new-metagate-inner-right-rewards-content-bottom-title text-left">
                                        Pool Total
                                    </span>
                                    <div className="new-metagate-inner-right-rewards-content-bottom-values m-t-20">
                                        {activeNetwork === 'ETH' ? (
                                            <>
                                                <div className="new-metagate-inner-right-rewards-content-bottom-values-data">
                                                    <img src="/img/token/EYE.png" alt="EYE" />
                                                    <span>
                                                        <CountUp
                                                            start={0}
                                                            end={0.000024}
                                                            duration={2.75}
                                                            decimals={6}
                                                            decimal="."
                                                            delay={3}
                                                        ></CountUp>{' '}
                                                        eYe
                                                    </span>
                                                </div>

                                                <div className="new-metagate-inner-right-rewards-content-bottom-values-data">
                                                    <img src="/img/token/34/USDT.png" alt="USDT" />
                                                    <span>
                                                        <CountUp
                                                            start={0}
                                                            end={0.000024}
                                                            duration={2.75}
                                                            decimals={6}
                                                            decimal="."
                                                            delay={3}
                                                        ></CountUp>{' '}
                                                        USDT
                                                    </span>
                                                </div>

                                                <div className="new-metagate-inner-right-rewards-content-bottom-values-data">
                                                    <img src="/img/token/34/WETH.png" alt="WETH" />
                                                    <span>
                                                        <CountUp
                                                            start={0}
                                                            end={0.000024}
                                                            duration={2.75}
                                                            decimals={6}
                                                            decimal="."
                                                            delay={3}
                                                        ></CountUp>{' '}
                                                        WETH
                                                    </span>
                                                </div>
                                            </>
                                        ) : activeNetwork ===
                                            process.env.REACT_APP_BSC_CHAIN_NAME ? (
                                            <>
                                                <div className="new-metagate-inner-right-rewards-content-bottom-values-data">
                                                    <img src="/img/token/EYE.png" alt="EYE" />
                                                    <span>
                                                        <CountUp
                                                            start={0}
                                                            end={0.000024}
                                                            duration={2.75}
                                                            decimals={6}
                                                            decimal="."
                                                            delay={3}
                                                        ></CountUp>{' '}
                                                        eYe
                                                    </span>
                                                </div>

                                                <div className="new-metagate-inner-right-rewards-content-bottom-values-data">
                                                    <img src="/img/token/34/BUSD.png" alt="BUSD" />
                                                    <span>
                                                        <CountUp
                                                            start={0}
                                                            end={0.000024}
                                                            duration={2.75}
                                                            decimals={6}
                                                            decimal="."
                                                            delay={3}
                                                        ></CountUp>{' '}
                                                        BUSD
                                                    </span>
                                                </div>

                                                <div className="new-metagate-inner-right-rewards-content-bottom-values-data">
                                                    <img src="/img/token/34/WBNB.png" alt="WBNB" />
                                                    <span>
                                                        <CountUp
                                                            start={0}
                                                            end={0.000024}
                                                            duration={2.75}
                                                            decimals={6}
                                                            decimal="."
                                                            delay={3}
                                                        ></CountUp>{' '}
                                                        WBNB
                                                    </span>
                                                </div>
                                            </>
                                        ) : activeNetwork === 'FTM' ? (
                                            <>
                                                <div className="new-metagate-inner-right-rewards-content-bottom-values-data">
                                                    <img src="/img/token/EYE.png" alt="EYE" />
                                                    <span>
                                                        <CountUp
                                                            start={0}
                                                            end={0.000024}
                                                            duration={2.75}
                                                            decimals={6}
                                                            decimal="."
                                                            delay={3}
                                                        ></CountUp>{' '}
                                                        eYe
                                                    </span>
                                                </div>

                                                <div className="new-metagate-inner-right-rewards-content-bottom-values-data">
                                                    <img src="/img/token/34/USDC.png" alt="USDC" />
                                                    <span>
                                                        <CountUp
                                                            start={0}
                                                            end={0.000024}
                                                            duration={2.75}
                                                            decimals={6}
                                                            decimal="."
                                                            delay={3}
                                                        ></CountUp>{' '}
                                                        USDC
                                                    </span>
                                                </div>

                                                <div className="new-metagate-inner-right-rewards-content-bottom-values-data">
                                                    <img src="/img/token/34/WFTM.png" alt="WFTM" />
                                                    <span>
                                                        <CountUp
                                                            start={0}
                                                            end={0.000024}
                                                            duration={2.75}
                                                            decimals={6}
                                                            decimal="."
                                                            delay={3}
                                                        ></CountUp>{' '}
                                                        WFTM
                                                    </span>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                    <div className="text-right m-t-30">
                                        <button className="btn btn-square btn-gaming">Claim</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="new-metagate-inner-right-metabalance">
                            <div className="new-metagate-inner-right-metabalance-title">
                                <span>MY METABALANCE</span>
                            </div>
                            <div className="new-metagate-inner-right-metabalance-content">
                                <div>{displayAllWalletRows()}</div>
                            </div>
                        </div>
                        <div className="new-metagate-inner-right-eyeswap">
                            <div className="new-metagate-inner-right-eyeswap-title">
                                <div className="new-metagate-inner-right-eyeswap-title-wrapper">
                                    <EyeSwap type={'green'} />
                                    <span className="m-l-10">eYeSwap</span>
                                </div>
                                <div className="new-metagate-inner-right-eyeswap-title-wrapper">
                                    <div>
                                        <Refresh />
                                    </div>
                                    <div className="m-l-20">
                                        <Settings />
                                    </div>
                                </div>
                            </div>
                            <EyeSwapPro />
                        </div>
                    </div>
                </div>
                {/* <div className='new-metagate-bottomcontent'>
                    <div className='new-metagate-bottomcontent-eyeq'>
                        <div className='new-metagate-bottomcontent-eyeq-content'>
                            <img src={eyeq} alt="eye-Q banner" />
                            <div className='new-metagate-bottomcontent-eyeq-content-button'><button>Learn More</button></div>
                        </div>
                    </div>
                    <div className='new-metagate-bottomcontent-eyeswap'>
                        <div className='new-metagate-bottomcontent-eyeswap-title'>
                            <div className='new-metagate-bottomcontent-eyeswap-title-wrapper'>
                                <EyeSwap type={'green'} />
                                <span className='m-l-10'>eYeSwap</span>
                            </div>
                            <div className='new-metagate-bottomcontent-eyeswap-title-wrapper'>
                                <div><Refresh /></div>
                                <div className='m-l-20'><Settings /></div>
                            </div>
                        </div>
                        <EyeSwapPro />
                    </div>
                </div> */}

                {/* <div className="m-b-50">
                    <DownloadEyewalletApp />
                </div> */}
                <div className="m-b-50">
                    <DownloadEyeWallet />
                </div>
            </div>
        </div>
    );
}
