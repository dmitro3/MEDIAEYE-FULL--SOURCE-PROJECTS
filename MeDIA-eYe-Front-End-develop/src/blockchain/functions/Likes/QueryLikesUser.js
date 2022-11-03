/**
 *
 * @param Moralis
 * @param userId is id of liked user
 * @returns {number, boolean} the number of likes userId has been given, and true if current user has given a like to userId
 */
export const queryLikesUser = async (Moralis, userId) => {
  const currentUser = Moralis.User.current();

  try {
    const LikesUser = Moralis.Object.extend('LikesUser');
    const query = new Moralis.Query(LikesUser);
    query.equalTo('likedUser', userId);
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
