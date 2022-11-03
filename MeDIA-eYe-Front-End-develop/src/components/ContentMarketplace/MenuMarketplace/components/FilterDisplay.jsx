import React from 'react';
import { Close } from '../../../Icons';
import '../MenuMarketplace.scss';

const FilterDisplay = (props) => {
  const { filter, label, removeFilter } = props;
  const isMulti = typeof filter === 'object';
  if (!isMulti) {
    return (
      <>
        {!isMulti && filter !== '' && (
          <>
            <div className="filter-handler">
              <div className="filter-handler-filter-block">
                <span className="filter-handler-filter-block-head">{`${label}`}</span>
                :
                <span className="filter-handler-filter-block-value">{`${filter}`}</span>
                <button onClick={() => removeFilter(label, filter, false)}>
                  <Close />
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
  if (isMulti && filter && filter.length > 0) {
    return (
      <div className="filter-handler">
        {isMulti &&
          filter.map((item) => (
            <div className="filter-handler-filter-block" key={item.value}>
              <span
                className="filter-handler-filter-block-head"
                style={{ textTransform: 'capitalize' }}
              >
                {label}
              </span>
              :{' '}
              <span className="filter-handler-filter-block-value">
                {item.value}
              </span>
              <button onClick={() => removeFilter(label, item, true)}>
                <Close />
              </button>
            </div>
          ))}
      </div>
    );
  }
  return null;
};

export default FilterDisplay;
