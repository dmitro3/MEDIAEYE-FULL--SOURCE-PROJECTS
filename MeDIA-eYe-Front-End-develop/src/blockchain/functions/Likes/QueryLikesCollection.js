import { ChainHexString } from '../ChangeChain/ChainHexStrings';

export const queryLikesCollection = async (
  Moralis,
  collectionAddress,
  chainHex
) => {
  const currentUser = Moralis.User.current();

  try {
    const LikesCollection = Moralis.Object.extend('LikesCollection');
    const query = new Moralis.Query(LikesCollection);
    query.equalTo('collectionAddress', collectionAddress);
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
