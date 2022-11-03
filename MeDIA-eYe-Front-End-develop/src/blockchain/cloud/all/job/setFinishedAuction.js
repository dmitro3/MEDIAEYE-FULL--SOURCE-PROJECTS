Moralis.Cloud.job('SetFinishedAuction', async () => {
  // params: passed in the job call
  // headers: from the request that triggered the job
  // log: the Moralis Server logger passed in the request
  // message: a function to update the status message of the job object
  const logger = Moralis.Cloud.getLogger();

  logger.info(
    '--------------------------------Set Finished Auction Job--------------------------------'
  );
  try {
    // get active auctions
    const Listing = Moralis.Object.extend('MediaEyeListing');
    const query = new Moralis.Query(Listing);

    query.equalTo('type', 'auction');
    query.equalTo('status', 'available');
    query.lessThan('endTime', Math.floor(Date.now() / 1000));
    const result = await query.find();

    // check if auction has ended
    for (let i = 0; i < result.length; i++) {
      const listing = result[i];
      listing.set('status', 'finished');
      await listing.save();
    }
  } catch (e) {
    logger.info('ERROR: ', e);
  }
  logger.info(
    '--------------------------------Set Finished Auction Job Ended--------------------------------'
  );
});
