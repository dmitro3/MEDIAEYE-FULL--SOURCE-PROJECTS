export const queryListingsByCategory = async (Moralis, params) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const NFTs = Moralis.Object.extend('MediaEyeListingNFT');
  const Listings = Moralis.Object.extend('MediaEyeListing');
  const query = new Moralis.Query(NFTs);
  query.limit(params.limit ? params.limit : 8);
  const result = await query.distinct('parent');

  return [result];
};
