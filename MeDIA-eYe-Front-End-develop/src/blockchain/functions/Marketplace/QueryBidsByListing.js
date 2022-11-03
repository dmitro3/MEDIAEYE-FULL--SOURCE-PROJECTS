import { default as infoABI } from '../../abi/MediaEyeInfo.json';

export const queryBidsByListing = async (Moralis, listingId, chainHex, limit = null) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const bids = Moralis.Object.extend('Bid');
  const query = new Moralis.Query(bids);
  query.equalTo('listingId', listingId);
  if (chainHex)
    query.equalTo('chainHex', chainHex);
  if (limit) query.limit(limit);

  // get in order of order variable
  query.descending('price');
  const result = await query.find();
  return result;
};
