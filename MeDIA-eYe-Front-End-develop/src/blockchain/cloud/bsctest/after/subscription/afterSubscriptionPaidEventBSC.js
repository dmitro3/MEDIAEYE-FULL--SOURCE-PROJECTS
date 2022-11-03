Moralis.Cloud.afterSave('EventBSCSubscriptionPaidTest', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------After Subscription Paid BSC--------------------------------'
  );

  const eventArray = await request.object.get('userSubscription');
  const userAddress = eventArray[0].toLowerCase();
  const level = eventArray[1];
  const startTime = eventArray[2];
  const endTime = eventArray[3];

  const User = Moralis.Object.extend('User');
  const query = new Moralis.Query(User);
  query.equalTo('ethAddress', userAddress);
  let userObject = await query.first({ useMasterKey: true });

  userObject.set('subscriptionLevel', Number(level));
  userObject.set('subscriptionStart', Number(startTime));
  userObject.set('subscriptionEnd', Number(endTime));
  userObject.set('subscriptionChain', '0x61');
  await userObject.save(null, { useMasterKey: true });
});
