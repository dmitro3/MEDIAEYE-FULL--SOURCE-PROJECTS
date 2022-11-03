Moralis.Cloud.define('createBid', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------CREATE BID--------------------------------'
  );
  const v = request.params.v;
  const r = request.params.r;
  const s = request.params.s;
  const bidder = request.params.bidder;
  const listingId = request.params.listingId;
  const paymentMethod = request.params.paymentMethod;
  const price = request.params.price;
  const chainHex = request.params.chainHex;

  const Bid = Moralis.Object.extend('Bid');
  const newBid = new Bid();
  newBid.set('v', v);
  newBid.set('r', r);
  newBid.set('s', s);
  newBid.set('bidder', bidder);
  newBid.set('listingId', listingId);
  newBid.set('paymentMethod', paymentMethod);
  newBid.set('price', price);
  newBid.set('chainHex', chainHex);

  await newBid.save();

  // increment counter for num bids
  const Listing = Moralis.Object.extend('MediaEyeListing');
  const auctionQuery = new Moralis.Query(Listing);
  auctionQuery.equalTo('type', 'auction');
  auctionQuery.equalTo('listingId', listingId);
  auctionQuery.equalTo('chainId', chainHex);
  const auction = await auctionQuery.first();
  auction.increment('numBids');
  auction.save();

  return;
});
