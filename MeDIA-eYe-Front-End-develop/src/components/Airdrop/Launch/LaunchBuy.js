import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import DatePicker from 'react-datepicker';
import SelectSearch from 'react-select-search';
import './Launch.scss';
import { priceAirdrop } from '../../../blockchain/functions/Airdrops/PriceAirdrop';
import { ethers } from 'ethers';
import { roundString } from '../../../blockchain/functions/Utils';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';
import {
  checkAllowance,
  requestTokenApproval
} from '../../../blockchain/functions/ApproveToken';
import {
  ContractAddress,
  TokenAddress
} from '../../../blockchain/functions/Addresses';
import FeatureSpotlight from '../../Spotlight/FeatureSpotlight/FeatureSpotlight';

const daysFilterOption = [
  {
    name: '7 days',
    value: 7
  },
  {
    name: '14 days',
    value: 14
  },
  {
    name: '21 days',
    value: 21
  }
];

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

const LaunchBuy = (props) => {
  const {
    activeNetwork,
    whitelistDate,
    setWhitelistDate,
    claimDate,
    setClaimDate,
    activeDays,
    setActiveDays,
    activeToken,
    setActiveToken,
    payAirdropPressed,
    Moralis
  } = props;
  const { user } = useMoralis();
  const [paymentTokensList, setPaymentTokensList] = useState([]);
  const [isApproved, setApproved] = useState(true);
  const [featureInformation, setFeatureInformation] = useState({});
  const [lastPriceData, setPriceData] = useState(null);
  const [leftoverDate, setLeftoverDate] = useState(
    new Date(
      whitelistDate + Number(activeDays) * 24 * 60 * 60 * 1000 * 2
    ).getTime()
  );
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    // recalc whitelisting and claiming date based on start date
    setClaimDate(
      new Date(
        whitelistDate + Number(activeDays) * 24 * 60 * 60 * 1000
      ).getTime()
    );
    setLeftoverDate(
      new Date(
        whitelistDate + Number(activeDays) * 24 * 60 * 60 * 1000 * 2
      ).getTime()
    );
  }, [whitelistDate, activeDays]);

  useEffect(() => {
    if (Moralis.provider && activeDays && activeNetwork) {
      setPrices();
    }
  }, [Moralis.provider, activeDays, activeNetwork]);

  useEffect(() => {
    if (
      Moralis.provider &&
      activeDays &&
      activeNetwork &&
      user &&
      lastPriceData
    ) {
      checkApproval();
    }
  }, [
    Moralis.provider,
    activeDays,
    activeNetwork,
    user,
    activeToken,
    lastPriceData
  ]);

  const checkApproval = async () => {
    let amount;
    if (activeToken === 'BUSD' || activeToken === 'USDC') {
      amount = lastPriceData?.stablePrice;
    } else if (activeToken.toUpperCase() === 'EYE') {
      amount = lastPriceData?.eyePrice;
    }
    const isCheckoutApproved = await checkAllowance(
      Moralis,
      activeToken,
      user?.attributes?.ethAddress,
      amount,
      ContractAddress('AIRDROP', Moralis.chainId),
      TokenAddress(activeToken, Moralis.chainId)
    );
    setApproved(isCheckoutApproved);
    return isCheckoutApproved;
  };

  const setPrices = async () => {
    const priceData = await priceAirdrop(Moralis, {
      activeDays: activeDays,
      chainId: ChainHexString(activeNetwork)
    });
    setPriceData(priceData);
    if (activeNetwork === 'BSC') {
      let array = [
        {
          name: 'BNB',
          img: '/img/token/34/BNB.png',
          des: 'Binance',
          price: `$${roundString(
            ethers.utils.formatEther(priceData.stablePrice),
            4
          )}`,
          convert: roundString(
            ethers.utils.formatEther(priceData.nativePrice),
            4
          )
        },
        {
          name: 'BUSD',
          img: '/img/token/34/BUSD.png',
          des: 'BUSD',
          price: `$${roundString(
            ethers.utils.formatEther(priceData.stablePrice),
            4
          )}`,
          convert: roundString(
            ethers.utils.formatEther(priceData.stablePrice),
            4
          )
        },
        {
          name: 'eYe',
          img: '/img/token/34/EYE.png',
          des: 'MEDIA EYE',
          offer: '15%',
          price: `$${roundString(
            ethers.utils.formatEther(priceData.stablePrice),
            4
          )}`,
          convert: roundString(ethers.utils.formatEther(priceData.eyePrice), 4)
        }
      ];
      setPaymentTokensList(array);
    } else if (activeNetwork === 'FTM') {
      let array = [
        {
          name: 'FTM',
          img: '/img/token/34/FTM.png',
          des: 'Fantom',
          price: `$${roundString(
            ethers.utils.formatEther(priceData.stablePrice),
            4
          )}`,
          convert: roundString(
            ethers.utils.formatEther(priceData.nativePrice),
            4
          )
        },
        {
          name: 'USDC',
          img: '/img/token/34/USDC.png',
          des: 'USD Coin',
          price: `$${roundString(
            ethers.utils.formatEther(priceData.stablePrice),
            4
          )}`,
          convert: roundString(
            ethers.utils.formatEther(priceData.stablePrice),
            4
          )
        }
      ];
      setPaymentTokensList(array);
    } else {
      let array = [];
      setPaymentTokensList(array);
    }
  };

  const handlePay = async () => {
    // refresh prices in UI
    await setPrices();
    if (isApproved) {
      // call pay function in LaunchAirdrop component
      payAirdropPressed();
    } else {
      const approved = await requestTokenApproval(
        Moralis,
        activeToken,
        ContractAddress('AIRDROP', ChainHexString(activeNetwork))
      );
      setApproved(approved);
    }
  };

  return (
    <>
      <div className="launch-airdrop-page-inner-terms-box">
        <div className="mediaeyeFeatureNft-header">
          <div className="mediaeyeFeatureNft-header-title">
            Airdrop Terms and Conditions
          </div>
        </div>
        <div className="mediaeyeFeatureNft-detail">
          <span className="mediaeyeFeatureNft-detail-description text-grayShade">
            The airdrop takes place in two phases - whitelisting and bounties
            claiming. Сhoose the start date of the airdrop and duration of the
            phases.
          </span>
          <div className="mediaeyeFeatureNft-detail-info">
            <div className="mediaeyeform-group leftone">
              <label className="mediaeyeform-label">Start Date</label>
              <div className="mediaeyeform-group-input mediaeyeFeatureNft-detail-row-col-value mediaeye-datepicker">
                <DatePicker
                  minDate={new Date()}
                  className="mediaeyeform-input mediaeye-datepicker"
                  withPortal
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
            <div className="mediaeyeform-group rightone">
              <label className="mediaeyeform-label">Duration</label>
              <div className="mediaeyeform-group-input">
                <div className="">
                  <SelectSearch
                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                    size="lg"
                    options={daysFilterOption}
                    value={activeDays}
                    onChange={(opt) => setActiveDays(opt)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mediaeyeFeatureNft-detail-phase">
            <div className="mediaeyeFeatureNft-detail-phase-box">
              <span className="mediaeyeFeatureNft-detail-phase-box-title">
                Phase Name
              </span>
              <span className="mediaeyeFeatureNft-detail-phase-box-title">
                Duration
              </span>
            </div>
            <div className="mediaeyeFeatureNft-detail-phase-detail">
              <span className="mediaeyeFeatureNft-detail-phase-detail-name">
                Whitelisting
              </span>
              <span className="mediaeyeFeatureNft-detail-phase-detail-duration">
                {new Date(whitelistDate).toLocaleDateString(
                  'en-US',
                  dateOptions
                )}
                {' - '}
                {new Date(claimDate).toLocaleDateString('en-US', dateOptions)}
              </span>
            </div>
            <div className="mediaeyeFeatureNft-detail-phase-detail">
              <span className="mediaeyeFeatureNft-detail-phase-detail-name">
                Bounties Claiming
              </span>
              <span className="mediaeyeFeatureNft-detail-phase-detail-duration">
                {new Date(claimDate).toLocaleDateString('en-US', dateOptions)}
                {' - '}
                {new Date(leftoverDate).toLocaleDateString(
                  'en-US',
                  dateOptions
                )}
              </span>
            </div>
            <div className="mediaeyeFeatureNft-detail-phase-detail">
              <span className="mediaeyeFeatureNft-detail-phase-detail-name">
                Claim Supply Leftover
              </span>
              <span className="mediaeyeFeatureNft-detail-phase-detail-duration">
                {new Date(leftoverDate).toLocaleDateString(
                  'en-US',
                  dateOptions
                )}
              </span>
            </div>
          </div>
        </div>
        {/* {toggleFeatureYourNFT ? <FeatureYourNFT /> : null} */}
      </div>
      <div>
        <FeatureSpotlight
          setFeatureInformation={setFeatureInformation}
          featureInformation={featureInformation}
          type={'Spotlight My Airdrop'}
          name={'Airdrop'}
          activeDays={activeDays}
        />
      </div>
    </>
  );
};

export default LaunchBuy;
