Moralis.Cloud.afterSave('EventMintBatch', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Mint 1155 Batch Mint--------------------------------'
  );
  logger.info(JSON.stringify(request, null, 2));

  const tokenDatum = await request.object.get('tokenDatum');
  const tokenIds = await request.object.get('tokenIDs');
  const amounts = await request.object.get('amounts');
  const images = await request.object.get('mediaUris');

  // get collectionId from collectionAddress
  const collectionAddress = await request.object.get('tokenAddress');
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const collectionQuery = new Moralis.Query(Collection);
  collectionQuery.equalTo('collectionAddress', collectionAddress);
  const collectionResult = await collectionQuery.first();

  for (let i = 0; i < tokenDatum.length; i++) {
    // get data of minted token from approved files
    const ApprovedFile = Moralis.Object.extend('ApproveFile');
    const query = new Moralis.Query(ApprovedFile);
    query.equalTo('objectId', tokenDatum[i]);
    const fileResult = await query.first();

    // get nft object data
    const minter = await request.object.get('minter');
    const name = await fileResult.get('name');
    const category = await fileResult.get('category');
    const collectionId = collectionResult.id;

    const description = await fileResult.get('description');
    const type = await fileResult.get('type');

    // create nft object in database
    const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');

    // handle for multiple tokenIds event, create multiple nfts
    let mediaEyeNFT = new MediaEyeNFT();
    mediaEyeNFT.set('minter', minter);
    mediaEyeNFT.set('name', name);
    mediaEyeNFT.set('image', images[i]);
    mediaEyeNFT.set('category', category);
    mediaEyeNFT.set('description', description);
    mediaEyeNFT.set('type', type);
    mediaEyeNFT.set('totalTokens', Number(amounts[i])); // can be larger than 1 with erc1155
    mediaEyeNFT.set('collectionAddress', collectionAddress);
    mediaEyeNFT.set('collectionId', collectionId);
    mediaEyeNFT.set('tokenId', tokenIds[i]);
    mediaEyeNFT.set('chainId', 'ETH');
    mediaEyeNFT.set('collectionType', 'ERC1155');
    //const createdNFT = await mediaEyeNFT.save();

    // attach userNFT table used to track current owner of NFT
    const UserNFT = Moralis.Object.extend('UserNFT');
    let userNFT = new UserNFT();
    userNFT.set('owner', minter);
    userNFT.set('amount', Number(amounts[i]));
    userNFT.set('nft', mediaEyeNFT);
    await userNFT.save();
  }
});
