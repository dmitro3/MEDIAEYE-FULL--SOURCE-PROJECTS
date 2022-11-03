import React, { useEffect, useState } from 'react';
import AirdropBlock from '../AirdropBlock/AirdropBlock';
import { AirdropJson } from '../../../utils/JsonData';

export default function AirdropWithBounties(props) {
  const airdropData = AirdropJson();
  return (
    <>
      <div className="mediaeye-airdrop-row">
        {airdropData.map((airdrop, i) => (
          <AirdropBlock airdrop={airdrop} key={i} />
        ))}
      </div>
    </>
  );
}
