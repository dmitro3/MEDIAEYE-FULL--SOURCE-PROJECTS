export const queryListingsByChain = async (
  Moralis,
  userAddress,
  chainId,
  page
) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const Listings = Moralis.Object.extend('MediaEyeListing');
  const query = new Moralis.Query(Listings);
  query.equalTo('seller', userAddress);
  query.equalTo('chainId', chainId);
  query.include('MediaEyeListingNFT');
  const result = await query.find();
  //TODO: fix temporary solution to handle bug with relational queries, making 2 queries instead of 1-Many query
  const NFTs = Moralis.Object.extend('MediaEyeListingNFT');
  // query a listings nft list
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
