Moralis.Cloud.define('queryPopularCollections', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------QUERY POPULAR COLLECTIONS--------------------------------'
  );
  const skip = request.params.skip;
  const limit = request.params.limit;
  const chainHex = request.params.chainHex;
  const pipeline = [
    { match: { chainHex: chainHex } },
    { group: { objectId: '$collectionAddress', count: { $sum: 1 } } },
    { sort: { count: -1 } },
    { skip: skip ?? 0 }, // if not specified, start at first
    { limit: limit ?? 8 } // if not specified, limit to 8
  ];

  const query = new Moralis.Query('LikesCollection');

  // get addresses of most popular collections
  const results = await query.aggregate(pipeline, { useMasterKey: true });

  const collections = [];
  for (let i = 0; i < results.length; i++) {
    const address = results[i].objectId;
    // get collection
    const Collection = Moralis.Object.extend('MediaEyeCollection');
    const collectionQuery = new Moralis.Query(Collection);
    collectionQuery.equalTo('collectionAddress', address);
    collectionQuery.equalTo('chainId', chainHex);
    const collection = await collectionQuery.first();
    collections.push(collection);
  }

  return collections;
});
