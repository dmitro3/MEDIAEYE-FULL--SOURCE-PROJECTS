import React from 'react';
import { Grid } from '../Icons/';

const CollectionCardSmall = (props) => {
  const { collection } = props;

  return (
    <>
      <div className="Card-box">
        <div className="Card-box-top">
          <h5>{collection?.title}</h5>
          <div className="Card-box-top-right">
            <Grid />
            10/1000
          </div>
        </div>
        <div className="Card-box-body">
          <div className="Card-box-body-img">
            <img src={collection?.img} alt={collection?.title} />
            <span>SPOTLIGHT</span>
          </div>
          <div className="Card-box-body-right">
            <div className="Card-box-body-right-row">
              <span className="text-semitransperant">{collection?.desc}</span>
            </div>
            <div className="Card-box-body-right-row">
              <span>Watchlisting</span>
              <span>{collection?.Watchlisting}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionCardSmall;
