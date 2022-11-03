import React, { useEffect, useState } from 'react';
import './GraphandCharts.scss';
import { useHistory } from 'react-router-dom';
import { getDoc, doc } from '@firebase/firestore';
import db from '../../../firebase.config';
import { Chart } from '../../Stats/Chart/Chart';

export default function GraphandCharts(props) {
  const [Period, setPeriod] = useState('24h');
  const [activeTab, setActiveTab] = useState('mediaeye-sold');
  const [value, setValue] = useState([]);
  const [label, setLabel] = useState([]);
  const [title, setTitle] = useState('');
  const [reinstations, setReinstations] = useState(false);

  useEffect(() => {
    if (props.activeId) {
      if (props.activeId === 1) {
        setActiveTab('mediaeye-sold');
      } else {
        if (props.activeId === 2) {
          setActiveTab('mediaeye-traded');
        } else {
          if (props.activeId === 3) {
            setActiveTab('nft-worldwide');
          } else {
            if (props.activeId === 4) {
              setActiveTab('trading-worldwide');
            }
          }
        }
      }
      // console.log(props.activeDropdown,"and",activeTab);
    }
  });

  useEffect(() => {
    setReinstations(false);
    if (activeTab === 'mediaeye-sold') {
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
    } else if (activeTab === 'mediaeye-traded') {
      setTitle('Trading Volume');
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
    } else if (activeTab === 'nft-worldwide') {
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
    } else if (activeTab === 'trading-worldwide') {
      setTitle('Trading Volume');
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

  const changeGraphType = (type) => {
    setActiveTab(type);
    console.log(type, 'type');
    setPeriod('24h');
  };

  return (
    <div className="mediaeye-layout-container graph-charts-page">
      <div className="mediaeye-layout-section-header">
        <h2 className="mediaeye-layout-section-header-heading text-center">
          Graphs
        </h2>
      </div>
      <div className="mediaeye-layout-container">
        <div className="mediaeye-tabss">
          <div className="mediaeye-tabss-lists">
            <button
              className={activeTab === 'mediaeye-sold' ? 'active-tab' : ''}
              onClick={() => changeGraphType('mediaeye-sold')}
            >
              <span className="tab-lists-txt">MEDIA EYE NFTs Sold</span>
              <div className="tab-lists-line"></div>
            </button>
            <button
              className={activeTab === 'mediaeye-traded' ? 'active-tab' : ''}
              onClick={() => changeGraphType('mediaeye-traded')}
            >
              <span className="tab-lists-txt">
                MEDIA EYE Total Volume Traded
              </span>
              <div className="tab-lists-line"></div>
            </button>
            <button
              className={activeTab === 'nft-worldwide' ? 'active-tab' : ''}
              onClick={() => changeGraphType('nft-worldwide')}
            >
              <span className="tab-lists-txt">WORLD WIDE NFTs Sold</span>
              <div className="tab-lists-line"></div>
            </button>
            <button
              className={activeTab === 'trading-worldwide' ? 'active-tab' : ''}
              onClick={() => changeGraphType('trading-worldwide')}
            >
              <span className="tab-lists-txt">
                WORLD WIDE Total Volume Traded
              </span>
              <div className="tab-lists-line"></div>
            </button>
          </div>
        </div>

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
                    className={Period === '90d' ? 'active' : null}
                    onClick={() => setPeriod('90d')}
                  >
                    90d
                  </button>
                  <button
                    className={Period === '180d' ? 'active' : null}
                    onClick={() => setPeriod('180d')}
                  >
                    180d
                  </button>
                  <button
                    className={Period === '1y' ? 'active' : null}
                    onClick={() => setPeriod('1y')}
                  >
                    1y
                  </button>
                  <button
                    className={Period === 'Max' ? 'active' : null}
                    onClick={() => setPeriod('Max')}
                  >
                    Max
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
  );
}
