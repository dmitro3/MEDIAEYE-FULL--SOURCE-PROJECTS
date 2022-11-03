Moralis.Cloud.define('Watch721MintFTM', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Watch 721 Mint FTM--------------------------------'
  );

  let options = {
    chainId: '0xfa',
    address: '',
    description: 'ERC721 Mint FTM',
    topic:
      'MediaEyeERC721Mint(address,uint256[],uint256,address,uint256,string[],string[])',
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
          internalType: 'uint256[]',
          name: 'tokenIDs',
          type: 'uint256[]'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'minter',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'string[]',
          name: 'tokenDatas',
          type: 'string[]'
        },
        {
          indexed: false,
          internalType: 'string[]',
          name: 'metadataURIs',
          type: 'string[]'
        }
      ],
      name: 'MediaEyeERC721Mint',
      type: 'event'
    },
    tableName: 'EventFTMMintSevenTwoOne',
    sync_historical: true
  };
  Moralis.Cloud.run('watchContractEvent', options, { useMasterKey: true });
  /* unwatch event that has TABLE_NAME as table in the database
  let options2 = { tableName: 'EventFTMMintSevenTwoOne' };
  Moralis.Cloud.run('unwatchContractEvent', options2, { useMasterKey: true });*/
});
