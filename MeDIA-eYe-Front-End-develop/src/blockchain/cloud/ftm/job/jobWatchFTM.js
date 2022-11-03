Moralis.Cloud.job('WatchFTM', async (request) => {
  // params: passed in the job call
  // headers: from the request that triggered the job
  // log: the Moralis Server logger passed in the request
  // message: a function to update the status message of the job object
  const logger = Moralis.Cloud.getLogger();

  logger.info(
    '--------------------------------Job Watch FTM--------------------------------'
  );
  Moralis.Cloud.run('Watch1155BurnBatchFTM');
  Moralis.Cloud.run('Watch721BurnFTM');
  //Moralis.Cloud.run('Watch1155MintFTM');
  //Moralis.Cloud.run('Watch721MintFTM');
  //Moralis.Cloud.run('Watch1155MintBatchFTM');
  //Moralis.Cloud.run('WatchCollectionRoleFTM');
  //Moralis.Cloud.run('NameOfDefineInFile')
});
