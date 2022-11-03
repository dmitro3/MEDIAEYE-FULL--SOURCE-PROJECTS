import React from 'react';
import CreatorMenu from '../CreatorMenu/CreatorMenu';
import CreatorsAccountHeader from '../CreatorsAccountHeader/CreatorsAccountHeader';

const CreatorAccount = (props) => {
  const { user } = props;
  return (
    <div className="creator_account_main">
      <CreatorsAccountHeader user={user} />
      <CreatorMenu user={user} active="onsale" />
    </div>
  );
};

export default CreatorAccount;
