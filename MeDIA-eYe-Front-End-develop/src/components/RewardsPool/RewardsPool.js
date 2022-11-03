import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import { Helmet } from 'react-helmet';
import { useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import './RewardsPool.scss';
import CountUp from 'react-countup';
import TopPlatformUsers from '../../components/ContentMarketplace/Top/TopPlatformUsers/TopPlatformUsers';
const RewardsPool = (props) => {
  const { isInitialized, Moralis } = useMoralis();
  const [reward, setReward] = useState('10.0023');
  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  const changeReward = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, '');
    e.target.value = value;
    setReward(value);
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/rewards-pool'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="User Rewards Pools for NFT Sellers and Buyers | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Rewards pools are designed to programmatically distribute to top 10 platform users every 30 days token rewards.."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/rewards.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/rewards-pool"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/rewards-pool'}
        />
        <meta
          name="twitter:title"
          content="User Rewards Pools for NFT Sellers and Buyers | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Rewards pools are designed to programmatically distribute to top 10 platform users every 30 days token rewards.."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/rewards.png'}
        />
        <title>
          User Rewards Pools for NFT Sellers and Buyers | MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Rewards pools are designed to programmatically distribute to top 10 platform users every 30 days token rewards.."
        />
      </Helmet>
      <div className="rewards-pool-page">
        {/* <div className="mediaeye-layout-middle"> */}
        <div className="mediaeye-layout-container">
          {/* <div className="mediaeye-layout-container-header">
              <div className="mediaeye-layout-container-header-heading center">
                <h2>REWARDS</h2>
              </div>
            </div> */}
          <div className="rewards-pool-page-main">
            <div className="rewards-pool-page-main-content">
              <div className="rewards-pool-page-main-content-form rewards-pool-total">
                <div className="rewards-pool-page-main-content-form-heading">
                  Rewards Pool Total
                </div>
                <div className="rewards-pool-page-main-content-form-rewards">
                  {activeNetwork === 'ETH' ? (
                    <>
                      <div className="rewards-pool-page-main-content-form-rewards-data">
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

                      <div className="rewards-pool-page-main-content-form-rewards-data">
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

                      <div className="rewards-pool-page-main-content-form-rewards-data">
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
                  ) : activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME ? (
                    <>
                      <div className="rewards-pool-page-main-content-form-rewards-data">
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

                      <div className="rewards-pool-page-main-content-form-rewards-data">
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

                      <div className="rewards-pool-page-main-content-form-rewards-data">
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
                      <div className="rewards-pool-page-main-content-form-rewards-data">
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

                      <div className="rewards-pool-page-main-content-form-rewards-data">
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

                      <div className="rewards-pool-page-main-content-form-rewards-data">
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
              </div>
              <div className="rewards-pool-page-main-content-form">
                {/* <div className="rewards-pool-page-main-content-form-shadow"></div> */}
                <div className="rewards-pool-page-main-content-form-heading">
                  Claim Your Rewards
                </div>
                <div className="rewards-pool-page-main-content-form-rewards">
                  {activeNetwork === 'ETH' ? (
                    <>
                      <div className="rewards-pool-page-main-content-form-rewards-data">
                        <img src="/img/token//34/EYE.png" alt="EYE" />
                        <span>10.0023 eYe</span>
                      </div>

                      <div className="rewards-pool-page-main-content-form-rewards-data">
                        <img src="/img/token//34/USDT.png" alt="USDT" />
                        <span>10.0023 USDT</span>
                      </div>

                      <div className="rewards-pool-page-main-content-form-rewards-data">
                        <img src="/img/token/34/WETH.png" alt="WETH" />
                        <span>10.0023 WETH</span>
                      </div>
                    </>
                  ) : activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME ? (
                    <>
                      <div className="rewards-pool-page-main-content-form-rewards-data">
                        <img src="/img/token/EYE.png" alt="EYE" />
                        <span>10.0023 eYe</span>
                      </div>

                      <div className="rewards-pool-page-main-content-form-rewards-data">
                        <img src="/img/token/34/BUSD.png" alt="BUSD" />
                        <span>10.0023 BUSD</span>
                      </div>

                      <div className="rewards-pool-page-main-content-form-rewards-data">
                        <img src="/img/token/34/WBNB.png" alt="bsc" />
                        <span>10.0023 WBNB</span>
                      </div>
                    </>
                  ) : activeNetwork === 'FTM' ? (
                    <>
                      <div className="rewards-pool-page-main-content-form-rewards-data">
                        <img src="/img/token//34/EYE.png" alt="EYE" />
                        <span>10.0023 eYe</span>
                      </div>

                      <div className="rewards-pool-page-main-content-form-rewards-data">
                        <img src="/img/token//34/USDC.png" alt="USDC" />
                        <span>10.0023 USDC</span>
                      </div>

                      <div className="rewards-pool-page-main-content-form-rewards-data">
                        <img src="/img/token/34/WFTM.png" alt="WFTM" />
                        <span>10.0023 WFTM</span>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="rewards-pool-page-main-content-form-btn">
                  <button className="btn btn-reward">Claim Rewards</button>
                </div>
              </div>

              <div className="rewards-pool-page-main-content-text">
                Top 50 users on each network can hit it big!
                <br></br>
                <br></br>There are three automated rewards pools which reside on
                Ethereum, Binance Smart Chain and Fantom networks. Each reward
                pool has up to 50 places. A portion of transaction fees
                collected on the network, as well as eYe tokens, are distributed
                to the top-50 users on each of the networks, respectively every
                30 Days.
              </div>
            </div>
            <div className="rewards-pool-page-main-content-sellers text-center">
              <TopPlatformUsers />

              <div className="rewards-pool-page-main-bottom">
                <div className="rewards-pool-page-main-content-text">
                  The top users will receive rewards encouraging active use of
                  the platform and redistributing value back to the most
                  important component of the MEDIA EYE NFT Portal: its users.
                </div>
              </div>
            </div>

            {/* <div className="mediaeye-centerbtn">
                <button className="btn btn-reward">See All</button>
              </div> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </React.Fragment>
  );
};

export default RewardsPool;
