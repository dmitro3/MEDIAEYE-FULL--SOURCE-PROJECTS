Moralis.Cloud.afterSave('EventBSCListingCreatedTest', async (request) => {
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
    '--------------------------------LISTING CREATED BSC--------------------------------'
  );

  // get listing object data
  const listing = request.object.get('listing');
  const listingPayments = request.object.get('listingPayments');
  const chainlinkPayment = request.object.get('chainlinkPayment');
  const categories = JSON.parse(request.object.get('data'));
  // create nft object in database
  const MediaEyeListing = Moralis.Object.extend('MediaEyeListing');
  const MediaEyeListingNFT = Moralis.Object.extend('MediaEyeListingNFT');

  let mediaEyeListing = new MediaEyeListing();
  mediaEyeListing.set('type', 'listing');
  mediaEyeListing.set('listingId', listing[0]);
  mediaEyeListing.set('seller', listing[2].toLowerCase());
  mediaEyeListing.set('startTime', listing[3]);
  mediaEyeListing.set('recipientAddress', listing[4][0]);
  mediaEyeListing.set('recipientPercent', listing[4][1]);
  mediaEyeListing.set('charityAddress', listing[4][2]);
  mediaEyeListing.set('charityPercent', listing[4][3]);
  mediaEyeListing.set('status', 'available');
  mediaEyeListing.set('chainId', '0x61');
  mediaEyeListing.set('listingPayments', listingPayments);
  mediaEyeListing.set('chainlinkPayment', chainlinkPayment);
  mediaEyeListing.set('categories', categories);

  let listingNfts = listing[1];
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
    userQuery.equalTo('owner', listing[2].toLowerCase());
    userQuery.equalTo('nft', nftResult);
    const userNft = await userQuery.first({ useMasterKey: true });
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
