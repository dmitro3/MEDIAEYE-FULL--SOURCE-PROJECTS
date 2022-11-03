export const queryOwned = async (Moralis, params) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const NFTs = Moralis.Object.extend('UserNFT');
  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const query = new Moralis.Query(NFTs);
  query.include('nft');

  query.descending('createdAt');
  if (params.limit) query.limit(params.limit);
  if (params.page) query.skip(Number(params.page * params.limit));
  if (params.owner) query.equalTo('owner', params.owner);
  if (params.chainId) {
    const innerQuery = new Moralis.Query(NFT);
    innerQuery.equalTo('chainId', params.chainId);
    query.matchesQuery('nft', innerQuery);
  }
  const result = await query.find();
  return result;
};
