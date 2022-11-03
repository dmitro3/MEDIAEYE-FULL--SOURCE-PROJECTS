Moralis.Cloud.define('Watch721BurnBSCTest', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Watch 721 Burn BSC--------------------------------'
  );

  let options = {
    chainId: '0x61',
    address: '',
    description: 'ERC721 Burn BSC',
    topic: 'MediaEyeBurnNft721(address,uint256,address,uint256)',
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'tokenAddress',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokenID',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'burner',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        }
      ],
      name: 'MediaEyeBurnNft721',
      type: 'event'
    },
    tableName: 'EventBSCBurnSevenTwoOneTest',
    sync_historical: false
  };
  Moralis.Cloud.run('watchContractEvent', options, { useMasterKey: true });
  /* unwatch event that has TABLE_NAME as table in the database
  let options2 = { tableName: 'EventBSCBurnSevenTwoOne' };
  Moralis.Cloud.run('unwatchContractEvent', options2, { useMasterKey: true });*/
});
