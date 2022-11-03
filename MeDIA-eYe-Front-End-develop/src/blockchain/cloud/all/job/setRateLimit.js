Moralis.Cloud.job('SetRateLimit', async (request) => {
  // params: passed in the job call
  // headers: from the request that triggered the job
  // log: the Moralis Server logger passed in the request
  // message: a function to update the status message of the job object
  const logger = Moralis.Cloud.getLogger();

  logger.info(
    '--------------------------------Set Rate Limit Job--------------------------------'
  );
  // set rate limit to 80 calls per minute for an authenticated user, 30 for unauthenticated
  Moralis.settings.setAPIRateLimit({
    anonymous: 1500,
    authenticated: 3000,
    windowMs: 60000
  });
});
