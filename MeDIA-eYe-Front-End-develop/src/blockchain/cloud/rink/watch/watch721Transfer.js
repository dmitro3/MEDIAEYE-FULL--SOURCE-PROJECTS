Moralis.Cloud.define('Watch721Transfer', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Watch 721 Transfer--------------------------------'
  );

  let options = {
    chainId: '0x4',
    address: '',
    topic: 'Transfer(address,address,uint256)',
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256'
        }
      ],
      name: 'Transfer',
      type: 'event'
    },
    tableName: 'EventTransfer',
    sync_historical: false
  };
  // unwatch event that has TABLE_NAME as table in the database
  options = { tableName: 'EventTransfer' };
  Moralis.Cloud.run('unwatchContractEvent', options, { useMasterKey: true });
  //Moralis.Cloud.run('watchContractEvent', options, { useMasterKey: true });
});
