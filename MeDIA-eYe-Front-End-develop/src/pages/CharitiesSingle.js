import React from 'react';
import CharitiesSingleMain from '../components/Charity/CharitiesSingle/CharitiesSingle';

const CharitiesSingle = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content mediaeye-charitysingle"
      >
        <CharitiesSingleMain />
      </div>
    </React.Fragment>
  );
};

export default CharitiesSingle;
