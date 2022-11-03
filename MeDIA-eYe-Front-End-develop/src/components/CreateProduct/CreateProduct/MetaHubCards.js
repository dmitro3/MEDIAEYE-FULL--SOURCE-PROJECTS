import React, { useEffect, useState } from 'react';
import SelectSearch from 'react-select-search';
import { coinmarketcap } from '../../../blockchain/functions/Hub/hubcollection';
import './LandingPage.scss';

const timeDuration = [
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

export default function MetaHubCards() {
  const [activeDays, setActiveDays] = useState(24);
  const [worldNftDays, setWorldNftDays] = useState(24);
  const [worldNftDaysset, setworldNftDaysset] = useState('24 hours');
  const [worldNftDayssetamount, setworldNftDayssetamount] = useState();
  const [worldsalessetamount, setworldsalessetamount] = useState();
  const [worldVolume, setWorldVolume] = useState(24);
  const [worldwidestatus, setworldwidestatus] = useState(0);
  const [worldVolumeset, setworldVolumeset] = useState('24 hours');

  useEffect(async () => {
    if (worldwidestatus == 1) {
      var rss;
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

      var sales = rss.sumsales;
      sales = parseFloat(sales);
      sales = sales.toLocaleString('en-US');
      setworldNftDayssetamount(sales);
    } else if (worldwidestatus == 2) {
      var rss;
      if (worldVolume == 24) {
        setworldVolumeset('last 24 hours');
        rss = await coinmarketcap(1);
      }
      if (worldVolume == 7) {
        setworldVolumeset('last 7 days');
        rss = await coinmarketcap(2);
      }
      if (worldVolume == 30) {
        setworldVolumeset('last 30 days');
        rss = await coinmarketcap(3);
      }
      if (worldVolume == 'All') {
        setworldVolumeset('All time');
        rss = await coinmarketcap(4);
      }

      var nftday = rss?.sumvolumeUsd;
      nftday = parseFloat(nftday);
      nftday = nftday.toLocaleString('en-US');
      setworldsalessetamount(nftday);
    } else {
      var rss = await coinmarketcap(1);
      var nftday = rss?.sumvolumeUsd;
      var sales = rss?.sumsales;

      sales = parseFloat(sales);
      sales = sales.toLocaleString('en-US');
      nftday = parseFloat(nftday);
      nftday = nftday.toLocaleString('en-US');
      setworldNftDayssetamount(sales);
      setworldsalessetamount(nftday);
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
    <div className="landing-page-meta-metahub-section">
      <div className="landing-page-meta-metahub-section-content">
        <div className="landing-page-meta-metahub-section-content-felxbetween">
          <span className="name">MEDIA EYE</span>
          <SelectSearch
            className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
            size="lg"
            options={timeDuration}
            value={activeDays}
          // onChange={(opt) => funcsetWorldNftDays(opt)}
          />
        </div>
        <span className="m-t-20 font-18">Number of NFTs sold</span>
        <span className="text-gray">
          {activeDays == 24
            ? ' ' + activeDays + ' ' + 'hours'
            : ' ' + activeDays + ' ' + 'Days'}
        </span>
        <div className="landing-page-meta-metahub-section-content-felxbetween">
          <span className="number">39,026</span>
          {/* <span className="text-action">+56.055%</span> */}
        </div>
      </div>
      <div className="landing-page-meta-metahub-section-content">
        <div className="landing-page-meta-metahub-section-content-felxbetween">
          <span className="name">WORLDWIDE</span>
          <SelectSearch
            className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
            size="lg"
            options={timeDuration}
            value={activeDays}
            onChange={(opt) => funcsetWorldNftDays(opt)}
          />
        </div>
        <span className="m-t-20 font-18">Number of NFTs sold</span>
        <span className="text-gray">{worldNftDaysset}</span>
        <div className="landing-page-meta-metahub-section-content-felxbetween">
          <span className="number">{worldNftDayssetamount}</span>
          {/* <span className="text-danger">-156.5%</span> */}
        </div>
      </div>
    </div>
  );
}
