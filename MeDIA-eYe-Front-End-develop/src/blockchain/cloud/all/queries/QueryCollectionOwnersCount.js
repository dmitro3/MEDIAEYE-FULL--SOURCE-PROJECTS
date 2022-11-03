Moralis.Cloud.define('queryCollectionOwnersCount', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------QUERY COLLECTION OWNERS COUNT--------------------------------'
  );
  const collectionAddress = request.params.collectionAddress;
  const UserNFT = Moralis.Object.extend('UserNFT');
  const NFT = Moralis.Object.extend('MediaEyeNFT');

  const innerQuery = new Moralis.Query(NFT);
  innerQuery.equalTo('collectionAddress', collectionAddress);
  const query = new Moralis.Query(UserNFT);
  query.matchesQuery('nft', innerQuery);
  const result = await query.distinct('owner', { useMasterKey: true });

  return result.length;
});
