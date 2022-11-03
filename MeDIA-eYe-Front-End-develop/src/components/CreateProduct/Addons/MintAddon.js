import React, { useState, useEffect } from 'react';
import './MintAddon.scss';
import { useSelector } from 'react-redux';

import Properties from '../../Icons/Properties';
import Levels from '../../Icons/Levels';
import Stats from '../../Icons/Stats';
import { PlusSquare, Close } from '../../Icons/';
import { allowOnlyNumber } from '../../../blockchain/functions/Utils';
const MintAddon = (props) => {
  const { changeAddons, addonsdata } = props;
  const [useAddonType, setuseAddonType] = useState('');
  const [properties, setProperties] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stats, setStats] = useState([]);
  const [ChangeStats, setChangeStats] = useState(0);
  useEffect(() => {
    if (changeAddons) {
      changeAddons({ properties: properties, levels: levels, stats: stats });
    }
  }, [ChangeStats]);

  useEffect(() => {
    setProperties(addonsdata?.properties ? addonsdata.properties : []);
    setLevels(addonsdata?.levels ? addonsdata.levels : []);
    setStats(addonsdata?.stats ? addonsdata.stats : []);
  }, [addonsdata]);

  useEffect(() => {
    if (!useAddonType) {
      if (properties?.length > 0) {
        setuseAddonType('properties');
      } else if (levels?.length > 0) {
        setuseAddonType('levels');
      } else if (stats?.length > 0) {
        setuseAddonType('stats');
      }
    }
  }, [properties, levels, stats, useAddonType]);

  const addTaskField = async (type) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr.push({ trait_type: '', value: '' });
      setProperties(arr);
    } else if (type === 'levels') {
      let arr = levels.slice();
      arr.push({ trait_type: '', value: '', max_value: '' });
      setLevels(arr);
    } else if (type === 'stats') {
      let arr = stats.slice();
      arr.push({
        trait_type: '',
        value: '',
        max_value: '',
        display_type: 'number'
      });
      setStats(arr);
    }
    showAddonsConent(type);
    setChangeStats(ChangeStats + 1);
  };

  const deleteProperties = (type, i) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr.splice(i, 1);
      setProperties(arr);
    } else if (type === 'levels') {
      let arr = levels.slice();
      arr.splice(i, 1);
      setLevels(arr);
    } else if (type === 'stats') {
      let arr = stats.slice();
      arr.splice(i, 1);
      setStats(arr);
    }

    showAddonsConent(type);
    setChangeStats(ChangeStats + 1);
  };

  const handleAddonValueChange = (type, e, i) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr[i].value = e.target.value;
      setProperties(arr);
    } else if (type === 'levels') {
      let arr = levels.slice();
      arr[i].value = allowOnlyNumber(e.target.value, false);
      setLevels(arr);
    } else if (type === 'stats') {
      let arr = stats.slice();
      arr[i].value = allowOnlyNumber(e.target.value, false);
      setStats(arr);
    }
    setChangeStats(ChangeStats + 1);
  };
  const handleAddonMaxValueChange = (type, e, i) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr[i].max_value = e.target.value;
      setProperties(arr);
    } else if (type === 'levels') {
      let arr = levels.slice();
      arr[i].max_value = allowOnlyNumber(e.target.value, false);
      setLevels(arr);
    } else if (type === 'stats') {
      let arr = stats.slice();
      arr[i].max_value = allowOnlyNumber(e.target.value, false);
      setStats(arr);
    }
    setChangeStats(ChangeStats + 1);
  };

  const handleAddonTitleChange = (type, e, i) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr[i].trait_type = e.target.value;
      setProperties(arr);
    } else if (type === 'levels') {
      let arr = levels.slice();
      arr[i].trait_type = e.target.value;
      setLevels(arr);
    } else if (type === 'stats') {
      let arr = stats.slice();
      arr[i].trait_type = e.target.value;
      setStats(arr);
    }
    setChangeStats(ChangeStats + 1);
  };

  const showAddonsConent = (type) => {
    if (type === 'properties') {
      return properties.map((item, i) => (
        <div
          className="mint-addons-row-box-content-row"
          key={i + 'properties-list'}
        >
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-num">
            {i + 1}.
          </div>

          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-name">
            <input
              className="mint-addons-row-box-content-row-col-input"
              key={i + ' propertyname'}
              onChange={(e) => handleAddonTitleChange(type, e, i)}
              value={item.trait_type ? item.trait_type : ''}
            />
          </div>
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-name">
            <input
              className="mint-addons-row-box-content-row-col-input"
              key={i + ' propertiesvalue'}
              onChange={(e) => handleAddonValueChange(type, e, i)}
              value={item.value ? item.value : ''}
            />
          </div>
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-action">
            <button
              className="mint-addons-row-box-content-row-col-action-btn"
              onClick={() => deleteProperties(type, i)}
            >
              <Close />
            </button>
          </div>
        </div>
      ));
    } else if (type === 'stats') {
      return stats.map((item, i) => (
        <div className="mint-addons-row-box-content-row" key={i + 'stats-list'}>
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-num">
            {i + 1}.
          </div>

          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-name">
            <input
              className="mint-addons-row-box-content-row-col-input"
              key={i + 'statsname'}
              onChange={(e) => handleAddonTitleChange(type, e, i)}
              value={item.trait_type ? item.trait_type : ''}
            />
          </div>
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-labelvalue">
            Value
          </div>

          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-value">
            <input
              type="text"
              className="mint-addons-row-box-content-row-col-input text-right"
              key={i + ' statsvalue'}
              onChange={(e) => handleAddonValueChange(type, e, i)}
              value={item.value ? item.value : ''}
            />
          </div>
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-labelof">
            Of
          </div>
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-value">
            <input
              type="text"
              className="mint-addons-row-box-content-row-col-input text-right"
              key={i + ' statsvalueOf'}
              onChange={(e) => handleAddonMaxValueChange(type, e, i)}
              value={item.max_value ? item.max_value : ''}
            />
          </div>
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-action">
            <button
              className="mint-addons-row-box-content-row-col-action-btn"
              onClick={() => deleteProperties(type, i)}
            >
              <Close />
            </button>
          </div>
        </div>
      ));
    } else if (type === 'levels') {
      return levels.map((item, i) => (
        <div
          className="mint-addons-row-box-content-row"
          key={i + 'levels-list'}
        >
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-num">
            {i + 1}.
          </div>

          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-name">
            <input
              className="mint-addons-row-box-content-row-col-input"
              key={i + ' levelsname'}
              onChange={(e) => handleAddonTitleChange(type, e, i)}
              value={item.trait_type ? item.trait_type : ''}
            />
          </div>
          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-labelvalue">
            Value
          </div>

          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-value">
            <input
              type="text"
              className="mint-addons-row-box-content-row-col-input text-right"
              key={i + ' levelsvalue'}
              onChange={(e) => handleAddonValueChange(type, e, i)}
              value={item.value ? item.value : ''}
            />
          </div>

          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-labelof">
            Of
          </div>

          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-value">
            <input
              type="text"
              className="mint-addons-row-box-content-row-col-input text-right"
              key={i + 'levelsvalueOf'}
              onChange={(e) => handleAddonMaxValueChange(type, e, i)}
              value={item.max_value ? item.max_value : ''}
            />
          </div>

          <div className="mint-addons-row-box-content-row-col mint-addons-row-box-content-row-col-action">
            <button
              className="mint-addons-row-box-content-row-col-action-btn"
              onClick={() => deleteProperties(type, i)}
            >
              <Close />
            </button>
          </div>
        </div>
      ));
    }
  };
  return (
    <React.Fragment>
      <div className="mint-addons-row">
        <div className="mint-addons-row-col">
          <div className="mint-addons-row-box" type="properties">
            <div className="mint-addons-row-box-header">
              <Properties />
              PROPERTIES{' '}
              <span className="mint-addons-row-box-header-icon">
                <PlusSquare />
              </span>
            </div>
            <div className="mint-addons-row-box-line">
              You can add up to 20 Properties
            </div>
            <div className="mint-addons-row-box-content">
              {showAddonsConent('properties')}
            </div>
            {properties.length < 20 ? (
              <div className="mint-addons-row-box-bottom">
                <div
                  className="mint-addons-row-box-bottom-btn"
                  onClick={() => addTaskField('properties')}
                >
                  +
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="mint-addons-row-col">
          <div className="mint-addons-row-box" type="levels">
            <div className="mint-addons-row-box-header">
              <Levels /> LEVELS{' '}
              <span className="mint-addons-row-box-header-icon">
                <PlusSquare />
              </span>
            </div>
            <div className="mint-addons-row-box-line">
              You can add up to 10 Levels
            </div>
            <div className="mint-addons-row-box-content">
              <div className="mint-addons-row-box-content-list">
                {showAddonsConent('levels')}
                {levels.length < 10 ? (
                  <div className="mint-addons-row-box-bottom">
                    <div
                      className="mint-addons-row-box-bottom-btn"
                      onClick={() => addTaskField('levels')}
                    >
                      +
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mint-addons-row-box" type="stats">
            <div className="mint-addons-row-box-header">
              <Stats /> STATS{' '}
              <span className="mint-addons-row-box-header-icon">
                <PlusSquare />
              </span>
            </div>
            <div className="mint-addons-row-box-line">
              You can add up to 5 Stats
            </div>
            <div className="mint-addons-row-box-content">
              <div className="mint-addons-row-box-content-list">
                {showAddonsConent('stats')}
                {stats.length < 5 ? (
                  <div className="mint-addons-row-box-bottom">
                    <div
                      className="mint-addons-row-box-bottom-btn"
                      onClick={() => addTaskField('stats')}
                    >
                      +
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MintAddon;
