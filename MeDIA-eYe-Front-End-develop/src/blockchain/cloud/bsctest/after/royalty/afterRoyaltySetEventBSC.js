Moralis.Cloud.afterSave('EventBSCRoyaltySetTest', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------ROYALTIES SET BSC--------------------------------'
  );
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }
  const tokenId = request.object.get('nftTokenIds');
  const collectionAddress = request.object.get('nftTokenAddresses');
  const royalty = request.object.get('royaltyAmount');
  // query nft
  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const nftQuery = new Moralis.Query(NFT);
  nftQuery.equalTo('collectionAddress', collectionAddress);
  nftQuery.equalTo('tokenId', tokenId);
  const nft = await nftQuery.first();
  // set royalty amount
  nft.set('royalty', Number(royalty));
  await nft.save({ useMasterKey: true });
});
