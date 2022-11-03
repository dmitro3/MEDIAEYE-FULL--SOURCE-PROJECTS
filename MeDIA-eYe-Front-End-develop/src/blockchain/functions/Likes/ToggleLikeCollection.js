import { ChainHexString } from '../ChangeChain/ChainHexStrings';

export const toggleLikeCollection = async (
  Moralis,
  collectionAddress,
  chainHex
) => {
  const currentUser = Moralis.User.current();

  try {
    let isLiked = false;
    if (currentUser) {
      const LikesCollection = Moralis.Object.extend('LikesCollection');
      const query = new Moralis.Query(LikesCollection);
      query.equalTo('collectionAddress', collectionAddress);
      query.equalTo('chainHex', ChainHexString(chainHex));
      query.equalTo('user', currentUser);
      const userLike = await query.first();

      if (userLike === undefined) {
        // add to table
        const newUserLike = new LikesCollection();
        newUserLike.set('collectionAddress', collectionAddress);
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
