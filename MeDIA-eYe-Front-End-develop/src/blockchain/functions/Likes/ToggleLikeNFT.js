import { ChainHexString } from '../ChangeChain/ChainHexStrings';

export const toggleLikeNFT = async (
  Moralis,
  tokenAddress,
  tokenId,
  chainHex
) => {
  const currentUser = Moralis.User.current();

  try {
    let isLiked = false;
    if (currentUser && chainHex && tokenAddress && tokenId) {
      const LikesNFT = Moralis.Object.extend('LikesNFT');
      const query = new Moralis.Query(LikesNFT);
      query.equalTo('tokenAddress', tokenAddress);
      query.equalTo('tokenId', tokenId);
      query.equalTo('chainHex', ChainHexString(chainHex));
      query.equalTo('user', currentUser);
      const userLike = await query.first();

      if (userLike === undefined) {
        // add to table
        const newUserLike = new LikesNFT();
        newUserLike.set('tokenAddress', tokenAddress);
        newUserLike.set('tokenId', tokenId);
        newUserLike.set('chainHex', ChainHexString(chainHex));
        newUserLike.set('user', currentUser);
        await newUserLike.save();
        isLiked = true;
      } else {
        // remove from table
        await userLike.destroy();
      }
    }

    return isLiked;
  } catch (e) {
    console.log(e);
  }
};
