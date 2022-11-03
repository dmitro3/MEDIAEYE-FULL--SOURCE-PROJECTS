import React, { useEffect } from 'react';
import Mint from '../components/CreateProduct/Mint/Mint';
import ReactTooltip from 'react-tooltip';

const CreateMintProduct = (props) => {
  const { closeNftCollapse } = props;

  useEffect(() => {
    ReactTooltip.hide();
  }, []);

  return (
    <React.Fragment>
      <div onClick={closeNftCollapse} className="mediaeye-layout-content">
        <Mint />
      </div>
    </React.Fragment>
  );
};

export default CreateMintProduct;
