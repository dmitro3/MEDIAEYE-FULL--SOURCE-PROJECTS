export const queryOffers = async (Moralis, nftId, limit = null) => {
  const Offer = Moralis.Object.extend('Offer');
  const query = new Moralis.Query(Offer);

  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const nft = new NFT();
  nft.id = nftId;
  query.equalTo('nft', nft);
  if (limit) query.limit(limit);

  // filter out expired offers
  const currentTime = String(Date.now()).slice(undefined, -3);
  query.greaterThan('expiry', currentTime);
  query.notEqualTo('claimed', true);

  // get in order of order variable
  query.descending('price');
  const result = await query.find();
  return result;
};
