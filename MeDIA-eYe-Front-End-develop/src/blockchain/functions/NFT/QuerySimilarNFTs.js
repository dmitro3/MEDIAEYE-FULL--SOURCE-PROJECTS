export const querySimilarNfts = async (Moralis, params) => {
  const nftId = params.nftId;
  const categories = params.categories;
  const chainHex = params.chainHex;
  const limit = params.limit;

  if (!nftId || !categories || !chainHex) return [];

  // query using parse server method
  const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');
  const nft = new MediaEyeNFT();
  nft.id = nftId;

  const query = new Moralis.Query('MediaEyeListingNFT');
  query.notEqualTo('nft', nft);

  // listing constraints for categories, etc
  const listingQuery = new Moralis.Query('MediaEyeListing');
  listingQuery.equalTo('status', 'available');
  listingQuery.equalTo('chainId', chainHex);
  listingQuery.containsAll('categories', categories);

  query.matchesQuery('parent', listingQuery);
  query.withCount();
  query.include('parent');
  query.include('nft');
  query.limit(limit);
  let { results, count } = await query.find();

  // in the case of not enough exact matches
  if (count < limit) {
    // TODO: query with less categories
  }
  // in the case of more (not equal) than (limit) amount of exact matches
  else if (count !== limit) {
    // for (let i = 0; i < limit; i++) {
    //   const randomNum = Math.floor(Math.random() * (count + 1));
    //   console.log('rng', randomNum);
    // }

    // temporary simple solution for random selection:
    // set back random num by (limit) places to account for amount
    // e.g. if count = 15, limit = 10: rng will select from 0-5
    const randomNum = Math.floor(Math.random() * (count - limit + 1));
    // extract section of results
    results = results.slice(randomNum);
  }
  let listings = [];
  let nfts = [];
  for (let i = 0; i < results.length; i++) {
    listings.push(results[i]?.attributes?.parent);
    nfts.push([results[i]]);
  }
  return [listings, nfts];
};
