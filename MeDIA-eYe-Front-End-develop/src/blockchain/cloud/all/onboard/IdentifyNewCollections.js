Moralis.Cloud.define('identifyNewCollections', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Identify New Collections--------------------------------'
  );

  const collections = request.params.collections;
  const chainId = request.params.chainId;
  // query each collection, if it does not exist add collection
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  // query collection, if already exists, exit function.
  const query = new Moralis.Query(Collection);

  collections.forEach(async (colAddress) => {
    query.equalTo('collectionAddress', colAddress);
    query.equalTo('chainId', chainId);
    const colResult = await query.first();
    logger.info(colResult);
    // if collection does not exist run addCollection
    if (!colResult) {
      await Moralis.Cloud.run('addCollection', {
        colAddress: colAddress,
        chainId: chainId
      });
    }
  });

  return;
});
