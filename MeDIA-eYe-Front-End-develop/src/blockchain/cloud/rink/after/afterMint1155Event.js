Moralis.Cloud.afterSave('EventMintOneOneFiveFive', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }
  // get data of minted token from approved files
  const ApprovedFile = Moralis.Object.extend('ApproveFile');
  const query = new Moralis.Query(ApprovedFile);
  const tokenData = await request.object.get('tokenData');
  query.equalTo('objectId', tokenData);
  const fileResult = await query.first();

  const collectionAddress = await request.object.get('tokenAddress');

  // get collectionId from collectionAddress
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const collectionQuery = new Moralis.Query(Collection);
  collectionQuery.equalTo('collectionAddress', collectionAddress);
  const collectionResult = await collectionQuery.first();

  // get nft object data
  const minter = await request.object.get('minter');
  const name = await fileResult.get('name');
  const image = await request.object.get('mediaUri');
  const category = await fileResult.get('category');
  const collectionId = collectionResult.id;
  const tokenId = await request.object.get('tokenID');
  const description = await fileResult.get('description');
  const type = await fileResult.get('type');
  const totalTokens = await request.object.get('amount');

  // create nft object in database
  const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');

  // handle for multiple tokenIds event, create multiple nfts
  let mediaEyeNFT = new MediaEyeNFT();
  mediaEyeNFT.set('minter', minter);
  mediaEyeNFT.set('name', name);
  mediaEyeNFT.set('image', image);
  mediaEyeNFT.set('category', category);
  mediaEyeNFT.set('description', description);
  mediaEyeNFT.set('type', type);
  mediaEyeNFT.set('totalTokens', Number(totalTokens)); // can be larger than 1 with erc1155
  mediaEyeNFT.set('collectionAddress', collectionAddress);
  mediaEyeNFT.set('collectionId', collectionId);
  mediaEyeNFT.set('tokenId', tokenId);
  mediaEyeNFT.set('chainId', 'ETH');
  mediaEyeNFT.set('collectionType', 'ERC1155');
  //const createdNFT = await mediaEyeNFT.save();

  // attach userNFT table used to track current owner of NFT
  const UserNFT = Moralis.Object.extend('UserNFT');
  let userNFT = new UserNFT();
  userNFT.set('owner', minter);
  userNFT.set('amount', Number(totalTokens));
  userNFT.set('nft', mediaEyeNFT);
  await userNFT.save();
});
