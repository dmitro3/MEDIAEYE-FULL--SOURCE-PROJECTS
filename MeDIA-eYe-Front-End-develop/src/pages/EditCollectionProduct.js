import React from 'react';
import EditCollectionComponent from '../components/EditProduct/Collection/EditCollection';

const Collection = (props) => {
  const { closeNftCollapse, darkTheme } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content edit-collection-page"
      >
        <EditCollectionComponent darkTheme={darkTheme} />
      </div>
    </React.Fragment>
  );
};

export default Collection;
