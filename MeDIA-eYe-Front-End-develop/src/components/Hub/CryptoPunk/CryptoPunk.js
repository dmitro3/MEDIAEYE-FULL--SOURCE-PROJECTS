import React, { useEffect, useRef, useState } from 'react';
import SelectSearch from 'react-select-search';
import { InfoCircle, RightSideArrow } from '../../Icons';
import { Chart } from '../../Stats/Chart/Chart';
import GraphandCharts from '../HubGraphandCharts/GraphandCharts';
import './CryptoPunk.scss';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function CryptoPunk() {
  const [activeDays, setActiveDays] = useState(30);
  const [Period, setPeriod] = useState('24h');
  const [activeTab, setActiveTab] = useState('sales');
  const [value, setValue] = useState([]);
  const [label, setLabel] = useState([]);
  const [title, setTitle] = useState('');
  const [reinstations, setReinstations] = useState(false);

  const daysFilterOption = [
    {
      name: '1 d',
      value: 1
    },
    {
      name: '7 d',
      value: 7
    },
    {
      name: '30 d',
      value: 30
    }
  ];

  const [nftSoldValues, setNftSoldValues] = useState([
    33, 53, 505, 53, 312, 111, 245, 11, 41, 44, 65, 545, 511, 211, 83, 43, 199,
    53, 505, 41, 44, 65, 545, 511, 211, 83, 33, 53, 505, 41, 44, 65, 545, 511,
    211, 83, 43, 199, 53, 505, 41, 44, 65, 545, 511, 211
  ]);
  const [nftSoldLabels, setNftSoldLabels] = useState([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]);

  const changeGraphType = (type) => {
    setActiveTab(type);
    setPeriod('24h');
  };
  useEffect(() => {
    setReinstations(false);
    if (activeTab === 'sales') {
      setTitle('NFTs Sold');
      setValue([
        33, 53, 505, 53, 312, 111, 245, 11, 41, 44, 65, 545, 511, 211, 83, 43,
        199, 53, 505, 41, 44, 65, 545, 511, 211, 83, 33, 53, 505, 41, 44, 65,
        545, 511, 211, 83, 43, 199, 53, 505, 41, 44, 65, 545, 511, 211
      ]);
      setLabel([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ]);
    } else if (activeTab === 'buyers') {
      setTitle('NFT Trade Volume');
      setValue([
        33, 53, 505, 53, 312, 111, 245, 11, 41, 44, 65, 545, 511, 211, 83, 43,
        199, 53, 505, 41, 44, 65, 545, 511, 211, 83, 33, 53, 505, 41, 44, 65,
        545, 511, 211, 83, 43, 199, 53, 505, 41, 44, 65, 545, 511, 211
      ]);
      setLabel([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ]);
    } else if (activeTab === 'seller') {
      setTitle('NFTs Sold World Wide');
      setValue([
        33, 53, 505, 53, 312, 111, 245, 11, 41, 44, 65, 545, 511, 211, 83, 43,
        199, 53, 505, 41, 44, 65, 545, 511, 211, 83, 33, 53, 505, 41, 44, 65,
        545, 511, 211, 83, 43, 199, 53, 505, 41, 44, 65, 545, 511, 211
      ]);
      setLabel([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ]);
    } else if (activeTab === 'mint') {
      setTitle('Volume Trade World Wide');
      setValue([
        33, 53, 505, 53, 312, 111, 245, 11, 41, 44, 65, 545, 511, 211, 83, 43,
        199, 53, 505, 41, 44, 65, 545, 511, 211, 83, 33, 53, 505, 41, 44, 65,
        545, 511, 211, 83, 43, 199, 53, 505, 41, 44, 65, 545, 511, 211
      ]);
      setLabel([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ]);
    }
    setTimeout(function () {
      setReinstations(true);
    }, 100);
  }, [activeTab, Period]);

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  return (
    <div className="mediaeye-layout-content crypto-punk-page">
      <div className="mediaeye-layout-section-header text-center m-t-20">
        <h2 className="mediaeye-layout-section-header-heading">
          CryptoPunks Stats
        </h2>
      </div>
      <div className="mediaeye-layout-container crypto-punk-page-inner">
        <div className="crypto-punk-page-inner-topcards">
          <div className="crypto-punk-page-inner-topcards-card">
            <div className="crypto-punk-page-inner-topcards-card-head uppercase">
              <span>Today's sales volume</span>
              <InfoCircle type="outline-white" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-subtitle uppercase">
              Buyers
            </div>
            <div className="crypto-punk-page-inner-topcards-card-amount">
              $509,919
            </div>
            <div
              onClick={() => {
                executeScroll();
                setActiveTab('sales');
              }}
            >
              <img src="/img/graph.png" alt="Graph" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-bottom">
              <span className="crypto-punk-page-inner-topcards-card-bottom-first">
                MORE
              </span>
              <span>30 day trend</span>
            </div>
          </div>
          <div className="crypto-punk-page-inner-topcards-card">
            <div className="crypto-punk-page-inner-topcards-card-head uppercase">
              <span>Today's sales volume</span>
              <InfoCircle type="outline-white" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-subtitle uppercase">
              Buyers
            </div>
            <div className="crypto-punk-page-inner-topcards-card-amount">
              $509,919
            </div>
            <div
              onClick={() => {
                executeScroll();
                setActiveTab('buyers');
              }}
            >
              <img src="/img/graph.png" alt="Graph" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-bottom">
              <span className="crypto-punk-page-inner-topcards-card-bottom-first">
                MORE
              </span>
              <span>30 day trend</span>
            </div>
          </div>
          <div className="crypto-punk-page-inner-topcards-card">
            <div className="crypto-punk-page-inner-topcards-card-head uppercase">
              <span>Today's sales volume</span>
              <InfoCircle type="outline-white" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-subtitle uppercase">
              Buyers
            </div>
            <div className="crypto-punk-page-inner-topcards-card-amount">
              $509,919
            </div>
            <div
              onClick={() => {
                executeScroll();
                setActiveTab('seller');
              }}
            >
              <img src="/img/graph.png" alt="Graph" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-bottom">
              <span className="crypto-punk-page-inner-topcards-card-bottom-first">
                MORE
              </span>
              <span>30 day trend</span>
            </div>
          </div>
          <div className="crypto-punk-page-inner-topcards-card">
            <div className="crypto-punk-page-inner-topcards-card-head uppercase">
              <span>Today's sales volume</span>
              <InfoCircle type="outline-white" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-subtitle uppercase">
              Buyers
            </div>
            <div className="crypto-punk-page-inner-topcards-card-amount">
              $509,919
            </div>
            <div
              onClick={() => {
                executeScroll();
                setActiveTab('mint');
              }}
            >
              <img src="/img/graph.png" alt="Graph" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-bottom">
              <span className="crypto-punk-page-inner-topcards-card-bottom-first">
                MORE
              </span>
              <span>30 day trend</span>
            </div>
          </div>
          <div className="crypto-punk-page-inner-topcards-card">
            <div className="crypto-punk-page-inner-topcards-card-head uppercase">
              <span>Today's sales volume</span>
              <InfoCircle type="outline-white" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-subtitle uppercase">
              Buyers
            </div>
            <div className="crypto-punk-page-inner-topcards-card-amount">
              $509,919
            </div>
            <div
              onClick={() => {
                executeScroll();
                setActiveTab('mints');
              }}
            >
              <img src="/img/graph.png" alt="Graph" />
            </div>
            <div className="crypto-punk-page-inner-topcards-card-bottom">
              <span className="crypto-punk-page-inner-topcards-card-bottom-first">
                MORE
              </span>
              <span>30 day trend</span>
            </div>
          </div>
        </div>
        <div className="crypto-punk-page-inner-livesales">
          <div className="crypto-punk-page-inner-livesales-header text-center m-t-20">
            <span>Live Sales</span>
            <div className="mediaeye-select-poptrend days-filter">
              <SelectSearch
                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                size="lg"
                options={daysFilterOption}
                value={activeDays}
                onChange={(opt) => setActiveDays(opt)}
              />
            </div>
          </div>
          <div className="crypto-punk-page-inner-livesales-content">
            <table>
              <thead>
                <tr>
                  <th className="crypto-punk-page-inner-livesales-content-srno"></th>
                  <th>
                    <span>NFT</span>
                  </th>
                  <th>Sold</th>
                  <th>Price</th>
                  <th className="crypto-punk-page-inner-livesales-content-buyerseller">
                    Seller <RightSideArrow /> Buyer
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    1
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic1.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div>
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    2
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic2.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div>
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    3
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic3.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div>
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    4
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic4.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div>
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    5
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic5.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-price">
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    6
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic1.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div>
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    7
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic2.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div>
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    8
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic3.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div>
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    9
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic4.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div>
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-gray crypto-punk-page-inner-livesales-content-srno">
                    10
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-collection">
                      <img src="/img/saleIcons/pic5.png" alt="SaleIcon" />
                      <div className="crypto-punk-page-inner-livesales-content-collection-titles">
                        <span className="text-gray crypto-punk-page-inner-livesales-content-collection-titles-text">
                          Baby Wealthy Club
                        </span>
                        <span>Baby Wealthy Club #7597</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray">5 hours ago</span>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-price">
                      <span className="m-r-20">$ 19,833,650.00</span>
                      <span>1,000.00 BABY</span>
                    </div>
                  </td>
                  <td>
                    <div className="crypto-punk-page-inner-livesales-content-last">
                      <span>0xbD...5e35</span>
                      <RightSideArrow />
                      <span> 0x74...a0Ef</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="crypto-punk-page-inner-mintandmarketplace">
          <div className="crypto-punk-page-inner-mintandmarketplace-mp">
            <span className="crypto-punk-page-inner-mintandmarketplace-mp-header">
              Live Marketplace
            </span>
            <div className="mediaeyefancyScroll">
              <div className="crypto-punk-page-inner-mintandmarketplace-mp-data">
                <table>
                  <thead>
                    <tr>
                      <th className="crypto-punk-page-inner-mintandmarketplace-mp-data-srno"></th>
                      <th>
                        <span>NFT</span>
                      </th>
                      <th>Listed:</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-srno">
                        1
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection">
                          <img src="/img/saleIcons/pic1.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">1 month ago</span>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-price">
                          <span className="m-r-20">281.0000 ETH</span>
                          <span>$355,809.48</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-srno">
                        2
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection">
                          <img src="/img/saleIcons/pic2.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">1 month ago</span>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-price">
                          <span className="m-r-20">281.0000 ETH</span>
                          <span>$355,809.48</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-srno">
                        3
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection">
                          <img src="/img/saleIcons/pic3.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">1 month ago</span>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-price">
                          <span className="m-r-20">281.0000 ETH</span>
                          <span>$355,809.48</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-srno">
                        4
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection">
                          <img src="/img/saleIcons/pic4.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">1 month ago</span>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-price">
                          <span className="m-r-20">281.0000 ETH</span>
                          <span>$355,809.48</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-srno">
                        5
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection">
                          <img src="/img/saleIcons/pic5.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mp-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">1 month ago</span>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mp-data-price">
                          <span className="m-r-20">281.0000 ETH</span>
                          <span>$355,809.48</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="crypto-punk-page-inner-mintandmarketplace-mp-bottom">
              <button type="button" className="btn btn-creative">
                Explore All Market Listings
              </button>
            </div>
          </div>
          <div className="crypto-punk-page-inner-mintandmarketplace-mint">
            <span className="crypto-punk-page-inner-mintandmarketplace-mint-header">
              Live Mints
            </span>
            <div className="mediaeyefancyScroll">
              <div className="crypto-punk-page-inner-mintandmarketplace-mint-data">
                <table>
                  <thead>
                    <tr>
                      <th className="crypto-punk-page-inner-mintandmarketplace-mint-data-srno"></th>
                      <th>
                        <span>NFT</span>
                      </th>
                      <th>Minted:</th>
                      <th>Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-srno">
                        1
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection">
                          <img src="/img/saleIcons/pic1.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-minted">
                          <img src="/img/token/34/ETH.png" alt="ETH" />
                          <span>14.5</span>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-price">
                          0x6c4156...2c0e8e
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-srno">
                        2
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection">
                          <img src="/img/saleIcons/pic2.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-minted">
                          <img src="/img/token/34/ETH.png" alt="ETH" />
                          <span>14.5</span>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-price">
                          0x6c4156...2c0e8e
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-srno">
                        3
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection">
                          <img src="/img/saleIcons/pic3.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-minted">
                          <img src="/img/token/34/ETH.png" alt="ETH" />
                          <span>14.5</span>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-price">
                          0x6c4156...2c0e8e
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-srno">
                        4
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection">
                          <img src="/img/saleIcons/pic4.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-minted">
                          <img src="/img/token/34/ETH.png" alt="ETH" />
                          <span>14.5</span>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-price">
                          0x6c4156...2c0e8e
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-srno">
                        5
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection">
                          <img src="/img/saleIcons/pic5.png" alt="SaleIcon" />
                          <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles">
                            <span className="text-gray crypto-punk-page-inner-mintandmarketplace-mint-data-collection-titles-text">
                              Baby Wealthy Club
                            </span>
                            <span>Baby Wealthy Club #7597</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-minted">
                          <img src="/img/token/34/ETH.png" alt="ETH" />
                          <span>14.5</span>
                        </div>
                      </td>
                      <td>
                        <div className="crypto-punk-page-inner-mintandmarketplace-mint-data-price">
                          0x6c4156...2c0e8e
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="crypto-punk-page-inner-mintandmarketplace-mint-bottom">
              <button type="button" className="btn btn-creative">
                Explore All Mints
              </button>
            </div>
          </div>
        </div>

        {/* //////////////////////////////////// */}

        <div className="crypto-punk-page-inner-topsellerbuyer">
          <div className="crypto-punk-page-inner-topsellerbuyer-buyer">
            <span className="crypto-punk-page-inner-topsellerbuyer-buyer-header">
              Top Market Buyers (Last 3 Days)
            </span>
            <div className="mediaeyefancyScroll">
              <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data">
                <table>
                  <thead>
                    <tr>
                      <th className="crypto-punk-page-inner-topsellerbuyer-buyer-data-srno">
                        Buyer
                      </th>
                      <th>
                        <span>Amount</span>
                      </th>
                      <th>USD</th>
                      <th>Purchases</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-buyer-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="crypto-punk-page-inner-topsellerbuyer-seller">
            <span className="crypto-punk-page-inner-topsellerbuyer-seller-header">
              Top Sellers (Last 3 Days)
            </span>
            <div className="mediaeyefancyScroll">
              <div className="crypto-punk-page-inner-topsellerbuyer-seller-data">
                <table>
                  <thead>
                    <tr>
                      <th className="crypto-punk-page-inner-topsellerbuyer-seller-data-srno">
                        Seller
                      </th>
                      <th>
                        <span>Amount</span>
                      </th>
                      <th>USD</th>
                      <th>Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray">0x1919db...63e685</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-collection">
                          519.91960 ETH
                        </div>
                      </td>
                      <td>$635,599.90</td>
                      <td>
                        <div className="crypto-punk-page-inner-topsellerbuyer-seller-data-price">
                          8
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="crypto-punk-page-inner-graphs" ref={myRef}>
          <div className="crypto-punk-page-inner-graphs-header text-center">
            <span>Graphs & Charts</span>
          </div>
          <div className="crypto-punk-page-inner-graphs-inner">
            <div className="mediaeye-tabss">
              <div className="mediaeye-tabss-lists">
                <button
                  className={activeTab === 'sales' ? 'active-tab' : ''}
                  onClick={() => changeGraphType('sales')}
                >
                  <span className="tab-lists-txt"> Today's Sales Volume</span>
                  <div className="tab-lists-line"></div>
                </button>
                <button
                  className={activeTab === 'buyers' ? 'active-tab' : ''}
                  onClick={() => changeGraphType('buyers')}
                >
                  <span className="tab-lists-txt">Today's Market Buyers</span>
                  <div className="tab-lists-line"></div>
                </button>
                <button
                  className={activeTab === 'seller' ? 'active-tab' : ''}
                  onClick={() => changeGraphType('seller')}
                >
                  <span className="tab-lists-txt">Today's Market Sellers</span>
                  <div className="tab-lists-line"></div>
                </button>
                <button
                  className={activeTab === 'mint' ? 'active-tab' : ''}
                  onClick={() => changeGraphType('mint')}
                >
                  <span className="tab-lists-txt">Today's Mints</span>
                  <div className="tab-lists-line"></div>
                </button>
              </div>
            </div>
            <div>
              <div className="graph-charts-page-graph">
                <div className="graph-charts-page-graph-charts">
                  <div className="graph-charts-page-graph-charts-holder">
                    <div className="graph-charts-page-graph-charts-holder-sold">
                      <div className="graph-charts-page-graph-charts-holder-sold-header">
                        <button
                          className={Period === '24h' ? 'active' : null}
                          onClick={() => setPeriod('24h')}
                        >
                          24h
                        </button>
                        <button
                          className={Period === '7d' ? 'active' : null}
                          onClick={() => setPeriod('7d')}
                        >
                          7d
                        </button>
                        <button
                          className={Period === '14d' ? 'active' : null}
                          onClick={() => setPeriod('14d')}
                        >
                          14d
                        </button>
                        <button
                          className={Period === '30d' ? 'active' : null}
                          onClick={() => setPeriod('30d')}
                        >
                          30d
                        </button>

                        <button
                          className={Period === 'All' ? 'active' : null}
                          onClick={() => setPeriod('All')}
                        >
                          All
                        </button>
                      </div>

                      {reinstations && value && label ? (
                        <Chart title={title} values={value} labels={label} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
