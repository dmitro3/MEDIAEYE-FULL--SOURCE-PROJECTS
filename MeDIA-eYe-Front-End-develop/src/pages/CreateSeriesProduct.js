import React from 'react';
import Series from '../components/CreateProduct/Series/Series';

const CreateSeriesProduct = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div onClick={closeNftCollapse}>
        <Series />
      </div>
    </React.Fragment>
  );
};

export default CreateSeriesProduct;
