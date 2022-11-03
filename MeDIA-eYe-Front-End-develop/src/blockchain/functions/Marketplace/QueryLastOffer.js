import { ChainHexString } from '../ChangeChain/ChainHexStrings';

export const queryLastOffer = async (Moralis, params) => {
  // return if no params
  if (
    !params ||
    !params.chainId ||
    !params.collectionAddress ||
    !params.tokenId
  ) {
    return;
  }

  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const nftQuery = new Moralis.Query(NFT);
  nftQuery.equalTo('chainId', ChainHexString(params.chainId));
  nftQuery.equalTo('collectionAddress', params.collectionAddress);
  nftQuery.equalTo('tokenId', params.tokenId);

  const Offer = Moralis.Object.extend('Offer');
  const query = new Moralis.Query(Offer);

  query.matchesQuery('nft', nftQuery);

  // filter out expired offers
  const currentTime = String(Date.now()).slice(undefined, -3);
  query.greaterThan('expiry', currentTime);
  query.notEqualTo('claimed', true);

  // get in order of recency
  query.descending('createdAt');
  const result = await query.first();
  return result;
};
