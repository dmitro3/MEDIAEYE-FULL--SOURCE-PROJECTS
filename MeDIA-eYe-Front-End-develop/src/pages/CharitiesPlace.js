import React from 'react';
import CharitiesPlaceMain from '../components/Charity/CharitiesPlace/CharitiesPlace';

const CharitiesPlace = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content mediaeye-charity"
      >
        <CharitiesPlaceMain />
      </div>
    </React.Fragment>
  );
};

export default CharitiesPlace;
