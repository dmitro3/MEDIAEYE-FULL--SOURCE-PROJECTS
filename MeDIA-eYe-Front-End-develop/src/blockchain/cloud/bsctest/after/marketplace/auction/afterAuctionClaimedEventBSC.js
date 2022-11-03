Moralis.Cloud.afterSave('EventBSCAuctionClaimedTest', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Auction Claimed BSC--------------------------------'
  );
  logger.info(JSON.stringify(request.object));

  // get sale object data
  const buyer = await request.object.get('winner');
  const listingId = await request.object.get('auctionId');
  const saleAmount = await request.object.get('price');
  const paymentMethod = await request.object.get('paymentMethod');

  // query the bid
  const Bid = Moralis.Object.extend('Bid');
  const queryBid = new Moralis.Query(Bid);
  queryBid.equalTo('listingId', listingId);
  queryBid.equalTo('bidder', buyer);
  queryBid.equalTo('price', saleAmount);
  queryBid.equalTo('paymentMethod', paymentMethod);
  const bid = await queryBid.first();

  // update listing status as claimed
  const MediaEyeListing = Moralis.Object.extend('MediaEyeListing');
  const MediaEyeListingNFT = Moralis.Object.extend('MediaEyeListingNFT');
  const query = new Moralis.Query(MediaEyeListing);
  query.equalTo('listingId', listingId);
  query.equalTo('type', 'auction');
  query.equalTo('chainId', '0x61');
  const listing = await query.first();

  // set status of auction to claimed
  listing.set('status', 'claimed');
  // set bid of auction to winning bid
  listing.set('bid', bid);
  await listing.save();

  const query2 = new Moralis.Query(MediaEyeListingNFT);
  query2.equalTo('parent', listing);
  query2.include('nft');
  const listingNFTs = await query2.find();

  for (let i = 0; i < listingNFTs.length; i++) {
    const amount = listingNFTs[i].get('amount');
    const nft = listingNFTs[i].get('nft');

    // create sale object
    const Sale = Moralis.Object.extend('Sale');
    const tokenId = nft.get('tokenId');
    const collectionAddress = nft.get('collectionAddress');
    const seller = await request.object.get('seller');
    const paymentMethod = await request.object.get('paymentMethod');
    const pricePer = await request.object.get('pricePer');
    const totalPrice = await request.object.get('totalPrice');
    const blockTime = await request.object.get('block_timestamp');

    // tokenid, collectionaddress, amount sold/bought, seller/buyer, time of transaction, price of sale total, price per unit, chain, currency, listingId
    const newSale = new Sale();
    newSale.set(
      'amount',
      listingNFTs.length > 1 ? Number(amount) : Number(saleAmount)
    );
    newSale.set('tokenId', tokenId);
    newSale.set('collectionAddress', collectionAddress);
    newSale.set('seller', seller);
    newSale.set('buyer', buyer);
    newSale.set('chainId', '0x61');
    newSale.set('type', 'claim');
    newSale.set('listingId', listingId);
    newSale.set('listing', listing);
    newSale.set('nft', nft);
    newSale.set('paymentMethod', paymentMethod);
    newSale.set(
      'pricePer',
      Math.floor(pricePer / listingNFTs.length).toString()
    );
    newSale.set(
      'totalPrice',
      Math.floor(totalPrice / listingNFTs.length).toString()
    );
    newSale.set('blockTime', blockTime);
    await newSale.save();
  }
});
