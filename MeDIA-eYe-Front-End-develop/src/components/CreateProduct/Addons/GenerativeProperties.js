import React, { useState, useEffect } from 'react';
import './MintAddon.scss';
import { useSelector } from 'react-redux';

import Properties from '../../Icons/Properties';
import Levels from '../../Icons/Levels';
import Stats from '../../Icons/Stats';
import { PlusSquare, Close } from '../../Icons/';
import { allowOnlyNumber } from '../../../blockchain/functions/Utils';
const GenerativeProperties = (props) => {
  const { changeAddons, addonsdata, limit } = props;
  const [useAddonType, setuseAddonType] = useState('');
  const [properties, setProperties] = useState([]);
  const [ChangeStats, setChangeStats] = useState(0);
  const [addonlimit, setAddonlimit] = useState(0);
  useEffect(() => {
    if (changeAddons) {
      changeAddons({ properties: properties });
    }
  }, [ChangeStats]);

  useEffect(() => {
    setAddonlimit(limit ? limit : 1);
  }, [limit]);

  useEffect(() => {
    if (addonlimit && properties?.length > 0) {
      for (let i = 0; i < properties?.length; i++) {
        if (addonlimit > i) {
          deleteProperties('properties', i);
        }
      }
    } else {
      setProperties([]);
    }
  }, [addonlimit]);

  useEffect(() => {
    setProperties(addonsdata?.properties ? addonsdata.properties : []);
  }, [addonsdata]);

  useEffect(() => {
    if (!useAddonType) {
      if (properties?.length > 0) {
        setuseAddonType('properties');
      }
    }
  }, [properties, useAddonType]);

  const addTaskField = async (type) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr.push({ trait_type: '', value: '' });
      setProperties(arr);
    }
    showAddonsConent(type);
    setChangeStats(ChangeStats + 1);
  };

  const deleteProperties = (type, i) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr.splice(i, 1);
      setProperties(arr);
    }

    showAddonsConent(type);
    setChangeStats(ChangeStats + 1);
  };

  const handleAddonValueChange = (type, e, i) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr[i].value = e.target.value;
      setProperties(arr);
    }
    setChangeStats(ChangeStats + 1);
  };
  const handleAddonMaxValueChange = (type, e, i) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr[i].max_value = e.target.value;
      setProperties(arr);
    }
    setChangeStats(ChangeStats + 1);
  };

  const handleAddonTitleChange = (type, e, i) => {
    if (type === 'properties') {
      let arr = properties.slice();
      arr[i].trait_type = e.target.value;
      setProperties(arr);
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
              You can add up to {addonlimit} Properties
            </div>
            <div className="mint-addons-row-box-content">
              {showAddonsConent('properties')}
            </div>
            {properties.length < addonlimit ? (
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
      </div>
    </React.Fragment>
  );
};

export default GenerativeProperties;
