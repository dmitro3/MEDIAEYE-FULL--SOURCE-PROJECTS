Moralis.Cloud.job('SetAllSubscriptionPromo', async () => {
  const logger = Moralis.Cloud.getLogger();

  logger.info(
    '--------------------------------Set All Subscription Promo Start--------------------------------'
  );

  try {
    // get all users
    const User = Moralis.Object.extend('User');
    const query = new Moralis.Query(User);
    query.limit(10000);
    query.lessThan('subscriptionEnd', Math.floor(Date.now() / 1000));
    query.equalTo('subscriptionLevel', 0);

    const result = await query.find({ useMasterKey: true });

    // get a subscription end time
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    // run for all subscriptions that have ended
    let subUsers = [];
    for (let i = 0; i < result.length; i++) {
      const subUser = result[i];
      result[i].set('subscriptionLevel', 1);
      result[i].set('subscriptionStart', Math.floor(Date.now() / 1000));
      result[i].set('subscriptionEnd', Math.floor(endDate.getTime() / 1000));
      result[i].set('subscriptionChain', 'PROMO');
      subUsers.push(subUser);
    }
    await Moralis.Object.saveAll(result, { useMasterKey: true });
  } catch (e) {
    logger.info('ERROR: ', e);
  }

  logger.info(
    '--------------------------------Set All Subscription Promo Finished--------------------------------'
  );
});
