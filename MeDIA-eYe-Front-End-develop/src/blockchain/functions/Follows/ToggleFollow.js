/**
 *
 * @param Moralis
 * @param userId is id of user to follow/unfollow
 * @returns {boolean} true if userId is followed, false if unfollowed
 */
export const toggleFollow = async (Moralis, userId) => {
  const currentUser = Moralis.User.current();

  try {
    let followed = false;
    if (currentUser) {
      const FollowsUser = Moralis.Object.extend('FollowsUser');
      const query = new Moralis.Query(FollowsUser);
      query.equalTo('followed', userId);
      query.equalTo('follower', currentUser.id);
      const userFollow = await query.first();

      if (userFollow === undefined) {
        // add to table
        const newUserFollow = new FollowsUser();
        newUserFollow.set('followed', userId);
        newUserFollow.set('follower', currentUser.id);
        await newUserFollow.save();
        followed = true;
      } else {
        // remove from table
        await userFollow.destroy();
      }
    }

    return followed;
  } catch (e) {
    console.log(e);
  }
};
