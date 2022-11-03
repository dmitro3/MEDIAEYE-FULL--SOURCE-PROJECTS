/**
 *
 * @param Moralis
 * @param userId is id of creator user to check
 * @returns {boolean} true if userId is followed, false if unfollowed
 */
export const queryFollowStatus = async (Moralis, userId) => {
  const currentUser = Moralis.User.current();

  try {
    let followed = false;
    if (currentUser) {
      const FollowsUser = Moralis.Object.extend('FollowsUser');
      const query = new Moralis.Query(FollowsUser);
      query.equalTo('followed', userId);
      query.equalTo('follower', currentUser.id);
      const userFollow = await query.first();

      if (userFollow !== undefined) {
        followed = true;
      }
    }

    return followed;
  } catch (e) {
    console.log(e);
  }
};
