/**
 *
 * @param Moralis
 * @param userId is id of liked user
 * @returns {boolean} true if current user has given a like to userId, otherwise false
 */
export const toggleLikeUser = async (Moralis, userId) => {
  const currentUser = Moralis.User.current();

  try {
    let isLiked = false;
    if (currentUser) {
      const LikesUser = Moralis.Object.extend('LikesUser');
      const query = new Moralis.Query(LikesUser);
      query.equalTo('likedUser', userId);
      query.equalTo('user', currentUser);
      const userLike = await query.first();

      if (userLike === undefined) {
        // add to table
        const newUserLike = new LikesUser();
        newUserLike.set('likedUser', userId);
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
