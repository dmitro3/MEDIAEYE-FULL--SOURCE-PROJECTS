/**
 *
 * @param Moralis
 * @param userId is id of user to check
 * @returns {number, number} numFollowers is number of followers of userId, numFollowing is number of users followed by userId
 */
export const queryFollowCount = async (Moralis, userId) => {
  try {
    const FollowsUser = Moralis.Object.extend('FollowsUser');
    const query = new Moralis.Query(FollowsUser);
    query.equalTo('followed', userId);
    const numFollowers = await query.count();

    const query2 = new Moralis.Query(FollowsUser);
    query2.equalTo('follower', userId);
    const numFollowing = await query2.count();

    return { numFollowers, numFollowing };
  } catch (e) {
    console.log(e);
  }
};
