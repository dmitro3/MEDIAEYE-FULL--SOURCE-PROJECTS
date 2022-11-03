Moralis.Cloud.afterSave('EventBSCOfferClaimed', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Offer Claimed BSC--------------------------------'
  );
  logger.info(JSON.stringify(request.object));

  // get sale object data
  const nft = await request.object.get('nft');
  const tokenAddress = nft[1];
  const tokenId = nft[2];
  const offerer = await request.object.get('offerer');
  const seller = await request.object.get('seller');
  const price = await request.object.get('price');
  const paymentMethod = await request.object.get('paymentMethod');

  // query the offer
  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const nftQuery = new Moralis.Query(NFT);
  nftQuery.equalTo('collectionAddress', tokenAddress.toLowerCase());
  nftQuery.equalTo('tokenId', tokenId);
  nftQuery.equalTo('chainId', '0x38');

  const Offer = Moralis.Object.extend('Offer');
  const query = new Moralis.Query(Offer);
  query.equalTo('offerer', offerer);
  query.equalTo('price', price);
  query.equalTo('paymentMethod', paymentMethod);
  query.matchesQuery('nft', nftQuery);
  const offer = await query.first();
  offer.set('claimed', true);
  offer.set('claimedBy', seller);
  await offer.save();
});
