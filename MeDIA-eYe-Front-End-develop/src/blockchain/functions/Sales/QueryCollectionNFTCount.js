export const queryCollectionNFTCount = async (Moralis, collectionAddress) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const NFTs = Moralis.Object.extend('MediaEyeNFT');
  const query = new Moralis.Query(NFTs);
  query.equalTo('collectionAddress', collectionAddress);
  const count = await query.count();
  return count;
};
