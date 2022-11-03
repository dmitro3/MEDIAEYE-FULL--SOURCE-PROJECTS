export const queryAllListings = async (Moralis, page) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const Listings = Moralis.Object.extend('MediaEyeListing');
  const query = new Moralis.Query(Listings);
  query.limit(5);
  const result = await query.find();

  const NFTs = Moralis.Object.extend('MediaEyeListingNFT');

  let listingsNFTs = [];
  for (let i = 0; i < result.length; i++) {
    const listing = new Listings();
    listing.set('id', result[i].id);
    const query2 = new Moralis.Query(NFTs);
    query2.equalTo('parent', listing);
    query2.include('nft');
    //const singleListingNFT = await query2.find();
    //listingsNFTs.push(singleListingNFT);
  }
  return [result, listingsNFTs];
};
