Moralis.Cloud.afterSave('ListingCreatedEvent', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------LISTING CREATED--------------------------------'
  );
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (confirmed) {
    return;
  }
  // get listing object data
  const listing = await request.object.get('listing');
  const listingPayments = await request.object.get('listingPayments');
  // create nft object in database
  const MediaEyeListing = Moralis.Object.extend('MediaEyeListing');
  const MediaEyeListingNFT = Moralis.Object.extend('MediaEyeListingNFT');
  let mediaEyeListing = new MediaEyeListing();
  mediaEyeListing.set('type', 'listing');
  mediaEyeListing.set('listingId', listing[0]);
  mediaEyeListing.set('label', listing[2]);
  mediaEyeListing.set('seller', listing[3].toLowerCase());
  mediaEyeListing.set('startTime', listing[4]);

  mediaEyeListing.set('listingPayments', listingPayments);
  mediaEyeListing.set('recipientAddress', listing[5][0]);
  mediaEyeListing.set('recipientPercent', listing[5][1]);
  mediaEyeListing.set('charityAddress', listing[5][2]);
  mediaEyeListing.set('charityPercent', listing[5][3]);
  mediaEyeListing.set('status', 'available');

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
    userQuery.equalTo('owner', listing[3].toLowerCase());
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
