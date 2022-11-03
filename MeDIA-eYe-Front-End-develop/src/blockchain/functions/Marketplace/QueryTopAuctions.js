/**
 *
 * @param Moralis
 * @param params contains the parameters for the query
 * @param params.chainHex is a hex string of the current chainId
 * @param params.limit is the limit for how many auctions to return
 * @returns array of 2 items: list of auctions and list of its corresponding listingNfts
 */
export const queryTopAuctions = async (Moralis, params) => {
  const Listings = Moralis.Object.extend('MediaEyeListing');
  const query = new Moralis.Query(Listings);

  query.equalTo('status', 'available');
  query.equalTo('type', 'auction');
  query.equalTo('chainId', params.chainHex);
  query.descending('numBids');

  query.limit(params.limit ?? 10);

  const result = await query.find();
  const NFTs = Moralis.Object.extend('MediaEyeListingNFT');

  let listingsNFTs = [];
  for (let i = 0; i < result.length; i++) {
    const listing = new Listings();
    listing.set('id', result[i].id);
    const query2 = new Moralis.Query(NFTs);
    query2.equalTo('parent', listing);
    query2.include('nft');
    const singleListingNFT = await query2.find();

    listingsNFTs.push(singleListingNFT);
  }
  return [result, listingsNFTs];
};
