import React, { useEffect } from 'react';
//import CollectionComponent from '../components/CreateProduct/Collection/Collection';
import GenerativeCollection from '../components/CreateProduct/GenerativeCollection/GenerativeCollection';
import ReactTooltip from 'react-tooltip';

const GenerativeCollectionCreate = (props) => {
  const { closeNftCollapse } = props;

  useEffect(() => {
    ReactTooltip.hide();
  }, []);

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="create-generative-collection-page mediaeye-layout-content"
      >
        <GenerativeCollection
          socket={props.socket}
          downloadable={props.downloadable}
          generatedData={props.generatedData}
        />
      </div>
    </React.Fragment>
  );
};

export default GenerativeCollectionCreate;
