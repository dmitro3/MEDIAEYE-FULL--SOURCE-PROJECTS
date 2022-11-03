import { array } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Angle, FilterIcon } from '../../Icons';
import './FilterProperty.scss';

export default function FilterProperty(props) {
  const [allCollection, setAllCollection] = useState();
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    setAllCollection(props?.collection);
    applyValidation();
  });

  const property = [
    {
      name: 'Background',
      number: '3',
      values: [
        { item: 'Blue', number: '1000' },
        { item: 'Purple', number: '2500' },
        { item: 'White', number: '3500' }
      ]
    },
    {
      name: 'Body',
      number: '5',
      values: [
        { item: 'Legs', number: '3500' },
        { item: 'Eyes', number: '1000' },
        { item: 'Hands', number: '2500' }
      ]
    },
    {
      name: 'Hair',
      number: '2',
      values: [
        { item: 'Smooth', number: '1000' },
        { item: 'Curly', number: '2500' },
        { item: 'Straight', number: '3500' }
      ]
    },
    {
      name: 'Eyes',
      number: '14',
      values: [
        { item: 'Brown', number: '3500' },
        { item: 'Balck', number: '2500' },
        { item: 'Gray', number: '1000' }
      ]
    },
    {
      name: 'Character',
      number: '51',
      values: [
        { item: 'Blue', number: '2500' },
        { item: 'Purple', number: '1000' },
        { item: 'White', number: '3500' }
      ]
    },
    {
      name: 'Clothes',
      number: '11',
      values: [
        { item: 'Trandy', number: '3500' },
        { item: 'Fashionout', number: '2500' },
        { item: 'Gray', number: '1000' }
      ]
    },
    {
      name: 'Hat',
      number: '5',
      values: [
        { item: 'Fev', number: '2500' },
        { item: 'Sweat shirt', number: '1000' },
        { item: 'Pink', number: '3500' }
      ]
    }
  ];

  const levelStats = [
    {
      label: 'Levels',
      item1: 'Affinity',
      item2: 'Attack'
    },
    {
      label: 'Stats',
      item1: 'Evolution',
      item2: 'Generation'
    }
  ];

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openLevelStats, setOpenLevelStats] = useState(null);
  const [properties, setProperties] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');

  const toggleProperties = () => {
    setProperties(!properties);
  };

  const applyValidation = () => {
    let obj = props?.collection?.find(
      (i) => i?.value === 'Doodles' || i?.value === 'okayBears'
    );
    if (obj) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };
  const toggleLevelStat = (index) => {
    if (openLevelStats === index) {
      setOpenLevelStats(null);
    } else {
      setOpenLevelStats(index);
    }
  };
  const toggleAddValues = (prop) => {
    if (openDropdown === prop) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(prop);
    }
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <div className="mediaeye-property-filter">
      <div
        className="mediaeye-property-filter-title"
        onClick={toggleProperties}
      >
        <FilterIcon type={'property'} />
        {validation ? <div>Working</div> : null}
      </div>
      {properties ? (
        <div className="mediaeye-property-filter-dropdown">
          <div
            className="mediaeye-property-filter-dropdown-header"
            onClick={toggleProperties}
          >
            Properties
          </div>
          {property.map((item, i) => (
            <div className="mediaeye-property-filter-dropdown-block" key={i}>
              <div
                className="mediaeye-property-filter-dropdown-block-section"
                onClick={() => toggleDropdown(i)}
              >
                <span>{item.name}</span>
                <div
                  className={
                    i == activeDropdown
                      ? 'mediaeye-property-filter-dropdown-block-section-right active'
                      : 'mediaeye-property-filter-dropdown-block-section-right'
                  }
                >
                  <span>{item?.values?.length}</span>
                  <Angle side={'down'} />
                </div>
              </div>
              {i === activeDropdown
                ? item?.values.map((x, i) => (
                  <div
                    className="mediaeye-property-filter-dropdown-block-section2"
                    key={i}
                  >
                    <span>{x.item}</span>
                    <div className="mediaeye-property-filter-dropdown-block-section2-right2">
                      <span>{x.number}</span>
                      <input type="checkbox" />
                    </div>
                  </div>
                ))
                : null}
            </div>
          ))}
          {levelStats.map((item, i) => (
            <>
              <div
                className="mediaeye-property-filter-dropdown-block withoutbg"
                key={i}
                onClick={() => toggleLevelStat(i)}
              >
                <div className="mediaeye-property-filter-dropdown-block-section">
                  <sapn>{item.label}</sapn>
                  <div className={i === openLevelStats ? 'active' : ''}>
                    <Angle side={'down'} />
                  </div>
                </div>
              </div>
              {i === openLevelStats ? (
                <>
                  <div className="mediaeye-property-filter-dropdown-block">
                    <div
                      className="mediaeye-property-filter-dropdown-block-section"
                      onClick={() => toggleAddValues(1)}
                    >
                      <span>{item.item1}</span>
                      <div
                        className={
                          openDropdown === 1
                            ? 'mediaeye-property-filter-dropdown-block-section-right active'
                            : 'mediaeye-property-filter-dropdown-block-section-right'
                        }
                      >
                        <Angle side={'down'} />
                      </div>
                    </div>
                    {openDropdown === 1 ? (
                      <div className="mediaeye-property-filter-dropdown-block-levelstats">
                        <div className="mediaeye-property-filter-dropdown-block-levelstats-form">
                          <div className="mediaeyeform-group">
                            <div className="mediaeyeform-group-input">
                              <input
                                // value={name}
                                // onChange={(e) => changeName(e)}
                                placeholder="00"
                                className="mediaeyeform-input"
                              />
                            </div>
                          </div>
                          <span>to</span>
                          <div className="mediaeyeform-group">
                            <div className="mediaeyeform-group-input">
                              <input
                                // value={name}
                                // onChange={(e) => changeName(e)}
                                placeholder="00"
                                className="mediaeyeform-input"
                              />
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-info">Apply</button>
                      </div>
                    ) : null}
                  </div>
                  <div className="mediaeye-property-filter-dropdown-block">
                    <div
                      className="mediaeye-property-filter-dropdown-block-section"
                      onClick={() => toggleAddValues(2)}
                    >
                      <span>{item.item2}</span>
                      <div
                        className={
                          openDropdown === 2
                            ? 'mediaeye-property-filter-dropdown-block-section-right active'
                            : 'mediaeye-property-filter-dropdown-block-section-right'
                        }
                      >
                        <Angle side={'down'} />
                      </div>
                    </div>
                    {openDropdown === 2 ? (
                      <div className="mediaeye-property-filter-dropdown-block-levelstats">
                        <div className="mediaeye-property-filter-dropdown-block-levelstats-form">
                          <div className="mediaeyeform-group">
                            <div className="mediaeyeform-group-input">
                              <input
                                // value={name}
                                // onChange={(e) => changeName(e)}
                                placeholder="00"
                                className="mediaeyeform-input"
                              />
                            </div>
                          </div>
                          <span>to</span>
                          <div className="mediaeyeform-group">
                            <div className="mediaeyeform-group-input">
                              <input
                                // value={name}
                                // onChange={(e) => changeName(e)}
                                placeholder="00"
                                className="mediaeyeform-input"
                              />
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-info">Apply</button>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
            </>
          ))}
        </div>
      ) : null}
    </div>
  );
}
