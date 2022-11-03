import React from 'react';
import { Grid } from '../../Icons/';

//media and imaged

import Token from '../../../assets/img/token/34/ETH.png';

const CollectionCardSmall = (props) => {
  const { collection } = props;

  return (
    <>
      <div className="Card-box">
        <div className="Card-box-img">
          <img src={collection?.img} alt={collection?.title} />
        </div>
        <div className="Card-box-right">
          <div className="Card-box-right-head">
            <h5>{collection?.title}</h5>
          </div>
          <p>
            Drop Date: <span>{collection?.datedrop}</span>
          </p>
          <p className="Card-box-right-icon-sm">
            <Grid />
            10/1000
          </p>
          <div className="Card-box-right-icon">
            <p>
              <span>Watching: </span>2 327
            </p>
            <div className="Card-box-right-icon-sm">
              <span>Sales: </span>
              <img src={Token} alt="Token" /> 27
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionCardSmall;
