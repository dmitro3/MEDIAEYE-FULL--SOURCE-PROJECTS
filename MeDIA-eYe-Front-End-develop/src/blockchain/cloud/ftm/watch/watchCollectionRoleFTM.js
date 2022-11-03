Moralis.Cloud.define('WatchCollectionRoleFTM', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Watch Collection Role FTM--------------------------------'
  );

  let options = {
    chainId: '0xfa',
    description: 'Collection Role FTM',
    address: '',
    topic: 'MediaEyeCollectionRole(address,bytes32,address,uint256,bool)',
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
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32'
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
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
          internalType: 'bool',
          name: 'isGranted',
          type: 'bool'
        }
      ],
      name: 'MediaEyeCollectionRole',
      type: 'event'
    },
    tableName: 'EventFTMCollectionRole',
    sync_historical: true
  };

  Moralis.Cloud.run('watchContractEvent', options, { useMasterKey: true });
});
