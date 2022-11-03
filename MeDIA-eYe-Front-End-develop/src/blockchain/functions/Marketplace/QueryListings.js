export const queryListings = async (Moralis, params) => {
  const Listings = Moralis.Object.extend('MediaEyeListing');
  const query = new Moralis.Query(Listings);

  if (params.limit) query.limit(params.limit);
  if (params.page) query.skip(Number(params.page * params.limit));
  if (params.user) query.equalTo('seller', params.user);
  if (params.bundle) query.equalTo('size', 'bundle');
  if (params.chainId) query.equalTo('chainId', params.chainId);
  if (params.categories) query.containsAll('categories', params.categories);

  if (params.status === 'available') query.equalTo('status', 'available');

  // TODO: implement OR constraints on specific complete statuses ie. finished, sold, claimed.
  // This requires creating multiple Moralis queries https://docs.moralis.io/moralis-server/database/queries#or-ed-query-constraints.
  // if status is complete, show all that are not available
  if (params.status === 'complete') {
    query.notEqualTo('status', 'available');
  }

  // currently force most recent
  query.descending('createdAt');

  // Get auction that have ended or are currently active
  const currentTime = String(Date.now()).slice(undefined, -3);
  query.lessThan('startTime', currentTime);

  const result = await query.find();
  const NFTs = Moralis.Object.extend('MediaEyeListingNFT');

  let listingsNFTs = [];
  for (let i = 0; i < result.length; i++) {
    const listing = new Listings();
    listing.set('id', result[i].id);
    const query2 = new Moralis.Query(NFTs);
    query2.equalTo('parent', listing);
    query2.include('nft');
    if (listing.endTime) query2.greaterThan('endTime', currentTime + 3600);

    const singleListingNFT = await query2.find();

    listingsNFTs.push(singleListingNFT);
  }
  return [result, listingsNFTs];
};
