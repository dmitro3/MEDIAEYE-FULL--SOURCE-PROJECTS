/**
 * update collection with either new or missing NFTs based on existing tokenIds withint the Moralis DB and queried tokenIds from Moralis API.
 * Does not update metadata or object data of NFT at already matching tokenIds
 */
Moralis.Cloud.define('updateCollection', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------UPDATE COLLECTION--------------------------------'
  );

  const colAddress = request.params.colAddress.toLowerCase();
  const chainId = request.params.chainId;

  const Collection = Moralis.Object.extend('MediaEyeCollection');
  // query collection, if already exists, exit function.
  const query = new Moralis.Query(Collection);
  query.equalTo('collectionAddress', colAddress);
  query.equalTo('chainId', chainId);
  const colResult = await query.first();
  if (!colResult) {
    logger.info('ERROR: Collection does not exist, cannot update.');
    return;
  }

  let pageSize = 100;
  let cursor = null;
  do {
    const options = {
      chain: chainId,
      cursor: cursor,
      address: colAddress,
      offset: pageSize * page,
      limit: pageSize,
      useMasterKey: true
    };

    // get list of valid data in tokenIds from API,
    const nfts = await Moralis.Web3API.token.getAllTokenIds(options);
    let newTokenIds = [];
    nfts.result.forEach((nft) => {
      let metadata = JSON.parse(nft?.metadata);
      if (metadata) {
        newTokenIds.push(nft?.token_id);
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay between looping
  } while (cursor != '' && cursor != null);
  logger.info(JSON.stringify(newTokenIds));

  // get database list of nfts from collection
  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const nftQuery = new Moralis.Query(NFT);
  nftQuery.equalTo('collectionAddress', colAddress);
  nftQuery.equalTo('chainId', chainId);
  const dbNfts = await nftQuery.find();
  let dbTokenIds = dbNfts.map((nft) => {
    return nft.attributes.tokenId;
  });
  logger.info(JSON.stringify(dbTokenIds));

  // compare current existing nft tokenIds to list of valid data tokenIds
  // update nfts with new tokenIds
});
