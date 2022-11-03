import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './Home.scss';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import HomeSpotlight from '../../components/Spotlight/HomeSpotlight';
import CampaignSection from '../../components/Campaigns/CampaignSection';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination, Autoplay } from 'swiper';
import CountUp from 'react-countup';
import { useIsVisible } from 'react-is-visible';
import SelectSearch from 'react-select-search';
import 'swiper/swiper-bundle.min.css';
import 'swiper/modules/navigation/navigation';
import 'swiper/modules/pagination/pagination';
import FeaturedNftSection from '../../components/Features/FeatureNft/FeaturedNftSection';
import FeaturedCollection from '../../components/Collections/FeaturedCollection';
import TopCollection from '../../components/Collections/TopCollection';
import BusinessTrade from '../../components/ContentMarketplace/Top/BusinessTrade/BusinessTrade';
import TopPlatformUsers from '../../components/ContentMarketplace/Top/TopPlatformUsers/TopPlatformUsers';
import PartnerSections from '../../components/Partners/PartnerSections';
import ChangeChainRequest from '../../blockchain/functions/ChangeChain/ChangeChainRequest';
import advertisingbanner from '../../assets/img/home/BP_manner.png';
import thumderLandsbanner from '../../assets/img/home/thumderLandsbanner.png';
import universaluserbanner from '../../assets/img/home/universaluser-banner.png';
import Blogs from '../../components/Blogs/Blog/Blogs';
import CategoriesSection from '../../components/ContentMarketplace/Categories/CategoriesSection';
import IntegratedServices from '../../components/ContentMarketplace/IntegratedServices/IntegratedServices';
const productPerPage = 8;
const Home = (props) => {
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [activeDays, setActiveDays] = useState(30);
  const [next, setNext] = useState(8);
  const { closeNftCollapse } = props;
  const history = useHistory();
  const anchorVisible = useRef();
  const isVisible = useIsVisible(anchorVisible);

  const networkList = [
    {
      name: 'ETH',
      value: 'ETH'
    },
    {
      name: process.env.REACT_APP_BSC_CHAIN_NAME,
      value: process.env.REACT_APP_BSC_CHAIN_NAME
    },
    {
      name: 'FTM',
      value: 'FTM'
    }
  ];
  const trendingList = [
    {
      name: 'NFTs',
      value: 'NFTs'
    },
    {
      name: 'Collections',
      value: 'Collections'
    }
  ];
  const [trendingSelected, setTrendingSelected] = useState('NFTs');

  const handleShowMoreProducts = () => {
    setNext(next + productPerPage);
  };

  useEffect(() => {
    if (isVisible) {
      handleShowMoreProducts();
    }
  }, [isVisible]);
  useEffect(() => {
    let video = document.getElementById('MeDIAeYe-home-video');
    if (video) {
      if (video.paused || video.ended) {
        video.play();
      }
    }
  });
  const topSlideData = [
    {
      img: '/img/home/home-banner-1.png',
      item: '/img/home/home-banner-1-item.png',
      title: 'MINT NFT',
      text: 'Share your creatives with the world',
      url: '/create/mint',
      urlText: "LET's GO",
      middle: true,
    },

    {
      img: '/img/home/home-banner-2.png',
      item: '/img/home/home-banner-2-item.png',
      title: 'CREATE CAMPAIGN',
      text: 'Drive your growth with NFTs!',
      url: '/create-campaign',
      urlText: "LET's GO"
    },
    {
      img: '/img/home/home-banner-3.png',
      item: '/img/home/home-banner-3-item.png',
      title: 'CREATE AIRDROP',
      text: 'Drive participation',
      url: '/airdrop/launch',
      urlText: "LET's GO"
    }

  ];
  const topSlidersettings = {
    slidesPerView: 1,
    grabCursor: true,
    modules: [Pagination, Autoplay],
    pagination: {
      el: '.home-page-topBannerSection-pagination',
      enable: true,
      clickable: true
    },
    parallax: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    speed: 3000,
    breakpoints: {
      889: {
        slidesPerView: 1
      }
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/home.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com" />
        <meta property="twitter:url" content={window.location.origin} />
        <meta
          name="twitter:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/home.png'}
        />
        <title>
          NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative
          Collections for Creators, Artists, Sports, Gaming and Charities |
          MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="home-page mediaeye-layout-content"
      >
        <section className="home-page-topBannerSection">
          <Swiper {...topSlidersettings}>
            {topSlideData.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="home-page-topBannerSection-slide">
                  <img
                    src={item.img}
                    className="home-page-topBannerSection-slide-img"
                    alt={item.title + "Banner"}
                  />
                  <div className="home-page-topBannerSection-slide-content">
                    <div className="mediaeye-layout-middle">
                      <div className="mediaeye-layout-container home-page-topBannerSection-slide-content-inner">
                        <div className="home-page-topBannerSection-slide-content-textpart">
                          <div className="home-page-topBannerSection-slide-content-textpart-inner">
                            <div className="home-page-topBannerSection-slide-content-textpart-heading">
                              {item?.title}
                            </div>
                            <div className="home-page-topBannerSection-slide-content-textpart-text">
                              {item?.text}
                            </div>
                            <div className="home-page-topBannerSection-slide-content-textpart-btn">
                              <Link
                                to={item?.url}
                                className="btn btn-transperant btn-square"
                              >
                                {item?.urlText}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className={`home-page-topBannerSection-slide-content-imgpart ${item.middle ? 'home-page-topBannerSection-slide-content-imgpart-center' : ''}`}>
                          <img src={item.item} alt={item.text + " " + "Banner"} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="home-page-topBannerSection-paginationbox">
            <div className="mediaeye-layout-container">
              <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll home-page-topBannerSection-pagination"></div>
            </div>
          </div>
          {/* <img
            src={topBannerImg}
            alt="NFTUnboundBannner"
            className="home-page-topBannerSection-img"
          />
          <video
            poster={topBannerImg}
            loop={true}
            muted={true}
            autoPlay={true}
            className="home-page-topBannerSection-media"
            id="MeDIAeYe-home-video"
            name="MeDIAeYe-home-video"
          >
            <source src={topBannervideo} type="video/mp4" />
          </video>
          <div className="home-page-topBannerSection-content">
            <div className="mediaeye-layout-middle">
              <div className="mediaeye-layout-container home-page-topBannerSection-content-inner">
                <h1 className="home-page-topBannerSection-content-heading">
                  NFTs UNBOUND
                </h1>
                <div className="home-page-topBannerSection-content-action">
                  <Link
                    to="/metaverse-landing"
                    className="home-page-topBannerSection-content-action-link"
                  >
                    <Angle /> Discover The Metaverse
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </section>
        {/* end banner section */}

        <section className="mediaeye-layout-section home-page-totalTrade">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <BusinessTrade />
            </div>
          </div>
        </section>

        <section className="mediaeye-layout-section home-page-advertisement withspace">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="home-page-advertisement-banners">
                <div className="home-page-advertisement-banners-col home-page-advertisement-banners-col-large">
                  <img
                    className="home-page-advertisement-banners-col-img"
                    src={advertisingbanner}
                    alt="Bearded Punks Banner"
                  />
                  <img
                    className="home-page-advertisement-banners-col-img"
                    src={universaluserbanner}
                    alt="Universal User Banner"
                    data-class="mediaeyetooltip"
                    data-tip="Coming Soon"
                  />
                </div>
                <div className="home-page-advertisement-banners-col">
                  <img
                    className="home-page-advertisement-banners-col-img"
                    src={thumderLandsbanner}
                    alt="AMA with THUNDERLANDS Banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end banner section */}

        <section className="mediaeye-layout-section home-page-featuredCollectionSection withspace">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading text-center">
                  SPOTLIGHT
                </h2>
              </div>
            </div>

            <div className="mediaeye-layout-container">
              <HomeSpotlight />
            </div>
          </div>
        </section>
        {/* end SPOTLIGHT section */}

        <section className="mediaeye-layout-section home-page-topCollectionsSection withspace">
          <div className="mediaeye-layout-container">
            <TopCollection value="home" />
            {/* <div className="m-t-20 text-center">
              <Link
                to="/top-collection"
                className="btn btn-info btn-sm btn-more"
              >
                SEE ALL
              </Link>
            </div> */}
          </div>
        </section>
        {/* end Top collections section */}

        <section className="mediaeye-layout-section home-page-featuredCollectionSection withspace">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading text-center">
                  CAMPAIGNS
                </h2>
              </div>
            </div>

            <div className="mediaeye-layout-container">
              <CampaignSection />
            </div>
          </div>
        </section>
        {/* end CAMPAIGNS section */}

        <section className="mediaeye-layout-section home-page-featuredCollectionSection withspace">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading text-center">
                  Categories
                </h2>
              </div>
            </div>

            <div className="mediaeye-layout-container">
              <CategoriesSection />
            </div>
          </div>
        </section>
        {/* end CAMPAIGNS section */}

        <section className="mediaeye-layout-section home-page-rewardsCollectionSection withspace">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading text-center">
                  <span className="text-rewards">REWARDS</span>
                </h2>
              </div>
              {activeNetwork ? (
                <div className="home-page-rewardsCollectionSection-counterbox">
                  <span htmlFor="userPool" className="home-page-rewardsCollectionSection-counterbox-heading">
                    User Rewards Pool
                  </span>
                  <div className="home-page-rewardsCollectionSection-counterbox-network">
                    <SelectSearch
                      className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                      options={networkList}
                      value={activeNetwork}
                      onChange={async (opt) => {
                        if (opt !== activeNetwork) {
                          await ChangeChainRequest(opt);
                        }
                      }}
                    />
                  </div>
                  <div className="home-page-rewardsCollectionSection-counterbox-right">
                    {activeNetwork === 'ETH' ? (
                      <>
                        <div className="home-page-rewardsCollectionSection-counterbox-counter">
                          <img src="/img/token/34/EYE.png" alt="EYE Token Logo" />
                          <CountUp
                            start={0}
                            end={100000}
                            duration={2.75}
                            delay={3}
                          >
                            <span className="home-page-rewardsCollectionSection-counterbox-counter-number"></span>
                          </CountUp>
                          <span>eYe</span>
                        </div>

                        <div className="home-page-rewardsCollectionSection-counterbox-counter">
                          <img src="/img/token/34/USDT.png" alt="USDT Token Logo" />
                          <CountUp
                            start={0}
                            end={0.000024}
                            duration={2.75}
                            decimals={6}
                            decimal="."
                            delay={3}
                          >
                            <span className="home-page-rewardsCollectionSection-counterbox-counter-number"></span>
                          </CountUp>
                          <span>USDT</span>
                        </div>

                        <div className="home-page-rewardsCollectionSection-counterbox-counter">
                          <img src="/img/token/34/WETH.png" alt="WETH Token Logo" />
                          <CountUp
                            start={0}
                            end={0.000024}
                            duration={2.75}
                            decimals={6}
                            decimal="."
                            delay={3}
                          >
                            <span className="home-page-rewardsCollectionSection-counterbox-counter-number"></span>
                          </CountUp>
                          <span>WETH</span>
                        </div>
                      </>
                    ) : activeNetwork ===
                      process.env.REACT_APP_BSC_CHAIN_NAME ? (
                      <>
                        <div className="home-page-rewardsCollectionSection-counterbox-counter">
                          <img src="/img/token/34/EYE.png" alt="EYE Token Logo" />
                          <CountUp
                            start={0}
                            end={100000}
                            duration={2.75}
                            delay={3}
                          >
                            <span className="home-page-rewardsCollectionSection-counterbox-counter-number"></span>
                          </CountUp>
                          <span>eYe</span>
                        </div>

                        <div className="home-page-rewardsCollectionSection-counterbox-counter">
                          <img src="/img/token/34/BUSD.png" alt="BUSD Token Logo" />
                          <CountUp
                            start={0}
                            end={0.000024}
                            duration={2.75}
                            decimals={6}
                            decimal="."
                            delay={3}
                          >
                            <span className="home-page-rewardsCollectionSection-counterbox-counter-number"></span>
                          </CountUp>
                          <span>BUSD</span>
                        </div>
                        <div className="home-page-rewardsCollectionSection-counterbox-counter">
                          <img src="/img/token/34/BNB.png" alt="WBNB Token Logo" />
                          <CountUp
                            start={0}
                            end={0.000024}
                            duration={2.75}
                            decimals={6}
                            decimal="."
                            delay={3}
                          >
                            <span className="home-page-rewardsCollectionSection-counterbox-counter-number"></span>
                          </CountUp>
                          <span>WBNB</span>
                        </div>
                      </>
                    ) : activeNetwork === 'FTM' ? (
                      <>
                        <div className="home-page-rewardsCollectionSection-counterbox-counter">
                          <img src="/img/token/34/EYE.png" alt="EYE Token Logo" />
                          <CountUp
                            start={0}
                            end={100000}
                            duration={2.75}
                            delay={3}
                          >
                            <span className="home-page-rewardsCollectionSection-counterbox-counter-number"></span>
                          </CountUp>
                          <span>eYe</span>
                        </div>

                        <div className="home-page-rewardsCollectionSection-counterbox-counter">
                          <img src="/img/token/34/USDC.png" alt="USDC Token Logo" />
                          <CountUp
                            start={0}
                            end={0.000024}
                            duration={2.75}
                            decimals={6}
                            decimal="."
                            delay={3}
                          >
                            <span className="home-page-rewardsCollectionSection-counterbox-counter-number"></span>
                          </CountUp>
                          <span>USDC</span>
                        </div>
                        <div className="home-page-rewardsCollectionSection-counterbox-counter">
                          <img src="/img/token/WFTM.png" alt="WFTM Token Logo" />
                          <CountUp
                            start={0}
                            end={0.000024}
                            duration={2.75}
                            decimals={6}
                            decimal="."
                            delay={3}
                          >
                            <span className="home-page-rewardsCollectionSection-counterbox-counter-number"></span>
                          </CountUp>
                          <span>WFTM</span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <TopPlatformUsers />
            </div>
          </div>
        </section>
        {/* end REWARDS section */}

        <section className="mediaeye-layout-section home-page-topLiveBidsSection withspace">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header top-collection-page-header">
                <h2 className="mediaeye-layout-section-header-heading">
                  Trending
                </h2>
                <div>
                  <SelectSearch
                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                    size="lg"
                    options={trendingList}
                    value={trendingSelected}
                    onChange={(opt) => setTrendingSelected(opt)}
                  />
                </div>
              </div>
              {trendingSelected === 'NFTs' ? (
                <FeaturedNftSection />
              ) : trendingSelected === 'Collections' ? (
                <FeaturedCollection />
              ) : null}
            </div>
          </div>
        </section>
        {/* end Top Trending section */}

        <section className="mediaeye-layout-section home-page-blogSection withspace">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading text-center">
                  METAEYE BLOG
                </h2>
              </div>
              <Blogs />

              <div className="text-center">
                <a
                  href="https://blog.mediaeyenft.com/"
                  target="_blank"
                  className="btn btn-transperant btn-sm btn-more"
                >
                  SEE ALL
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* end Marketplace section */}

        <section className="mediaeye-layout-section home-page-marketingCampaignsSection withspace">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading text-center">
                  Integrated Services
                </h2>
              </div>

              <div className="home-page-marketingCampaignsSection-content">
                <IntegratedServices />
              </div>
            </div>
          </div>
        </section>
        {/* end Integrated section */}

        <section className="mediaeye-layout-section home-page-featuredCollectionSection withspace">
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading text-center">
                  Partners
                </h2>
              </div>
              <PartnerSections />
            </div>
          </div>
        </section>
        {/* end Partner section */}
      </div>
    </React.Fragment>
  );
};

export default Home;
