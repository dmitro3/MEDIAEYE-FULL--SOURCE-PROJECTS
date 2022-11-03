Moralis.Cloud.afterSave('EventBSCBurnSevenTwoOne', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) return;

  const saved = request.object.get('saved');
  // temporary fix
  if (saved) return;
  // update event table to indicate that save has been triggered
  request.object.set('saved', true);
  request.object.save();

  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------After 721 Burn BSC--------------------------------'
  );

  const collectionAddress = await request.object.get('tokenAddress');
  const tokenID = await request.object.get('tokenID');

  const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');
  const UserNFT = Moralis.Object.extend('UserNFT');

  const queryMediaEyeNFT = new Moralis.Query(MediaEyeNFT);
  // collection address + tokenID is unique by design
  queryMediaEyeNFT.equalTo('collectionAddress', collectionAddress);
  queryMediaEyeNFT.equalTo('tokenId', tokenID);
  const burnToken = await queryMediaEyeNFT.first({ useMasterKey: true });

  // find from user table
  const queryUserNFT = new Moralis.Query(UserNFT);
  queryUserNFT.equalTo('nft', burnToken);
  const burnUserRelation = await queryUserNFT.first({ useMasterKey: true });

  // ERC721 only has 1 total token so we can destroy it right away
  // remove from MediaEyeNFT table
  await burnToken.destroy({ useMasterKey: true });

  // remove from UserNFT table
  await burnUserRelation.destroy({ useMasterKey: true });
});
