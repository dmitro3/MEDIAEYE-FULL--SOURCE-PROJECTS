Moralis.Cloud.job('SetFinishedSubscription', async () => {
  const logger = Moralis.Cloud.getLogger();

  logger.info(
    '--------------------------------Set Finished Subscription Job--------------------------------'
  );
  Moralis.Cloud.run('finishedSubscription', {}, { useMasterKey: true });
  logger.info(
    '--------------------------------Set Finished Subscription Job Ended--------------------------------'
  );
});
