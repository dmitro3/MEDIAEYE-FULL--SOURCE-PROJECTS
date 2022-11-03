import { TokenName, ZERO_ADDRESS } from '../Addresses';
import { ChainHexString } from '../ChangeChain/ChainHexStrings';
import { convertPrice } from '../Utils';
import { queryOffers } from './QueryOffers';

export const queryTopOffer = async (Moralis, params) => {
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
  const query = new Moralis.Query(NFT);
  query.equalTo('chainId', ChainHexString(params.chainId));
  query.equalTo('collectionAddress', params.collectionAddress);
  query.equalTo('tokenId', params.tokenId);
  const nftResult = await query.first();

  if (!nftResult) return;

  const result = await queryOffers(Moralis, nftResult?.id);

  if (!result) return;

  // find highest offer for nft
  let highestOffer = {
    native: 0
  };
  for (let i = 0; i < result.length; i++) {
    const nft = result[i].attributes.nft.attributes;
    let priceInNative = result[i].attributes.price;
    const paymentMethod = result[i].attributes.paymentMethod;
    // convert if needed
    if (paymentMethod !== ZERO_ADDRESS) {
      const params = {
        chainId: nft.chainId,
        price: priceInNative,
        token: TokenName(paymentMethod, nft.chainId),
        native: true
      };
      priceInNative = await convertPrice(Moralis, params);
    }
    // check if higher than current highest
    if (Number(priceInNative) > Number(highestOffer.native)) {
      highestOffer = {
        native: priceInNative,
        price: result[i].attributes.price,
        paymentMethod
      };
    }
  }

  return highestOffer.native !== 0
    ? { price: highestOffer.price, paymentMethod: highestOffer.paymentMethod }
    : null;
};
