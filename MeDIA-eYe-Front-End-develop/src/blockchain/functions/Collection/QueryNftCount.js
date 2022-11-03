export const queryNftCount = async (Moralis, params) => {
  const NFTs = Moralis.Object.extend('MediaEyeNFT');
  const query = new Moralis.Query(NFTs);
  if (params.chainId) query.equalTo('chainId', params.chainId);

  query.equalTo('collectionAddress', params.colAddress.toLowerCase());

  const result = await query.count();
  return result;
};
