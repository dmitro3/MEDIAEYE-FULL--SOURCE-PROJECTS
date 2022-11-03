Moralis.Cloud.define('addCollection', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------ADD COLLECTION--------------------------------'
  );

  const colAddress = request.params.colAddress.toLowerCase();
  const chainId = request.params.chainId.toLowerCase();

  const Collection = Moralis.Object.extend('MediaEyeCollection');
  // query collection, if already exists, exit function.
  const query = new Moralis.Query(Collection);
  query.equalTo('collectionAddress', colAddress);
  query.equalTo('chainId', chainId);
  const colResult = await query.first();
  if (colResult) {
    logger.info('ERROR: Collection already exists, cannot add.');
    return;
  }
  const newCol = new Collection();
  newCol.set('collectionAddress', colAddress);
  newCol.set('chainId', chainId);
  newCol.set('name', 'Unnamed Collection');
  newCol.set('imported', true);
  await newCol.save();

  let pageSize = 100;
  let cursor = null;

  let collectionType = '';
  do {
    const options = {
      chain: chainId,
      cursor: cursor,
      address: colAddress,
      limit: pageSize,
      useMasterKey: true
    };
    // gets all tokens from a contract
    const nfts = await Moralis.Web3API.token.getAllTokenIds(options);
    // logger.info(JSON.stringify(nfts));
    if (!nfts?.result?.length) {
      logger.info('ERROR: No more NFTs found at address. Abort Collection.');
      //return;
    }
    let nftInserts = [];
    nfts.result.forEach((nft) => {
      let metadata = JSON.parse(nft?.metadata);
      if (!metadata) {
        // resync metadata to update Moralis API index
        // Moralis.Web3API.token.reSyncMetadata({
        //   address: nft?.token_address,
        //   token_id: nft?.token_id,
        //   flag: 'metadata'
        // });
      }
      nftInserts.push({
        update: {
          animation_url: metadata?.animation_url ? true : false,
          attributes: metadata?.attributes,
          chainId: chainId,
          collectionAddress: nft?.token_address,
          collectionType: nft?.contract_type,
          description: metadata?.description,
          image: metadata?.image,
          imported: true,
          metadata: nft?.token_uri,
          // minter
          name: metadata?.name, // if name not check
          // rarity
          tokenId: nft?.token_id,
          totalTokens: Number(nft?.amount)
          // TODO: fileType should be setup as a job to obtain at a later date, or saved here by querying the blob of the url
        }
      });
    });
    //logger.info(JSON.stringify(nftInserts));
    // insert rows into the database
    await Moralis.bulkWrite('MediaEyeNFT', nftInserts);

    collectionType = nfts?.result[0]?.contract_type;

    logger.info(
      `Got page ${nfts.page} of ${Math.ceil(nfts.total / nfts.page_size)}, ${
        nfts.total
      } total`
    );

    cursor = nfts.cursor;
    logger.info('new cursor ' + nfts.cursor);
    // timer delay
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay between looping
  } while (cursor != '' && cursor != null);

  newCol.set('collectionType', collectionType); // assumes that there exists at least 1 nft in contract
  await newCol.save();
  // TODO: find another way to extract erc type information
  // TODO: add symbol if erc721 contract

  return;
});
