Moralis.Cloud.afterSave('EventFTMMintOneOneFiveFive', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');

  if (!confirmed) return; //TODO: currently executing without confirmation only.

  const saved = request.object.get('saved');
  // temporary fix
  if (saved) return;

  // update event table to indicate that save has been triggered
  request.object.set('saved', true);
  request.object.save();

  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------After 1155 Mint FTM--------------------------------'
  );
  // get data of minted token from approved files
  const tokenData = JSON.parse(await request.object.get('tokenData'));

  // get nft object data
  const attributes = tokenData.properties.concat(
    tokenData.levels,
    tokenData.stats
  );
  const collectionAddress = await request.object.get('tokenAddress');
  const description = tokenData.description;
  const fileHash = await request.object.get('metadataURI');
  const fileType = tokenData.fileType;
  const image = tokenData.ipfs;
  const minter = await request.object.get('minter');
  const name = tokenData.name;
  const rarity = tokenData.rarity;
  const tokenId = await request.object.get('tokenID');
  const totalTokens = await request.object.get('amount');
  const type = tokenData.type;
  const unlockableContentId = tokenData.unlockableContentId;

  // create nft object in database
  const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');

  // handle for multiple tokenIds event, create multiple nfts
  let mediaEyeNFT = new MediaEyeNFT();
  mediaEyeNFT.set('attributes', attributes);
  mediaEyeNFT.set('chainId', '0xfa');
  mediaEyeNFT.set('collectionAddress', collectionAddress);
  mediaEyeNFT.set('collectionType', 'ERC1155');
  mediaEyeNFT.set('description', description);
  mediaEyeNFT.set('fileType', fileType);
  mediaEyeNFT.set('image', `https://meye.mypinata.cloud/ipfs/${image}`);
  mediaEyeNFT.set('metadata', `https://meye.mypinata.cloud/ipfs/${fileHash}`);
  mediaEyeNFT.set('minter', minter);
  mediaEyeNFT.set('name', name);
  mediaEyeNFT.set('rarity', rarity);
  mediaEyeNFT.set('tokenId', tokenId);
  mediaEyeNFT.set('totalTokens', Number(totalTokens)); // can be larger than 1 with erc1155
  mediaEyeNFT.set('type', type);
  if (unlockableContentId)
    mediaEyeNFT.set('unlockableContentId', unlockableContentId);

  // add if animation_url exists
  if (fileType === 'video/mp4') {
    mediaEyeNFT.set(
      'animation_url',
      `https://meye.mypinata.cloud/ipfs/${image}`
    );
  }

  //const createdNFT = await mediaEyeNFT.save();

  // attach userNFT table used to track current owner of NFT
  const UserNFT = Moralis.Object.extend('UserNFT');
  let userNFT = new UserNFT();
  userNFT.set('owner', minter);
  userNFT.set('amount', Number(totalTokens));
  userNFT.set('nft', mediaEyeNFT);
  await userNFT.save();

  // confirm saved unlockable content if any
  if (unlockableContentId && unlockableContentId !== '') {
    const UnlockableContent = Moralis.Object.extend('UnlockableContent');
    const query = new Moralis.Query(UnlockableContent);
    query.equalTo('objectId', unlockableContentId);
    const unlockableContent = await query.first();
    unlockableContent.set('confirmed', true);
    await unlockableContent.save();
  }
});
