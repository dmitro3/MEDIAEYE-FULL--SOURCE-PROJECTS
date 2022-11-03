import { ChainHexString } from '../ChangeChain/ChainHexStrings';

export const queryLikesNFT = async (
  Moralis,
  tokenAddress,
  tokenId,
  chainHex
) => {
  const currentUser = Moralis.User.current();

  try {
    const LikesNFT = Moralis.Object.extend('LikesNFT');
    const query = new Moralis.Query(LikesNFT);
    query.equalTo('tokenAddress', tokenAddress);
    query.equalTo('tokenId', tokenId);
    query.equalTo('chainHex', ChainHexString(chainHex));
    const count = await query.count();

    let likeStatus = false;
    if (currentUser) {
      query.equalTo('user', currentUser);
      const userLike = await query.first();
      if (userLike !== undefined) likeStatus = true;
    }

    return { count, likeStatus };
  } catch (e) {
    console.log(e);
  }
};
