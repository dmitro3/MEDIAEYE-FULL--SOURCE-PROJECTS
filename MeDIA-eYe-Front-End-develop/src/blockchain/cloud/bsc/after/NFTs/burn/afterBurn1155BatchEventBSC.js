Moralis.Cloud.afterSave('EventBSCBurnOneOneFiveFive', async (request) => {
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
    '--------------------------------After 1155 Burn BSC--------------------------------'
  );

  const collectionAddress = await request.object.get('tokenAddress');
  const tokenIDs = await request.object.get('tokenIDs');
  const amountsBurned = await request.object.get('amounts');
  const burner = await request.object.get('burner');

  const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');
  const UserNFT = Moralis.Object.extend('UserNFT');

  for (let i = 0; i < tokenIDs.length; i++) {
    const tokenID = tokenIDs[i];
    const amountBurned = amountsBurned[i];

    const queryMediaEyeNFT = new Moralis.Query(MediaEyeNFT);
    // collection address + tokenID is unique by design
    queryMediaEyeNFT.equalTo('collectionAddress', collectionAddress);
    queryMediaEyeNFT.equalTo('tokenId', tokenID);
    const burnToken = await queryMediaEyeNFT.first({ useMasterKey: true });

    const queryUserNFT = new Moralis.Query(UserNFT);
    queryUserNFT.equalTo('nft', burnToken);
    queryUserNFT.equalTo('owner', burner);
    const burnUserRelation = await queryUserNFT.first({ useMasterKey: true });

    // ERC1155 can have multiple tokens so we need to check
    const remainingTotal =
      Number(burnToken.get('totalTokens')) - Number(amountBurned);

    const userTotal =
      Number(burnUserRelation.get('amount')) - Number(amountBurned);

    if (userTotal === 0 && remainingTotal === 0) {
      // remove from MediaEyeNFT table
      await burnToken.destroy({ useMasterKey: true });

      // will need to delete from user table as well
      await burnUserRelation.destroy({ useMasterKey: true });
    } else if (userTotal === 0 && remainingTotal !== 0) {
      // just delete from user table
      await burnUserRelation.destroy({ useMasterKey: true });

      // decrement from token table
      burnToken.set('totalTokens', Number(remainingTotal));
      await burnToken.save({ useMasterKey: true });
    } else {
      // decrement the value of total number of tokens from both tables
      burnToken.set('totalTokens', Number(remainingTotal));
      burnUserRelation.set('amount', Number(userTotal));
      await burnToken.save({ useMasterKey: true });
      await burnUserRelation.save({ useMasterKey: true });
    }
  }
});
