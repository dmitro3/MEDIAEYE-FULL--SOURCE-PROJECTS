export const queryNFTs = async (Moralis, params) => {
  // enable web3 before executing functions
  await Moralis.enableWeb3();

  const NFTs = Moralis.Object.extend('MediaEyeNFT');
  const query = new Moralis.Query(NFTs);
  if (params.limit) query.limit(params.limit);
  if (params.page) query.skip(Number(params.page * params.limit));
  if (params.chainId) query.equalTo('chainId', params.chainId);

  query.equalTo('collectionAddress', params.colAddress.toLowerCase());

  query.withCount();

  const result = await query.find();
  return result;
};
