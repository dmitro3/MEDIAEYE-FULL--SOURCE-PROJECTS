import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AirdropBlock from '../AirdropBlock/AirdropBlock';
import { AirdropJson } from '../../../utils/JsonData';
import { queryAirdrops } from '../../../blockchain/functions/Airdrops';
import { useMoralis } from 'react-moralis';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain';

const AirdropList = (props) => {
  const airdropData = AirdropJson();
  const { category } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { Moralis } = useMoralis();
  const [airdrops, setAirdrops] = useState(null);

  useEffect(() => {
    if (activeNetwork && Moralis.provider) {
      getAirdrops();
    }
  }, [activeNetwork, Moralis.provider]);

  const getAirdrops = async () => {
    const airdrops = await queryAirdrops(Moralis, {
      chainId: ChainHexString(activeNetwork),
      status: category ? category.toLowerCase() : null
    });
    setAirdrops(airdrops);
  };

  return (
    <>
      <div className="mediaeye-airdrop-row">
        {airdrops?.map((airdrop, i) => (
          <AirdropBlock airdrop={airdrop} key={i} />
        ))}
      </div>
    </>
  );
};

export default AirdropList;
