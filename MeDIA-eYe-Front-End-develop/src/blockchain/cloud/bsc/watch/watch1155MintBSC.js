Moralis.Cloud.define('Watch1155MintBSC', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Watch 1155 Mint BSC--------------------------------'
  );

  let options = {
    chainId: '0x38',
    description: 'ERC1155 Mint BSC',
    address: '',
    topic:
      'MediaEyeERC1155Mint(address,uint256,uint256,address,uint256,string,string)',
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
          internalType: 'string',
          name: 'tokenData',
          type: 'string'
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'metadataURI',
          type: 'string'
        }
      ],
      name: 'MediaEyeERC1155Mint',
      type: 'event'
    },
    tableName: 'EventBSCMintOneOneFiveFive',
    sync_historical: true
  };
  Moralis.Cloud.run('watchContractEvent', options, { useMasterKey: true });
});
