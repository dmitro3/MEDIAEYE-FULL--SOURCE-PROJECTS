export const queryListing = async (Moralis, id) => {
  // enable web3 before executing functions

  const Listings = Moralis.Object.extend('MediaEyeListing');
  const query = new Moralis.Query(Listings);
  query.equalTo('objectId', id);
  const result = await query.first();

  const NFTs = Moralis.Object.extend('MediaEyeListingNFT');
  const listing = new Listings();
  listing.set('id', result.id);
  const query2 = new Moralis.Query(NFTs);
  query2.equalTo('parent', listing);
  query2.include('nft');
  const singleListingNFT = await query2.first();

  return [result, singleListingNFT];
};
