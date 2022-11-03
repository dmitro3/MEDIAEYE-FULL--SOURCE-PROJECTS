import React, { useEffect } from 'react';
import CollectionComponent from '../components/CreateProduct/Collection/Collection';
import ReactTooltip from 'react-tooltip';

const Collection = (props) => {
  const { closeNftCollapse, darkTheme } = props;

  useEffect(() => {
    ReactTooltip.hide();
  }, []);

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="create-collection-page mediaeye-layout-content"
      >
        <CollectionComponent darkTheme={darkTheme} />
      </div>
    </React.Fragment>
  );
};

export default Collection;
