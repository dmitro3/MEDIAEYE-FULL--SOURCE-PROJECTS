import React from 'react';
import CharitiesRegistermain from '../components/Charity/CharitiesRegister/CharitiesRegister';

const CharitiesRegister = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div onClick={closeNftCollapse} className="mediaeye-layout-content">
        <CharitiesRegistermain />
      </div>
    </React.Fragment>
  );
};

export default CharitiesRegister;
