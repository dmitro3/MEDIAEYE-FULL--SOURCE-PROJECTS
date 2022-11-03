Moralis.Cloud.define('finishedSubscription', async (request) => {
  try {
    // get active auctions
    const User = Moralis.Object.extend('User');
    const query = new Moralis.Query(User);
    query.lessThan('subscriptionEnd', Math.floor(Date.now() / 1000));
    // handle initial case
    query.notEqualTo('subscriptionLevel', 0);
    query.notEqualTo('subscriptionEnd', 0);

    const result = await query.find({ useMasterKey: true });

    // run for all subscriptions that have ended
    let subUsers = [];
    for (let i = 0; i < result.length; i++) {
      const subUser = result[i];
      result[i].set('subscriptionLevel', 0);
      subUsers.push(subUser);
    }
    await Moralis.Object.saveAll(result, { useMasterKey: true });
  } catch (e) {
    logger.info('ERROR: ', e);
  }
});
