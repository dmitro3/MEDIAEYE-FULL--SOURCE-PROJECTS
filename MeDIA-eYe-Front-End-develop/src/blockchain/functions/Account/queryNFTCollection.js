export const queryNFTCollection = async (Moralis, collectionAddress) => {
  const NFTs = Moralis.Object.extend('MediaEyeNFT');
  const query = new Moralis.Query(NFTs);
  query.equalTo('collectionAddress', collectionAddress);

  query.withCount();
  const res = await query.find();

  return res;
};
