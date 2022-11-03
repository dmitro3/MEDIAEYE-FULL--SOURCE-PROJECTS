import './hub.scss';
import { Helmet } from 'react-helmet';
import Angle from '../../Icons/Angle';
import { useHistory } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import TopNftSale from '../../TopNftSale/TopNftSale';
import React, { useRef, useState, useEffect } from 'react';
import PopularTranding from '../PopularTranding/PopularTranding';
import GraphandCharts from '../HubGraphandCharts/GraphandCharts';
import TopCollection from '../../../components/Collections/TopCollection';
import { coinmarketcap } from '../../../blockchain/functions/Hub/hubcollection';
import BlockchainsByNftSales from '../BlockchainsByNftSales/BlockchainsByNftSales';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const HubMain = (props) => {
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [activeId, setActiveId] = useState(1);
  const isMobile = window.innerWidth < 768 ? true : false;
  const [nftActiveDays, setNftActiveDays] = useState(24);
  const [eyeTradeDays, setEyeTradeDays] = useState(24);
  const [worldNftDays, setWorldNftDays] = useState(24);
  const [worldNftDaysset, setworldNftDaysset] = useState('24 hours');
  const [worldNftDayssetamount, setworldNftDayssetamount] = useState();
  const [worldsalessetamount, setworldsalessetamount] = useState();
  const [worldmarketcapsetamount, setmarketcapsetamount] = useState();
  const [worldVolume, setWorldVolume] = useState(24);
  const [worldwidestatus, setworldwidestatus] = useState(0);
  const [worldVolumeset, setworldVolumeset] = useState('24 hours');

  const [activeDaysTrending, setActiveDaysTrending] = useState(7);

  const toggleDropdonw = (e) => {
    if (e) {
      setActiveDropdown(e);
    } else {
      setActiveDropdown(null);
    }
  };
  const daysFilterOption2 = [
    {
      name: '24 h',
      value: 24
    },
    {
      name: '7 d',
      value: 7
    },
    {
      name: '30 d',
      value: 30
    },
    {
      name: 'All',
      value: 'All'
    }
  ];
  useEffect(async () => {
    if (worldwidestatus == 1) {
      let rss;
      if (worldNftDays == 24) {
        setworldNftDaysset('last 24 hours');
        rss = await coinmarketcap(1);
      }
      if (worldNftDays == 7) {
        setworldNftDaysset('last 7 days');
        rss = await coinmarketcap(2);
      }
      if (worldNftDays == 30) {
        setworldNftDaysset('last 30 days');
        rss = await coinmarketcap(3);
      }
      if (worldNftDays == 'All') {
        setworldNftDaysset('All time');
        rss = await coinmarketcap(4);
      }

      let sales = rss.sumsales;
      sales = parseFloat(sales);
      sales = sales.toLocaleString('en-US');
      setworldNftDayssetamount(sales);
    } else if (worldwidestatus == 2) {
      let rss;
      let rsss;
      if (worldVolume == 24) {
        setworldVolumeset('last 24 hours');
        rss = await coinmarketcap(1);
        rsss = await coinmarketcap(1);
      }
      if (worldVolume == 7) {
        setworldVolumeset('last 7 days');
        rss = await coinmarketcap(2);
        rsss = await coinmarketcap(2);
      }
      if (worldVolume == 30) {
        setworldVolumeset('last 30 days');
        rss = await coinmarketcap(3);
        rsss = await coinmarketcap(3);
      }

      if (worldVolume == 'All') {
        setworldVolumeset('All time');
        rss = await coinmarketcap(4);
        rsss = await coinmarketcap(4);
      }

      let sales = rsss.sumsales;
      sales = parseFloat(sales);
      sales = sales.toLocaleString('en-US');
      setworldNftDayssetamount(sales);
      let nftday = rss.sumvolumeUsd;
      nftday = parseFloat(nftday);
      nftday = nftday.toLocaleString('en-US');
      setworldsalessetamount(nftday);
      let nftmarketvalue = rss.market_cap;
      nftmarketvalue = parseFloat(nftmarketvalue);
      nftmarketvalue = nftmarketvalue.toLocaleString('en-US');
      setmarketcapsetamount(nftmarketvalue);
    } else {
      let rss = await coinmarketcap(1);
      let rsss = await coinmarketcap(1);
      let nftday = rss.sumvolumeUsd;
      let sales = rss.sumsales;
      let nftmarketvalue = rss.market_cap;
      sales = parseFloat(sales);
      sales = sales.toLocaleString('en-US');
      nftday = parseFloat(nftday);
      nftday = nftday.toLocaleString('en-US');
      nftmarketvalue = parseFloat(nftmarketvalue);
      nftmarketvalue = nftmarketvalue.toLocaleString('en-US');
      setworldNftDayssetamount(sales);
      setworldsalessetamount(nftday);
      setmarketcapsetamount(nftmarketvalue);
    }
  }, [worldNftDays, worldVolume]);

  const funcsetWorldNftDays = (opt) => {
    setWorldNftDays(opt);
    setworldwidestatus(1);
  };
  const funsetWorldVolume = (opt) => {
    setWorldVolume(opt);
    setworldwidestatus(2);
  };

  return (
    <div className="hub-page-inner">
      <Helmet>
        <meta property="og:url" content={window.location.origin + '/hub'} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="METAHUB - NFT Market Statistics | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="NFT Statistics for Collections Across All Markets, Sales Volume, Last Sold, Best Sellers, Most Popular, Holders and more.."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/hub.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/hub" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/hub'}
        />
        <meta
          name="twitter:title"
          content="METAHUB - NFT Market Statistics | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="NFT Statistics for Collections Across All Markets, Sales Volume, Last Sold, Best Sellers, Most Popular, Holders and more.."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/hub.png'}
        />
        <title>METAHUB - NFT Market Statistics | MEDIA EYE </title>
        <meta
          name="description"
          content="NFT Statistics for Collections Across All Markets, Sales Volume, Last Sold, Best Sellers, Most Popular, Holders and more.."
        />
      </Helmet>

      <div className="hub-page-topbanner">
        <img
          className="hub-page-topbanner-img"
          src={isMobile ? '/img/hub_header_mobile.png' : '/img/hub_header2.png'}
          alt="hub banner"
        />
        <span className="hub-page-topbanner-title">METAHUB</span>
        <span className="hub-page-topbanner-blur">METAHUB</span>
      </div>

      <div className="hub-page-countvalue">
        <div className="mediaeye-layout-container hub-page-countvalue-setbox">
          <div className="hub-page-countvalue-setbox-countbox small">
            <div className="hub-page-countvalue-setbox-countbox-title">
              <span> MEDIAEYE</span>
              <div className="hub-page-countvalue-setbox-countbox-title-right">
                <SelectSearch
                  className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                  size="lg"
                  options={daysFilterOption2}
                  value={nftActiveDays}
                  onChange={(opt) => setNftActiveDays(opt)}
                />
              </div>
            </div>
            <div className="hub-page-countvalue-setbox-countbox-wrapper">
              <div className="hub-page-countvalue-setbox-countbox-wrapper-content">
                <span className="hub-page-countvalue-setbox-countbox-wrapper-content-description">
                  Number of NFTs sold
                </span>
                <span className="hub-page-countvalue-setbox-countbox-wrapper-content-time">
                  last 24 hours
                </span>
                <div className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue">
                  <span className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue-left">
                    39,026
                  </span>
                  <span className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue-right">
                    +56.055%
                  </span>
                </div>
              </div>
              <div className="hub-page-countvalue-setbox-countbox-wrapper-content second">
                <span className="hub-page-countvalue-setbox-countbox-wrapper-content-description">
                  Total Volume Traded
                </span>
                <span className="hub-page-countvalue-setbox-countbox-wrapper-content-time">
                  last 24 hours
                </span>
                <div className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue">
                  <span className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue-left">
                    20.7M
                  </span>
                  <span className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue-right">
                    +56.055%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="hub-page-countvalue-setbox-countbox">
            <div className="hub-page-countvalue-setbox-countbox-title">
              <span>WORLDWIDE</span>
              <div className="hub-page-countvalue-setbox-countbox-title-right">
                <SelectSearch
                  className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                  size="lg"
                  options={daysFilterOption2}
                  value={worldVolume}
                  onChange={(opt) => funsetWorldVolume(opt)}
                />
              </div>
            </div>
            <div className="hub-page-countvalue-setbox-countbox-wrapper">
              <div className="hub-page-countvalue-setbox-countbox-wrapper-content worldwide">
                <span className="hub-page-countvalue-setbox-countbox-wrapper-content-description">
                  Market Cap
                </span>
                <div className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue">
                  <span className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue-left">
                    ${worldmarketcapsetamount}
                  </span>
                </div>
              </div>
              <div className="hub-page-countvalue-setbox-countbox-wrapper-content worldwide m-l-20">
                <span className="hub-page-countvalue-setbox-countbox-wrapper-content-description">
                  Number of NFTs sold
                </span>
                <span className="hub-page-countvalue-setbox-countbox-wrapper-content-time">
                  {worldVolumeset}
                </span>
                <div className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue">
                  <span className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue-left">
                    {worldNftDayssetamount}
                  </span>
                </div>
              </div>
              <div className="hub-page-countvalue-setbox-countbox-wrapper-content worldwide second">
                <span className="hub-page-countvalue-setbox-countbox-wrapper-content-description">
                  Trading volume
                </span>
                <span className="hub-page-countvalue-setbox-countbox-wrapper-content-time">
                  {worldVolumeset}
                </span>
                <div className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue">
                  <span className="hub-page-countvalue-setbox-countbox-wrapper-content-digitvalue-left">
                    ${worldsalessetamount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mediaeye-layout-container">
        <TopCollection />
        {/* <div className="m-t-20 text-center">
          <Link to="/top-collection" className="btn btn-creative btn-sm btn-more">
            SEE ALL
          </Link>
        </div> */}
      </div>

      <div className="mediaeye-layout-container">
        <TopNftSale />
      </div>
      <div className="mediaeye-layout-section withspace">
        <div className="mediaeye-layout-container hub-page-blockwrapper">
          <div className="mediaeye-layout-container hub-page-blockwrapper-blocks">
            <BlockchainsByNftSales />
          </div>
          <div className="mediaeye-layout-container hub-page-blockwrapper-blocks">
            <PopularTranding days={activeDaysTrending} />
          </div>
        </div>
      </div>

      <div className="mediaeye-layout-section withspace" ref={myRef}>
        <GraphandCharts activeId={activeDropdown} />
      </div>
    </div>
  );
};

export default HubMain;
