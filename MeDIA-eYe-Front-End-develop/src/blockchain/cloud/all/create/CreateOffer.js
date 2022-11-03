Moralis.Cloud.define('createOffer', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------CREATE OFFER--------------------------------'
  );
  const v = request.params.v;
  const r = request.params.r;
  const s = request.params.s;
  const offerer = request.params.offerer;
  const nftId = request.params.nftId;
  const supply = request.params.supply;
  const paymentMethod = request.params.paymentMethod;
  const price = request.params.price;
  const expiry = request.params.expiry;

  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const nftQuery = new Moralis.Query(NFT);
  nftQuery.equalTo('objectId', nftId);
  const nft = await nftQuery.first();

  const Offer = Moralis.Object.extend('Offer');
  const newOffer = new Offer();
  newOffer.set('v', v);
  newOffer.set('r', r);
  newOffer.set('s', s);
  newOffer.set('offerer', offerer);
  newOffer.set('nft', nft);
  newOffer.set('supply', supply);
  newOffer.set('paymentMethod', paymentMethod);
  newOffer.set('price', price);
  newOffer.set('expiry', expiry);

  await newOffer.save();

  // increment counter for num offers
  // nft.increment('numOffers');
  // nft.save();

  return;
});
