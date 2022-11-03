export const queryNFT = async (Moralis, params) => {
  const NFTs = Moralis.Object.extend('MediaEyeNFT');
  const query = new Moralis.Query(NFTs);
  if (!params.colAddress || !params.tokenId)
    return new Error('Specify colAddress and tokenId');

  query.equalTo('collectionAddress', params.colAddress);
  query.equalTo('tokenId', params.tokenId);
  if (params.chainId) query.equalTo('chainId', params.chainId);
  const result = await query.first();
  return result;
};
