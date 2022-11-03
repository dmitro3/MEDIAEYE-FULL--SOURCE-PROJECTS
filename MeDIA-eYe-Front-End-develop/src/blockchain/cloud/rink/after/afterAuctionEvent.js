Moralis.Cloud.afterSave('EventAuctionCreated', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------AUCTION CREATED--------------------------------'
  );
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }

  logger.info(JSON.stringify(request.object));
  // get listing object data
  const auction = await request.object.get('auction');
  const auctionPayments = await request.object.get('auctionPayments');
  // create nft object in database
  const MediaEyeListing = Moralis.Object.extend('MediaEyeListing');
  const MediaEyeListingNFT = Moralis.Object.extend('MediaEyeListingNFT');
  let mediaEyeListing = new MediaEyeListing();
  mediaEyeListing.set('type', 'auction');
  mediaEyeListing.set('listingId', auction[0]);
  mediaEyeListing.set('label', auction[2]);
  mediaEyeListing.set('seller', auction[3].toLowerCase());
  mediaEyeListing.set('startTime', auction[4]);
  mediaEyeListing.set('endTime', auction[5]);

  mediaEyeListing.set('listingPayments', auctionPayments);
  mediaEyeListing.set('recipientAddress', auction[6][0]);
  mediaEyeListing.set('recipientPercent', auction[6][1]);
  mediaEyeListing.set('charityAddress', auction[6][2]);
  mediaEyeListing.set('charityPercent', auction[6][3]);
  mediaEyeListing.set('status', 'available');

  let listingNfts = auction[1];
  mediaEyeListing.set('size', listingNfts.length > 1 ? 'bundle' : 'single');

  const relation = mediaEyeListing.relation('nfts');
  for (let i = 0; i < listingNfts.length; i++) {
    let newListingNFT = new MediaEyeListingNFT();

    const NFT = Moralis.Object.extend('MediaEyeNFT');
    const query = new Moralis.Query(NFT);
    const collectionAddress = listingNfts[i][1];
    const tokenId = listingNfts[i][2];
    query.equalTo('collectionAddress', collectionAddress.toLowerCase());
    query.equalTo('tokenId', tokenId);
    const nftResult = await query.first();
    const nft = new NFT();
    nft.id = nftResult.id;

    newListingNFT.set('nft', nft);
    newListingNFT.set(
      'collectionType',
      listingNfts[i][0] === '0' ? 'ERC1155' : 'ERC721'
    );
    newListingNFT.set('amount', Number(listingNfts[i][3]));

    newListingNFT.set('parent', mediaEyeListing);
    await newListingNFT.save();
    relation.add(newListingNFT);

    // get userNft
    const UserNFT = Moralis.Object.extend('UserNFT');
    const userQuery = new Moralis.Query(UserNFT);
    userQuery.equalTo('owner', auction[3].toLowerCase());
    userQuery.equalTo('nft', nftResult);
    const userNft = await userQuery.first();
    const currentAmount =
      Number(userNft.get('amount')) - Number(listingNfts[i][3]);

    if (currentAmount === 0) {
      // delete userNft if amount reaches 0
      await userNft.destroy();
    } else {
      // remove amount listed from user's nft amount
      userNft.set('amount', Number(currentAmount));
      await userNft.save({ useMasterKey: true });
    }
  }

  await mediaEyeListing.save();
});
