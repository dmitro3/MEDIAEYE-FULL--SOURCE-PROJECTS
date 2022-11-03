import React, { useEffect } from 'react';
import Jumbomint from '../components/CreateProduct/Jumbomint/Jumbomint';
import ReactTooltip from 'react-tooltip';
const CreateJumboMintProduct = (props) => {
  const { closeNftCollapse } = props;

  useEffect(() => {
    ReactTooltip.hide();
  }, []);

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content create-jumbo-mint-page"
      >
        <Jumbomint />
      </div>
    </React.Fragment>
  );
};

export default CreateJumboMintProduct;
