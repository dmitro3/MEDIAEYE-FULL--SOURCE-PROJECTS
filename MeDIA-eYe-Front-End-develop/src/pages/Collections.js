import React from 'react';
import CollectionsMain from '../components/Collections/Collections';

const Collections = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content collections-page"
      >
        <CollectionsMain />
      </div>
    </React.Fragment>
  );
};

export default Collections;
