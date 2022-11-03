Moralis.Cloud.afterSave('EventFTMMintSevenTwoOne', async (request) => {
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
    '--------------------------------After 721 Mint FTM--------------------------------'
  );

  const tokenDatum = await request.object.get('tokenDatas');
  const tokenIds = await request.object.get('tokenIDs');
  //const amount = await request.object.get('amount');
  const hashs = await request.object.get('metadataURIs');

  // get collectionId from collectionAddress
  const collectionAddress = await request.object.get('tokenAddress');
  // get nft object data
  const minter = await request.object.get('minter');

  // TODO: can group in an array and promise all instead of calling 1 by 1 in for loop
  for (let i = 0; i < tokenDatum.length; i++) {
    const tokenData = JSON.parse(tokenDatum[i]);
    // get data of minted token
    const attributes = tokenData.properties.concat(
      tokenData.levels,
      tokenData.stats
    );
    const description = tokenData.description;
    const fileType = tokenData.fileType;
    const image = tokenData.ipfs;
    const name = tokenData.name;
    const rarity = tokenData.rarity;
    const type = tokenData.type;
    const unlockableContentId = tokenData.unlockableContentId;

    // create nft object in database
    const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');
    // handle for multiple tokenIds event, create multiple nfts
    let mediaEyeNFT = new MediaEyeNFT();
    mediaEyeNFT.set('attributes', attributes);
    mediaEyeNFT.set('chainId', '0xfa');
    mediaEyeNFT.set('collectionAddress', collectionAddress);
    mediaEyeNFT.set('collectionType', 'ERC721');
    mediaEyeNFT.set('description', description);
    mediaEyeNFT.set('fileType', fileType);
    mediaEyeNFT.set('image', `https://meye.mypinata.cloud/ipfs/${image}`);
    mediaEyeNFT.set('metadata', `https://meye.mypinata.cloud/ipfs/${hashs[i]}`);
    mediaEyeNFT.set('minter', minter);
    mediaEyeNFT.set('name', name);
    mediaEyeNFT.set('rarity', rarity);
    mediaEyeNFT.set('tokenId', tokenIds[i]);
    mediaEyeNFT.set('totalTokens', 1); // can be larger than 1 with erc1155
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
    userNFT.set('amount', 1);
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
  }
});
