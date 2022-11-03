Moralis.Cloud.afterSave('CollectionSevenTwoOneEvent', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------After 721 Collection Created--------------------------------'
  );
  const collectionAddress = await request.object.get('addr');
  const tokenData = await request.object.get('tokenData');
  const collectionId = JSON.parse(tokenData).collectionId;

  //  save collection address into collection object
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const query = new Moralis.Query(Collection);
  query.equalTo('objectId', collectionId);
  const collectionResult = await query.first();
  collectionResult.set('collectionAddress', collectionAddress);
  await collectionResult.save();

  let options = {
    chainId: '0x4',
    address: collectionAddress,
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
    tableName: `ShardTransfer${collectionAddress}`,
    sync_historical: false
  };

  Moralis.Cloud.run('watchContractEvent', options, { useMasterKey: true });
});
