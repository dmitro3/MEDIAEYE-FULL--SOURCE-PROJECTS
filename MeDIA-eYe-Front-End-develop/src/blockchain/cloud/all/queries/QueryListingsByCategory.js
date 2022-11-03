Moralis.Cloud.define('queryListingsByCategory', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------QUERY LISTINGS BY CATEGORY--------------------------------'
  );
  const NFTs = Moralis.Object.extend('MediaEyeListingNFT');
  const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');
  const MediaEyeListing = Moralis.Object.extend('MediaEyeListing');

  const query2 = new Moralis.Query(NFTs);
  query2.include('nft');
  query2.include('parent');
  const innerQuery = new Moralis.Query(MediaEyeNFT);
  const parentQuery = new Moralis.Query(MediaEyeListing);
  // match chainId
  if (request.params.chainId)
    parentQuery.equalTo('chainId', request.params.chainId);
  // matches child nft object's category attribute
  if (request.params.category !== 'all')
    innerQuery.equalTo('category', request.params.category);
  // matches parent listing object's status attribute
  parentQuery.equalTo('status', 'available');
  query2.matchesQuery('nft', innerQuery);
  query2.matchesQuery('parent', parentQuery);
  // currently force most recent
  query2.descending('createdAt');

  const result = await query2.find();

  // takes only distinct/unique listing ids and pushes them to a new array
  const listingIds = result
    .map((item) => item.attributes.parent.id)
    .filter((value, index, self) => self.indexOf(value) === index);

  // default limit to 8 if no limit specified
  const limit = request?.params?.limit > 0 ? request.params.limit : 8;

  // skip index by page*limit
  const resultStart = request.params.page ? request.params.page * limit : 0;
  // limit
  const resultAmount = listingIds.length > limit ? limit : listingIds.length;
  const listingPromises = [];
  // TODO: badly needs optimization, or query needs to work with aggregate pipeline
  // query each listing individually
  for (let i = resultStart; i < resultAmount; i++) {
    if (i < listingIds.length - 1) {
      const listingQuery = new Moralis.Query(MediaEyeListing);
      listingQuery.equalTo('objectId', listingIds[i]);
      listingPromises.push(listingQuery.first());
    }
  }

  const result2 = await Promise.all(listingPromises);

  let listingsNFTs = [];
  for (let i = 0; i < result2.length; i++) {
    const listing = new MediaEyeListing();
    listing.set('id', result2[i].id);
    const query3 = new Moralis.Query(NFTs);
    query3.equalTo('parent', listing);
    query3.include('nft');
    const singleListingNFTs = await query3.find();
    listingsNFTs.push(singleListingNFTs);
  }
  //const result = await query2
  //.include('nfts')
  //.distinct('parent', { useMasterKey: true });

  /*const pipeline = [
    // match category with relation from MediaEyeListingNFT

    { sort: { createdAt: -1 } },

    // sort descending created at

    // select by matching category
    // group listingNFTs by parent pointer to get unique parents 
    {
      group: {
        objectId: '$parent',
        listings: {
          $push: '$$ROOT'
        }
      }
    },
    { limit: 8 }
  ];
  const result = await query.aggregate(pipeline);*/
  return [result2, listingsNFTs];
});
