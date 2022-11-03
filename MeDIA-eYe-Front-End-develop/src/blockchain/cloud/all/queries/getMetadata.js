Moralis.Cloud.define('GetMetadata', async (request) => {
  const tokenId = request.params.tokenId;
  const collectionId = request.params.collectionId;
  // get data from nft database using objectId
  const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');
  const query = new Moralis.Query(MediaEyeNFT);
  query.equalTo('collectionId', collectionId);
  query.equalTo('tokenId', tokenId);
  const fileResult = await query.first();
  let metadata = {
    category: fileResult.get('category'),
    createdAt: fileResult.createdAt,
    description: fileResult.get('description'),
    image: fileResult.get('image'),
    minter: fileResult.get('minter'),
    name: fileResult.get('name'),
    type: fileResult.get('type'),
    tokenId: fileResult.get('tokenId')
  };
  return metadata;
});
