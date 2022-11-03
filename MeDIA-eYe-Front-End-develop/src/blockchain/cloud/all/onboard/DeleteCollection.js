Moralis.Cloud.define('deleteCollection', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------DELETE COLLECTION--------------------------------'
  );

  const colAddress = request.params.colAddress.toLowerCase();
  const chainId = request.params.chainId.toLowerCase();

  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const query = new Moralis.Query(Collection);
  query.equalTo('collectionAddress', colAddress);
  query.equalTo('chainId', chainId);
  const colResult = await query.first();

  Moralis.bulkDeleteMany('MediaEyeNFT', [
    {
      filter: { collectionAddress: colAddress, chainId: chainId }
    }
  ]);

  if (!colResult) {
    return 'ERROR: No Collection Found';
  }

  try {
    colResult.destroy();
    logger.info(
      `Collection DELETED with address: ${colResult?.attributes?.collectionAddress}`
    );
  } catch (e) {
    logger.info('ERROR: Cannot destroy collection' + JSON.stringify(e));
  }

  return;
});
