Moralis.Cloud.afterSave('EventFTMAuctionCreated', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }

  // temporary fix
  const saved = request.object.get('saved');
  if (saved) return;
  // update event table to indicate that save has been triggered
  request.object.set('saved', true);
  request.object.save();

  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------AUCTION CREATED FTM--------------------------------'
  );
  logger.info(JSON.stringify(request.object));
  // get listing object data
  const auction = await request.object.get('auction');
  const auctionPayments = await request.object.get('auctionPayments');
  const chainlinkPayment = await request.object.get('chainlinkPayment');
  const categories = JSON.parse(request.object.get('data'));
  // create nft object in database
  const MediaEyeListing = Moralis.Object.extend('MediaEyeListing');
  const MediaEyeListingNFT = Moralis.Object.extend('MediaEyeListingNFT');
  let mediaEyeListing = new MediaEyeListing();
  mediaEyeListing.set('type', 'auction');
  mediaEyeListing.set('listingId', auction[0]);
  mediaEyeListing.set('seller', auction[2].toLowerCase());
  mediaEyeListing.set('startTime', auction[3]);
  mediaEyeListing.set('endTime', auction[4]);
  mediaEyeListing.set('recipientAddress', auction[5][0]);
  mediaEyeListing.set('recipientPercent', auction[5][1]);
  mediaEyeListing.set('charityAddress', auction[5][2]);
  mediaEyeListing.set('charityPercent', auction[5][3]);
  mediaEyeListing.set('status', 'available');
  mediaEyeListing.set('chainId', '0xfa');
  mediaEyeListing.set('listingPayments', auctionPayments);
  mediaEyeListing.set('chainlinkPayment', chainlinkPayment);
  mediaEyeListing.set('categories', categories);

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
    userQuery.equalTo('owner', auction[2].toLowerCase());
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
