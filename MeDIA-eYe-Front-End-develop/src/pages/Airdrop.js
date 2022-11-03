import React, { useEffect, useState } from 'react';
import TokenAirdrop from '../components/Airdrop/Token/Token';
import { useHistory, useParams } from 'react-router-dom';
import { queryAirdrop } from '../blockchain/functions/Airdrops';
import { useMoralis } from 'react-moralis';
import { ChainHexString } from '../blockchain/functions/ChangeChain';

const Airdrop = (props) => {
  const { closeNftCollapse } = props;
  const { chain, airdropId } = useParams();
  const { Moralis } = useMoralis();
  const [airdrop, setAirdrop] = useState(null);

  useEffect(() => {
    if (chain && airdropId && Moralis.provider) {
      getAirdrop();
    }
  }, [chain, airdropId, Moralis.provider]);

  const getAirdrop = async () => {
    const airdrop = await queryAirdrop(Moralis, {
      chainId: ChainHexString(chain),
      airdropId: airdropId
    });
    setAirdrop(airdrop);
  };

  return (
    <React.Fragment>
      <div onClick={closeNftCollapse} className="feature_airdrop">
        <TokenAirdrop airdrop={airdrop} Moralis={Moralis} />
      </div>
    </React.Fragment>
  );
};

export default Airdrop;
